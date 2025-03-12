import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

interface ScriptPrompt {
  prompt: string;
  tone: string;
  audience: string;
  industry?: string;
  brandVoice?: string;
  platform?: string;
}

interface ContentOptimization {
  targetAudience: string[];
  engagement: {
    score: number;
    suggestions: string[];
  };
  tone: {
    current: string;
    recommendations: string[];
  };
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

export async function optimizeContent(content: string): Promise<ContentOptimization> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `Analyze this ad content and provide optimization suggestions. Return a JSON object with:
          - Target audience identification
          - Engagement score and improvement suggestions
          - Tone analysis and recommendations
          Format the response as valid JSON.`
        },
        {
          role: "user",
          content
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.3,
    });

    return JSON.parse(response.choices[0].message.content || "{}");
  } catch (error) {
    console.error("Content optimization error:", error);
    throw new Error("Failed to optimize content: " + (error as Error).message);
  }
}

export async function generateAdVariations(
  baseScript: string,
  platforms: string[]
): Promise<Record<string, string>> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `Create platform-specific variations of this ad script. Adapt the content for each platform while maintaining the core message. Return a JSON object with platform names as keys and adapted scripts as values.`
        },
        {
          role: "user",
          content: `Base script: ${baseScript}\nPlatforms: ${platforms.join(", ")}`
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.5,
    });

    return JSON.parse(response.choices[0].message.content || "{}");
  } catch (error) {
    console.error("Ad variation generation error:", error);
    throw new Error("Failed to generate ad variations: " + (error as Error).message);
  }
}

export async function getAudienceInsights(
  demographics: string,
  behavior: string
): Promise<Record<string, any>> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `Analyze the target audience data and provide actionable insights. Return a JSON object with:
          - Audience segments
          - Content preferences
          - Engagement patterns
          - Platform recommendations`
        },
        {
          role: "user",
          content: `Demographics: ${demographics}\nBehavior patterns: ${behavior}`
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.4,
    });

    return JSON.parse(response.choices[0].message.content || "{}");
  } catch (error) {
    console.error("Audience insights error:", error);
    throw new Error("Failed to generate audience insights: " + (error as Error).message);
  }
}