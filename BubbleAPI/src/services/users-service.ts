import userRepository from "../repository/user.repository.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { signInParams } from "../protocols.js"
import { invalidCredentialsError } from "../errors/unhautorized.erros.js"

async function createUser(email: string, password: string, userName: string) {
  const user = await userRepository.getUserByEmail(email)
  if (user) throw invalidCredentialsError('You can not use this e-mail')

  const hashedPassword: string = await bcrypt.hash(password, 10)
  await userRepository.createUser({ email, password: hashedPassword, userName })
}

async function signIn(params: signInParams) {
  const { email, password } = params

  const user = await userRepository.getUserByEmail(email)
  if (!user) throw invalidCredentialsError()

  const isValidPassword = await bcrypt.compare(password, user.password)
  if (!isValidPassword) throw invalidCredentialsError()

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET)

  return {
    userName: user.userName,
    token
  }
}

export default {
  createUser,
  signIn
}