export default function TestCaseBox({ testCase, index }) {
  return (
    <div className="flex flex-col gap-2">
      Caso {Number(index) + 1}
      <div className="gap-2 w-full h-fit p-3 rounded-lg text-pallet-4 bg-pallet-0">
        <div className="gap-2"><span className="text-white">Entrada: </span>{testCase.caseInput}</div>
        <div className="gap-2"><span className="text-white">Saída esperada: </span>{testCase.expectedOutput}</div>
        <div className="gap-2"><span className="text-white">Chamada da função: </span>{testCase.callFunction}</div>
      </div>
    </div>
  )
}