import { Router } from "express";
import { createSoftware } from "../controllers/softwareController";
import { Role } from "../middlewares/role";


const router = Router()
router.post('/',Role('Admin'),createSoftware)

export default router