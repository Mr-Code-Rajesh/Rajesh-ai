import { connectDB } from "@/lib/mongodb";
import Chat, { IMessage, MessageRole } from "@/models/Chat";

// ─── Constants ────────────────────────────────────────────────────────────────

/** Maximum number of messages retained per conversation (sliding window) */
const MAX_MESSAGES = 20; // Increased for better context

// ─── Service Functions ────────────────────────────────────────────────────────

/**
 * Fetches all threads for a given user email.
 */
export async function listThreadsByUser(userEmail: string) {
  await connectDB();
  return await Chat.find({ userEmail })
    .select("threadId title createdAt updatedAt")
    .sort({ updatedAt: -1 })
    .lean();
}

/**
 * Fetches messages for a specific thread.
 */
export async function getChatByThread(threadId: string): Promise<IMessage[] | null> {
  await connectDB();
  const chat = await Chat.findOne({ threadId }).lean();
  if (!chat) return null;
  return chat.messages as IMessage[];
}

/**
 * Saves a new message to a specific thread.
 * Auto-generates title if it's the first message.
 */
export async function saveMessage(params: {
  userEmail?: string;
  threadId: string;
  userName?: string;
  role: MessageRole;
  content: string;
}): Promise<IMessage[]> {
  const { userEmail, threadId, userName, role, content } = params;
  await connectDB();

  const newMessage: IMessage = {
    role,
    content,
    createdAt: new Date(),
  };

  let chat = await Chat.findOne({ threadId });

  if (!chat) {
    if (!userEmail) throw new Error("userEmail is required to create a new thread");

    // If it's a new chat, use the first user message as the title (truncated)
    const title = role === "user"
      ? (content.length > 40 ? content.substring(0, 40) + "..." : content)
      : "New Chat";

    chat = new Chat({
      userEmail,
      threadId,
      userName,
      title,
      messages: [newMessage]
    });
  } else {
    chat.messages.push(newMessage);
    // If title is default and this is the first real user message, update it
    if (chat.title === "New Chat" && role === "user") {
      chat.title = content.length > 40 ? content.substring(0, 40) + "..." : content;
    }
  }

  // Trim to sliding window
  if (chat.messages.length > MAX_MESSAGES) {
    chat.messages = chat.messages.slice(chat.messages.length - MAX_MESSAGES);
  }

  await chat.save();
  return chat.messages as IMessage[];
}

/**
 * Deletes a specific thread by ID.
 */
export async function deleteThread(threadId: string): Promise<void> {
  await connectDB();
  await Chat.deleteOne({ threadId });
}

/**
 * @deprecated Use deleteThread instead
 */
export async function clearChatHistory(userEmail: string): Promise<void> {
  await connectDB();
  await Chat.deleteMany({ userEmail });
}
