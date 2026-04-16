"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Zap, ShieldCheck } from "lucide-react";

interface UserOnboardingProps {
  onComplete: (name: string, email: string) => void;
}

export default function UserOnboarding({ onComplete }: UserOnboardingProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setIsSubmitting(true);
    // Simulate a bit of "protocol syncing" for flavor
    setTimeout(() => {
      onComplete(name.trim(), email.trim());
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-200 flex items-center justify-center p-6 bg-black/80 backdrop-blur-2xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-md glass-card rounded-[2.5rem] bg-bg-dark/90 border border-white/10 p-10 relative overflow-hidden shadow-[0_0_80px_rgba(124,58,237,0.15)]"
      >
        {/* Decorative Effects */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-purple/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-brand-blue/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-8">
          <div className="text-center space-y-3">
            <div className="inline-flex p-3 rounded-2xl bg-brand-purple/10 border border-brand-purple/20 mb-2">
              <Zap className="text-brand-purple w-6 h-6" />
            </div>
            <h2 className="text-3xl font-black tracking-tighter uppercase italic text-white leading-none">
              Initialize <span className="text-gradient">Session</span>
            </h2>
            <p className="text-zinc-500 text-xs font-mono tracking-widest uppercase">
              Establish neural link parameters
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-widest ml-1">
                  Agent Identity (Name)
                </label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 transition-colors group-focus-within:text-brand-purple" />
                  <input
                    required
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Neo Smith"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-brand-purple/50 focus:ring-1 focus:ring-brand-purple/50 transition-all placeholder:text-zinc-700"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-widest ml-1">
                  Secure Comms (Gmail)
                </label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 transition-colors group-focus-within:text-brand-purple" />
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="neo@gmail.com"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-brand-purple/50 focus:ring-1 focus:ring-brand-purple/50 transition-all placeholder:text-zinc-700"
                  />
                </div>
              </div>
            </div>

            <button
              disabled={isSubmitting}
              type="submit"
              className="w-full relative group p-px rounded-2xl overflow-hidden shadow-2xl transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:scale-100"
            >
              <div className="absolute inset-0 bg-linear-to-r from-brand-purple via-brand-pink to-brand-blue animate-gradient" />
              <div className="relative bg-bg-dark rounded-[calc(1rem-1px)] py-4 flex items-center justify-center gap-3">
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-brand-purple border-t-white rounded-full animate-spin" />
                    <span className="text-[10px] font-mono font-black uppercase tracking-widest text-white">Syncing...</span>
                  </>
                ) : (
                  <>
                    <span className="text-[10px] font-mono font-black uppercase tracking-widest text-white">Activate Link</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-purple animate-pulse" />
                  </>
                )}
              </div>
            </button>
          </form>

          <div className="pt-4 flex items-center justify-center gap-6 border-t border-white/5 opacity-40">
            <div className="flex items-center gap-2">
              <ShieldCheck size={12} className="text-zinc-500" />
              <span className="text-[8px] font-mono uppercase tracking-widest text-zinc-500">Secure Protocol</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-zinc-800" />
            <span className="text-[8px] font-mono uppercase tracking-widest text-zinc-500">End-to-End Chat</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
