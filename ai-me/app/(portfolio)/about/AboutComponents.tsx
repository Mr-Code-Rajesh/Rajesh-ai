"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Rocket,
  Target,
  Award,
  Code,
  Cpu,
  Globe,
  FileText,
  ChevronRight,
  Database,
  Terminal,
  Activity
} from "lucide-react";
import Image from "next/image";
import CyberGrid from "@/components/CyberGrid";

// --- Utility Components ---

const StatusLabel = ({ text, color = "purple" }: { text: string; color?: string }) => (
  <div className="flex items-center gap-2 mb-4">
    <div className={`w-2 h-2 rounded-full animate-pulse bg-${color}-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]`} />
    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500">
      {text}
    </span>
  </div>
);

const TechBadge = ({ text }: { text: string }) => (
  <span className="px-3 py-1 rounded-md text-[9px] font-mono border border-white/5 bg-white/2 text-zinc-400 group-hover:border-brand-purple/20 transition-colors uppercase tracking-widest">
    {text}
  </span>
);

// --- Section Redesigns ---

export const AboutHero = () => {
  const [text, setText] = useState("");
  const fullText = "Identity Verification: Rajesh P";

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(timer);
    }, 40);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full min-h-[70vh] flex flex-col items-center justify-center px-6 overflow-hidden mt-12 mb-12">
      <CyberGrid />
      <div className="scanline" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center"
      >
        {/* Identity Core */}
        <div className="relative mb-8 mx-auto w-24 h-24">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-2 border-dashed border-brand-purple/20 rounded-full"
          />
          <div className="absolute inset-2 border border-white/10 rounded-full bg-black/40 backdrop-blur-xl flex items-center justify-center overflow-hidden group">
            <div className="w-full h-full bg-linear-to-br from-brand-purple/20 to-brand-blue/20 absolute inset-0 opacity-50" />
            <span className="text-3xl font-black text-white relative z-10 group-hover:scale-110 transition-transform">RP</span>
          </div>
        </div>

        <motion.p className="font-mono text-brand-purple text-xs uppercase tracking-[0.5em] mb-4">
          {text}
          <span className="inline-block w-1.5 h-3 bg-brand-purple ml-1 animate-pulse" />
        </motion.p>

        <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-8 leading-none uppercase italic">
          Building <span className="text-gradient">Products</span> <br />
          Deciphering <span className="text-zinc-800">Logic.</span>
        </h1>

        <p className="text-zinc-500 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed border-l border-brand-purple/30 pl-6 text-left md:text-center md:border-l-0 md:pl-0">
          I bridge the gap between abstract ideas and <span className="text-white">scalable architecture</span>.
          Founded on logic, powered by AI.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-12 flex flex-wrap justify-center gap-4"
        >
          <a
            href="/resume.pdf"
            className="group px-8 py-4 rounded-full bg-white text-black font-bold uppercase tracking-widest text-[10px] flex items-center gap-2 hover:scale-105 transition-all"
          >
            <FileText size={14} />
            Access Dossier
          </a>
          <div className="px-6 py-4 rounded-full border border-white/10 bg-black/50 backdrop-blur-md text-zinc-500 text-[10px] font-mono tracking-widest uppercase flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Systems Online
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export const StartupStory = () => {
  return (
    <section id="startup-story" className="w-full py-32 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-1 border-r border-white/5 hidden lg:block h-full relative">
            <div className="sticky top-1/2 -translate-y-1/2 flex flex-col gap-12 font-mono text-[9px] text-zinc-600 uppercase tracking-[0.3em] rotate-180 [writing-mode:vertical-lr]">
              <span>Identity.Logs</span>
              <span>Vision.Data</span>
              <span>Execution.Step</span>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-8">
            <StatusLabel text="founder.log_023" />
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase italic leading-none mb-12">
              The Liceron <br /><span className="text-brand-purple">Initiative.</span>
            </h2>

            <div className="space-y-6 text-zinc-400 text-lg leading-relaxed font-medium">
              <p className="border-l-2 border-white/10 pl-6 py-2">
                Launched <span className="text-white">Liceron Private Limited</span> on December 3rd—not because we were ready, but because we were <span className="text-white italic">hungry</span>.
              </p>
              <p>
                Our flagship protocol, <span className="text-brand-purple font-mono uppercase text-sm">LucidExtractor</span>, proved that complex ideas can be reduced to elegant code in weeks, not months.
              </p>
              <p className="text-zinc-500">
                Currently scaling <span className="text-white">Nural AI</span>—merging automation with intuition to build the next generation of intelligent ecosystems.
              </p>
            </div>

            <div className="pt-8 grid grid-cols-2 gap-4">
              <div className="glass-card p-6 rounded-2xl border border-white/20 space-y-2">
                <Terminal size={18} className="text-brand-purple mb-2" />
                <span className="text-[10px] font-mono text-zinc-600 block uppercase">Project Velocity</span>
                <span className="text-xl font-bold text-white uppercase italic">0→1 in 120D</span>
              </div>
              <div className="glass-card p-6 rounded-2xl border border-white/20 space-y-2">
                <Database size={18} className="text-brand-blue mb-2" />
                <span className="text-[10px] font-mono text-zinc-600 block uppercase">Base Logic</span>
                <span className="text-xl font-bold text-white uppercase italic">AI Native</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="absolute inset-0 bg-brand-purple/5 blur-[120px] rounded-full" />
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative aspect-square md:aspect-4/5 rounded-4xl overflow-hidden border border-white/10 glass-card p-2"
            >
              <div className="w-full h-full rounded-3xl overflow-hidden relative group">
                {/* Place image here - for now abstract bg */}
                <div className="absolute inset-0 bg-zinc-900 group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-linear-to-tr from-brand-purple/40 to-transparent mix-blend-overlay" />

                {/* Visual interface elements */}
                <div className="absolute top-6 left-6 flex items-center gap-2">
                  <Activity size={14} className="text-brand-purple animate-pulse" />
                  <span className="font-mono text-[9px] uppercase tracking-widest text-white/50">Core.Process_Active</span>
                </div>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="text-center p-8 bg-black/60 backdrop-blur-md rounded-2xl border border-white/10 scale-90 group-hover:scale-100 transition-transform">
                    <Cpu size={40} className="text-brand-purple mx-auto mb-4" />
                    <p className="text-xs font-mono text-white tracking-widest uppercase">System Architecture</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const ExperienceGrid = () => {
  const experiences = [
    {
      role: "Co-Founder & AI Architect",
      company: "Liceron Technologies",
      period: "2025 – PRESENT",
      desc: "Built and launched LucidExtractor. Architected end-to-end AI data pipelines.",
      tools: ["React", "TypeScript", "Node.js", "AI Scraping"]
    },
    {
      role: "Research Executive (Technical)",
      company: "Zinnov",
      period: "2023 – PRESENT",
      desc: "Developed AI-powered platform for data cleanup using Gemini and Redis.",
      tools: ["Next.js", "Gemini API", "Redis", "Bull Queue"]
    }
  ];

  return (
    <section id="experience" className="w-full py-32 px-6 bg-[#030303]">
      <div className="max-w-6xl mx-auto">
        <div className="mb-20">
          <StatusLabel text="career.archives" />
          <h2 className="text-5xl md:text-7xl font-black text-white italic uppercase tracking-tighter">Experience.</h2>
        </div>

        <div className="space-y-4">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative"
            >
              <div className="glass-card p-10 rounded-[2.5rem] border border-white/5 hover:border-brand-purple/30 transition-all flex flex-col md:flex-row items-center gap-12 group-hover:bg-white/1">
                <div className="flex-none text-center md:text-left min-w-[200px]">
                  <span className="text-[10px] font-mono text-zinc-600 block uppercase tracking-widest mb-2">{exp.period}</span>
                  <h3 className="text-2xl font-black text-white uppercase italic">{exp.role}</h3>
                  <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest mt-1">{exp.company}</p>
                </div>

                <div className="h-px w-full md:w-px md:h-20 bg-white/10 hidden md:block" />

                <div className="grow">
                  <p className="text-zinc-400 text-lg leading-relaxed font-medium mb-6">
                    {exp.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {exp.tools.map(tool => <TechBadge key={tool} text={tool} />)}
                  </div>
                </div>

                <div className="flex-none opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronRight className="text-brand-purple" size={32} />
                </div>
              </div>

              {/* Vertical connector line for non-last items */}
              {i < experiences.length - 1 && (
                <div className="absolute left-1/2 -bottom-4 w-px h-8 bg-linear-to-b from-brand-purple/50 to-transparent hidden md:block" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const AchievementsGrid = () => {
  const achievements = [
    { title: "Dashing Debut", meta: "Zinnov", val: "2024", icon: <Award className="text-yellow-500" /> },
    { title: "Extra Mile", meta: "Zinnov", val: "2025", icon: <Award className="text-brand-purple" /> },
    { title: "Ninja Dominator", meta: "Coding Ninjas", val: "49D", icon: <Target className="text-red-600" /> },
    { title: "Saktrix UI", meta: "Open Source", val: "240+", icon: <Code className="text-brand-blue" /> },
  ];

  return (
    <section id="achievements" className="w-full py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-24">
          <StatusLabel text="badges.verification" />
          <h2 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter">Milestones.</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="glass-card p-8 rounded-4xl border border-white/5 flex flex-col items-center text-center hover:glow transition-all">
                <div className="mb-8 p-6 rounded-3xl bg-white/2 group-hover:scale-110 group-hover:bg-brand-purple/5 transition-all duration-500">
                  {item.icon}
                </div>
                <span className="text-[10px] font-mono text-zinc-600 block uppercase tracking-widest mb-1">{item.meta}</span>
                <h4 className="text-xl font-bold text-white mb-4 uppercase italic leading-tight">{item.title}</h4>
                <div className="px-4 py-1.5 rounded-full bg-linear-to-r from-brand-purple to-brand-blue p-px">
                  <div className="w-full h-full bg-black rounded-full px-4 py-1 flex items-center justify-center">
                    <span className="text-[10px] font-black text-white uppercase">{item.val}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
