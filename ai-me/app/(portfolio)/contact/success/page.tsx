"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-dark px-4 overflow-hidden relative">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600/20 blur-3xl rounded-full animate-float-orb pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-pink-500/20 blur-3xl rounded-full animate-float-orb pointer-events-none" style={{ animationDelay: "-2s" }} />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full glass-card bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-8 md:p-12 text-center relative z-10"
      >
        {/* Animated Success Icon */}
        <div className="flex justify-center mb-8">
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 0.5 }}
            className="w-20 h-20 rounded-full border-2 border-transparent bg-linear-to-tr from-purple-600 to-pink-500 p-[2px] relative"
          >
            <div className="w-full h-full bg-bg-dark rounded-full flex items-center justify-center">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white"
              >
                <motion.path
                  d="M20 6L9 17L4 12"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                />
              </svg>
            </div>
          </motion.div>
        </div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-3xl font-black mb-4 uppercase italic tracking-tighter"
        >
          <span className="bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Message Sent!
          </span>
        </motion.h1>

        {/* Sub-text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-white/60 text-sm mb-10 leading-relaxed font-medium"
        >
          Thanks for reaching out. I'll get back to you within 24 hours.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col gap-4"
        >
          <Link
            href="/"
            className="relative group overflow-hidden rounded-xl px-6 py-3"
          >
            <div className="absolute inset-0 bg-linear-to-r from-purple-600 to-pink-500 transition-transform group-hover:opacity-90 active:scale-[0.98] duration-200" />
            <span className="relative text-white font-black text-xs uppercase tracking-widest">
              Back to Home
            </span>
          </Link>

          <Link
            href="/#projects"
            className="group px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all duration-200 hover:scale-[1.03]"
          >
            View My Work
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
