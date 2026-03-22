'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ImageIcon, Loader2, Download, Maximize2, RefreshCw, Wand2, Box, Layers, MousePointer2, Crop } from 'lucide-react';
import { useState } from 'react';

interface ImageCanvasProps {
    status?: 'idle' | 'generating' | 'completed' | 'error';
    imageUrl?: string;
    className?: string;
}

type AspectRatio = '1:1' | '16:9' | '9:16';

export function ImageCanvas({ status = 'idle', imageUrl, className }: ImageCanvasProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');
    const [showBrush, setShowBrush] = useState(false);

    const aspectClasses = {
        '1:1': 'aspect-square',
        '16:9': 'aspect-video',
        '9:16': 'aspect-[9/16]'
    };

    return (
        <div className={cn("w-full flex flex-col gap-4", className)}>
            {/* Aspect Ratio Toggles (Studio Mode) */}
            <div className="flex items-center gap-2 bg-[#0a0a0a]/50 border border-white/5 p-1.5 rounded-2xl self-start backdrop-blur-md">
                {(['1:1', '16:9', '9:16'] as AspectRatio[]).map((ratio) => (
                    <button
                        key={ratio}
                        onClick={() => setAspectRatio(ratio)}
                        className={cn(
                            "px-3 py-1.5 rounded-xl text-[10px] font-mono font-bold transition-all flex items-center gap-2",
                            aspectRatio === ratio
                                ? "bg-white text-black shadow-lg shadow-white/10"
                                : "text-gray-500 hover:text-white hover:bg-white/5"
                        )}
                    >
                        <Crop className="w-3 h-3" />
                        {ratio}
                    </button>
                ))}
            </div>

            <div
                className={cn(
                    "relative w-full bg-[#050505] border border-white/10 rounded-[3rem] overflow-hidden group shadow-[0_50px_100px_rgba(0,0,0,0.5)] transition-all duration-700 ease-in-out",
                    aspectClasses[aspectRatio]
                )}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Background Grid Pattern */}
                <div className="absolute inset-0 bg-grid-white opacity-[0.03] pointer-events-none"></div>

                {/* Status-based Content */}
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
                                    className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full"
                                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                />
                                <div className="w-24 h-24 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-2xl shadow-2xl relative z-10 group-hover:scale-110 transition-transform duration-500">
                                    <ImageIcon className="w-10 h-10 text-gray-400" />
                                </div>
                            </div>
                            <h3 className="text-2xl font-black text-white mb-2 tracking-tighter">Ready for Synthesis</h3>
                            <p className="text-gray-500 max-w-xs text-xs font-mono uppercase tracking-[0.2em] leading-loose">
                                // PROVIDE NEURAL DIRECTIVE_ <br />
                                // STATUS: CALIBRATED_
                            </p>
                        </motion.div>
                    )}

                    {status === 'generating' && (
                        <motion.div
                            key="generating"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-2xl z-20"
                        >
                            <div className="relative mb-8">
                                <Loader2 className="w-16 h-16 text-blue-500 animate-[spin_1s_linear_infinite] relative z-10" />
                                <div className="absolute inset-0 bg-blue-500/30 blur-[40px] rounded-full animate-pulse"></div>
                            </div>
                            <div className="text-center space-y-3">
                                <p className="text-blue-400 font-mono text-[10px] tracking-[0.4em] animate-pulse">ORCHESTRATING LATENT SPACE...</p>
                                <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)]"
                                        initial={{ width: "0%" }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 10, repeat: Infinity }}
                                    />
                                </div>
                            </div>

                            {/* Dynamic scan line v2 */}
                            <motion.div
                                className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent shadow-[0_0_20px_rgba(59,130,246,0.5)] z-30"
                                animate={{ top: ['0%', '100%', '0%'] }}
                                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                            />
                        </motion.div>
                    )}

                    {status === 'completed' && imageUrl && (
                        <motion.div
                            key="completed"
                            initial={{ opacity: 0, scale: 1.05, filter: 'blur(20px)' }}
                            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                            className="absolute inset-0"
                        >
                            <img
                                src={imageUrl}
                                alt="Generated"
                                className="w-full h-full object-cover"
                            />

                            {/* Mask/Brush Simulation Overlay */}
                            <AnimatePresence>
                                {isHovered && showBrush && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute inset-0 bg-blue-500/10 cursor-none z-20"
                                    >
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border-2 border-white/50 border-dashed animate-[spin_10s_linear_infinite]"></div>
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full"></div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Overlay Controls */}
                            <AnimatePresence>
                                {isHovered && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/80 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-2 shadow-2xl z-50"
                                    >
                                        <button className="p-3 hover:bg-white/10 rounded-2xl transition-all text-gray-400 hover:text-white" title="Download">
                                            <Download className="w-5 h-5" />
                                        </button>
                                        <button
                                            className={cn(
                                                "p-3 rounded-2xl transition-all",
                                                showBrush ? "bg-blue-600 text-white" : "hover:bg-white/10 text-gray-400 hover:text-white"
                                            )}
                                            onClick={() => setShowBrush(!showBrush)}
                                            title="Smart Mask"
                                        >
                                            <Layers className="w-5 h-5" />
                                        </button>
                                        <button className="p-3 hover:bg-white/10 rounded-2xl transition-all text-gray-400 hover:text-white" title="Upscale">
                                            <Wand2 className="w-5 h-5" />
                                        </button>
                                        <div className="w-px h-8 bg-white/10 mx-1"></div>
                                        <button className="p-3 bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white rounded-2xl transition-all" title="Full Quality">
                                            <Maximize2 className="w-5 h-5" />
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Technical HUD Layer */}
                <div className="absolute inset-x-8 top-8 flex justify-between items-start pointer-events-none z-40">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                            <span className="text-[10px] font-mono font-bold text-white uppercase tracking-widest">NXS-RENDER-04 // ACTIVE</span>
                        </div>
                        <div className="px-2 py-1 bg-black/40 backdrop-blur-md border border-white/5 rounded-lg">
                            <span className="text-[9px] font-mono text-gray-500">PRECISION_LEVEL: 0.9984</span>
                        </div>
                    </div>

                    <div className="flex flex-col items-end gap-2 text-right">
                        <div className="flex items-center gap-3">
                            <span className="text-[10px] font-mono font-bold text-gray-600 uppercase">BUFFER: LOADED</span>
                            <Box className="w-4 h-4 text-gray-600" />
                        </div>
                        <div className="text-[9px] font-mono text-gray-700">COORD: 40.7128° N, 74.0060° W</div>
                    </div>
                </div>

                {/* Frame Corner Details */}
                <div className="absolute bottom-8 left-8 flex items-center gap-4 z-40 pointer-events-none">
                    <div className="flex flex-col gap-1">
                        <span className="text-[9px] font-mono text-gray-500 uppercase">Generation Data</span>
                        <div className="flex gap-1">
                            <div className="w-8 h-[2px] bg-white/10 rounded-full"></div>
                            <div className="w-4 h-[2px] bg-white/5 rounded-full"></div>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-8 right-8 z-40 pointer-events-none">
                    <MousePointer2 className="w-6 h-6 text-white/5 rotate-[15deg]" />
                </div>
            </div>
        </div>
    );
}
