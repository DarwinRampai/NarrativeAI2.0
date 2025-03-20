import express, { type Request, Response, NextFunction } from "express";
import { Router } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import aiRoutes from "./routes/ai";

// Create separate apps for API and frontend
const app = express();
const apiApp = express();

// Essential middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
apiApp.use(express.json());
apiApp.use(express.urlencoded({ extended: false }));

// API middleware configuration
apiApp.use((req, res, next) => {
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
apiApp.get('/ping', (req, res) => {
  console.log("Ping endpoint hit");
  res.json({ message: 'pong', timestamp: new Date().toISOString() });
});

// Mount AI routes
apiApp.use('/ai', aiRoutes);

// API error handling
apiApp.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error("API Error:", err);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
    details: app.get("env") === "development" ? err.stack : undefined
  });
});

// Mount API app at /api path before any other middleware
app.use('/api', apiApp);

(async () => {
  const server = await registerRoutes(app);

  // Global error handling
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error("Global Error:", err);

    if (req.path.startsWith('/api')) {
      return res.status(err.status || 500).json({
        error: err.message || "Internal Server Error",
        details: app.get("env") === "development" ? err.stack : undefined
      });
    }
    next(err);
  });

  // Frontend handling - only for non-API routes
  if (app.get("env") === "development") {
    app.use((req, res, next) => {
      if (req.path.startsWith('/api')) {
        console.log("Skipping Vite for API route:", req.path);
        return next();
      }
      console.log("Handling frontend request:", req.path);
      return setupVite(app, server)(req, res, next);
    });
  } else {
    app.use((req, res, next) => {
      if (req.path.startsWith('/api')) {
        return next();
      }
      return serveStatic(app)(req, res, next);
    });
  }

  // Request logging
  app.use((req, res, next) => {
    const start = Date.now();
    res.on("finish", () => {
      const duration = Date.now() - start;
      log(`${req.method} ${req.originalUrl} ${res.statusCode} in ${duration}ms`);
    });
    next();
  });

  const port = 5000;
  server.listen({
    port,
    host: "0.0.0.0",
  }, () => {
    log(`serving on port ${port}`);
  });
})();