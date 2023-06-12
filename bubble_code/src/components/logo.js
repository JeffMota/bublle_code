import { Bebas_Neue } from "next/font/google"
import Link from "next/link"

const bebasNeue = Bebas_Neue({ subsets: ['latin'], weight: ['400'], variable: '--font-bebasNeue' })

export default function Logo() {
  return (
    <Link href='/home' className={`flex h-full text-3xl justify-center text-pallet-6 items-center ${bebasNeue.variable} font-sans`}>
      <span className="text-pallet-3">bubble_</span>code
    </Link>)
}