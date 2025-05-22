import { Router } from "express";
import { authenticate } from "../middlewares/authenticate";
import { getPendingRequest, submitRequest, updateRequest } from "../controllers/RequestController";
import { Role } from "../middlewares/role";
const router = Router()
router.post('/',authenticate,submitRequest)
router.post('/pending',authenticate,Role("Manager"),getPendingRequest)
router.patch('/:id',authenticate,Role("Manager"),updateRequest)
export default router