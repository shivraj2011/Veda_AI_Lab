'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { TopBar } from '@/components/layout/TopBar';
import { FadeInBlock } from '@/components/ui/animated/GlowButton';
import { useVedaStore } from '@/lib/store';
import { Layers, Wand2, Sparkles, BookOpen, PenTool, Layout, Plus, Clapperboard, Zap } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const COMIC_MODELS = [
    { id: 'animagine-comic', name: 'Animagine XL 3.1', desc: 'SOTA anime and illustrative synthesis.', icon: Layers, color: 'blue', preview: 'https://images.unsplash.com/photo-1578632738981-4fe6506d393b?q=80&w=400&auto=format&fit=crop' },
    { id: 'dolphin-script', name: 'Dolphin-Llama-3 (8B)', desc: 'High-logic narrative scripting and layout.', icon: Clapperboard, color: 'amber', preview: 'https://images.unsplash.com/photo-1531259683007-016a7b628fc3?q=80&w=400&auto=format&fit=crop' },
];

export default function ComicStudio() {
    const [status, setStatus] = useState<'idle' | 'generating' | 'completed' | 'error'>('idle');
    const [panels, setPanels] = useState<{image: string, caption: string}[]>([]);
    const [prompt, setPrompt] = useState('');
    const [activeModelId, setActiveModelId] = useState(COMIC_MODELS[0].id);
    const useCredits = useVedaStore((state) => state.useCredits);

    const handleGenerate = async () => {
        if (!prompt.trim()) return;

        // 0. Deduct Credits
        const success = useCredits(10);
        if (!success) {
            alert("INSUFFICIENT NEURAL CREDITS. HARVEST MORE IN REWARDS SECTOR.");
            return;
        }

        setStatus('generating');
        try {
            const res = await fetch('/api/story', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    prompt: prompt,
                    style: 'manga',
                    mode: 'comic'
                })
            });
            const data = await res.json();
            if (data.panels) {
                setPanels(data.panels);
                setStatus('completed');
            } else {
                setStatus('error');
            }
        } catch (err) {
            console.error("Comic error:", err);
            setStatus('error');
        }
    };

    return (
        <main className="flex-1 flex flex-col relative overflow-hidden h-screen bg-black">
            <TopBar title="Veda Comic Builder" />

            <div className="flex-1 overflow-y-auto p-12 relative custom-scrollbar">
                <FadeInBlock delay={0}>
                    <div className="text-center mb-16 relative border-b border-white/5 pb-16">
                        <div className="flex justify-center items-center mb-8 relative">
                            <div className="absolute w-32 h-32 bg-blue-500/10 rounded-full blur-[80px] animate-pulse"></div>
                            <div className="relative w-20 h-20 bg-gradient-to-br from-[#050505] to-[#111] rounded-3xl flex items-center justify-center shadow-2xl border border-white/10 group-hover:neon-border-glow transition-all duration-700">
                                <Layers className="w-10 h-10 text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]" />
                            </div>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black mb-4 bg-gradient-to-r from-white via-white to-gray-500 bg-clip-text text-transparent tracking-tighter uppercase leading-none italic">VEDA COMIC BUILDER</h1>
                        <p className="text-xl text-gray-500 font-light tracking-[0.4em] uppercase italic">Sequential Narrative Synthesis • Illustrative Neural Core</p>
                    </div>
                </FadeInBlock>

                <div className="grid lg:grid-cols-12 gap-12 relative z-10">
                    <div className="lg:col-span-4 space-y-10">
                        <section className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_10px_#60a5fa]"></div>
                                <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic">Core_Logic_Engines</h2>
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                {COMIC_MODELS.map(model => (
                                    <button 
                                        key={model.id} 
                                        onClick={() => setActiveModelId(model.id)}
                                        className={cn("text-left p-4 rounded-3xl bg-black/40 border transition-all group overflow-hidden relative", activeModelId === model.id ? "border-blue-400" : "border-white/5 hover:border-blue-400/30")}
                                    >
                                        <div className="relative z-10">
                                            <div className="flex items-center gap-3 mb-2">
                                                <model.icon className="w-4 h-4 text-blue-400" />
                                                <span className="text-sm font-black text-white italic">{model.name}</span>
                                            </div>
                                            <p className="text-[10px] text-gray-500 italic">{model.desc}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </section>

                        <div className="bg-black/40 border border-white/5 rounded-3xl p-8 space-y-8">
                             <section className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_10px_#60a5fa]"></div>
                                    <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic">Chronicle_Script</h2>
                                </div>
                                <textarea 
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-white text-sm focus:outline-none focus:border-blue-500/50 h-32 resize-none"
                                    placeholder="Enter your comic premise..."
                                />
                            </section>
                            
                            <motion.button
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleGenerate}
                                disabled={status === 'generating'}
                                className="w-full h-20 bg-white text-black font-black uppercase text-xs tracking-[0.4em] rounded-[2rem] shadow-[0_20px_40px_rgba(255,255,255,0.1)] flex items-center justify-center gap-4 transition-all hover:bg-gray-100 disabled:opacity-50 italic"
                            >
                                {status === 'generating' ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                        RENDERING_PANELS...
                                    </>
                                ) : (
                                    <>
                                        <Zap className="w-5 h-5" />
                                        INITIALIZE_CHRONICLE
                                    </>
                                )}
                            </motion.button>
                        </div>
                    </div>

                    <div className="lg:col-span-8">
                        <div className="glass-holographic rounded-[3.5rem] p-10 border-white/5 shadow-2xl min-h-[700px] relative hover:neon-border-glow transition-all duration-700">
                            {status === 'generating' && (
                                <div className="absolute inset-0 z-50 rounded-[3.5rem] bg-black/60 backdrop-blur-md flex flex-col items-center justify-center">
                                    <motion.div 
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                        className="w-24 h-24 border-t-2 border-r-2 border-blue-400 rounded-full mb-8 shadow-[0_0_30px_rgba(96,165,250,0.3)]"
                                    />
                                    <p className="text-xl font-black text-white italic uppercase tracking-widest animate-pulse">Synthesizing Narrative Structure...</p>
                                </div>
                            )}

                            <div className="grid grid-cols-2 gap-8 h-full">
                                {(status === 'completed' ? panels : [1, 2, 3, 4]).map((p, i) => (
                                    <div key={i} className="aspect-[4/5] rounded-[2rem] bg-white/[0.02] border border-white/5 overflow-hidden group relative cursor-pointer hover:border-blue-400/20 transition-all">
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <PenTool className="w-8 h-8 text-white/5 group-hover:text-blue-400/20 transition-all" />
                                        </div>
                                        <div className="absolute top-4 left-4 h-6 w-6 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center font-bold text-[10px] italic z-20">
                                            0{i + 1}
                                        </div>
                                        {status === 'completed' && panels[i] && (
                                            <>
                                                <motion.img 
                                                    initial={{ opacity: 0, scale: 1.1 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    src={panels[i].image} 
                                                    className="w-full h-full object-cover" 
                                                />
                                                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                                                    <p className="text-[10px] text-white font-medium italic line-clamp-2">{panels[i].caption}</p>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
