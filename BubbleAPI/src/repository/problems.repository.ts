import { problems, problems_exemples, problems_testcase } from "@prisma/client";
import prisma from "../config/database.js";
import { inputProblemType } from "../protocols.js";

async function getProblemsList() {
  return await prisma.problems.findMany({
    select: {
      id: true,
      title: true,
      description: true,
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

async function addProblem(data: inputProblemType): Promise<problems> {
  return await prisma.problems.create({
    data
  })
}

async function addExemples(data: Omit<problems_exemples, "id">[]) {
  await prisma.problems_exemples.createMany({
    data
  })
}

async function addTestCases(data: Omit<problems_testcase, "id">[]) {
  await prisma.problems_testcase.createMany({
    data
  })
}

export default {
  getProblemsList,
  getProblemById,
  getProblemTestCases,
  addProblem,
  addExemples,
  addTestCases
}