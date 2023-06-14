import problemsRepository from "../repository/problems.repository.js"

async function getProblemsList() {
  return await problemsRepository.getProblemsList()
}

async function getProblemById(id: number) {
  return await problemsRepository.getProblemById(id)
}

async function getProblemTestCases(id: number) {
  return await problemsRepository.getProblemTestCases(id)
}

export default {
  getProblemsList,
  getProblemById,
  getProblemTestCases
}