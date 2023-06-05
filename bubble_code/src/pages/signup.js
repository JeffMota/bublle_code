import Link from 'next/link'
import axios from 'axios'
import { useState } from 'react'
import { MutatingDots } from 'react-loader-spinner'
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/router';

export default function Signup() {
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [loading, setLoading] = useState(false)

  const router = useRouter()

  async function handleSignup(e) {
    e.preventDefault()
    setLoading(true)

    if (password !== confirmPassword) {
      setLoading(false)
      return toast('As senhas estão diferentes!')
    }

    const body = { userName, email, password }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BUBBLE_API_URL}/users/signup`, body)
      toast('Cadastro realizado com sucesso!')
      setTimeout(() => {
        router.push('/')
        setLoading(false)
      }, 2000)
    } catch (error) {
      toast('Não foi possivel realizar o login')
      setLoading(false)
    }
  }

  return (
    <main
      className={`flex h-screen flex-col items-center justify-between px-12 bg-gradient-to-r from-gray-900 to-teal-700`}
    >
      <ToastContainer theme='dark' />
      <div className={'flex w-full max-w-screen-xl h-full relative '}>
        <div
          className={'flex h-2/3 aspect-square rounded-full bg-gradient-to-tl border border-cyan-50 from-cyan-600 to-cyan-200 absolute bottom-0 left-20'}
        ></div>

        <div className={'flex flex-col h-fit z-10 w-fit bg-cyan-50/30 backdrop-blur p-6 m-auto rounded-3xl gap-4 border border-cyan-50'}>
          <form onSubmit={e => handleSignup(e)} className={'flex flex-col items-center w-80 gap-6'}>
            <input required onChange={e => setUserName(e.target.value)} placeholder='Nome de usuário' type="text" className='flex w-full h-14 text-black rounded-lg shadow-inner px-3' />
            <input required onChange={e => setEmail(e.target.value)} placeholder='Email' type="email" className='flex w-full h-14 text-black rounded-lg shadow-inner px-3' />
            <input required onChange={e => setPassword(e.target.value)} placeholder='Senha' type="password" className='flex w-full h-14 text-black rounded-lg shadow-inner px-3' />
            <input required onChange={e => setConfirmPassword(e.target.value)} placeholder='Confirme sua senha' type="password" className='flex w-full h-14 text-black rounded-lg shadow-inner px-3' />
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
              <button type='submit' className='flex justify-center items-center font-semibold tracking-widest w-full h-14 rounded-lg shadow-inner-bt bg-cyan-950 hover:tracking-[.30em] transition-all'>CRIAR</button>
            }
          </form>
          <div className='flex flex-col h-10 mt-4 items-center justify-center'>
            <p>Já possui uma conta?</p>
            <Link href='/' className='text-lg text-cyan-950 font-semibold'>Vamos entrar!</Link>
          </div>
        </div>

        <div
          className={'flex h-1/2 aspect-square rounded-full bg-gradient-to-tl from-slate-700 to-slate-400 absolute top-10 right-52'}
        ></div>

      </div>

    </main>
  )
}
