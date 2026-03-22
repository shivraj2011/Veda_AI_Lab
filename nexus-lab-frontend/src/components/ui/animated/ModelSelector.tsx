'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ChevronDown, Cpu, Sparkles, ShieldAlert, Zap, Info, Check } from 'lucide-react';
import { useVedaStore } from '@/lib/store';

interface Model {
    id: string;
    name: string;
    desc: string;
    icon: any;
    color: string;
    preview: string;
    tags: string[];
}

interface ModelSelectorProps {
    className?: string;
    models?: Model[];
    activeModelId?: string;
    onSelect?: (modelId: string) => void;
}

const defaultModels = [
    {
        id: 'sdxl',
        name: 'Veda-Forge (SDXL)',
        desc: 'Cinematic High Fidelity',
        icon: Zap,
        color: 'blue',
        preview: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=400&auto=format&fit=crop',
        tags: ['Fast', '0.5s']
    },
    {
        id: 'dalle3',
        name: 'DALL-E 3',
        desc: 'SOTA Prompt Adherence',
        icon: Sparkles,
        color: 'purple',
        preview: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=400&auto=format&fit=crop',
        tags: ['Smart', 'Cloud']
    },
    {
        id: 'pony',
        name: 'Pony Diffusion v6',
        desc: 'Uncensored Stylized Art',
        icon: ShieldAlert,
        color: 'red',
        preview: 'https://images.unsplash.com/photo-1578632738981-4320f6618d17?q=80&w=400&auto=format&fit=crop',
        tags: ['Adult', 'Local']
    },
    {
        id: 'mj',
        name: 'Midjourney v6',
        desc: 'Ultra-aesthetic API',
        icon: Cpu,
        color: 'cyan',
        preview: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?q=80&w=400&auto=format&fit=crop',
        tags: ['Pro', 'API']
    },
];

export function ModelSelector({
    className,
    models = defaultModels,
    activeModelId,
    onSelect
}: ModelSelectorProps) {
    const [isOpen, setIsOpen] = useState(false);

    // Fallback to internal store if props aren't provided (backwards compatibility)
    const storeActiveModel = useVedaStore((state) => state.activeModel);
    const storeSetActiveModel = useVedaStore((state) => state.setActiveModel);

    const effectiveActiveId = activeModelId || storeActiveModel;
    const effectiveOnSelect = onSelect || storeSetActiveModel;

    const currentModel = models.find(m => m.id === effectiveActiveId || m.name === effectiveActiveId) || models[0];
    const Icon = currentModel.icon;

    const colorMap = {
        blue: 'text-blue-400 group-hover:text-blue-300',
        purple: 'text-purple-400 group-hover:text-purple-300',
        red: 'text-red-400 group-hover:text-red-300',
        cyan: 'text-cyan-400 group-hover:text-cyan-300',
    };

    return (
        <div className={cn("relative z-50", className)}>
            <label className="text-gray-500 text-[10px] uppercase tracking-[0.2em] mb-2 block font-mono font-bold pl-1">
                Neural Engine Select
            </label>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white text-sm flex items-center justify-between hover:border-white/20 transition-all hover:bg-white/10 group shadow-2xl backdrop-blur-xl"
            >
                <div className="flex items-center gap-4">
                    <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center transition-all bg-black/40 border border-white/5 shadow-inner group-hover:scale-110",
                        currentModel.color === 'blue' && "shadow-blue-500/20 text-blue-400",
                        currentModel.color === 'purple' && "shadow-purple-500/20 text-purple-400",
                        currentModel.color === 'red' && "shadow-red-500/20 text-red-400",
                        currentModel.color === 'cyan' && "shadow-cyan-500/20 text-cyan-400",
                    )}>
                        <Icon className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                        <span className="font-bold block text-base tracking-tight">{currentModel.name}</span>
                        <span className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">{currentModel.desc}</span>
                    </div>
                </div>
                <ChevronDown className={cn("w-5 h-5 text-gray-600 transition-transform duration-500 ease-out mx-2", isOpen && "rotate-180 text-white")} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="absolute top-full left-0 right-0 mt-4 bg-[#0a0a0a]/95 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.5)] overflow-hidden z-50 p-6 flex flex-col gap-4 min-w-[320px]"
                        >
                            <div className="flex items-center justify-between px-2 pb-2 border-b border-white/5">
                                <span className="text-xs font-mono font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                                    <Cpu className="w-4 h-4" /> Available Clusters
                                </span>
                                <button onClick={() => setIsOpen(false)} className="text-gray-600 hover:text-white transition-colors">
                                    <Info className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {models.map((model) => {
                                    const MIcon = model.icon;
                                    const isActive = effectiveActiveId === model.id || effectiveActiveId === model.name;

                                    return (
                                        <motion.button
                                            key={model.id}
                                            onClick={() => {
                                                effectiveOnSelect(model.id);
                                                setIsOpen(false);
                                            }}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className={cn(
                                                "group relative h-48 rounded-3xl overflow-hidden border transition-all text-left",
                                                isActive
                                                    ? "border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.2)]"
                                                    : "border-white/5 hover:border-white/20 shadow-xl"
                                            )}
                                        >
                                            {/* Preview Image */}
                                            <img
                                                src={model.preview}
                                                alt={model.name}
                                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-40 group-hover:opacity-60"
                                            />

                                            {/* Gradient Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>

                                            {/* Content */}
                                            <div className="absolute inset-0 p-5 flex flex-col justify-between">
                                                <div className="flex justify-between items-start">
                                                    <div className={cn(
                                                        "w-10 h-10 rounded-xl flex items-center justify-center bg-black/40 border border-white/10 backdrop-blur-md shadow-lg transition-all group-hover:scale-110",
                                                        model.color === 'blue' && "text-blue-400 group-hover:shadow-blue-500/20",
                                                        model.color === 'purple' && "text-purple-400 group-hover:shadow-purple-500/20",
                                                        model.color === 'red' && "text-red-400 group-hover:shadow-red-500/20",
                                                        model.color === 'cyan' && "text-cyan-400 group-hover:shadow-cyan-500/20",
                                                    )}>
                                                        <MIcon className="w-5 h-5" />
                                                    </div>
                                                    {isActive && (
                                                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.6)]">
                                                            <Check className="w-4 h-4 text-white" />
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="space-y-1">
                                                    <h3 className="font-black text-lg tracking-tight text-white group-hover:translate-x-1 transition-transform">{model.name}</h3>
                                                    <p className="text-xs text-gray-400 line-clamp-1 group-hover:translate-x-1 transition-transform delay-75">{model.desc}</p>
                                                    <div className="flex gap-2 mt-2">
                                                        {model.tags.map(tag => (
                                                            <span key={tag} className="text-[9px] font-mono uppercase bg-white/5 border border-white/5 px-2 py-0.5 rounded-md text-gray-500 group-hover:bg-white/10 transition-colors">
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.button>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
