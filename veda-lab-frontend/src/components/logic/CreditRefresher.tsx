'use client';

import { useEffect } from 'react';
import { useVedaStore } from '@/lib/store';

/**
 * Global logic component to handle credit refills.
 * Checks every minute if 24 hours have passed since the last refresh.
 */
export function CreditRefresher() {
    const refreshCredits = useVedaStore((state) => state.refreshCredits);

    useEffect(() => {
        // Run once on mount
        refreshCredits();

        // Check every minute
        const interval = setInterval(() => {
            refreshCredits();
        }, 60000);

        return () => clearInterval(interval);
    }, [refreshCredits]);

    return null;
}
