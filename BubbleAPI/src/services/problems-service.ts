import e from "express";
import {
  inputExempleType,
  inputProblemType,
  inputTestCaseType,
} from "../protocols.js";
import problemsRepository from "../repository/problems.repository.js";

async function getProblemsList() {
  return await problemsRepository.getProblemsList();
}

async function getProblemById(id: number) {
  return await problemsRepository.getProblemById(id);
}

async function getProblemTestCases(id: number) {
  return await problemsRepository.getProblemTestCases(id);
}

async function addProblem(
  problem: inputProblemType,
  exemples: inputExempleType[],
  testCases
) {
  const problemResult = await problemsRepository.addProblem(problem);

  if (problemResult) {
    const newExemples = [];
    for (let i of exemples) {
      newExemples.push({
        problemId: problemResult.id,
        input: i.input,
        output: i.output,
        explanation: i.explanation,
      });
    }
    const newCases = [];
    for (let i of testCases) {
      newCases.push({
        problemId: problemResult.id,
        input: i.caseInput,
        expectedOutput: i.expectedOutput,
        functionStr: i.callFunction,
      });
    }

    await problemsRepository.addExemples(newExemples);
    await problemsRepository.addTestCases(newCases);
  }
}

async function deleteProblem(id: number) {
  const problem = await getProblemById(id);
  if (!problem) throw new Error("Problem not found");

  await problemsRepository.deleteProblem(id);
}

export default {
  getProblemsList,
  getProblemById,
  getProblemTestCases,
  addProblem,
  deleteProblem,
};
