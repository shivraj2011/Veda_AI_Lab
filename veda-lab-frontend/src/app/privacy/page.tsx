'use client';

import { motion } from 'framer-motion';
import { TopBar } from '@/components/layout/TopBar';
import { ShieldAlert, Lock, Eye, FileText } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <main className="flex-1 flex flex-col relative overflow-hidden bg-[#050505]">
      <TopBar title="Privacy Protocol" />
      
      <div className="flex-1 overflow-y-auto p-10 md:p-20 custom-scrollbar relative z-10">
        <div className="max-w-4xl mx-auto space-y-16">
          <header className="space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
              <ShieldAlert className="w-8 h-8 text-blue-400" />
            </div>
            <h1 className="text-5xl font-black uppercase italic tracking-tighter">Privacy_Protocol_v1.0</h1>
            <p className="text-gray-500 font-medium italic">Last Synced: April 2026 // Neural Node Location: India</p>
          </header>

          <section className="space-y-8">
            <div className="p-8 bg-white/[0.02] border border-white/5 rounded-3xl space-y-6">
              <div className="flex items-center gap-4">
                <Eye className="w-5 h-5 text-blue-400" />
                <h3 className="text-xl font-bold uppercase italic">01. DATA_COLLECTION</h3>
              </div>
              <p className="text-gray-400 leading-relaxed italic">
                Veda AI Lab prioritizes your neural privacy. We do not store your generated images or private chat history on our cloud servers. All synthesis occurs via your local "Neural Node" (User Laptop), ensuring your data remains within your own hardware environment.
              </p>
            </div>

            <div className="p-8 bg-white/[0.02] border border-white/5 rounded-3xl space-y-6">
              <div className="flex items-center gap-4">
                <Lock className="w-5 h-5 text-purple-400" />
                <h3 className="text-xl font-bold uppercase italic">02. ADVERTISING_&_COOKIES</h3>
              </div>
              <p className="text-gray-400 leading-relaxed italic">
                We use Google AdSense to sustain the lab's infrastructure. AdSense may use cookies to serve ads based on your visit to this site and other sites on the internet. You can opt-out of personalized advertising by visiting Google Ad Settings.
              </p>
            </div>

            <div className="p-8 bg-white/[0.02] border border-white/5 rounded-3xl space-y-6">
              <div className="flex items-center gap-4">
                <FileText className="w-5 h-5 text-amber-400" />
                <h3 className="text-xl font-bold uppercase italic">03. CONTACT_LAB</h3>
              </div>
              <p className="text-gray-400 leading-relaxed italic">
                If you have questions regarding this protocol, contact the Veda Lead Researcher via the official lab discord or dashboard settings.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
