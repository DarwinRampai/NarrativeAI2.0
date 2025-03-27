import { Router } from "express";
import type { Request, Response } from "express";

const blenderRouter = Router();

interface BlenderResponse {
  success: boolean;
  data?: any;
  error?: string;
}

blenderRouter.post('/render', async (req: Request, res: Response) => {
  try {
    const { scene, options = {} } = req.body;

    if (!process.env.BLENDER_API_KEY) {
      throw new Error("Blender API key is not configured");
    }

    // Prepare the request to Blender API
    const response = await fetch('https://api.blender.org/v1/render', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.BLENDER_API_KEY}`,
      },
      body: JSON.stringify({
        scene_data: scene,
        render_engine: options.engine || 'cycles',
        samples: options.samples || 128,
        resolution: options.resolution || { width: 1920, height: 1080 },
      }),
    });

    if (!response.ok) {
      throw new Error(`Blender API error: ${response.statusText}`);
    }

    const result = await response.json();

    res.json({
      success: true,
      data: result
    } as BlenderResponse);

  } catch (error) {
    console.error('Blender rendering error:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    } as BlenderResponse);
  }
});

export { blenderRouter };
