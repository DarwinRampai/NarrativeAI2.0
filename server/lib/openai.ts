import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export interface AdScriptGenerationParams {
  industry: string;
  tone: string;
  targetAudience: string;
  key_points: string[];
  duration: number;
}

export interface AdScriptResponse {
  script: string;
  suggestions: string[];
  tone_analysis: {
    persuasiveness: number;
    clarity: number;
    engagement: number;
  };
}

export async function generateAdScript(params: AdScriptGenerationParams): Promise<AdScriptResponse> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an expert advertising copywriter specialized in creating persuasive, engaging ad scripts.",
        },
        {
          role: "user",
          content: `Create an ad script with the following parameters:
            - Industry: ${params.industry}
            - Tone: ${params.tone}
            - Target Audience: ${params.targetAudience}
            - Key Points: ${params.key_points.join(", ")}
            - Duration: ${params.duration} seconds
            
            Provide the response in JSON format with:
            - script: the complete ad script
            - suggestions: array of improvement suggestions
            - tone_analysis: object with persuasiveness, clarity, and engagement scores (0-1)`,
        },
      ],
      response_format: { type: "json_object" },
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error("Error generating ad script:", error);
    throw new Error("Failed to generate ad script");
  }
}

export async function analyzeAdPerformance(adScript: string): Promise<{
  performance_score: number;
  improvement_suggestions: string[];
}> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an AI advertising analyst specialized in evaluating ad effectiveness.",
        },
        {
          role: "user",
          content: `Analyze this ad script for effectiveness and provide suggestions for improvement:\n\n${adScript}\n\nRespond in JSON format with performance_score (0-1) and improvement_suggestions array.`,
        },
      ],
      response_format: { type: "json_object" },
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error("Error analyzing ad performance:", error);
    throw new Error("Failed to analyze ad performance");
  }
}
