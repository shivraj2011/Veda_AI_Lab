'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { TopBar } from '@/components/layout/TopBar';
import { ModelSelector } from '@/components/ui/animated/ModelSelector';
import { PromptAlchemist } from '@/components/ui/animated/PromptAlchemist';
import { VoiceCanvas } from '@/components/ui/animated/VoiceCanvas';
import { Mic, Music, Wand2, Terminal, Info, Zap, Settings, Volume2, Radio, Sliders } from 'lucide-react';

export default function VoiceGenerator() {
    const [status, setStatus] = useState<'idle' | 'generating' | 'completed'>('idle');
    const [progress, setProgress] = useState(0);

    const handleGenerate = () => {
        setStatus('generating');
        setProgress(0);

        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setStatus('completed');
                    return 100;
                }
                return prev + 10;
            });
        }, 200);
    };

    return (
        <main className="flex-1 flex flex-col h-screen overflow-hidden relative z-10 bg-[#050505]">
            <TopBar title="Unicorn Sonic Forge" />

            <div className="flex-1 flex overflow-hidden">
                {/* Left Panel: Audio Controls */}
                <div className="w-[450px] border-r border-white/10 bg-[#050505] flex flex-col overflow-y-auto custom-scrollbar relative z-20">
                    <div className="p-10 space-y-12 pb-32">
                        {/* Header Section */}
                        <div className="space-y-6">
                            <div className="w-20 h-20 rounded-[1.5rem] bg-gradient-to-br from-[#050505] to-[#111] border border-white/20 flex items-center justify-center shadow-2xl relative overflow-hidden group hover:neon-border-glow transition-all duration-700">
                                <motion.div
                                    className="absolute inset-0 bg-[#10b981]/10"
                                    animate={{ opacity: [0.1, 0.3, 0.1] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                />
                                <Volume2 className="w-10 h-10 text-[#10b981] drop-shadow-[0_0_8px_#10b981]" />
                            </div>
                            <div>
                                <h1 className="text-4xl font-black text-white tracking-tighter uppercase leading-none">UNICORN SONIC FORGE</h1>
                                <p className="text-gray-600 text-[10px] font-mono tracking-[0.4em] mt-3 font-black uppercase">ULTRA_SONIC_v4 // FREQUENCY_SYNTHESIS</p>
                            </div>
                        </div>

                        {/* Vocal Engine Selection */}
                        <div className="space-y-8">
                            <div className="flex items-center justify-between">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 flex items-center gap-4">
                                    <div className="w-2 h-2 rounded-full bg-[#10b981] shadow-[0_0_10px_#10b981]"></div>
                                    Vocal_Engine_Select
                                </h3>
                                <span className="text-[9px] font-mono font-black text-[#10b981]/60 uppercase tracking-widest">Master_Quality</span>
                            </div>
                            <ModelSelector activeModelId="sdxl" />
                        </div>

                        {/* Tone Alchemy */}
                        <div className="space-y-8 pt-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 flex items-center gap-4">
                                    <div className="w-2 h-2 rounded-full bg-[#00f2ff] shadow-[0_0_10px_#00f2ff]"></div>
                                    Tone_Modulation
                                </h3>
                                <Sliders className="w-4 h-4 text-gray-800" />
                            </div>
                            <PromptAlchemist activeTool="voice" />
                        </div>

                        {/* Audio Metrics HUD */}
                        <div className="grid grid-cols-2 gap-6">
                            <div className="p-5 bg-white/[0.02] border border-white/5 rounded-[1.5rem] space-y-2 group/metric hover:neon-border-glow transition-all">
                                <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest">Sample_Rate</span>
                                <div className="flex items-center justify-between">
                                    <span className="text-xl font-black text-white">48_kHZ</span>
                                    <Radio className="w-5 h-5 text-[#10b981]" />
                                </div>
                            </div>
                            <div className="p-5 bg-white/[0.02] border border-white/5 rounded-[1.5rem] space-y-2 group/metric hover:neon-border-glow transition-all">
                                <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest">Latency</span>
                                <div className="flex items-center justify-between">
                                    <span className="text-xl font-black text-white">0.4_mS</span>
                                    <Zap className="w-5 h-5 text-[#00f2ff]" />
                                </div>
                            </div>
                        </div>

                        {/* Voice Synthesis Action */}
                        <button
                            onClick={handleGenerate}
                            disabled={status === 'generating'}
                            className="w-full py-7 bg-gradient-to-r from-[#050505] to-[#111] border border-white/20 rounded-[2rem] text-white font-black uppercase tracking-[0.4em] text-[10px] hover:neon-border-glow active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-4">
                                {status === 'generating' ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-[#10b981]/30 border-t-[#10b981] rounded-full animate-spin" />
                                        Modulating_Waveform...
                                    </>
                                ) : (
                                    <>
                                        <Mic className="w-5 h-5 text-[#10b981] group-hover:rotate-12 transition-transform" />
                                        Initiate_Synthesis
                                    </>
                                )}
                            </span>
                        </button>
                    </div>

                    {/* Bottom System Status */}
                    <div className="p-6 bg-[#020202] border-t border-white/5 mt-auto flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Terminal className="w-4 h-4 text-gray-700" />
                            <span className="text-[8px] font-mono font-black text-gray-700 uppercase tracking-[0.3em]">Neural_Spectral_Analysis: ACTIVE</span>
                        </div>
                        <div className="flex items-baseline gap-1.5 h-6">
                            {[0.4, 0.8, 0.3, 0.9, 0.5].map((h, i) => (
                                <div 
                                    key={i} 
                                    className="w-1.5 bg-[#10b981]/40 rounded-full" 
                                    style={{ height: `${h * 100}%` }}
                                ></div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Content: Sonic Visualizer */}
                <div className="flex-1 bg-[#020202] relative flex flex-col items-center justify-center p-12 overflow-hidden">
                    <div className="absolute inset-0 bg-grid-white opacity-[0.02]"></div>
                    {/* Background Audio Glows */}
                    <div className="absolute top-1/4 -right-1/4 w-[500px] h-[500px] bg-[#10b981]/5 blur-[150px] animate-pulse"></div>
                    <div className="absolute bottom-1/4 -left-1/4 w-[500px] h-[500px] bg-[#00f2ff]/5 blur-[150px] animate-pulse"></div>

                    <div className="w-full max-w-5xl relative z-10 glass-holographic p-12 rounded-[4rem] border-white/5 hover:neon-border-glow transition-all duration-700">
                        <VoiceCanvas status={status} progress={progress} />
                    </div>

                    {/* Environment Controls */}
                    <div className="absolute bottom-12 px-10 py-4 bg-white/[0.02] border border-white/10 rounded-[1.5rem] flex items-center gap-10 backdrop-blur-2xl opacity-40 hover:opacity-100 transition-opacity">
                        <div className="flex items-center gap-4">
                            <Music className="w-4 h-4 text-[#10b981]" />
                            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Neural_Ambient: NONE</span>
                        </div>
                        <div className="w-px h-6 bg-white/10"></div>
                        <div className="flex items-center gap-4">
                            <Info className="w-4 h-4 text-[#00f2ff]" />
                            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Master_Node: LOCAL</span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
