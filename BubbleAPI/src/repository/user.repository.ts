import prisma from "../config/database.js";
import { createUserType } from "../protocols.js";

async function createUser(data: createUserType) {
  await prisma.users.create({
    data
  })
}

async function getUserByEmail(email: string) {
  return await prisma.users.findFirst(
    {
      where: {
        email,
      }
    })
}

export default {
  createUser,
  getUserByEmail
}