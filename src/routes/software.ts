import { Router } from "express";
import { authenticate } from "../middlewares/authenticate";
import { createSoftware } from "../controllers/softwareController";
import { Role } from "../middlewares/role";


const router = Router()
router.post('/',authenticate,Role('Admin'),createSoftware)

export default router