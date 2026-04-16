"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import rajeshData from "@/data/rajesh.json";
import * as Icons from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const SkillIcon = ({ name, className }: { name: string; className?: string }) => {
  const IconComponent = (Icons as any)[name];
  return IconComponent ? <IconComponent className={className} /> : <Icons.Code className={className} />;
};

const ProjectSkeleton = () => (
  <div className="glass-card rounded-[2rem] p-8 border border-white/5 h-[300px] relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" 
         style={{ animation: 'shimmer 2s infinite' }} 
    />
    <div className="flex justify-between mb-6">
      <div className="w-24 h-6 bg-white/5 rounded-full" />
      <div className="w-6 h-6 bg-white/5 rounded-full" />
    </div>
    <div className="w-3/4 h-8 bg-white/5 rounded-lg mb-4" />
    <div className="w-full h-4 bg-white/5 rounded-lg mb-2" />
    <div className="w-2/3 h-4 bg-white/5 rounded-lg mb-10" />
    <div className="flex gap-2">
      <div className="w-12 h-4 bg-white/5 rounded-md" />
      <div className="w-12 h-4 bg-white/5 rounded-md" />
    </div>
  </div>
);

export default function ExpertiseGrid() {
  const [activeTab, setActiveTab] = useState("frontend");
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const skillsData = (rajeshData as any).skills_tabs;
  const projects = rajeshData.projects;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const categories = [
    { id: "frontend", label: "Frontend", icon: "Layout" },
    { id: "backend", label: "Backend", icon: "Server" },
    { id: "ai_automation", label: "AI & Automation", icon: "Brain" },
    { id: "tools", label: "Tools", icon: "Wrench" },
  ];

  return (
    <section className="w-full py-24 px-8 flex flex-col items-center bg-bg-dark overflow-hidden">
      <div className="max-w-7xl w-full">
        
        {/* ─── PART A: SKILLS ────────────────────────────────────────────────── */}
        <div className="mb-32">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-7xl font-black mb-6 tracking-tighter italic">Technical <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00D1FF] to-[#00FF41]">Arsenal.</span></h2>
              <p className="text-zinc-500 font-medium max-w-xl mx-auto italic">No progress bars. Just real-world expertise applied to production-grade AI systems.</p>
            </div>
          </ScrollReveal>

          {/* Tabs Navigation */}
          <ScrollReveal delay={0.2}>
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  aria-label={`View ${cat.label} skills`}
                  className={`relative px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all overflow-hidden active:scale-95 ${
                    activeTab === cat.id ? "text-white" : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  <div className="flex items-center gap-2 relative z-10">
                    <SkillIcon name={cat.icon} className="w-3.5 h-3.5" />
                    {cat.label}
                  </div>
                  {activeTab === cat.id && (
                    <motion.div
                      layoutId="active-tab-indicator"
                      className="absolute inset-0 bg-[#00D1FF]/10 border border-[#00D1FF]/30 rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Skills Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {skillsData[activeTab].map((skill: any, idx: number) => (
                <motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                  className="p-8 rounded-[2rem] glass-card border border-white/5 hover:border-white/10 group transition-all"
                >
                  <div className="flex items-start gap-5">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-[#00D1FF]/10 group-hover:border-[#00D1FF]/20 transition-all duration-300">
                      <SkillIcon name={skill.icon} className="w-6 h-6 text-[#00D1FF]" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg mb-1">{skill.name}</h4>
                      <p className="text-[10px] uppercase font-black tracking-widest text-zinc-500 leading-tight group-hover:text-[#00FF41] transition-colors">{skill.usage}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* ─── PART B: PROJECTS ──────────────────────────────────────────────── */}
        <div>
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-7xl font-black mb-6 tracking-tighter italic">Featured <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00D1FF] to-[#00FF41]">Creations.</span></h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="wait">
              {isLoading ? (
                Array(6).fill(0).map((_, i) => (
                  <motion.div
                    key={`skeleton-${i}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <ProjectSkeleton />
                  </motion.div>
                ))
              ) : (
                projects.map((project, idx) => (
                  <ScrollReveal key={project.name} delay={idx * 0.1}>
                    <motion.div
                      whileHover={{ y: -10 }}
                      onClick={() => setSelectedProject(project)}
                      aria-label={`View details for ${project.name}`}
                      className="group cursor-pointer glass-card rounded-[2.5rem] p-10 border border-white/5 hover:border-white/10 flex flex-col h-full bg-gradient-to-br from-white/5 to-transparent relative overflow-hidden"
                    >
                      <div className="relative z-10">
                        <div className="flex justify-between items-start mb-8">
                          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#00FF41] px-4 py-1.5 rounded-full bg-[#00FF41]/10 border border-[#00FF41]/20">
                            {project.status}
                          </span>
                          <div className="p-2 rounded-full bg-white/5 group-hover:bg-[#00D1FF]/20 group-hover:text-white transition-all text-zinc-600">
                            <Icons.ArrowUpRight size={18} />
                          </div>
                        </div>
                        
                        <h3 className="text-3xl font-black text-white mb-3 tracking-tighter transition-all group-hover:translate-x-1">{project.name}</h3>
                        <p className="text-zinc-500 text-base font-medium mb-10 line-clamp-2 italic leading-relaxed">{project.subtitle || project.description}</p>
                        
                        <div className="mt-auto flex flex-wrap gap-2">
                          {project.tech.slice(0, 3).map((t, i) => (
                            <span key={i} className="text-[9px] font-black text-zinc-400 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 uppercase tracking-tighter">
                              {t}
                            </span>
                          ))}
                          {project.tech.length > 3 && <span className="text-[9px] font-black text-zinc-600">+{project.tech.length - 3}</span>}
                        </div>
                      </div>

                      <div className="absolute -bottom-8 -right-8 opacity-[0.03] group-hover:opacity-[0.08] transition-all duration-500 group-hover:scale-110 group-hover:-rotate-12">
                        <Icons.Code2 size={180} />
                      </div>
                    </motion.div>
                  </ScrollReveal>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ─── PROJECT MODAL ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-8 lg:p-12 bg-black/95 backdrop-blur-3xl overflow-y-auto"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              layoutId={`project-${selectedProject.name}`}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-6xl glass-card rounded-[2.5rem] md:rounded-[3.5rem] bg-[#0B0B0F]/90 border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden"
              onClick={e => e.stopPropagation()}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              onDragEnd={(_, info) => {
                if (info.offset.y > 150) setSelectedProject(null);
              }}
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-8 right-8 z-50 p-4 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-white transition-all shadow-xl backdrop-blur-md active:scale-90"
              >
                <Icons.X size={24} />
              </button>

              <div className="flex flex-col h-full lg:max-h-[90vh] overflow-y-auto custom-scrollbar">
                {/* Modal Header */}
                <div className="p-8 md:p-20 pb-0">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#00FF41]">{selectedProject.status}</span>
                  </div>
                  <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-6 leading-none italic">{selectedProject.name}</h2>
                  <p className="text-zinc-400 text-lg md:text-2xl font-medium max-w-3xl italic leading-relaxed">{selectedProject.description}</p>
                </div>

                <div className="p-8 md:p-20 pt-12 space-y-20">
                  {/* PSI Breakdown (3-Column) */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-10 rounded-[2rem] bg-white/5 border border-white/5 group hover:bg-white/10 transition-colors">
                      <h4 className="text-[10px] uppercase font-black text-zinc-500 tracking-[0.4em] mb-6 flex items-center gap-2">
                        <Icons.AlertCircle size={12} className="text-red-500" /> The Problem
                      </h4>
                      <p className="text-base text-zinc-300 leading-relaxed italic">{selectedProject.problem}</p>
                    </div>
                    <div className="p-10 rounded-[2rem] bg-[#00FF41]/5 border border-[#00FF41]/10 group hover:bg-[#00FF41]/10 transition-colors">
                      <h4 className="text-[10px] uppercase font-black text-[#00FF41] tracking-[0.4em] mb-6 flex items-center gap-2">
                        <Icons.CheckCircle2 size={12} className="text-[#00FF41]" /> The Solution
                      </h4>
                      <p className="text-base text-zinc-200 leading-relaxed italic">{selectedProject.solution}</p>
                    </div>
                    <div className="p-10 rounded-[2rem] bg-[#00D1FF]/5 border border-[#00D1FF]/10 group hover:bg-[#00D1FF]/10 transition-colors">
                      <h4 className="text-[10px] uppercase font-black text-[#00D1FF] tracking-[0.4em] mb-6 flex items-center gap-2">
                        <Icons.TrendingUp size={12} className="text-[#00D1FF]" /> The Impact
                      </h4>
                      <p className="text-base text-zinc-300 leading-relaxed italic">{selectedProject.impact}</p>
                    </div>
                  </div>

                  {/* Tech Stack Chips */}
                  <div className="space-y-6">
                    <h4 className="text-[10px] uppercase font-black text-zinc-600 tracking-[0.4em]">Engineered with</h4>
                    <div className="flex flex-wrap gap-3">
                       {selectedProject.tech.map((t: string) => (
                         <span key={t} className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest text-white hover:border-[#00D1FF]/50 transition-colors cursor-default">
                           {t}
                         </span>
                       ))}
                    </div>
                  </div>

                  {/* Live Preview Iframe */}
                  {selectedProject.link && (
                    <div className="space-y-8">
                      <div className="flex items-center justify-between border-b border-white/5 pb-4">
                         <h4 className="text-[10px] uppercase font-black text-zinc-500 tracking-[0.4em]">Browser Preview</h4>
                         <p className="text-[10px] text-zinc-600 italic uppercase font-black tracking-widest">Active Simulation</p>
                      </div>
                      <div className="w-full h-[500px] rounded-[3rem] border border-white/10 overflow-hidden bg-[#050507] relative shadow-2xl">
                         <iframe 
                           src={selectedProject.link} 
                           className="w-full h-full opacity-60 hover:opacity-100 transition-opacity grayscale-[0.3] hover:grayscale-0"
                           title={selectedProject.name}
                         />
                         <div className="absolute inset-0 pointer-events-none border-[16px] border-[#0B0B0F]" />
                         <div className="absolute top-0 left-0 right-0 h-8 bg-[#1A1A24] border-b border-white/5 flex items-center px-4 gap-2">
                            <div className="flex gap-1.5">
                              <div className="w-2 h-2 rounded-full bg-red-500/50" />
                              <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                              <div className="w-2 h-2 rounded-full bg-green-500/50" />
                            </div>
                         </div>
                      </div>
                    </div>
                  )}

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-6 pb-20">
                    {selectedProject.link && (
                      <a 
                        href={selectedProject.link} 
                        target="_blank"
                        className="flex-1 flex items-center justify-center gap-4 py-6 rounded-[2rem] bg-white text-black font-black uppercase text-xs tracking-[0.2em] hover:scale-[1.05] active:scale-[0.97] transition-all shadow-2xl shimmer-btn"
                      >
                        Visit Experience <Icons.ExternalLink size={18} />
                      </a>
                    )}
                    {selectedProject.github && (
                      <a 
                        href={selectedProject.github} 
                        target="_blank"
                        className="flex-1 flex items-center justify-center gap-4 py-6 rounded-[2rem] glass-card border border-white/10 text-white font-black uppercase text-xs tracking-[0.2em] hover:scale-[1.05] active:scale-[0.97] transition-all hover:glow shadow-2xl"
                      >
                        Code Artifact <Icons.Code size={18} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <h2 className="sr-only">Elite Technical Expertise in AI Engineering, Full Stack Development, and Autonomous Systems. Featured projects showcasing AI solutions, SaaS products, and high-performance automation.</h2>
    </section>
  );
}
