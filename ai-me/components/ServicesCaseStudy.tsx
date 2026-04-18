"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cpu,
  Layers,
  Workflow,
  Globe,
  Rocket,
  Search,
  ChevronRight,
  ShieldAlert,
  Lightbulb,
  Zap,
  Activity,
  Terminal,
} from "lucide-react";
import CyberGrid from "./CyberGrid";

const services = [
  {
    icon: Cpu,
    title: "AI Product Development",
    short: "Transforming ideas into intelligent systems.",
    problem: "Businesses struggle to leverage AI effectively, often facing integration hurdles and data complexity.",
    solution: "I architect custom AI-powered applications using scalable neural systems and LLM orchestration.",
    impact: "Reduces manual operation time by up to 70% and enables automated precision decision-making.",
    metadata: { class: "Neural_Engine", priority: "Lvl_01" },
  },
  {
    icon: Layers,
    title: "SaaS Product Engineering",
    short: "High-performance SaaS platforms.",
    problem: "Poor architecture leading to slow performance and an inability to scale as users grow.",
    solution: "Full-stack development with a focus on 'Scale-Ready' architecture using modern cloud-native frameworks.",
    impact: "Provides a robust, multi-tenant foundation capable of handling 100k+ requests without latency.",
    metadata: { class: "SaaS_Core", priority: "Lvl_02" },
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    short: "Zero-touch operations.",
    problem: "Manual repetitive work across fragmented tools wastes hundreds of dev-hours monthly.",
    solution: "Developing autonomous agents and API-first pipelines to connect disparate software ecosystems.",
    impact: "Saves high-level team bandwidth and virtually eliminates human error in technical operations.",
    metadata: { class: "Auto_Pilot", priority: "Lvl_01" },
  },
  {
    icon: Globe,
    title: "Full Stack Systems",
    short: "Modern cloud-first apps.",
    problem: "Monolithic, bloated applications that hurt UX and are difficult to maintain or update.",
    solution: "Modular frontend + backend systems designed for speed, security, and developer productivity.",
    impact: "Improved developer velocity and a 99.9% uptime for business-critical user experiences.",
    metadata: { class: "Stack_Sync", priority: "Lvl_03" },
  },
  {
    icon: Rocket,
    title: "Performance Optimization",
    short: "Ultra-fast reliability.",
    problem: "User attrition caused by slow interaction speeds and suboptimal resource allocation.",
    solution: "Deep-dive optimization of database queries, API latency, and frontend rendering pipelines.",
    impact: "Significant boost in user retention and lower infrastructure overhead through efficiency.",
    metadata: { class: "Optix_Core", priority: "Lvl_02" },
  },
  {
    icon: Search,
    title: "SEO & Visibility",
    short: "Search-engine ready apps.",
    problem: "High-quality products failing to gain traction due to poor search visibility and indexing issues.",
    solution: "Semantic HTML architecture and performance-focused SEO structure built directly into the codebase.",
    impact: "Increased organic reach and zero-cost user acquisition from day one of launch.",
    metadata: { class: "Visi_Pulse", priority: "Lvl_03" },
  },
];

const TechnicalLabel = ({ label, value, color }: { label: string; value: string; color: string }) => (
  <div className="flex flex-col gap-1">
    <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">{label}</span>
    <span className={`text-xs font-mono ${color} uppercase tracking-tight`}>{value}</span>
  </div>
);

