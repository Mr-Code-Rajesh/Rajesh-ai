"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MessageBubbleProps {
  role: "user" | "assistant";
  content: string;
}

export default function MessageBubble({ role, content }: MessageBubbleProps) {
  const isUser = role === "user";
  const [displayedContent, setDisplayedContent] = useState(isUser ? content : "");
  const [isTypingComplete, setIsTypingComplete] = useState(isUser);

  useEffect(() => {
    if (isUser) {
      setDisplayedContent(content);
      setIsTypingComplete(true);
      return;
    }

    if (!content) {
      setDisplayedContent("");
      setIsTypingComplete(false);
      return;
    }

    // AI Typing logic: 30ms per character
    let i = 0;
    setDisplayedContent("");
    setIsTypingComplete(false);
    
    const interval = setInterval(() => {
      setDisplayedContent(content.slice(0, i + 1));
      i++;
      if (i >= content.length) {
        clearInterval(interval);
        setIsTypingComplete(true);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [content, isUser]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={`flex w-full mb-4 ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[85%] px-5 py-4 rounded-3xl text-sm leading-relaxed relative overflow-hidden transition-all duration-300 ${
          isUser
            ? "bg-gradient-to-br from-brand-purple to-brand-pink text-white rounded-tr-none shadow-xl shadow-brand-purple/10"
            : "glass-card text-zinc-200 rounded-tl-none border border-white/5"
        }`}
      >
        {!isUser && !content && (
           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" 
                style={{ animation: 'shimmer 2s infinite' }} 
           />
        )}
        
        <p className="relative z-10 whitespace-pre-wrap">
          {isUser ? content : displayedContent}
          {!isTypingComplete && !isUser && content && (
            <motion.span 
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-1.5 h-4 ml-1 bg-brand-purple align-middle"
            />
          )}
        </p>

        {!isUser && !content && (
          <div className="flex gap-2 py-1 relative z-10">
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 0.6, repeat: Infinity }}
              className="w-2 h-2 bg-brand-purple rounded-full"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
              className="w-2 h-2 bg-brand-blue rounded-full"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
              className="w-2 h-2 bg-brand-pink rounded-full"
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}
