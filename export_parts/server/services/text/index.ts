import { Router } from "express";
import OpenAI from "openai";

const textRouter = Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
textRouter.post('/generate', async (req, res) => {
  try {
    const { prompt, options = {} } = req.body;

    // Build a comprehensive prompt for ad generation
    const systemPrompt = `You are an expert advertising copywriter. Create engaging ad content based on the provided details. 
    Return a JSON response with the following structure:
    {
      "headline": "Main attention-grabbing headline",
      "tagline": "Short, memorable tagline",
      "script": "Full ad script/copy",
      "keyPoints": ["Array of 3-5 key selling points"],
      "callToAction": "Clear call to action"
    }`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: JSON.stringify(prompt) }
      ],
      response_format: { type: "json_object" },
      ...options
    });

    res.json({
      success: true,
      data: JSON.parse(response.choices[0].message.content)
    });
  } catch (error) {
    console.error('Text generation error:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    });
  }
});

export { textRouter };