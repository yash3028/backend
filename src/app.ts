import express from "express"
import cors from "cors"
import auth from "./routes/auth"
import software from "./routes/software"
import request from "./routes/request"
const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/auth',auth)
app.use('/api/software',software)
app.use('/api/request',request)
export default app;

