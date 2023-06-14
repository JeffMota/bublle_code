export default function CaseResult({ caseSelected }) {
  return (
    <div>
      <div className="flex w-full my-2 text-lg">
        {caseSelected.status === 'right' ?
          <h2 className="text-green-500">Resposta Correta</h2>
          :
          <h2 className="text-red-500">Resposta Errada</h2>
        }
      </div>
      <div>
        <h2>Entrada</h2>
        <div className="flex mt-1 mb-3 h-8 rounded-md px-3 items-center bg-pallet-0">{caseSelected.input}</div>
      </div>
      {caseSelected.console &&
        <div>
          <h2>Stdout</h2>
          <h2 className="flex mt-1 mb-3 h-8 rounded-md px-3 items-center bg-pallet-0">{caseSelected.console}</h2>
        </div>
      }
      <div>
        <h2>Saída</h2>
        <h2 className="flex mt-1 mb-3 h-8 rounded-md px-3 items-center bg-pallet-0">{caseSelected.output || caseSelected}</h2>
      </div>
      <div>
        <h2>Esperado</h2>
        <h2 className="flex mt-1 mb-6 h-8 rounded-md px-3 items-center bg-pallet-0">{caseSelected.expected}</h2>
      </div>
    </div>
  )
}
