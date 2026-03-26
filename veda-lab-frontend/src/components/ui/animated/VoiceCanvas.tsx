'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Mic, Volume2, Music, Activity, Play, Pause, Download, Share2, Save, Cpu, Zap, Radio, Waveform } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface VoiceCanvasProps {
    status?: 'idle' | 'generating' | 'completed' | 'error';
    audioUrl?: string;
    className?: string;
    progress?: number;
}

export function VoiceCanvas({ status = 'idle', audioUrl, className, progress = 0 }: VoiceCanvasProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const waveRef = useRef<HTMLDivElement>(null);

    // Simulate animated waveform
    const [waveformData, setWaveformData] = useState<number[]>([]);

    useEffect(() => {
        // Generate random initial waveform
        const initialWave = Array.from({ length: 40 }, () => Math.random() * 60 + 20);
        setWaveformData(initialWave);

        let interval: NodeJS.Timeout;
        if (isPlaying || status === 'generating') {
            interval = setInterval(() => {
                setWaveformData(prev => prev.map(v => {
                    const change = (Math.random() - 0.5) * 20;
                    return Math.max(10, Math.min(90, v + change));
                }));
                if (isPlaying) {
                    setCurrentTime(prev => (prev >= 100 ? 0 : prev + 1));
                }
            }, 100);
        }
        return () => clearInterval(interval);
    }, [isPlaying, status]);

    return (
        <div className={cn("w-full flex flex-col gap-6", className)}>
            <div
                className={cn(
                    "relative w-full aspect-[2/1] bg-[#050505] border border-white/10 rounded-[3rem] overflow-hidden group shadow-[0_50px_100px_rgba(0,0,0,0.6)] transition-all duration-700 ease-in-out",
                    status === 'generating' ? "ring-2 ring-emerald-500/30 scale-[0.99]" : ""
                )}
            >
                {/* Background Grid - Engineering style */}
                <div className="absolute inset-0 bg-grid-white opacity-[0.03] pointer-events-none"></div>
                <div className="absolute inset-x-0 top-1/2 h-px bg-white/5 pointer-events-none"></div>

                {/* Scanline / Oscilloscope FX */}
                <div className="absolute inset-0 pointer-events-none z-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] opacity-20"></div>

                <AnimatePresence mode="wait">
                    {status === 'idle' && (
                        <motion.div
                            key="idle"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center"
                        >
                            <div className="relative mb-6">
                                <motion.div
                                    className="absolute inset-0 bg-emerald-500/20 blur-[100px] rounded-full"
                                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                />
                                <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-2xl shadow-2xl relative z-10 group-hover:scale-110 transition-all duration-500">
                                    <Mic className="w-8 h-8 text-gray-400" />
                                </div>
                            </div>
                            <h3 className="text-2xl font-black text-white mb-2 tracking-tighter uppercase">Sonic Studio Standby</h3>
                            <p className="text-gray-500 max-w-xs text-[9px] font-mono uppercase tracking-[0.4em] leading-loose">
                                // FREQ_SYNC: STABLE <br />
                                // VOCAL_BUFFER: READY
                            </p>
                        </motion.div>
                    )}

                    {(status === 'generating' || status === 'completed') && (
                        <motion.div
                            key="visualizer"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute inset-0 flex flex-col items-center justify-center p-12"
                        >
                            {/* Waveform Visualizer */}
                            <div className="w-full flex items-center justify-center gap-1.5 h-32 mb-12">
                                {waveformData.map((height, i) => (
                                    <motion.div
                                        key={i}
                                        className={cn(
                                            "w-1.5 rounded-full transition-all duration-300",
                                            status === 'generating' ? "bg-emerald-500/40" : "bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]",
                                            isPlaying && i / formData.length < currentTime / 100 ? "opacity-100" : "opacity-30"
                                        )}
                                        animate={{ height: `${height}%` }}
                                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                    />
                                ))}
                            </div>

                            {status === 'generating' && (
                                <div className="text-center space-y-4 w-full max-w-sm">
                                    <div className="flex justify-between items-end mb-1">
                                        <p className="text-emerald-500 font-mono text-[9px] tracking-[0.4em] font-black uppercase">Modulating_Vocal_Strings: {progress}%</p>
                                        <span className="text-[10px] font-mono text-gray-600">8.4kHz</span>
                                    </div>
                                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden border border-white/10">
                                        <motion.div
                                            className="h-full bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.8)]"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${progress}%` }}
                                        />
                                    </div>
                                </div>
                            )}

                            {status === 'completed' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex flex-col items-center gap-8 w-full"
                                >
                                    <div className="flex items-center gap-12">
                                        <button
                                            onClick={() => setIsPlaying(!isPlaying)}
                                            className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center text-black hover:scale-110 active:scale-95 transition-all shadow-2xl shadow-emerald-500/20"
                                        >
                                            {isPlaying ? <Pause className="w-7 h-7 fill-current" /> : <Play className="w-7 h-7 fill-current ml-1" />}
                                        </button>

                                        <div className="flex gap-4">
                                            <button className="p-3 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 text-gray-400 hover:text-white transition-all">
                                                <Download className="w-5 h-5" />
                                            </button>
                                            <button className="p-3 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 text-gray-400 hover:text-white transition-all">
                                                <Save className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex gap-8 opacity-40">
                                        <div className="flex flex-col items-center">
                                            <span className="text-[8px] font-mono text-gray-500 uppercase tracking-widest">Bitrate</span>
                                            <span className="text-[10px] font-black text-white tracking-widest">320kbps</span>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <span className="text-[8px] font-mono text-gray-500 uppercase tracking-widest">Format</span>
                                            <span className="text-[10px] font-black text-white tracking-widest">FLAC_LOSSLESS</span>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <span className="text-[8px] font-mono text-gray-500 uppercase tracking-widest">Engine</span>
                                            <span className="text-[10px] font-black text-white tracking-widest">V-SONIC_02</span>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Sonic HUD Layer */}
                <div className="absolute inset-x-10 top-10 flex justify-between items-start pointer-events-none z-40">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-3">
                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>
                            <span className="text-[10px] font-mono font-black text-white uppercase tracking-[0.2em]">NXS-SONIC-V2 // AUDIO_CORE</span>
                        </div>
                        <div className="px-3 py-1.5 bg-black/40 backdrop-blur-xl border border-white/5 rounded-xl flex items-center gap-3">
                            <Activity className="w-3 h-3 text-emerald-500" />
                            <span className="text-[10px] font-mono text-gray-400">SONIC_FIDELITY: 98.9%</span>
                        </div>
                    </div>

                    <div className="flex flex-col items-end gap-3 text-right">
                        <div className="flex items-center gap-4">
                            <span className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest">SPECTRUM_SYNC: 44.1kHz</span>
                            <Radio className="w-4 h-4 text-emerald-400" />
                        </div>
                        <div className="flex items-center gap-3 bg-emerald-600/10 border border-emerald-500/20 px-3 py-1 rounded-lg">
                            <Cpu className="w-3 h-3 text-emerald-400" />
                            <span className="text-[9px] font-mono text-emerald-400 uppercase font-black">Local_ASIC_Processor: ON</span>
                        </div>
                    </div>
                </div>

                {/* Spectral Waterfall Simulation */}
                <div className="absolute bottom-6 inset-x-0 h-4 pointer-events-none flex justify-center gap-px opacity-20">
                    {Array.from({ length: 120 }).map((_, i) => (
                        <motion.div
                            key={i}
                            className="w-0.5 bg-emerald-500"
                            animate={{ height: [`${Math.random() * 10}%`, `${Math.random() * 100}%`, `${Math.random() * 10}%`] }}
                            transition={{ duration: 1, repeat: Infinity, delay: i * 0.01 }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
