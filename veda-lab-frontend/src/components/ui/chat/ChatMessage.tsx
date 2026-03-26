'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Bot, User, Sparkles, Check, ShieldCheck, Cpu } from 'lucide-react';

interface ChatMessageProps {
    role: 'user' | 'assistant';
    content: string;
    time?: string;
}

export function ChatMessage({ role, content, time }: ChatMessageProps) {
    const isAssistant = role === 'assistant';

    return (
        <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className={cn(
                "flex gap-8 max-w-5xl mx-auto w-full group py-4",
                !isAssistant && "flex-row-reverse"
            )}
        >
            {/* Avatar Stack */}
            <div className="flex flex-col items-center gap-3 flex-shrink-0">
                <div className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl border transition-all duration-700 group-hover:rotate-6 group-hover:scale-110",
                    isAssistant
                        ? "bg-gradient-to-br from-[#050505] to-[#111] border-[#00f2ff]/30 shadow-[0_0_30px_rgba(0,242,255,0.2)]"
                        : "bg-[#050505] border-white/10"
                )}>
                    {isAssistant ? <Bot className="w-7 h-7 text-[#00f2ff] drop-shadow-[0_0_8px_#00f2ff]" /> : <User className="w-7 h-7 text-white" />}
                </div>
                {isAssistant && (
                    <div className="flex gap-1 opacity-60">
                        <div className="w-1.5 h-4 bg-[#00f2ff] rounded-full shadow-[0_0_8px_#00f2ff]"></div>
                        <div className="w-1.5 h-2 bg-[#00f2ff]/40 rounded-full mt-1"></div>
                    </div>
                )}
            </div>

            {/* Content Stack */}
            <div className={cn(
                "flex-1 flex flex-col gap-3 min-w-0 pt-1",
                !isAssistant && "items-end"
            )}>
                <div className={cn(
                    "flex items-center gap-4 px-2",
                    !isAssistant && "flex-row-reverse"
                )}>
                    <span className={cn(
                        "text-[10px] font-black uppercase tracking-[0.3em]",
                        isAssistant ? "text-[#00f2ff] drop-shadow-[0_0_5px_#00f2ff]" : "text-gray-500"
                    )}>
                        {isAssistant ? "VEDA_CORE" : "TERMINAL_USER"}
                    </span>
                    <div className="w-1 h-1 rounded-full bg-white/20"></div>
                    <span className="text-[9px] font-mono text-gray-600 uppercase tracking-[0.2em] font-bold">
                        {time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                </div>

                {/* The Bubble */}
                <div className={cn(
                    "relative p-8 rounded-[2.5rem] text-gray-100 leading-relaxed transition-all shadow-[0_20px_60px_rgba(0,0,0,0.5)]",
                    isAssistant
                        ? "bg-[#050505]/60 border border-white/10 backdrop-blur-3xl rounded-tl-none group-hover:neon-border-glow"
                        : "bg-white/[0.02] border border-white/5 backdrop-blur-3xl rounded-tr-none hover:bg-white/[0.04] hover:border-white/10"
                )}>
                    {/* Status HUD for Assistant */}
                    {isAssistant && (
                        <div className="absolute -top-4 right-10 px-4 py-1.5 bg-[#050505] border border-[#00f2ff]/30 rounded-xl flex items-center gap-3 shadow-[0_0_20px_rgba(0,242,255,0.2)] opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                            <ShieldCheck className="w-3.5 h-3.5 text-[#10b981]" />
                            <span className="text-[9px] font-mono text-[#00f2ff]/80 uppercase font-black tracking-widest">SYNAPSE_SECURE: 100%</span>
                        </div>
                    )}

                    <div className="relative z-10">
                        <p className="whitespace-pre-wrap text-[1.05rem] font-medium text-gray-300 antialiased tracking-tight">{content}</p>
                    </div>

                    {/* AI Interaction Pills */}
                    {isAssistant && (
                        <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                            <div className="flex gap-6">
                                <div className="flex items-center gap-2 text-[9px] font-bold font-mono text-gray-600 uppercase tracking-widest">
                                    <Cpu className="w-3.5 h-3.5 text-[#00f2ff]/40" />
                                    <span>LATENCY: 0.18MS</span>
                                </div>
                                <div className="flex items-center gap-2 text-[9px] font-bold font-mono text-gray-600 uppercase tracking-widest">
                                    <Sparkles className="w-3.5 h-3.5 text-[#8b5cf6]/40" />
                                    <span>SYNTHESIS: OPTIMIZED</span>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <button className="p-2 px-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:text-white transition-all text-[9px] font-black text-gray-500 uppercase tracking-widest">Copy</button>
                                <button className="p-2 px-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:text-white transition-all text-[9px] font-black text-gray-500 uppercase tracking-widest">Regen</button>
                            </div>
                        </div>
                    )}

                    {/* Background Decorative Element */}
                    {isAssistant && (
                        <div className="absolute top-0 right-0 p-6 opacity-[0.03] pointer-events-none group-hover:opacity-[0.08] transition-opacity">
                            <Bot className="w-24 h-24" />
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
