"use client";

import { motion } from "framer-motion";

const techStack = [
    "Next.js",
    "TypeScript",
    "Tailwind",
    "React",
    "AI",
    "Node.js",
    "MongoDB",
    "SaaS",
    "Automation",
];

const positions = [
    "top-[10%] left-[5%]",
    "top-[20%] right-[10%]",
    "top-[70%] left-[15%]",
    "bottom-[10%] right-[20%]",
    "top-[40%] left-[80%]",
    "bottom-[30%] left-[5%]",
    "top-[60%] right-[5%]",
    "top-[15%] left-[40%]",
    "bottom-[15%] right-[40%]",
];

export default function FloatingTechStack() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none">
            {techStack.map((tech, i) => (
                <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                        opacity: [0.2, 0.6, 0.2],
                        y: [0, -20, 0],
                        filter: [
                            "drop-shadow(0 0 2px rgba(124,58,237,0.4))",
                            "drop-shadow(0 0 8px rgba(34,211,238,0.6))",
                            "drop-shadow(0 0 2px rgba(236,72,153,0.4))",
                        ],
                    }}
                    transition={{
                        duration: 6 + i,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className={`absolute ${positions[i]} text-xs md:text-sm font-semibold tracking-wide 
  text-transparent bg-clip-text bg-linear-to-r from-brand-purple via-brand-blue to-brand-pink`}
                >
                    {tech}
                </motion.span>
            ))}
        </div>
    );
}