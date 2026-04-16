"use client";

import React from "react";
import ContactForm from "@/components/contact-form";
import ResumeCard from "@/components/ResumeCard";
import rajeshData from "@/data/rajesh.json";
import ScrollReveal from "@/components/ScrollReveal";
import StructuredData from "@/components/StructuredData";
import { Mail, MapPin, ChevronRight, Zap } from "lucide-react";

export default function ContactPage() {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": `${rajeshData.name} | AI Product Builder`,
    "description": rajeshData.summary,
    "image": "https://rajesh-portfolio.vercel.app/og-image.png",
    "url": "https://rajesh-portfolio.vercel.app/contact",
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
    <div className="flex flex-col items-center pt-32 pb-40 px-6 md:px-12 lg:px-24 bg-bg-dark overflow-hidden">
      <StructuredData data={contactSchema} />
      {/* Header Section */}
      <ScrollReveal>
        <div className="max-w-7xl w-full text-center mb-24">
          <span className="text-[10px] uppercase font-black tracking-[0.5em] text-brand-purple mb-6 block">Available for Opportunities</span>
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-black text-white/90 tracking-tighter mb-8 leading-[0.8] italic uppercase">
            Let's <span className="text-gradient">Connect.</span>
          </h1>
          <p className="text-zinc-500 text-lg md:text-2xl font-medium max-w-2xl mx-auto italic leading-relaxed">
            Whether you have a specific product vision or just want to talk about the future of AI, my inbox is always open.
          </p>
        </div>
      </ScrollReveal>

      {/* Main Content Grid */}
      <section className="w-full max-w-7xl relative">
        {/* Visual Background Accents */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.05)_0%,transparent_70%)]" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 relative">

          {/* Column 1: Contact Form */}
          <ScrollReveal direction="right" delay={0.2} className="flex flex-col h-full lg:pr-12">
            <ContactForm />
          </ScrollReveal>

          {/* Vertical Divider (Desktop Only) */}
          <div className="hidden lg:block absolute left-1/2 top-10 bottom-10 w-px bg-linear-to-b from-transparent via-white/10 to-transparent -translate-x-1/2" />

          {/* Column 2: Resume Card */}
          <ScrollReveal direction="left" delay={0.2} className="flex flex-col h-full lg:pl-12">
            <ResumeCard />
          </ScrollReveal>

        </div>
      </section>

      {/* Quick Access Grid (Bottom) */}
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-3 gap-6 mt-32">
        <ScrollReveal delay={0.4}>
          <div className="p-10 rounded-[2.5rem] border border-white/5 bg-white/5 backdrop-blur-md flex flex-col items-center text-center group cursor-default hover:border-white/10 transition-all">
            <div className="w-14 h-14 rounded-2xl bg-brand-purple/10 flex items-center justify-center text-brand-purple mb-6 border border-brand-purple/20 group-hover:scale-110 transition-transform">
              <Mail size={24} />
            </div>
            <p className="text-[10px] uppercase font-black tracking-widest text-zinc-500 mb-2">Direct Channel</p>
            <a href={`mailto:${rajeshData.email}`} className="text-white text-lg font-black hover:text-brand-purple transition-colors truncate w-full px-2">{rajeshData.email}</a>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.5}>
          <div className="p-10 rounded-[2.5rem] border border-white/5 bg-white/5 backdrop-blur-md flex flex-col items-center text-center group cursor-default hover:border-white/10 transition-all">
            <div className="w-14 h-14 rounded-2xl bg-brand-blue/10 flex items-center justify-center text-brand-blue mb-6 border border-brand-blue/20 group-hover:scale-110 transition-transform">
              <MapPin size={24} />
            </div>
            <p className="text-[10px] uppercase font-black tracking-widest text-zinc-500 mb-2">Operating From</p>
            <p className="text-white text-lg font-black italic">{rajeshData.location}</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.6}>
          <div className="h-full p-10 rounded-[2.5rem] bg-linerar-to-br from-brand-purple to-brand-pink text-white flex flex-col items-center text-center group cursor-pointer hover:shadow-[0_20px_60px_rgba(124,58,237,0.4)] transition-all shimmer-btn overflow-hidden">
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-white mb-6 border border-white/30 group-hover:scale-110 transition-transform">
              <Zap size={24} fill="currentColor" />
            </div>
            <p className="text-[10px] uppercase font-black tracking-widest text-white/70 mb-2">Collaboration</p>
            <p className="text-white font-black italic uppercase text-lg tracking-tighter">Initiate Protocol</p>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
