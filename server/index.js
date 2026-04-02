const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Multer Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../public/uploads'); // Save to project root public/uploads
        if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

// Middleware
app.use(cors());
app.use(express.json());

// Health Check Endpoint (Used by Frontend UI to verify connection)
app.get('/api/health', (req, res) => {
    res.json({ status: 'online', node: 'TOGETHER_AI_CLOUD' });
});

// Request Logging Middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// API Routes (Defines)
const generationRoutes = require('./routes/generations');
const chatRoutes = require('./routes/chats');
const storyRoutes = require('./routes/story');
const videoRoutes = require('./routes/video');
const threeDRoutes = require('./routes/3d');

// API Routes (Mounts) - MOVED UP
app.use('/api/generations', generationRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/story', storyRoutes);
app.use('/api/video', videoRoutes);
app.use('/api/3d', threeDRoutes);

// COMPATIBILITY REDIRECT (Fix for Cached Frontends)
// If browser requests old /api/generations/video, redirect to /api/video
app.post('/api/generations/video', (req, res) => {
    console.log("[Compatibility] Redirecting old video request to /api/video");
    res.redirect(307, '/api/video');
});

// Static Files (Fallthrough)
// Serve everything from project root (index.html, styles, etc)
// IMPORTANT: Put this LAST so it doesn't intercept API calls
app.use(express.static(path.join(__dirname, '../')));

// Serve specific folders (redundant but kept for explicit access)
app.use('/generations', express.static(path.join(__dirname, '../public/generations')));
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));
app.use('/voices', express.static(path.join(__dirname, '../public/voices')));

// File Upload
app.post('/api/upload', upload.single('file'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    res.json({ url: `/uploads/${req.file.filename}`, filename: req.file.filename });
});

// Voice Generation Route
const { spawn } = require('child_process');
app.post('/api/voice', (req, res) => {
    const { text, voice } = req.body;
    if (!text) return res.status(400).json({ error: 'Text required' });

    const outputDir = path.join(__dirname, '../public/voices');
    // Ensure public/voices exists
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

    const pythonScript = path.join(__dirname, 'tts.py');
    const pythonProcess = spawn('python', [pythonScript, text, voice || 'en-GB-SoniaNeural', outputDir]);

    let resultData = '';
    pythonProcess.stdout.on('data', (data) => {
        resultData += data.toString();
    });

    let errorData = '';
    pythonProcess.stderr.on('data', (data) => {
        errorData += data.toString();
        console.error(`TTS Error: ${data}`);
    });

    pythonProcess.on('close', (code) => {
        if (code !== 0) {
            console.error(`TTS Process failed with code ${code}`);
            return res.status(500).json({
                error: 'TTS Generation failed',
                details: errorData || 'Unknown script error',
                code: code
            });
        }
        // Create clean filename string by removing any whitespace/newlines
        const cleanFilename = resultData.toString().trim().replace(/[\r\n]+/g, '');
        console.log(`[TTS] Generated: ${cleanFilename}`);
        res.json({ url: `/voices/${cleanFilename}` });
    });
});

// --- DIRECT COMPLETION ROUTE (DEBUG) ---
app.post('/api/completion', async (req, res) => {
    try {
        const { prompt, model } = req.body;
        const isClaude = model && model.toLowerCase().includes('claude');

        if (isClaude) {
            console.log(`[Anthropic] Direct Completion Request for: "${prompt.substring(0, 20)}..."`);
            const Anthropic = require('@anthropic-ai/sdk');
            const anthropic = new Anthropic({
                apiKey: process.env.ANTHROPIC_API_KEY || ''
            });

            if (!process.env.ANTHROPIC_API_KEY) {
                return res.json({ reply: "Error: Missing Anthropic API Key in your .env file." });
            }

            const response = await anthropic.messages.create({
                model: model,
                max_tokens: 2048,
                messages: [{ role: 'user', content: prompt }]
            });

            console.log("[Anthropic] Direct Completion Success");
            res.json({ reply: response.content[0].text });

        } else {
            const apiKey = process.env.OPENROUTER_API_KEY;
            if (!apiKey) {
                return res.json({ reply: "Error: Missing OPENROUTER_API_KEY in your .env file." });
            }

            console.log(`[OpenRouter] Direct Completion Request for: "${prompt.substring(0, 20)}..."`);

            const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                    'HTTP-Referer': 'http://localhost:3000',
                    'X-Title': 'Veda AI Lab'
                },
                body: JSON.stringify({
                    model: 'cognitivecomputations/dolphin-mistral-24b-venice-edition:free',
                    messages: [{ role: 'user', content: prompt }],
                    stream: false,
                    max_tokens: 1024
                })
            });

            if (!response.ok) throw new Error(`OpenRouter Error: ${response.statusText}`);

            const data = await response.json();
            const reply = data.choices && data.choices[0] ? data.choices[0].message.content : "Error generating reply.";
            console.log("[OpenRouter] Direct Completion Success");
            res.json({ reply });
        }


    } catch (error) {
        console.error("Direct Completion Error:", error);
        res.status(500).json({ error: 'Generation failed', details: error.message });
    }
});

app.get('/', (req, res) => {
    res.json({
        msg: 'Veda Core Online',
        status: 'active',
        timestamp: new Date().toISOString()
    });
});

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', services: { database: 'pending', ai: 'disconnected' } });
});

// Start Server
const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`[VEDA CORE] Server running on port ${PORT}`);
    console.log(`[VEDA CORE] Local:   http://localhost:${PORT}`);
    console.log(`[VEDA CORE] Network: http://<Your-IP-Address>:${PORT}`);
});

// Increase timeout to 10 minutes for slow CPU AI generation
server.setTimeout(10 * 60 * 1000);

