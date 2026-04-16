"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, ArrowUpRight, Zap } from "lucide-react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import CyberGrid from "./CyberGrid";

const SocialPort = ({ icon: Icon, href, label }: { icon: any; href: string; label: string }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ y: -5, backgroundColor: "rgba(255,255,255,0.1)" }}
    aria-label={`Visit my ${label}`}
    className="flex items-center gap-3 px-4 py-2 rounded-xl border border-white/5 bg-white/2 backdrop-blur-md transition-all group"
  >
    <Icon className="w-4 h-4 text-zinc-500 group-hover:text-[#00D1FF]" />
    <span className="text-[10px] font-mono text-zinc-600 group-hover:text-zinc-300 uppercase tracking-widest">{label}</span>
    <ArrowUpRight className="w-3 h-3 text-zinc-700 group-hover:text-[#00D1FF] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
  </motion.a>
);

export default function CTA() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative w-full py-40 px-6 bg-[#030303] text-white overflow-hidden flex flex-col items-center justify-center min-h-[70vh]">
      
      {/* Visual Infrastructure */}
      <CyberGrid />
      
      {/* The Vortex Glow */}
      <motion.div 
        animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-radial from-[#00D1FF]/10 via-transparent to-transparent blur-[120px] pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto relative z-10 w-full flex flex-col items-center">
        
        {/* Top Protocol Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 mb-12 px-3 py-1 bg-white/5 border border-white/10 rounded-full"
        >
          <Zap className="w-3 h-3 text-[#00FF41] animate-pulse" />
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Final_Protocol // Connection_Ready</span>
        </motion.div>

        {/* Massive Layered Typography */}
        <div className="relative mb-16 text-center">
            <motion.h2 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-6xl md:text-[8rem] lg:text-[10rem] font-black tracking-tighter leading-[0.8] uppercase select-none w-full"
            >
                <span className="block text-transparent bg-clip-text bg-linear-to-b from-white to-white/20">Let&apos;s Connect</span>
                <motion.span 
                    initial={{ x: -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="block text-[#00D1FF] italic ml-0 md:ml-10 lg:ml-20"
                >
                    To Build.
                </motion.span>
            </motion.h2>
            
            {/* Background Text Shadow for Depth */}
            <h2 className="absolute inset-0 -z-10 text-6xl md:text-[8rem] lg:text-[10rem] font-black tracking-tighter leading-[0.8] uppercase opacity-5 blur-2xl select-none translate-y-4 w-full">
                Let&apos;s Connect To Build.
            </h2>
        </div>

        {/* Primary Action */}
        <motion.div
           initial={{ scale: 0.9, opacity: 0 }}
           whileInView={{ scale: 1, opacity: 1 }}
           transition={{ delay: 0.5 }}
           className="relative group"
        >
            <button 
                onClick={scrollToContact}
                aria-label="Initialize Connection Protocol"
                className="px-12 py-6 bg-white text-black font-black uppercase tracking-[0.3em] text-xs rounded-full relative z-10 transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.2)]"
            >
                Initialize_Uplink
            </button>
            <div className="absolute -inset-4 bg-[#00D1FF]/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
               className="absolute -inset-8 border border-dashed border-white/10 rounded-full pointer-events-none"
            />
        </motion.div>

        {/* Social Protocol Footer */}
        <div className="mt-32 w-full max-w-2xl flex flex-wrap justify-center gap-4">
            <SocialPort icon={Mail} href="mailto:rajesh.ai@example.com" label="Email_Port" />
            <SocialPort icon={FaLinkedin} href="https://linkedin.com/in/rajesh-ai" label="In_Protocol" />
            <SocialPort icon={FaGithub} href="https://github.com/rajesh-ai" label="Git_Hub" />
        </div>

        {/* Console Readout */}
        <div className="mt-12 text-[10px] font-mono text-[#00FF41]/60 uppercase tracking-widest">
            Transmission_v2.5 // Uplink_Status: Awaiting_Data...
        </div>

      </div>

      {/* SEO Hidden Content */}
      <h2 className="sr-only">Contact Rajesh P, Senior AI Product Engineer, for custom AI solutions, full stack SaaS engineering, and autonomous system architecture. Global collaboration for AI-powered digital products.</h2>

    </section>
  );
}