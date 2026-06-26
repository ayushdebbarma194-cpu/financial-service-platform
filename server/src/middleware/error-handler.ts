import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/errors";
import { sendError } from "../utils/response";
import { config } from "../config";

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (config.isDev) {
    console.error("Error:", err);
  }

  if (err instanceof AppError) {
    sendError(res, err.message, err.statusCode);
    return;
  }

  // Unknown errors
  const message = config.isDev ? err.message : "Something went wrong";
  sendError(res, message, 500);
}

export function notFoundHandler(
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  sendError(res, `Route ${req.method} ${req.path} not found`, 404);
}
