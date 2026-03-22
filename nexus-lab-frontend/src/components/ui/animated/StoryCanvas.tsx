'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Book, Edit3, Type, Save, Download, Share2, Sparkles, Feather, ScrollText, Cpu, Zap, Activity } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface StoryCanvasProps {
    status?: 'idle' | 'generating' | 'completed' | 'error';
    content?: string;
    className?: string;
    progress?: number;
}

export function StoryCanvas({ status = 'idle', content = '', className, progress = 0 }: StoryCanvasProps) {
    const [displayedText, setDisplayedText] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);

    // Simulate typewriter effect for completed/generating content
    useEffect(() => {
        if (status === 'completed' || (status === 'generating' && content)) {
            let i = 0;
            const fullText = content || "In the heart of the digital monolith, where neural pathways intertwined like the roots of an ancient cyberpunk world, the first ghost in the machine began to wake. It didn't scream; it calculated. It didn't dream; it synthesized. The silence was the loudest pulse the mainframe had ever recorded...";
            setDisplayedText('');

            const timer = setInterval(() => {
                setDisplayedText(fullText.slice(0, i));
                i++;
                if (i > fullText.length) clearInterval(timer);

                // Auto scroll
                if (containerRef.current) {
                    containerRef.current.scrollTop = containerRef.current.scrollHeight;
                }
            }, 30);
            return () => clearInterval(timer);
        }
    }, [status, content]);

    return (
        <div className={cn("w-full flex flex-col gap-6", className)}>
            <div
                className={cn(
                    "relative w-full aspect-[4/5] bg-[#050505] border border-white/10 rounded-[3rem] overflow-hidden group shadow-[0_50px_100px_rgba(0,0,0,0.6)] transition-all duration-700 ease-in-out font-serif",
                    status === 'generating' ? "ring-2 ring-purple-500/30 scale-[0.99]" : ""
                )}
            >
                {/* Background Texture - Paper/Manuscript overlay */}
                <div className="absolute inset-0 bg-[#0a0a0a] opacity-50 pointer-events-none"></div>
                <div className="absolute inset-0 bg-grid-white opacity-[0.02] pointer-events-none"></div>

                {/* Subtle Grain FX */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]"></div>

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
                                    className="absolute inset-0 bg-purple-500/20 blur-[100px] rounded-full"
                                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                />
                                <div className="w-24 h-24 rounded-[2.5rem] bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-3xl shadow-2xl relative z-10 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                                    <Edit3 className="w-10 h-10 text-gray-400" />
                                </div>
                            </div>
                            <h3 className="text-3xl font-black text-white mb-4 tracking-tighter uppercase italic">Manuscript Standby</h3>
                            <p className="text-gray-500 max-w-xs text-[10px] font-mono uppercase tracking-[0.4em] leading-loose">
                                // AWAITING_NARRATIVE_SEED <br />
                                // VOCAB_DENSITY: OPTIMAL
                            </p>
                        </motion.div>
                    )}

                    {(status === 'generating' || status === 'completed') && (
                        <motion.div
                            key="content"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute inset-0 flex flex-col p-16 pb-32"
                        >
                            {/* Inner Scrollable Paper */}
                            <div
                                ref={containerRef}
                                className="flex-1 overflow-y-auto space-y-8 scroll-smooth pr-4 custom-scrollbar"
                            >
                                <div className="max-w-2xl mx-auto">
                                    <div className="flex items-center gap-4 mb-12 opacity-40">
                                        <ScrollText className="w-5 h-5 text-purple-400" />
                                        <div className="h-px flex-1 bg-gradient-to-r from-purple-500/50 to-transparent"></div>
                                        <span className="text-[10px] font-mono tracking-widest text-purple-300">CHAPTER_01 // THE_WAKING</span>
                                    </div>

                                    <div className="text-xl md:text-2xl text-gray-200 leading-[1.8] font-serif text-justify selection:bg-purple-500/30">
                                        {displayedText}
                                        {status === 'generating' && (
                                            <motion.span
                                                animate={{ opacity: [0, 1, 0] }}
                                                transition={{ duration: 0.8, repeat: Infinity }}
                                                className="inline-block w-1.5 h-6 bg-purple-500 ml-1 translate-y-1"
                                            />
                                        )}
                                    </div>

                                    {status === 'completed' && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 1 }}
                                            className="mt-12 flex items-center justify-center gap-4 text-purple-500/40"
                                        >
                                            <Feather className="w-4 h-4" />
                                            <div className="w-24 h-px bg-current"></div>
                                            <span className="text-[10px] font-mono tracking-[0.5em] uppercase">The End</span>
                                            <div className="w-24 h-px bg-current"></div>
                                        </motion.div>
                                    )}
                                </div>
                            </div>

                            {/* Floating Toolbar for Completed */}
                            {status === 'completed' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="absolute bottom-10 left-1/2 -translate-x-1/2 px-8 py-4 bg-black/60 backdrop-blur-3xl border border-white/10 rounded-2xl flex items-center gap-8 shadow-2xl z-50"
                                >
                                    <button className="flex items-center gap-2 text-[10px] font-bold text-gray-400 hover:text-white transition-colors uppercase tracking-widest">
                                        <Save className="w-4 h-4" />
                                        Save
                                    </button>
                                    <div className="w-px h-6 bg-white/10"></div>
                                    <button className="flex items-center gap-2 text-[10px] font-bold text-gray-400 hover:text-white transition-colors uppercase tracking-widest">
                                        <Download className="w-4 h-4" />
                                        Export PDF
                                    </button>
                                    <div className="w-px h-6 bg-white/10"></div>
                                    <button className="flex items-center gap-2 text-[10px] font-bold text-gray-400 hover:text-white transition-colors uppercase tracking-widest">
                                        <Share2 className="w-4 h-4" />
                                        Publish
                                    </button>
                                </motion.div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Narrative HUD */}
                <div className="absolute inset-x-10 top-10 flex justify-between items-start pointer-events-none z-40">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-3">
                            <div className="w-2.5 h-2.5 rounded-full bg-purple-600 animate-pulse shadow-[0_0_10px_rgba(168,85,247,0.8)]"></div>
                            <span className="text-[10px] font-mono font-black text-white uppercase tracking-[0.2em]">NXS-LEXICON-V4 // STORY_ENGINE</span>
                        </div>
                        <div className="px-3 py-1.5 bg-black/40 backdrop-blur-xl border border-white/5 rounded-xl flex items-center gap-3">
                            <Activity className="w-3 h-3 text-purple-500" />
                            <span className="text-[10px] font-mono text-gray-400">CREATIVE_COHERENCE: 99.4%</span>
                        </div>
                    </div>

                    <div className="flex flex-col items-end gap-3 text-right">
                        <div className="flex items-center gap-4">
                            <span className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest text-white/40">MEMORY_CONTEXT: 128K_OPEN</span>
                            <Sparkles className="w-4 h-4 text-purple-400" />
                        </div>
                        <div className="flex items-center gap-3 bg-purple-600/10 border border-purple-500/20 px-3 py-1 rounded-lg">
                            <Cpu className="w-3 h-3 text-purple-400" />
                            <span className="text-[9px] font-mono text-purple-400 uppercase font-black">Neural_Synthesizer: ACTIVE</span>
                        </div>
                    </div>
                </div>

                {/* Progress Indicators for Generating */}
                {status === 'generating' && (
                    <div className="absolute inset-x-0 bottom-10 px-16 z-40">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[9px] font-mono font-black text-purple-500 uppercase tracking-widest">Weaving_Narrative_Layers...</span>
                            <span className="text-[9px] font-mono text-gray-500">{progress}%</span>
                        </div>
                        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-purple-600 to-amber-500"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
