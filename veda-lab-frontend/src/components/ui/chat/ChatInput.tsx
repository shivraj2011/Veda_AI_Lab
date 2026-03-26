'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, Mic, Paperclip, Terminal, Zap, Cpu } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatInputProps {
    onSend: (message: string) => void;
    isLoading?: boolean;
}

export function ChatInput({ onSend, isLoading }: ChatInputProps) {
    const [input, setInput] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleSend = () => {
        if (input.trim() && !isLoading) {
            onSend(input);
            setInput('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
        }
    }, [input]);

    return (
        <div className="max-w-5xl mx-auto w-full relative group p-10 pt-4">
            {/* Massive Desktop Glow */}
            <div className="absolute inset-x-20 inset-y-10 bg-[#00f2ff]/5 blur-[150px] opacity-0 group-focus-within:opacity-100 transition-all duration-1000 pointer-events-none"></div>

            <div className="relative bg-[#050505]/95 backdrop-blur-3xl border border-white/10 rounded-[3rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.6)] transition-all duration-700 focus-within:neon-border-glow">
                {/* Input Area */}
                <textarea
                    ref={textareaRef}
                    rows={1}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full bg-transparent p-8 px-10 pr-24 min-h-[90px] max-h-[300px] resize-none text-white focus:outline-none placeholder:text-gray-700 text-xl font-medium leading-relaxed antialiased tracking-tight"
                    placeholder="Provide neural directive... (Shift+Enter for newline)"
                    disabled={isLoading}
                />

                {/* Action Bar */}
                <div className="flex items-center justify-between p-6 px-10 border-t border-white/5 bg-black/40">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <button className="w-12 h-12 flex items-center justify-center text-gray-500 hover:text-[#00f2ff] hover:bg-white/5 rounded-2xl transition-all" title="Add attachment">
                                <Paperclip className="w-6 h-6" />
                            </button>
                            <button className="w-12 h-12 flex items-center justify-center text-gray-500 hover:text-[#00f2ff] hover:bg-white/5 rounded-2xl transition-all" title="Voice Input">
                                <Mic className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="w-px h-8 bg-white/10 mx-2"></div>
                        <button className="flex items-center gap-4 px-6 py-3 bg-white/5 border border-white/5 rounded-2xl text-gray-500 hover:text-white hover:bg-white/10 transition-all group/enh">
                            <Sparkles className="w-5 h-5 text-[#8b5cf6]/60 group-hover:text-[#8b5cf6] transition-colors" />
                            <span className="text-[11px] font-black uppercase tracking-[0.2em] mt-0.5">Enhance_Directive</span>
                        </button>
                    </div>

                    <div className="flex items-center gap-8">
                        <div className="hidden md:flex flex-col items-end opacity-40 group-focus-within:opacity-100 transition-opacity">
                            <span className="text-[9px] font-mono text-[#00f2ff]/60 uppercase tracking-[0.3em] font-black">Link_Ready</span>
                            <div className="flex gap-1.5 h-1.5 mt-2">
                                <div className="w-4 h-full bg-[#00f2ff] rounded-full shadow-[0_0_8px_#00f2ff]"></div>
                                <div className="w-4 h-full bg-[#00f2ff]/40 rounded-full"></div>
                                <div className="w-4 h-full bg-[#00f2ff]/10 rounded-full"></div>
                            </div>
                        </div>

                        <button
                            onClick={handleSend}
                            disabled={!input.trim() || isLoading}
                            className={cn(
                                "w-16 h-16 rounded-[2rem] transition-all flex items-center justify-center shadow-2xl relative overflow-hidden group/btn",
                                input.trim() && !isLoading
                                    ? "bg-gradient-to-br from-[#050505] to-[#111] text-[#00f2ff] border border-[#00f2ff]/30 shadow-[0_0_30px_rgba(0,242,255,0.2)] hover:scale-105 active:scale-95"
                                    : "bg-white/5 text-gray-800"
                            )}
                        >
                            <Send className={cn("w-7 h-7 relative z-10 transition-transform", input.trim() && "translate-x-0.5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1")} />
                            {input.trim() && !isLoading && (
                                <motion.div
                                    className="absolute inset-0 bg-[#00f2ff]/10"
                                    initial={{ x: '-100%' }}
                                    animate={{ x: '200%' }}
                                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex justify-center gap-16 mt-8">
                <div className="flex items-center gap-4 opacity-30 group-focus-within:opacity-100 transition-opacity">
                    <Terminal className="w-4 h-4 text-gray-500" />
                    <span className="text-[10px] font-bold font-mono text-gray-500 uppercase tracking-[0.4em]">Core_Calibrated</span>
                </div>
                <div className="flex items-center gap-4 opacity-30 group-focus-within:opacity-100 transition-opacity">
                    <Zap className="w-4 h-4 text-[#00f2ff]/60" />
                    <span className="text-[10px] font-bold font-mono text-gray-500 uppercase tracking-[0.4em]">Load: 1.2%</span>
                </div>
                <div className="flex items-center gap-4 opacity-30 group-focus-within:opacity-100 transition-opacity">
                    <Cpu className="w-4 h-4 text-[#8b5cf6]/60" />
                    <span className="text-[10px] font-bold font-mono text-gray-500 uppercase tracking-[0.4em]">Engine: Active</span>
                </div>
            </div>
        </div>
    );
}
