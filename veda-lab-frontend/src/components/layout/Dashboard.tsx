import { 
    MessageSquare, 
    Image as ImageIcon, 
    Film, 
    BookOpen, 
    Code, 
    Layers, 
    Box,
    LucideIcon,
    Zap
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { NebulaCanvas } from '@/components/ui/animated/NebulaCanvas';

const ICON_MAP: Record<string, LucideIcon> = {
    chat: MessageSquare,
    image: ImageIcon,
    video: Film,
    comic: Layers,
    box: Box,
    story: BookOpen,
    code: Code,
    layers: Layers,
    character: MessageSquare
};

interface StatProps {
    label: string;
    value: string;
    icon: LucideIcon;
    gradient: string;
}

export function StatCard({ label, value, icon: Icon, gradient }: StatProps) {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-black/60 backdrop-blur-2xl border border-white/5 rounded-2xl p-4 md:p-5 text-center transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)] group h-full flex flex-col items-center justify-center"
        >
            <div className="mb-3 group-hover:scale-110 transition-transform duration-300">
                <Icon className={cn("w-8 h-8 md:w-10 md:h-10 text-white", gradient.replace('from-', 'text-').split(' ')[0])} />
            </div>
            <div className={cn("text-2xl md:text-3xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r", gradient)}>
                {value}
            </div>
            <div className="text-[9px] md:text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] mt-2 leading-none">{label}</div>
        </motion.div>
    );
}

