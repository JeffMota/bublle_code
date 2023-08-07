import { Request, Response } from "express";
import Interpreter from "js-interpreter";
import * as babel from "@babel/core";
import problemsService from "../services/problems-service.js";

export async function runCode(req: Request, res: Response) {
  let myCode = "const console = []\n" + JSON.parse(req.body.code);
  myCode = myCode.replaceAll("console.log", "console.push");
  // let myCode =
  //   'const console = []\n' + req.body.code
  // myCode = myCode.replaceAll('console.log', 'console.push')

  const problemId = Number(req.params.id);

  try {
    const testCases = await problemsService.getProblemTestCases(problemId);

    const result = [];

    // return res.send(myCode + '\n' + testCases[0].functionStr)

    testCases.forEach((tc) => {
      const cod = myCode + "\n" + tc.functionStr;

      //Testar se posso tranformar todo o código antese
      const newCode = babel.transform(cod, {
        presets: ["@babel/preset-env"],
      }).code;

      const myInterpreter = new Interpreter(newCode);
      myInterpreter.run();

      let output = "";
      let status = "wrong";

      if (!myInterpreter.value) {
        output = String(myInterpreter.value);
      } else {
        if (myInterpreter.value.properties) {
          let aux = [];
          for (let i of myInterpreter.value.properties) {
            aux.push(i);
          }
          output = JSON.stringify(aux);
        } else {
          output = JSON.stringify(myInterpreter.value);
        }
      }

      if (output === tc.expectedOutput) status = "right";
      let cons = [];
      if (myInterpreter.globalObject.properties.console.properties.length > 0) {
        for (let i of myInterpreter.globalObject.properties.console
          .properties) {
          if (i.class && i.class == "Array") {
            let auxx = [];
            for (let j of i.properties) {
              auxx.push(j);
            }
            cons.push(JSON.stringify(auxx));
          } else {
            cons.push(i);
          }
        }
      }

      result.push({
        id: tc.id,
        console: cons,
        input: tc.input,
        output,
        expected: tc.expectedOutput,
        status,
      });
    });

    res.send(result);
  } catch (error) {
    res.send(error.message);
  }
}

export async function getProblemsList(req: Request, res: Response) {
  try {
    const list = await problemsService.getProblemsList();
    return res.send(list);
  } catch (error) {
    res.status(500).send("Was not possible to get the problems list");
  }
}

export async function getProblemById(req: Request, res: Response) {
  const id = Number(req.params.id);

  try {
    const problem = await problemsService.getProblemById(id);
    return res.send(problem);
  } catch (error) {
    res.status(500).send("Was not possible to get the problem");
  }
}

export async function addProblem(req: Request, res: Response) {
  const { problem, exemples, testCases } = req.body;

  try {
    await problemsService.addProblem(problem, exemples, testCases);
    return res.status(201);
  } catch (error) {
    res.status(500).send("Was not possible to save the problem");
  }
}

export async function deleteProblem(req: Request, res: Response) {
  const id = Number(req.params.id);

  try {
    await problemsService.deleteProblem(id);
    return res.status(202);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
