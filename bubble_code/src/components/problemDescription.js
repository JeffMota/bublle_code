import { useEffect, useState } from "react";
import LoadingText from "./loadingText";
import ExempleBox from "./exempleBox";

export default function ProblemDescription({ problem }) {
  const [prob, setProb] = useState(null)
  useEffect(() => {
    setProb(problem)
  }, [problem])
  return (
    <div className="flex w-full flex-col p-10 gap-6">
      <h2 className="text-base">{prob ? prob.title : <LoadingText />}</h2>

      <div className="flex gap-6">
        <h3>{prob ? prob.level.name : <LoadingText />}</h3>
        <h3>Status</h3>
      </div>

      <p className="flex">
        {prob ? prob.description : <p className="flex flex-col gap-2 w-full"><LoadingText /> <LoadingText /> <LoadingText width="1/2" /></p>}
      </p>

      {prob ? prob.exemples.map((e, i) => <ExempleBox key={e.id} exemple={e} index={i} />) : <div className="gap-2 w-full h-20 p-3 mt-6 rounded-lg bg-pallet-0"></div>}
    </div>
  )
}