import { Bebas_Neue } from "next/font/google"
import { Roboto_Mono } from 'next/font/google'
import { Check, ChevronRight } from "lucide-react"
import TestCaseBox from "./testCaseBox"

const roboto = Roboto_Mono({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-roboto',
})
const bebasNeue = Bebas_Neue({ subsets: ['latin'], weight: ['400'], variable: '--font-bebasNeue' })

export default function AddTestCasesModal({ close, setCurrentModal, caseInput, setCaseInput, expectedOutput, setExpectedOutput, callFunction, setCallFunction, listOfCases, setListOfCases }) {

  function addCase(e) {
    e.preventDefault()

    let aux = [...listOfCases, { caseInput, expectedOutput, callFunction }]
    setListOfCases(aux)
  }
  return (
    <div className="flex flex-col p-6 gap-6 justify-between fixed rounded-lg bg-pallet-1 w-3/4">

      <div className="flex gap-3">

        <form onSubmit={(e) => addCase(e)} className="flex-1">
          <div className='flex-1'>
            <h2 className={`text-2xl`}>Entrada</h2>
            <div className='flex w-full h-12 bg-pallet-5 rounded-lg overflow-hidden'>
              <input onChange={(e) => setCaseInput(e.target.value)} className={`${roboto.variable} font-roboto text-sm focus:bg-pallet-0 bg-transparent px-6 flex-1 outline-none`} type='text' />
            </div>
          </div>

          <div className='flex-1'>
            <h2 className={`text-2xl`}>Saída Esperada</h2>
            <div className='flex w-full h-12 bg-pallet-5 rounded-lg overflow-hidden'>
              <input onChange={(e) => setExpectedOutput(e.target.value)} className={`${roboto.variable} font-roboto text-sm focus:bg-pallet-0 bg-transparent px-6 flex-1 outline-none`} type='text' />
            </div>
          </div>

          <div className='flex-1'>
            <h2 className={`text-2xl`}>Chamada da Função</h2>
            <div className='flex w-full h-12 bg-pallet-5 rounded-lg overflow-hidden'>
              <input onChange={(e) => setCallFunction(e.target.value)} className={`${roboto.variable} font-roboto text-sm focus:bg-pallet-0 bg-transparent px-6 flex-1 outline-none`} type='text' />
            </div>
          </div>

          <button type="submit" className='w-36 h-10 mt-3 rounded-md bg-pallet-3 hover:bg-pallet-6 hover:text-pallet-0'>
            Adicionar Exemplo
          </button>
        </form>

        <div className="flex flex-col px-2 h-80 overflow-scroll bg-pallet-5 w-72 rounded-md ">
          {listOfCases && listOfCases.map((e, i) => <TestCaseBox key={i} testCase={e} index={i} />)}
        </div>

      </div>

      <div className='flex h-10 justify-between'>
        <button onClick={() => close(false)} className='w-20 bg-pallet-0'>
          close
        </button>
        <button onClick={() => setCurrentModal('exemples')} className='w-40 bg-pallet-0'>
          Voltar aos exemplos
        </button>
        <button onClick={() => setCurrentModal('testCases')} className='flex items-center justify-center gap-2 rounded-md hover:bg-green-700 w-40 bg-green-500'>
          Salvar problema
          <Check />
        </button>
      </div>
    </div>
  )
}