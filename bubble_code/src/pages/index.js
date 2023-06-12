import axios from 'axios'
import { Github } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { MutatingDots } from 'react-loader-spinner'
import { ToastContainer, toast } from 'react-toastify'
import { Roboto_Mono } from 'next/font/google'
import { useRouter } from 'next/router'

const roboto = Roboto_Mono({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-roboto',
})

export default function Signin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)

  const router = useRouter()

  async function handleLogin(e) {
    e.preventDefault()
    setLoading(true)

    const body = { email, password }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BUBBLE_API_URL}/users/signin`, body)
      router.push('/home')
    } catch (error) {
      toast('Dados incorretos!')
      setLoading(false)
    }

  }

  return (
    <main
      className={`${roboto.variable} font-roboto flex h-screen flex-col items-center justify-between px-12 bg-gradient-to-r from-gray-900 to-teal-700`}
    >
      <ToastContainer theme='dark' />
      <div className={'flex w-full max-w-screen-xl h-full relative '}>
        <div
          className={'flex h-2/3 aspect-square rounded-full bg-gradient-to-tl border border-cyan-50 from-cyan-600 to-cyan-200 absolute top-10 left-20'}
        ></div>

        <div className={'flex flex-col h-fit z-10 w-fit bg-cyan-50/30 backdrop-blur p-6 m-auto rounded-3xl gap-4 border border-cyan-50'}>

          <form onSubmit={e => handleLogin(e)} className={'flex flex-col items-center w-full gap-6'}>
            <input onChange={e => setEmail(e.target.value)} value={email} placeholder='Email' type="email" className='flex w-full h-14 text-black rounded-lg shadow-inner px-3' />
            <input onChange={e => setPassword(e.target.value)} value={password} placeholder='Senha' type="password" className='flex w-full h-14 text-black rounded-lg shadow-inner px-3' />
            {loading ?
              <MutatingDots
                height="100"
                width="100"
                color="#083344"
                secondaryColor='#083344'
                radius='12'
                ariaLabel="mutating-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              /> :
              <button type='submit' className='flex justify-center items-center font-semibold tracking-widest w-full h-14 rounded-lg shadow-inner-bt bg-cyan-950 hover:tracking-[.30em] transition-all'>ENTRAR</button>
            }
          </form>

          <div className='flex w-72 mx-6 justify-between items-center'>
            <div className='flex h-px w-2/5 bg-cyan-50'></div>
            <div className='tracking-widest font-semibold'>ou</div>
            <div className='flex h-px w-2/5 bg-cyan-50'></div>
          </div>

          <div className='flex h-10 items-center justify-center'>
            <button className='flex rounded-full h-10 w-10 justify-center items-center bg-cyan-950'>
              <Github />
            </button>
          </div>

          <div className='flex flex-col h-10 items-center justify-center'>
            <p>Ainda não tem uma conta?</p>
            <Link href='signup' className='text-lg text-cyan-950 font-semibold'>Vamos criar uma!</Link>
          </div>

        </div>

        <div
          className={'flex h-1/2 aspect-square rounded-full bg-gradient-to-tl from-slate-700 to-slate-400 absolute bottom-0 right-52'}
        ></div>

      </div>

    </main>
  )
}
