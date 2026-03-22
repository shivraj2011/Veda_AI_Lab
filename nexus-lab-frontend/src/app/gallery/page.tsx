'use client';

import { TopBar } from '@/components/layout/TopBar';
import { FadeInBlock } from '@/components/ui/animated/GlowButton';
import { Library, Search, Filter, Play, Maximize2, Download, Trash2, Clock, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const galleryItems = [
    { id: 1, type: 'image', url: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=800&auto=format&fit=crop', aspect: 'aspect-[4/5]', title: 'Cyber Nebula' },
    { id: 2, type: 'video', url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop', aspect: 'aspect-video', title: 'Neural Flow' },
    { id: 3, type: 'image', url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop', aspect: 'aspect-square', title: 'Data Crystal' },
    { id: 4, type: 'image', url: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=800&auto=format&fit=crop', aspect: 'aspect-[3/4]', title: 'Void Core' },
    { id: 5, type: 'video', url: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?q=80&w=800&auto=format&fit=crop', aspect: 'aspect-[9/16]', title: 'Vertical Synth' },
    { id: 6, type: 'image', url: 'https://images.unsplash.com/photo-1578632738981-4320f6618d17?q=80&w=800&auto=format&fit=crop', aspect: 'aspect-video', title: 'Anime Horizon' },
    { id: 7, type: 'image', url: 'https://images.unsplash.com/photo-1620121692029-d088224efc74?q=80&w=800&auto=format&fit=crop', aspect: 'aspect-square', title: 'Glass Fractal' },
    { id: 8, type: 'video', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop', aspect: 'aspect-[2/3]', title: 'Abstract Loop' },
];

export default function GalleryPage() {
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    return (
        <main className="flex-1 flex flex-col overflow-hidden relative z-10 bg-[#050505]">
            <TopBar title="Veda Vault" />

            <div className="flex-1 overflow-y-auto px-12 py-12 custom-scrollbar">
                <FadeInBlock delay={0}>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-20 border-b border-white/10 pb-20">
                        <div>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-[#00f2ff]/10 border border-[#00f2ff]/20 rounded-xl shadow-[0_0_15px_rgba(0,242,255,0.1)]">
                                    <Library className="w-6 h-6 text-[#00f2ff]" />
                                </div>
                                <span className="text-xs font-mono font-black text-[#00f2ff] uppercase tracking-[0.4em]">VAULT_INTERFACE_CONNECTED</span>
                            </div>
                            <h1 className="text-6xl font-black text-white tracking-tighter uppercase leading-none">UNICORN VAULT</h1>
                            <p className="text-gray-600 mt-4 font-black text-[10px] tracking-[0.3em] uppercase">BROWSE YOUR GENERATED NEURAL_ASSETS_</p>
                        </div>

                        <div className="flex items-center gap-6 w-full md:w-auto">
                            <div className="relative flex-1 md:w-96">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-700" />
                                <input
                                    className="w-full pl-16 pr-8 py-5 bg-white/[0.02] border border-white/10 rounded-2xl text-sm text-white focus:neon-border-glow shadow-2xl transition-all outline-none placeholder:text-gray-800 placeholder:italic font-medium"
                                    placeholder="SEARCH NEURAL ARCHIVES..."
                                />
                            </div>
                            <button className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 text-gray-700 hover:text-white hover:neon-border-glow transition-all group">
                                <Filter className="w-6 h-6 group-hover:rotate-180 transition-transform duration-700" />
                            </button>
                        </div>
                    </div>
                </FadeInBlock>

                <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6 pb-20">
                    {galleryItems.map((item, i) => (
                        <FadeInBlock key={item.id} delay={0.1 * (i % 5)}>
                            <motion.div
                                className={cn(
                                    "relative rounded-[2rem] overflow-hidden border border-white/5 bg-[#050505] transition-all duration-500 group cursor-pointer",
                                    hoveredId === item.id ? "border-white/20 shadow-[0_30px_60px_rgba(0,0,0,0.5)] z-20" : "hover:border-white/10"
                                )}
                                onMouseEnter={() => setHoveredId(item.id)}
                                onMouseLeave={() => setHoveredId(null)}
                                layoutId={`card-${item.id}`}
                            >
                                {/* Media Content */}
                                <div className={cn("w-full h-full relative overflow-hidden", item.aspect)}>
                                    <img
                                        src={item.url}
                                        alt={item.title}
                                        className={cn(
                                            "w-full h-full object-cover transition-transform duration-1000 ease-out",
                                            hoveredId === item.id ? "scale-110" : "scale-100"
                                        )}
                                    />

                                    {/* Video Indicator/Play Overlay */}
                                    {item.type === 'video' && (
                                        <div className="absolute top-4 right-4 z-10 p-2 bg-black/60 backdrop-blur-md rounded-xl border border-white/10">
                                            <Play className="w-3 h-3 text-white fill-white" />
                                        </div>
                                    )}

                                    {/* Hover Overlay */}
                                    <AnimatePresence>
                                        {hoveredId === item.id && (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-all flex flex-col justify-between p-6"
                                            >
                                                <div className="flex justify-between items-start">
                                                    <div className="flex gap-2">
                                                        <button className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all text-white backdrop-blur-md border border-white/10 shadow-xl">
                                                            <Download className="w-4 h-4" />
                                                        </button>
                                                        <button className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all text-white backdrop-blur-md border border-white/10 shadow-xl">
                                                            <Maximize2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                    <button className="p-3 bg-red-500/20 hover:bg-red-500/40 rounded-xl transition-all text-red-400 backdrop-blur-md border border-red-500/20 shadow-xl">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>

                                                <div className="space-y-3">
                                                    <div className="flex items-center gap-2">
                                                        <span className={cn(
                                                            "px-2 py-0.5 rounded-md text-[9px] font-mono font-bold uppercase tracking-widest",
                                                            item.type === 'video' ? "bg-purple-500/40 text-purple-200" : "bg-blue-500/40 text-blue-200"
                                                        )}>
                                                            {item.type}
                                                        </span>
                                                        <span className="text-[9px] font-mono text-gray-400 flex items-center gap-1">
                                                            <Clock className="w-2 h-2" /> 2H AGO
                                                        </span>
                                                    </div>
                                                    <h3 className="text-xl font-black text-white tracking-tight">{item.title}</h3>
                                                    <div className="flex items-center gap-2 pt-2 transition-transform transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 duration-500">
                                                        <Zap className="w-3 h-3 text-blue-400" />
                                                        <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">NEXUS-FORGE XL</span>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        </FadeInBlock>
                    ))}
                </div>
            </div>
        </main>
    );
}
