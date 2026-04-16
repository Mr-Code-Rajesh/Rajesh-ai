import { IMessage } from "@/models/Chat";
import { saveMessage } from "@/services/chatService";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const rajeshData = require("@/data/rajesh.json");

export function buildSystemPrompt(): string {
  const d = rajeshData;
  const skillsList = d.skills_tabs 
    ? Object.values(d.skills_tabs).flat().map((s: any) => s.name).join(", ")
    : "AI, React, Next.js, Node.js";

  return `You are Rajesh AI. Respond AS Rajesh in the first person. 
Summary: ${d.summary}
Skills: ${skillsList}`;
}

interface StreamParams {
  systemPrompt: string;
  history: IMessage[];
  userMessage: string;
  userId: string;
}

export async function streamAIResponse({
  systemPrompt,
  history,
  userMessage,
  userId,
}: StreamParams): Promise<ReadableStream<Uint8Array>> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("API Key Missing");

  // Format: Using the 2026 standard gemini-2.5-flash model
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:streamGenerateContent?key=${apiKey}`;

  // Some older projects/keys don't support system_instruction at the top level.
  // We'll move it into the first content as a "preamble" for maximum compatibility.
  const contents = [
    {
      role: "user",
      parts: [{ text: `SYSTEM INSTRUCTION: ${systemPrompt}\n\nUNDERSTOOD. I will now respond as Rajesh.` }]
    },
    {
      role: "model",
      parts: [{ text: "Understood. I am now Rajesh AI. How can I help you today?" }]
    },
    ...history.map((msg) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    })),
    {
      role: "user",
      parts: [{ text: userMessage }],
    },
  ];

  const requestBody = {
    contents,
    generationConfig: {
      temperature: 0.7,
      topP: 0.8,
      topK: 40,
      maxOutputTokens: 1024,
    },
  };

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error("Gemini API Error:", errorBody);
    throw new Error(`Gemini API returned ${response.status}`);
  }

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  let fullReply = "";

  return new ReadableStream({
    async start(controller) {
      if (!response.body) {
        controller.close();
        return;
      }

      const reader = response.body.getReader();
      
      try {
        let buffer = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          buffer += chunk;

          // Gemini's streamGenerateContent returns a JSON array: [ {...}, {...} ]
          // We extract objects by tracking braces.
          let startIdx;
          while ((startIdx = buffer.indexOf('{')) !== -1) {
            let depth = 0;
            let endIdx = -1;

            for (let i = startIdx; i < buffer.length; i++) {
              if (buffer[i] === '{') depth++;
              else if (buffer[i] === '}') depth--;

              if (depth === 0 && i > startIdx) {
                endIdx = i;
                break;
              }
            }

            if (endIdx !== -1) {
              const jsonStr = buffer.substring(startIdx, endIdx + 1);
              buffer = buffer.substring(endIdx + 1);
              // Skip trailing commas or brackets
              buffer = buffer.replace(/^[\s,\]]+/, "");

              try {
                const parsed = JSON.parse(jsonStr);
                const content = parsed.candidates?.[0]?.content?.parts?.[0]?.text;
                if (content) {
                  fullReply += content;
                  controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: content })}\n\n`));
                }
              } catch (e) {
                // Ignore parse errors for incomplete/malformed objects
              }
            } else {
              // Object is incomplete, wait for more chunks
              break;
            }
          }
        }

        // Signal end of stream
        controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
        controller.close();

        // Save assistant response to DB
        if (fullReply.trim()) {
          await saveMessage({
            threadId: userId,
            role: "assistant",
            content: fullReply.trim(),
          }).catch((e) => console.error("Error saving assistant reply:", e));
        }
      } catch (err) {
        controller.error(err);
      } finally {
        reader.releaseLock();
      }
    },
  });
}
