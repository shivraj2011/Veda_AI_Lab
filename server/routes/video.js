
const express = require('express');
const router = express.Router();
// Native fetch is available in Node 18+
// const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
// const { v4: uuidv4 } = require('uuid');

const COMFY_API_URL = process.env.COMFY_API_URL || "http://127.0.0.1:8188";

// Helper: Ping ComfyUI
async function checkComfyStatus() {
    try {
        console.log(`[Video] Pinging ComfyUI at ${COMFY_API_URL}...`);
        const res = await fetch(`${COMFY_API_URL}/system_stats`);
        console.log(`[Video] ComfyUI Ping Status: ${res.status}`);
        return res.ok;
    } catch (err) {
        console.error("[Video] ComfyUI Ping Failed:", err.message);
        return false;
    }
}

// 1. GENERATE VIDEO
router.post('/', async (req, res) => {
    console.log("[Video] Received Generation Request");
    try {
        const { prompt, motion_bucket_id, fps } = req.body;

        // 1. Check ComfyUI
        const isOnline = await checkComfyStatus();
        if (!isOnline) {
            console.warn("[Video] ComfyUI Offline - Returning 503");
            return res.status(503).json({
                error: "ComfyUI is unavailable. Please ensure 'ComfyUI' is running on port 8000.",
                details: "Connection refused to 127.0.0.1:8000"
            });
        }

        // 2. Load Template
        let templateName = 'default_video_workflow.json';
        if (req.body.model === 'nexus-ltx' || req.body.model === 'ltx') {
            templateName = 'ltx_video_workflow.json';
        }
        
        const templatePath = path.join(__dirname, '../workflows/', templateName);
        if (!fs.existsSync(templatePath)) {
            return res.status(500).json({ error: `Server Error: Workflow template '${templateName}' not found.` });
        }

        // 3. Prepare Workflow
        const workflowRaw = fs.readFileSync(templatePath, 'utf8');
        let workflow = JSON.parse(workflowRaw);
        let seedNodeId = null;

        // Dynamic Replacement
        if (templateName === 'ltx_video_workflow.json') {
            seedNodeId = "4";
            if (workflow["2"]) workflow["2"].inputs.text = prompt;
            if (workflow["1"]) workflow["1"].inputs.unet_name = "ltx-video-2b-v0.9-Q5_1.gguf";
        } else {
            // WanVideo or Default
            for (const [id, node] of Object.entries(workflow)) {
                if (node.class_type === 'CLIPTextEncode' && node.inputs && node.inputs.text) {
                    if (typeof node.inputs.text === 'string' && node.inputs.text.length > 5) {
                        workflow[id].inputs.text = prompt;
                    }
                }
                if (node.class_type === 'KSampler' || node.class_type === 'Samplers' || node.class_type === 'WanVideoSampler') {
                    seedNodeId = id;
                }
                if (node.class_type === 'CheckpointLoaderSimple' || node.class_type === 'ImageOnlyCheckpointLoader') {
                    workflow[id].inputs.ckpt_name = "wan22EnhancedNSFWSVICamera_nolightningSVICfFp8H.safetensors";
                }
            }
        }

        // Seed Randomization
        if (seedNodeId && workflow[seedNodeId].inputs) {
            workflow[seedNodeId].inputs.seed = Math.floor(Math.random() * 100000000000000);
        }

        // 4. Send to ComfyUI
        console.log("[Video] Sending workflow to ComfyUI...");
        const promptRes = await fetch(`${COMFY_API_URL}/prompt`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: workflow })
        });

        if (!promptRes.ok) {
            const errText = await promptRes.text();
            throw new Error(`ComfyUI Rejected Request (${promptRes.status}): ${errText}`);
        }

        const promptData = await promptRes.json();
        console.log(`[Video] Generation Queued: ${promptData.prompt_id}`);

        res.json({
            status: 'queued',
            prompt_id: promptData.prompt_id,
            message: "Video generation started."
        });

    } catch (e) {
        console.error("[Video] Route Error:", e);
        res.status(500).json({ error: `Server Error: ${e.message}` });
    }
});

// 2. CHECK STATUS
router.get('/status/:promptId', async (req, res) => {
    try {
        const { promptId } = req.params;
        const historyRes = await fetch(`${COMFY_API_URL}/history/${promptId}`);
        const historyData = await historyRes.json();

        if (historyData[promptId] && historyData[promptId].outputs) {
            const outputs = historyData[promptId].outputs;
            let videoFilename = null;
            // Scan outputs for video files
            for (const key in outputs) {
                if (outputs[key].gifs) videoFilename = outputs[key].gifs[0].filename;
                if (outputs[key].videos) videoFilename = outputs[key].videos[0].filename;
            }

            if (videoFilename) {
                // Success
                return res.json({
                    status: 'completed',
                    video_url: `${COMFY_API_URL}/view?filename=${videoFilename}`
                });
            }
        }

        // Default to pending
        res.json({ status: 'pending' });

    } catch (e) {
        // Soft fail for status check to avoid spamming frontend errors
        res.json({ status: 'pending', debug_error: e.message });
    }
});

module.exports = router;
