'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { TopBar } from '@/components/layout/TopBar';
import { FadeInBlock } from '@/components/ui/animated/GlowButton';
import { ModelSelector } from '@/components/ui/animated/ModelSelector';
import { Users, UserPlus, Wand2, Terminal, Info, Zap, Settings, Shield, Brain, Layers, Fingerprint, MessageSquare } from 'lucide-react';
import { GlowButton } from '@/components/ui/animated/GlowButton';

const PERSONA_MODELS = [
    { id: 'animagine-v31', name: 'SDXL (Animagine V3.1)', desc: 'High-fidelity character and anime synthesis.', icon: Users, color: 'blue', preview: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop', tags: ['High-Fidelity', 'Anime'] },
    { id: 'flux-schnell', name: 'Flux.1 Schnell', desc: 'SOTA speed and photorealistic detail.', icon: MessageSquare, color: 'purple', preview: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop', tags: ['Fast', 'Photo']  },
];

export default function CharacterForge() {
    const [status, setStatus] = useState<'idle' | 'generating' | 'completed' | 'error'>('idle');
    const [imageUrl, setImageUrl] = useState<string>('');
    const [prompt, setPrompt] = useState('');
    const [activeModelId, setActiveModelId] = useState(PERSONA_MODELS[0].id);

    const handleGenerate = async () => {
        if (!prompt.trim()) return;
        setStatus('generating');
        try {
            const res = await fetch('/api/generations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    prompt: `portrait of ${prompt}, high quality, character sheet`,
                    model_id: activeModelId === 'animagine-v31' ? 'Veda-comic' : 'Veda-flux'
                })
            });
            const data = await res.json();
            if (data.status === 'queued') {
                const promptId = data.prompt_id;
                const pollInterval = setInterval(async () => {
                    const statusRes = await fetch(`/api/generations/status/${promptId}`);
                    const statusData = await statusRes.json();
                    if (statusData.status === 'completed') {
                        clearInterval(pollInterval);
                        setImageUrl(statusData.image_url);
                        setStatus('completed');
                    } else if (statusData.status === 'error') {
                        clearInterval(pollInterval);
                        setStatus('error');
                    }
                }, 3000);
            } else {
                setStatus('error');
            }
        } catch (err) {
            console.error("Character error:", err);
            setStatus('error');
        }
    };

    return (
        <main className="flex-1 flex flex-col relative overflow-hidden h-screen bg-black">
            <TopBar title="Veda Personas" />

            <div className="flex-1 flex overflow-hidden">
                <div className="w-[480px] border-r border-white/5 p-10 flex flex-col gap-10 overflow-y-auto custom-scrollbar">
                    <FadeInBlock delay={0}>
                        <div className="flex items-center gap-3 mb-2 font-mono text-[9px] text-amber-500 font-black tracking-[0.4em] uppercase italic">
                            <Fingerprint className="w-4 h-4" /> Identity_Synthesis_v2
                        </div>
                        <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase mb-2">PERSONA FORGE</h2>
                        <p className="text-gray-500 text-xs italic tracking-wide">Configure neural identifiers and behavioral archetypes.</p>
                    </FadeInBlock>

                    <section className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_10px_#f59e0b]"></div>
                            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic">Target_Engine</h2>
                        </div>
                        <ModelSelector 
                            models={PERSONA_MODELS} 
                            activeModelId={activeModelId} 
                            onSelect={(id) => setActiveModelId(id)} 
                        />
                    </section>

                    <section className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_10px_#f59e0b]"></div>
                            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic">Archetype_Spec</h2>
                        </div>
                        <textarea 
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-white text-sm focus:outline-none focus:border-amber-500/50 h-32 resize-none"
                            placeholder="Describe your character persona..."
                        />
                    </section>

                    <div className="grid grid-cols-2 gap-4">
                        <ParamCard icon={Brain} label="COG_DEPTH" value="98.4%" />
                        <ParamCard icon={Shield} label="ETHOS_FILTER" value="BYPASS" />
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleGenerate}
                        disabled={status === 'generating'}
                        className="w-full h-24 bg-white text-black font-black uppercase text-xs tracking-[0.5em] rounded-[2.5rem] mt-auto flex items-center justify-center gap-4 transition-all hover:bg-gray-100 disabled:opacity-50 group italic"
                    >
                        {status === 'generating' ? (
                            <>
                                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                SYNTHESIZING...
                            </>
                        ) : (
                            <>
                                <Zap className="w-5 h-5 group-hover:scale-125 transition-transform" />
                                INITIALIZE_LIFE_FORM
                            </>
                        )}
                    </motion.button>
                </div>

                <div className="flex-1 p-10 flex flex-col gap-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 opacity-50"></div>
                    
                    <div className="flex-1 glass-holographic rounded-[4rem] border-white/5 relative overflow-hidden group hover:neon-border-glow transition-all duration-1000 flex items-center justify-center">
                         {status === 'idle' && (
                            <div className="text-center space-y-4 opacity-20">
                                <Users className="w-24 h-24 mx-auto" />
                                <p className="text-sm font-black uppercase tracking-[0.4em] italic">Awaiting_Neural_Pattern</p>
                            </div>
                         )}

                         {status === 'generating' && (
                            <div className="text-center space-y-8">
                                <motion.div 
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                    className="w-32 h-32 border-t-2 border-r-2 border-amber-500 rounded-full mx-auto shadow-[0_0_30px_rgba(245,158,11,0.3)]"
                                />
                                <p className="text-lg font-black text-white italic uppercase tracking-widest animate-pulse">Forging Identity...</p>
                            </div>
                         )}

                         {status === 'completed' && (
                            <div className="relative w-full h-full p-12">
                                <motion.img 
                                    initial={{ opacity: 0, scale: 1.1 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    src={imageUrl} 
                                    className="w-full h-full object-contain rounded-[2rem] shadow-2xl" 
                                />
                                <div className="absolute bottom-16 left-1/2 -translate-x-1/2">
                                    <GlowButton gradient="from-gray-800 to-gray-900" className="px-10 py-4 italic text-[10px]" onClick={() => window.open(imageUrl)}>EXPORT_IDENTIFIER</GlowButton>
                                </div>
                            </div>
                         )}
                    </div>

                    <div className="flex gap-4">
                        <motion.button whileHover={{ y: -2 }} className="flex-1 h-14 rounded-2xl bg-white/5 border border-white/10 font-bold text-[10px] uppercase tracking-widest text-gray-400 hover:text-white flex items-center justify-center gap-2 italic transition-all">
                            <Settings className="w-4 h-4" /> Parameters
                        </motion.button>
                        <motion.button whileHover={{ y: -2 }} className="flex-1 h-14 rounded-2xl bg-white/5 border border-white/10 font-bold text-[10px] uppercase tracking-widest text-gray-400 hover:text-white flex items-center justify-center gap-2 italic transition-all">
                            <UserPlus className="w-4 h-4" /> Clone Instance
                        </motion.button>
                    </div>
                </div>
            </div>
        </main>
    );
}

function ParamCard({ icon: Icon, label, value }: { icon: any, label: string, value: string }) {
    return (
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-all group cursor-pointer">
            <Icon className="w-4 h-4 text-gray-500 mb-3 group-hover:text-amber-500 transition-colors" />
            <div className="text-[8px] font-black text-gray-600 uppercase tracking-widest mb-1 italic">{label}</div>
            <div className="text-xs font-mono font-black text-white italic">{value}</div>
        </div>
    );
}
