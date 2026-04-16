"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Brain, Code, Cpu, Activity, Repeat, Search, Terminal } from "lucide-react";
import CyberGrid from "./CyberGrid";

const steps = [
  {
    title: "AI Product Strategy",
    desc: "Transforming ideas into scalable AI systems with clear architecture and execution plans.",
    icon: Search,
    protocol: "STRAT_01",
  },
  {
    title: "System Design",
    desc: "Designing efficient, modular systems focused on performance, scalability, and real-world usage.",
    icon: Cpu,
    protocol: "SYSD_02",
  },
  {
    title: "Full Stack Development",
    desc: "Building end-to-end applications using modern frameworks with clean and maintainable code.",
    icon: Code,
    protocol: "FSD_03",
  },
  {
    title: "AI Integration",
    desc: "Embedding AI capabilities into products — from automation to intelligent decision-making.",
    icon: Brain,
    protocol: "AI_04",
  },
  {
    title: "Performance & Optimization",
    desc: "Ensuring speed, reliability, and smooth user experience across all devices.",
    icon: Activity,
    protocol: "OPT_05",
  },
  {
    title: "Continuous Evolution",
    desc: "Iterating, improving, and scaling products based on real-world feedback.",
    icon: Repeat,
    protocol: "EVO_06",
  },
];

const ProtocolBadge = ({ text }: { text: string }) => (
  <div className="flex items-center gap-2 px-3 py-1 bg-[#00D1FF]/10 border border-[#00D1FF]/20 rounded-md">
    <div className="w-1 h-1 bg-[#00D1FF] rounded-full animate-pulse shadow-[0_0_8px_rgba(0,209,255,0.8)]" />
    <span className="text-[10px] font-mono text-[#00D1FF] uppercase tracking-widest">{text}</span>
  </div>
);

export default function WorkApproach() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const pathLength = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <section ref={containerRef} className="relative py-32 px-6 bg-[#030303] text-white overflow-hidden w-full">

      {/* Background Layer */}
      <CyberGrid />
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#00D1FF]/5 blur-[180px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Section Heading & Status */}
        <div className="flex flex-col items-center text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF41] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00FF41]"></span>
            </div>
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-[0.3em]">
              Neural Engine Status: <span className="text-[#00FF41]">Syncing...</span>
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-black mb-8 tracking-tighter"
          >
            Engineering <span className="text-[#00D1FF]">The Matrix</span>
          </motion.h2>

          <ProtocolBadge text="EXECUTION_PROTOCOL_VERSION_4.0" />
        </div>

        {/* The Pipeline Container */}
        <div className="relative">

          {/* The Central Flowing Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-[0.5px]">
            <motion.div
              style={{ scaleY: pathLength }}
              className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-[#00D1FF] via-[#00FF41] to-transparent origin-top"
            />
            {/* Pulsing Light Packet */}
            <motion.div
              animate={{ top: ["0%", "100%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute left-1/2 -translate-x-1/2 w-2 h-20 bg-linear-to-b from-transparent via-white to-transparent blur-xs"
            />
          </div>

          {/* Steps */}
          <div className="space-y-24">
            {steps.map((step, i) => (
              <div key={i} className={`flex flex-col md:flex-row items-center gap-8 ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}>

                {/* Content Card */}
                <div className="w-full md:w-[45%]">
                  <motion.div
                    initial={{ opacity: 0, x: i % 2 === 0 ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    aria-label={`Step ${i + 1}: ${step.title}`}
                    className="group relative p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl hover:border-[#00D1FF]/30 transition-all duration-500"
                  >
                    {/* Step Icon & Number */}
                    <div className="flex justify-between items-start mb-6">
                      <div className="p-3 bg-[#00D1FF]/10 rounded-xl border border-[#00D1FF]/20 group-hover:border-[#00D1FF]/40 transition-colors">
                        <step.icon className="w-6 h-6 text-[#00D1FF]" />
                      </div>
                      <span className="text-xs font-mono text-zinc-600 group-hover:text-[#00D1FF]/60 transition-colors">
                        [ 0{i + 1} ]
                      </span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold mb-4 tracking-tight group-hover:text-[#00D1FF] transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-zinc-400 leading-relaxed text-sm md:text-base">
                      {step.desc}
                    </p>

                    {/* Technical Tag on hover */}
                    <div className="mt-6 flex gap-2">
                      <span className="text-[9px] font-mono px-2 py-1 bg-white/5 rounded border border-white/10 text-zinc-500 uppercase">
                        {step.protocol}
                      </span>
                      <span className="text-[9px] font-mono px-2 py-1 bg-white/5 rounded border border-white/10 text-zinc-500 uppercase">
                        Priority_H
                      </span>
                    </div>

                    {/* Glow effect on hover */}
                    <div className="absolute -inset-1 bg-linear-to-br from-[#00D1FF]/0 to-[#00FF41]/0 rounded-2xl -z-10 group-hover:from-[#00D1FF]/5 group-hover:to-[#00FF41]/5 transition-all duration-700" />
                  </motion.div>
                </div>

                {/* Central Node Dot on Pipeline */}
                <div className="relative z-20 flex items-center justify-center w-8 md:w-[10%]">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    className="w-4 h-4 rounded-full bg-black border-2 border-[#00FF41] shadow-[0_0_15px_rgba(0,255,65,0.5)]"
                  />
                </div>

                {/* Empty Space for alignment on MD+ screens */}
                <div className="hidden md:block md:w-[45%]" />

              </div>
            ))}
          </div>

        </div>

        {/* Footer Accent */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-32 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/5 bg-white/2 backdrop-blur-sm">
            <Terminal className="w-4 h-4 text-zinc-500" />
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Pipeline Construction Complete. Redundancy: 100%</span>
          </div>
        </motion.div>

        {/* Hidden SEO Keywords */}
        <div className="sr-only">
          Detailed AI engineering workflow: Strategic planning for LLM apps, scalable architecture design for autonomous agents, full stack development with Next.js & Python, and continuous AI model optimization.
        </div>

      </div>
    </section>
  );
}
