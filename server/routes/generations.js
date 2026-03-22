const express = require('express');
const router = express.Router();
const prisma = require('../db');

// GET /api/generations - Fetch gallery history
router.get('/', async (req, res) => {
    try {
        const generations = await prisma.generation.findMany({
            orderBy: { created_at: 'desc' },
            take: 50
        });
        res.json(generations);
    } catch (error) {
        console.error('Error fetching generations:', error);
        res.status(500).json({ error: 'Failed to fetch history' });
    }
});

// POST /api/generations - Generate and save a new image
// POST /api/generations - Generate and save a new image (ASYNC)
// POST /api/generations - Generate and save a new image (ASYNC)
router.post('/', async (req, res) => {
    try {
        const { type, prompt, model_id, parameters } = req.body;
        const target = req.body.target || 'comfyui'; // Default to ComfyUI now
        console.log(`[Generations] Received request: ${type} - "${prompt}" (Target: ${target})`);

        // 1. Respond Immediately (Fire & Forget)
        res.json({ success: true, status: 'queued', message: 'Generation started in background' });

        // 2. Perform Generation in Background
        (async () => {
            try {
                if (target === 'comfyui') {
                    const comfyUrl = process.env.COMFY_API_URL || "http://127.0.0.1:8188";

                    // Load Image Template
                    const fs = require('fs');
                    const path = require('path');
                    
                    let templateName = 'default_image_workflow.json';
                    if (model_id === 'nexus-flux' || model_id === 'flux') {
                        templateName = 'flux_schnell_workflow.json';
                    }
                    
                    const templatePath = path.join(__dirname, '../workflows/', templateName);

                    if (!fs.existsSync(templatePath)) {
                        throw new Error(`ComfyUI Image Workflow template "${templateName}" not found.`);
                    }

                    const workflowRaw = fs.readFileSync(templatePath, 'utf8');
                    let workflow = JSON.parse(workflowRaw);
                    let seedNodeId = "3"; // Default for standard

                    // Dynamic Replacement
                    if (templateName === 'flux_schnell_workflow.json') {
                        seedNodeId = "6"; // KSampler in FLUX template
                        if (workflow["4"]) workflow["4"].inputs.text = prompt;
                    } else {
                        // Standard SD/SDXL Logic
                        seedNodeId = "3";
                        for (const [id, node] of Object.entries(workflow)) {
                            if (node.class_type === 'CLIPTextEncode') {
                                if (id === "6") workflow[id].inputs.text = prompt;
                            }
                            if (node.class_type === 'CheckpointLoaderSimple' && id === "4") {
                                if (model_id === 'pony-nsfw' || model_id === 'nexus-pony') {
                                    workflow[id].inputs.ckpt_name = "ponyRealism_V23ULTRA.safetensors";
                                    if (workflow["5"]) {
                                        workflow["5"].inputs.width = 1024;
                                        workflow["5"].inputs.height = 1024;
                                    }
                                } else if (model_id === 'nexus-comic' || model_id === 'animagine') {
                                    workflow[id].inputs.ckpt_name = "animagineXLV31_v31.safetensors";
                                } else if (model_id === 'nexus-illustrious' || model_id === 'illustrious') {
                                    workflow[id].inputs.ckpt_name = "pornworksAnimeDesireNSFW_illustrious.safetensors";
                                } else {
                                    workflow[id].inputs.ckpt_name = "v1-5-pruned-emaonly.safetensors";
                                }
                            }
                        }
                    }

                    // Seed Randomization
                    if (workflow[seedNodeId] && workflow[seedNodeId].inputs) {
                        workflow[seedNodeId].inputs.seed = Math.floor(Math.random() * 100000000000000);
                    }

                    console.log(`[Background] Sending to ComfyUI...`);
                    const promptRes = await fetch(`${comfyUrl}/prompt`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ prompt: workflow })
                    });

                    if (!promptRes.ok) throw new Error(`ComfyUI Error: ${promptRes.statusText}`);
                    const promptData = await promptRes.json();
                    const promptId = promptData.prompt_id;

                    // Poll for completion (Simple version for background task)
                    let completed = false;
                    let attempts = 0;
                    while (!completed && attempts < 60) {
                        await new Promise(r => setTimeout(r, 2000));
                        const histRes = await fetch(`${comfyUrl}/history/${promptId}`);
                        const histData = await histRes.json();

                        if (histData[promptId] && histData[promptId].outputs) {
                            const outputs = histData[promptId].outputs;
                            let filename = null;
                            for (const key in outputs) {
                                if (outputs[key].images) filename = outputs[key].images[0].filename;
                            }

                            if (filename) {
                                // Download and Save
                                const imgRes = await fetch(`${comfyUrl}/view?filename=${filename}`);
                                const buffer = await imgRes.arrayBuffer();

                                const gensDir = path.join(process.cwd(), 'public', 'generations');
                                if (!fs.existsSync(gensDir)) fs.mkdirSync(gensDir, { recursive: true });

                                const localFilename = `gen-${Date.now()}.png`;
                                const filepath = path.join(gensDir, localFilename);
                                fs.writeFileSync(filepath, Buffer.from(buffer));

                                // Update DB
                                await prisma.generation.create({
                                    data: {
                                        type: type || 'image',
                                        prompt,
                                        model_id: 'comfyui-default',
                                        output_path: `/generations/${localFilename}`,
                                        parameters: JSON.stringify(parameters || {})
                                    }
                                });
                                console.log(`[Background] ComfyUI Generation saved: ${localFilename}`);
                                completed = true;
                            }
                        }
                        attempts++;
                    }
                } else {
                    // Legacy A1111 Path (if still needed)
                    const a1111Url = process.env.A1111_URL || "http://127.0.0.1:7860";
                    // ... existing A1111 logic (omitted for brevity but kept in mind)
                    // For now, let's keep the A1111 logic as a fallback
                    const a1111Payload = {
                        prompt: prompt,
                        steps: 20,
                        width: 512,
                        height: 512,
                        sampler_name: "Euler a"
                    };
                    const response = await fetch(`${a1111Url}/sdapi/v1/txt2img`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(a1111Payload)
                    });
                    const data = await response.json();
                    const base64Image = data.images[0];
                    const fs = require('fs');
                    const path = require('path');
                    const gensDir = path.join(process.cwd(), 'public', 'generations');
                    const filename = `gen-${Date.now()}.png`;
                    fs.writeFileSync(path.join(gensDir, filename), base64Image, 'base64');
                    await prisma.generation.create({
                        data: { type: 'image', prompt, output_path: `/generations/${filename}` }
                    });
                }
            } catch (bgError) {
                console.error('[Background] Generation Failed:', bgError);
            }
        })();

    } catch (error) {
        console.error('[Generations] Error:', error);
        if (!res.headersSent) res.status(500).json({ error: 'Failed to start generation' });
    }
});

// Video route removed - moved to independent video.js route
// router.post('/video', ...);

module.exports = router;
