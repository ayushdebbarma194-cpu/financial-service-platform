import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export const config = {
  port: parseInt(process.env.PORT || "4000", 10),
  nodeEnv: process.env.NODE_ENV || "development",
  isDev: process.env.NODE_ENV !== "production",

  // Database
  databaseUrl: process.env.DATABASE_URL || "file:./dev.db",

  // JWT
  jwt: {
    secret: process.env.JWT_SECRET || "dev-secret",
    refreshSecret: process.env.JWT_REFRESH_SECRET || "dev-refresh-secret",
    expiresIn: process.env.JWT_EXPIRES_IN || "15m",
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
  },

  // Client
  clientUrl: process.env.CLIENT_URL || "http://localhost:3000",

  // Payment (Razorpay)
  razorpay: {
    keyId: process.env.RAZORPAY_KEY_ID || "",
    keySecret: process.env.RAZORPAY_KEY_SECRET || "",
    webhookSecret: process.env.RAZORPAY_WEBHOOK_SECRET || "",
  },

  // Telegram
  telegram: {
    botToken: process.env.TELEGRAM_BOT_TOKEN || "",
    channelId: process.env.TELEGRAM_CHANNEL_ID || "",
  },

  // Rate Limiting
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // requests per window
  },

  // Auth rate limit (stricter)
  authRateLimit: {
    windowMs: 15 * 60 * 1000,
    max: 10, // 10 attempts per 15 mins
  },
} as const;
