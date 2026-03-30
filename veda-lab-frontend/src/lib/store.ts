import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIState {
    isMobileMenuOpen: boolean;
    setMobileMenuOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
    isMobileMenuOpen: false,
    setMobileMenuOpen: (isMobileMenuOpen) => set({ isMobileMenuOpen })
}));

interface VedaState {
    credits: number;
    nsfwCredits: number;
    activeModel: string;
    isUncensored: boolean;
    userName: string;
    profileImage: string | null;
    lastRefresh: number;

    // Actions
    setCredits: (credits: number) => void;
    setNsfwCredits: (credits: number) => void;
    setActiveModel: (model: string) => void;
    toggleUncensored: () => void;
    setUserName: (name: string) => void;
    setProfileImage: (image: string | null) => void;
    useCredits: (amount: number, isNsfw?: boolean) => boolean;
    refreshCredits: () => void;
}

export const useVedaStore = create<VedaState>()(
    persist(
        (set, get) => ({
            credits: 100,
            nsfwCredits: 50,
            activeModel: 'Veda-Forge (SDXL)',
            isUncensored: true,
            userName: 'Veda Traveler',
            profileImage: null,
            lastRefresh: Date.now(),

            setCredits: (credits) => set({ credits }),
            setNsfwCredits: (nsfwCredits) => set({ nsfwCredits }),
            setActiveModel: (activeModel) => set({ activeModel }),
            toggleUncensored: () => set((state) => ({ isUncensored: !state.isUncensored })),
            setUserName: (userName) => set({ userName }),
            setProfileImage: (profileImage) => set({ profileImage }),

            useCredits: (amount, isNsfw = false) => {
                const currentCredits = isNsfw ? get().nsfwCredits : get().credits;
                if (currentCredits < amount) return false;

                if (isNsfw) {
                    set({ nsfwCredits: currentCredits - amount });
                } else {
                    set({ credits: currentCredits - amount });
                }
                return true;
            },

            refreshCredits: () => {
                const now = Date.now();
                const diff = now - get().lastRefresh;
                const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;

                if (diff >= TWENTY_FOUR_HOURS) {
                    set({ 
                        credits: 100, 
                        nsfwCredits: 50,
                        lastRefresh: now 
                    });
                    console.log("CREDITS_REFILLED_SUCCESSFULLY");
                }
            },
        }),
        {
            name: 'veda-ai-lab-storage',
        }
    )
);
