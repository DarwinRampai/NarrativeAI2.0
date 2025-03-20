import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import { z } from "zod";
import { insertProjectSchema } from "@shared/schema";
import { orchestrationRouter } from "./services/orchestration";

// Create an async handler utility
const asyncHandler = (fn: Function) => (req: any, res: any, next: any) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication
  setupAuth(app);

  // Mount AI orchestration router
  app.use('/api/ai', orchestrationRouter);

  // Project routes
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

  // Scripts routes
  app.get("/api/projects/:projectId/scripts", asyncHandler(async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const scripts = await storage.getScripts(parseInt(req.params.projectId));
    res.json(scripts);
  }));

  const httpServer = createServer(app);
  return httpServer;
}