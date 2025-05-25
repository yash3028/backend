import { Router } from "express";
import { getPendingRequest, submitRequest, updateRequest } from "../controllers/RequestController";
import { Role } from "../middlewares/role";
const router = Router()

router.post('/',Role("Employee"),submitRequest)
router.get('/pending',Role("Manager"),getPendingRequest)
router.patch('/:id',Role("Manager"),updateRequest)
export default router