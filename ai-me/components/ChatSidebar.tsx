"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  MessageSquare,
  Trash2,
  User,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Terminal
} from "lucide-react";

interface ChatThread {
  threadId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

interface ChatSidebarProps {
  threads: ChatThread[];
  activeThreadId: string | null;
  onSelectThread: (id: string) => void;
  onNewChat: () => void;
  onDeleteThread: (id: string) => void;
  userInfo: { name: string; email: string } | null;
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

export default function ChatSidebar({
  threads,
  activeThreadId,
  onSelectThread,
  onNewChat,
  onDeleteThread,
  userInfo,
  isCollapsed,
  toggleSidebar
}: ChatSidebarProps) {
  return (
    <motion.div
      initial={false}
      animate={{ width: isCollapsed ? "80px" : "320px" }}
      className="h-full bg-bg-dark border-r border-white/5 flex flex-col relative transition-all duration-500 ease-in-out z-50"
    >
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-10 w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-500 hover:text-white backdrop-blur-xl z-20"
      >
        {isCollapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>

      {/* Header / New Chat */}
      <div className="p-4 space-y-4">
        <button
          onClick={onNewChat}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all group overflow-hidden"
        >
          <div className="p-1.5 rounded-lg bg-brand-purple/20 border border-brand-purple/30 group-hover:scale-110 transition-transform">
            <Plus size={16} className="text-brand-purple" />
          </div>
          {!isCollapsed && (
            <span className="text-xs font-mono font-bold uppercase tracking-widest whitespace-nowrap">New Session</span>
          )}
        </button>
      </div>

      {/* Thread List */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2 scrollbar-hide">
        {!isCollapsed && (
          <div className="flex items-center gap-2 px-2 py-2 mb-2">
            <Terminal size={12} className="text-zinc-600" />
            <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.3em]">History_Log</span>
          </div>
        )}

        <AnimatePresence initial={false}>
          {threads.map((thread) => {
            const isActive = activeThreadId === thread.threadId;
            return (
              <motion.div
                key={thread.threadId}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="group relative"
              >
                <button
                  onClick={() => onSelectThread(thread.threadId)}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl border transition-all relative overflow-hidden ${isActive
                      ? "bg-brand-purple/10 border-brand-purple/30 text-white"
                      : "bg-transparent border-transparent text-zinc-500 hover:bg-white/5"
                    }`}
                >
                  <MessageSquare size={16} className={isActive ? "text-brand-purple" : "text-zinc-700"} />
                  {!isCollapsed && (
                    <span className="text-[11px] font-medium truncate pr-6 text-left w-full transition-colors group-hover:text-zinc-300">
                      {thread.title}
                    </span>
                  )}
                </button>

                {!isCollapsed && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteThread(thread.threadId);
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-red-500/10 text-zinc-600 hover:text-red-500 transition-all z-10"
                  >
                    <Trash2 size={12} />
                  </button>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* User Footer */}
      <div className="p-4 border-t border-white/5 bg-white/2">
        <div className="flex items-center gap-4 px-2 py-3 rounded-2xl hover:bg-white/5 transition-colors cursor-pointer group">
          <div className="w-10 h-10 rounded-full bg-linear-to-br from-brand-purple to-brand-blue p-px">
            <div className="w-full h-full rounded-full bg-bg-dark flex items-center justify-center">
              <User size={18} className="text-white/80" />
            </div>
          </div>
          {!isCollapsed && (
            <div className="flex-1 truncate">
              <p className="text-[11px] font-bold text-white truncate">{userInfo?.name || "Initializing..."}</p>
              <p className="text-[9px] text-zinc-600 font-mono truncate">{userInfo?.email || "syncing_engine"}</p>
            </div>
          )}
          {!isCollapsed && <Settings size={14} className="text-zinc-700 group-hover:text-zinc-400 transition-colors" />}
        </div>
      </div>
    </motion.div>
  );
}
