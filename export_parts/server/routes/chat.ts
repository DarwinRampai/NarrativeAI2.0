import { Express } from "express";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const MODEL = "gpt-4o";

export function setupChatRoutes(app: Express) {
  app.post("/api/chat", async (req, res) => {
    try {
      const { message } = req.body;

      const completion = await openai.chat.completions.create({
        model: MODEL,
        messages: [
          {
            role: "system",
            content: `You are an AI assistant for NarratixAI, an advanced AI-powered ad creation platform.
            You help users understand our features:
            - AI Script Generation
            - Next-Gen CGI Video Creation
            - Neural Avatars
            - Real-time Ad Optimization
            - Performance Analytics
            Be concise, professional, and focus on helping users understand how our platform can help their advertising needs.`
          },
          { role: "user", content: message }
        ],
      });

      res.json({ message: completion.choices[0].message.content });
    } catch (error) {
      console.error("OpenAI API error:", error);
      res.status(500).json({ error: "Failed to process your request" });
    }
  });
}
