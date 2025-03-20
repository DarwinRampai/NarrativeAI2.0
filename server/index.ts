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

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    log(`${req.method} ${req.originalUrl} ${res.statusCode} in ${duration}ms`);
  });
  next();
});

// API Router setup
const apiRouter = Router();

// API middleware configuration
apiRouter.use((req, res, next) => {
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

// Test endpoint
apiRouter.get('/ping', (req, res) => {
  console.log("Ping endpoint hit");
  res.json({ message: 'pong', timestamp: new Date().toISOString() });
});

// Mount AI routes
apiRouter.use('/ai', aiRoutes);

// API error handling
apiRouter.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error("API Error:", err);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
    details: app.get("env") === "development" ? err.stack : undefined
  });
});

// Mount API router before any frontend middleware
app.use('/api', apiRouter);

(async () => {
  try {
    // Register backend routes
    const server = await registerRoutes(app);

    // Frontend handling - ensure it doesn't interfere with API routes
    app.use((req, res, next) => {
      if (req.path.startsWith('/api')) {
        console.log("Skipping frontend middleware for API route:", req.path);
        return next();
      }

      if (app.get("env") === "development") {
        console.log("Handling frontend request with Vite:", req.path);
        return setupVite(app, server)(req, res, next);
      } else {
        return serveStatic(app)(req, res, next);
      }
    });

    // Global error handling
    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      console.error("Error:", err);
      if (req.path.startsWith('/api')) {
        return res.status(err.status || 500).json({
          error: err.message || "Internal Server Error",
          details: app.get("env") === "development" ? err.stack : undefined
        });
      }
      next(err);
    });

    // Start server
    const port = 5000;
    server.listen(port, "0.0.0.0", () => {
      log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Server startup error:", error);
    process.exit(1);
  }
})();