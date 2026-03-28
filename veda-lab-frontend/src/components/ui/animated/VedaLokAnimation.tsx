'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const LogoMandala = ({ size = 200 }) => {
    const r = size / 2;
    const innerR = r * 0.35;
    const dotR = r * 0.18;
    const center = r;

    // Generate 24 spokes and curves
    const spokes = Array.from({ length: 24 }).map((_, i) => {
        const angle = (i * 360 / 24) * Math.PI / 180;
        const x1 = center + innerR * Math.cos(angle);
        const y1 = center + innerR * Math.sin(angle);
        const x2 = center + (r - 8) * Math.cos(angle);
        const y2 = center + (r - 8) * Math.sin(angle);
        return <line key={`s-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="hsl(24, 90%, 50%)" strokeWidth="2.5" strokeLinecap="round" />;
    });

    return (
        <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }} 
            style={{ width: size, height: size }}
        >
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                <circle cx={center} cy={center} r={r - 4} fill="none" stroke="hsl(24, 90%, 50%)" strokeWidth="6" />
                <circle cx={center} cy={center} r={r - 12} fill="none" stroke="hsl(24, 90%, 50%)" strokeWidth="1.5" opacity="0.4" />
                {spokes}
                <circle cx={center} cy={center} r={innerR} fill="none" stroke="hsl(24, 90%, 50%)" strokeWidth="3" />
                <circle cx={center} cy={center} r={dotR} fill="hsl(24, 90%, 50%)" />
            </svg>
        </motion.div>
    );
};

export function VedaLokAnimation() {
    const [phase, setPhase] = useState<"enter" | "text" | "exit" | "hidden">("enter");

    useEffect(() => {
        // Check if animation has already played in this session
        const hasPlayed = sessionStorage.getItem('vedalok_played');
        if (hasPlayed) {
            setPhase("hidden");
            return;
        }

        const t1 = setTimeout(() => setPhase("text"), 800);
        const t2 = setTimeout(() => setPhase("exit"), 4000);
        const t3 = setTimeout(() => {
            setPhase("hidden");
            sessionStorage.setItem('vedalok_played', 'true');
        }, 5000);
        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }, []);

    if (phase === "hidden") return null;

    return (
        <motion.div 
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
            style={{ background: "hsl(24, 15%, 6%)" }}
            initial={{ opacity: 1 }}
            animate={{ opacity: phase === "exit" ? 0 : 1 }}
            transition={{ duration: 1 }}
        >
            {/* Background Glow */}
            <motion.div 
                className="absolute rounded-full"
                style={{ width: 500, height: 500, background: "radial-gradient(circle, hsla(24, 90%, 50%, 0.15) 0%, hsla(24, 90%, 50%, 0.05) 40%, transparent 70%)" }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.5, 1.2], opacity: [0, 0.8, 0.6] }}
                transition={{ duration: 2 }}
            />

            {/* Rotating Logo */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: phase === "exit" ? [1, 1.2] : [0, 1.2, 1], opacity: phase === "exit" ? 0 : 1 }}
                transition={{ duration: 1.5 }}
            >
                <LogoMandala size={200} />
            </motion.div>

            {/* Text Content */}
            <motion.div 
                className="mt-12 text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ 
                    opacity: phase === "text" || phase === "exit" ? (phase === "exit" ? 0 : 1) : 0, 
                    y: phase === "text" ? 0 : 30 
                }}
                transition={{ duration: 0.8 }}
            >
                <motion.p 
                    className="text-sm tracking-[0.4em] uppercase mb-3"
                    style={{ color: "hsl(24, 60%, 55%)" }}
                    initial={{ opacity: 0, letterSpacing: "0.8em" }}
                    animate={{ opacity: phase === "text" ? 1 : 0, letterSpacing: phase === "text" ? "0.4em" : "0.8em" }}
                    transition={{ duration: 1.5 }}
                >
                    Welcome to
                </motion.p>
                <h1 className="text-5xl md:text-7xl font-bold tracking-wider text-white">
                    VEDA LOK
                </h1>
                <motion.div 
                    className="mx-auto mt-5 h-px"
                    style={{ background: "linear-gradient(90deg, transparent, hsl(24, 90%, 50%), transparent)" }}
                    initial={{ width: 0 }}
                    animate={{ width: phase === "text" ? 200 : 0 }}
                    transition={{ duration: 1.2 }}
                />
                <p className="mt-4 text-2xl" style={{ color: "hsl(24, 50%, 45%)" }}>ॐ</p>
            </motion.div>
        </motion.div>
    );
}
