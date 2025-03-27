import { Router } from "express";
import type { Request, Response } from "express";

const metahumanRouter = Router();

interface MetahumanResponse {
  success: boolean;
  data?: any;
  error?: string;
}

metahumanRouter.post('/create', async (req: Request, res: Response) => {
  try {
    const { parameters, options = {} } = req.body;

    if (!process.env.METAHUMAN_API_KEY) {
      throw new Error("Metahuman API key is not configured");
    }

    // Prepare the request to Metahuman API
    const response = await fetch('https://api.metahuman.unrealengine.com/v1/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.METAHUMAN_API_KEY}`,
      },
      body: JSON.stringify({
        facial_features: parameters.facial_features,
        body_type: parameters.body_type,
        animations: parameters.animations,
        output_format: options.format || 'fbx',
      }),
    });

    if (!response.ok) {
      throw new Error(`Metahuman API error: ${response.statusText}`);
    }

    const result = await response.json();

    res.json({
      success: true,
      data: result
    } as MetahumanResponse);

  } catch (error) {
    console.error('Metahuman creation error:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    } as MetahumanResponse);
  }
});

export { metahumanRouter };
