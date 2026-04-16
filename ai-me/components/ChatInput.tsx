"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
}

export default function ChatInput({ onSend, isLoading }: ChatInputProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSend(input);
      setInput("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full max-w-4xl mx-auto flex items-center gap-2 p-2 glass-card rounded-full glow transition-all"
    >
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
        disabled={isLoading}
        className="flex-1 bg-transparent px-6 py-3 text-sm focus:outline-none text-white disabled:opacity-50"
      />
      <motion.button
        whileTap={{ scale: 0.9 }}
        disabled={!input.trim() || isLoading}
        className="px-6 py-3 rounded-full bg-gradient-to-r from-brand-purple to-brand-blue text-white font-bold text-sm shadow-lg disabled:opacity-50 disabled:grayscale transition-all"
      >
        {isLoading ? "..." : "Send"}
      </motion.button>
    </form>
  );
}
