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
      id: true,
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

async function getProblemTestCases(id: number) {
  return await prisma.problems_testcase.findMany(
    {
      where: { problemId: id }
    })
}

export default {
  getProblemsList,
  getProblemById,
  getProblemTestCases
}