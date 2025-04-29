import { Router } from "express";
import type { Request, Response } from "express";
import { textRouter } from "./text";
import { speechRouter } from "./speech";

// AI Service Types
export interface AIServiceResponse {
  success: boolean;
  data: any;
  error?: string;
}

export interface AIServiceRequest {
  type: 'text' | 'speech' | 'avatar' | 'video' | 'optimization';
  input: any;
  options?: any;
}

// Create orchestration router
const orchestrationRouter = Router();

// Middleware to validate AI service requests
const validateAIRequest = (req: Request, res: Response, next: Function) => {
  const { type, input } = req.body as AIServiceRequest;

  if (!type || !input) {
    return res.status(400).json({
      success: false,
      error: "Missing required fields: type and input"
    });
  }

  if (!['text', 'speech', 'avatar', 'video', 'optimization'].includes(type)) {
    return res.status(400).json({
      success: false,
      error: "Invalid service type"
    });
  }

  next();
};

// Mount specific service routers
orchestrationRouter.use('/text', textRouter);
orchestrationRouter.use('/speech', speechRouter);

// Main orchestration endpoint
orchestrationRouter.post('/generate', validateAIRequest, async (req: Request, res: Response) => {
  try {
    const { type, input, options } = req.body as AIServiceRequest;

    let result: AIServiceResponse;

    switch (type) {
      case 'text':
        const textResponse = await fetch(`${req.protocol}://${req.get('host')}/api/ai/text/generate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: input, options })
        });
        result = await textResponse.json();
        break;

      case 'speech':
        const speechResponse = await fetch(`${req.protocol}://${req.get('host')}/api/ai/speech/synthesize`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: input, ...options })
        });
        result = await speechResponse.json();
        break;

      case 'avatar':
        // TODO: Implement avatar generation service
        result = {
          success: true,
          data: { message: "Avatar generation service placeholder" }
        };
        break;

      case 'video':
        // TODO: Implement video creation service
        result = {
          success: true,
          data: { message: "Video creation service placeholder" }
        };
        break;

      case 'optimization':
        // TODO: Implement ad optimization service
        result = {
          success: true,
          data: { message: "Ad optimization service placeholder" }
        };
        break;

      default:
        throw new Error("Unsupported service type");
    }

    res.json(result);
  } catch (error) {
    console.error('Orchestration error:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Internal server error"
    });
  }
});

export { orchestrationRouter };