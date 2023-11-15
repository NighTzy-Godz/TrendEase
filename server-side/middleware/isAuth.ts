import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface DecodedUser {
  _id: string;
  full_name: string;
  address: string;
  iat: number;
}

declare global {
  namespace Express {
    interface Request {
      user?: DecodedUser;
    }
  }
}

export default function isAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const jwtSecretPass = process.env.jwtSecretPass as string;

    const token = req.header("x-auth-token");

    if (!token) return res.status(403).send("Forbidden. Not Authorized");

    const decoded = jwt.verify(token, jwtSecretPass) as JwtPayload;

    const user: DecodedUser = {
      _id: decoded._id as string,
      full_name: decoded.full_name as string,
      address: decoded.address as string,
      iat: decoded.iat as number,
            };

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
}
