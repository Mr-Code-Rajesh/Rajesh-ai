import { NextRequest } from "next/server";
import { handlePostChat, handleListThreads } from "@/controllers/chatController";

// ─── GET /api/chat?email=... ──────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  return handleListThreads(req);
}

// ─── POST /api/chat ───────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  return handlePostChat(req);
}
