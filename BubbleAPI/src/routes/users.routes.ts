import { Router } from "express";
import { createUser, signIn } from "../controllers/users.controller.js";
import validateSchema from "../middlewares/validate.schema.js";
import { userSignupSchema, userSigninSchema } from "../schemas/user.schemas.js";

const userRouter = Router()

userRouter.post('/signup', validateSchema(userSignupSchema), createUser)
userRouter.post('/signin', validateSchema(userSigninSchema), signIn)

export default userRouter