import { ChevronRight } from "lucide-react"
import { Bebas_Neue } from "next/font/google"
import { Roboto_Mono } from 'next/font/google'
import { useState } from "react"
import ExempleBox from "./exempleBox"

const roboto = Roboto_Mono({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-roboto',
})
const bebasNeue = Bebas_Neue({ subsets: ['latin'], weight: ['400'], variable: '--font-bebasNeue' })

export default function AddExemplesModal({ close, setCurrentModal }) {
  const [list, setList] = useState([])

  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [explanation, setExplanation] = useState('')

  function addProblem(e) {
    e.preventDefault()

    let aux = [...list, { input, output, explanation }]
    console.log(aux)
    setList(aux)
  }

  return (
    <div className="flex flex-col p-6 gap-6 justify-between fixed rounded-lg bg-pallet-1 w-3/4">

      <div className="flex gap-3">

        <form onSubmit={(e) => addProblem(e)} className="flex-1">
          <div className='flex-1'>
            <h2 className={`text-2xl`}>Entrada</h2>
            <div className='flex w-full h-12 bg-pallet-5 rounded-lg overflow-hidden'>
              <input onChange={(e) => setInput(e.target.value)} className={`${roboto.variable} font-roboto text-sm focus:bg-pallet-0 bg-transparent px-6 flex-1 outline-none`} type='text' />
            </div>
          </div>

          <div className='flex-1'>
            <h2 className={`text-2xl`}>Saída</h2>
            <div className='flex w-full h-12 bg-pallet-5 rounded-lg overflow-hidden'>
              <input onChange={(e) => setOutput(e.target.value)} className={`${roboto.variable} font-roboto text-sm focus:bg-pallet-0 bg-transparent px-6 flex-1 outline-none`} type='text' />
            </div>
          </div>

          <div className='flex-1'>
            <h2 className={`text-2xl`}>Explicação</h2>
            <div className='flex w-full h-12 bg-pallet-5 rounded-lg overflow-hidden'>
              <input onChange={(e) => setExplanation(e.target.value)} className={`${roboto.variable} font-roboto text-sm focus:bg-pallet-0 bg-transparent px-6 flex-1 outline-none`} type='text' />
            </div>
          </div>

          <button type="submit" className='w-36 h-10 mt-3 rounded-md bg-pallet-3 hover:bg-pallet-6 hover:text-pallet-0'>
            Adicionar Exemplo
          </button>
        </form>

        <div className="flex flex-col px-2 h-80 overflow-scroll bg-pallet-5 w-72 rounded-md ">
          {list && list.map((e, i) => <ExempleBox key={i} exemple={e} index={i} />)}
        </div>

      </div>

      <div className='flex h-10 justify-between'>
        <button onClick={() => close(false)} className='w-20 bg-pallet-0'>
          close
        </button>
        <button onClick={() => setCurrentModal('problem')} className='w-40 bg-pallet-0'>
          Voltar ao problema
        </button>
        <button onClick={() => setCurrentModal('testCases')} className='flex items-center justify-center rounded-md hover:bg-pallet-2 w-40 bg-pallet-3'>
          Adicionar exemplos
          <ChevronRight />
        </button>
      </div>
    </div>
  )
}