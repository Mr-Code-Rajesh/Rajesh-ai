import mongoose, { Schema, Document, Model } from "mongoose";

// ─── Types ────────────────────────────────────────────────────────────────────

export type MessageRole = "user" | "assistant" | "system";

export interface IMessage {
  role: MessageRole;
  content: string;
  createdAt: Date;
}

export interface IChat extends Document {
  userEmail: string;
  userName?: string;
  threadId: string;
  title: string;
  messages: IMessage[];
  createdAt: Date;
  updatedAt: Date;
}

// ─── Sub-Schema: Message ──────────────────────────────────────────────────────

const MessageSchema = new Schema<IMessage>(
  {
    role: {
      type: String,
      enum: ["user", "assistant", "system"] as MessageRole[],
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: () => new Date(),
    },
  },
  { _id: false } // no separate _id for each message subdoc
);

// ─── Main Schema: Chat ────────────────────────────────────────────────────────

const ChatSchema = new Schema<IChat>(
  {
    userEmail: {
      type: String,
      required: true,
      index: true,
      trim: true,
    },
    userName: {
      type: String,
      trim: true,
    },
    threadId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    title: {
      type: String,
      default: "New Chat",
      trim: true,
    },
    messages: {
      type: [MessageSchema],
      default: [],
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt automatically
    collection: "chats",
  }
);

// ─── Model (with hot-reload cache guard) ──────────────────────────────────────

const Chat: Model<IChat> =
  mongoose.models.Chat ?? mongoose.model<IChat>("Chat", ChatSchema);

export default Chat;
