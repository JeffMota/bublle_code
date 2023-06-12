import Coder from '@/components/coder'
import NavBarCoding from '@/components/navbarCoding'
import ProblemResume from '@/components/problemResume'
import axios from 'axios'
import { Roboto_Mono } from 'next/font/google'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const roboto = Roboto_Mono({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-roboto',
})

export default function Problem() {
  const [problem, setProblem] = useState(null)

  const { query } = useRouter()
  const { id } = query

  useEffect(() => {
    async function getProblem() {
      try {
        const response = await axios.get(process.env.NEXT_PUBLIC_BUBBLE_API_URL + `/problems/${id}`)
        setProblem(response.data)
      } catch (error) {
        console.log(error.message)
      }

    }
    getProblem()
  }, [])

  return (
    <main className={`flex ${roboto.variable} text-sm font-roboto justify-center bg-pallet-0 w-screen h-screen`}>
      <NavBarCoding />
      <div className="flex w-full p-2 gap-2 mt-9">
        <ProblemResume problem={problem} />
        <Coder />
      </div>
    </main>
  )
}