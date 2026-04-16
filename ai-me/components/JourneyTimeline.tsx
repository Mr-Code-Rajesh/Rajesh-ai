"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Code,
  GraduationCap,
  Trophy,
  Layers,
  Box,
  Zap,
  Rocket,
  TrendingUp,
  Award
} from "lucide-react";

interface TimelineItemProps {
  date: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}

const TimelineItem = ({ date, title, description, icon, index }: TimelineItemProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.215, 0.61, 0.355, 1] }}
      className="relative pl-12 pb-16 group"
    >
      {/* Timeline Line Bridge */}
      <div className="absolute left-[11px] top-0 bottom-0 w-px bg-linear-to-b from-brand-purple/40 to-transparent group-last:bg-transparent" />

      {/* Icon Node */}
      <div className="absolute left-0 top-0 w-6 h-6 rounded-full glass-card border border-brand-purple/30 flex items-center justify-center z-10 bg-black ring-4 ring-brand-purple/5 group-hover:scale-125 transition-transform">
        <div className="text-brand-purple w-3 h-3">
          {icon}
        </div>
      </div>

      {/* Content */}
      <div className="glass-card p-8 rounded-3xl border border-white/5 hover:border-brand-purple/20 hover:bg-white/1 transition-all relative overflow-hidden group/card">
        <div className="absolute inset-0 bg-brand-purple/5 opacity-0 group-hover/card:opacity-100 transition-opacity pointer-events-none" />
        <span className="text-[10px] font-mono tracking-[0.3em] text-brand-purple mb-4 block uppercase font-bold">{date}</span>
        <h4 className="text-2xl font-black text-white mb-3 uppercase italic tracking-tight">{title}</h4>
        <p className="text-zinc-400 text-sm leading-relaxed font-medium">{description}</p>
      </div>
    </motion.div>
  );
};

export default function JourneyTimeline() {
  const timelineData = [
    {
      date: "2020",
      title: "Protocol Initialized",
      description: "Began coding journey. Specialized in frontend architecture and high-performance UI systems.",
      icon: <GraduationCap size={12} />,
    },
    {
      date: "2023",
      title: "Commercial Deployment",
      description: "Joined Zinnov as Technical Research Executive. Automating workflows and building internal tooling.",
      icon: <Code size={12} />,
    },
    {
      date: "2024",
      title: "Efficiency Merit",
      description: "Awarded Zinnov Dashing Debut for platform optimization and UI excellence.",
      icon: <Award size={12} />,
    },
    {
      date: "2024",
      title: "AI Core Expansion",
      description: "Built AI Data Cleanup Platform using Gemini, Redis, and Bull Queue for production-grade throughput.",
      icon: <Zap size={12} />,
    },
    {
      date: "2024",
      title: "Neural Dominator",
      description: "Reached Ninja Dominator on Coding Ninjas in 49 days. Maintaining peak competitive performance.",
      icon: <Trophy size={12} />,
    },
    {
      date: "2024",
      title: "UI Infrastructure",
      description: "Launched Saktrix UI Library. 240+ modular components for rapid deployment.",
      icon: <Layers size={12} />,
    },
    {
      date: "2025",
      title: "Technical Leadership",
      description: "Second recognition at Zinnov with the Extra Mile Award for automation leadership.",
      icon: <TrendingUp size={12} />,
    },
    {
      date: "Dec 2025",
      title: "Liceron Genesis",
      description: "Co-Founded Liceron. Delivering LucidExtractor from 0→1 in a record 120-day sprint.",
      icon: <Rocket size={12} />,
    },
    {
      date: "2026 → FUTURE",
      title: "Scaling Protocols",
      description: "Scaling LucidExtractor globally and architecting next-gen AI SaaS solutions.",
      icon: <Box size={12} />,
    },
  ];

  return (
    <div className="w-full">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-0 relative">
          {timelineData.map((item, index) => (
            <TimelineItem key={index} {...item} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
