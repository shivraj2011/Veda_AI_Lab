// Reusable UI Elements
const InputGroup = (label, id, type = 'text', placeholder = '', value = '') => `
    <div class="space-y-2">
        <label for="${id}" class="text-xs font-semibold text-slate-400 uppercase tracking-wider">${label}</label>
        <input type="${type}" id="${id}" placeholder="${placeholder}" value="${value}" 
            class="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:bg-slate-800/50 transition-all placeholder:text-slate-600">
    </div>
`;

const SelectGroup = (label, id, options) => `
    <div class="space-y-2">
        <label for="${id}" class="text-xs font-semibold text-slate-400 uppercase tracking-wider">${label}</label>
        <div class="relative">
            <select id="${id}" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 appearance-none cursor-pointer">
                ${options.map(opt => `<option value="${opt.value}">${opt.label}</option>`).join('')}
            </select>
            <i data-lucide="chevron-down" class="absolute right-4 top-3.5 w-4 h-4 text-slate-500 pointer-events-none"></i>
        </div>
    </div>
`;

const TextAreaGroup = (label, id, placeholder = '', rows = 3) => `
    <div class="space-y-2">
        <label for="${id}" class="text-xs font-semibold text-slate-400 uppercase tracking-wider">${label}</label>
        <textarea id="${id}" rows="${rows}" placeholder="${placeholder}" 
            class="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:bg-slate-800/50 transition-all placeholder:text-slate-600 resize-none"></textarea>
    </div>
`;

// Views
export const ImageGenView = () => `
    <div class="max-w-6xl mx-auto">
        <header class="mb-8 relative z-10">
            <div class="flex items-center gap-3 mb-2">
                <div class="p-2 bg-blue-500/20 rounded-lg">
                    <i data-lucide="image" class="w-6 h-6 text-blue-400"></i>
                </div>
                <h2 class="text-3xl font-bold text-white">Unrestricted Image Generator</h2>
            </div>
            <p class="text-slate-400 max-w-2xl">Generate specific, high-quality visuals using advanced local models. No safety filters applied.</p>
        </header>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Controls Panel -->
            <div class="lg:col-span-1 space-y-6">
                <div class="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-6">
                    ${SelectGroup('AI Model', 'model-select', [
    { value: 'pony-v6', label: 'Pony Diffusion V6 (Uncensored)' },
    { value: 'sdxl-turbo', label: 'Stable Diffusion XL Turbo' },
    { value: 'juggernaut', label: 'Juggernaut XL' },
    { value: 'reality-engine', label: 'Reality Engine 4.0' }
])}

                    ${SelectGroup('Aspect Ratio', 'aspect-ratio', [
    { value: '1:1', label: 'Square (1:1)' },
    { value: '16:9', label: 'Cinematic (16:9)' },
    { value: '9:16', label: 'Portrait (9:16)' }
])}

                    <div class="grid grid-cols-2 gap-4">
                        ${InputGroup('Steps', 'steps', 'number', '30', '30')}
                        ${InputGroup('CFG Scale', 'cfg', 'number', '7.0', '7.0')}
                    </div>
                </div>

                <button id="generate-btn" class="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 group">
                    <i data-lucide="sparkles" class="w-5 h-5 group-hover:scale-110 transition-transform"></i>
                    <span>Generate Image</span>
                </button>
            </div>

            <!-- Prompt & Result Area -->
            <div class="lg:col-span-2 space-y-6">
                <div class="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
                    ${TextAreaGroup('Positive Prompt', 'prompt', 'Describe what you want to see... be specific.', 3)}
                    ${TextAreaGroup('Negative Prompt', 'neg-prompt', 'Low quality, blurry, watermark, bad anatomy...', 2)}
                </div>

                <!-- Result Container -->
                <div id="result-container" class="bg-slate-900 border border-slate-800 rounded-2xl p-2 min-h-[400px] flex items-center justify-center relative overflow-hidden group">
                    <!-- Placeholder State -->
                    <div id="placeholder-state" class="text-center">
                        <div class="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i data-lucide="image-plus" class="w-10 h-10 text-slate-600"></i>
                        </div>
                        <p class="text-slate-500">Ready to create</p>
                    </div>
                    
                    <!-- Loading State (Hidden by default) -->
                    <div id="loading-state" class="hidden absolute inset-0 bg-slate-900 z-20 flex flex-col items-center justify-center">
                        <div class="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mb-4"></div>
                        <p class="text-blue-400 font-mono animate-pulse">Running Inference...</p>
                        <p class="text-slate-500 text-sm mt-2" id="loading-text">Loading Model Weights (6.4GB)</p>
                    </div>

                    <!-- Image Result (Hidden by default) -->
                    <img id="generated-image" src="" alt="Generated Result" class="hidden w-full h-full object-cover rounded-xl shadow-2xl">
                </div>
            </div>
        </div>
    </div>
`;

