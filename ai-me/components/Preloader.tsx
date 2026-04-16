"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("INITIALIZING_CORE");

  const statuses = [
    "INITIALIZING_CORE",
    "ESTABLISHING_NEURAL_LINK",
    "DECRYPTING_BIO_DOSSAR",
    "SYNCING_GITHUB_ARTIFACTS",
    "LOADING_AI_MODELS",
    "SYSTEM_READY"
  ];

  useEffect(() => {
    // Check if seen before in this session
    const hasSeen = sessionStorage.getItem("hasSeenPreloader");
    if (hasSeen) {
      setLoading(false);
      return;
    }

    let interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLoading(false);
            sessionStorage.setItem("hasSeenPreloader", "true");
          }, 800);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const statusIndex = Math.min(Math.floor((progress / 100) * statuses.length), statuses.length - 1);
    setStatus(statuses[statusIndex]);
  }, [progress]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: "circOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black font-mono text-white p-6 overflow-hidden"
        >
          {/* Cybernetic Grid Background for Preloader */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
          </div>

          <div className="relative z-10 w-full max-w-md">
            {/* Header */}
            <div className="flex justify-between items-end mb-2">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs tracking-[0.3em] text-[#00D1FF]"
              >
                RAJESH_AI_OS v1.0.0
              </motion.div>
              <div className="text-[10px] text-zinc-500 tracking-tighter">
                {Math.round(progress)}%
              </div>
            </div>

            {/* Progress Bar Container */}
            <div className="h-[2px] w-full bg-zinc-900 overflow-hidden relative">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-linear-to-r from-purple-500 via-[#00D1FF] to-[#00FF41]"
              />
              {/* Scanning Glow */}
              <motion.div
                animate={{ left: ["-10%", "110%"] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 w-20 h-full bg-white/20 blur-sm"
              />
            </div>

            {/* Status Messages */}
            <div className="mt-4 flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 bg-[#00FF41] rounded-full animate-pulse" />
                <span className="text-[9px] uppercase tracking-widest text-[#00FF41]">
                  {status}...
                </span>
              </div>
              <div className="text-[8px] text-zinc-600 truncate uppercase tracking-widest">
                Kernel: verified | Secure_Boot: active | Neural_Relay: encrypted
              </div>
            </div>

            {/* Matrix-like glitch effect (optional/subtle) */}
            <motion.div
              animate={{ opacity: [0, 0.2, 0] }}
              transition={{ duration: 0.1, repeat: Infinity }}
              className="absolute -inset-10 bg-[#00FF41]/5 blur-3xl pointer-events-none"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
