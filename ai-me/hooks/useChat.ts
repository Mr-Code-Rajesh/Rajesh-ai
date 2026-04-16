"use client";

import { useState, useCallback, useEffect } from "react";

export type Message = {
  role: "user" | "assistant";
  content: string;
};

export type ChatThread = {
  threadId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
};

export function useChat() {
  const [userInfo, setUserInfo] = useState<{ name: string; email: string } | null>(null);
  const [threads, setThreads] = useState<ChatThread[]>([]);
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 1. Initialize User Info from LocalStorage
  useEffect(() => {
    const stored = localStorage.getItem("rajesh_ai_user_info");
    if (stored) {
      const parsed = JSON.parse(stored);
      setUserInfo(parsed);
      fetchThreads(parsed.email);
    }
  }, []);

  // 2. Fetch Threads for user
  const fetchThreads = async (email: string) => {
    try {
      const res = await fetch(`/api/chat?email=${encodeURIComponent(email)}`);
      if (res.ok) {
        const json = await res.json();
        if (json.success) setThreads(json.data);
      }
    } catch (err) {
      console.error("Failed to load threads:", err);
    }
  };

  // 3. Load specific thread history
  useEffect(() => {
    if (!activeThreadId) {
      setMessages([]);
      return;
    }

    async function fetchThreadHistory() {
      setIsLoadingHistory(true);
      setError(null);
      try {
        const res = await fetch(`/api/chat/${activeThreadId}`);
        if (res.ok) {
          const json = await res.json();
          if (json.success) setMessages(json.data.messages);
        }
      } catch (err) {
        console.error("Failed to load history:", err);
        setError("Failed to load chat history");
      } finally {
        setIsLoadingHistory(false);
      }
    }

    fetchThreadHistory();
  }, [activeThreadId]);

  const saveUserInfo = (name: string, email: string) => {
    const info = { name, email };
    localStorage.setItem("rajesh_ai_user_info", JSON.stringify(info));
    setUserInfo(info);
    fetchThreads(email);
  };

  const createNewThread = useCallback(() => {
    const newId = crypto.randomUUID();
    setActiveThreadId(newId);
    setMessages([]);
    // We don't save to DB until the first message
  }, []);

  const deleteSession = async (threadId: string) => {
    try {
      const res = await fetch(`/api/chat/${threadId}`, { method: "DELETE" });
      if (res.ok) {
        setThreads(prev => prev.filter(t => t.threadId !== threadId));
        if (activeThreadId === threadId) {
          setActiveThreadId(null);
        }
      }
    } catch (err) {
      console.error("Failed to delete thread:", err);
    }
  };

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || !userInfo) return;

    // Use current activeThreadId or create one if missing
    let threadId = activeThreadId;
    if (!threadId) {
      threadId = crypto.randomUUID();
      setActiveThreadId(threadId);
    }

    const userMsg: Message = { role: "user", content };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);
    setError(null);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userEmail: userInfo.email,
          userName: userInfo.name,
          threadId,
          message: content
        }),
      });

      if (!response.ok) throw new Error("Failed to reach AI Assistant");

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantContent = "";

      // Prepare assistant empty message for streaming
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6).trim();
              if (data === "[DONE]") {
                // Re-fetch threads to get updated title if it was first message
                fetchThreads(userInfo.email);
                continue;
              }

              try {
                const parsed = JSON.parse(data);
                assistantContent += parsed.text || "";

                setMessages((prev) => {
                  const updated = [...prev];
                  const lastIdx = updated.length - 1;
                  if (updated[lastIdx].role === "assistant") {
                    updated[lastIdx] = { ...updated[lastIdx], content: assistantContent };
                  }
                  return updated;
                });
              } catch (e) { /* ignore partials */ }
            }
          }
        }
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsTyping(false);
    }
  }, [userInfo, activeThreadId]);

  return {
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
    isLoadingHistory,
    error
  };
}
