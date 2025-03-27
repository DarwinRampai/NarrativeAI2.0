import { Router } from "express";
import type { Request, Response } from "express";

const runwayMLRouter = Router();

interface RunwayMLResponse {
  success: boolean;
  data?: any;
  error?: string;
}

// Generate video content using Runway ML
runwayMLRouter.post('/generate', async (req: Request, res: Response) => {
  try {
    const { prompt, options = {} } = req.body;

    if (!process.env.RUNWAY_API_KEY) {
      throw new Error("Runway ML API key is not configured");
    }

    // Prepare the request to Runway ML API
    const response = await fetch('https://api.runwayml.com/v1/inference', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RUNWAY_API_KEY}`
      },
      body: JSON.stringify({
        prompt,
        model: options.model || 'text-to-video',
        parameters: {
          ...options,
          num_frames: options.num_frames || 30,
          fps: options.fps || 24
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Runway ML API error: ${response.statusText}`);
    }

    const result = await response.json();

    res.json({
      success: true,
      data: result
    } as RunwayMLResponse);

  } catch (error) {
    console.error('Runway ML generation error:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    } as RunwayMLResponse);
  }
});

// Get generation status
runwayMLRouter.get('/status/:jobId', async (req: Request, res: Response) => {
  try {
    const { jobId } = req.params;

    if (!process.env.RUNWAY_API_KEY) {
      throw new Error("Runway ML API key is not configured");
    }

    const response = await fetch(`https://api.runwayml.com/v1/inference/${jobId}`, {
      headers: {
        'Authorization': `Bearer ${process.env.RUNWAY_API_KEY}`
      }
    });

    if (!response.ok) {
      throw new Error(`Runway ML API error: ${response.statusText}`);
    }

    const result = await response.json();

    res.json({
      success: true,
      data: result
    } as RunwayMLResponse);

  } catch (error) {
    console.error('Runway ML status check error:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    } as RunwayMLResponse);
  }
});

export { runwayMLRouter };
