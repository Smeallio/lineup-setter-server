import { NextFunction, Request, Response } from "express";
import { AuthenticatedRequest } from "../models/authentication";
import jwt from "jsonwebtoken";

export const requireAuth = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: "Missing or invalid authorization header" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as {
      managerId: string;
    };
    req.managerId = payload.managerId;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};
