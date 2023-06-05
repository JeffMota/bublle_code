import { NextFunction, Request, Response } from "express";
import usersService from "../services/users-service.js";

export async function createUser(req: Request, res: Response, next: NextFunction) {
  const { email, password, userName } = req.body
  if (!email || !password || !userName) return res.sendStatus(400)

  try {
    await usersService.createUser(email, password, userName)
    return res.sendStatus(201)
  } catch (error) {
    if (error.name === "InvalidCredentialsError") return res.status(401).send(error.message)
    next(error)
  }
}

export async function signIn(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body
  if (!email || !password) return res.sendStatus(400)

  try {
    const user = await usersService.signIn({ email, password })
    return res.send(user)
  } catch (error) {
    if (error.name === "InvalidCredentialsError") return res.status(401).send('Email or password is incorrect')
    next(error)
  }
}