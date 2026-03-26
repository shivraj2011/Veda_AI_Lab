'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export function EntryOverlay() {
    const [isVisible, setIsVisible] = useState(true);
    const [text, setText] = useState('');

    const loadingTexts = [
        "INITIALIZING_Veda_CORE...",
        "ESTABLISHING_SECURE_LINK...",
        "LOADING_AI_MODELS...",
        "SYSTEM_READY"
    ];

    useEffect(() => {
        let currentTextIndex = 0;

        // Animate text typing
        const textInterval = setInterval(() => {
            setText(loadingTexts[currentTextIndex]);
            currentTextIndex++;

            if (currentTextIndex >= loadingTexts.length) {
                clearInterval(textInterval);
                setTimeout(() => setIsVisible(false), 800);
            }
        }, 600);

        return () => clearInterval(textInterval);
    }, []);

    if (!isVisible) return null;

    return (
        <div
            className={cn(
                "fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center transition-opacity duration-1000",
                !isVisible && "opacity-0 pointer-events-none"
            )}
        >
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,119,255,0.3)_1px,_transparent_1px)] [background-size:20px_20px] opacity-50 animate-pan"></div>
            </div>

            <svg width="120" height="120" viewBox="0 0 24 24" className="drop-shadow-[0_0_15px_rgba(59,130,246,0.7)] mb-8">
                <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="#3B82F6" strokeWidth="0.5" fill="none" className="animate-draw-glow" />
                <path d="M2 7L12 12L22 7" stroke="#3B82F6" strokeWidth="0.5" fill="none" className="animate-draw" />
                <path d="M12 22V12" stroke="#3B82F6" strokeWidth="0.5" fill="none" className="animate-draw" />
            </svg>

            <div className="h-8 overflow-hidden text-center z-10 w-full flex justify-center">
                <p className="text-lg text-blue-400 font-mono tracking-widest uppercase">{text}</p>
            </div>
        </div>
    );
}
