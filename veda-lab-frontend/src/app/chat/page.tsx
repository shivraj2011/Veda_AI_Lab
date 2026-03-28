'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { 
    MessageSquare, 
    Send, 
    Sparkles, 
    Zap, 
    Bot, 
    User, 
    Loader2, 
    Plus,
    Hash,
    MoreVertical,
    History,
    Settings,
    Shield,
    Terminal,
    Cpu,
    Network
} from 'lucide-react';
import { TopBar } from '@/components/layout/TopBar';
import { useVedaStore } from '@/lib/store';
import { NeuralTyping } from '@/components/ui/chat/NeuralTyping';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

interface Chat {
    id: string;
    title: string;
    preview: string;
    timestamp: Date;
    active?: boolean;
}

export default function ChatView() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [activeChat, setActiveChat] = useState('1');
    const useCredits = useVedaStore((state) => state.useCredits);

    const [chats] = useState<Chat[]>([
        { id: '1', title: 'Neural Logic Sync', preview: 'Analyzing quantum coherence...', timestamp: new Date(), active: true },
        { id: '2', title: 'Market Synthesis', preview: 'Projected yield curves...', timestamp: new Date() },
        { id: '3', title: 'Code Refactor', preview: 'Optimizing kernel loops...', timestamp: new Date() },
    ]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        // 0. Deduct Credits
        const success = useCredits(1);
        if (!success) {
            alert("INSUFFICIENT NEURAL CREDITS. HARVEST MORE IN REWARDS SECTOR.");
            return;
        }

        const userMsg: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input.trim(),
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        try {
            const res = await fetch('/api/chats', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [...messages, userMsg].map(m => ({
                        role: m.role,
                        content: m.content
                    })),
                    model: 'dolphin-llama3'
                })
            });

            const data = await res.json();
            
            if (data.success) {
                const assistantMsg: Message = {
                    id: (Date.now() + 1).toString(),
                    role: 'assistant',
                    content: data.response,
                    timestamp: new Date()
                };
                setMessages(prev => [...prev, assistantMsg]);
            }
        } catch (error) {
            console.error('Chat error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="flex-1 flex flex-col bg-[#050505] relative overflow-hidden">
            <TopBar title="VEDA_CHAT_v4.0" />
            
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full"></div>
            </div>

            <div className="flex-1 flex overflow-hidden relative z-10">
                {/* Sidebar - Local History */}
                <div className="hidden lg:flex w-80 border-r border-white/5 flex-col bg-black/20 backdrop-blur-xl">
                    <div className="p-8">
                        <button className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-xs font-black uppercase tracking-[0.2em] text-white flex items-center justify-center gap-3 hover:bg-white/10 transition-all group">
                            <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-500" />
                            NEW_SYNTHESIS
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto px-4 custom-scrollbar space-y-2">
                        <div className="px-4 py-2">
                            <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] italic mb-4">RECURRING_NODES</h3>
                        </div>
                        {chats.map((chat) => (
                            <motion.button
                                key={chat.id}
                                whileHover={{ x: 4 }}
                                onClick={() => setActiveChat(chat.id)}
                                className={`w-full p-4 rounded-2xl flex items-start gap-4 transition-all text-left group ${chat.id === activeChat ? 'bg-white/5 border border-white/10' : 'hover:bg-white/5'}`}
                            >
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${chat.id === activeChat ? 'bg-blue-500/20 border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'bg-white/5 border-white/10 group-hover:border-white/20'}`}>
                                    <Hash className={`w-4 h-4 ${chat.id === activeChat ? 'text-blue-400' : 'text-gray-500'}`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-[11px] font-bold text-white uppercase tracking-wider truncate mb-1 italic">{chat.title}</div>
                                    <div className="text-[10px] text-gray-500 truncate font-medium uppercase tracking-tighter">{chat.preview}</div>
                                </div>
                            </motion.button>
                        ))}
                    </div>

                    <div className="p-8 border-t border-white/5 bg-black/40">
                        <div className="flex items-center gap-4 group cursor-pointer">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 p-[1px]">
                                <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-[10px] font-black text-white italic">SY</div>
                            </div>
                            <div className="flex-1">
                                <div className="text-[10px] font-bold text-white uppercase tracking-wider italic">Veda Access</div>
                                <div className="text-[9px] text-blue-400 font-black uppercase tracking-[0.2em] italic">PRO_ACTIVE</div>
                            </div>
                            <Settings className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
                        </div>
                    </div>
                </div>

                {/* Main Chat Area */}
                <div className="flex-1 flex flex-col relative">
                    {/* Header HUD */}
                    <div className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-black/20 backdrop-blur-md">
                        <div className="flex items-center gap-4">
                            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse shadow-[0_0_10px_#60a5fa]"></div>
                            <div>
                                <h2 className="text-[11px] font-black text-white uppercase tracking-[0.3em] italic">Neural_Interface_v4</h2>
                                <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Active_Node: DOLPHIN_LLAMA3_8B</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="hidden md:flex items-center gap-6 mr-6">
                                <div className="flex flex-col items-end">
                                    <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">LATENCY</span>
                                    <span className="text-[10px] text-emerald-400 font-black italic tracking-tighter">14ms</span>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">THROUGHPUT</span>
                                    <span className="text-[10px] text-blue-400 font-black italic tracking-tighter">84t/s</span>
                                </div>
                            </div>
                            <button className="p-2 hover:bg-white/5 rounded-xl transition-colors">
                                <MoreVertical className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>
                    </div>

                    {/* Messages Container */}
                    <div 
                        ref={scrollRef}
                        className="flex-1 overflow-y-auto p-8 custom-scrollbar space-y-10"
                    >
                        {messages.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center px-4">
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="relative mb-12"
                                >
                                    <div className="absolute inset-0 bg-blue-500/20 blur-[60px] rounded-full animate-pulse"></div>
                                    <div className="relative w-24 h-24 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-[2rem] flex items-center justify-center shadow-2xl">
                                        <Bot className="w-12 h-12 text-white" />
                                    </div>
                                    <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-black border border-white/10 rounded-2xl flex items-center justify-center shadow-2xl">
                                        <Network className="w-6 h-6 text-blue-400" />
                                    </div>
                                </motion.div>
                                <h3 className="text-3xl font-black text-white mb-4 tracking-tighter uppercase italic">INITIALIZE_CONSCIOUSNESS</h3>
                                <p className="text-gray-500 text-sm max-w-sm font-medium leading-relaxed uppercase tracking-widest italic border-t border-white/5 pt-4">
                                    Establishing neural link with Veda Logic Core. State your query for logical synthesis.
                                </p>
                            </div>
                        ) : (
                            messages.map((msg) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    key={msg.id}
                                    className={`flex gap-6 ${msg.role === 'assistant' ? '' : 'flex-row-reverse'}`}
                                >
                                    <div className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center border ${msg.role === 'assistant' ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' : 'bg-white/5 border-white/10 text-white'}`}>
                                        {msg.role === 'assistant' ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
                                    </div>
                                    <div className={`max-w-[80%] space-y-2 ${msg.role === 'user' ? 'text-right' : ''}`}>
                                        <div className={`inline-block p-6 rounded-[2rem] ${msg.role === 'assistant' ? 'bg-white/5 border border-white/10 text-gray-200' : 'bg-white text-black font-medium'} shadow-xl`}>
                                            <p className="text-[13px] leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                                        </div>
                                        <div className="text-[9px] text-gray-600 font-bold uppercase tracking-widest italic px-2">
                                            {msg.role === 'assistant' ? 'VEDA_ENGINE_SYNCED' : 'LOCAL_NODE_EMISSION'} • {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        )}
                        {isLoading && (
                            <div className="flex gap-6">
                                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                </div>
                                <div className="p-6 rounded-[2rem] bg-white/5 border border-white/10 shadow-xl min-w-[120px]">
                                    <NeuralTyping />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input HUD */}
                    <div className="p-8 relative">
                        <div className="max-w-4xl mx-auto relative group">
                            {/* Glow Effect */}
                            <div className="absolute inset-0 bg-blue-500/5 blur-[40px] group-focus-within:bg-blue-500/10 transition-all duration-700"></div>
                            
                            <div className="relative bg-[#0c0c0c] border border-white/10 rounded-[2.5rem] p-3 pl-8 flex items-center gap-4 focus-within:border-blue-500/50 focus-within:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all duration-500">
                                <input 
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="SYNTHESIZE_QUERY..."
                                    className="flex-1 bg-transparent border-none outline-none text-white text-sm placeholder:text-gray-700 font-medium tracking-wider italic"
                                />
                                <div className="flex items-center gap-2">
                                    <button className="p-3 text-gray-600 hover:text-white transition-colors">
                                        <Sparkles className="w-5 h-5" />
                                    </button>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleSend}
                                        disabled={!input.trim() || isLoading}
                                        className="h-14 px-10 bg-white text-black rounded-[2rem] flex items-center gap-3 font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl hover:bg-gray-100 disabled:opacity-30 italic"
                                    >
                                        COMMENCE
                                        <Send className="w-4 h-4" />
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                        <div className="text-center mt-6">
                            <p className="text-[9px] text-gray-700 font-black uppercase tracking-[0.5em] italic">VEDA_Neural_Encryption_Enabled • Node_ID: 0x8188</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
