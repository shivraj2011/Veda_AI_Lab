'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { FadeInBlock } from '@/components/ui/animated/GlowButton';
import { TopBar } from '@/components/layout/TopBar';
import { ModelSelector } from '@/components/ui/animated/ModelSelector';
import { PromptAlchemist } from '@/components/ui/animated/PromptAlchemist';
import { useVedaStore } from '@/lib/store';
import { Video, Wand2, Zap, Sparkles, Film } from 'lucide-react';

const VIDEO_MODELS = [
    { id: 'wan', name: 'WanVideo 2.2', desc: 'SOTA cinematic video generation.', icon: Film, color: 'blue', preview: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=400&auto=format&fit=crop', tags: ['SOTA', 'Cinematic'] },
    { id: 'ltx', name: 'LTX-Video', desc: 'Fast, high-fidelity motion synthesis.', icon: Zap, color: 'purple', preview: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&auto=format&fit=crop', tags: ['High-Speed', 'Motion'] },
];

export default function VideoStudio() {
    const [status, setStatus] = useState<'idle' | 'generating' | 'completed' | 'error'>('idle');
    const [videoUrl, setVideoUrl] = useState<string>('');
    const [activeModelId, setActiveModelId] = useState(VIDEO_MODELS[0].id);
    const [prompt, setPrompt] = useState('');
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
            const res = await fetch('/api/video', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    prompt: prompt,
                    model: activeModelId
                })
            });

            const data = await res.json();
            if (data.status === 'queued') {
                // Polling for status
                const promptId = data.prompt_id;
                const pollInterval = setInterval(async () => {
                    const statusRes = await fetch(`/api/video/status/${promptId}`);
                    const statusData = await statusRes.json();
                    
                    if (statusData.status === 'completed') {
                        clearInterval(pollInterval);
                        setVideoUrl(statusData.video_url);
                        setStatus('completed');
                    } else if (statusData.status === 'error') {
                        clearInterval(pollInterval);
                        setStatus('error');
                    }
                }, 5000);
            } else {
                setStatus('error');
            }
        } catch (err) {
            console.error("Video error:", err);
            setStatus('error');
        }
    };

    return (
        <main className="flex-1 flex flex-col relative overflow-hidden">
            <TopBar title="Veda Motion Studio" />

            <div className="flex-1 overflow-y-auto p-12 relative custom-scrollbar">
                <FadeInBlock delay={0}>
                    <div className="text-center mb-16 relative border-b border-white/5 pb-16">
                        <div className="flex justify-center items-center mb-8 relative">
                            <div className="absolute w-32 h-32 bg-purple-500/10 rounded-full blur-[80px] animate-pulse"></div>
                            <div className="relative w-20 h-20 bg-gradient-to-br from-[#050505] to-[#111] rounded-3xl flex items-center justify-center shadow-2xl border border-white/10 group-hover:neon-border-glow transition-all duration-700">
                                <Video className="w-10 h-10 text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
                            </div>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black mb-4 bg-gradient-to-r from-white via-white to-gray-500 bg-clip-text text-transparent tracking-tighter uppercase leading-none italic">VEDA MOTION STUDIO</h1>
                        <p className="text-xl text-gray-500 font-light tracking-[0.4em] uppercase italic">Temporal Synthesis Engine • Motion Graphics Core</p>
                    </div>
                </FadeInBlock>

                <div className="grid lg:grid-cols-12 gap-12 items-start relative z-10">
                    <div className="lg:col-span-4 space-y-10">
                        <section className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_10px_#a855f7]"></div>
                                <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic">Temporal_Model_Select</h2>
                            </div>
                            <ModelSelector 
                                models={VIDEO_MODELS}
                                activeModelId={activeModelId}
                                onSelect={(id) => setActiveModelId(id)}
                            />
                        </section>

                        <section className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_10px_#a855f7]"></div>
                                <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic">Directive_Input</h2>
                            </div>
                            <PromptAlchemist 
                                onEnhance={(p) => setPrompt(p)} 
                                activeTool="video" 
                            />
                            <textarea 
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-white text-sm focus:outline-none focus:border-purple-500/50 h-32 resize-none"
                                placeholder="Describe the motion sequence..."
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
                                    SYNTHESIZING...
                                </>
                            ) : (
                                <>
                                    <Zap className="w-5 h-5" />
                                    INITIALIZE_MOTION
                                </>
                            )}
                        </motion.button>
                    </div>

                    <div className="lg:col-span-8">
                        <div className="glass-holographic rounded-[3.5rem] p-4 border-white/5 shadow-2xl min-h-[600px] flex items-center justify-center overflow-hidden hover:neon-border-glow transition-all duration-700">
                           {status === 'completed' && videoUrl ? (
                               <video src={videoUrl} controls autoPlay loop className="w-full h-full object-contain rounded-[3rem]" />
                           ) : (
                               <div className="text-center space-y-6 opacity-20">
                                   <Film className="w-24 h-24 mx-auto" />
                                   <p className="text-[10px] font-black uppercase tracking-[0.5em] italic">Awaiting_Temporal_Input</p>
                               </div>
                           )}
                           {status === 'generating' && (
                               <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center backdrop-blur-3xl">
                                   <div className="relative mb-8">
                                       <Zap className="w-16 h-16 text-purple-500 animate-pulse relative z-10" />
                                       <div className="absolute inset-0 bg-purple-500/30 blur-[40px] rounded-full animate-pulse"></div>
                                   </div>
                                   <p className="text-purple-400 font-mono text-[10px] tracking-[0.4em] animate-pulse uppercase italic">Temporal Synthesis Active • Rendering Frames...</p>
                               </div>
                           )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
