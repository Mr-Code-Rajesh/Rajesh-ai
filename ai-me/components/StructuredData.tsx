"use client";

import React from "react";

interface StructuredDataProps {
  data?: Record<string, any>;
}

export default function StructuredData({ data }: StructuredDataProps) {
  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Rajesh P",
    "jobTitle": "Senior AI Product Engineer",
    "url": "https://rajesh-ai.vercel.app",
    "sameAs": [
      "https://github.com/rajesh-ai", // Replace with actual
      "https://linkedin.com/in/rajesh-ai" // Replace with actual
    ],
    "description": "Senior AI Product Engineer specializing in autonomous agents, LLM applications, and scalable SaaS architecture.",
    "knowsAbout": [
      "Artificial Intelligence",
      "Full Stack Development",
      "Next.js",
      "Autonomous Agents",
      "Cloud Infrastructure",
      "Product Engineering"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Chennai",
      "addressRegion": "Tamil Nadu",
      "addressCountry": "India"
    }
  };

  const schema = data || defaultSchema;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
