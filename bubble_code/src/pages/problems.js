import LoadingText from '@/components/loadingText'
import NavBar from '@/components/navbar'
import ProblemTag from '@/components/problemTag'
import getToken from '@/services/headerToken'
import axios from 'axios'
import { Roboto_Mono } from 'next/font/google'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'

const roboto = Roboto_Mono({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-roboto',
})

export default function Problems() {
  const [list, setList] = useState('')

  const router = useRouter()

  useEffect(() => {
    async function fetchList() {
      try {
        const config = getToken()
        const response = await axios.get(process.env.NEXT_PUBLIC_BUBBLE_API_URL + '/problems/list', config)
        setList(response.data)
      } catch (error) {
        toast('Não foi possível carregar os problemas')
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
      <ToastContainer theme='dark' />
      <NavBar>
        <button className="flex border-b border-pallet-6 h-full items-center justify-center w-40 text-pallet-6">Problemas</button>
      </NavBar>
      <div className="flex w-10/12 p-2 gap-2 mt-14">
        <div className="flex-1">
          <div className='flex h-16 items-center border-b border-pallet-6'>
            <p className='flex items-center justify-center w-32'>Status</p>
            <p className='flex-1'>Título</p>
            <p className='flex items-center justify-center w-48'>Dificuldade</p>
          </div>
          <div className='flex py-8 flex-col '>
            {list ?
              list.map(p => <ProblemTag key={p.id} problemId={p.id} status=' ' title={p.title} dificult={p.level.name} />)
              :
              <ProblemTag />
            }
          </div>
        </div>
        <div className="flex w-2/6 bg-pallet-1 rounded-md"></div>
      </div>
    </main>
  )
}