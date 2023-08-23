import { Response, Request, NextFunction } from "express";

export default function isPasswordMatch(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { password, confirmPassword } = req.body;

    if (password !== confirmPassword)
      return res.status(400).send("Password did not match");

    next();
  } catch (error) {
    next(error);
  }
}
