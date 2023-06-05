import joi from "joi"

export const userSignupSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
  userName: joi.string().required()
})

export const userSigninSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
})