'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Film, Loader2, Play, Pause, RotateCcw, Volume2, Monitor, Cpu, Activity, Zap, Box } from 'lucide-react';
import { useState, useEffect } from 'react';

interface VideoCanvasProps {
    status?: 'idle' | 'generating' | 'completed' | 'error';
    videoUrl?: string;
    className?: string;
    progress?: number;
}

export function VideoCanvas({ status = 'idle', videoUrl, className, progress = 0 }: VideoCanvasProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [internalProgress, setInternalProgress] = useState(0);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying && status === 'completed') {
            interval = setInterval(() => {
                setInternalProgress((prev) => (prev >= 100 ? 0 : prev + 1));
            }, 50);
        }
        return () => clearInterval(interval);
    }, [isPlaying, status]);

    return (
        <div className={cn("w-full flex flex-col gap-6", className)}>
            <div
                className={cn(
                    "relative w-full aspect-video bg-[#050505] border border-white/10 rounded-[3rem] overflow-hidden group shadow-[0_50px_100px_rgba(0,0,0,0.6)] transition-all duration-700 ease-in-out",
                    status === 'generating' ? "ring-2 ring-red-500/30 scale-[0.99]" : ""
                )}
            >
                {/* Background Grid Pattern */}
                <div className="absolute inset-0 bg-grid-white opacity-[0.03] pointer-events-none"></div>

                {/* CRT Scanline Effect (Refined v2) */}
                <div className="absolute inset-0 pointer-events-none z-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] opacity-30"></div>

                <AnimatePresence mode="wait">
                    {status === 'idle' && (
                        <motion.div
                            key="idle"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center"
                        >
                            <div className="relative mb-8">
                                <motion.div
                                    className="absolute inset-0 bg-red-500/20 blur-[100px] rounded-full"
                                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                />
                                <div className="w-24 h-24 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-2xl shadow-2xl relative z-10 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                                    <Monitor className="w-10 h-10 text-gray-400" />
                                </div>
                            </div>
                            <h3 className="text-2xl font-black text-white mb-2 tracking-tighter uppercase">Production Standby</h3>
                            <p className="text-gray-500 max-w-xs text-[10px] font-mono uppercase tracking-[0.3em] leading-loose">
                                // LINK_ESTABLISHED_ <br />
                                // BUFFER: 12GB_AVAILABLE_
                            </p>
                        </motion.div>
                    )}

                    {status === 'generating' && (
                        <motion.div
                            key="generating"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-2xl z-30"
                        >
                            <div className="relative mb-8">
                                <div className="w-32 h-32 rounded-full border-t-2 border-red-500 animate-[spin_0.8s_linear_infinite] overflow-hidden">
                                    <div className="absolute inset-0 bg-red-500/10 blur-xl"></div>
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Film className="w-10 h-10 text-red-500 animate-pulse" />
                                </div>
                            </div>

                            <div className="text-center space-y-4">
                                <p className="text-red-500 font-mono text-[10px] tracking-[0.4em] font-black uppercase">Sequencing_Latent_Motion: {progress}%</p>
                                <div className="w-64 h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/10 p-[1px]">
                                    <motion.div
                                        className="h-full bg-gradient-to-r from-red-600 to-pink-500 shadow-[0_0_20px_rgba(239,68,68,0.8)] rounded-full"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progress}%` }}
                                        transition={{ duration: 0.5 }}
                                    />
                                </div>
                                <div className="flex gap-4 justify-center">
                                    <span className="text-[9px] font-mono text-gray-500">FPS: 24.0</span>
                                    <span className="text-[9px] font-mono text-gray-500">RES: 1080P</span>
                                    <span className="text-[9px] font-mono text-gray-500">VRAM: 8.4GB</span>
                                </div>
                            </div>

                            {/* Dynamic Render Scan Line */}
                            <motion.div
                                className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent shadow-[0_0_20px_rgba(239,68,68,0.5)] z-40"
                                animate={{ top: ['0%', '100%', '0%'] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            />
                        </motion.div>
                    )}

                    {status === 'completed' && (
                        <motion.div
                            key="completed"
                            initial={{ opacity: 0, scale: 1.05, filter: 'brightness(1.5)' }}
                            animate={{ opacity: 1, scale: 1, filter: 'brightness(1)' }}
                            className="absolute inset-0"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop"
                                alt="Video Preview"
                                className="w-full h-full object-cover"
                            />

                            {/* Playback Studio UI */}
                            <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black via-black/80 to-transparent pt-32 z-40 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                                <div className="flex flex-col gap-6">
                                    {/* Timeline */}
                                    <div className="h-1.5 w-full bg-white/10 rounded-full cursor-pointer relative group/timeline">
                                        <div
                                            className="h-full bg-gradient-to-r from-red-600 to-pink-500 rounded-full relative shadow-[0_0_15px_rgba(239,68,68,0.6)]"
                                            style={{ width: `${internalProgress}%` }}
                                        >
                                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-2xl scale-0 group-hover/timeline:scale-100 transition-transform duration-300"></div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-8">
                                            <button
                                                onClick={() => setIsPlaying(!isPlaying)}
                                                className="w-12 h-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all group/play shadow-xl backdrop-blur-xl"
                                            >
                                                {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                                            </button>
                                            <button className="text-gray-400 hover:text-white transition-colors">
                                                <RotateCcw className="w-5 h-5" />
                                            </button>
                                            <div className="px-3 py-1 bg-black/40 border border-white/5 rounded-lg">
                                                <span className="text-[10px] font-mono text-gray-300 tracking-wider">
                                                    00:0{Math.floor(internalProgress / 20)} / 00:05
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-6">
                                            <div className="flex items-center gap-2 group/vol">
                                                <Volume2 className="text-gray-500 group-hover:text-white w-5 h-5 transition-colors" />
                                                <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
                                                    <div className="w-4/5 h-full bg-white/40"></div>
                                                </div>
                                            </div>
                                            <button className="text-[10px] font-mono font-black text-gray-500 hover:text-red-500 px-3 py-1.5 rounded-xl border border-white/5 hover:border-red-500/40 bg-white/5 transition-all">4K_MASTER_V1</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Technical HUD Layer */}
                <div className="absolute inset-x-10 top-10 flex justify-between items-start pointer-events-none z-40">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-3">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]"></div>
                            <span className="text-[10px] font-mono font-black text-white uppercase tracking-[0.2em]">NXS-MOTION-V2 // PRODUCTION</span>
                        </div>
                        <div className="px-3 py-1.5 bg-black/40 backdrop-blur-xl border border-white/5 rounded-xl flex items-center gap-3">
                            <Activity className="w-3 h-3 text-red-500" />
                            <span className="text-[10px] font-mono text-gray-400">FRAME_CONSISTENCY: 0.9998</span>
                        </div>
                    </div>

                    <div className="flex flex-col items-end gap-3 text-right">
                        <div className="flex items-center gap-4">
                            <span className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest">TEMPORAL_BUFFER: STABLE</span>
                            <Box className="w-4 h-4 text-gray-600" />
                        </div>
                        <div className="flex items-center gap-3 bg-red-600/10 border border-red-500/20 px-3 py-1 rounded-lg">
                            <Cpu className="w-3 h-3 text-red-400" />
                            <span className="text-[9px] font-mono text-red-400 uppercase font-black">Local_GPU_Orchestration: ON</span>
                        </div>
                    </div>
                </div>

                {/* Frame Details */}
                <div className="absolute bottom-10 left-10 flex flex-col gap-1 z-40 pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity">
                    <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">Temporal Metadata</span>
                    <div className="flex gap-1.5">
                        <div className="w-12 h-[2px] bg-red-500/50 rounded-full"></div>
                        <div className="w-6 h-[2px] bg-white/10 rounded-full"></div>
                        <div className="w-3 h-[2px] bg-white/5 rounded-full"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
