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

export class OpenAIError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string,
    public details?: any
  ) {
    super(message);
    this.name = 'OpenAIError';
  }
}

export async function generateAdScript(params: AdScriptGenerationParams): Promise<AdScriptResponse> {
  try {
    console.log("Generating ad script with params:", params);

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

    console.log("OpenAI response received:", response.choices[0].message.content);

    const result = JSON.parse(response.choices[0].message.content);
    return result;
  } catch (error: any) {
    console.error("Error in generateAdScript:", error);

    // Detailed error logging for debugging
    if (error.response?.data) {
      console.error("OpenAI API Error Details:", {
        status: error.status,
        type: error.response.data.error?.type,
        code: error.response.data.error?.code,
        param: error.response.data.error?.param,
        message: error.response.data.error?.message
      });
    }

    // Handle specific OpenAI errors
    if (error.status === 429) {
      throw new OpenAIError(
        "OpenAI API rate limit exceeded. Please try again in a few minutes.",
        429,
        "rate_limit_exceeded",
        error.response?.data
      );
    }

    if (error.status === 401) {
      throw new OpenAIError(
        "Invalid OpenAI API key. Please check your API key configuration.",
        401,
        "invalid_api_key",
        error.response?.data
      );
    }

    if (error.status === 500) {
      throw new OpenAIError(
        "OpenAI service is currently experiencing issues. Please try again later.",
        500,
        "service_error",
        error.response?.data
      );
    }

    // Handle general errors
    throw new OpenAIError(
      `Failed to generate ad script: ${error.message}`,
      error.status,
      error.code,
      error.response?.data
    );
  }
}

export async function analyzeAdPerformance(adScript: string): Promise<{
  performance_score: number;
  improvement_suggestions: string[];
}> {
  try {
    console.log("Analyzing ad performance for script:", adScript);

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

    console.log("OpenAI analysis response received:", response.choices[0].message.content);

    const result = JSON.parse(response.choices[0].message.content);
    return result;
  } catch (error: any) {
    console.error("Error in analyzeAdPerformance:", error);

    // Detailed error logging for debugging
    if (error.response?.data) {
      console.error("OpenAI API Error Details:", {
        status: error.status,
        type: error.response.data.error?.type,
        code: error.response.data.error?.code,
        param: error.response.data.error?.param,
        message: error.response.data.error?.message
      });
    }

    // Handle specific OpenAI errors
    if (error.status === 429) {
      throw new OpenAIError(
        "OpenAI API rate limit exceeded. Please try again in a few minutes.",
        429,
        "rate_limit_exceeded",
        error.response?.data
      );
    }

    if (error.status === 401) {
      throw new OpenAIError(
        "Invalid OpenAI API key. Please check your API key configuration.",
        401,
        "invalid_api_key",
        error.response?.data
      );
    }

    if (error.status === 500) {
      throw new OpenAIError(
        "OpenAI service is currently experiencing issues. Please try again later.",
        500,
        "service_error",
        error.response?.data
      );
    }

    // Handle general errors
    throw new OpenAIError(
      `Failed to analyze ad performance: ${error.message}`,
      error.status,
      error.code,
      error.response?.data
    );
  }
}