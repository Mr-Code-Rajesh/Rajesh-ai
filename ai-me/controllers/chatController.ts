import { NextRequest, NextResponse } from "next/server";
import { listThreadsByUser, getChatByThread, saveMessage, deleteThread } from "@/services/chatService";
import { buildSystemPrompt, streamAIResponse } from "@/services/aiService";
import { z } from "zod";

// ─── Validation Schema ────────────────────────────────────────────────────────

// ─── Validation Schemas ──────────────────────────────────────────────────────

const PostChatSchema = z.object({
  userEmail: z.string().email("Invalid email format"),
  userName: z.string().optional(),
  threadId: z.string().min(1, "threadId is required"),
  message: z.string().min(1, "message cannot be empty").max(2000, "message too long"),
});

// ─── GET Handlers ─────────────────────────────────────────────────────────────

/**
 * Handles GET /api/chat?email=[email]
 * Lists all threads for a given email.
 */
export async function handleListThreads(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json(
      { success: false, error: "email parameter is required" },
      { status: 400 }
    );
  }

  try {
    const threads = await listThreadsByUser(email);
    return NextResponse.json({ success: true, data: threads });
  } catch (error) {
    console.error("[handleListThreads] Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to list chat threads" },
      { status: 500 }
    );
  }
}

/**
 * Handles GET /api/chat/[threadId]
 * Returns the messages for a specific thread.
 */
export async function handleGetThread(
  _req: NextRequest,
  threadId: string
): Promise<NextResponse> {
  if (!threadId) {
    return NextResponse.json(
      { success: false, error: "threadId is required" },
      { status: 400 }
    );
  }

  try {
    const messages = await getChatByThread(threadId);

    return NextResponse.json({
      success: true,
      data: {
        threadId,
        messages: messages ?? [],
      },
    });
  } catch (error) {
    console.error("[handleGetThread] Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to retrieve thread history" },
      { status: 500 }
    );
  }
}

// ─── POST Handler ─────────────────────────────────────────────────────────────

/**
 * Handles POST /api/chat
 */
export async function handlePostChat(req: NextRequest): Promise<Response> {
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = PostChatSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: "Validation failed", details: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  const { userEmail, userName, threadId, message } = parsed.data;

  try {
    // 1. Fetch conversation history for context
    const history = await getChatByThread(threadId);

    // 2. Build system prompt
    const systemPrompt = buildSystemPrompt();

    // 3. Save the user's message
    await saveMessage({
      userEmail,
      threadId,
      userName,
      role: "user",
      content: message
    });

    // 4. Stream response
    const stream = await streamAIResponse({
      systemPrompt,
      history: history ?? [],
      userMessage: message,
      userId: threadId, 
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (error) {
    console.error("[handlePostChat] Error:", error);
    return NextResponse.json(
      { success: false, error: "AI service error. Please try again." },
      { status: 500 }
    );
  }
}

// ─── DELETE Handler ───────────────────────────────────────────────────────────

/**
 * Handles DELETE /api/chat/[threadId]
 */
export async function handleDeleteThread(
  _req: NextRequest,
  threadId: string
): Promise<NextResponse> {
  if (!threadId) {
    return NextResponse.json({ success: false, error: "threadId is required" }, { status: 400 });
  }

  try {
    await deleteThread(threadId);
    return NextResponse.json({ success: true, message: "Thread deleted successfully" });
  } catch (error) {
    console.error("[handleDeleteThread] Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete thread" },
      { status: 500 }
    );
  }
}
