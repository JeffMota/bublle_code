import { useRouter } from "next/router";
import LoadingText from "./loadingText";

export default function ProblemTag({ status, title, dificult, problemId }) {
  const router = useRouter()


  return (
    <div onClick={() => router.push(`/problem/${problemId}`)} className='flex h-12 items-center border-b border-pallet-1 cursor-pointer hover:text-pallet-6'>
      <div className='flex w-32 px-12'>
        {status ? status : <LoadingText />}
      </div>
      <div className='flex-1 leading-5 max-h-5 overflow-hidden '>
        {title ? title : <LoadingText />}
      </div>
      <div className='flex w-48 justify-center px-8'>
        {dificult ? dificult : <LoadingText />}
      </div>
    </div>
  )
}