"use client";

import useSend from "./usePage";
import LineTextArea from "@/components/LineTextArea";

export default function Send() {
  const {text, setText, send, sending} = useSend();

  return (
    <div className="w-full h-full flex flex-col p-4 gap-4">
      <div className="flex flex-row flex-wrap gap-x-4 gap-y-2">
        <span className="mr-auto">Área de Transferência Compartilhada</span>
        <div className="hidden flex-row gap-4">
          <span>PIN</span>
          <input type="text" placeholder="000000" className="border"/>
        </div>
      </div>
      <LineTextArea className="flex-1" value={text} onChange={setText} placeholder="Insira o texto a ser compartilhado aqui e clique em enviar." />
      <button className="border border-gray-300 hover:bg-gray-200 bg-gray-100 active:bg-gray-300" onClick={send} disabled={sending}>Enviar</button>
    </div>
  );
}
