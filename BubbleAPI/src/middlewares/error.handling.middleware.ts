import { Request, Response } from "express";

export function handlingErrorFunction(error, req: Request, res: Response) {
  console.log(error)
  if (error.name === 'InvalidCredentialsError') {
    return res.status(401).send({
      message: error.message,
    });
  }

  console.log(error.name)
  res.status(500).send({
    error: 'InternalServerError',
    message: 'Internal Server Error',
  });
}