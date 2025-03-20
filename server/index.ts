import express, { type Request, Response, NextFunction } from "express";
import { Router } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import aiRoutes from "./routes/ai";

// Create Express app
const app = express();

// Essential middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Request logging
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    log(`${req.method} ${req.originalUrl} ${res.statusCode} in ${duration}ms`);
  });
  next();
});

// API middleware configuration
app.use('/api', (req, res, next) => {
  console.log("API Request:", {
    method: req.method,
    path: req.path,
    originalUrl: req.originalUrl,
    contentType: req.get('Content-Type')
  });

  res.setHeader('Content-Type', 'application/json');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Test endpoint to verify API routing
app.get('/api/ping', (req, res) => {
  console.log("Ping endpoint hit");
  res.json({ message: 'pong', timestamp: new Date().toISOString() });
});

// Mount API routes
app.use('/api/ai', aiRoutes);

(async () => {
  // Register backend routes
  const server = await registerRoutes(app);

  // Vite/Frontend handling - explicitly exclude API routes
  app.use((req, res, next) => {
    // Don't let Vite handle API routes
    if (!req.originalUrl.startsWith('/api')) {
      if (app.get("env") === "development") {
        setupVite(app, server)(req, res, next);
      } else {
        serveStatic(app)(req, res, next);
      }
    } else {
      next();
    }
  });

  // API error handling
  app.use('/api', (err: any, _req: Request, res: Response, _next: NextFunction) => {
    console.error("API Error:", err);
    res.status(err.status || 500).json({
      error: err.message || "Internal Server Error",
      details: app.get("env") === "development" ? err.stack : undefined
    });
  });

  // Global error handling
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error("Global Error:", err);

    if (req.originalUrl.startsWith('/api')) {
      return res.status(err.status || 500).json({
        error: err.message || "Internal Server Error",
        details: app.get("env") === "development" ? err.stack : undefined
      });
    }
    next(err);
  });

  const port = 5000;
  server.listen({
    port,
    host: "0.0.0.0",
  }, () => {
    log(`serving on port ${port}`);
  });
})();