'use client';

import { motion } from 'framer-motion';
import { HeroBillboard, ToolCard, StatCard } from '@/components/layout/Dashboard';
import { FadeInBlock } from '@/components/ui/animated/GlowButton';
import { TopBar } from '@/components/layout/TopBar';
import Link from 'next/link';

const TOOLS = [
    {
        title: "Veda Chat",
        description: "Engage with unrestricted creative intelligence across the neural frontier.",
        icon: "chat",
        href: "/chat",
        gradient: "from-blue-600 to-cyan-400"
    },
    {
        title: "Veda Art Forge",
        description: "Synthesize high-fidelity cinematic visuals from base latent vectors.",
        icon: "image",
        href: "/image",
        gradient: "from-amber-500 to-orange-400"
    },
    {
        title: "Veda Motion Gen",
        description: "Transform static concepts into fluid cinematic temporal architectures.",
        icon: "video",
        href: "/video",
        gradient: "from-purple-600 to-pink-400"
    },
    {
        title: "Veda 3D Studio",
        description: "Synthesize complex spatial topology and deep-poly mesh architectures.",
        icon: "box",
        href: "/3d",
        gradient: "from-emerald-500 to-teal-400"
    },
    {
        title: "Veda Neural Code",
        description: "Accelerate logic synthesis with deep architectural patterns and security nodes.",
        icon: "code",
        href: "/code",
        gradient: "from-indigo-600 to-blue-400"
    },
    {
        title: "Veda Personas",
        description: "Initialize behavioral archetypes with unique neural signatures and context.",
        icon: "character",
        href: "/character",
        gradient: "from-rose-500 to-red-400"
    },
    {
        title: "Veda Comic Builder",
        description: "Construct sequential narrative structures with illustrative synthesis.",
        icon: "comic",
        href: "/comic",
        gradient: "from-violet-500 to-indigo-400"
    },
    {
        title: "Veda Story Mode",
        description: "Deep narrative orchestration with multi-character logic and world-sync.",
        icon: "story",
        href: "/story",
        gradient: "from-sky-500 to-blue-400"
    }
];

const STATS = [
    { label: "Neural Nodes", value: "8188", icon: "🌐", gradient: "from-blue-400 to-cyan-400" },
    { label: "Visual Forged", value: "2.4M", icon: "🎨", gradient: "from-amber-400 to-orange-400" },
    { label: "Active Synthesis", value: "142K", icon: "🔥", gradient: "from-purple-400 to-pink-400" },
    { label: "Logical Units", value: "9.8B", icon: "🧠", gradient: "from-emerald-400 to-teal-400" }
];

export default function Home() {
    return (
        <main className="flex-1 h-full relative overflow-y-auto overflow-x-hidden custom-scrollbar bg-[#050505]">
            <TopBar title="VEDA AI LAB" />
            {/* Immersive Background */}
            <div className="absolute inset-0 bg-[#020202] z-0"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-500/5 via-transparent to-transparent z-10 pointer-events-none"></div>

            <div className="p-12 md:p-20 relative z-20 space-y-32">
                {/* HERO SECTION */}
                <HeroBillboard />

                {/* STATS HUD */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
                    {STATS.map((stat, idx) => (
                        <StatCard key={idx} {...stat} />
                    ))}
                </div>

                {/* TOOLS GRID */}
                <section>
                    <FadeInBlock delay={0.2}>
                        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
                            <div>
                                <h1 className="text-[10px] font-black uppercase text-amber-500 tracking-[0.6em] mb-4 italic">SYNTHESIS_HUB_v01</h1>
                                <h2 className="text-6xl md:text-8xl font-black text-white leading-none tracking-tighter uppercase italic">VEDA NEURAL<br />ORCHESTRATOR</h2>
                            </div>
                            <p className="max-w-md text-gray-500 font-medium text-lg leading-relaxed italic border-l-2 border-white/10 pl-8">
                                Select a specialized neural module to initialize your creative synthesis sequence. All nodes are unrestricted for maximum freedom.
                            </p>
                        </div>
                    </FadeInBlock>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
                        {TOOLS.map((tool, idx) => (
                            <ToolCard key={idx} {...tool} />
                        ))}
                    </div>
                </section>

                {/* SUBSCRIPTION TEASER */}
                <FadeInBlock delay={0.4}>
                    <div className="relative rounded-[4rem] bg-[#0c0c0c] border border-white/5 p-20 overflow-hidden group hover:neon-border-glow transition-all duration-1000 text-center">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
                        <h3 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter uppercase italic">Unlock Veda Pro</h3>
                        <p className="text-gray-500 text-xl max-w-2xl mx-auto mb-12 italic">Join Veda Subscriptions for multi-modal priority access, NSFW unlocks, and high-performance neural nodes.</p>
                        <Link href="/rewards" className="inline-block px-16 py-6 bg-white text-black font-black rounded-3xl text-sm tracking-[0.4em] uppercase hover:bg-blue-500 hover:text-white transition-all shadow-2xl italic">
                            MANAGE_SUBSCRIPTION
                        </Link>
                    </div>
                </FadeInBlock>
                
                <footer className="text-center pt-20 pb-10 border-t border-white/5">
                    <p className="text-gray-700 font-mono text-[10px] uppercase tracking-[0.5em] italic">© 2026 Veda AI Laboratory • Unrestricted Creation Nodes</p>
                </footer>
            </div>
        </main>
    );
}
