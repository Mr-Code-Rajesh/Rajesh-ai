"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LOG_MESSAGES = [
  "IDENTITY_VERIFIED: RAJESH_P",
  "PROTOCOL_INIT: MISSION_ARCHIVES",
  "SCANNING_DEPLOYS...",
  "LUCID_EXTRACTOR: STATUS_ONLINE",
  "AI_CLEANUP_PLATFORM: OPTIMIZING_QUEUES",
  "SAKTRIX_UI: 240+ COMPONENTS_LOADED",
  "NURAL_AI: ARCHITECTING_FUTURE",
  "LOADING_CORE_MODULES...",
  "ENCRYPTING_BIO_DOSSAR",
  "SYNCING_GITHUB_ARTIFACTS",
  "AI_AGENT_PROTOCOLS: ACTIVE",
  "NEURAL_LINK: ESTABLISHED",
  "DATA_STREAM: 44.2GB/S",
  "LATENCY: 0.002MS",
  "HEARTBEAT: NOMINAL",
  "ENTROPY_ANALYSIS: COMPLETE",
];

export default function SystemFeed() {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLogs((prev) => {
        const next = [...prev, LOG_MESSAGES[Math.floor(Math.random() * LOG_MESSAGES.length)]];
        if (next.length > 20) return next.slice(1);
        return next;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 right-0 w-full h-full pointer-events-none z-0 overflow-hidden opacity-20">
      <div className="absolute top-32 right-8 flex flex-col items-end gap-1 font-mono text-[9px] uppercase tracking-widest text-[#00FF41]">
        <AnimatePresence mode="popLayout">
          {logs.map((log, i) => (
            <motion.div
              key={`${log}-${i}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 0.6, x: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
            >
              {`> ${log}`}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Vertical Side Logs */}
      <div className="absolute left-8 bottom-32 flex flex-col gap-1 font-mono text-[9px] uppercase tracking-widest text-[#00FF41]/40 rotate-180 [writing-mode:vertical-lr]">
        <span>SYSTEM_LOAD: 0.002%</span>
        <span>UPTIME: 1775:57:848:5329S</span>
        <span>LOCATION: CHENNAI_INDIA</span>
        <span className="mt-4 text-[#00D1FF]/60 italic font-bold">STATE: AUTONOMOUS_ACTIVE</span>
      </div>
    </div>
  );
}
