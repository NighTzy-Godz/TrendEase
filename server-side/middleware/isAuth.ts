import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
export default function isAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const jwtSecretPass = process.env.jwtSecretPass as string;

    const token = req.header("x-auth-token");

    if (!token) return res.status(403).send("Forbidden. Not Authorized");

    const decoded = jwt.verify(token, jwtSecretPass);
    (req as any).user = decoded;
    next();
  } catch (error) {
    next(error);
  }
}
