"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Menu, X, Search, Terminal, Cpu, Zap, Activity } from "lucide-react";
import CommandPalette from "./CommandPalette";

const navLinks = [
  { name: "Home", path: "/", id: "01" },
  { name: "About", path: "/about", id: "02" },
  { name: "Projects", path: "/projects", id: "03" }, // Updated to dedicated projects page
  { name: "AI Chat", path: "/chat-with-rajesh-ai", id: "04" },
  { name: "Contact", path: "/contact", id: "05" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Responsive Pill Transformations
  const navWidth = useTransform(scrollY, [0, 100], ["100%", "fit-content"]);
  const navPadding = useTransform(scrollY, [0, 100], ["24px", "12px"]);
  const navTop = useTransform(scrollY, [0, 100], ["0px", "20px"]);
  const borderRadius = useTransform(scrollY, [0, 100], ["0px", "9999px"]);
  const scale = useTransform(scrollY, [0, 100], [1, 0.95]);

  useEffect(() => {
    if (mobileMenuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [mobileMenuOpen]);

  return (
    <>
      <header className={`sticky top-0 w-full z-100 flex justify-center pointer-events-none transition-all duration-500 ${isScrolled
        ? "bg-linear-to-r from-purple-500/5 via-transparent to-cyan-500/5"
        : "bg-linear-to-r from-black via-purple-300 to-black"
        }`}>
        <motion.nav
          style={{
            width: navWidth,
            marginTop: navTop, // Changed from top to marginTop for sticky flow
            borderRadius,
            scale
          }}
          className="relative pointer-events-auto transition-all duration-300 ease-out flex items-center justify-center shadow-[0_0_50px_rgba(0,0,0,0.5)] h-fit"
        >
          <motion.div
            style={{ padding: navPadding }}
            className="w-full h-full flex items-center justify-between gap-8 bg-black/40 backdrop-blur-3xl border border-white/10 relative overflow-hidden"
            animate={{
              borderColor: ["rgba(255,255,255,0.1)", "rgba(124,58,237,0.3)", "rgba(255,255,255,0.1)"]
            }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            {/* Neural Glow Background Accent */}
            <div className="absolute inset-0 bg-linear-to-r from-purple-500/5 via-transparent to-cyan-500/5 opacity-50" />

            {/* Logo Section */}
            <Link href="/" className="group relative z-10 pl-6 md:pl-10">
              <span className="text-2xl font-black italic tracking-tighter text-transparent bg-clip-text bg-linear-to-r from-white to-white/40">
                rajesh.code
              </span>
              {/* <div className="absolute -bottom-1 left-0 w-0 h-px bg-purple-500 group-hover:w-full transition-all duration-500" /> */}
            </Link>

            {/* Nav Links (Desktop) */}
            <div className="hidden lg:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/5 backdrop-blur-md relative z-10">
              {navLinks.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    className={`relative px-4 py-2 text-[9px] font-mono font-bold uppercase tracking-widest transition-all group ${isActive ? "text-white" : "text-zinc-500 hover:text-zinc-300"
                      }`}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <span className="text-[7px] text-purple-500/50 group-hover:text-purple-400 transition-colors">0x{link.id}</span>
                      {link.name}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill-active"
                        className="absolute inset-0 bg-white/10 rounded-full border border-white/10"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Actions & Live Status */}
            <div className="flex items-center gap-4 pr-6 md:pr-10 relative z-10">
              {/* Terminal Search Trigger */}
              <button
                onClick={() => setCommandPaletteOpen(true)}
                className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-lg border border-white/10 text-zinc-500 hover:text-white transition-all group"
              >
                <Terminal className="w-3.5 h-3.5 text-purple-500" />
                <span className="hidden sm:inline-block text-[9px] font-mono tracking-tighter opacity-60">EXECUTE_CMD [ / ]</span>
                <div className="w-1 h-3 bg-purple-500/40 animate-pulse hidden sm:block" />
              </button>

              {/* Mobile Menu Trigger */}
              <button
                className="lg:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-white"
                onClick={() => setMobileMenuOpen(true)}
              >
                <X size={18} />
              </button>
            </div>
          </motion.div>
        </motion.nav>
      </header>

      {/* Full-Screen Neural Overlay (Mobile Menu) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(40px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-110 bg-[#030303]/90 lg:hidden flex flex-col p-10 overflow-hidden"
          >
            {/* Background Grid Accent */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="w-full h-full bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-size-[40px_40px]" />
            </div>

            <div className="flex justify-between items-center mb-16 relative z-10">
              <span className="text-2xl font-black italic tracking-tighter text-white">Neural.Link</span>
              <button
                className="p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col gap-10 relative z-10">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1, ease: "easeOut" }}
                >
                  <Link
                    href={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-5xl font-black tracking-tighter text-white/40 hover:text-white transition-all flex items-baseline gap-6 group"
                  >
                    <span className="text-xs font-mono text-purple-500 opacity-60">0x{link.id}</span>
                    <span className="group-hover:translate-x-4 transition-transform duration-500 uppercase">{link.name}</span>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* System Specs Footer (Mobile) */}
            <div className="mt-auto pt-10 border-t border-white/5 flex flex-col gap-8 relative z-10">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest">Protocol.Status</span>
                  <div className="flex items-center gap-2">
                    <Activity className="w-3 h-3 text-green-500 animate-pulse" />
                    <span className="text-[9px] font-mono text-zinc-400">NOMINAL_OVR_v4</span>
                  </div>
                </div>
                <div className="space-y-2 text-right">
                  <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest">Global.Sync</span>
                  <div className="flex items-center gap-2 justify-end">
                    <Zap className="w-3 h-3 text-cyan-500" />
                    <span className="text-[9px] font-mono text-zinc-400">LAT: 12ms</span>
                  </div>
                </div>
              </div>
              <p className="text-[8px] font-mono text-zinc-700 uppercase tracking-[0.4em] text-center">
                Transmission_Link // Active_Ready
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Command Palette */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />
    </>
  );
}
