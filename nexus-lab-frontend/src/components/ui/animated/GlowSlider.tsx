'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { InputHTMLAttributes } from 'react';

interface GlowSliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    label?: string;
    suffix?: string;
    gradient?: string;
}

export function GlowSlider({
    label,
    suffix = '',
    gradient = "from-blue-500 to-cyan-500",
    className,
    value,
    ...props
}: GlowSliderProps) {
    return (
        <div className={cn("space-y-3", className)}>
            <div className="flex justify-between items-center px-1">
                {label && <span className="text-gray-300 text-xs font-bold uppercase tracking-widest">{label}</span>}
                <span className={cn("text-xs font-mono font-bold px-3 py-1 rounded-full bg-black/40 border border-white/5", gradient.replace('from-', 'text-').replace('to-', ''))}>
                    {value}{suffix}
                </span>
            </div>

            <div className="relative group px-1">
                {/* Glowing track background */}
                <div className="absolute inset-0 h-1.5 top-1/2 -translate-y-1/2 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                        className={cn("h-full bg-gradient-to-r shadow-[0_0_10px_rgba(59,130,246,0.5)]", gradient)}
                        initial={false}
                        animate={{ width: `${(Number(value) / Number(props.max || 100)) * 100}%` }}
                    />
                </div>

                <input
                    type="range"
                    value={value}
                    className="relative w-full h-1.5 appearance-none bg-transparent cursor-pointer z-10 
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 
            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(255,255,255,0.8)]
            [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-blue-500 [&::-webkit-slider-thumb]:transition-transform
            [&::-webkit-slider-thumb]:hover:scale-125 group-hover:[&::-webkit-slider-thumb]:scale-110"
                    {...props}
                />
            </div>
        </div>
    );
}
