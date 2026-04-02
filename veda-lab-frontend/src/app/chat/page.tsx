'use client';

import { TopBar } from '@/components/layout/TopBar';
import { ChatMessage } from '@/components/ui/chat/ChatMessage';
import { ChatInput } from '@/components/ui/chat/ChatInput';
import { NeuralTyping } from '@/components/ui/chat/NeuralTyping';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useVedaStore } from '@/lib/store';
import { MessageSquare, Bot, Cpu, Zap } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export default function ChatView() {
    const [messages, setMessages] = useState<any[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [chatId, setChatId] = useState<string | null>(null);
    const [status, setStatus] = useState({ online: false, node: '3001' });
    const [selectedModel, setSelectedModel] = useState<'dolphin' | 'mythomax'>('dolphin');
    const scrollRef = useRef<HTMLDivElement>(null);
    const useCredits = useVedaStore((state) => state.useCredits);

    // Initial Chat Setup
    useEffect(() => {
        const checkHealth = async () => {
            try {
                const hRes = await fetch('/api/health');
                const hData = await hRes.json();
                if (hData.status === 'online') {
                    setStatus({ online: true, node: String(hData.node) });
                }
            } catch (e) {
                setStatus({ online: false, node: 'OFFLINE' });
            }
        };
        checkHealth();

        const initChat = async () => {
            try {
                // Create a new chat session on the backend
                const res = await fetch('/api/chats', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        title: 'New Veda Session',
                        model_id: 'dolphin-llama3:latest',
                        messages: []
                    })
                });
                const data = await res.json();
                if (data.id) {
                    setChatId(data.id);
                    setMessages([{ 
                        role: 'assistant', 
                        content: 'VEDA_LOK NEURAL_CORE Online. Protocol: veda. Standing by for multi-modal directives.', 
                        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
                    }]);
                }
            } catch (err) {
                console.error("Failed to init chat:", err);
            }
        };
        initChat();
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = async (text: string) => {
        if (!chatId || !text.trim()) return;

        // 0. Deduct Credits
        const success = useCredits(1);
        if (!success) {
            alert("INSUFFICIENT NEURAL CREDITS. HARVEST MORE IN REWARDS SECTOR.");
            return;
        }

        const userMsg = { role: 'user', content: text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
        setMessages(prev => [...prev, userMsg]);
        setIsTyping(true);

        try {
            const response = await fetch('/api/chats/message', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chatId: chatId,
                    content: text,
                    model: selectedModel
                })
            });

            if (!response.body) throw new Error('No response body');

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let assistantMessage = "";
            
            // Add initial empty AI message
            setMessages(prev => [...prev, { 
                role: 'assistant', 
                content: '', 
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
            }]);

            while (true) {
                const { value, done } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value);
                const lines = chunk.split('\n');
                
                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        const dataStr = line.replace('data: ', '').trim();
                        if (dataStr === '[DONE]') {
                            setIsTyping(false);
                            break;
                        }
                        try {
                            const data = JSON.parse(dataStr);
                            if (data.error) {
                                console.error("Stream payload error:", data.error);
                                setMessages(prev => {
                                    const newMsgs = [...prev];
                                    newMsgs[newMsgs.length - 1].content = `⚠️ NEURAL LINK FAILED: ${data.error}`;
                                    return newMsgs;
                                });
                                setIsTyping(false);
                                return; // Stop processing stream
                            }
                            if (data.token) {
                                assistantMessage += data.token;
                                setMessages(prev => {
                                    const newMsgs = [...prev];
                                    newMsgs[newMsgs.length - 1].content = assistantMessage;
                                    return newMsgs;
                                });
                            }
                        } catch (e) {
                            // ignore fragment parsing error
                        }
                    }
                }
            }
        } catch (error) {
            console.error("Stream error:", error);
            setIsTyping(false);
        }
    };

    return (
        <main className="flex-1 flex flex-col relative overflow-hidden h-screen">
            <TopBar title="Veda Chat" />

            <div className="flex-1 flex flex-col relative overflow-hidden">
                {/* Studio Header Area */}
                <div className="p-8 px-12 border-b border-white/10 bg-black/40 backdrop-blur-3xl flex items-center justify-between z-20">
                    <div className="flex items-center gap-8">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#050505] to-[#111] border border-white/20 flex items-center justify-center shadow-2xl relative overflow-hidden group hover:neon-border-glow transition-all duration-700">
                            <motion.div
                                className="absolute inset-0 bg-[#00f2ff]/5"
                                animate={{ opacity: [0, 0.2, 0] }}
                                transition={{ duration: 3, repeat: Infinity }}
                            />
                            <MessageSquare className="w-8 h-8 text-[#00f2ff] relative z-10 drop-shadow-[0_0_8px_#00f2ff]" />
                        </div>
                        <div>
                            <div className="flex items-center gap-4">
                                <select 
                                    className="bg-transparent text-3xl font-black text-white hover:text-[#00f2ff] cursor-pointer outline-none border-b border-transparent hover:border-[#00f2ff]/30 pb-1 uppercase tracking-tighter transition-all"
                                    value={selectedModel}
                                    onChange={(e) => setSelectedModel(e.target.value as any)}
                                >
                                    <option value="dolphin" className="bg-[#111] text-white text-lg">DOLPHIN MISTRAL (24B)</option>
                                    <option value="mythomax" className="bg-[#111] text-white text-lg">HERMES 3 (405B)</option>
                                </select>
                                <span className="text-[10px] bg-[#00f2ff]/10 text-[#00f2ff] px-4 py-1.5 rounded-xl border border-[#00f2ff]/20 font-black tracking-widest uppercase">Verified</span>
                            </div>
                            <p className="text-[11px] text-zinc-400 mt-1 uppercase tracking-wider font-semibold">
                                {selectedModel === 'dolphin' ? '// UNCENSORED VENICE CORE' : '// UNRESTRICTED HERMES KNOWLEDGE'}
                            </p>
                            <div className="flex items-center gap-6 mt-2">
                                <p className="text-[10px] text-gray-500 font-mono uppercase tracking-[0.3em] flex items-center gap-2 font-bold">
                                    <span className={cn(
                                        "w-2 h-2 rounded-full shadow-[0_0_8px]",
                                        status.online ? "bg-[#10b981] shadow-[#10b981]" : "bg-red-500 shadow-red-500"
                                    )}></span>
                                    {status.online ? 'CORE_ONLINE' : 'CORE_OFFLINE'} // NODE_{status.node}
                                </p>
                                <div className="w-px h-3 bg-white/10"></div>
                                <p className="text-[10px] text-gray-500 font-mono uppercase tracking-[0.3em] font-bold">LATENCY: {status.online ? '12MS' : 'N/A'}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-12">
                        <div className="flex flex-col items-end">
                            <span className="text-[10px] font-black font-mono text-[#00f2ff]/60 uppercase tracking-[0.3em]">Neural_Pressure</span>
                            <div className="w-40 h-2 bg-white/5 rounded-full overflow-hidden mt-3 p-[2px] border border-white/5">
                                <motion.div 
                                    initial={{ width: "25%" }}
                                    animate={{ width: "15%" }}
                                    className="h-full bg-gradient-to-r from-[#00f2ff] to-[#8b5cf6] rounded-full shadow-[0_0_10px_#00f2ff]"
                                ></motion.div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 glass-holographic px-5 py-3 rounded-2xl border-white/10">
                            <Cpu className="w-5 h-5 text-[#00f2ff]" />
                            <span className="text-sm font-black font-mono text-white tracking-widest">REAL_TIME</span>
                        </div>
                    </div>
                </div>

                {/* Chat History Area */}
                <div
                    ref={scrollRef}
                    className="flex-1 overflow-y-auto p-12 space-y-12 scroll-smooth custom-scrollbar relative"
                >
                    <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
                        <Bot className="w-[600px] h-[600px] text-[#00f2ff]" />
                    </div>

                    <div className="relative z-10 max-w-6xl mx-auto space-y-16 py-8">
                        {messages.map((msg, i) => (
                            <ChatMessage key={i} {...msg} />
                        ))}

                        {isTyping && messages[messages.length-1]?.content === "" && (
                            <div className="max-w-5xl mx-auto w-full">
                                <NeuralTyping />
                            </div>
                        )}
                    </div>
                </div>

                {/* Input Area */}
                <div className="shrink-0 bg-gradient-to-t from-black via-black/80 to-transparent p-12 pt-0">
                    <ChatInput onSend={handleSend} isLoading={isTyping} />
                </div>
            </div>
        </main>
    );
}

