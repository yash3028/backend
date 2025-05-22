import { Router } from "express";
import { getPendingRequest, submitRequest, updateRequest } from "../controllers/RequestController";
import { Role } from "../middlewares/role";
const router = Router()
router.get('/',Role())
router.post('/',Role("Employee"),submitRequest)
router.post('/pending',Role("Manager"),getPendingRequest)
router.patch('/:id',Role("Manager"),updateRequest)
export default router