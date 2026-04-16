"use client";

import { motion } from "framer-motion";

const nodes = [
    { x: "10%", y: "20%" },
    { x: "30%", y: "40%" },
    { x: "50%", y: "25%" },
    { x: "70%", y: "60%" },
    { x: "85%", y: "30%" },
    { x: "60%", y: "80%" },
    { x: "25%", y: "75%" },
];

const connections = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [1, 5],
    [5, 6],
    [6, 0],
];

export default function NeuralBackground() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none">
            <svg className="w-full h-full">

                {/* Lines */}
                {connections.map(([start, end], i) => (
                    <motion.line
                        key={i}
                        x1={nodes[start].x}
                        y1={nodes[start].y}
                        x2={nodes[end].x}
                        y2={nodes[end].y}
                        stroke="rgba(255,255,255,0.08)"
                        strokeWidth="1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0.05, 0.2, 0.05] }}
                        transition={{
                            duration: 6 + i,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                ))}

                {/* Nodes */}
                {nodes.map((node, i) => (
                    <motion.circle
                        key={i}
                        cx={node.x}
                        cy={node.y}
                        r="3"
                        fill="white"
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: [0.2, 0.6, 0.2],
                            scale: [1, 1.3, 1],
                        }}
                        transition={{
                            duration: 4 + i,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </svg>
        </div>
    );
}