export default function ServicesCaseStudy() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative py-16 md:py-32 px-4 md:px-6 bg-[#030303] text-white overflow-hidden">
      
      {/* Visual Identity Layers */}
      <CyberGrid />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-linear-to-b from-[#00D1FF]/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 md:mb-20 border-b border-white/5 pb-12">
            <div className="max-w-2xl">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3 mb-4"
                >
                    <Terminal className="w-4 h-4 text-[#00D1FF]" />
                    <span className="text-xs font-mono text-zinc-500 uppercase tracking-[0.4em]">Resource Matrix // Case Study Hub</span>
                </motion.div>
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-6xl font-black tracking-tight"
                >
                    Technical <span className="text-[#00D1FF]">Service</span> Solutions
                </motion.h2>
            </div>
            <div className="flex gap-6 md:gap-8">
                 <TechnicalLabel label="System_Status" value="Optimized" color="text-[#00FF41]" />
                 <TechnicalLabel label="Load_Priority" value="Lvl_01" color="text-[#00D1FF]" />
            </div>
        </div>

        {/* The AI Console Layout */}
        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Left Column: Interactive Selectors (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            {services.map((service, i) => {
              const Icon = service.icon;
              const isActive = active === i;
              
              return (
                <motion.button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`View details for ${service.title}`}
                  className={`w-full group flex items-start gap-4 md:gap-5 p-5 md:p-6 rounded-2xl border transition-all duration-500 text-left relative overflow-hidden
                    ${isActive 
                        ? "bg-[#00D1FF]/5 border-[#00D1FF]/40 shadow-[0_0_30px_rgba(0,186,255,0.1)]" 
                        : "bg-white/2 border-white/5 hover:border-white/20"}`}
                >
                    {/* Active Glow Ornament */}
                    <AnimatePresence>
                        {isActive && (
                            <motion.div 
                                layoutId="active-indicator"
                                className="absolute left-0 top-0 bottom-0 w-1 bg-[#00D1FF] shadow-[0_0_15px_rgba(0,209,255,0.8)]"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            />
                        )}
                    </AnimatePresence>

                    <div className={`p-3 rounded-xl transition-colors duration-500 
                        ${isActive ? "bg-[#00D1FF]/10 text-[#00D1FF]" : "bg-white/5 text-zinc-500 group-hover:text-[#00D1FF]"}`}>
                        <Icon className="w-5 h-5" />
                    </div>

                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                            <h3 className={`text-base md:text-lg font-bold transition-colors ${isActive ? "text-white" : "text-zinc-400 group-hover:text-white"}`}>
                                {service.title}
                            </h3>
                            <ChevronRight className={`w-4 h-4 transition-all duration-300 ${isActive ? "translate-x-0 opacity-100 text-[#00D1FF]" : "-translate-x-2 opacity-0 text-zinc-600"}`} />
                        </div>
                        <p className="text-[10px] md:text-xs text-zinc-500 leading-relaxed max-w-full md:max-w-[280px]">
                            {service.short}
                        </p>
                    </div>

                    {/* Technical Metadata on Card */}
                    <div className="absolute right-4 bottom-4 flex gap-1 items-end overflow-hidden">
                        {[1,2,3,4].map(bar => (
                            <div 
                                key={bar} 
                                className={`w-1 rounded-full transition-all duration-500 ${isActive ? "bg-[#00D1FF]" : "bg-zinc-800"}`}
                                style={{ height: isActive ? 2 * bar + "px" : "2px" }}
                            />
                        ))}
                    </div>
                </motion.button>
              );
            })}
          </div>

          {/* Right Column: The Intelligence Hub (7 Cols) */}
          <div className="lg:col-span-7 h-full">
            <div className="sticky top-32">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={active}
                        initial={{ opacity: 0, scale: 0.98, x: 20 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.98, x: -20 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="relative h-full"
                    >
                        {/* The Large Visualization Container */}
                        <div className="bg-white/2 border border-white/5 rounded-3xl p-6 md:p-8 lg:p-12 relative overflow-hidden backdrop-blur-3xl min-h-fit md:min-h-[500px]">
                            
                            {/* Scanning Light Effect */}
                            <motion.div 
                                animate={{ top: ["-10%", "110%"] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                className="absolute left-0 right-0 h-20 bg-linear-to-b from-transparent via-[#00D1FF]/10 to-transparent z-20 pointer-events-none"
                            />
+
                            {/* Section: Dashboard Header */}
                            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-6 mb-10 md:mb-12 border-b border-white/5 pb-8">
                                <div className="space-y-2">
                                    <h4 className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.4em]">Selected_Vector</h4>
                                    <h3 className="text-2xl md:text-3xl font-black uppercase text-[#00D1FF] leading-tight">{services[active].title}</h3>
                                </div>
                                <div className="flex items-center gap-6">
                                     <TechnicalLabel label="Metadata_Class" value={services[active].metadata.class} color="text-zinc-400" />
                                     <TechnicalLabel label="Load_Priority" value={services[active].metadata.priority} color="text-zinc-400" />
                                </div>
                            </div>

                            {/* Section: Problem/Solution Grid */}
                            <div className="space-y-10 md:space-y-12">
                                <section className="relative group">
                                     <div className="flex gap-4 mb-3 items-center">
                                         <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center border border-red-500/20">
                                            <ShieldAlert className="w-4 h-4 text-red-400" />
                                         </div>
                                         <h5 className="font-mono text-zinc-300 text-[10px] md:text-xs uppercase tracking-widest">Problem_Assessment</h5>
                                     </div>
                                     <p className="text-zinc-400 leading-relaxed pl-10 md:pl-12 text-base md:text-lg">
                                        {services[active].problem}
                                     </p>
                                </section>

                                <section className="relative group">
                                     <div className="flex gap-4 mb-3 items-center">
                                         <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                                            <Lightbulb className="w-4 h-4 text-cyan-400" />
                                         </div>
                                         <h5 className="font-mono text-zinc-300 text-[10px] md:text-xs uppercase tracking-widest">Applied_Engineering</h5>
                                     </div>
                                     <p className="text-zinc-400 leading-relaxed pl-10 md:pl-12 text-base md:text-lg">
                                        {services[active].solution}
                                     </p>
                                </section>

                                <section className="relative group">
                                     <div className="flex gap-4 mb-3 items-center">
                                         <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center border border-green-500/20">
                                            <Activity className="w-4 h-4 text-green-400" />
                                         </div>
                                         <h5 className="font-mono text-zinc-300 text-[10px] md:text-xs uppercase tracking-widest">Performance_Impact</h5>
                                     </div>
                                     <p className="text-[#00FF41]/70 leading-relaxed pl-10 md:pl-12 text-base md:text-lg font-medium italic">
                                        &quot;{services[active].impact}&quot;
                                     </p>
                                </section>
                            </div>

                            {/* Section: Dashboard Footer Decoration */}
                            <div className="mt-12 pt-8 border-t border-white/5 flex justify-between items-center">
                                <div className="flex gap-4">
                                    {[1,2,3].map(i => (
                                        <div key={i} className="w-2 h-2 rounded-full border border-white/20" />
                                    ))}
                                </div>
                                <span className="text-[10px] font-mono text-zinc-600 uppercase">Analysis_Ready_v4.0.2</span>
                            </div>

                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
          </div>

        </div>

        {/* Hidden SEO Context */}
        <h2 className="sr-only">Comprehensive AI Product Engineering, High-Performance SaaS Development, and Intelligent Automation Services Case Studies. Expertise in LLM orchestration, scalable architecture, and autonomous workflows.</h2>

      </div>
    </section>
  );
}