import { solarizedDark } from '@uiw/codemirror-theme-solarized';
import { javascript } from '@codemirror/lang-javascript';
import CodeMirror from '@uiw/react-codemirror';
import { Settings } from 'lucide-react';
import Console from './console';
import { useCallback, useState } from 'react';

export default function Coder() {
  const [code, setCode] = useState(`function sum(arr, num){\n  \n};`)
  const onChange = useCallback((value) => {
    setCode(value);
  }, []);

  return (
    <div className="flex text-xs gap-2 flex-col w-1/2">
      <div className='flex-1 overflow-hidden bg-pallet-1 overflow-y-scroll rounded-md'>
        <div className="flex w-full h-10 justify-between border-b px-10 border-pallet-5 items-center">
          <h2>JavaScript</h2>
          <Settings />
        </div>
        <CodeMirror
          value={code}
          theme={solarizedDark}
          height="60em"
          extensions={[javascript({ jsx: true })]}
          onChange={onChange}
        />
      </div>
      <Console code={code} />
    </div>
  )
}