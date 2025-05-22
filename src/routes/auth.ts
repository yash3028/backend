import { Router } from "express";
import { login,signup } from "../controllers/authController";
import express from 'express'
import { authenticate } from "../middlewares/authenticate";
import { Role } from "../middlewares/role";
const router = express.Router();


router.post('/signup', signup);
router.post('/login', login);

export default router;
