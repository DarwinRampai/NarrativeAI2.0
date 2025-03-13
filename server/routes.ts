import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import { generateAIScript, optimizeContent, generateAdVariations, getAudienceInsights, generateFeatureRecommendations, analyzeUserBehavior } from "./openai";
import { z } from "zod";
import { insertProjectSchema, insertScriptSchema, insertUserInteractionSchema, insertFeatureRecommendationSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  setupAuth(app);

  // Error handling middleware
  const asyncHandler = (fn: Function) => (req: any, res: any, next: any) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

  // Projects
  app.get("/api/projects", asyncHandler(async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const projects = await storage.getProjects(req.user.id);
    res.json(projects);
  }));

  app.post("/api/projects", asyncHandler(async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const data = insertProjectSchema.parse(req.body);
    const project = await storage.createProject({
      ...data,
      userId: req.user.id,
    });
    res.status(201).json(project);
  }));

  // Scripts
  app.get("/api/projects/:projectId/scripts", asyncHandler(async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const scripts = await storage.getScripts(parseInt(req.params.projectId));
    res.json(scripts);
  }));

  app.post("/api/projects/:projectId/scripts/generate", asyncHandler(async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    const schema = z.object({
      prompt: z.string(),
      tone: z.string(),
      audience: z.string(),
    });

    const data = schema.parse(req.body);
    const content = await generateAIScript(data.prompt, data.tone, data.audience);

    const script = await storage.createScript({
      projectId: parseInt(req.params.projectId),
      content,
      metadata: data,
    });

    res.status(201).json(script);
  }));

  // Content Optimization
  app.post("/api/optimize-content", asyncHandler(async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    const schema = z.object({
      content: z.string(),
    });

    const data = schema.parse(req.body);
    const optimization = await optimizeContent(data.content);
    res.json(optimization);
  }));

  // Ad Variations
  app.post("/api/generate-variations", asyncHandler(async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    const schema = z.object({
      baseScript: z.string(),
      platforms: z.array(z.string()),
    });

    const data = schema.parse(req.body);
    const variations = await generateAdVariations(data.baseScript, data.platforms);
    res.json(variations);
  }));

  // Audience Insights
  app.post("/api/audience-insights", asyncHandler(async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    const schema = z.object({
      demographics: z.string(),
      behavior: z.string(),
    });

    const data = schema.parse(req.body);
    const insights = await getAudienceInsights(data.demographics, data.behavior);
    res.json(insights);
  }));

  // Templates
  app.get("/api/templates", asyncHandler(async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const templates = await storage.getTemplates();
    res.json(templates);
  }));

  // New routes for feature recommendations
  app.post("/api/interactions", asyncHandler(async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    const data = insertUserInteractionSchema.parse(req.body);
    const interaction = await storage.recordUserInteraction({
      ...data,
      userId: req.user.id,
    });
    res.status(201).json(interaction);
  }));

  app.get("/api/recommendations", asyncHandler(async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    const userInteractions = await storage.getUserInteractions(req.user.id);
    const currentFeature = req.query.feature as string;

    const recommendations = await generateFeatureRecommendations(
      userInteractions,
      currentFeature
    );

    res.json(recommendations);
  }));

  app.get("/api/behavior-insights", asyncHandler(async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    const userInteractions = await storage.getUserInteractions(req.user.id);
    const insights = await analyzeUserBehavior(userInteractions);

    res.json(insights);
  }));

  // Error handling middleware
  app.use((err: any, req: any, res: any, next: any) => {
    console.error(err);
    res.status(err.status || 500).json({
      message: err.message || 'Internal Server Error',
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}