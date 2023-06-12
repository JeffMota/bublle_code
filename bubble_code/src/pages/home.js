import NavBar from "@/components/navbar";
import Link from "next/link";
import { Roboto_Mono } from 'next/font/google'

const roboto = Roboto_Mono({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-roboto',
})

export default function Home() {
  return (
    <main className={`flex ${roboto.variable} font-roboto justify-center bg-pallet-0 w-screen h-screen`}>
      <NavBar >
        <Link href='problems' className="flex h-full items-center justify-center w-40 text-pallet-6 hover:bg-gradient-to-t from-pallet-2 hover:text-cyan-50">Problemas</Link>
      </NavBar>
      <div className="flex w-10/12 p-2 gap-2 mt-14">
        <div className="flex-1 bg-pallet-1 rounded-md"></div>
        <div className="flex w-2/5 bg-pallet-1 rounded-md"></div>
      </div>
    </main>
  )
}