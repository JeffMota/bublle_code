import axios from "axios"
import { ChevronUp, ChevronDown } from "lucide-react"
import { useState } from "react"
// import * as babel from '@babel/core'

export default function Console({ code }) {
  const [open, setOpen] = useState(false)
  const [loadingCode, setLoadingCode] = useState(false)

  const [codeResponse, setCodeResponse] = useState(null)

  async function runCode() {
    setOpen(true)
    setLoadingCode(true)
    const body = { code: JSON.stringify(code) }
    try {
      const response = await axios.post(process.env.NEXT_PUBLIC_BUBBLE_API_URL + '/problems/run', body)
      // return console.log(response.data)
      setCodeResponse(response.data)
      setLoadingCode(false)
    } catch (error) {
      console.log(error.message)
      setLoadingCode(false)
    }
  }

  return (
    <>
      {
        open ?
          <div className='flex flex-col h-1/2 bg-pallet-1 rounded-md'>
            <div className="flex items-center rounded-t-md justify-between border-b border-pallet-5 px-6 w-full h-10 bg-pallet-1">
              <div className="flex items-center">
                Resultado
              </div>
            </div>

            <div className="flex-1 items-center overflow-y-scroll justify-between px-6 w-full h-12 bg-pallet-1">
              {codeResponse ?
                <div>
                  <div className="flex w-full my-2 text-lg">
                    {codeResponse.status === 'right' ?
                      <h2 className="text-green-500">Resposta Correta</h2>
                      :
                      <h2 className="text-red-500">Resposta Errada</h2>
                    }
                  </div>
                  <div>
                    <h2>Entrada</h2>
                    <div className="flex mt-1 mb-3 h-8 rounded-md px-3 items-center bg-pallet-0">{codeResponse.input}</div>
                  </div>
                  {codeResponse.console &&
                    <div>
                      <h2>Stdout</h2>
                      <h2 className="flex mt-1 mb-3 h-8 rounded-md px-3 items-center bg-pallet-0">{codeResponse.console}</h2>
                    </div>
                  }
                  <div>
                    <h2>Saída</h2>
                    <h2 className="flex mt-1 mb-3 h-8 rounded-md px-3 items-center bg-pallet-0">{codeResponse.output || codeResponse}</h2>
                  </div>
                  <div>
                    <h2>Esperado</h2>
                    <h2 className="flex mt-1 mb-6 h-8 rounded-md px-3 items-center bg-pallet-0">{codeResponse.expected}</h2>
                  </div>
                </div>
                :
                <div className="flex h-full items-center justify-center">{loadingCode ? "Loading..." : "Você deve rodar o seu código primeiro"}</div>
              }
            </div>

            <div className="flex items-center rounded-b-md justify-between px-6 w-full border-t border-pallet-5 h-10 bg-pallet-1">
              <button onClick={() => setOpen(false)} className="flex w-96 h-9 items-center">
                Console
                <ChevronDown />
              </button>
              <div className="flex w-60 justify-between">
                <button onClick={runCode} className="flex justify-center items-center w-24 h-8 rounded-lg bg-pallet-2">Rodar</button>
                <button className="flex justify-center items-center w-28 h-8 rounded-lg bg-pallet-6 text-pallet-0">Enviar</button>
              </div>
            </div>

          </div>
          :
          <div className='flex h-10 bg-pallet-1 rounded-md items-center justify-between px-6'>

            <button onClick={() => setOpen(true)} className="flex w-96 h-9 items-center">
              Console
              <ChevronUp />
            </button>
            <div className="flex w-60 justify-between">
              <button onClick={runCode} className="flex justify-center items-center w-24 h-8 rounded-lg bg-pallet-2">Rodar</button>
              <button className="flex justify-center items-center w-28 h-8 rounded-lg bg-pallet-6 text-pallet-0">Enviar</button>
            </div>

          </div>
      }
    </>
  )
}