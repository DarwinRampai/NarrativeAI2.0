import { Router } from "express";
import OpenAI from "openai";

const textRouter = Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
textRouter.post('/generate', async (req, res) => {
  try {
    const { prompt, options = {} } = req.body;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      ...options
    });

    res.json({
      success: true,
      data: response.choices[0].message
    });
  } catch (error) {
    console.error('Text generation error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

export { textRouter };
