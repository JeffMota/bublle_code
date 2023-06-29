import { getProblemsList, getProblemById, runCode, addProblem } from "../controllers/problems.controller.js";
import { authenticateToken } from "../middlewares/authentication.middleware.js";
import { Router } from "express";

const problemRouter = Router()

problemRouter.all('/*', authenticateToken)
problemRouter.post('/run/:id', runCode)
problemRouter.post('/add', addProblem)
problemRouter.get('/list', getProblemsList)
problemRouter.get('/:id', getProblemById)

export default problemRouter