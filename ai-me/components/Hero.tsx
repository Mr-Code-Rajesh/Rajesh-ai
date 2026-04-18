"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import OptimizedBackground from "./OptimizedBackground";
import CyberGrid from "./CyberGrid";
import { Cpu, Zap, Code, ShieldCheck, ChevronRight } from "lucide-react";

const FeatureBadge = ({ icon: Icon, text, delay }: { icon: any; text: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/20 backdrop-blur-sm"
  >
    <Icon className="w-3.5 h-3.5 text-[#00D1FF]" />
    <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-400">{text}</span>
  </motion.div>
);

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false);
  const [text, setText] = useState("");
  const fullText = "Engineering Intelligent Systems";

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(timer);
    }, 30); // Faster typing
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative flex flex-col items-center justify-center min-h-svh w-full px-6 text-center overflow-hidden bg-[#030303] text-white cursor-none">

      {/* Layer 0: Performance Grids & Canvas */}
      <CyberGrid />
      <OptimizedBackground />
      <div className="scanline" />

      {/* Layer 1: Ambient Glows */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-600/10 blur-[160px] rounded-full rotate-12" />
        <div className="absolute top-1/4 right-10 w-[300px] h-[300px] bg-cyan-500/10 blur-[100px] rounded-full" />
      </div>

      {/* Layer 2: Content */}
      <div className="relative z-10 max-w-6xl w-full flex flex-col items-center">

        {/* Top Badges */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          <FeatureBadge icon={Cpu} text="AI Architect" delay={0.1} />
          <FeatureBadge icon={Zap} text="Performance Driven" delay={0.2} />
          <FeatureBadge icon={Code} text="SaaS Expert" delay={0.3} />
          <FeatureBadge icon={ShieldCheck} text="Production Ready" delay={0.4} />
        </div>

        {/* The Neural Core (Interactive) */}
        <motion.div
          className="relative mb-6"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            animate={{
              scale: isHovered ? 1.15 : 1,
              rotate: isHovered ? 90 : 0,
              boxShadow: isHovered
                ? "0 0 50px rgba(168, 85, 247, 0.6)"
                : "0 0 20px rgba(168, 85, 247, 0.2)"
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="w-16 h-16 rounded-2xl bg-linear-to-br from-purple-500 via-[#00D1FF] to-[#00FF41] p-px cursor-pointer"
          >
            <motion.div
              className="w-full h-full rounded-2xl bg-black flex items-center justify-center overflow-hidden"
            >
              <motion.div
                animate={{
                  opacity: isHovered ? [0.8, 1, 0.8] : [0.4, 0.7, 0.4],
                  scale: isHovered ? [1.1, 1.3, 1.1] : [1, 1.1, 1]
                }}
                transition={{ duration: isHovered ? 1.5 : 3, repeat: Infinity }}
                className="w-6 h-6 bg-white rounded-full blur-xs shadow-[0_0_15px_rgba(255,255,255,0.5)]"
              />
            </motion.div>
          </motion.div>
          {/* External Ring - Always rotates, faster on hover */}
          <motion.div
            animate={{
              rotate: 360,
              scale: isHovered ? 1.2 : 1,
              opacity: isHovered ? 0.8 : 0.4
            }}
            transition={{
              rotate: { duration: isHovered ? 4 : 10, repeat: Infinity, ease: "linear" },
              scale: { duration: 0.5 }
            }}
            className="absolute -inset-4 border border-dashed border-white/40 rounded-full"
          />
        </motion.div>

        {/* Headline with Scanning Effect */}
        <div className="relative mb-6">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            aria-label={fullText}
            className="text-5xl md:text-8xl font-black tracking-tighter leading-none"
          >
            {text}
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block w-2 md:w-4 h-10 md:h-16 bg-[#00D1FF] ml-2 align-middle"
            />
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-[#00FF41] font-mono text-[10px] md:text-xs mt-4 uppercase tracking-[0.5em]"
          >
            Initialising Rajesh AI Protocols...
          </motion.p>
        </div>

        {/* Subcopy */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-lg md:text-xl text-zinc-400 max-w-2xl balance mx-auto mb-12 leading-relaxed"
        >
          AI Full Stack Engineer crafting <span className="text-white font-medium">high-performance automation systems</span> and autonomous agents that scale with your vision.
        </motion.p>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center gap-6"
        >
          <a
            href="/projects"
            className="group relative px-8 py-4 bg-white text-black font-bold uppercase tracking-widest text-sm rounded-full overflow-hidden transition-all hover:pr-12"
          >
            <span className="relative z-10">Explore Matrix</span>
            <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all w-5 h-5" />
          </a>

          <a
            href="/chat-with-rajesh-ai"
            className="px-8 py-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-white/25 transition-all text-sm font-bold uppercase tracking-widest flex items-center gap-3"
          >
            <span>Talk to Rajesh AI</span>
            <div className="flex gap-1">
              {[1, 2, 3].map(i => (
                <motion.div
                  key={i}
                  animate={{ height: ["4px", "12px", "4px"] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                  className="w-1 bg-[#00FF41]/60 rounded-full"
                />
              ))}
            </div>
          </a>
        </motion.div>

        {/* SEO - Hidden but powerful */}
        <h2 className="sr-only">Elite AI Developer for SaaS, LLM Integration, and Custom Automation Workflows</h2>
      </div>

    </section>
  );
}

