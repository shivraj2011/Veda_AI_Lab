import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Veda AI Lab: Universal Synthesis',
  description: 'veda Multi-Modal Neural Engineering Laboratory',
  icons: {
    icon: [
      { url: '/favicon.ico?v=3', sizes: 'any' },
      { url: '/favicon.png?v=3', type: 'image/png' },
    ],
    apple: '/favicon.png?v=3',
  },
};

import { ClientLayout } from '@/components/layout/ClientLayout';
import { VedaLokAnimation } from '@/components/ui/animated/VedaLokAnimation';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-0000000000000000"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body
        className="h-screen w-screen flex text-sm selection:bg-blue-500 selection:text-white bg-grid overflow-hidden"
        suppressHydrationWarning
      >

        <VedaLokAnimation />
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
