'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { FadeInBlock } from '@/components/ui/animated/GlowButton';
import { TopBar } from '@/components/layout/TopBar';
import { ModelSelector } from '@/components/ui/animated/ModelSelector';
import { Terminal, Code, Cpu, Shield, Zap, Download, Share2, History } from 'lucide-react';

const CODE_MODELS = [
    { id: 'deepseek-coder:latest', name: 'DeepSeek Coder (1.3B)', desc: 'Optimized for logic synthesis and algorithm engineering.', icon: Code, color: 'blue', preview: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=400&auto=format&fit=crop', tags: ['Logic_Expert', 'Fast'] },
    { id: 'llama3:latest', name: 'Llama 3 (8B)', desc: 'General purpose reasoning for complex system architecture.', icon: Cpu, color: 'purple', preview: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=400&auto=format&fit=crop', tags: ['Reasoning', 'Architect'] },
];

export default function CodeStudio() {
    const [status, setStatus] = useState<'idle' | 'generating' | 'completed' | 'error'>('idle');
    const [generatedCode, setGeneratedCode] = useState('');
    const [activeModelId, setActiveModelId] = useState(CODE_MODELS[0].id);
    const [prompt, setPrompt] = useState('');

    const handleSynthesize = async () => {
        if (!prompt.trim()) return;
        
        setStatus('generating');
        setGeneratedCode('');
        
        try {
            const res = await fetch('/api/chats/completion', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    prompt: `You are an expert software engineer. Write clean, efficient code for: ${prompt}. Return ONLY the code, no explanation.`,
                    model: activeModelId
                })
            });

            if (!res.body) throw new Error('No body');
            const reader = res.body.getReader();
            const decoder = new TextDecoder();
            let fullText = "";

            while (true) {
                const { value, done } = await reader.read();
                if (done) break;
                
                const chunk = decoder.decode(value);
                const lines = chunk.split('\n');
                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        const dataStr = line.replace('data: ', '').trim();
                        if (dataStr === '[DONE]') {
                            setStatus('completed');
                            break;
                        }
                        try {
                            const data = JSON.parse(dataStr);
                            if (data.token) {
                                fullText += data.token;
                                setGeneratedCode(fullText);
                            }
                        } catch (e) {}
                    }
                }
            }
        } catch (err) {
            console.error("Code error:", err);
            setStatus('error');
        }
    };

    return (
        <main className="flex-1 flex flex-col relative overflow-hidden h-screen font-sans bg-black">
            <TopBar title="Veda Code Architect" />

            <div className="flex-1 overflow-y-auto p-12 relative custom-scrollbar">
                <FadeInBlock delay={0}>
                    <div className="text-center mb-16 relative border-b border-white/5 pb-16">
                        <div className="flex justify-center items-center mb-8 relative">
                            <div className="absolute w-32 h-32 bg-emerald-500/10 rounded-full blur-[80px] animate-pulse"></div>
                            <div className="relative w-20 h-20 bg-gradient-to-br from-[#050505] to-[#111] rounded-3xl flex items-center justify-center shadow-2xl border border-white/10 hover:neon-border-glow transition-all duration-700">
                                <Terminal className="w-10 h-10 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                            </div>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black mb-4 bg-gradient-to-r from-white via-white to-gray-500 bg-clip-text text-transparent tracking-tighter uppercase leading-none italic">VEDA CODE ARCHITECT</h1>
                        <p className="text-xl text-gray-500 font-light tracking-[0.4em] uppercase italic">Neural Logic Synthesis • Component Engineering Core</p>
                    </div>
                </FadeInBlock>

                <div className="grid lg:grid-cols-12 gap-12 items-start relative z-10">
                    <div className="lg:col-span-4 space-y-10">
                        <section className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]"></div>
                                <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic">Logic_Engine_Select</h2>
                            </div>
                            <ModelSelector 
                                models={CODE_MODELS}
                                activeModelId={activeModelId}
                                onSelect={(id) => setActiveModelId(id)}
                            />
                        </section>

                        <section className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]"></div>
                                <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic">Directive_Synthesis</h2>
                            </div>
                            <textarea 
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                className="w-full bg-black/40 border border-white/10 rounded-3xl p-8 text-white text-lg font-medium focus:outline-none focus:border-emerald-500/50 h-48 resize-none placeholder:text-gray-800"
                                placeholder="State your architectural requirements..."
                            />
                        </section>

                        <motion.button
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleSynthesize}
                            disabled={status === 'generating'}
                            className="w-full h-20 bg-emerald-500 text-black font-black uppercase text-xs tracking-[0.4em] rounded-[2rem] shadow-[0_20px_40px_rgba(16,185,129,0.2)] flex items-center justify-center gap-4 transition-all hover:bg-emerald-400 disabled:opacity-50 italic"
                        >
                            {status === 'generating' ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                    SYNTHESIZING...
                                </>
                            ) : (
                                <>
                                    <Zap className="w-5 h-5" />
                                    INITIALIZE_SYNTHESIS
                                </>
                            )}
                        </motion.button>
                    </div>

                    <div className="lg:col-span-8 space-y-6">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-[3.5rem] blur opacity-25 group-hover:opacity-100 transition duration-1000"></div>
                            <div className="relative bg-[#050505]/95 backdrop-blur-3xl border border-white/10 rounded-[3.5rem] p-4 shadow-2xl min-h-[500px] overflow-hidden">
                                <div className="flex items-center justify-between px-10 py-6 border-b border-white/5">
                                    <div className="flex items-center gap-6">
                                        <div className="flex gap-2">
                                            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/40"></div>
                                            <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/40"></div>
                                            <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/40"></div>
                                        </div>
                                        <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest font-black italic">main.neuro_stream</span>
                                    </div>
                                    <div className="px-5 py-2 bg-white/5 rounded-xl border border-white/5 flex items-center gap-3">
                                        <div className={`w-2 h-2 rounded-full ${status === 'generating' ? 'bg-emerald-500 animate-pulse' : 'bg-gray-600'}`}></div>
                                        <span className="text-[10px] font-mono text-emerald-400 font-black tracking-widest uppercase italic">Logic_Stream: {status === 'generating' ? 'Active' : 'Idle'}</span>
                                    </div>
                                </div>

                                <div className="p-10 font-mono text-sm leading-relaxed overflow-x-auto custom-scrollbar h-[400px]">
                                    {status === 'idle' ? (
                                        <div className="h-full flex flex-col items-center justify-center opacity-10 text-center space-y-8">
                                            <Code className="w-24 h-24" />
                                            <p className="text-xl font-black uppercase tracking-[0.5em] italic">Awaiting_Directive</p>
                                        </div>
                                    ) : (
                                        <pre className="text-gray-300">
                                            <code>{generatedCode || '// Synthesizing patterns...'}</code>
                                        </pre>
                                    )}
                                </div>

                                <div className="px-10 py-6 border-t border-white/5 bg-black/40 flex justify-between items-center italic">
                                    <div className="flex gap-10">
                                        <div className="flex items-center gap-3">
                                            <Cpu className="w-4 h-4 text-emerald-500/40" />
                                            <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">Load: 1.2%</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Shield className="w-4 h-4 text-blue-500/40" />
                                            <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">Secure: 100%</span>
                                        </div>
                                    </div>
                                    <button className="px-6 py-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] font-black text-white uppercase tracking-widest transition-all border border-white/5" onClick={() => navigator.clipboard.writeText(generatedCode)}>Copy_Buffer</button>
                                </div>
                            </div>
                        </div>

                        <div className="h-24 flex gap-6">
                            <ActionButton icon={<Download className="w-5 h-5" />} label="EXPORT" />
                            <ActionButton icon={<Share2 className="w-5 h-5" />} label="PUBLISH" />
                            <ActionButton icon={<History className="w-5 h-5" />} label="SESSIONS" />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

function ActionButton({ icon, label }: { icon: React.ReactNode, label: string }) {
    return (
        <motion.button
            whileHover={{ y: -2, backgroundColor: 'rgba(16, 185, 129, 0.1)' }}
            className="flex-1 flex items-center justify-center gap-4 rounded-3xl border border-white/5 bg-white/[0.02] font-black text-[11px] tracking-[0.3em] text-gray-400 hover:text-white hover:border-white/10 transition-all uppercase italic"
        >
            {icon}
            {label}
        </motion.button>
    );
}
