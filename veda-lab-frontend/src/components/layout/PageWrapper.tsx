'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

export function PageWrapper({ children }: { children: ReactNode }) {
    const pathname = usePathname();

    return (
        <AnimatePresence>
            <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="flex-1 flex flex-col overflow-hidden w-full h-full"
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
