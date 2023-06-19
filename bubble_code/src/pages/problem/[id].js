import Coder from '@/components/coder'
import NavBarCoding from '@/components/navbarCoding'
import ProblemResume from '@/components/problemResume'
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

export default function Problem() {
  const [problem, setProblem] = useState(null)

  const router = useRouter()

  const { query } = useRouter()
  const { id } = query

  useEffect(() => {
    async function getProblem() {
      const config = getToken()
      try {
        const response = await axios.get(process.env.NEXT_PUBLIC_BUBBLE_API_URL + `/problems/${id}`, config)
        setProblem(response.data)
      } catch (error) {
        toast('Não foi possível carregar o problema')
        if (error.response.status === 401) {
          return setTimeout(() => {
            router.push('/')
          }, 2000)
        }
        setTimeout(() => {
          router.push('/problems')
        }, 2000)
      }

    }
    getProblem()
  }, [])

  return (
    <main className={`flex ${roboto.variable} text-sm font-roboto justify-center bg-pallet-2 w-screen h-screen`}>
      <ToastContainer theme='dark' />
      <NavBarCoding />
      <div className="flex w-full p-2 gap-2 mt-9">
        <ProblemResume problem={problem} />
        <Coder problem={problem} />
      </div>
    </main>
  )
}