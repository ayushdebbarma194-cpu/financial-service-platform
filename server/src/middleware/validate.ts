import { Request, Response, NextFunction } from "express";
import { z } from "zod/v4";
import { BadRequestError } from "../utils/errors";

export function validate(schema: z.ZodType) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const messages = error.issues.map((issue) => issue.message).join(", ");
        next(new BadRequestError(messages));
      } else {
        next(error);
      }
    }
  };
}

export function validateQuery(schema: z.ZodType) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    try {
      schema.parse(req.query);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const messages = error.issues.map((issue) => issue.message).join(", ");
        next(new BadRequestError(messages));
      } else {
        next(error);
      }
    }
  };
}
