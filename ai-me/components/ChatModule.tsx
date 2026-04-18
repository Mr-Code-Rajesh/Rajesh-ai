"use client";

import React, { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import { Message } from "@/hooks/useChat";

const SUGGESTIONS = [
  "What is your tech stack?",
  "Tell me about your most complex AI project.",
  "Are you open to new projects or roles?",
  "How can I contact you?",
];

interface ChatModuleProps {
  messages: Message[];
  onSendMessage: (content: string) => void;
  isTyping: boolean;
  error: string | null;
  infoEmail?: string;
}

export default function ChatModule({
  messages,
  onSendMessage,
  isTyping,
  error,
  infoEmail
}: ChatModuleProps): React.JSX.Element {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <div className="flex flex-col w-full flex-1 glass-card rounded-3xl md:rounded-[2.5rem] bg-bg-dark/40 border border-white/10 overflow-hidden relative shadow-2xl transition-all duration-300">

      {/* Header Info */}
      {messages.length > 0 && (
        <div className="px-5 md:px-8 py-3 md:py-4 border-b border-white/5 bg-white/2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-1.5  md:w-2 h-2 rounded-full bg-brand-purple animate-pulse" />
            <span className="text-[9px] md:text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Active Neural Session</span>
          </div>
          <span className="text-[9px] md:text-[10px] font-mono text-zinc-700 truncate max-w-[100px] md:max-w-[150px]">{infoEmail}</span>
        </div>
      )}

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 md:p-10 space-y-4 md:space-y-6 scrollbar-hide"
      >
        {messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center h-full text-center space-y-6"
          >
            <div className="p-6 rounded-3xl bg-white/5 text-brand-purple border border-white/10 shadow-inner">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 21a9 9 0 100-18 9 9 0 000 18zM8 10h.01M16 10h.01M9 15h6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="space-y-2">
              <p className="text-white text-lg font-bold tracking-tight">Ready for Interaction</p>
              <p className="text-zinc-500 text-xs max-w-[240px] leading-relaxed mx-auto font-medium">
                I am synchronized with Rajesh's project registry and technical background. How can I assist you?
              </p>
            </div>

            {/* Suggestions in empty state */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-md w-full pt-8">
              {SUGGESTIONS.map((suggestion, i) => (
                <button
                  key={i}
                  onClick={() => onSendMessage(suggestion)}
                  className="px-4 py-3 rounded-2xl border border-white/5 bg-white/3 hover:bg-white/[0.07] hover:border-brand-purple/30 text-[11px] text-zinc-400 hover:text-white transition-all text-left flex items-center gap-3"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-purple/40" />
                  {suggestion}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        <AnimatePresence initial={false}>
          {messages.map((msg, idx) => (
            <MessageBubble
              key={idx}
              role={msg.role}
              content={msg.content}
              shouldAnimate={idx === messages.length - 1 && msg.role === "assistant" && isTyping}
            />
          ))}
        </AnimatePresence>

        {isTyping && messages[messages.length - 1]?.role !== "assistant" && (
          <MessageBubble role="assistant" content="" />
        )}

        {error && (
          <div className="text-center p-4 rounded-2xl bg-red-500/10 text-red-500 text-xs border border-red-500/20 font-mono uppercase tracking-widest">
            {error}
          </div>
        )}
      </div>

      {/* Input Container */}
      <div className="px-4 md:px-10 py-6 md:py-8 bg-bg-dark/60 backdrop-blur-md border-t border-white/5">
        <ChatInput onSend={onSendMessage} isLoading={isTyping} />
        <div className="mt-4 flex items-center justify-center gap-4 text-[8px] md:text-[9px] uppercase tracking-[0.2em] text-zinc-600 font-bold">
          <span>Gemini 2.0 Flash</span>
          <div className="w-1 h-1 rounded-full bg-zinc-800" />
          <span>Encrypted Stream</span>
        </div>
      </div>
    </div>
  );
}
