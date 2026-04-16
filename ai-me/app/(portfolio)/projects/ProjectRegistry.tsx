"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  ExternalLink,
  Code,
  X,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  Box,
  Cpu,
  Terminal,
  Activity,
  RefreshCw,
  Monitor,
  Smartphone,
  Globe
} from "lucide-react";
import rajeshData from "@/data/rajesh.json";

const StatusBadge = ({ status }: { status: string }) => {
  const isLive = status === "LIVE" || status === "PRODUCTION";
  return (
    <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
      <div className={`w-1.5 h-1.5 rounded-full ${isLive ? "bg-green-500 animate-pulse" : "bg-zinc-500"}`} />
      <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">{status}</span>
    </div>
  );
};

export default function ProjectRegistry() {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"OVERVIEW" | "LIVE_SIMULATION">("OVERVIEW");
  const [isPreviewLoading, setIsPreviewLoading] = useState(true);
  const projects = rajeshData.projects;

  const handleOpenProject = (project: any) => {
    setSelectedProject(project);
    setActiveTab("OVERVIEW");
    setIsPreviewLoading(true);
  };

  return (
    <div className="max-w-7xl w-full mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group relative"
          >
            <div
              onClick={() => handleOpenProject(project)}
              className="glass-card rounded-[2.5rem] p-10 border border-white/5 bg-linear-to-br from-white/2 to-transparent hover:border-brand-purple/30 transition-all cursor-pointer h-full flex flex-col relative overflow-hidden group-hover:glow"
            >
              <div className="flex justify-between items-start mb-10 relative z-10">
                <StatusBadge status={project.status} />
                <div className="p-2.5 rounded-full bg-white/5 border border-white/5 group-hover:bg-brand-purple/20 group-hover:border-brand-purple/30 transition-all">
                  <ArrowUpRight className="w-5 h-5 text-zinc-500 group-hover:text-white" />
                </div>
              </div>

              <div className="relative z-10 mb-10">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-[0.4em]">Deployment.{i + 1}</span>
                </div>
                <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter mb-4 group-hover:text-brand-purple transition-colors">{project.name}</h3>
                <p className="text-zinc-400 text-sm font-medium leading-relaxed italic border-l-2 border-brand-purple/20 pl-4">{project.subtitle}</p>
              </div>

              <div className="mt-auto relative z-10">
                <div className="flex flex-wrap gap-2">
                  {project.tech.slice(0, 3).map(t => (
                    <span key={t} className="px-3 py-1 rounded-md text-[8px] font-mono border border-white/5 text-zinc-600 uppercase tracking-widest group-hover:border-white/10 transition-colors">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Decorative Blueprint Background */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.02] group-hover:opacity-[0.05] transition-opacity pointer-events-none">
                <div className="w-full h-full" style={{
                  backgroundImage: `linear-gradient(to right, #8B5CF6 1px, transparent 1px), linear-gradient(to bottom, #8B5CF6 1px, transparent 1px)`,
                  backgroundSize: '20px 20px'
                }} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal Deep Dive */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-200 flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-3xl"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              className="relative w-full max-w-6xl glass-card rounded-[3rem] bg-[#030303]/90 border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-8 right-8 z-50 p-3 rounded-full bg-white/5 border border-white/10 text-zinc-500 hover:text-white transition-all shadow-xl"
              >
                <X size={20} />
              </button>

              <div className="p-8 md:p-14 lg:p-20">
                {/* Modal Header & Navigation */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 border-b border-white/5 pb-12">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-purple animate-pulse" />
                      <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-zinc-500">Mission Registry : Verified</span>
                    </div>
                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white italic uppercase tracking-tighter mb-6 leading-none">
                      {selectedProject.name}
                    </h2>
                    <p className="text-zinc-400 text-base md:text-xl font-medium max-w-2xl border-l-4 border-brand-purple/40 pl-6 leading-relaxed italic">
                      {selectedProject.description}
                    </p>
                  </div>

                  {/* Tab Switcher */}
                  <div className="flex p-1.5 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl w-fit h-fit self-start lg:self-end">
                    {[
                      { id: "OVERVIEW", label: "Strategic Overview", icon: Terminal },
                      { id: "LIVE_SIMULATION", label: "Live Simulation", icon: Globe }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`flex items-center gap-2.5 px-6 py-2.5 rounded-xl text-[10px] font-mono uppercase tracking-widest transition-all relative ${activeTab === tab.id ? "text-white" : "text-zinc-500 hover:text-zinc-400"}`}
                      >
                        {activeTab === tab.id && (
                          <motion.div
                            layoutId="active-modal-tab"
                            className="absolute inset-0 bg-brand-purple/20 border border-brand-purple/30 rounded-xl"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                          />
                        )}
                        <tab.icon size={13} className="relative z-10" />
                        <span className="relative z-10">{tab.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {activeTab === "OVERVIEW" ? (
                    <motion.div
                      key="overview"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* PSI Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        <div className="p-8 rounded-[2.5rem] bg-white/2 border border-white/5 space-y-4">
                          <Terminal size={18} className="text-brand-purple opacity-50 mb-2" />
                          <h4 className="text-[10px] font-mono uppercase tracking-[0.3em] text-red-500/70">The Problem</h4>
                          <p className="text-zinc-400 text-sm font-medium italic leading-relaxed line-clamp-4 hover:line-clamp-none transition-all">{selectedProject.problem}</p>
                        </div>
                        <div className="p-8 rounded-[2.5rem] bg-brand-purple/5 border border-brand-purple/10 space-y-4">
                          <Cpu size={18} className="text-brand-purple mb-2" />
                          <h4 className="text-[10px] font-mono uppercase tracking-[0.3em] text-brand-purple">The Solution</h4>
                          <p className="text-zinc-200 text-sm font-medium italic leading-relaxed line-clamp-4 hover:line-clamp-none transition-all">{selectedProject.solution}</p>
                        </div>
                        <div className="p-8 rounded-[2.5rem] bg-white/2 border border-white/5 space-y-4">
                          <Activity size={18} className="text-brand-blue opacity-50 mb-2" />
                          <h4 className="text-[10px] font-mono uppercase tracking-[0.3em] text-brand-blue">The Impact</h4>
                          <p className="text-zinc-400 text-sm font-medium italic leading-relaxed line-clamp-4 hover:line-clamp-none transition-all">{selectedProject.impact}</p>
                        </div>
                      </div>

                      {/* Stack Detail */}
                      <div className="flex flex-wrap gap-3 justify-start mb-16 py-8 border-y border-white/5">
                        {selectedProject.tech.map((t: string) => (
                          <div key={t} className="group flex items-center gap-3 px-6 py-3 rounded-2xl border border-white/5 bg-white/2 hover:border-brand-purple/30 transition-all">
                            <Box size={14} className="text-zinc-600 group-hover:text-brand-purple transition-colors" />
                            <span className="text-[10px] font-mono text-zinc-500 group-hover:text-zinc-200 uppercase tracking-widest">{t}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="preview"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      className="mb-16"
                    >
                      {/* Premium Browser Frame */}
                      <div className="relative rounded-3xl border border-white/10 bg-[#070707] shadow-[0_0_80px_rgba(0,0,0,0.5)] overflow-hidden group/browser">
                        {/* Browser Chrome */}
                        <div className="flex items-center justify-between px-6 py-4 bg-white/2 border-b border-white/5 backdrop-blur-md">
                          <div className="flex items-center gap-6">
                            {/* Window Buttons */}
                            <div className="flex gap-2">
                              <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/40" />
                              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/40" />
                              <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/40" />
                            </div>
                            {/* URL Bar */}
                            <div className="hidden md:flex items-center gap-3 px-5 py-1.5 rounded-full bg-black/40 border border-white/5 min-w-[300px]">
                              <Globe size={11} className="text-zinc-600" />
                              <span className="text-[10px] font-mono text-zinc-500 truncate lowercase">{selectedProject.link || 'https://localhost:3000'}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <button
                              onClick={() => { setIsPreviewLoading(true); }}
                              className="p-2 rounded-lg hover:bg-white/5 text-zinc-500 transition-colors"
                            >
                              <RefreshCw size={14} className={isPreviewLoading ? "animate-spin" : ""} />
                            </button>
                            <div className="w-px h-4 bg-white/5 mx-1" />
                            <div className="flex items-center gap-2 opacity-50 group-hover/browser:opacity-100 transition-opacity">
                              <Monitor size={14} className="text-brand-purple" />
                              <div className="w-4 h-px bg-white/10" />
                              <Smartphone size={14} className="text-zinc-600" />
                            </div>
                          </div>
                        </div>

                        {/* Iframe Content */}
                        <div className="relative aspect-16/10 md:aspect-video bg-zinc-900 overflow-hidden">
                          {isPreviewLoading && (
                            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#070707] gap-6">
                              <div className="relative">
                                <div className="w-16 h-16 rounded-full border-2 border-brand-purple/20 border-t-brand-purple animate-[spin_2s_linear_infinite]" />
                                <Cpu className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-brand-purple w-6 h-6 animate-pulse" />
                              </div>
                              <div className="flex flex-col items-center gap-2">
                                <span className="text-[10px] font-mono text-brand-purple uppercase tracking-[0.4em] animate-pulse">Initializing.Simulation</span>
                                <span className="text-[8px] font-mono text-zinc-700 uppercase">Protocol: Ready // Link: Secure</span>
                              </div>
                            </div>
                          )}
                          <iframe
                            src={selectedProject.link}
                            className={`w-full h-full transition-opacity duration-700 ${isPreviewLoading ? 'opacity-0' : 'opacity-100'}`}
                            onLoad={() => setIsPreviewLoading(false)}
                            title={`Live Preview of ${selectedProject.name}`}
                            sandbox="allow-scripts allow-same-origin allow-forms"
                          />

                          {/* Floating Overlay for Security/Interaction */}
                          {!isPreviewLoading && (
                            <div className="absolute bottom-6 right-6 p-4 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-md opacity-0 translate-y-4 group-hover/browser:opacity-100 group-hover/browser:translate-y-0 transition-all pointer-events-none">
                              <p className="text-[8px] font-mono text-purple-400 uppercase tracking-widest whitespace-nowrap">Integrated Simulation v2.0</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Global Actions */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-12 pt-12 border-t border-white/5">
                  <div className="flex flex-col gap-2">
                    <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest text-center md:text-left">Network Access</span>
                    <div className="flex gap-4">
                      {selectedProject.link && (
                        <a
                          href={selectedProject.link}
                          target="_blank"
                          className="px-10 py-5 rounded-full bg-white text-black font-black uppercase tracking-widest text-xs hover:scale-105 transition-all flex items-center gap-3 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                        >
                          Launch Platform <ExternalLink size={16} />
                        </a>
                      )}
                      {selectedProject.github && (
                        <a
                          href={selectedProject.github}
                          target="_blank"
                          className="px-8 py-5 rounded-full border border-white/10 bg-white/5 text-white font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all flex items-center gap-3"
                        >
                          Source <Code size={18} />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Status Indicator */}
                  <div className="flex items-center gap-10">
                    <div className="hidden lg:flex flex-col items-end gap-1">
                      <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">Protocol.Health</span>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        <span className="text-[10px] font-mono text-zinc-400 uppercase">Synchronized</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
