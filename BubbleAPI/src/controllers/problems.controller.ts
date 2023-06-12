import { Request, Response } from "express";
import Interpreter from "js-interpreter"
import * as babel from "@babel/core"
import problemsService from "../services/problems-service.js";


export async function runCode(req: Request, res: Response) {
  let myCode =
    'const console = []\n' + JSON.parse(req.body.code) + 'sum([2,7,11,15], 9)'
  myCode = myCode.replaceAll('console.log', 'console.push')

  try {
    const newCode = babel.transform(myCode,
      {
        "presets": ["@babel/preset-env"]
      }).code

    const myInterpreter = new Interpreter(newCode)
    myInterpreter.run()

    let expected = '[0,1]'
    let output = ''
    let status = 'wrong'


    if (!myInterpreter.value) {
      output = String(myInterpreter.value)
    } else {
      if (myInterpreter.value.properties) {
        let aux = []
        for (let i of myInterpreter.value.properties) {
          aux.push(i)
        }
        output = JSON.stringify(aux)
      } else {
        output = JSON.stringify(myInterpreter.value)
      }
    }

    if (expected === output || output === '[1,0]') status = 'right'
    let cons = null
    if (myInterpreter.globalObject.properties.console.properties.length > 0) {
      let aux = []
      for (let i of myInterpreter.globalObject.properties.console.properties) {
        if (i.class && i.class == "Array") {
          let auxx = []
          for (let j of i.properties) {
            auxx.push(j)
          }
          aux.push(JSON.stringify(auxx))
        } else aux.push(i)
      }
      cons = aux
    }

    res.status(200).send(
      {
        console: cons,
        input: 'arr = [2,7,11,15], num = 9',
        output,
        expected,
        status
      }
    )
  } catch (error) {
    res.send(error.message)
  }
}

export async function getProblemsList(req: Request, res: Response) {
  try {
    const list = await problemsService.getProblemsList()
    return res.send(list)
  } catch (error) {
    res.status(500).send('Was not possible to get the problems list')
  }
}

export async function getProblemById(req: Request, res: Response) {
  const id = Number(req.params.id
  )
  try {
    const problem = await problemsService.getProblemById(id)
    return res.send(problem)
  } catch (error) {
    res.status(500).send('Was not possible to get the problem')
  }
}