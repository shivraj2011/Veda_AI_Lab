const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const prisma = require('../db');

const COMFY_API_URL = process.env.COMFY_API_URL || "http://127.0.0.1:8188";

// 1. GENERATE 3D MESH
router.post('/', async (req, res) => {
    console.log("[3D] Received Generation Request");
    try {
        const { prompt, model_id, target_image } = req.body;

        // Load TripoSR Template
        // (We will use an image-to-3D workflow primarily as TripoSR is image-to-3D)
        // Default to TripoSR, but handle Splat if requested
        const isSplat = model_id === 'splat';
        const templatePath = isSplat 
            ? path.join(__dirname, '../workflows/gaussian_splat_workflow.json')
            : path.join(__dirname, '../workflows/triposr_workflow.json');

        if (!fs.existsSync(templatePath)) {
            // Fallback to TripoSR if Splat workflow is missing
            console.warn(`[3D] Workflow ${templatePath} not found. Falling back to TripoSR.`);
            const fallbackPath = path.join(__dirname, '../workflows/triposr_workflow.json');
            if (!fs.existsSync(fallbackPath)) {
                return res.status(500).json({ error: "3D Workflow template not found." });
            }
            workflow = JSON.parse(fs.readFileSync(fallbackPath, 'utf8'));
        } else {
            workflow = JSON.parse(fs.readFileSync(templatePath, 'utf8'));
        }
        
        // Update workflow with target image if provided
        // (Assuming node 12 is the LoadImage node in our triposr workflow)
        if (target_image && workflow["12"]) {
            workflow["12"].inputs.image = target_image;
        }

        console.log("[3D] Sending workflow to ComfyUI...");
        const promptRes = await fetch(`${COMFY_API_URL}/prompt`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: workflow })
        });

        if (!promptRes.ok) throw new Error(`ComfyUI Error: ${promptRes.statusText}`);
        const promptData = await promptRes.json();
        
        res.json({
            status: 'queued',
            prompt_id: promptData.prompt_id,
            message: "3D Generation started."
        });

    } catch (e) {
        console.error("[3D] Route Error:", e);
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
            let meshFilename = null;
            // Scan outputs for mesh files (.obj, .glb)
            for (const key in outputs) {
                if (outputs[key].meshes) meshFilename = outputs[key].meshes[0].filename;
                if (outputs[key].save_mesh) meshFilename = outputs[key].save_mesh[0].filename;
            }

            if (meshFilename) {
                return res.json({
                    status: 'completed',
                    mesh_url: `${COMFY_API_URL}/view?filename=${meshFilename}`
                });
            }
        }
        res.json({ status: 'pending' });
    } catch (e) {
        res.json({ status: 'pending', debug_error: e.message });
    }
});

module.exports = router;
