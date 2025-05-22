import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from 'jsonwebtoken'

interface JwtPayload{
    userId:number;
    name:string;
    role:string;
}

export interface AuthRequest extends Request{
    user?: JwtPayload;
}

export const authenticate:RequestHandler = (
    req:AuthRequest,
    res:Response,
    next:NextFunction
)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader){
         res.status(401).json({message:'header is missing'})
         return
    }
    const token = authHeader.split(' ')[1] 
    try{
        const secretKey = process.env.JWT_SECRET || 'yashwanth';
        const payload = jwt.verify(token, secretKey) as JwtPayload
        req.user = payload;
        next()
    }catch(error){
        res.status(401).json({message:"error"})
    }
};
