import { solarizedDark } from '@uiw/codemirror-theme-solarized';
import { javascript } from '@codemirror/lang-javascript';
import CodeMirror from '@uiw/react-codemirror';
import { Roboto_Mono } from 'next/font/google'
import { Bebas_Neue } from "next/font/google"
import { useCallback, useState } from "react"
import { ChevronRight } from 'lucide-react';

const roboto = Roboto_Mono({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-roboto',
})
const bebasNeue = Bebas_Neue({ subsets: ['latin'], weight: ['400'], variable: '--font-bebasNeue' })

export default function AddProblemModal({ close, setLevel, setCode, level, code, title, setTitle, description, setDescription, setCurrentModal }) {
  const [openSelector, setOpenSelector] = useState(false)

  function selectLevel(level) {
    setLevel(level)
    setOpenSelector(false)
  }

  const onChange = useCallback((value) => {
    setCode(value);
  }, []);

  return (
    <div className="flex p-6 flex-col gap-6 justify-between fixed rounded-lg bg-pallet-1 w-3/4">

      <div className='flex gap-3'>
        <div className="flex-1">
          <h2 className={`text-2xl`}>Título do problema</h2>
          <div className='flex w-full h-10 bg-pallet-5 rounded-lg overflow-hidden'>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className={`${roboto.variable} font-roboto text-sm focus:bg-pallet-0 bg-transparent px-6 flex-1 outline-none`} type='text' />
          </div>
        </div>

        <div className="flex w-72 h-10 mt-auto items-center gap-6">
          <h2 className={`text-2xl`}>Dificuldade</h2>
          <div className="flex-1 text-2xl relative">
            <button onClick={() => setOpenSelector(!openSelector)} className="flex w-full bg-pallet-5 items-center h-10 rounded-t-md px-3 cursor-pointer">
              {level}
            </button>
            {openSelector &&
              <div className="flex z-10 flex-col rounded-b-md w-full absolute bg-pallet-5">
                <button onClick={() => selectLevel('Fácil')} className="flex rounded-md px-3 hover:text-pallet-6">Fácil</button>
                <button onClick={() => selectLevel('Média')} className="flex rounded-md px-3 hover:text-pallet-6">Média</button>
                <button onClick={() => selectLevel('Difícil')} className="flex rounded-md px-3 hover:text-pallet-6">Difícil</button>
              </div>
            }
          </div>
        </div>
      </div>

      <div className="flex gap-6">
        <div className='flex-1'>
          <h2 className={`text-2xl`}>Descrição</h2>
          <div className='flex w-full h-28 bg-pallet-5 rounded-lg overflow-hidden'>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className={`${roboto.variable} font-roboto text-sm focus:bg-pallet-0 bg-transparent px-6 py-3 flex-1 outline-none`} type='text' />
          </div>
        </div>

        <div className='flex-1'>
          <h2 className={`text-2xl`}>Código</h2>
          <div className='w-full overflow-scroll h-28 bg-pallet-5 rounded-lg'>
            <CodeMirror
              value={code}
              theme={solarizedDark}
              height='7em'
              width='100%'
              extensions={[javascript({ jsx: true })]}
              onChange={onChange}
            />
          </div>
        </div>
      </div>

      <div className='flex h-10 justify-between'>
        <button onClick={() => close(false)} className='w-20 rounded-md bg-pallet-0'>
          fechar
        </button>
        <button onClick={() => setCurrentModal('exemples')} className='flex items-center justify-center rounded-md hover:bg-pallet-2 w-40 bg-pallet-3'>
          Adicionar exemplos
          <ChevronRight />
        </button>
      </div>
    </div>
  )
}