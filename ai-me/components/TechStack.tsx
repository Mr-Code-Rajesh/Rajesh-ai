"use client";

import { motion } from "framer-motion";
import {
  SiNextdotjs,
  SiTypescript,
  SiReact,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiFirebase,
  SiVercel,
  SiGit,
  SiGithub,
  SiPostman,
  SiRedis,
  SiPython,
  SiOpenai,
  SiPytorch,
  SiDocker,
  SiLangchain,
} from "react-icons/si";
import CyberGrid from "./CyberGrid";

const techCategories = [
  {
    name: "Frontend Neural Matrix",
    protocol: "FNM_01",
    techs: [
      { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF", status: "CORE" },
      { name: "React", icon: SiReact, color: "#61DAFB", status: "CORE" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6", status: "HIGH" },
      { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4", status: "SYNC" },
    ],
  },
  {
    name: "Backend Synapse Engine",
    protocol: "BSE_02",
    techs: [
      { name: "Node.js", icon: SiNodedotjs, color: "#339933", status: "CORE" },
      { name: "Express", icon: SiExpress, color: "#E0E0E0", status: "FAST" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248", status: "SYNC" },
      { name: "Redis", icon: SiRedis, color: "#DC382D", status: "FAST" },
      { name: "Firebase", icon: SiFirebase, color: "#FFCA28", status: "SYNC" },
    ],
  },
  {
    name: "Intelligence & Cloud Hub",
    protocol: "ICH_03",
    techs: [
      { name: "Python", icon: SiPython, color: "#3776AB", status: "CORE" },
      { name: "OpenAI", icon: SiOpenai, color: "#412991", status: "SYNC" },
      { name: "PyTorch", icon: SiPytorch, color: "#EE4C2C", status: "HIGH" },
      { name: "LangChain", icon: SiLangchain, color: "#00A0DC", status: "SYNC" },
      { name: "Docker", icon: SiDocker, color: "#2496ED", status: "SYNC" },
      { name: "Vercel", icon: SiVercel, color: "#FFFFFF", status: "SYNC" },
    ],
  },
  {
    name: "Toolchain Protocols",
    protocol: "TCP_04",
    techs: [
      { name: "Git", icon: SiGit, color: "#F05032", status: "SAFE" },
      { name: "GitHub", icon: SiGithub, color: "#FFFFFF", status: "SYNC" },
      { name: "Postman", icon: SiPostman, color: "#FF6C37", status: "SYNC" },
    ],
  },
];

const TechChip = ({ tech, delay }: { tech: any; delay: number }) => {
  const Icon = tech.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -5, scale: 1.05 }}
      aria-label={`Technology: ${tech.name}`}
      className="group relative p-4 rounded-xl border border-white/5 bg-white/2 backdrop-blur-md flex flex-col items-center justify-center gap-3 hover:border-[#00D1FF]/30 transition-all duration-500 cursor-pointer overflow-hidden shadow-[0_0_15px_rgba(0,209,255,0.05)]"
    >
      {/* Holographic Scan Overlay */}
      <motion.div
        animate={{ top: ["-100%", "100%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 h-full bg-linear-to-b from-transparent via-[#00D1FF]/5 to-transparent z-10 pointer-events-none opacity-0 group-hover:opacity-100"
      />

      {/* Tech Status Tag */}
      <div className="absolute top-2 right-2 text-[8px] font-mono text-zinc-600 group-hover:text-[#00FF41] uppercase tracking-widest px-1.5 py-0.5 rounded border border-white/5 bg-white/2 transition-colors">
        {tech.status}
      </div>

      {/* Radial Glow on Hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none rounded-xl"
        style={{ background: `radial-gradient(circle at center, ${tech.color} 0%, transparent 70%)` }}
      />

      <div className="relative z-20 transition-transform duration-500 group-hover:scale-110">
        <Icon className="w-8 h-8 md:w-10 md:h-10 text-white group-hover:text-white transition-colors" />
      </div>

      <span className="relative z-20 text-[10px] md:text-xs font-bold uppercase tracking-widest text-zinc-500 group-hover:text-white transition-colors">
        {tech.name}
      </span>

      {/* Decorative Corners for Technical Feel */}
      <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-white/10 group-hover:border-[#00D1FF]/40 transition-colors" />
      <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-white/10 group-hover:border-[#00D1FF]/40 transition-colors" />
    </motion.div>
  );
};

export default function TechStack() {
  return (
    <section className="relative w-full py-32 px-6 bg-[#030303] text-white overflow-hidden">

      {/* Performance Grid Overlay */}
      <CyberGrid />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/5 blur-[200px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header Block */}
        <div className="flex flex-col items-center text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mb-4 px-3 py-1 bg-white/5 border border-white/10 rounded-full"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#00FF41] animate-pulse" />
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Library_Sync // Neural_Assets_Detected</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-black mb-6 tracking-tighter"
          >
            Intelligence <span className="text-[#00D1FF]">Infrastructure</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-zinc-500 max-w-xl text-balance"
          >
            A high-performance collection of technologies optimized for autonomous agents,
            scalable AI products, and real-time data orchestration.
          </motion.p>
        </div>

        {/* Categorized Constellations */}
        <div className="flex flex-col gap-20">
          {techCategories.map((category, catIndex) => (
            <div key={catIndex} className="relative">
              {/* Category Metadata Header */}
              <div className="flex items-center gap-4 mb-10 border-l-2 border-[#00D1FF]/30 pl-4">
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.3em]">{category.protocol}</span>
                  <h3 className="text-xl md:text-2xl font-black uppercase text-zinc-100 tracking-tight">{category.name}</h3>
                </div>
              </div>

              {/* Staggered Chip Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
                {category.techs.map((tech, techIndex) => (
                  <TechChip
                    key={techIndex}
                    tech={tech}
                    delay={0.1 * techIndex}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Technical Footer Decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-32 pt-8 border-t border-white/5 flex flex-wrap justify-between items-center gap-4"
        >
          <div className="flex gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex flex-col gap-1">
                <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest">Core_Sync</span>
                <span className="text-[10px] font-mono text-[#00FF41]">ACTIVE_0{i}</span>
              </div>
            ))}
          </div>
          <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
            Database_Index: 0x9AF4B // Cache_Ready: 100%
          </div>
        </motion.div>

        {/* Hidden SEO Keywords */}
        <h2 className="sr-only">Elite Tech Stack for AI Product Engineering: Next.js, React, TypeScript, Node.js, Python, LangChain, OpenAI, and MongoDB. Modern AI SaaS and Autonomous Systems Tech.</h2>

      </div>
    </section>
  );
}
