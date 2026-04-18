"use client";

import React, { useState } from "react";
import ContactForm from "@/components/contact-form";
import rajeshData from "@/data/rajesh.json";
import ScrollReveal from "@/components/ScrollReveal";
import StructuredData from "@/components/StructuredData";
import { FiMail, FiChevronRight, FiZap, FiCopy, FiCheck, FiExternalLink } from "react-icons/fi";
import { FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

export default function ContactPage() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(rajeshData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": `${rajeshData.name} | AI Product Builder`,
    "description": rajeshData.summary,
    "image": "https://rajesh-ai.vercel.app/og-image.png",
    "url": "https://rajesh-ai.vercel.app/contact",
    "email": rajeshData.email,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Chennai",
      "addressRegion": "Tamil Nadu",
      "addressCountry": "IN"
    },
    "sameAs": [
      rajeshData.linkedin,
      rajeshData.github
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Full Stack & AI Development",
      "email": rajeshData.email,
      "url": "https://rajesh-portfolio.vercel.app/contact"
    }
  };

  return (
    <div className="flex flex-col items-center pt-32 pb-40 px-6 md:px-12 lg:px-24 bg-bg-dark overflow-hidden font-sans">
      <StructuredData data={contactSchema} />

      {/* Header Section (Preserved) */}
      <ScrollReveal>
        <div className="max-w-7xl w-full text-center mb-24">
          <span className="text-[10px] uppercase font-black tracking-[0.5em] text-brand-purple mb-6 block">Available for Opportunities</span>
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-black text-white/90 tracking-tighter mb-8 leading-[0.8] italic uppercase">
            Let's <span className="text-gradient">Connect.</span>
          </h1>
          <p className="text-zinc-500 text-lg md:text-2xl font-medium max-w-2xl mx-auto italic leading-relaxed">
            Whether you have a specific product vision or just want to talk about the future of AI, my inbox is always open.
          </p>

          <div className="mt-12 flex justify-center">
            <a
              href={`mailto:${rajeshData.email}`}
              className="group relative px-8 py-4 bg-white/5 border border-white/10 rounded-full text-white font-bold flex items-center gap-3 hover:bg-white/10 transition-all hover:scale-105 active:scale-95 shadow-xl"
            >
              <FiMail className="text-brand-purple text-xl" />
              <span>Email Me</span>
              <FiChevronRight className="text-lg opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
            </a>
          </div>
        </div>
      </ScrollReveal>

      {/* Single Column Vertical Layout */}
      <div className="w-full max-w-4xl flex flex-col gap-24 relative">
        {/* Step 1: Strategy Call */}
        <ScrollReveal direction="up">
          <div className="glass-card bg-[#111117]/50 backdrop-blur-xl rounded-[3rem] border border-white/10 p-10 md:p-16 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-purple/5 blur-[100px] -z-10 group-hover:bg-brand-purple/10 transition-colors" />

            <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
              <div className="w-16 h-16 rounded-2xl bg-brand-purple/20 flex items-center justify-center text-brand-purple mb-8 border border-brand-purple/30 shadow-[0_0_30px_rgba(124,58,237,0.2)]">
                <FiZap className="text-3xl" />
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-white italic uppercase tracking-tight mb-4">
                Step 01. Book Your Free Strategy Call
              </h3>
              <div className="h-1 w-20 bg-brand-purple mb-8 rounded-full" />
              <p className="text-white text-xl md:text-2xl font-black italic mb-6 leading-tight">
                "Let's audit, fix, or build your production system"
              </p>
              <p className="text-zinc-500 text-lg mb-10 leading-relaxed italic">
                This isn't a sales pitch; it's a technical diagnostic. You'll speak directly with me, and we'll outline an actionable plan.
              </p>

              <a
                href="#"
                className="w-full max-w-md py-6 bg-brand-purple hover:bg-brand-pink text-white font-black uppercase text-sm tracking-[0.3em] rounded-2xl flex items-center justify-center gap-3 transition-all shadow-[0_15px_40px_rgba(124,58,237,0.3)] hover:shadow-[0_20px_50px_rgba(124,58,237,0.6)] active:scale-[0.98]"
              >
                Secure Your Slot <FiExternalLink className="text-lg" />
              </a>
            </div>
          </div>
        </ScrollReveal>

        {/* Step 2: Messaging Protocol */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="flex flex-col items-center">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-white italic uppercase tracking-tighter mb-4">
                Step 02. Send a <span className="text-brand-purple">Message</span>
              </h2>
              <p className="text-zinc-500 text-lg italic max-w-xl mx-auto">
                Share the blocker you want fixed. I'll reply with the fastest next step I recommend.
              </p>
            </div>
            <div className="w-full">
              <ContactForm />
            </div>
          </div>
        </ScrollReveal>

        {/* Step 3: Direct Channels */}
        <ScrollReveal direction="up" delay={0.3}>
          <div className="flex flex-col items-center">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-white italic uppercase tracking-tighter mb-4">
                Step 03. Direct <span className="text-brand-purple">Channels</span>
              </h2>
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-card bg-white/5 backdrop-blur-md rounded-[2.5rem] border border-white/5 p-10 flex flex-col items-center text-center group hover:border-white/20 transition-all">
                <p className="text-[10px] uppercase font-black tracking-widest text-zinc-500 mb-6 font-mono">PROTOCOL :: DIRECT_EMAIL</p>
                <div className="flex flex-col items-center gap-6 w-full">
                  <span className="text-white font-mono text-lg break-all">{rajeshData.email}</span>
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-3 px-6 py-3 rounded-xl bg-brand-purple text-white font-black uppercase text-[10px] tracking-widest hover:bg-brand-pink transition-all active:scale-90 shadow-lg"
                  >
                    {copied ? <FiCheck className="text-sm" /> : <FiCopy className="text-sm" />}
                    <span>{copied ? "Copied" : "Copy Payload"}</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-rows-2 gap-6">
                <a
                  href="#"
                  className="flex items-center justify-center gap-4 rounded-[2.5rem] bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/10 transition-all group p-8"
                >
                  <FaXTwitter className="text-3xl text-white group-hover:text-brand-purple transition-colors" />
                  <span className="text-white/70 text-sm font-black uppercase tracking-[0.2em]">Contact on X</span>
                </a>
                <a
                  href={rajeshData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-4 rounded-[2.5rem] bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/10 transition-all group p-8"
                >
                  <FaLinkedinIn className="text-3xl text-white group-hover:text-[#0A66C2] transition-colors" />
                  <span className="text-white/70 text-sm font-black uppercase tracking-[0.2em]">LinkedIn Link</span>
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}



