import express, { json } from "express"
import dotenv from "dotenv"
import cors from "cors"
import "express-async-errors"
import userRouter from "./routes/users.routes.js"
import { handlingErrorFunction } from "./middlewares/error.handling.middleware.js"
dotenv.config()

const app = express()
app.use(json())
app.use(cors())
app.use('/users', userRouter)
// app.use(handlingErrorFunction)

const PORT = +process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server is running on port:${PORT}`))