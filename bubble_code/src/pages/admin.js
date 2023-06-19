import AddProblemModal from '@/components/addProblemModal';
import ProblemTagAdm from '@/components/problemTagAdm';
import { ToastContainer, toast } from 'react-toastify';
import { PlusCircle, Search } from 'lucide-react';
import { Roboto_Mono } from 'next/font/google'
import getToken from '@/services/headerToken';
import { Bebas_Neue } from "next/font/google"
import { useEffect, useState } from 'react';
import NavBar from "@/components/navbar";
import { useRouter } from 'next/router';
import Link from "next/link";
import axios from 'axios';
import AddExemplesModal from '@/components/addExemplesModal';
import AddTestCasesModal from '@/components/addTestCasesModal';

const roboto = Roboto_Mono({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-roboto',
})
const bebasNeue = Bebas_Neue({ subsets: ['latin'], weight: ['400'], variable: '--font-bebasNeue' })


export default function Admin() {
  const [list, setList] = useState(null)
  const [selectedProblem, setSelectedProblem] = useState(null)
  const [addingNewProblem, setAddingNewProblem] = useState(false)
  const [currentModal, setCurrentModal] = useState('problem')

  const [code, setCode] = useState('')
  const [level, setLevel] = useState('Fácil')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const router = useRouter()

  useEffect(() => {
    async function fetchList() {
      try {
        const config = getToken()
        const response = await axios.get(process.env.NEXT_PUBLIC_BUBBLE_API_URL + '/problems/list', config)
        setList(response.data)
        setSelectedProblem(response.data[0])
      } catch (error) {
        toast('Não foi possível carregar os problemas')
        console.log(error)
        if (error.response.status === 401) {
          setTimeout(() => {
            router.push('/')
          }, 2000)
        }
      }
    }
    fetchList()
  }, [])

  return (
    <main className={`flex ${roboto.variable} font-roboto justify-center bg-pallet-0 w-screen h-screen`}>
      <NavBar >
        <Link href='problems' className="flex h-full items-center justify-center w-40 text-pallet-6 hover:bg-gradient-to-t from-pallet-2 hover:text-cyan-50">Problemas</Link>
      </NavBar>
      <ToastContainer theme='dark' />
      <div className="flex flex-col w-10/12 p-2 gap-2 mt-14">
        <h2 className={`text-4xl ${bebasNeue.variable} my-6 font-sans`}>gerenciar problemas</h2>

        <div className='flex w-full gap-4'>
          <div className='flex-1'>
            <h2 className={`text-2xl ${bebasNeue.variable} font-sans`}>buscar</h2>
            <div className='flex w-full h-12 bg-gradient-to-r from-pallet-5 rounded-lg overflow-hidden'>
              <input className='bg-transparent px-6 flex-1 outline-none' placeholder='Título do problema' type='text' />
              <div className='flex text-pallet-6 items-center justify-center w-16 cursor-pointer'>
                <Search />
              </div>
            </div>
          </div>
          <button onClick={() => setAddingNewProblem(true)} className={`flex bg-pallet-3 hover:bg-pallet-2 w-72 h-12 mt-auto rounded-lg items-center justify-center gap-3 text-xl ${bebasNeue.variable} font-sans`}>
            novo problema
            <PlusCircle />
          </button>

        </div>
        <div className='flex h-16 items-center border-b border-pallet-6'>
          <p className='flex-1'>Título</p>
          <p className='flex items-center justify-center w-32'>Dificuldade</p>
          <p className='flex items-center justify-center w-28'>Editar</p>
          <p className='flex items-center justify-center w-28 mr-4'>Excluir</p>
          <p className='flex items-center w-72'>Detalhes</p>
        </div>
        <div className='flex gap-4'>
          <div className='flex-1 h-72 overflow-scroll'>
            {
              list ?
                list.map(p => <ProblemTagAdm setProblem={setSelectedProblem} problem={p} key={p.id} title={p.title} dificult={p.level.name} />)
                :
                <div>
                  <ProblemTagAdm />
                  <ProblemTagAdm />
                  <ProblemTagAdm />
                  <ProblemTagAdm />
                </div>
            }
          </div>
          <div className='w-72 h-72 p-2 overflow-scroll bg-pallet-1 rounded-lg'>
            {
              selectedProblem &&
              <div>
                <h2 className='text-pallet-6' >Descrição: </h2>
                {selectedProblem.description}
              </div>}
          </div>
        </div>
      </div>
      {
        addingNewProblem &&
        <div className={`flex w-screen ${bebasNeue.variable} font-sans h-screen items-center justify-center bg-black/50 backdrop-blur fixed`}>
          {
            currentModal === 'problem' ?
              <AddProblemModal
                setCode={setCode}
                code={code} level={level}
                setLevel={setLevel}
                close={setAddingNewProblem}
                title={title}
                setTitle={setTitle}
                description={description}
                setDescription={setDescription}
                setCurrentModal={setCurrentModal}
              /> :
              currentModal === 'exemples' ? <AddExemplesModal setCurrentModal={setCurrentModal} close={setAddingNewProblem} /> :
                <AddTestCasesModal setCurrentModal={setCurrentModal} close={setAddingNewProblem} />
          }
        </div>
      }
    </main>
  )
}