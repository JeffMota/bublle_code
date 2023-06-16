import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken"

export async function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.header('Authorization')
  if (!authHeader) return res.sendStatus(401)

  const token = authHeader.split(' ')[1]
  if (!token) return res.sendStatus(401)

  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload

    req.userId = userId

    return next()

  } catch (error) {
    return res.sendStatus(401)
  }

}

export type AuthenticatedRequest = Request & JWTPayload

type JWTPayload = {
  userId: number
}