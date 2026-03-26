'use client';

import { PageWrapper } from '@/components/layout/PageWrapper';
import { Sidebar } from '@/components/layout/Sidebar';
import { usePathname } from 'next/navigation';

export function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

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
            <Sidebar activeRoute={activeRoute} />
            <PageWrapper>
                {children}
            </PageWrapper>
        </div>
    );
}
