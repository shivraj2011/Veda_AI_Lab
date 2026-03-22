'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface GlowButtonProps extends HTMLMotionProps<"button"> {
    gradient?: string;
    icon?: ReactNode;
}

export function GlowButton({
    children,
    className,
    gradient = "from-blue-500 to-purple-500",
    icon,
    ...props
}: GlowButtonProps) {
    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
                "relative group overflow-hidden rounded-xl font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2 px-6 py-3",
                className
            )}
            {...props}
        >
            {/* Animated Glow absolute background */}
            <div
                className={cn(
                    "absolute inset-0 bg-gradient-to-r opacity-80 group-hover:opacity-100 transition-opacity duration-300",
                    gradient
                )}
            />

            {/* Glass overlay */}
            <div className="absolute inset-0 bg-black/10 mix-blend-overlay group-hover:bg-transparent transition-colors duration-300" />

            {/* Content */}
            <span className="relative z-10 flex items-center gap-2">
                {icon}
                <>{children}</>
            </span>
        </motion.button>
    );
}

// Reusable animated section wrapper
export function FadeInBlock({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay, ease: [0.2, 0.8, 0.2, 1] }}
        >
            {children}
        </motion.div>
    );
}