export const StoryGenView = () => `
    <div class="max-w-4xl mx-auto">
        <header class="mb-8">
            <div class="flex items-center gap-3 mb-2">
                <div class="p-2 bg-indigo-500/20 rounded-lg">
                    <i data-lucide="book-open" class="w-6 h-6 text-indigo-400"></i>
                </div>
                <h2 class="text-3xl font-bold text-white">Unrestricted Story Writer</h2>
            </div>
            <p class="text-slate-400">Co-write stories with uncensored large language models.</p>
        </header>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            ${SelectGroup('Model', 'story-model', [
    { value: 'llama3-uncensored', label: 'Llama 3 (Uncensored)' },
    { value: 'mistral-openorca', label: 'Mistral OpenOrca' },
    { value: 'dolphin-mixtral', label: 'Dolphin Mixtral 8x7b' }
])}
            ${InputGroup('Max Tokens', 'max-tokens', 'number', '2048', '1024')}
            ${InputGroup('Temperature', 'temp', 'number', '0.7', '0.8')}
        </div>

        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6">
            ${TextAreaGroup('Story Premise / Prompt', 'story-prompt', 'Write a story about...', 4)}
        </div>

        <button id="generate-story-btn" class="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-indigo-500/20 mb-8">
            Start Writing
        </button>

        <!-- Output Area -->
        <div class="bg-slate-950 border border-slate-800 rounded-2xl p-8 min-h-[300px]">
            <div id="story-output" class="prose prose-invert max-w-none text-slate-300 leading-relaxed font-serif text-lg">
                <span class="text-slate-600 italic">Story output will appear here...</span>
            </div>
        </div>
    </div>
`;

export const Sidebar = (activePage = 'dashboard') => {
    // ... (Keeping the same Sidebar code as before, just ensuring export)
    const links = [
        { id: 'dashboard', icon: 'layout-dashboard', label: 'Dashboard' },
        { id: 'image-gen', icon: 'image', label: 'Image Generator' },
        { id: 'video-gen', icon: 'video', label: 'Video Generator' },
        { id: 'story-gen', icon: 'book-open', label: 'Story Generator' },
        { id: 'settings', icon: 'settings', label: 'Settings' },
    ];

    return `
        <aside class="w-64 bg-slate-900 border-r border-slate-700 flex flex-col h-screen fixed left-0 top-0 z-50 shadow-xl">
            <div class="p-6">
                <div class="flex items-center gap-3">
                    <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68bb17e0b4613104f7aecdc5/c2c9bcc60_logo.png" class="w-8 h-8 rounded-full shadow-lg shadow-blue-500/50" alt="Logo">
                    <h1 class="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">NEXUS CORE</h1>
                </div>
            </div>
            
            <nav class="flex-1 px-4 space-y-2 mt-4">
                ${links.map(link => `
                    <a href="#${link.id}" 
                       class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                              ${activePage === link.id ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-800'}">
                        <i data-lucide="${link.icon}" class="w-5 h-5 transition-transform group-hover:scale-110 ${activePage === link.id ? 'animate-pulse' : ''}"></i>
                        <span class="font-medium">${link.label}</span>
                    </a>
                `).join('')}
            </nav>

            <div class="p-4 border-t border-slate-700">
                <div class="p-4 rounded-xl bg-slate-800 border border-slate-600">
                    <div class="flex items-center gap-2 mb-2">
                        <i data-lucide="crown" class="w-4 h-4 text-yellow-500"></i>
                        <span class="text-xs font-bold text-yellow-500 tracking-wider">UNRESTRICTED</span>
                    </div>
                    <p class="text-xs text-slate-300">System running at 100% capacity. No limits applied.</p>
                </div>
            </div>
        </aside>
    `;
};

// ... (Exporting StatCard and ToolCard as well if needed, but not changed)
export const StatCard = (stat) => `
    <div class="glass-card p-6 rounded-2xl relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
        <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-600/10 to-transparent rounded-bl-full -mr-10 -mt-10 transition-opacity group-hover:opacity-100 opacity-50"></div>
        <div class="relative z-10">
            <div class="flex items-center justify-between mb-4">
                <div class="p-3 rounded-lg bg-slate-700 group-hover:bg-blue-600/20 transition-colors">
                    <i data-lucide="${stat.icon}" class="w-6 h-6 text-blue-400"></i>
                </div>
                <span class="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-500/20">ACTIVE</span>
            </div>
            <h3 class="text-3xl font-bold text-white mb-1 group-hover:text-blue-200 transition-colors">${stat.value}</h3>
            <p class="text-slate-200 text-sm">${stat.label}</p>
        </div>
    </div>
`;

export const ToolCard = (tool) => `
    <div class="glass-card p-0 rounded-2xl group hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 border-none">
        <a href="#${tool.id}" class="block h-full"> 
            <div class="bg-slate-800 p-6 rounded-xl h-full flex flex-col relative overflow-hidden border border-slate-700 group-hover:border-blue-500/50 transition-colors">
                <div class="absolute inset-0 bg-gradient-to-br from-${tool.color.split('-')[1]}-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div class="flex justify-between items-start mb-6 relative z-10">
                    <div class="w-12 h-12 rounded-xl bg-slate-700 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <i data-lucide="${tool.icon}" class="w-6 h-6 ${tool.color}"></i>
                    </div>
                    <div class="bg-slate-700 text-white p-2 rounded-lg transition-colors group-hover:bg-blue-600">
                        <i data-lucide="arrow-right" class="w-4 h-4"></i>
                    </div>
                </div>
                
                <div class="mt-auto relative z-10">
                    <h3 class="text-xl font-bold text-white mb-2 group-hover:translate-x-1 transition-transform">${tool.title}</h3>
                    <p class="text-sm text-slate-300 line-clamp-2 mb-4">${tool.description}</p>
                    <div class="flex items-center gap-2">
                        <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        <span class="text-xs font-medium text-slate-400 group-hover:text-green-400 transition-colors">${tool.status}</span>
                    </div>
                </div>
            </div>
        </a>
    </div>
`;
