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
        const target = req.body.target || 'novita'; 
        console.log(`[Generations] Received request: ${type} - "${prompt}" (Target: ${target})`);

        let localFilename = null;

        // --- PATH A: COMFYUI LOCAL (DEFAULT) ---
        if (target === 'comfyui' || !target) {
            const comfyUrl = process.env.COMFY_API_URL || "http://127.0.0.1:8188";
            const fs = require('fs');
            const path = require('path');
            
            console.log(`[ComfyUI] Dispatching locally: "${prompt}"`);
            
            let templateName = (model_id === 'Veda-flux' || model_id === 'flux') ? 'flux_schnell_workflow.json' : 'default_image_workflow.json';
            const templatePath = path.join(__dirname, '../workflows/', templateName);
            
            if (!fs.existsSync(templatePath)) throw new Error(`ComfyUI workflow template "${templateName}" not found.`);
            
            const workflow = JSON.parse(fs.readFileSync(templatePath, 'utf8'));
            const seed = Math.floor(Math.random() * 1000000000000);

            if (templateName === 'flux_schnell_workflow.json') {
                if (workflow["4"]) workflow["4"].inputs.text = prompt;
                if (workflow["6"]) workflow["6"].inputs.seed = seed;
            } else {
                if (workflow["6"]) workflow["6"].inputs.text = prompt;
                if (workflow["3"]) workflow["3"].inputs.seed = seed;
            }

            const promptRes = await fetch(`${comfyUrl}/prompt`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: workflow })
            });
            const { prompt_id } = await promptRes.json();

            let filename = null;
            let attempts = 0;
            while (!filename && attempts < 60) {
                await new Promise(r => setTimeout(r, 2000));
                const histRes = await fetch(`${comfyUrl}/history/${prompt_id}`);
                const histData = await histRes.json();
                if (histData[prompt_id]) {
                    const outputs = histData[prompt_id].outputs;
                    for (const key in outputs) if (outputs[key].images) filename = outputs[key].images[0].filename;
                }
                attempts++;
            }

            if (filename) {
                const imgRes = await fetch(`${comfyUrl}/view?filename=${filename}`);
                const buffer = await imgRes.arrayBuffer();
                localFilename = `gen-${Date.now()}.png`;
                const gensDir = path.join(process.cwd(), 'public', 'generations');
                if (!fs.existsSync(gensDir)) fs.mkdirSync(gensDir, { recursive: true });
                fs.writeFileSync(path.join(gensDir, localFilename), Buffer.from(buffer));
                
                await prisma.generation.create({ data: { type: 'image', prompt, model_id, output_path: `/generations/${localFilename}` } });
                return res.json({ success: true, imageUrl: `/generations/${localFilename}` });
            }
            throw new Error("ComfyUI generation timeout.");

        // --- PATH B: NOVITA CLOUD (STANDBY) ---
        } else if (target === 'novita') {
            const novitaKey = process.env.NOVITA_API_KEY;
            if (!novitaKey) throw new Error("Novita API Key not found in .env");

            let novitaModel = 'sd_xl_base_1.0.safetensors';
            if (model_id === 'Veda-flux') novitaModel = 'flux-schnell.safetensors';
            else if (model_id === 'Veda-pony') novitaModel = 'ponyDiffusionV6XL_v6-6.safetensors';
            else if (model_id === 'Veda-illustrious') novitaModel = 'illustrious_xl_v10.safetensors';
            else if (model_id === 'Veda-comic') novitaModel = 'animagineXLV3_v30.safetensors';
            
            console.log(`[Novita] Starting cloud generation for: ${novitaModel}`);

            const startRes = await fetch("https://api.novita.ai/v3/async/txt2img", {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${novitaKey}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model_name: novitaModel,
                    prompt: prompt,
                    negative_prompt: "blurry, low quality, distorted, ugly, watermark",
                    width: 1024, height: 1024, image_num: 1, steps: 30, seed: -1, guidance_scale: 7.5
                })
            });

            const { task_id } = await startRes.json();
            let imageUrl = null;
            let pollAttempts = 0;
            while (!imageUrl && pollAttempts < 30) {
                await new Promise(r => setTimeout(r, 2000));
                const pollRes = await fetch(`https://api.novita.ai/v3/async/task-result?task_id=${task_id}`, {
                    headers: { 'Authorization': `Bearer ${novitaKey}` }
                });
                const pollData = await pollRes.json();
                if (pollData.task && pollData.task.status === 'TASK_STATUS_COMPLETED') imageUrl = pollData.images[0].image_url;
                else if (pollData.task && pollData.task.status === 'TASK_STATUS_FAILED') throw new Error(`Novita Failed: ${pollData.task.reason}`);
                pollAttempts++;
            }

            if (!imageUrl) throw new Error("Novita polling timed out");
            const imgResponse = await fetch(imageUrl);
            const buffer = await imgResponse.arrayBuffer();
            localFilename = `gen-${Date.now()}.png`;
            const fs = require('fs');
            const path = require('path');
            fs.writeFileSync(path.join(process.cwd(), 'public', 'generations', localFilename), Buffer.from(buffer));
            
            await prisma.generation.create({ data: { type: 'image', prompt, model_id, output_path: `/generations/${localFilename}` } });
            return res.json({ success: true, imageUrl: `/generations/${localFilename}` });
        }

    } catch (error) {
        console.error('[Generations] Critical Error:', error);
        if (!res.headersSent) res.status(500).json({ error: error.message || 'Generation failed' });
    }
});

// Video route removed - moved to independent video.js route
// router.post('/video', ...);

module.exports = router;
