"use client";

import Hero from "@/components/Hero";
import WorkApproach from "@/components/WorkApproach";
import TechStack from "@/components/TechStack";
import ServicesCaseStudy from "@/components/ServicesCaseStudy";
// import ContactForm from "@/components/contact-form";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black overflow-x-hidden">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Work apporch */}
      <WorkApproach />

      {/* 3. Tech Stack */}
      <TechStack />

      {/* 4. Service Matrix */}
      <ServicesCaseStudy />


      {/* 5. Finale CTA */}
      <CTA />

    </div>
  );
}

















