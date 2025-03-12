import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

interface ScriptPrompt {
  prompt: string;
  tone: string;
  audience: string;
}

export async function generateAIScript(prompt: string, tone: string, audience: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are an expert advertising copywriter. Create a persuasive ad script with the following characteristics:
          - Tone: ${tone}
          - Target Audience: ${audience}
          - Format: Return only the script content, no additional formatting or metadata
          - Length: 2-3 short paragraphs
          - Style: Engaging, memorable, and aligned with modern advertising best practices`
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return response.choices[0].message.content || "Failed to generate script";
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw new Error("Failed to generate script: " + (error as Error).message);
  }
}
