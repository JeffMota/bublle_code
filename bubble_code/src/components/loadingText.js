import { useState } from "react"

export default function LoadingText({ width = 'full' }) {

  return (
    <span className={`flex w-${width} h-5 bg-pallet-5 animate-pulse rounded-full`}></span>
  )
}