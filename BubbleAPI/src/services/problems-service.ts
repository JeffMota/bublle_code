import problemsRepository from "../repository/problems.repository.js"

async function getProblemsList() {
  return await problemsRepository.getProblemsList()
}

async function getProblemById(id: number) {
  return await problemsRepository.getProblemById(id)
}

export default {
  getProblemsList,
  getProblemById
}