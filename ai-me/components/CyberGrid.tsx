"use client";

import React from "react";

export default function CyberGrid() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-20">
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(ellipse 60% 50% at 50% 50%, #000 70%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 50% at 50% 50%, #000 70%, transparent 100%)"
        }}
      />
      
      {/* Subtle Flickering Pulsing Dots at Intersections */}
      <div className="absolute inset-0 grid grid-cols-[repeat(auto-fill,40px)] grid-rows-[repeat(auto-fill,40px)]">
         {/* We don't want too many dots for performance, just a few dynamic accents */}
         <div className="col-start-10 row-start-5 w-1 h-1 bg-purple-500 rounded-full blur-[2px] animate-pulse" />
         <div className="col-start-15 row-start-10 w-1 h-1 bg-cyan-500 rounded-full blur-[2px] animate-pulse delay-700" />
         <div className="col-start-5 row-start-15 w-1 h-1 bg-pink-500 rounded-full blur-[2px] animate-pulse delay-1000" />
      </div>
    </div>
  );
}
