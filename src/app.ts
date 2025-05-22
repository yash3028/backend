import express from "express"
import cors from "cors"
import auth from "./routes/auth"
import software from "./routes/software"
import request from "./routes/request"
import { Role } from "./middlewares/role"
import { authenticate } from "./middlewares/authenticate"
const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/auth',auth)
app.use('/api/software',authenticate,software)
app.use('/api/request',authenticate,request)
export default app;

