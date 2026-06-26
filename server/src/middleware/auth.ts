import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config";
import { AuthenticatedRequest, JwtPayload } from "../types";
import { UnauthorizedError, ForbiddenError } from "../utils/errors";

export function authenticate(
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
): void {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedError("Access token is required");
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, config.jwt.secret) as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      next(new UnauthorizedError("Access token has expired"));
    } else if (error instanceof jwt.JsonWebTokenError) {
      next(new UnauthorizedError("Invalid access token"));
    } else {
      next(error);
    }
  }
}

export function requireAdmin(
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
): void {
  if (!req.user || req.user.role !== "ADMIN") {
    return next(new ForbiddenError("Admin access required"));
  }
  next();
}
