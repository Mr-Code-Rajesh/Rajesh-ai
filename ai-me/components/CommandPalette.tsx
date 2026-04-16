"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Command, ArrowRight, History, Zap, User, Briefcase, MessageSquare, Mail } from "lucide-react";
import { useRouter } from "next/navigation";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

const sections = [
  { id: "home", name: "Home", path: "/" },
  { id: "about", name: "About & Journey", path: "/about" },
  { id: "projects", name: "Projects & Skills", path: "/projects" },
  { id: "ai-chat", name: "Chat with Rajesh AI", path: "/chat-with-rajesh-ai" },
  { id: "contact", name: "Contact & Resume", path: "/contact" },
];

const ICONS: Record<string, React.ReactNode> = {
  home: <Zap size={16} />,
  about: <User size={16} />,
  projects: <Briefcase size={16} />,
  "ai-chat": <MessageSquare size={16} />,
  contact: <Mail size={16} />,
};

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recent, setRecent] = useState<typeof sections>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("recent_sections");
    if (saved) {
      try {
        const parsedIds = JSON.parse(saved);
        if (Array.isArray(parsedIds)) {
          const recovered = parsedIds
            .map(id => sections.find(s => s.id === id))
            .filter(Boolean) as typeof sections;
          setRecent(recovered);
        }
      } catch (e) {
        console.error("Error hydrating recent sections:", e);
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && !isOpen) {
        e.preventDefault();
        onClose(); // In case it's in a weird state
        // This is handled by Navbar but global listener is safer
      }
      if (e.key === "/" && (e.target as HTMLElement).tagName !== "INPUT" && (e.target as HTMLElement).tagName !== "TEXTAREA") {
           // Handled by parent but we can add global here too
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    // Global keyboard listener for "/" trigger
    const handleGlobalTrigger = (e: KeyboardEvent) => {
      if (e.key === "/" && (e.target as HTMLElement).tagName !== "INPUT" && (e.target as HTMLElement).tagName !== "TEXTAREA") {
        e.preventDefault();
        // Triggering is handled by Navbar state, but if we wanted a truly global one:
        // We'd use a custom event or a global state manager (Zustand).
        // Since we are using props, the Navbar handles the trigger.
      }
    };
    window.addEventListener("keydown", handleGlobalTrigger);
    return () => window.removeEventListener("keydown", handleGlobalTrigger);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [isOpen]);

  const filtered = query === "" 
    ? [] 
    : sections.filter(s => s.name.toLowerCase().includes(query.toLowerCase()));

  const displayItems = query === "" ? recent : filtered;

  const handleSelect = (section: typeof sections[0]) => {
    // Save to recent (only IDs to avoid circular reference errors with React icons)
    const newRecent = [section, ...recent.filter(r => r.id !== section.id)].slice(0, 3);
    setRecent(newRecent);
    localStorage.setItem("recent_sections", JSON.stringify(newRecent.map(r => r.id)));
    
    router.push(section.path);
    onClose();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % displayItems.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + displayItems.length) % displayItems.length);
    } else if (e.key === "Enter") {
      if (displayItems[selectedIndex]) {
        handleSelect(displayItems[selectedIndex]);
      }
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed top-[15%] left-1/2 -translate-x-1/2 w-[90%] max-w-xl z-[160] overflow-hidden"
          >
            <div className="glass-card rounded-3xl border border-white/10 bg-[#0B0B0F]/90 shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col">
              
              {/* Input Header */}
              <div className="p-6 border-b border-white/5 flex items-center gap-4">
                <Search className="text-zinc-500" size={20} />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="Where would you like to go? (Home, About, Projects...)"
                  className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-zinc-600 text-lg font-medium"
                />
                <div className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-black text-zinc-500 uppercase tracking-tighter">
                  ESC
                </div>
              </div>

              {/* Results */}
              <div className="max-h-[400px] overflow-y-auto p-3 space-y-1 custom-scrollbar">
                {displayItems.length > 0 ? (
                  <>
                    <div className="px-3 py-2 text-[10px] uppercase font-black tracking-widest text-zinc-600 flex items-center gap-2">
                      {query === "" ? <History size={10} /> : <Zap size={10} />}
                      {query === "" ? "Recently Visited" : "Matching Sections"}
                    </div>
                    {displayItems.map((item, i) => (
                      <button
                        key={item.id}
                        onClick={() => handleSelect(item)}
                        onMouseEnter={() => setSelectedIndex(i)}
                        className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${
                          i === selectedIndex ? "bg-white/5 border border-white/10 shadow-xl" : "border border-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`p-2 rounded-lg ${i === selectedIndex ? "bg-brand-purple/20 text-brand-purple" : "bg-white/5 text-zinc-500"}`}>
                            {ICONS[item.id]}
                          </div>
                          <span className={`${i === selectedIndex ? "text-white font-bold" : "text-zinc-400 font-medium"}`}>
                            {item.name}
                          </span>
                        </div>
                        {i === selectedIndex && (
                          <motion.div layoutId="arrow-nav">
                             <ArrowRight size={14} className="text-brand-purple" />
                          </motion.div>
                        )}
                      </button>
                    ))}
                  </>
                ) : (
                  <div className="p-12 text-center text-zinc-500 space-y-4">
                    <Command size={32} className="mx-auto opacity-20" />
                    <p className="text-sm font-medium italic">No sections found matching "{query}"</p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-white/5 bg-white/[0.02] flex items-center justify-between text-[9px] font-black uppercase tracking-widest text-zinc-600">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1"><span className="text-zinc-400">↑↓</span> Navigate</span>
                  <span className="flex items-center gap-1"><span className="text-zinc-400">ENTER</span> Select</span>
                </div>
                <span>Rajesh AI Command Center</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
