"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChatModule from "@/components/ChatModule";
import ChatSidebar from "@/components/ChatSidebar";
import UserOnboarding from "@/components/UserOnboarding";
import { useChat } from "@/hooks/useChat";
import Link from "next/link";
import { Menu } from "lucide-react";

export default function ChatPage() {
  const { 
    userInfo, 
    saveUserInfo, 
    threads, 
    activeThreadId, 
    setActiveThreadId, 
    messages, 
    sendMessage, 
    createNewThread,
    deleteSession,
    isTyping,
    error 
  } = useChat();

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen w-full bg-bg-dark text-white overflow-hidden relative">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-brand-purple/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-[10%] right-[20%] w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-[150px]" />
      </div>

      {/* Onboarding Modal */}
      <AnimatePresence>
        {!userInfo && (
          <UserOnboarding onComplete={saveUserInfo} />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <ChatSidebar 
        threads={threads}
        activeThreadId={activeThreadId}
        onSelectThread={setActiveThreadId}
        onNewChat={createNewThread}
        onDeleteThread={deleteSession}
        userInfo={userInfo}
        isCollapsed={isSidebarCollapsed}
        toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-transparent relative">
        {/* Top Header Section */}
        <header className="px-6 py-4 flex items-center justify-between border-b border-white/5 bg-bg-dark/50 backdrop-blur-xl z-20">
          <div className="flex items-center gap-4">
             <Link 
              href="/" 
              className="text-zinc-500 hover:text-white transition-colors flex items-center gap-2 group text-[10px] uppercase tracking-widest"
             >
               <span className="group-hover:-translate-x-1 transition-transform">←</span> Portfolio
             </Link>
             <div className="w-px h-4 bg-white/10" />
             <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
               <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Rajesh_AI v2.0</span>
             </div>
          </div>
          
          <div className="flex items-center gap-4">
             {/* Mobile Menu Trigger placeholder */}
             <button className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors">
               <Menu size={20} />
             </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 flex flex-col items-center min-w-0 p-4 md:p-8 overflow-y-auto scrollbar-hide">
           <AnimatePresence mode="wait">
             <motion.div
               key={activeThreadId || "intro"}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               className="w-full flex-1 flex flex-col items-center max-w-5xl"
             >
                {!activeThreadId && messages.length === 0 ? (
                   <div className="text-center mb-10 space-y-4 pt-8 md:pt-16 pb-4">
                      <motion.h1 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-4xl md:text-7xl font-black tracking-tighter"
                      >
                        Talk to my <span className="text-gradient">Digital</span> Assistant.
                      </motion.h1>
                      <p className="text-zinc-500 text-sm md:text-base max-w-xl mx-auto font-medium">
                        Enter a prompt below to start a new neural link. Every session is automatically saved 
                        and synchronized using your Gmail ID.
                      </p>
                   </div>
                ) : null}

                <div className="w-full flex-1 min-h-[500px] flex flex-col pb-8">
                  <ChatModule 
                    messages={messages} 
                    onSendMessage={sendMessage} 
                    isTyping={isTyping} 
                    error={error} 
                    infoEmail={userInfo?.email}
                  />
                </div>
             </motion.div>
           </AnimatePresence>
        </div>

        {/* Floating Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-purple/5 rounded-full blur-[200px] -z-10 pointer-events-none" />
      </main>

      <style jsx global>{`
        body {
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
