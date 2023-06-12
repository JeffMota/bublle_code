export default function ExempleBox({ exemple, index }) {
  return (
    <div className="flex flex-col gap-2">
      Exemplo {Number(index) + 1}
      <div className="gap-2 w-full h-fit p-3 rounded-lg text-pallet-4 bg-pallet-0">
        <div className="gap-2"><span className="text-white">Entrada: </span>{exemple.input}</div>
        <div className="gap-2"><span className="text-white">Saída: </span>{exemple.output}</div>
        <div className="gap-2"><span className="text-white">Explicação: </span>{exemple.explanation}</div>
      </div>
    </div>
  )
}