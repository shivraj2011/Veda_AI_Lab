'use client';

import { TopBar } from '@/components/layout/TopBar';
import { FadeInBlock } from '@/components/ui/animated/GlowButton';
import { History, MessageSquare, Clock } from 'lucide-react';

export default function HistoryPage() {
    return (
        <main className="flex-1 flex flex-col overflow-hidden relative z-10 bg-[#050505]">
            <TopBar title="Veda Chronicles" />
            <div className="flex-1 overflow-y-auto p-12 max-w-6xl mx-auto w-full custom-scrollbar">
                <FadeInBlock delay={0}>
                    <div className="mb-16 border-b border-white/10 pb-16">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-[#00f2ff]/10 border border-[#00f2ff]/20 rounded-xl shadow-[0_0_15px_rgba(0,242,255,0.1)]">
                                <History className="w-6 h-6 text-[#00f2ff]" />
                            </div>
                            <span className="text-xs font-mono font-black text-[#00f2ff] uppercase tracking-[0.4em]">CHRONICLE_LINK_ESTABLISHED</span>
                        </div>
                        <h1 className="text-6xl font-black text-white mb-4 tracking-tighter uppercase leading-none">UNICORN CHRONICLES</h1>
                        <p className="text-gray-600 font-black text-[10px] tracking-[0.3em] uppercase">REVIEW YOUR PAST NEURAL_INTERACTIONS WITH THE UNICORN CORE</p>
                    </div>
                </FadeInBlock>

                <div className="space-y-6">
                    {[
                        { title: "Deep Space Exploration Research", date: "2 hours ago", preview: "The atmospheric composition of Titan suggests..." },
                        { title: "Quantum Computing Logic", date: "Yesterday", preview: "If we observe the qubit state before collapse..." },
                        { title: "Character Persona: Raven", date: "2 days ago", preview: "Initialize shadow protocol and begin narrative..." },
                    ].map((chat, i) => (
                        <FadeInBlock key={i} delay={0.1 * i}>
                            <div className="bg-[#020202] border border-white/5 rounded-[2rem] p-8 hover:neon-border-glow transition-all duration-700 cursor-pointer group flex items-center gap-8 shadow-2xl">
                                <div className="w-16 h-16 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center justify-center group-hover:bg-[#00f2ff]/10 transition-colors flex-shrink-0">
                                    <MessageSquare className="text-[#00f2ff] w-8 h-8 drop-shadow-[0_0_8px_#00f2ff]" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="text-white font-black text-xl tracking-tight truncate uppercase italic group-hover:text-[#00f2ff] transition-colors">{chat.title}</h3>
                                        <div className="flex items-center gap-2 text-[10px] font-mono font-black text-gray-700 uppercase tracking-widest">
                                            <Clock className="w-3 h-3" /> {chat.date}
                                        </div>
                                    </div>
                                    <p className="text-gray-500 text-sm font-medium truncate italic">"{chat.preview}"</p>
                                </div>
                            </div>
                        </FadeInBlock>
                    ))}
                </div>
            </div>
        </main>
    );
}
