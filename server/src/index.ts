import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import { config } from "./config";
import routes from "./routes";
import { generalLimiter } from "./middleware/rate-limiter";
import { errorHandler, notFoundHandler } from "./middleware/error-handler";

const app = express();

// ─── Security ─────────────────────────────────────────────────────────────────
app.use(helmet());
app.use(
  cors({
    origin: config.clientUrl,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ─── Parsing ──────────────────────────────────────────────────────────────────
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// ─── Logging ──────────────────────────────────────────────────────────────────
if (config.isDev) {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

// ─── Compression ──────────────────────────────────────────────────────────────
app.use(compression());

// ─── Rate Limiting ────────────────────────────────────────────────────────────
app.use(generalLimiter);

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "Aetheris Markets API",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv,
  });
});

// ─── API Routes ───────────────────────────────────────────────────────────────
app.use("/api/v1", routes);

// ─── Error Handling ───────────────────────────────────────────────────────────
app.use(notFoundHandler);
app.use(errorHandler);

// ─── Start Server ─────────────────────────────────────────────────────────────
app.listen(config.port, () => {
  console.log(`
╔═══════════════════════════════════════════╗
║   Aetheris Markets API                    ║
║   Running on port ${config.port}                   ║
║   Environment: ${config.nodeEnv.padEnd(23)}║
║   Health: http://localhost:${config.port}/health    ║
╚═══════════════════════════════════════════╝
  `);
});

export default app;
