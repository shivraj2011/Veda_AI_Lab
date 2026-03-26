'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Users, UserPlus, Fingerprint, Brain, Activity, Dna, Shield, Cpu, Zap, Target, Box, Layers } from 'lucide-react';
import { useState, useEffect } from 'react';

interface CharacterCanvasProps {
    status?: 'idle' | 'generating' | 'completed' | 'error';
    className?: string;
    progress?: number;
}

export function CharacterCanvas({ status = 'idle', className, progress = 0 }: CharacterCanvasProps) {
    const [scannedPoints, setScannedPoints] = useState<{ x: number, y: number }[]>([]);

    useEffect(() => {
        if (status === 'generating') {
            const interval = setInterval(() => {
                setScannedPoints(prev => [
                    ...prev.slice(-20),
                    { x: Math.random() * 100, y: Math.random() * 100 }
                ]);
            }, 100);
            return () => clearInterval(interval);
        }
    }, [status]);

    return (
        <div className={cn("w-full flex flex-col gap-6", className)}>
            <div
                className={cn(
                    "relative w-full aspect-square max-w-2xl mx-auto bg-[#050505] border border-white/10 rounded-[3rem] overflow-hidden group shadow-[0_50px_100px_rgba(0,0,0,0.6)] transition-all duration-700 ease-in-out",
                    status === 'generating' ? "ring-2 ring-blue-500/30 scale-[0.98]" : ""
                )}
            >
                {/* Background Radar/Grid Pattern */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
                    <div className="w-[80%] h-[80%] border border-blue-500/20 rounded-full"></div>
                    <div className="w-[60%] h-[60%] border border-blue-500/10 rounded-full absolute"></div>
                    <div className="w-[40%] h-[40%] border border-blue-500/5 rounded-full absolute"></div>
                    <div className="w-px h-full bg-blue-500/10 absolute"></div>
                    <div className="h-px w-full bg-blue-500/10 absolute"></div>
                </div>

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
                                <div className="w-24 h-24 rounded-[2.5rem] bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-3xl shadow-2xl relative z-10 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                                    <Fingerprint className="w-10 h-10 text-gray-400" />
                                </div>
                            </div>
                            <h3 className="text-3xl font-black text-white mb-2 tracking-tighter uppercase">Persona Lab Standby</h3>
                            <p className="text-gray-500 max-w-xs text-[10px] font-mono uppercase tracking-[0.4em] leading-loose">
                                // BIOMETRIC_SYNC: IDLE <br />
                                // NEURAL_LATTICE: READY
                            </p>
                        </motion.div>
                    )}

                    {status === 'generating' && (
                        <motion.div
                            key="generating"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 flex flex-col items-center justify-center p-12"
                        >
                            {/* Neural Map Visualization */}
                            <div className="relative w-full h-full flex items-center justify-center">
                                <div className="absolute w-[300px] h-[300px]">
                                    {scannedPoints.map((p, i) => (
                                        <motion.div
                                            key={i}
                                            className="absolute w-1 h-1 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,1)]"
                                            initial={{ opacity: 1, scale: 0 }}
                                            animate={{ opacity: 0, scale: 2 }}
                                            style={{ left: `${p.x}%`, top: `${p.y}%` }}
                                            transition={{ duration: 1.5 }}
                                        />
                                    ))}
                                </div>

                                <motion.div
                                    className="w-48 h-48 border-2 border-blue-500/20 rounded-full flex items-center justify-center relative"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                                >
                                    <div className="absolute inset-0 border-t-2 border-blue-500 rounded-full animate-spin"></div>
                                    <Brain className="w-16 h-16 text-blue-500 animate-pulse" />
                                </motion.div>
                            </div>

                            <div className="absolute bottom-16 text-center space-y-4">
                                <p className="text-blue-500 font-mono text-[10px] tracking-[0.4em] font-black uppercase italic">Synthesizing_Persona_Lattice: {progress}%</p>
                                <div className="w-64 h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/10 p-[1px]">
                                    <motion.div
                                        className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 shadow-[0_0_20px_rgba(59,130,246,0.8)] rounded-full"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progress}%` }}
                                    />
                                </div>
                            </div>

                            {/* Scanning HUD Overlay */}
                            <div className="absolute top-20 right-20 flex flex-col items-end gap-2 text-right">
                                <span className="text-[8px] font-mono text-blue-500 underline decoration-blue-500/30 underline-offset-4">ATTRIB_MAPPING_V1</span>
                                <div className="flex gap-1 h-1">
                                    <div className="w-2 bg-blue-500"></div>
                                    <div className="w-4 bg-blue-500/50"></div>
                                    <div className="w-1 bg-blue-500/20"></div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {status === 'completed' && (
                        <motion.div
                            key="completed"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute inset-0 p-12 flex flex-col items-center justify-center gap-12"
                        >
                            <div className="relative">
                                <div className="w-48 h-48 rounded-[3rem] bg-gradient-to-br from-blue-600 to-cyan-500 shadow-2xl overflow-hidden group-hover:rotate-6 transition-transform duration-500 relative z-10">
                                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-60"></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Users className="w-20 h-20 text-white drop-shadow-2xl" />
                                    </div>
                                </div>
                                <motion.div
                                    className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full"
                                    animate={{ scale: [1, 1.3, 1] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                />
                                <div className="absolute -top-4 -right-4 px-4 py-2 bg-black border border-blue-500/50 rounded-2xl shadow-2xl z-20">
                                    <span className="text-[10px] font-black text-blue-400 font-mono tracking-widest uppercase">Rank: Omega</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-8 w-full max-w-md">
                                <div className="space-y-2">
                                    <div className="flex justify-between items-end">
                                        <span className="text-[9px] font-mono text-gray-500 uppercase">Intelligence</span>
                                        <span className="text-xs font-black text-white">98%</span>
                                    </div>
                                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full w-[98%] bg-blue-500"></div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-end">
                                        <span className="text-[9px] font-mono text-gray-500 uppercase">Empathy</span>
                                        <span className="text-xs font-black text-white">42%</span>
                                    </div>
                                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full w-[42%] bg-red-500"></div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-end">
                                        <span className="text-[9px] font-mono text-gray-500 uppercase">Agency</span>
                                        <span className="text-xs font-black text-white">85%</span>
                                    </div>
                                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full w-[85%] bg-cyan-500"></div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-end">
                                        <span className="text-[9px] font-mono text-gray-500 uppercase">Stability</span>
                                        <span className="text-xs font-black text-white">100%</span>
                                    </div>
                                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full w-full bg-emerald-500"></div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Biometric HUD Layer */}
                <div className="absolute inset-x-10 top-10 flex justify-between items-start pointer-events-none z-40">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-3">
                            <div className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                            <span className="text-[10px] font-mono font-black text-white uppercase tracking-[0.2em]">NXS-PERSONA-V1 // BIO_ETHICS_BYPASS</span>
                        </div>
                        <div className="px-3 py-1.5 bg-black/40 backdrop-blur-xl border border-white/5 rounded-xl flex items-center gap-3">
                            <Shield className="w-3 h-3 text-blue-500" />
                            <span className="text-[10px] font-mono text-gray-400">IDENTITY_LOCK: veda</span>
                        </div>
                    </div>

                    <div className="flex flex-col items-end gap-3 text-right">
                        <div className="flex items-center gap-4">
                            <span className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest text-white/40">DNA_SEQUENCING: ACTIVE</span>
                            <Dna className="w-4 h-4 text-blue-400" />
                        </div>
                        <div className="flex items-center gap-3 bg-blue-600/10 border border-blue-500/20 px-3 py-1 rounded-lg">
                            <Activity className="w-3 h-3 text-blue-400" />
                            <span className="text-[9px] font-mono text-blue-400 uppercase font-black">Neural_Pulse: 84BPM</span>
                        </div>
                    </div>
                </div>

                {/* Frame Accents */}
                <div className="absolute top-0 right-0 w-32 h-32 border-t border-r border-blue-500/20 rounded-tr-[3rem] pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 border-b border-l border-blue-500/20 rounded-bl-[3rem] pointer-events-none"></div>
            </div>
        </div>
    );
}
