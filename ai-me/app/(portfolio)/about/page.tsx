import React from "react";
import type { Metadata } from "next";
import JourneyTimeline from "@/components/JourneyTimeline";
import StructuredData from "@/components/StructuredData";
import {
  AboutHero,
  StartupStory,
  ExperienceGrid,
  AchievementsGrid
} from "./AboutComponents";

export const metadata: Metadata = {
  title: "About Rajesh P | Co-Founder & AI Product Builder",
  description: "Discover the journey of Rajesh P, Co-Founder at Liceron and Technical Research Executive at Zinnov. Building the future of AI SaaS through LucidExtractor and Nural AI.",
  keywords: ["Rajesh P", "Liceron Co-Founder", "Frontend Engineer", "AI Product Builder", "LucidExtractor", "Nural AI", "Zinnov", "Technical Research Executive", "Chennai Developer"],
  openGraph: {
    title: "The Journey of Rajesh P | AI Product Builder",
    description: "Building products from ideas — and turning them into real, usable systems.",
    type: "website",
    url: "https://rajeshp.com/about",
    images: [
      {
        url: "/og-about.png",
        width: 1200,
        height: 630,
        alt: "Rajesh P Portfolio About",
      },
    ],
  },
};

export default function AboutPage() {
  const personStructuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Rajesh P",
    "jobTitle": "Co-Founder & Frontend Engineer",
    "url": "https://rajeshp.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Chennai",
      "addressRegion": "TN",
      "addressCountry": "IN"
    },
    "alumniOf": {
      "@type": "CollegeOrUniversity",
      "name": "Sri Sankara Arts and Science College"
    },
    "worksFor": [
      {
        "@type": "Organization",
        "name": "Liceron Technologies"
      },
      {
        "@type": "Organization",
        "name": "Zinnov"
      }
    ],
    "award": [
      "Zinnov Dashing Debut Award (2024)",
      "Zinnov Extra Mile Award (2025)",
      "Ninja Dominator Title – Coding Ninjas"
    ]
  };

  return (
    <div className="flex flex-col items-center bg-[#030303] text-white min-h-screen">
      <StructuredData data={personStructuredData} />

      {/* Hero Section */}
      <AboutHero />

      <div className="w-full relative z-10">

        {/* Startup Journey Story */}
        <StartupStory />

        {/* Experience & Roles */}
        <ExperienceGrid />

        {/* Timeline Section */}
        <section className="w-full py-32 bg-black/40 border-y border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-brand-purple/5 blur-[100px] pointer-events-none" />
          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <div className="mb-20">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-brand-purple animate-pulse" />
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500">
                  Temporal.Sequence
                </span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-white italic uppercase tracking-tighter">Evolution.</h2>
            </div>
            <JourneyTimeline />
          </div>
        </section>

        {/* Achievements & Certifications */}
        <AchievementsGrid />

        {/* CTA Section */}
        <section className="w-full py-40 px-6 relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

          <div className="max-w-5xl mx-auto glass-card p-12 md:p-24 rounded-[4rem] text-center border border-white/10 relative overflow-hidden group">
            {/* Dynamic background for CTA */}
            <div className="absolute inset-0 bg-linear-to-br from-brand-purple/20 via-transparent to-brand-blue/20 opacity-30 group-hover:opacity-60 transition-opacity duration-700" />
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-purple/20 blur-[120px] rounded-full" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-blue/20 blur-[120px] rounded-full" />

            <div className="relative z-10">
              <div className="mb-8 flex justify-center">
                <div className="px-4 py-1.5 rounded-full border border-brand-purple/30 bg-brand-purple/10 text-[10px] font-mono text-brand-purple uppercase tracking-widest">
                  Transmission.Ready
                </div>
              </div>

              <h2 className="text-4xl md:text-7xl font-black text-white mb-10 tracking-tighter uppercase italic leading-none">
                Build the <span className="text-gradient">Next</span> <br />
                Era of AI.
              </h2>

              <p className="text-zinc-400 text-lg md:text-xl mb-16 max-w-2xl mx-auto font-medium leading-relaxed">
                The protocol is established. The infrastructure is ready. <br className="hidden md:block" />
                Let's deploy your vision into reality.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <a href="/contact" className="px-12 py-5 rounded-full bg-white text-black font-black uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                  Establish Connection
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Decorative Scanline Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50">
        <div className="w-full h-1/2 bg-linear-to-b from-brand-purple/2 to-transparent animate-scanline" />
      </div>
    </div>
  );
}
