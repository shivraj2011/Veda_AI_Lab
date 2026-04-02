'use client';

import { motion } from 'framer-motion';
import { TopBar } from '@/components/layout/TopBar';
import { Gift, Zap, Star, History, ArrowRight, CheckCircle2, Play, Gamepad2, Coins } from 'lucide-react';
import { useVedaStore } from '@/lib/store';
import { FadeInBlock } from '@/components/ui/animated/GlowButton';
import { useState } from 'react';

const plans = [
    {
        name: 'Veda Free',
        price: 'Free',
        credits: '50 Credits/Day',
        features: ['Standard Image Gen', 'Basic Neural Chat', '720p Video (1/day)', 'Public Node Access'],
        accent: 'blue',
        button: 'Current Plan'
    },
    {
        name: 'Veda Pro',
        price: '₹250',
        credits: '500 Credits/mo',
        features: ['Priority Multi-Modal Nodes', 'NSFW Filters Unlocked', '4K Cinematic Video', '24% Extra Reward Yield from Ads', 'Unlimited High-Logic Chat'],
        accent: 'purple',
        button: 'Upgrade Now',
        popular: true
    }
];

export default function RewardsPage() {
    const [activeTab, setActiveTab] = useState<'plans' | 'earn'>('plans');
    const [isAdActive, setIsAdActive] = useState(false);
    const addCredits = useVedaStore((state) => state.addCredits);

    return (
        <main className="flex-1 flex flex-col relative overflow-hidden">
            <TopBar title="Subscriptions & Rewards" />

            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/5 blur-[120px] rounded-full"></div>

            <div className="flex-1 overflow-y-auto p-4 md:p-12 custom-scrollbar relative z-10">
                {/* REWARDS HERO */}
                <FadeInBlock delay={0}>
                    <div className="bg-[#020202] border border-white/10 rounded-[3rem] p-8 md:p-16 mb-12 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden group hover:neon-border-glow transition-all duration-700">
                        <div className="relative z-10 max-w-2xl">
                            <div className="flex items-center gap-3 mb-6 text-[#00f2ff] font-mono text-[10px] font-black tracking-[0.5em] uppercase">
                                <Star className="w-5 h-5 drop-shadow-[0_0_8px_#00f2ff]" /> VEDA_SUBSCRIPTIONS_v3_
                            </div>
                            <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tighter leading-none uppercase italic">
                                FUEL YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f2ff] to-[#a855f7] drop-shadow-[0_0_15px_rgba(0,242,255,0.3)]">CREATION.</span>
                            </h1>
                            <p className="text-xl text-gray-500 mb-10 font-medium italic">
                                Elevate your neural experience with priority nodes, high-fidelity renders, and Veda Access.
                            </p>
                            
                            <div className="flex bg-white/5 p-1.5 rounded-2xl w-fit border border-white/10 mb-8">
                                <button 
                                    onClick={() => setActiveTab('plans')}
                                    className={cn("px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all italic", activeTab === 'plans' ? "bg-white text-black shadow-xl" : "text-gray-500 hover:text-white")}
                                >
                                    STATUS_&_PLANS
                                </button>
                                <button 
                                    onClick={() => setActiveTab('earn')}
                                    className={cn("px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all italic", activeTab === 'earn' ? "bg-white text-black shadow-xl" : "text-gray-500 hover:text-white")}
                                >
                                    EARN_REWARDS
                                </button>
                            </div>
                        </div>

                        {/* Visual Icon */}
                        <div className="relative w-72 h-72 flex items-center justify-center">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 border border-dashed border-[#00f2ff]/20 rounded-full"
                            ></motion.div>
                            <div className="w-48 h-48 bg-white/5 border border-white/10 rounded-full flex items-center justify-center backdrop-blur-3xl">
                                <Coins className="w-20 h-20 text-[#00f2ff] drop-shadow-[0_0_15px_rgba(0,242,255,0.5)]" />
                            </div>
                        </div>
                    </div>
                </FadeInBlock>

                {activeTab === 'plans' ? (
                    <FadeInBlock delay={0.1}>
                        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto mb-20">
                            {plans.map((plan, idx) => (
                                <div key={plan.name} className={cn(
                                    "relative rounded-[2.5rem] p-8 md:p-12 border h-full flex flex-col transition-all duration-700 hover:-translate-y-4 shadow-2xl overflow-hidden group",
                                    plan.popular ? "bg-[#0c0c0c] border-[#a855f7]/50 shadow-[0_0_60px_rgba(168,85,247,0.1)] md:scale-105" : "bg-[#020202] border-white/5 hover:neon-border-glow"
                                )}>
                                    <div className="mb-10 relative z-10">
                                        <h3 className="text-3xl font-black mb-2 uppercase italic tracking-tight group-hover:text-[#00f2ff] transition-colors">{plan.name}</h3>
                                        <div className="flex items-baseline gap-2 mb-6">
                                            <span className="text-5xl font-black tracking-tighter italic">{plan.price}</span>
                                            {plan.price !== 'Free' && <span className="text-gray-600 font-black text-xs uppercase tracking-widest">/MO</span>}
                                        </div>
                                        <div className="flex items-center gap-3 px-4 py-2 bg-white/[0.03] rounded-xl border border-white/10 w-fit">
                                            <Zap className="w-4 h-4 text-[#fcd34d] drop-shadow-[0_0_8px_#fcd34d]" />
                                            <span className="text-[10px] font-black uppercase text-gray-500 tracking-widest">{plan.credits} REFILL RATE</span>
                                        </div>
                                    </div>

                                    <ul className="space-y-5 mb-12 flex-1 text-sm text-gray-400 relative z-10 font-medium italic">
                                        {plan.features.map(f => (
                                            <li key={f} className="flex items-start gap-4">
                                                <CheckCircle2 className="w-5 h-5 text-[#00f2ff] shrink-0 mt-0.5" />
                                                <span className="group-hover:text-gray-200 transition-colors uppercase tracking-tight">{f}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <button className={cn(
                                        "w-full py-6 rounded-2xl font-black text-xs uppercase tracking-[0.3em] transition-all duration-500 relative z-10 italic",
                                        plan.popular ? "bg-[#a855f7] hover:bg-[#9333ea] text-white shadow-[0_20px_40px_rgba(168,85,247,0.2)]" : "bg-white/[0.03] hover:bg-white/[0.06] text-white border border-white/10 hover:border-[#00f2ff]/30 shadow-xl"
                                    )}>
                                        {plan.button}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </FadeInBlock>
                ) : (
                    <FadeInBlock delay={0.1}>
                        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto mb-20">
                            {/* WATCH ADS CARD */}
                            <div 
                                onClick={() => setIsAdActive(true)}
                                className="bg-[#020202] border border-white/5 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden group hover:neon-border-glow transition-all cursor-pointer"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[60px] rounded-full"></div>
                                <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center border border-blue-500/20 mb-8 group-hover:scale-110 transition-transform">
                                    <Play className="w-8 h-8 text-blue-400 fill-blue-400/20" />
                                </div>
                                <h3 className="text-2xl md:text-3xl font-black mb-4 uppercase italic">NEURAL_ADS</h3>
                                <p className="text-gray-500 text-sm mb-10 italic">Watch high-fidelity sponsor sequences to refuel your credit cells instantly.</p>
                                <div className="flex items-center justify-between mb-8 pb-8 border-b border-white/5">
                                    <span className="text-gray-600 text-[10px] font-black tracking-widest uppercase">Yield_Per_Sequence</span>
                                    <span className="text-[#00f2ff] font-black italic">+50 Credits</span>
                                </div>
                                <button className="w-full py-6 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all italic">INITIALIZE_STREAM</button>
                            </div>

                {/* AD REWARD MODAL */}
                {isAdActive && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-3xl animate-in fade-in duration-500">
                        <div className="w-full max-w-2xl bg-[#020202] border border-white/10 rounded-[3rem] p-12 relative overflow-hidden shadow-[0_0_100px_rgba(0,242,255,0.1)]">
                            <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 15, ease: "linear" }}
                                    onAnimationComplete={() => {
                                        addCredits(50);
                                        setIsAdActive(false);
                                        alert("NEURAL_RECHARGE_COMPLETE: +50 CREDITS ADDED.");
                                    }}
                                    className="h-full bg-gradient-to-r from-[#00f2ff] to-[#a855f7]"
                                />
                            </div>

                            <div className="flex flex-col items-center text-center space-y-8 py-10">
                                <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center animate-pulse">
                                    <Zap className="w-10 h-10 text-[#00f2ff]" />
                                </div>
                                <h1 className="text-4xl font-black uppercase italic tracking-tighter">Neural_Stream_Active</h1>
                                <p className="text-gray-500 font-medium italic opacity-60">Synchronizing with the neural advertising network. Do not close the conduit.</p>
                                <div className="text-[10px] font-black uppercase tracking-[0.4em] text-[#00f2ff]/40">ESTABLISHING_CONDUIT...</div>
                            </div>
                        </div>
                    </div>
                )}

                            {/* PLAY GAMES CARD */}
                            <div className="bg-[#020202] border border-white/5 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden group hover:neon-border-glow transition-all cursor-pointer">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-[60px] rounded-full"></div>
                                <div className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center border border-amber-500/20 mb-8 group-hover:scale-110 transition-transform">
                                    <Gamepad2 className="w-8 h-8 text-amber-500" />
                                </div>
                                <h3 className="text-2xl md:text-3xl font-black mb-4 uppercase italic">REWARD_GAMES</h3>
                                <p className="text-gray-500 text-sm mb-10 italic">Engage in rapid-response cognitive tests to harvest extra generation power.</p>
                                <div className="flex items-center justify-between mb-8 pb-8 border-b border-white/5">
                                    <span className="text-gray-600 text-[10px] font-black tracking-widest uppercase">Potential_Harvest</span>
                                    <span className="text-amber-500 font-black italic">UP_TO_500 Credits</span>
                                </div>
                                <button className="w-full py-6 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all italic">LAUNCH_MODULE</button>
                            </div>
                        </div>
                    </FadeInBlock>
                )}

                {/* HISTORY TRAY */}
                <FadeInBlock delay={0.5}>
                    <div className="bg-black/40 border border-white/5 rounded-[2rem] p-8 mb-8 flex items-center justify-between group hover:border-white/10 transition-all">
                        <div className="flex items-center gap-6">
                            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-blue-500/10 transition-colors">
                                <History className="w-6 h-6 text-blue-400" />
                            </div>
                            <div>
                                <h4 className="text-lg font-bold italic uppercase tracking-tight">TRANSACTION_HISTORY</h4>
                                <p className="text-gray-500 text-sm italic">View your recent credit harvests and lifecycle events.</p>
                            </div>
                        </div>
                        <button className="text-blue-400 font-bold text-sm flex items-center gap-2 hover:underline italic uppercase tracking-widest">
                            VIEW_STATEMENT <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </FadeInBlock>
            </div>
        </main>
    );
}

function cn(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}
