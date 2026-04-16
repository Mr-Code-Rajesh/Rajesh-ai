"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Cpu,
  Code2,
  Mail,
  Terminal,
  Activity,
  Target,
  Globe,
  Settings,
  ShieldCheck,
} from "lucide-react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import CyberGrid from "./CyberGrid";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Projects", path: "/projects" }, // Updated to dedicated projects page
  { name: "Services", path: "#services" }, // Updated to anchor
  { name: "Contact Hub", path: "#contact" }, // Updated to anchor
];

const featuredProjects = [
  { name: "LucidExtractor", href: "#" },
  { name: "AI Agent Framework", href: "#" },
  { name: "Neural Dashboard", href: "#" },
];

const marqueeTop = [
  "AUTONOMOUS_OPERATIONS",
  "SCALABLE_ARCHITECTURE",
  "NEURAL_INTERFACES",
  "DATA_ORCHESTRATION",
  "SYSTEM_OPTIMIZATION",
];

const seoKeywords = [
  "AI Full Stack", "SaaS Engineering", "Next.js 14", "Tailwind CSS v4",
  "LLM Orchestration", "Node.js Backend", "Python ML", "Cloud Native",
  "Automation Architect", "React Specialist", "Product Builder", "UI/UX Strategy"
];

const StatusItem = ({ label, value, color }: { label: string; value: string; color: string }) => (
  <div className="flex flex-col gap-1">
    <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">{label}</span>
    <div className="flex items-center gap-2">
      <div className={`w-1 h-1 rounded-full ${color} animate-pulse`} />
      <span className="text-[10px] font-mono text-zinc-400 uppercase">{value}</span>
    </div>
  </div>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-[#030303] border-t border-white/5 pt-24 pb-12 overflow-hidden">

      {/* Infrastructure Layers */}
      <CyberGrid />
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-[#00D1FF]/30 to-transparent" />

      {/* Massive Backdrop Branding */}
      <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15rem] md:text-[25rem] font-black text-white/2 select-none pointer-events-none tracking-tighter uppercase whitespace-nowrap">
        Rajesh.Code
      </h2>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Double-Opposing Marquee (Top) */}
        <div className="mb-24 py-3 border-y border-white/5 overflow-hidden whitespace-nowrap">
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
            className="flex items-center gap-16"
          >
            {[...Array(4)].map((_, i) => (
              <React.Fragment key={i}>
                {marqueeTop.map((item, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-zinc-700 flex items-center gap-6"
                  >
                    <Target className="w-3 h-3 text-[#00D1FF]/40" /> {item}
                  </span>
                ))}
              </React.Fragment>
            ))}
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12">

          {/* Column 1: Identity & Status */}
          <div className="lg:col-span-5 space-y-10">
            <div className="space-y-6">
              <Link href="/" className="inline-block" aria-label="Go to Home">
                <span className="text-3xl font-black italic tracking-tighter text-transparent bg-clip-text bg-linear-to-r from-white via-[#00D1FF] to-white/40">
                  rajesh.code
                </span>
              </Link>
              <p className="text-zinc-500 text-sm max-w-sm leading-relaxed text-balance italic">
                &quot;Building the intelligent glue that Connects AI with scalable business outcomes. Precision engineered for the product-first era.&quot;
              </p>
            </div>

            {/* System Status Dashboard */}
            <div className="p-6 rounded-2xl border border-white/5 bg-white/2 backdrop-blur-md grid grid-cols-2 gap-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                <Settings className="w-12 h-12 text-purple-500 animate-[spin_10s_linear_infinite]" />
              </div>
              <StatusItem label="System_Health" value="OPTIMIZED" color="bg-[#00FF41]" />
              <StatusItem label="Response_Sync" value="12ms_Latency" color="bg-[#00D1FF]" />
              <StatusItem label="Focus_Target" value="AI_SaaS_2026" color="bg-purple-500" />
              <StatusItem label="Current_Load" value="99.9%_Uptime" color="bg-[#00FF41]" />
            </div>

            {/* Professional Ports (Social) */}
            <div className="flex items-center gap-3">
              {[
                { icon: FaLinkedin, href: "https://linkedin.com/in/rajesh-panda", label: "LINKED_IN" },
                { icon: FaGithub, href: "https://github.com/rajesh-dev", label: "GIT_HUB" },
                { icon: Mail, href: "mailto:rajesh@example.com", label: "EMAIL_PORT" },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit my ${social.label}`}
                  whileHover={{ y: -3, scale: 1.05 }}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/5 text-zinc-500 hover:text-white transition-all group"
                >
                  <social.icon className="w-3.5 h-3.5 group-hover:text-[#00D1FF]" />
                  <span className="text-[9px] font-mono uppercase tracking-widest">{social.label}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Column 2: Sitemap (Navigation) */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center gap-3">
              <Terminal className="w-3 h-3 text-[#00D1FF]" />
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600">Sitemap_Root</h4>
            </div>
            <ul className="space-y-5">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    aria-label={`Navigate to ${link.name}`}
                    className="text-zinc-500 hover:text-white transition-all text-xs flex items-center gap-2 group uppercase font-bold"
                  >
                    <span className="w-0 h-px bg-[#00D1FF] group-hover:w-4 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Featured Infrastructure */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center gap-3">
              <Cpu className="w-3 h-3 text-[#00FF41]" />
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600">Featured_Engines</h4>
            </div>
            <ul className="space-y-5">
              {featuredProjects.map((item, i) => (
                <li key={i}>
                  <Link
                    href={item.href}
                    aria-label={`Explore project ${item.name}`}
                    className="text-zinc-500 hover:text-white transition-all text-xs flex items-center gap-2 group uppercase font-bold"
                  >
                    <Code2 className="w-3 h-3 text-zinc-800 group-hover:text-[#00FF41] transition-colors" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Final Call (Build Card) */}
          <div className="lg:col-span-3 space-y-8">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-3 h-3 text-[#00FF41]" />
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600">Authentication</h4>
            </div>
            <div className="p-6 rounded-2xl bg-linear-to-br from-white/5 to-transparent border border-white/10 relative overflow-hidden group">
              <h4 className="text-white font-bold mb-3 text-sm tracking-tight">Deployment Ready?</h4>
              <p className="text-zinc-500 text-[11px] mb-6 leading-relaxed">
                Open to building impactful AI products and high-performance SaaS systems.
              </p>
              <Link
                href="/contact"
                aria-label="Start connection uplink"
                className="w-full flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-white px-4 py-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white hover:text-black transition-all group"
              >
                Start Uplink <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>

        </div>

        {/* SEO Keyword Matrix (The "Database Index") */}
        <div className="mt-32 pt-12 border-t border-white/5">
          <div className="flex items-center gap-3 mb-8">
            <Globe className="w-3 h-3 text-[#00D1FF]" />
            <span className="text-[9px] font-mono text-[#00D1FF]/60 uppercase tracking-[0.5em]">Global_Network_Index // SEO_Payload</span>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            {seoKeywords.map((keyword, i) => (
              <span key={i} className="text-[9px] font-mono text-zinc-700 hover:text-zinc-500 transition-colors uppercase cursor-default">
                {`{id:0x${i.toString(16)}, term:"${keyword}"}`}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Credits Line */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
            © {currentYear} rajesh.code // Architecture Integrity Verified
          </p>
          <div className="flex items-center gap-8 text-[9px] font-mono uppercase tracking-[0.4em] text-zinc-700">
            <span className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-[#00FF41] animate-pulse" /> SYNCED_ONLINE</span>
            <span className="hidden md:inline">ARCHITECTURE_INTEGRITY_VERIFIED</span>
            <span className="hidden lg:inline text-purple-950">V4.0.2_PRODUCTION_DEPLOY</span>
          </div>
        </div>

      </div>

      {/* Decorative Accents */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#00D1FF]/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-[#00FF41]/5 blur-[150px] rounded-full pointer-events-none" />
    </footer>
  );
}

