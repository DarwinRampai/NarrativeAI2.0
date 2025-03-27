import { Router } from "express";
import type { Request, Response } from "express";

const stableDiffusionRouter = Router();

interface StableDiffusionResponse {
  success: boolean;
  data?: any;
  error?: string;
}

stableDiffusionRouter.post('/generate', async (req: Request, res: Response) => {
  try {
    const { prompt, options = {} } = req.body;

    if (!process.env.STABLE_DIFFUSION_API_KEY) {
      throw new Error("Stable Diffusion API key is not configured");
    }

    // Prepare the request to Stable Diffusion API
    const response = await fetch('https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.STABLE_DIFFUSION_API_KEY}`,
      },
      body: JSON.stringify({
        text_prompts: [{ text: prompt }],
        cfg_scale: options.cfg_scale || 7,
        height: options.height || 1024,
        width: options.width || 1024,
        steps: options.steps || 50,
        samples: options.samples || 1,
      }),
    });

    if (!response.ok) {
      throw new Error(`Stable Diffusion API error: ${response.statusText}`);
    }

    const result = await response.json();

    res.json({
      success: true,
      data: result
    } as StableDiffusionResponse);

  } catch (error) {
    console.error('Stable Diffusion generation error:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    } as StableDiffusionResponse);
  }
});

export { stableDiffusionRouter };
