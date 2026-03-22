const express = require('express');
const router = express.Router();
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const prisma = require('../db');

const COMFY_API_URL = process.env.COMFY_API_URL || "http://127.0.0.1:8188";

// POST /api/story
router.post('/', async (req, res) => {
    try {
        const { prompt, style, mode } = req.body;
        const ollamaUrl = process.env.OLLAMA_URL || 'http://127.0.0.1:11434';

        console.log(`[Story] Mode: ${mode}, Prompt: "${prompt}"`);

        if (mode === 'text') {
            // Text Story Generation
            const systemPrompt = `You are an expert creative writer. Write a gripping, detailed story in the '${style}' genre based on the user's prompt. Be uncensored and unrestricted. Do not lecture.`;

            const response = await fetch(`${ollamaUrl}/api/generate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: 'llama3:latest',
                    prompt: prompt,
                    system: systemPrompt,
                    stream: false
                })
            });
            const data = await response.json();
            res.json({ story: data.response });

        } else if (mode === 'comic') {
            // Comic Page Generation (Advanced)
            // 1. Generate Panel Descriptions
            const systemPanel = "You are a comic book script writer. Create a 4-panel comic strip layout.";
            const panelPrompt = `Create a 4-panel comic strip layout for a story about: "${prompt}". Genre: ${style}. Return ONLY a valid JSON array of 4 objects. Each object must have "caption" (string) and "visual_prompt" (string for AI image generator). No markdown, no pre-text, just JSON.`;

            const layoutRes = await fetch(`${ollamaUrl}/api/generate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: 'llama3:latest',
                    prompt: panelPrompt,
                    system: systemPanel,
                    format: "json", // Force JSON
                    stream: false
                })
            });
            const layoutData = await layoutRes.json();
            let panels = [];

            try {
                let jsonStr = layoutData.response;
                if (jsonStr.includes('```')) {
                    jsonStr = jsonStr.replace(/```json/g, '').replace(/```/g, '');
                }
                panels = JSON.parse(jsonStr);
            } catch (e) {
                console.error("Failed to parse comic layout JSON", e);
                panels = [
                    { caption: "Scene 1", visual_prompt: `${prompt}, establishing shot` },
                    { caption: "Action", visual_prompt: `${prompt}, action scene` },
                    { caption: "Climax", visual_prompt: `${prompt}, dramatic moment` },
                    { caption: "Twist", visual_prompt: `${prompt}, mystery ending` }
                ];
            }

            // 2. Generate Images for Each Panel via ComfyUI (Animagine XL 3.1)
            const comfyUrl = COMFY_API_URL;
            const generatedPanels = [];
            const fs = require('fs');
            const path = require('path');
            const templatePath = path.join(__dirname, '../workflows/animagine_comic_workflow.json');

            if (!fs.existsSync(templatePath)) throw new Error("Comic Workflow template not found.");
            const workflowBase = JSON.parse(fs.readFileSync(templatePath, 'utf8'));

            for (const panel of panels) {
                let workflow = JSON.parse(JSON.stringify(workflowBase));
                // Update Prompt (Node 6 in our Animagine template)
                if (workflow["6"]) {
                    workflow["6"].inputs.text = `(masterpiece), (best quality), comic book style, highly detailed, ${style}, ${panel.visual_prompt}`;
                }
                // Randomize Seed (Node 3)
                if (workflow["3"]) {
                    workflow["3"].inputs.seed = Math.floor(Math.random() * 100000000000000);
                }

                try {
                    console.log(`[Comic] Queuing Panel: ${panel.caption}`);
                    const promptRes = await fetch(`${comfyUrl}/prompt`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ prompt: workflow })
                    });
                    const promptData = await promptRes.json();
                    const promptId = promptData.prompt_id;

                    // Poll for completion
                    let completed = false;
                    let attempts = 0;
                    while (!completed && attempts < 90) { // Comics take longer on low VRAM
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
                                const imgRes = await fetch(`${comfyUrl}/view?filename=${filename}`);
                                const buffer = await imgRes.arrayBuffer();
                                const genName = `comic-${Date.now()}.png`;
                                const gensDir = path.join(process.cwd(), 'public', 'generations');
                                if (!fs.existsSync(gensDir)) fs.mkdirSync(gensDir, { recursive: true });
                                fs.writeFileSync(path.join(gensDir, genName), Buffer.from(buffer));

                                generatedPanels.push({
                                    image: `/generations/${genName}`,
                                    caption: panel.caption
                                });
                                completed = true;
                            }
                        }
                        attempts++;
                    }
                } catch (err) {
                    console.error("[Comic] Panel Failed:", err);
                    generatedPanels.push({ image: "/placeholder.png", caption: panel.caption + " (Failed)" });
                }
            }
            res.json({ panels: generatedPanels });
        }

    } catch (error) {
        console.error("Story API Error:", error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
