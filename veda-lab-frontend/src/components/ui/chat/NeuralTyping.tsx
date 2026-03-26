'use client';

import { motion } from 'framer-motion';

export function NeuralTyping() {
    return (
        <div className="flex gap-2 items-center p-4 bg-blue-500/5 border border-blue-500/20 rounded-2xl w-fit">
            <div className="flex gap-1.5">
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        className="w-2 h-2 rounded-full bg-blue-400"
                        animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.3, 1, 0.3],
                            filter: ["blur(0px)", "blur(2px)", "blur(0px)"],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.2,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>
            <span className="text-[10px] font-mono text-blue-400/60 uppercase tracking-widest ml-2">
                Processing Neural Weights...
            </span>
        </div>
    );
}