export function HeroBillboard() {
    return (
        <section className="relative group perspective-2000 overflow-hidden rounded-3xl md:rounded-[3rem] mx-4 md:mx-0">
            <div className="relative overflow-hidden rounded-3xl md:rounded-[3rem] bg-[#050505] border border-white/10 p-6 md:p-12 lg:p-24 transition-all duration-1000 shadow-[0_0_150px_rgba(251,191,36,0.1)] flex flex-col items-center justify-center min-h-[400px] md:min-h-[600px]">
                
                {/* Immersive Background Layer */}
                <div className="absolute inset-0 z-0">
                    <NebulaCanvas />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/80"></div>
                    <div className="absolute inset-0 cyber-grid opacity-10"></div>
                </div>

                <div className="relative z-10 flex flex-col items-center w-full">
                    {/* The "Veda Core" - Animated Brand Hub */}
                    <div className="mb-10 md:mb-16 relative flex justify-center items-center scale-75 md:scale-125">
                        {/* Animated Logo Spheres / Rings */}
                        {[1, 2, 3].map((i) => (
                            <motion.div 
                                key={i}
                                animate={{ 
                                    rotate: i % 2 === 0 ? 360 : -360,
                                    scale: [1, 1.02, 1],
                                    opacity: [0.2, 0.4, 0.2]
                                }}
                                transition={{ 
                                    duration: 15 + i * 5, 
                                    repeat: Infinity, 
                                    ease: "linear" 
                                }}
                                className={cn(
                                    "absolute border-[1px] rounded-full",
                                    i === 1 ? "w-72 h-72 border-amber-500/30 border-t-transparent" : "",
                                    i === 2 ? "w-64 h-64 border-amber-400/20 border-b-transparent" : "",
                                    i === 3 ? "w-80 h-80 border-amber-300/10 border-l-transparent" : ""
                                )}
                            ></motion.div>
                        ))}
                        
                        {/* Rotating Outer Spheres */}
                        <motion.div
                             animate={{ rotate: 360 }}
                             transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                             className="absolute w-[300px] h-[300px]"
                        >
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-amber-500 rounded-full shadow-[0_0_15px_#fbbf24]"></div>
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-amber-400 rounded-full shadow-[0_0_10px_#fbbf24]"></div>
                        </motion.div>

                        <motion.div
                             animate={{ rotate: -360 }}
                             transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                             className="absolute w-[380px] h-[380px]"
                        >
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-amber-600 rounded-full shadow-[0_0_10px_#fbbf24]"></div>
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-amber-400 rounded-full shadow-[0_0_15px_#fbbf24]"></div>
                        </motion.div>
                        
                        {/* Core Glow */}
                        <div className="absolute w-40 h-40 bg-amber-500/10 rounded-full blur-[100px] animate-pulse"></div>

                        {/* Central Module - Veda Logo */}
                        <motion.div 
                            whileHover={{ scale: 1.1, rotateY: 10 }}
                            style={{ transformStyle: 'preserve-3d' }}
                            className="relative z-10 w-40 h-40 bg-gradient-to-br from-[#050505] to-[#111] rounded-[2.5rem] flex items-center justify-center shadow-[0_0_80px_rgba(251,191,36,0.3)] border border-white/20 group-hover:border-amber-500/30 transition-all duration-700 overflow-hidden isolate"
                        >
                            <img 
                                src="/branding/veda_logo_final_v3.png" 
                                alt="Veda Core Logo" 
                                className="w-[85%] h-[85%] object-contain drop-shadow-[0_0_20px_rgba(251,191,36,0.6)] mix-blend-screen" 
                            />
                            
                            {/* Technical Data Overlays (Holographic) */}
                            <div className="absolute -top-4 -right-12 text-[8px] font-mono text-amber-500/60 uppercase tracking-widest whitespace-nowrap hidden md:block">
                                core_v2.0_veda
                            </div>
                            <div className="absolute -bottom-8 -left-12 text-[8px] font-mono text-amber-500/60 uppercase tracking-widest whitespace-nowrap hidden md:block">
                                neural_throughput: 12.4TB/s
                            </div>
                        </motion.div>
                    </div>

                    {/* Premium Typography */}
                    <div className="text-center w-full max-w-5xl mx-auto mb-14">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            className="relative inline-block"
                        >
                            <h1 className="text-5xl md:text-7xl lg:text-[10rem] font-black mb-6 leading-[0.8] tracking-[-0.07em] uppercase">
                                <span className="text-white block">VEDA AI</span>
                                <span className="bg-gradient-to-r from-amber-200 via-amber-500 to-amber-200 bg-clip-text text-transparent block drop-shadow-[0_0_30px_rgba(251,191,36,0.3)] mt-2">LABORATORY</span>
                            </h1>
                            
                            {/* Floating decorative elements */}
                            <div className="absolute -top-10 -right-20 w-40 h-[1px] bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-20 rotate-45"></div>
                            <div className="absolute -bottom-10 -left-20 w-40 h-[1px] bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-20 -rotate-45"></div>
                        </motion.div>
                        
                        <motion.p 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 1 }}
                            className="text-xl md:text-2xl text-gray-500 font-light tracking-wide max-w-3xl mx-auto italic"
                        >
                            The Veda Frontier of <span className="text-white font-medium">Creative Machine Intelligence</span>
                        </motion.p>
                    </div>

                    {/* Technical Status Bar */}
                    <div className="glass-holographic rounded-full px-6 md:px-10 py-3 md:py-4 flex flex-wrap justify-center gap-4 md:gap-10 text-[8px] md:text-[10px] font-bold uppercase tracking-[0.2em] mb-12 md:mb-20 border-white/5 shadow-2xl">
                        <div className="flex items-center gap-2 md:gap-3">
                            <div className="h-1.5 w-1.5 rounded-full bg-[#10b981] shadow-[0_0_10px_#10b981]"></div>
                            <span className="text-[#10b981]/80">CORE: OPTIMIZED</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="h-1.5 w-1.5 rounded-full bg-[#00f2ff] shadow-[0_0_10px_#00f2ff]"></div>
                            <span className="text-[#00f2ff]/80">SYNTHESIS: ACTIVE</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="h-1.5 w-1.5 rounded-full bg-amber-500 shadow-[0_0_10px_#fbbf24]"></div>
                            <span className="text-amber-500/80">LATENCY: NULL</span>
                        </div>
                    </div>

                    {/* Architect Credits */}
                    <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="p-[1px] bg-gradient-to-r from-white/10 to-transparent rounded-2xl"
                    >
                        <div className="bg-black/80 backdrop-blur-3xl rounded-2xl px-10 py-6 flex items-center gap-6 border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                            <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center font-black text-black shadow-[0_0_20px_rgba(251,191,36,0.4)]">V</div>
                            <div className="text-left">
                                <p className="text-[9px] text-gray-500 font-bold uppercase tracking-[0.3em] mb-1">Empowered by</p>
                                <h4 className="text-xl font-black text-white tracking-tight uppercase">Veda Collective Elite</h4>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

interface ToolCardProps {
    title: string;
    description: string;
    icon: string;
    href: string;
    gradient: string;
}

export function ToolCard({ title, description, icon, href, gradient }: ToolCardProps) {
    const Icon = ICON_MAP[icon] || BookOpen;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -12, scale: 1.03 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="group relative"
        >
            <Link href={href} className="relative block h-full overflow-hidden glass-holographic rounded-[2.5rem] p-8 pb-10 text-left transition-all duration-700 hover:neon-border-glow hover:shadow-[0_30px_100px_rgba(0,0,0,0.8)]">
                {/* Internal Glow Field */}
                <div className={cn("absolute -inset-10 opacity-0 group-hover:opacity-10 blur-[80px] transition-opacity duration-1000 bg-gradient-to-br", gradient)}></div>
                
                <div className="relative z-10">
                    <div className={cn("w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl bg-gradient-to-br p-4 mb-6 md:mb-8 group-hover:scale-110 group-hover:rotate-12 transition-all duration-700 shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex items-center justify-center", gradient)}>
                        <Icon className="w-full h-full text-white drop-shadow-lg" />
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-black text-white mb-3 md:mb-4 tracking-tighter group-hover:text-[#00f2ff] transition-colors duration-500 uppercase">{title}</h3>
                    <p className="text-sm text-gray-500 font-medium leading-relaxed group-hover:text-gray-300 transition-colors duration-500 line-clamp-3 mb-8">{description}</p>
                    
                    <div className="flex items-center text-[9px] font-black uppercase tracking-[0.3em] text-[#00f2ff] opacity-40 group-hover:opacity-100 group-hover:translate-x-3 transition-all duration-500">
                        INITIALIZE MODULE <span className="ml-2">→</span>
                    </div>
                </div>

                {/* Decorative Tech Lines */}
                <div className="absolute bottom-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                    <div className="w-12 h-12 border-r border-b border-white"></div>
                </div>
            </Link>
        </motion.div>
    );
}
