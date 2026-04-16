import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Rajesh | AI Full Stack Developer",
    description:
        "Rajesh is an AI Full Stack Developer from Chennai building scalable AI products, automation systems, and SaaS platforms.",

    keywords: [
        "Rajesh P portfolio",
        "Senior AI Product Engineer",
        "Full Stack AI Developer Chennai",
        "Autonomous Agents Developer",
        "LLM Application Architect",
        "Next.js AI SaaS Builder",
        "Automation Systems Engineer India",
        "Generative AI Specialist",
        "Software Architecture Expert"
    ],

    authors: [{ name: "Rajesh" }],

    creator: "Rajesh",

    openGraph: {
        title: "Rajesh P | Senior AI Product Engineer & Architect",
        description:
            "Architecting high-performance AI systems, autonomous agents, and scalable SaaS platforms for the next generation of digital products.",
        url: "https://rajesh-ai.vercel.app", // Placeholder, user should update
        siteName: "Rajesh Portfolio",
        images: [
            {
                url: "/og-preview.png",
                width: 1200,
                height: 630,
                alt: "Rajesh P - AI Product Engineer Portfolio",
            },
        ],
        locale: "en_IN",
        type: "website",
    },

    twitter: {
        card: "summary_large_image",
        title: "Rajesh | AI Full Stack Developer",
        description:
            "Building AI systems, SaaS products, and automation platforms.",
        images: ["/og-image.png"],
    },

    robots: {
        index: true,
        follow: true,
    },
};