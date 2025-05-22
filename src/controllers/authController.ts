import { data_source } from "../database";
import { User } from "../entities/User";
import { Response, Request, RequestHandler } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signup: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const userRepo = data_source.getRepository(User);
    const { username, password,role } = req.body;

    if (!username || !password) {
      res.status(400).json({ message: 'Username and password are required' });
      return; 
    }

    const existingUser = await userRepo.findOneBy({ username });
    if (existingUser) {
      res.status(409).json({ message: 'User already exists' });
      return; 
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User();
    user.username = username;
    user.password = hashedPassword;
    user.role = role; 

    await userRepo.save(user);
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const login: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const userRepo = data_source.getRepository(User);
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ message: 'Username and password are required' });
      return; 
    }

    const user = await userRepo.findOneBy({ username });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return; 
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid credentials' });
      return; 
    }

    const secret = process.env.JWT_SECRET || 'yashwanth';
    const token = jwt.sign(
      { userId: user.id, name: user.username, role: user.role },
      secret,
      { expiresIn: '1d' }
    );

    res.status(200).json({ success: true, token });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
