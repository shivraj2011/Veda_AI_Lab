'use client';

import { motion } from 'framer-motion';
import { TopBar } from '@/components/layout/TopBar';
import { FadeInBlock } from '@/components/ui/animated/GlowButton';
import { Box, Upload, Zap, Layers, Cuboid } from 'lucide-react';
import { useState } from 'react';
import { ModelSelector } from '@/components/ui/animated/ModelSelector';
import { GlowButton } from '@/components/ui/animated/GlowButton';
import { useVedaStore } from '@/lib/store';

const THREE_D_MODELS = [
    { id: 'triposr', name: 'TripoSR', desc: 'Fast image-to-3D mesh generation.', icon: Box, color: 'blue', preview: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&auto=format&fit=crop', tags: ['Fast', 'Mesh'] },
    { id: 'splat', name: 'Gaussian Splatting', desc: 'Volumetric radiance field reconstruction.', icon: Layers, color: 'emerald', preview: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=400&auto=format&fit=crop', tags: ['Volumetric', 'Splat'] },
];

export default function Studio3D() {
    const [status, setStatus] = useState<'idle' | 'generating' | 'completed' | 'error'>('idle');
    const [meshUrl, setMeshUrl] = useState<string>('');
    const [activeModelId, setActiveModelId] = useState(THREE_D_MODELS[0].id);
    const useCredits = useVedaStore((state) => state.useCredits);

    const handleForge = async () => {
        // 0. Deduct Credits
        const success = useCredits(15);
        if (!success) {
            alert("INSUFFICIENT NEURAL CREDITS. HARVEST MORE IN REWARDS SECTOR.");
            return;
        }

        setStatus('generating');
        try {
            const res = await fetch('/api/3d', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    prompt: '3D Mesh Generation',
                    model_id: activeModelId
                })
            });

            const data = await res.json();
            if (data.status === 'queued') {
                const promptId = data.prompt_id;
                const pollInterval = setInterval(async () => {
                    const statusRes = await fetch(`/api/3d/status/${promptId}`);
                    const statusData = await statusRes.json();
                    
                    if (statusData.status === 'completed') {
                        clearInterval(pollInterval);
                        setMeshUrl(statusData.mesh_url);
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
            console.error("3D error:", err);
            setStatus('error');
        }
    };

    return (
        <main className="flex-1 flex flex-col relative overflow-hidden h-screen bg-black">
            <TopBar title="Veda 3D Studio" />

            <div className="flex-1 overflow-y-auto p-12 relative custom-scrollbar">
                <FadeInBlock delay={0}>
                    <div className="text-center mb-16 relative border-b border-white/5 pb-16">
                        <div className="flex justify-center items-center mb-8 relative">
                            <div className="absolute w-32 h-32 bg-amber-500/10 rounded-full blur-[80px] animate-pulse"></div>
                            <div className="relative w-24 h-24 bg-gradient-to-br from-[#050505] to-[#111] rounded-[2.5rem] flex items-center justify-center shadow-[0_0_50px_rgba(251,191,36,0.2)] border border-white/10 hover:neon-border-glow transition-all duration-700">
                                <Box className="w-12 h-12 text-amber-500 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
                            </div>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black mb-4 bg-gradient-to-r from-white via-white to-gray-500 bg-clip-text text-transparent tracking-tighter uppercase leading-none italic">VEDA 3D STUDIO</h1>
                        <p className="text-xl text-gray-500 font-light tracking-[0.4em] uppercase italic">Multi-Dimensional Mesh Synthesis • Voxel Core Architecture</p>
                    </div>
                </FadeInBlock>

                <div className="grid lg:grid-cols-12 gap-12 relative z-10">
                    <div className="lg:col-span-4 space-y-10">
                        <section className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_10px_#fbbf24]"></div>
                                <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic">Core_Voxel_Engine</h2>
                            </div>
                            <ModelSelector 
                                models={THREE_D_MODELS} 
                                activeModelId={activeModelId} 
                                onSelect={(id) => setActiveModelId(id)} 
                            />
                        </section>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-black/40 border border-white/5 rounded-2xl p-6 text-center group hover:border-amber-500/20 transition-all cursor-pointer">
                                <Layers className="w-6 h-6 text-gray-600 mb-3 mx-auto group-hover:text-amber-500 transition-colors" />
                                <div className="text-[8px] font-black uppercase text-gray-600 tracking-widest mb-1 italic">Topology</div>
                                <div className="text-xs font-mono font-black text-white italic">QUAD_CLEAN</div>
                            </div>
                            <div className="bg-black/40 border border-white/5 rounded-2xl p-6 text-center group hover:border-amber-500/20 transition-all cursor-pointer">
                                <Cuboid className="w-6 h-6 text-gray-600 mb-3 mx-auto group-hover:text-amber-500 transition-colors" />
                                <div className="text-[8px] font-black uppercase text-gray-600 tracking-widest mb-1 italic">Baking</div>
                                <div className="text-xs font-mono font-black text-white italic">PBR_ULTRA</div>
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleForge}
                            disabled={status === 'generating'}
                            className="w-full h-20 bg-white text-black font-black uppercase text-xs tracking-[0.4em] rounded-[2rem] shadow-[0_20px_40px_rgba(255,255,255,0.1)] flex items-center justify-center gap-4 transition-all hover:bg-gray-100 disabled:opacity-50 italic"
                        >
                            {status === 'generating' ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                    VOXELIZING...
                                </>
                            ) : (
                                <>
                                    <Zap className="w-5 h-5" />
                                    INITIALIZE_MESH
                                </>
                            )}
                        </motion.button>
                    </div>

                    <div className="lg:col-span-8">
                        <div className="glass-holographic rounded-[3.5rem] p-8 border-white/5 shadow-2xl min-h-[600px] flex items-center justify-center relative group hover:neon-border-glow transition-all duration-700">
                             {status === 'idle' && (
                                <div className="text-center space-y-6">
                                    <div className="w-32 h-32 mx-auto rounded-full bg-amber-500/5 flex items-center justify-center border border-white/5 animate-pulse">
                                        <Upload className="w-12 h-12 text-gray-600" />
                                    </div>
                                    <p className="text-gray-600 font-mono text-[10px] uppercase tracking-widest italic">READY_FOR_SPATIAL_SYNC</p>
                                </div>
                             )}

                             {status === 'generating' && (
                                <div className="text-center space-y-10">
                                    <div className="relative w-48 h-48 mx-auto">
                                        <motion.div 
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                            className="absolute inset-0 border-2 border-dashed border-amber-500/20 rounded-full"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Zap className="w-16 h-16 text-amber-500 animate-bounce" />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-white font-black text-xl italic mb-2 uppercase tracking-tight">Synthesizing Topology...</p>
                                        <p className="text-gray-500 text-[10px] font-mono uppercase tracking-[0.3em]">Module:_TRIPOSR_CORE</p>
                                    </div>
                                </div>
                             )}

                             {status === 'completed' && (
                                <div className="text-center space-y-8">
                                    <div className="relative w-96 h-96 mx-auto rounded-[2rem] overflow-hidden border border-white/10 group-hover:scale-105 transition-transform duration-700 shadow-2xl">
                                        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-transparent animate-pulse"></div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Box className="w-32 h-32 text-amber-500/40" />
                                        </div>
                                        <div className="absolute bottom-4 left-0 right-0 text-center">
                                            <span className="bg-amber-500 px-4 py-1.5 rounded-full text-[10px] font-black uppercase text-black italic">MESH_GENERATED_SUCCESSFULLY</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 justify-center">
                                        <GlowButton gradient="from-gray-800 to-gray-900" className="px-8 py-3 text-[10px]" onClick={() => window.open(meshUrl)}>DOWNLOAD_MESH</GlowButton>
                                    </div>
                                </div>
                             )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

