import { Router } from "express";
import type { Request, Response } from "express";

const mayaRouter = Router();

interface MayaResponse {
  success: boolean;
  data?: any;
  error?: string;
}

mayaRouter.post('/render', async (req: Request, res: Response) => {
  try {
    const { scene, options = {} } = req.body;

    if (!process.env.MAYA_API_KEY) {
      throw new Error("Maya API key is not configured");
    }

    // Prepare the request to Maya API
    const response = await fetch('https://api.autodesk.maya/v1/render', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.MAYA_API_KEY}`,
      },
      body: JSON.stringify({
        scene_data: scene,
        render_settings: {
          quality: options.quality || 'production',
          frame_range: options.frame_range || { start: 1, end: 1 },
          resolution: options.resolution || { width: 1920, height: 1080 },
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Maya API error: ${response.statusText}`);
    }

    const result = await response.json();

    res.json({
      success: true,
      data: result
    } as MayaResponse);

  } catch (error) {
    console.error('Maya rendering error:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    } as MayaResponse);
  }
});

export { mayaRouter };
