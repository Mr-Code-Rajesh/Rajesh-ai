import { NextRequest } from "next/server";
import { handleGetThread, handleDeleteThread } from "@/controllers/chatController";

type Params = Promise<{ threadId: string }>;

/**
 * GET /api/chat/[threadId]
 * Fetches message history for a specific thread.
 */
export async function GET(req: NextRequest, segment: { params: Params }) {
  const { threadId } = await segment.params;
  return handleGetThread(req, threadId);
}

/**
 * DELETE /api/chat/[threadId]
 * Removes a specific thread.
 */
export async function DELETE(req: NextRequest, segment: { params: Params }) {
  const { threadId } = await segment.params;
  return handleDeleteThread(req, threadId);
}
