'use client';

import { Search, Bell, History, User, Settings, LogOut, ChevronDown, Zap, Coins, Menu } from 'lucide-react';
import { useVedaStore, useUIStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';

interface TopBarProps {
    title?: string;
    onHistoryToggle?: () => void;
}

export function TopBar({ title = "Dashboard", onHistoryToggle }: TopBarProps) {
    const credits = useVedaStore((state) => state.credits);
    const nsfwCredits = useVedaStore((state) => state.nsfwCredits);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const { isMobileMenuOpen, setMobileMenuOpen } = useUIStore();

    return (
        <header className="bg-[#050505]/80 backdrop-blur-3xl border-b border-white/10 px-4 md:px-6 py-4 flex items-center justify-between gap-2 md:gap-4 flex-shrink-0 relative z-40">
            <div className="flex items-center gap-2 md:gap-4">
                <button 
                    onClick={() => setMobileMenuOpen(true)}
                    className="md:hidden p-2 hover:bg-white/5 rounded-xl text-white mr-1"
                >
                    <Menu className="w-5 h-5" />
                </button>
                <h1 className="text-lg md:text-xl font-black text-white tracking-widest uppercase italic bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent truncate hidden sm:block">
                    {title === "Dashboard" ? "VEDA AI LAB" : title}
                </h1>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2 md:gap-6">
                <div className="hidden lg:block w-64 xl:w-96 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                        className="w-full pl-10 bg-black/40 border border-white/10 text-white placeholder-gray-600 rounded-xl h-10 focus:outline-none focus:border-amber-500/30 focus:bg-black/60 transition-all text-sm font-medium"
                        placeholder="Neural exploration..."
                    />
                </div>

                {/* Cultural Credit System Display */}
                <div className="flex items-center gap-4 glass-holographic border-white/10 rounded-xl px-5 py-2 cursor-pointer hover:bg-white/5 transition-all group">
                    {/* Normal Credits: Shiva/Ratha Theme */}
                    <div 
                        className="flex items-center gap-2" 
                        title="Veda Pro Credits"
                    >
                        <motion.div 
                            whileHover={{ scale: 1.1, rotateY: 180 }}
                            transition={{ type: "spring", stiffness: 200, damping: 10 }}
                            style={{ transformStyle: 'preserve-3d' }}
                            className="relative w-7 h-7 flex items-center justify-center isolate"
                        >
                            <img 
                                src="/branding/shiva_coin_final_v3.png" 
                                alt="Shiva Icon" 
                                className="w-full h-full object-contain" 
                            />
                        </motion.div>
                        <span className="text-xs font-black text-white tracking-tighter">{credits}</span>
                    </div>

                    <div className="w-px h-4 bg-white/10"></div>

                    {/* NSFW Credits: Apsara/Peacock Theme */}
                    <div className="flex items-center gap-2" title="Apsara Credits">
                         <motion.div 
                            whileHover={{ scale: 1.1, rotateY: 180 }}
                            transition={{ type: "spring", stiffness: 200, damping: 10 }}
                            style={{ transformStyle: 'preserve-3d' }}
                            className="relative w-7 h-7 flex items-center justify-center isolate"
                        >
                            <img 
                                src="/branding/apsara_red_coin_v7_final.png" 
                                alt="Apsara Icon" 
                                className="w-full h-full object-contain mix-blend-screen" 
                            />
                        </motion.div>
                        <span className="text-xs font-black text-white tracking-tighter">{nsfwCredits}</span>
                    </div>
                </div>

                {/* Global Actions */}
                <div className="flex items-center gap-2">
                    {onHistoryToggle && (
                        <button
                            onClick={onHistoryToggle}
                            className="p-2.5 hover:bg-white/5 rounded-xl text-gray-400 hover:text-amber-500 transition-all"
                            title="Session History"
                        >
                            <History className="w-5 h-5" />
                        </button>
                    )}
                    <button className="p-2.5 hover:bg-white/5 rounded-xl text-gray-400 hover:text-white transition-all">
                        <Bell className="w-5 h-5" />
                    </button>
                    
                    {/* User Profile Dropdown */}
                    <div className="relative">
                        <div 
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#050505] to-[#111] flex items-center justify-center text-white font-black text-sm border border-white/20 shadow-[0_0_15px_rgba(251,191,36,0.2)] ml-2 hover:border-amber-500/50 transition-all cursor-pointer group"
                        >
                            V
                        </div>
                        
                        <AnimatePresence>
                            {isProfileOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    className="absolute right-0 mt-4 w-64 glass-holographic rounded-2xl border-white/10 shadow-2xl p-4 flex flex-col gap-2 z-50"
                                >
                                    <div className="px-3 py-2 border-b border-white/5 mb-2">
                                        <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Active_Operator</p>
                                        <p className="text-sm font-black text-white uppercase italic">Veda_Dev_Master</p>
                                    </div>
                                    
                                    <Link href="/profile" className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-all text-xs font-bold uppercase tracking-wider">
                                        <User className="w-4 h-4" /> Identity
                                    </Link>
                                    <button className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-all text-xs font-bold uppercase tracking-wider text-left">
                                        <Settings className="w-4 h-4" /> Personalization
                                    </button>
                                    <div className="h-px bg-white/5 my-1"></div>
                                    <button className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-all text-xs font-bold uppercase tracking-wider text-left">
                                        <LogOut className="w-4 h-4" /> Deinitialize Session
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </header>
    );
}
