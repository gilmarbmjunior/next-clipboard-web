"use client";

import useReceive from "./usePage";

export default function Receive() {
  const {text, setText} = useReceive();

  return (
    <div className="w-full h-full flex flex-col p-4 gap-4">
      <div className="flex flex-row flex-wrap gap-x-4 gap-y-2">
        <span className="mr-auto">Área de Transferência Compartilhada</span>
        <div className="hidden flex-row gap-4">
          <span>PIN</span>
          <input type="text" placeholder="000000" className="border"/>
        </div>
      </div>
      <textarea className="flex-1 resize-none border border-gray-500 focus:outline-none p-4 text-gray-500" readOnly value={text} onChange={(e) => setText(e.target.value)} placeholder="O texto compartilhado aparece aqui."></textarea>
    </div>
  );
}
