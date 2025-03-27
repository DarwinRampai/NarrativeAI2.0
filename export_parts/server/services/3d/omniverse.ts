import { Router } from "express";
import type { Request, Response } from "express";

const omniverseRouter = Router();

interface OmniverseResponse {
  success: boolean;
  data?: any;
  error?: string;
}

omniverseRouter.post('/render', async (req: Request, res: Response) => {
  try {
    const { scene, options = {} } = req.body;

    if (!process.env.OMNIVERSE_API_KEY) {
      throw new Error("NVIDIA Omniverse API key is not configured");
    }

    // Prepare the request to Omniverse API
    const response = await fetch('https://api.omniverse.nvidia.com/v1/render', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OMNIVERSE_API_KEY}`,
      },
      body: JSON.stringify({
        scene_data: scene,
        render_quality: options.quality || 'high',
        output_format: options.format || 'png',
        resolution: options.resolution || { width: 1920, height: 1080 },
      }),
    });

    if (!response.ok) {
      throw new Error(`Omniverse API error: ${response.statusText}`);
    }

    const result = await response.json();

    res.json({
      success: true,
      data: result
    } as OmniverseResponse);

  } catch (error) {
    console.error('Omniverse rendering error:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    } as OmniverseResponse);
  }
});

export { omniverseRouter };
