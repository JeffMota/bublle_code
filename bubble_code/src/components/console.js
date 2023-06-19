import axios from "axios"
import { ChevronUp, ChevronDown } from "lucide-react"
import { useEffect, useState } from "react"
import CaseResult from "./caseResult"
import getToken from "@/services/headerToken"
import { useRouter } from "next/router"
// import * as babel from '@babel/core'

export default function Console({ code, problemId }) {
  const [open, setOpen] = useState(false)
  const [loadingCode, setLoadingCode] = useState(false)
  const [caseSelected, setCaseSelected] = useState(0)

  const router = useRouter()

  const [codeResponse, setCodeResponse] = useState(null)

  async function runCode() {
    setOpen(true)
    setLoadingCode(true)
    setCodeResponse(null)
    const body = { code: JSON.stringify(code) }
    const config = getToken()

    try {
      const response = await axios.post(process.env.NEXT_PUBLIC_BUBBLE_API_URL + `/problems/run/${problemId}`, body, config)
      // return console.log(response.data)
      setCodeResponse(response.data)
      setLoadingCode(false)
    } catch (error) {
      console.log(error.message)
      toast('Não foi rodar o código :(')

      if (error.response.status === 401) {
        setTimeout(() => {
          router.push('/')
        }, 2000)
      }
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
                  <div className="flex gap-3 mt-2">
                    {
                      codeResponse.map((res, i) =>
                        <div className="flex items-center gap-2 cursor-pointer bg-pallet-0 hover:bg-pallet-5 px-3 py-2 rounded-md" onClick={() => setCaseSelected(i)} key={res.id}>
                          Caso {i + 1}
                          <span className={`flex rounded-full w-1 h-1 ${res.status === 'right' ? 'bg-green-500' : 'bg-red-500'}`} />
                        </div>)
                    }
                  </div>
                  <CaseResult caseSelected={codeResponse[caseSelected]} />
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