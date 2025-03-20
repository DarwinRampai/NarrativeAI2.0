import { Router } from "express";
import { generateAdScript, analyzeAdPerformance } from "../lib/openai";
import { z } from "zod";

const router = Router();

const generateScriptSchema = z.object({
  industry: z.string(),
  tone: z.string(),
  targetAudience: z.string(),
  key_points: z.array(z.string()),
  duration: z.number().min(15).max(120),
});

const analyzeScriptSchema = z.object({
  script: z.string(),
});

router.post("/generate-script", async (req, res) => {
  console.log("API: Entered generate-script route handler");
  console.log("Request body:", req.body);
  console.log("Request headers:", req.headers);
  console.log("Request path:", req.path);
  console.log("Original URL:", req.originalUrl);
  try {
    // Ensure content type
    res.setHeader('Content-Type', 'application/json');
    const params = generateScriptSchema.parse(req.body);
    console.log("Validated params:", params);
    const result = await generateAdScript(params);
    console.log("Generated script result:", result);
    res.json(result);
  } catch (error) {
    console.error("Script generation error:", error);
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: "Invalid request parameters", details: error.errors });
    } else {
      res.status(500).json({ error: "Failed to generate ad script" });
    }
  }
});

router.post("/analyze-performance", async (req, res) => {
  console.log("API: Entered analyze-performance route handler");
  console.log("Request body:", req.body);

  try {
    // Ensure content type
    res.setHeader('Content-Type', 'application/json');
    const { script } = analyzeScriptSchema.parse(req.body);
    const analysis = await analyzeAdPerformance(script);
    res.json(analysis);
  } catch (error) {
    console.error("Analysis error:", error);
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: "Invalid request parameters", details: error.errors });
    } else {
      res.status(500).json({ error: "Failed to analyze ad performance" });
    }
  }
});

export default router;