import prisma from "../config/database.js";

async function getProblemsList() {
  return await prisma.problems.findMany({
    select: {
      id: true,
      title: true,
      level: {
        select: {
          name: true
        }
      }
    }
  })
}

async function getProblemById(id: number) {
  return await prisma.problems.findFirst({
    where: {
      id
    },
    select: {
      title: true,
      description: true,
      code: true,
      level: {
        select: {
          name: true
        }
      },
      exemples: true
    }
  })
}

export default {
  getProblemsList,
  getProblemById
}