import { useRouter } from "next/router";
import LoadingText from "./loadingText";
import { Edit3, XCircle } from "lucide-react";

export default function ProblemTagAdm({ title, handleDeleteProblem, dificult, problemId, problem, setProblem }) {
  const router = useRouter()

  return (
    <div onClick={() => setProblem(problem)} className='flex h-12 items-center border-b border-pallet-1 cursor-pointer'>
      <div className='flex-1 leading-5 max-h-5 overflow-hidden hover:text-pallet-6'>
        {title ? title : <LoadingText />}
      </div>
      <div className={`flex w-32 justify-center`}>
        {dificult ? <div className={`px-3 rounded-full ${dificult === 'Fácil' ? 'bg-green-500' : dificult === 'Difícil' ? 'bg-red-500' : 'bg-yellow-500'}`}>{dificult}</div> : <LoadingText />}
      </div>
      <div className='flex w-28 h-full items-center justify-center px-8 hover:text-pallet-6'>
        <Edit3 />
      </div>
      <div onClick={() => handleDeleteProblem(problemId)} className='flex w-28 h-full items-center justify-center px-8 hover:text-red-500'>
        <XCircle />
      </div>
    </div>
  )
}