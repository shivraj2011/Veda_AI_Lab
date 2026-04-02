'use client';

import { motion } from 'framer-motion';
import { TopBar } from '@/components/layout/TopBar';
import { Gavel, Globe, ShieldCheck, Scale } from 'lucide-react';

export default function TermsOfService() {
  return (
    <main className="flex-1 flex flex-col relative overflow-hidden bg-[#050505]">
      <TopBar title="Neural Terms of Service" />
      
      <div className="flex-1 overflow-y-auto p-10 md:p-20 custom-scrollbar relative z-10">
        <div className="max-w-4xl mx-auto space-y-16">
          <header className="space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
              <Gavel className="w-8 h-8 text-amber-500" />
            </div>
            <h1 className="text-5xl font-black uppercase italic tracking-tighter">Neural_Terms_v1.0</h1>
            <p className="text-gray-500 font-medium italic">Standard Protocol for Lab Utilization</p>
          </header>

          <section className="space-y-8">
            <div className="p-8 bg-white/[0.02] border border-white/5 rounded-3xl space-y-6">
              <div className="flex items-center gap-4">
                <Globe className="w-5 h-5 text-amber-500" />
                <h3 className="text-xl font-bold uppercase italic">01. ACCEPTANCE_OF_PROTOCOL</h3>
              </div>
              <p className="text-gray-400 leading-relaxed italic">
                By entering Veda AI Lab (the "System"), you agree to follow our synthesis guidelines. This laboratory is for research, creation, and experimental neural engineering. 
              </p>
            </div>

            <div className="p-8 bg-white/[0.02] border border-white/5 rounded-3xl space-y-6">
              <div className="flex items-center gap-4">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="text-xl font-bold uppercase italic">02. GENERATION_OWNERSHIP</h3>
              </div>
              <p className="text-gray-400 leading-relaxed italic">
                All artifacts generated within the lab (Images, Conversations, etc.) remain the property of the creator/user. We do not claim ownership over your neural outputs. However, you are responsible for ensuring your creations comply with your local laws.
              </p>
            </div>

            <div className="p-8 bg-white/[0.02] border border-white/5 rounded-3xl space-y-6">
              <div className="flex items-center gap-4">
                <Scale className="w-5 h-5 text-blue-400" />
                <h3 className="text-xl font-bold uppercase italic">03. CREDIT_SYSTEM</h3>
              </div>
              <p className="text-gray-400 leading-relaxed italic">
                Credits (Neural Energy) are assigned daily to ensure fair resource allocation across our local node network. Veda Pro subscriptions grant higher priority and faster processing but do not grant ownership of the underlying AI models.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
