import React from "react";
import type { Metadata } from "next";
import SystemFeed from "@/components/SystemFeed";
import ProjectRegistry from "./ProjectRegistry";
import StructuredData from "@/components/StructuredData";
import rajeshData from "@/data/rajesh.json";

export const metadata: Metadata = {
  title: "Projects | Mission Archives | Rajesh P",
  description: "Deployment logs of high-performance AI systems, SaaS platforms, and open-source UI libraries built by Rajesh P.",
  keywords: ["LucidExtractor", "AI Scraper", "Saktrix UI", "React Projects", "AI Portfolio", "Fullstack Developer", "Rajesh P Projects"],
};

export default function ProjectsPage() {
  const projectsStructuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Rajesh P Projects Portfolio",
    "description": "A collection of AI-driven and high-performance web applications.",
    "url": "https://rajeshp.com/projects",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": rajeshData.projects.map((p, i) => ({
        "@type": "SoftwareApplication",
        "position": i + 1,
        "name": p.name,
        "description": p.description,
        "applicationCategory": "WebApplication",
        "operatingSystem": "Web",
        "url": p.link
      }))
    }
  };

  return (
    <div className="flex flex-col items-center bg-[#030303] text-white pt-24 pb-40 overflow-hidden relative">
      <StructuredData data={projectsStructuredData} />

      {/* Dynamic Background Protocols */}
      <SystemFeed />
      <div className="fixed inset-0 pointer-events-none bg-linear-to-b from-brand-purple/3 via-transparent to-brand-blue/3 z-0" />

      <div className="relative z-10 max-w-7xl w-full px-6">
        {/* Hero Section */}
        <section className="text-center mb-32">
          <MotionDivPlaceholder /> {/* I will use a client wrapper or just keep it simple in server component */}
          <div className="inline-block px-4 py-1.5 rounded-full border border-brand-purple/30 bg-brand-purple/5 text-[10px] font-mono text-brand-purple uppercase tracking-[0.4em] mb-8">
            Accessing.Mission_Archives
          </div>
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-10 leading-none uppercase italic">
            Deployment <br />
            <span className="text-gradient">Registry.</span>
          </h1>
          <p className="text-zinc-500 text-lg md:text-2xl font-medium max-w-2xl mx-auto italic leading-relaxed">
            Verified records of production systems, AI-powered automation, and specialized UI architecture.
          </p>
        </section>

        {/* The Grid */}
        <ProjectRegistry />
      </div>

      {/* Decorative Gradient Overlays */}
      <div className="fixed -bottom-32 -left-32 w-[500px] h-[500px] bg-brand-purple/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="fixed -top-32 -right-32 w-[500px] h-[500px] bg-brand-blue/10 blur-[150px] rounded-full pointer-events-none" />
    </div>
  );
}

// Client wrapper for small animations if needed, but keeping page.tsx as server component for SEO
function MotionDivPlaceholder() {
  return null; // Not needed for structure, just for conceptual mapping
}
