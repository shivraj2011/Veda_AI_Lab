'use client';

import { cn } from '@/lib/utils';
import {
    LayoutDashboard,
    MessageSquare,
    Image as ImageIcon,
    Film,
    BookOpen,
    Mic,
    Users,
    Library,
    History,
    Code,
    Box,
    Layers,
    Gift,
    User,
    Settings
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const navConfig = [
    { id: 'dashboard', title: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { id: 'chat', title: 'Veda Chat', icon: MessageSquare, path: '/chat' },
    { id: 'image', title: 'Veda Art Forge', icon: ImageIcon, path: '/image' },
    { id: 'video', title: 'Veda Motion Gen', icon: Film, path: '/video' },
    { id: '3d', title: 'Veda 3D Studio', icon: Box, path: '/3d' },
    { id: 'comic', title: 'Veda Comic Builder', icon: Layers, path: '/comic' },
    { id: 'story', title: 'Veda Story Mode', icon: BookOpen, path: '/story' },
    { id: 'voice', title: 'Veda Voice Lab', icon: Mic, path: '/voice' },
    { id: 'character', title: 'Veda Personas', icon: Users, path: '/character' },
    { id: 'gallery', title: 'Vault', icon: Library, path: '/gallery' },
    { id: 'history', title: 'Chronicles', icon: History, path: '/history' },
    { id: 'code', title: 'Veda Dev Studio', icon: Code, path: '/code' },
    { id: 'rewards', title: 'Veda Elite', icon: Gift, path: '/rewards' },
    { id: 'profile', title: 'Identity', icon: User, path: '/profile' },
];

export function Sidebar({ activeRoute = 'dashboard' }: { activeRoute?: string }) {
    return (
        <aside className="w-64 flex-shrink-0 bg-[#050505]/95 backdrop-blur-3xl border-r border-white/10 flex flex-col z-50 transition-all duration-300">
            {/* Header */}
            <header className="p-6 flex flex-col gap-2 border-b border-white/10">
                <div className="flex items-center gap-4">
                    <motion.div 
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="w-12 h-12 flex items-center justify-center cursor-pointer relative isolate"
                    >
                        <img 
                            src="/branding/veda_logo_final_v3.png" 
                            alt="Veda Logo" 
                            className="w-12 h-12 aspect-square object-contain mix-blend-screen" 
                        />
                    </motion.div>
                    <div>
                        <h2 className="font-black text-xl text-white tracking-widest leading-none">VEDA AI LAB</h2>
                        <p className="text-[10px] text-amber-500 font-bold uppercase tracking-[0.2em] mt-1">Universal_Synthesis</p>
                    </div>
                </div>
            </header>

            {/* Nav Links */}
            <nav className="flex-1 p-4 overflow-y-auto custom-scrollbar">
                <ul className="space-y-1">
                    {navConfig.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeRoute === item.id;

                        return (
                            <li key={item.id}>
                                <Link
                                    href={item.path}
                                    className={cn(
                                        "w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden",
                                        isActive
                                            ? "bg-amber-500/10 text-white font-black"
                                            : "text-gray-500 hover:text-white hover:bg-white/5"
                                    )}
                                >
                                    <div className={cn(
                                        "w-1 h-6 rounded-full bg-amber-500 absolute left-0 top-1/2 -translate-y-1/2 transition-all duration-300 shadow-[0_0_10px_#fbbf24]",
                                        isActive ? "opacity-100 scale-100" : "opacity-0 scale-50"
                                    )}></div>
                                    <Icon className={cn("w-5 h-5 transition-transform duration-300 group-hover:scale-110", isActive && "text-amber-500")} />
                                    <span className="text-sm tracking-tight">{item.title}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Footer / User */}
            <footer className="p-4 border-t border-white/10 space-y-3">
                <Link href="/profile" className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 w-full text-left cursor-pointer transition-colors group">
                    <div className="relative">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#050505] to-[#111] border border-white/20 flex items-center justify-center text-white font-black overflow-hidden shadow-2xl transition-all group-hover:neon-border-glow">
                            V
                        </div>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="font-black text-white text-xs truncate uppercase tracking-tighter">Veda_Dev</p>
                        <p className="text-[10px] text-gray-600 truncate font-mono">CORE_OPTIMIZED</p>
                    </div>
                </Link>
                <button className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-gray-500 hover:text-white hover:bg-white/5 transition-all text-sm">
                    <Settings className="w-5 h-5" />
                    <span>Settings</span>
                </button>
            </footer>
        </aside>
    );
}
