'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Sparkles, Wand2, Zap, CloudLightning, Sun, Moon, Palette, Camera, Ghost } from 'lucide-react';
import { useState } from 'react';

interface PromptAlchemistProps {
    className?: string;
    onEnhance?: (enhancedPrompt: string) => void;
    activeTool?: 'image' | 'video' | 'story' | 'voice' | 'character' | 'code';
}

const styles = [
    { id: 'cinematic', label: 'Cinematic', icon: Camera, color: 'blue' },
    { id: 'anime', label: 'Anime', icon: Ghost, color: 'purple' },
    { id: 'fantasy', label: 'Fantasy', icon: Sparkles, color: 'amber' },
    { id: 'noir', label: 'Noir', icon: Moon, color: 'gray' }
];

const lightings = [
    { id: 'neon', label: 'Cyber Neon', icon: CloudLightning, color: 'pink' },
    { id: 'golden', label: 'Golden Hour', icon: Sun, color: 'orange' },
    { id: 'studio', label: 'Studio Light', icon: Zap, color: 'blue' }
];

export function PromptAlchemist({ className, onEnhance, activeTool = 'image' }: PromptAlchemistProps) {
    const [isEnhancing, setIsEnhancing] = useState(false);
    const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
    const [selectedLighting, setSelectedLighting] = useState<string | null>(null);

    const themeColors = {
        image: 'blue',
        video: 'red',
        story: 'purple',
        voice: 'emerald',
        character: 'cyan',
        code: 'emerald'
    };

    const accentColor = themeColors[activeTool] || 'blue';

    const handleEnhance = () => {
        setIsEnhancing(true);
        setTimeout(() => {
            setIsEnhancing(false);
            const promptsMap = {
                code: "Refactor this function for maximum performance using neural-optimized recursion and fp16 precision guards.",
                story: "A dark epic fantasy opening describing an obsidian throne room illuminated by dying starfire.",
                image: "An ultra-detailed cinematic masterpiece featuring neural architectures in a deep space nebula, hyper-realistic, 8k resolution, ethereal lighting.",
                video: "Cinematic drone shot soaring through a cyberpunk megacity at night, rain slicked streets reflecting neon signs.",
                voice: "Voice: Deep, gravelly professional male narrator with a hint of mystery and baritone resonance.",
                character: "Identity: A rogue AI with a sardonic sense of humor and an obsession with ancient human history."
            };
            onEnhance?.(promptsMap[activeTool] || promptsMap.image);
        }, 2500);
    };

    return (
        <div className={cn("bg-[#0a0a0a]/80 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-6 space-y-8 shadow-2xl relative overflow-hidden group", className)}>
            {/* Background Decorative Shimmer */}
            <div className={cn(
                "absolute -top-24 -right-24 w-48 h-48 blur-[80px] rounded-full group-hover:bg-opacity-20 transition-all duration-1000",
                accentColor === 'blue' && "bg-blue-500/10",
                accentColor === 'red' && "bg-red-500/10",
                accentColor === 'purple' && "bg-purple-500/10",
                accentColor === 'emerald' && "bg-emerald-500/10",
                accentColor === 'cyan' && "bg-cyan-500/10",
            )}></div>

            <div className="flex items-center justify-between relative z-10">
                <h3 className="text-white font-black text-lg tracking-tighter flex items-center gap-2">
                    <Wand2 className={cn(
                        "w-5 h-5",
                        accentColor === 'blue' && "text-blue-400",
                        accentColor === 'red' && "text-red-400",
                        accentColor === 'purple' && "text-purple-400",
                        accentColor === 'emerald' && "text-emerald-400",
                        accentColor === 'cyan' && "text-cyan-400",
                    )} /> Prompt Alchemist
                </h3>
                <span className="text-[10px] font-mono font-bold text-gray-500 px-2 py-0.5 rounded-md bg-white/5 border border-white/5 uppercase tracking-widest">v2.0 Beta</span>
            </div>

            {/* Neural Enhancer Button */}
            <div className="relative z-10">
                <button
                    onClick={handleEnhance}
                    disabled={isEnhancing}
                    className={cn(
                        "w-full group/btn relative py-4 px-6 rounded-2xl overflow-hidden transition-all duration-500 font-bold tracking-tight text-white",
                        isEnhancing ? "cursor-wait" : "hover:scale-[1.02] active:scale-[0.98]"
                    )}
                >
                    {/* Animated Gradient Background */}
                    <div className={cn(
                        "absolute inset-0 bg-[length:200%_auto] transition-all duration-1000",
                        accentColor === 'blue' && "bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600",
                        accentColor === 'red' && "bg-gradient-to-r from-red-600 via-orange-600 to-red-600",
                        accentColor === 'purple' && "bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600",
                        accentColor === 'emerald' && "bg-gradient-to-r from-emerald-600 via-cyan-600 to-emerald-600",
                        accentColor === 'cyan' && "bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-600",
                        isEnhancing ? "animate-gradient-x opacity-100" : "opacity-80 group-hover/btn:opacity-100"
                    )}></div>

                    {/* Enhanced Shimmer Effect */}
                    {isEnhancing && (
                        <motion.div
                            className="absolute inset-x-0 h-full w-24 bg-white/30 blur-2xl -skew-x-[45deg] z-10"
                            animate={{ left: ['-100%', '200%'] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        />
                    )}

                    <div className="relative z-20 flex items-center justify-center gap-3">
                        <Sparkles className={cn("w-5 h-5", isEnhancing && "animate-spin")} />
                        <span className="uppercase text-xs tracking-[0.2em] font-black">
                            {isEnhancing ? "Neural Upscaling..." : "Enhance with Alchemist"}
                        </span>
                    </div>
                </button>
            </div>

            {/* Style Parameter Grid */}
            <div className="space-y-4 relative z-10">
                <label className="text-gray-500 text-[10px] uppercase font-mono font-bold tracking-widest flex items-center gap-2">
                    <Palette className="w-3 h-3" /> Core Aesthetic Layers
                </label>
                <div className="grid grid-cols-2 gap-3">
                    {styles.map((style) => {
                        const SIcon = style.icon;
                        const isSel = selectedStyle === style.id;
                        return (
                            <button
                                key={style.id}
                                onClick={() => setSelectedStyle(isSel ? null : style.id)}
                                className={cn(
                                    "p-3 rounded-2xl border transition-all flex flex-col items-center gap-2 text-center group/item",
                                    isSel
                                        ? accentColor === 'blue' ? "bg-blue-500/20 border-blue-500/50 text-blue-400" :
                                            accentColor === 'red' ? "bg-red-500/20 border-red-500/50 text-red-400" :
                                                accentColor === 'purple' ? "bg-purple-500/20 border-purple-500/50 text-purple-400" :
                                                    accentColor === 'emerald' ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-400" :
                                                        accentColor === 'cyan' ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400" :
                                                            "bg-blue-500/20 border-blue-500/50 text-blue-400"
                                        : "bg-white/5 border-white/5 hover:border-white/10 text-gray-400 hover:text-white"
                                )}
                            >
                                <div className={cn(
                                    "w-8 h-8 rounded-lg flex items-center justify-center transition-all",
                                    isSel ? "bg-white/10" : "bg-black/40 group-hover/item:scale-110"
                                )}>
                                    <SIcon className="w-4 h-4" />
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-tighter">{style.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Lighting Parameters */}
            <div className="space-y-4 relative z-10">
                <label className="text-gray-500 text-[10px] uppercase font-mono font-bold tracking-widest flex items-center gap-2">
                    <Sun className="w-3 h-3" /> Neural Illumination
                </label>
                <div className="flex flex-wrap gap-2">
                    {lightings.map((light) => {
                        const LIcon = light.icon;
                        const isSel = selectedLighting === light.id;
                        return (
                            <button
                                key={light.id}
                                onClick={() => setSelectedLighting(isSel ? null : light.id)}
                                className={cn(
                                    "px-4 py-2 rounded-xl border transition-all flex items-center gap-2 text-[10px] font-bold uppercase tracking-tight",
                                    isSel
                                        ? "bg-purple-500/20 border-purple-500/50 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.2)]"
                                        : "bg-white/5 border-white/5 hover:border-white/10 text-gray-500 hover:text-white"
                                )}
                            >
                                <LIcon className="w-3 h-3" />
                                {light.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Technical Footer */}
            <div className="pt-4 border-t border-white/5 flex items-center justify-between opacity-40 group-hover:opacity-100 transition-opacity relative z-10">
                <div className="flex gap-1">
                    {[1, 2, 3].map(i => (
                        <div
                            key={i}
                            className={cn(
                                "w-4 h-1 rounded-full",
                                accentColor === 'blue' && "bg-blue-500/40",
                                accentColor === 'red' && "bg-red-500/40",
                                accentColor === 'purple' && "bg-purple-500/40",
                                accentColor === 'emerald' && "bg-emerald-500/40",
                                accentColor === 'cyan' && "bg-cyan-500/40",
                            )}
                        ></div>
                    ))}
                </div>
                <span className="text-[9px] font-mono text-gray-600">SYNERGY_INDEX: 98.4%</span>
            </div>
        </div>
    );
}
