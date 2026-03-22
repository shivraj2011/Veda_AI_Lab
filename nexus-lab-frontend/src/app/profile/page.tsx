'use client';

import { TopBar } from '@/components/layout/TopBar';
import { FadeInBlock } from '@/components/ui/animated/GlowButton';
import { User, Settings, CreditCard, ShieldCheck, Sparkles, MessageSquare, BrainCircuit, Camera, Edit2, Check } from 'lucide-react';
import { useVedaStore } from '@/lib/store';
import { useState, useRef } from 'react';

export default function ProfilePage() {
    const credits = useVedaStore(state => state.credits);
    const nsfwCredits = useVedaStore(state => state.nsfwCredits);

    const [assistantName, setAssistantName] = useState('Veda AI');
    const [assistantPersona, setAssistantPersona] = useState('Creative & Resourceful');

    const userName = useVedaStore(state => state.userName);
    const setUserName = useVedaStore(state => state.setUserName);
    const profileImage = useVedaStore(state => state.profileImage);
    const setProfileImage = useVedaStore(state => state.setProfileImage);

    const [isEditingName, setIsEditingName] = useState(false);
    const [tempName, setTempName] = useState(userName);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSaveName = () => {
        setUserName(tempName);
        setIsEditingName(false);
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <main className="flex-1 flex flex-col overflow-hidden relative z-10 bg-[#050505]">
            <TopBar title="Veda Identity" />
            <div className="flex-1 overflow-y-auto p-12 max-w-6xl mx-auto w-full custom-scrollbar">
                <FadeInBlock delay={0}>
                    <div className="bg-[#020202] border border-white/10 rounded-[3rem] p-12 mb-12 flex flex-col md:flex-row items-center gap-12 shadow-2xl relative overflow-hidden group hover:neon-border-glow transition-all duration-700">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#00f2ff]/5 blur-[100px] rounded-full animate-pulse"></div>

                        {/* PROFILE IMAGE SECTION */}
                        <div
                            className="relative cursor-pointer scale-110"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageUpload}
                                className="hidden"
                                accept="image/*"
                            />
                            <div className="relative w-24 h-24 rounded-full border border-white/20 bg-[#050505] flex items-center justify-center overflow-hidden shadow-[0_0_20px_rgba(0,242,255,0.1)] transition-all group-hover:neon-border-glow">
                                {profileImage ? (
                                    <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-5xl text-white font-black italic">{userName.charAt(0).toUpperCase()}</span>
                                )}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                    <Camera className="w-10 h-10 text-[#00f2ff]" />
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 text-center md:text-left">
                            <div className="flex flex-col md:flex-row items-center gap-6 mb-3">
                                {isEditingName ? (
                                    <div className="flex items-center gap-4">
                                        <input
                                            type="text"
                                            value={tempName}
                                            onChange={(e) => setTempName(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
                                            className="bg-white/[0.02] border border-[#00f2ff]/30 rounded-xl px-6 py-2 text-4xl font-black text-white outline-none focus:neon-border-glow transition-all w-80 uppercase tracking-tighter italic"
                                            autoFocus
                                        />
                                        <button onClick={handleSaveName} className="p-3 bg-[#00f2ff]/10 border border-[#00f2ff]/30 rounded-xl hover:bg-[#00f2ff]/20 transition-all shadow-[0_0_15px_rgba(0,242,255,0.1)]">
                                            <Check className="w-6 h-6 text-[#00f2ff]" />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-6">
                                        <h1 className="text-5xl font-black text-white tracking-widest uppercase italic leading-none">VEDA AI LAB</h1>
                                        <button
                                            onClick={() => {
                                                setTempName(userName);
                                                setIsEditingName(true);
                                            }}
                                            className="p-2.5 rounded-xl bg-white/[0.02] border border-white/10 opacity-30 group-hover:opacity-100 transition-opacity hover:neon-border-glow"
                                            title="Edit Name"
                                        >
                                            <Edit2 className="w-5 h-5 text-[#00f2ff]" />
                                        </button>
                                    </div>
                                )}
                            </div>
                            <p className="text-gray-600 font-black text-[10px] tracking-[0.4em] uppercase">NEURAL_ID: {userName.toUpperCase()}_v.01 // ACCESS_LEVEL: ALPHA</p>
                            <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-8">
                                <div className="px-6 py-3 bg-[#050505] border border-white/10 rounded-2xl flex items-center gap-4 transition-all hover:neon-border-glow group/stat">
                                    <img src="/branding/shiva_coin_final_v3.png" alt="Credits" className="w-6 h-6 object-contain" />
                                    <span className="text-xs font-black text-white uppercase tracking-widest">{credits} Credits</span>
                                </div>
                                <div className="px-6 py-3 bg-[#050505] border border-white/10 rounded-2xl flex items-center gap-4 transition-all hover:neon-border-glow group/stat">
                                    <img src="/branding/apsara_red_coin_v7_final.png" alt="Apsara Coin" className="w-6 h-6 object-contain mix-blend-screen" />
                                    <span className="text-xs font-black text-white uppercase tracking-widest">{nsfwCredits} NSFW_Credits</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </FadeInBlock>

                {/* ASSISTANT PERSONALIZATION */}
                <FadeInBlock delay={0.1}>
                    <div className="bg-black/40 border border-white/10 rounded-[2rem] p-8 mb-8">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                                <BrainCircuit className="w-6 h-6 text-emerald-400" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">Assistant Personalization</h2>
                                <p className="text-sm text-gray-400">Define how the Nexus AI interacts with you.</p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 block">AI Agent Alias</label>
                                    <input
                                        type="text"
                                        value={assistantName}
                                        onChange={(e) => setAssistantName(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-emerald-500/50 outline-none transition-all font-bold"
                                        placeholder="Enter assistant name..."
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 block">Cognitive Personality</label>
                                    <div className="relative group/select">
                                        <select
                                            value={assistantPersona}
                                            onChange={(e) => setAssistantPersona(e.target.value)}
                                            className="w-full bg-[#0c0c0c] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-emerald-500/50 outline-none transition-all font-bold appearance-none cursor-pointer"
                                        >
                                            <option value="Creative & Resourceful" className="bg-[#0c0c0c] text-white">Creative & Resourceful</option>
                                            <option value="Strictly Technical" className="bg-[#0c0c0c] text-white">Strictly Technical</option>
                                            <option value="Sardonic & Witty" className="bg-[#0c0c0c] text-white">Sardonic & Witty</option>
                                            <option value="Empathetic Listener" className="bg-[#0c0c0c] text-white">Empathetic Listener</option>
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 group-hover/select:text-emerald-400 transition-colors">
                                            <Settings className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 block">Directives & Constraints</label>
                                    <textarea
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-emerald-500/50 outline-none transition-all font-medium h-[120px] resize-none"
                                        placeholder="Give your assistant specific rules (e.g. Always respond in Markdown, No apologies...)"
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        <button className="mt-8 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-emerald-500/20 active:scale-95 flex items-center gap-2">
                            Apply Neural Patterns <Sparkles className="w-4 h-4" />
                        </button>
                    </div>
                </FadeInBlock>

                <div className="grid md:grid-cols-2 gap-6 mb-12">
                    <FadeInBlock delay={0.2}>
                        <div className="bg-black/40 border border-white/10 rounded-[2rem] p-6 hover:border-blue-500/30 transition-all cursor-pointer group">
                            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform border border-blue-500/20">
                                <Settings className="text-blue-400 w-6 h-6" />
                            </div>
                            <h3 className="text-white font-bold text-lg mb-1">Account Engineering</h3>
                            <p className="text-gray-400 text-sm">Manage your security, API keys, and privacy protocols.</p>
                        </div>
                    </FadeInBlock>
                    <FadeInBlock delay={0.3}>
                        <div className="bg-black/40 border border-white/10 rounded-[2rem] p-6 hover:border-purple-500/30 transition-all cursor-pointer group">
                            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform border border-purple-500/20">
                                <CreditCard className="text-purple-400 w-6 h-6" />
                            </div>
                            <h3 className="text-white font-bold text-lg mb-1">Neural Credits & Billing</h3>
                            <p className="text-gray-400 text-sm">Update generation tiers and manage your billing lifecycle.</p>
                        </div>
                    </FadeInBlock>
                </div>
            </div>
        </main>
    );
}
