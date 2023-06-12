import { useEffect, useState } from "react"
import LoadingText from "./loadingText"
import ProblemDescription from "./problemDescription"

export default function ProblemResume({ problem }) {
  const [selected, setSelected] = useState('Descrição')

  return (
    <div className="flex-1 w-1/2 bg-pallet-1 rounded-md">
      <div className="flex w-full h-10 border-b border-pallet-5">
        <button onClick={() => setSelected('Descrição')} className={`flex items-center justify-center w-36 ${selected === 'Descrição' ? 'border-b-2 border-pallet-6' : ''}`}>Descrição</button>
        <button onClick={() => setSelected('Envios')} className={`flex items-center justify-center w-36 ${selected === 'Envios' ? 'border-b-2 border-pallet-6' : ''}`}>Envios</button>
        <button onClick={() => setSelected('Soluções')} className={`flex items-center justify-center w-36 ${selected === 'Soluções' ? 'border-b-2 border-pallet-6' : ''}`}>Soluções</button>
      </div>
      {selected === 'Descrição' ?
        <ProblemDescription problem={problem} /> : ''
      }
    </div>
  )
}