import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import { generateAIScript } from "./openai";
import { z } from "zod";
import { insertProjectSchema, insertScriptSchema } from "@shared/schema";
import { setupChatRoutes } from "./routes/chat";

export async function registerRoutes(app: Express): Promise<Server> {
  setupAuth(app);
  setupChatRoutes(app);

  // Projects
  app.get("/api/projects", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const projects = await storage.getProjects(req.user.id);
    res.json(projects);
  });

  app.post("/api/projects", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const data = insertProjectSchema.parse(req.body);
    const project = await storage.createProject({
      ...data,
      userId: req.user.id,
    });
    res.status(201).json(project);
  });

  // Scripts
  app.get("/api/projects/:projectId/scripts", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const scripts = await storage.getScripts(parseInt(req.params.projectId));
    res.json(scripts);
  });

  app.post("/api/projects/:projectId/scripts/generate", async (req, res) => {
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
  });

  // Templates
  app.get("/api/templates", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const templates = await storage.getTemplates();
    res.json(templates);
  });

  const httpServer = createServer(app);
  return httpServer;
}