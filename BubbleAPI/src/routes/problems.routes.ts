import { Router } from "express";
import { getProblemsList, getProblemById, runCode } from "../controllers/problems.controller.js";

const problemRouter = Router()

problemRouter.post('/run/:id', runCode)
problemRouter.get('/list', getProblemsList)
problemRouter.get('/:id', getProblemById)

export default problemRouter