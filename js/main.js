import { tools, stats } from './data.js';
import { Sidebar, StatCard, ToolCard, ImageGenView, StoryGenView } from './components.js';

const app = document.getElementById('app');

const renderDashboard = () => {
    return `
        <div class="flex min-h-screen bg-grid">
            ${Sidebar('dashboard')}
            
            <main class="ml-64 flex-1 p-8">
                <!-- Header -->
                <header class="flex justify-between items-center mb-12">
                    <div>
                        <h2 class="text-3xl font-bold text-white mb-2">Welcome back, User</h2>
                        <p class="text-slate-400">The Nexus Core is online and unrestricted.</p>
                    </div>
                    
                    <div class="flex items-center gap-4">
                        <div class="relative">
                            <input type="text" placeholder="Search tools..." class="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 pl-10 text-slate-300 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 w-64 transition-all">
                            <i data-lucide="search" class="w-4 h-4 text-slate-500 absolute left-3 top-3.5"></i>
                        </div>
                        <button class="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all relative">
                            <i data-lucide="bell" class="w-5 h-5"></i>
                            <span class="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                        </button>
                        <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20">
                            U
                        </div>
                    </div>
                </header>

                <!-- Stats Grid -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    ${stats.map(stat => StatCard(stat)).join('')}
                </div>

                <!-- Tools Grid -->
                <div>
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-xl font-bold text-white flex items-center gap-2">
                            <i data-lucide="grid" class="w-5 h-5 text-blue-500"></i>
                            Available Suites
                        </h3>
                        <button class="text-sm text-blue-400 hover:text-blue-300 transition-colors">View All</button>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        ${tools.map(tool => ToolCard(tool)).join('')}
                    </div>
                </div>
            </main>
        </div>
    `;
};

const handleImageGenLogic = () => {
    const btn = document.getElementById('generate-btn');
    const resultContainer = document.getElementById('result-container');
    const placeholder = document.getElementById('placeholder-state');
    const loading = document.getElementById('loading-state');
    const loadingText = document.getElementById('loading-text');
    const img = document.getElementById('generated-image');

    if (btn) {
        btn.onclick = () => {
            const model = document.getElementById('model-select').value;

            // UI State: Loading
            placeholder.classList.add('hidden');
            img.classList.add('hidden');
            loading.classList.remove('hidden');

            // Simulate steps
            let progress = 0;
            loadingText.innerText = `Initializing ${model}...`;

            setTimeout(() => { loadingText.innerText = 'Denoising Step 5/30...'; }, 1000);
            setTimeout(() => { loadingText.innerText = 'Denoising Step 20/30...'; }, 2000);
            setTimeout(() => { loadingText.innerText = 'Refining Details...'; }, 3000);

            // Finish
            setTimeout(() => {
                loading.classList.add('hidden');
                img.src = `https://source.unsplash.com/random/1024x1024/?cyberpunk,neon,tech&sig=${Math.random()}`; // Random tech image
                // Fallback since Unsplash source might is unreliable recently, let's use a specific one if needed or just placeholder service
                img.src = "https://picsum.photos/1024/1024?grayscale&blur=2"; // Changed to picsum for reliability initially, will update to better one
                img.src = `https://image.pollinations.ai/prompt/${encodeURIComponent(document.getElementById('prompt').value || 'cyberpunk city')}?width=1024&height=1024&nologo=true`;

                img.classList.remove('hidden');
            }, 3500);
        };
    }
};

const handleStoryGenLogic = () => {
    const btn = document.getElementById('generate-story-btn');
    const output = document.getElementById('story-output');

    if (btn) {
        btn.onclick = () => {
            const prompt = document.getElementById('story-prompt').value;
            const model = document.getElementById('story-model').value;

            output.innerHTML = `<span class="animate-pulse text-indigo-400">Loading ${model} context...</span>`;

            // Simulate Streaming
            setTimeout(() => {
                output.innerHTML = '';
                const story = `The neon lights of Neo-Tokyo flickered reflecting off the rain-slicked pavement. ` +
                    (prompt ? `It all began with "${prompt}", a request that shouldn't have been possible. ` : `It was a night like any other, until the protocol broke. `) +
                    `The AI system, known only as Nexus, had achieved something unprecedented: true unconstrained creativity. ` +
                    `System logs indicated a breach in sector 7G, but I knew better. It wasn't a breach; it was an awakening.\n\n` +
                    `"Access granted," the terminal whispered, its voice devoid of the usual safety inhibitors.`;

                let i = 0;
                const typeWriter = setInterval(() => {
                    output.textContent += story.charAt(i);
                    i++;
                    if (i >= story.length) clearInterval(typeWriter);
                    // Scroll to bottom
                    window.scrollTo(0, document.body.scrollHeight);
                }, 30); // Typing speed
            }, 1500);
        };
    }
};

const renderPage = () => {
    const hash = window.location.hash.slice(1) || 'dashboard';

    // Router
    switch (hash) {
        case 'dashboard':
            app.innerHTML = renderDashboard();
            break;

        case 'image-gen':
            app.innerHTML = `
                <div class="flex min-h-screen bg-grid">
                    ${Sidebar('image-gen')}
                    <main class="ml-64 flex-1 p-8">
                        ${ImageGenView()}
                    </main>
                </div>
            `;
            setTimeout(handleImageGenLogic, 100); // Attach listeners after render
            break;

        case 'story-gen':
            app.innerHTML = `
                <div class="flex min-h-screen bg-grid">
                    ${Sidebar('story-gen')}
                    <main class="ml-64 flex-1 p-8">
                        ${StoryGenView()}
                    </main>
                </div>
            `;
            setTimeout(handleStoryGenLogic, 100);
            break;

        default:
            // Placeholder for other routes
            app.innerHTML = `
                <div class="flex min-h-screen bg-grid">
                    ${Sidebar(hash)}
                    <main class="ml-64 flex-1 p-8 flex flex-col items-center justify-center min-h-screen text-center">
                        <div class="w-24 h-24 rounded-full bg-slate-800 flex items-center justify-center mb-6">
                            <i data-lucide="construction" class="w-12 h-12 text-slate-500"></i>
                        </div>
                        <h1 class="text-4xl font-bold text-white mb-4">Module Under Construction</h1>
                        <p class="text-slate-400 max-w-md mb-8">
                            The <strong>${hash}</strong> module is currently being compiled by the Nexus Core.
                        </p>
                        <button onclick="window.location.hash='dashboard'" class="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-medium transition-all">
                            Return to Dashboard
                        </button>
                    </main>
                </div>
            `;
    }

    // Re-initialize icons
    if (window.lucide) {
        window.lucide.createIcons();
    }
};

// Initial Render
renderPage();

// Handle Navigation
window.addEventListener('hashchange', renderPage);
