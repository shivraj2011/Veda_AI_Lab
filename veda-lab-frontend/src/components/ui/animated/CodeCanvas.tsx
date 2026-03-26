'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Code, Terminal, Zap, Shield, Cpu, Activity } from 'lucide-react';

interface CodeCanvasProps {
    isGenerating: boolean;
    progress: number;
}

export default function CodeCanvas({ isGenerating, progress }: CodeCanvasProps) {
    const [lines, setLines] = useState<string[]>([]);
    const [terminalLogs, setTerminalLogs] = useState<string[]>([]);

    // Simulated code generation
    useEffect(() => {
        if (isGenerating) {
            const codeLibrary = [
                "import { createNeuralVeda } from '@veda-ai-lab/core';",
                "async function initializeGenerator(seed: number) {",
                "  const veda = await createNeuralVeda({",
                "    precision: 'fp16',",
                "    acceleration: 'cuda',",
                "    latency_target: 0.4",
                "  });",
                "",
                "  return veda.synthesize({",
                "    input_vector: Math.random() * seed,",
                "    optimization: 'performance_max'",
                "  });",
                "}",
                "// Neural Checksum Validated",
                "// Logic Density: 94.2%"
            ];

            setLines([]);
            let i = 0;
            const interval = setInterval(() => {
                if (i < codeLibrary.length) {
                    setLines(prev => [...prev, codeLibrary[i]]);
                    i++;
                } else {
                    clearInterval(interval);
                }
            }, 100);
            return () => clearInterval(interval);
        }
    }, [isGenerating]);

    return (
        <div className="relative w-full h-full bg-black/40 rounded-2xl border border-emerald-500/20 overflow-hidden backdrop-blur-sm group">
            {/* Syntax Highlighting IDE Background */}
            <div className="absolute inset-0 flex">
                <div className="w-12 h-full bg-black/60 border-r border-emerald-500/10 flex flex-col items-center pt-8 text-[10px] text-emerald-500/30 font-mono space-y-2">
                    {Array.from({ length: 25 }).map((_, i) => (
                        <div key={i}>{i + 1}</div>
                    ))}
                </div>
                <div className="flex-1 p-8 font-mono text-sm overflow-hidden relative">
                    {lines.map((line, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="whitespace-pre flex gap-4"
                        >
                            <span className={
                                line?.startsWith('import') ? 'text-purple-400' :
                                    line?.includes('function') ? 'text-emerald-400' :
                                        line?.includes('//') ? 'text-emerald-500/50 italic' :
                                            'text-emerald-300'
                            }>
                                {line}
                            </span>
                        </motion.div>
                    ))}

                    {/* Syntax Shimmer */}
                    {isGenerating && (
                        <motion.div
                            className="absolute bottom-0 left-0 w-full h-1 bg-emerald-500/50 blur-sm shrink-0"
                            animate={{ y: [-400, 400] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        />
                    )}
                </div>
            </div>

            {/* NEURAL HUD METRICS */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
                <HUDMetric
                    label="LOGIC DENSITY"
                    value="94.2%"
                    icon={<Cpu className="w-3 h-3 text-emerald-400" />}
                    active={isGenerating}
                />
                <HUDMetric
                    label="PERF_FORECAST"
                    value="8.4 GHZ"
                    icon={<Activity className="w-3 h-3 text-emerald-400" />}
                    active={isGenerating}
                />
                <HUDMetric
                    label="SECURITY"
                    value="TRUSTED"
                    icon={<Shield className="w-3 h-3 text-emerald-400" />}
                    active={isGenerating}
                />
            </div>

            {/* TERMINAL OUTPUT DRAWER */}
            <div className="absolute bottom-4 left-16 right-4 h-24 bg-black/80 border border-emerald-500/30 rounded-lg p-3 font-mono text-[10px] text-emerald-500/60 overflow-hidden shadow-2xl">
                <div className="flex items-center gap-2 mb-2 border-b border-emerald-500/20 pb-1">
                    <Terminal className="w-3 h-3" />
                    <span>VEDA-CODE-V1 // TERMINAL_OUTPUT</span>
                </div>
                <div className="space-y-1">
                    <div>[SYS] Initializing Compiler...</div>
                    <div className="text-emerald-400">[OK] Neural Lattices Active.</div>
                    {isGenerating && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 1, repeat: Infinity }}
                        >
                            [PROCESS] Synthesizing logic blocks...
                        </motion.div>
                    )}
                </div>
            </div>

            {/* CRT SCANLINE EFFECT */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_2px,3px_100%] z-10 opacity-30"></div>
        </div>
    );
}

function HUDMetric({ label, value, icon, active }: { label: string, value: string, icon: React.ReactNode, active: boolean }) {
    return (
        <motion.div
            initial={{ opacity: 0.5, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-black/80 border border-emerald-500/30 rounded-md px-3 py-1.5 flex items-center gap-3 backdrop-blur-xl group hover:border-emerald-400/60 transition-colors cursor-crosshair min-w-[140px]"
        >
            <div className={active ? "animate-pulse" : ""}>
                {icon}
            </div>
            <div className="flex flex-col">
                <span className="text-[8px] text-emerald-500/50 uppercase tracking-tighter leading-none mb-1 font-bold">{label}</span>
                <span className="text-xs text-white font-mono font-black tabular-nums">{value}</span>
            </div>
        </motion.div>
    );
}
