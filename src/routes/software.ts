import { Router } from "express";
import { createSoftware, getAllSoftware } from "../controllers/softwareController";
import { Role } from "../middlewares/role";


const router = Router()


router.post('/',Role('Admin'),createSoftware)
router.get("/",Role("Employee"),getAllSoftware)
export default router