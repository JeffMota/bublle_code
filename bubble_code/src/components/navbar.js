import Logo from "./logo";
import { User2 } from "lucide-react";

export default function NavBar(props) {
  return (
    <div className={`flex text-cyan-50 px-6 fixed w-full h-12 justify-between items-center bg-gradient-to-r from-pallet-1 to-80%`}>
      <Logo />
      <div className="flex-1 px-6 h-full">
        {props.children}
      </div>
      <div className="flex h-11 rounded-full items-center justify-center bg-pallet-3 aspect-square">
        <User2 color="#05161a" size={'30'} />
      </div>
    </div>
  )
}