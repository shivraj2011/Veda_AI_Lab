import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface VedaState {
    credits: number;
    nsfwCredits: number;
    activeModel: string;
    isUncensored: boolean;
    userName: string;
    profileImage: string | null;

    // Actions
    setCredits: (credits: number) => void;
    setNsfwCredits: (credits: number) => void;
    setActiveModel: (model: string) => void;
    toggleUncensored: () => void;
    setUserName: (name: string) => void;
    setProfileImage: (image: string | null) => void;
    useCredits: (amount: number, isNsfw?: boolean) => boolean;
}

export const useVedaStore = create<VedaState>()(
    persist(
        (set, get) => ({
            credits: 100,
            nsfwCredits: 50,
            activeModel: 'Veda-Forge (SDXL)',
            isUncensored: true,

            setCredits: (credits) => set({ credits }),
            setNsfwCredits: (nsfwCredits) => set({ nsfwCredits }),
            setActiveModel: (activeModel) => set({ activeModel }),
            toggleUncensored: () => set((state) => ({ isUncensored: !state.isUncensored })),
            userName: 'Veda Traveler',
            profileImage: null,

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
        }),
        {
            name: 'veda-ai-lab-storage',
        }
    )
);
