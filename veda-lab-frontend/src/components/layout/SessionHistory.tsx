'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { History, X, ExternalLink, Download, Trash2, Maximize2 } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface SessionHistoryProps {
    isOpen: boolean;
    onClose: () => void;
}

export function SessionHistory({ isOpen, onClose }: SessionHistoryProps) {
    const [items] = useState([
        { id: 1, type: 'image', url: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=200&auto=format&fit=crop', prompt: 'Cyberpunk city landscape' },
        { id: 2, type: 'image', url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=200&auto=format&fit=crop', prompt: 'Space nebula painting' },
        { id: 3, type: 'video', url: '', prompt: 'Cinematic tracking shot of forest' },
    ]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] xl:hidden"
                    />

                    {/* Sidebar */}
                    <motion.aside
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-80 bg-[#050505]/95 backdrop-blur-2xl border-l border-white/10 z-[70] flex flex-col shadow-2xl"
                    >
                        <div className="p-6 border-b border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <History className="w-5 h-5 text-blue-400" />
                                <h2 className="text-lg font-bold text-white tracking-tight">Session History</h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-500 hover:text-white"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar space-y-4">
                            {items.map((item) => (
                                <div
                                    key={item.id}
                                    className="group relative bg-white/5 border border-white/5 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all cursor-pointer"
                                >
                                    <div className="aspect-square bg-black flex items-center justify-center overflow-hidden">
                                        {item.url ? (
                                            <img src={item.url} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        ) : (
                                            <div className="flex flex-col items-center gap-2 opacity-20">
                                                <History className="w-8 h-8" />
                                                <span className="text-[10px] font-mono">RENDERING...</span>
                                            </div>
                                        )}

                                        {/* Overlay Actions */}
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                            <button className="p-2 bg-white/10 rounded-lg hover:bg-blue-500/20 text-white transition-colors">
                                                <Maximize2 className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 bg-white/10 rounded-lg hover:bg-blue-500/20 text-white transition-colors">
                                                <Download className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="p-3">
                                        <p className="text-[10px] text-gray-400 font-mono truncate uppercase tracking-tighter">
                                            {item.type} // {item.prompt}
                                        </p>
                                    </div>
                                </div>
                            ))}

                            {items.length === 0 && (
                                <div className="flex flex-col items-center justify-center py-20 text-center opacity-30">
                                    <History className="w-12 h-12 mb-4" />
                                    <p className="text-sm font-mono tracking-widest uppercase">No generations yet</p>
                                </div>
                            )}
                        </div>

                        <div className="p-4 border-t border-white/5">
                            <button className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-xs font-bold text-gray-400 hover:text-white transition-all tracking-widest uppercase">
                                View Full Gallery
                            </button>
                        </div>
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    );
}
