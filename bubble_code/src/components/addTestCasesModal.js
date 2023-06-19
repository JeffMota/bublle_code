import { Bebas_Neue } from "next/font/google"

const bebasNeue = Bebas_Neue({ subsets: ['latin'], weight: ['400'], variable: '--font-bebasNeue' })

export default function AddTestCasesModal({ close }) {
  return (
    <div className="flex flex-col justify-between fixed rounded-lg bg-pallet-1 h-5/6 w-3/4">
      <div className='flex-1'>
        <h2 className={`text-2xl`}>Entrada</h2>
        <div className='flex w-full h-12 bg-pallet-5 rounded-lg overflow-hidden'>
          <input className='bg-transparent px-6 flex-1 outline-none' type='text' />
        </div>
      </div>
      <div className='flex-1'>
        <h2 className={`text-2xl`}>Saída</h2>
        <div className='flex w-full h-36 bg-pallet-5 rounded-lg overflow-hidden'>
          <textarea className='bg-transparent px-6 flex-1 outline-none' type='text' />
        </div>
      </div>
      <div className='flex-1'>
        <h2 className={`text-2xl`}>Explicação</h2>
        <div className='flex w-full h-36 bg-pallet-5 rounded-lg overflow-hidden'>
          <textarea className='bg-transparent px-6 flex-1 outline-none' type='text' />
        </div>
      </div>
      <button onClick={() => close(false)}>
        x
      </button>
    </div>
  )
}