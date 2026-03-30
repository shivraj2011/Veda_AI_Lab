'use client';

import { PageWrapper } from '@/components/layout/PageWrapper';
import { Sidebar } from '@/components/layout/Sidebar';
import { CreditRefresher } from '@/components/logic/CreditRefresher';
import { usePathname } from 'next/navigation';
import { useUIStore } from '@/lib/store';

export function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { isMobileMenuOpen, setMobileMenuOpen } = useUIStore();

    // We specify which route corresponds to which sidebar ID
    const routeMap: Record<string, string> = {
        '/': 'dashboard',
        '/chat': 'chat',
        '/image': 'image',
        '/video': 'video',
        '/3d': '3d',
        '/comic': 'comic',
        '/story': 'story',
        '/voice': 'voice',
        '/character': 'character',
        '/gallery': 'gallery',
        '/history': 'chats',
        '/code': 'code',
        '/rewards': 'rewards',
        '/profile': 'profile'
    };

    const activeRoute = routeMap[pathname] || 'dashboard';

    return (
        <div className="flex h-screen w-screen bg-grid overflow-hidden relative">
            <CreditRefresher />
            <Sidebar activeRoute={activeRoute} />
            {/* Overlay for mobile when sidebar is open */}
            {isMobileMenuOpen && (
                <div 
                    className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}
            <div className="flex-1 flex flex-col relative w-full overflow-hidden">
                <PageWrapper>
                    {children}
                </PageWrapper>
            </div>
        </div>
    );
}
