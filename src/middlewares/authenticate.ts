import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { data_source } from "../database";
import { User } from "../entities/User";

interface JwtPayload {
  userId: number;
  name: string;
  role: string;
}

export interface AuthRequest extends Request {
  user?: User;
}

export const authenticate: RequestHandler = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ message: "header is missing" });
    return;
  }
  const token = authHeader.split(" ")[1];
  try {
    const secretKey = process.env.JWT_SECRET || "yashwanth";
    const payload = jwt.verify(token, secretKey) as JwtPayload;
    const userRepo = data_source.getRepository(User);
    const user = await userRepo.findOne({
      where: {
        id: payload.userId,
      },
    });
    if (!user) {
      res.status(404).json({ mesaage: "user not found" });
      return;
    }
    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({ message: "error" });
  }
};
