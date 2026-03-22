const fs = require('fs');
const path = require('path');

async function testComfyImage() {
    const prompt = "A futuristic laboratory with glowing blue lights and holographic displays, ultra-detailed, 8k";
    const comfyUrl = "http://127.0.0.1:8000";

    try {
        console.log("Loading workflow...");
        const templatePath = path.join(__dirname, 'workflows/default_image_workflow.json');
        const workflow = JSON.parse(fs.readFileSync(templatePath, 'utf8'));

        // Update prompt
        workflow["6"].inputs.text = prompt;
        workflow["3"].inputs.seed = Math.floor(Math.random() * 1000000);

        console.log("Sending prompt to ComfyUI...");
        const res = await fetch(`${comfyUrl}/prompt`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: workflow })
        });

        if (!res.ok) {
            const errBody = await res.json();
            console.error("ComfyUI Rejected Workflow:", JSON.stringify(errBody, null, 2));
            throw new Error(`HTTP Error: ${res.status}`);
        }
        const data = await res.json();
        const promptId = data.prompt_id;
        console.log(`Prompt queued, ID: ${promptId}`);

        console.log("Waiting for completion...");
        let completed = false;
        while (!completed) {
            await new Promise(r => setTimeout(r, 2000));
            const histRes = await fetch(`${comfyUrl}/history/${promptId}`);
            const histData = await histRes.json();

            if (histData[promptId] && histData[promptId].outputs) {
                console.log("Generation completed!");
                completed = true;
                const outputs = histData[promptId].outputs;
                console.log("Outputs:", JSON.stringify(outputs, null, 2));
            } else {
                process.stdout.write(".");
            }
        }
    } catch (e) {
        console.error("Test Failed:", e.message);
    }
}

testComfyImage();
