"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Briefcase, 
  GraduationCap, 
  Trophy, 
  Download, 
  Link, 
  ExternalLink, 
  ChevronRight,
  Cpu,
  Mail,
  MapPin
} from "lucide-react";
import rajeshData from "@/data/rajesh.json";

export default function ResumeCard() {
  const socialLinks = [
    { icon: <Link size={18} />, href: rajeshData.linkedin, label: "LinkedIn" },
    { icon: <ExternalLink size={18} />, href: rajeshData.github, label: "GitHub" },
  ];

  return (
    <div className="w-full h-full glass-card rounded-[2.5rem] p-8 md:p-12 border border-white/5 bg-gradient-to-br from-white/5 to-transparent relative overflow-hidden flex flex-col">
      <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-brand-blue/10 rounded-full blur-[60px]" />
      
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="mb-10">
          <h3 className="text-2xl font-black italic tracking-tighter bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">Career <span className="text-gradient">Blueprint.</span></h3>
          <p className="text-[10px] uppercase font-black tracking-widest text-zinc-600">A snapshot of my professional journey.</p>
        </div>

        <div className="space-y-10 flex-1">
          {/* Experience */}
          <section className="space-y-4">
            <h4 className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-black text-zinc-500">
              <Briefcase size={12} className="text-brand-purple" /> Experience
            </h4>
            <div className="space-y-6">
              {rajeshData.experience.map((exp, i) => (
                <div key={i} className="group relative pl-4 border-l border-white/5 hover:border-brand-purple/50 transition-colors">
                  <div className="absolute left-0 top-1 -translate-x-1.5 w-3 h-3 rounded-full bg-[#0B0B0F] border-2 border-brand-purple opacity-0 group-hover:opacity-100 transition-opacity" />
                  <p className="text-xs font-black text-brand-purple mb-1 uppercase tracking-wider">{exp.duration}</p>
                  <h5 className="text-sm font-bold text-white">{exp.role}</h5>
                  <p className="text-[11px] text-zinc-500 font-medium italic">{exp.company}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section className="space-y-4">
            <h4 className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-black text-zinc-500">
              <GraduationCap size={12} className="text-brand-purple" /> Education
            </h4>
            {rajeshData.education.map((edu, i) => (
              <div key={i} className="pl-4 border-l border-white/5">
                <p className="text-xs font-black text-zinc-400 mb-1 uppercase tracking-wider">{edu.duration}</p>
                <h5 className="text-sm font-bold text-white">{edu.degree}</h5>
                <p className="text-[11px] text-zinc-500 font-medium italic">{edu.institution} — CGPA {edu.cgpa}</p>
              </div>
            ))}
          </section>

          {/* Main Achievements / Awards */}
          <section className="space-y-4">
            <h4 className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-black text-zinc-500">
              <Trophy size={12} className="text-brand-purple" /> Recognition
            </h4>
            <div className="flex flex-wrap gap-2">
              {rajeshData.achievements.slice(0, 3).map((ach, i) => (
                <div key={i} className="px-3 py-2 rounded-lg bg-white/5 border border-white/5 text-[10px] font-bold text-zinc-300 italic flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-brand-purple" /> {ach.split('—')[0]}
                </div>
              ))}
            </div>
          </section>

          {/* Top Skills */}
          <section className="space-y-4">
            <h4 className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-black text-zinc-500">
              <Cpu size={12} className="text-brand-purple" /> Core Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {["React", "TypeScript", "Next.js", "Node.js", "Gemini AI", "Tailwind"].map((skill) => (
                <span key={skill} className="px-3 py-1.5 rounded-md bg-brand-purple/10 border border-brand-purple/20 text-[10px] font-black text-brand-purple uppercase tracking-wider">
                  {skill}
                </span>
              ))}
            </div>
          </section>
        </div>

        {/* Footer CTAs */}
        <div className="mt-12 pt-10 border-t border-white/5 flex flex-col sm:flex-row items-center gap-6">
          <a 
            href="/resume.pdf" 
            target="_blank"
            className="flex items-center gap-3 px-6 py-4 rounded-xl bg-gradient-to-r from-brand-purple to-brand-blue text-white font-black text-xs uppercase tracking-widest hover:scale-[1.05] transition-all shadow-lg shadow-brand-purple/20"
          >
            Get Full Resume <Download size={14} />
          </a>

          <div className="flex items-center gap-4">
            {socialLinks.map((link, i) => (
              <a 
                key={i}
                href={link.href}
                target="_blank"
                className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-500 hover:text-white hover:border-brand-purple hover:bg-brand-purple/10 hover:shadow-[0_0_20px_rgba(124,58,237,0.2)] transition-all"
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
