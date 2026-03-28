'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { TopBar } from '@/components/layout/TopBar';
import { ModelSelector } from '@/components/ui/animated/ModelSelector';
import { PromptAlchemist } from '@/components/ui/animated/PromptAlchemist';
import { useVedaStore } from '@/lib/store';
import { Sparkles, BookOpen, Wand2, Terminal, Info, Zap, Settings, Share2, Save, MessageSquare } from 'lucide-react';

const STORY_MODELS = [
    { id: 'llama3:latest', name: 'Llama 3 (8B)', desc: 'High-logic narrative synthesis and creative development.', icon: BookOpen, color: 'blue', preview: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=400&auto=format&fit=crop', tags: ['High-Logic', 'Reasoning'] },
];

export default function StoryMode() {
    const [status, setStatus] = useState<'idle' | 'generating' | 'completed' | 'error'>('idle');
    const [story, setStory] = useState('');
    const [prompt, setPrompt] = useState('');
    const [activeModelId, setActiveModelId] = useState(STORY_MODELS[0].id);
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
        setStory('');
        try {
            const res = await fetch('/api/story', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    prompt: prompt,
                    style: 'gripping',
                    mode: 'text'
                })
            });
            const data = await res.json();
            if (data.story) {
                setStory(data.story);
                setStatus('completed');
            } else {
                setStatus('error');
            }
        } catch (err) {
            console.error("Story error:", err);
            setStatus('error');
        }
    };

    return (
        <main className="flex-1 flex flex-col relative overflow-hidden h-screen bg-black">
            <TopBar title="Veda Story Mode" />

            <div className="flex-1 flex overflow-hidden">
                {/* Left Panel: Creative Controls */}
                <div className="w-[450px] border-r border-white/10 bg-[#050505] flex flex-col overflow-y-auto custom-scrollbar relative z-20">
                    <div className="p-10 space-y-12 pb-32">
                        {/* Header Section */}
                        <div className="space-y-6">
                            <div className="w-20 h-20 rounded-[1.8rem] bg-gradient-to-br from-[#050505] to-[#111] border border-white/20 flex items-center justify-center shadow-2xl relative overflow-hidden group hover:neon-border-glow transition-all duration-700">
                                <motion.div
                                    className="absolute inset-0 bg-[#a855f7]/10"
                                    animate={{ opacity: [0.1, 0.3, 0.1] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                />
                                <BookOpen className="w-10 h-10 text-[#a855f7] drop-shadow-[0_0_8px_#a855f7]" />
                            </div>
                            <div>
                                <h1 className="text-4xl font-black text-white tracking-tighter uppercase leading-none">VEDA STORY MODE</h1>
                                <p className="text-gray-600 text-[10px] font-mono tracking-[0.4em] mt-3 font-black uppercase">ULTRA_LEXICON_v5 // NARRATIVE_SYNTHESIS</p>
                            </div>
                        </div>

                        {/* Model Selection */}
                        <div className="space-y-8">
                            <div className="flex items-center justify-between">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 flex items-center gap-4">
                                    <div className="w-2 h-2 rounded-full bg-[#a855f7] shadow-[0_0_10px_#a855f7]"></div>
                                    Language_Engine_Select
                                </h3>
                                <span className="text-[9px] font-mono font-black text-[#a855f7]/60 uppercase tracking-widest">Dolphin_8B_Core</span>
                            </div>
                            <ModelSelector models={STORY_MODELS} activeModelId={activeModelId} onSelect={(id) => setActiveModelId(id)} />
                        </div>

                        {/* Prompt Alchemist for Story */}
                        <div className="space-y-8 pt-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 flex items-center gap-4">
                                    <div className="w-2 h-2 rounded-full bg-[#f59e0b] shadow-[0_0_10px_#f59e0b]"></div>
                                    Narrative_Alchemy
                                </h3>
                                <Settings className="w-4 h-4 text-gray-800" />
                            </div>
                            <textarea 
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-white text-sm focus:outline-none focus:border-amber-500/50 h-32 resize-none"
                                placeholder="Enter your narrative premise..."
                            />
                        </div>

                        {/* Creative Parameters HUD */}
                        <div className="grid grid-cols-2 gap-6">
                            <div className="p-5 bg-white/[0.02] border border-white/5 rounded-[1.5rem] space-y-2 group/metric hover:neon-border-glow transition-all">
                                <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest">Creativity_Index</span>
                                <div className="flex items-center justify-between">
                                    <span className="text-xl font-black text-white">0.95</span>
                                    <Zap className="w-5 h-5 text-[#f59e0b]" />
                                </div>
                            </div>
                            <div className="p-5 bg-white/[0.02] border border-white/5 rounded-[1.5rem] space-y-2 group/metric hover:neon-border-glow transition-all">
                                <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest">Context_Length</span>
                                <div className="flex items-center justify-between">
                                    <span className="text-xl font-black text-white">128_K</span>
                                    <Info className="w-5 h-5 text-[#a855f7]" />
                                </div>
                            </div>
                        </div>

                        {/* Generation Action */}
                        <button
                            onClick={handleGenerate}
                            disabled={status === 'generating'}
                            className="w-full py-7 bg-white text-black rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-[10px] hover:bg-gray-100 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden shadow-2xl"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-4">
                                {status === 'generating' ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                        Weaving_Neural_Narrative...
                                    </>
                                ) : (
                                    <>
                                        <Wand2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                                        Initiate_Synthesis
                                    </>
                                )}
                            </span>
                        </button>
                    </div>

                    {/* Bottom Console Info */}
                    <div className="p-6 bg-[#020202] border-t border-white/5 mt-auto flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Terminal className="w-4 h-4 text-gray-700" />
                            <span className="text-[8px] font-mono font-black text-gray-700 uppercase tracking-[0.3em]">Story_Socket: CALIBRATED_READY</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-[#10b981]/40 shadow-[0_0_8px_#10b981]"></div>
                            <span className="text-[8px] font-mono font-black text-[#10b981]/60 uppercase tracking-widest">SECURE_NARRATIVE_LINK</span>
                        </div>
                    </div>
                </div>

                {/* Main Content: The Manuscript Canvas */}
                <div className="flex-1 bg-[#020202] relative flex flex-col items-center justify-center p-12 overflow-hidden">
                    <div className="absolute inset-0 bg-grid-white opacity-[0.02]"></div>
                    {/* Background Ambient Glows */}
                    <div className="absolute top-1/4 -right-1/4 w-[500px] h-[500px] bg-[#a855f7]/5 blur-[150px] animate-pulse"></div>
                    <div className="absolute bottom-1/4 -left-1/4 w-[500px] h-[500px] bg-[#f59e0b]/5 blur-[150px] animate-pulse"></div>

                    <div className="w-full h-full relative z-10 glass-holographic p-12 rounded-[4rem] border-white/5 hover:neon-border-glow transition-all duration-700 overflow-y-auto custom-scrollbar">
                         {status === 'idle' ? (
                            <div className="h-full flex flex-col items-center justify-center opacity-10 text-center space-y-8">
                                <BookOpen className="w-24 h-24" />
                                <p className="text-xl font-black uppercase tracking-[0.5em] italic">Awaiting_Manuscript_Input</p>
                            </div>
                        ) : (
                            <div className="max-w-3xl mx-auto py-12">
                                <p className="text-gray-300 text-lg leading-relaxed font-serif whitespace-pre-wrap">{story || 'Synthesizing neural lexicon...'}</p>
                            </div>
                        )}
                        {status === 'generating' && (
                             <div className="absolute inset-0 bg-black/60 backdrop-blur-3xl flex flex-col items-center justify-center">
                                <motion.div 
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                    className="w-24 h-24 border-t-2 border-r-2 border-amber-500 rounded-full mb-8 shadow-[0_0_30px_rgba(245,158,11,0.3)]"
                                />
                                <p className="text-xl font-black text-white italic uppercase tracking-widest animate-pulse">Architecting Narrative Depth...</p>
                            </div>
                        )}
                    </div>

                    {/* Decorative Bottom Credits info */}
                    <div className="absolute bottom-8 flex gap-12 text-gray-800">
                        <div className="flex items-center gap-3">
                            <span className="text-[10px] font-mono font-black uppercase tracking-[0.3em]">Usage:</span>
                            <span className="text-[10px] font-black text-gray-600">PREMIUM_TOKEN_ACT</span>
                        </div>
                        <div className="w-px h-4 bg-white/5"></div>
                        <div className="flex items-center gap-3">
                            <span className="text-[10px] font-mono font-black uppercase tracking-[0.3em]">Engine:</span>
                            <span className="text-[10px] font-black text-gray-600">DOLPHIN_8B_CORE</span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

