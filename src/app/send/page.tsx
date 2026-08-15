"use client";

import useSend from "./usePage";
import LineTextArea from "@/components/LineTextArea";

export default function Send() {
  const {pin, text, setText, send, sending, format, formatting} = useSend();

  return (
    <div className="w-full h-full flex flex-col p-4 gap-4">
      <div className="flex flex-row flex-wrap gap-x-4 gap-y-2">
        <span className="mr-auto">Área de Transferência Compartilhada</span>
        <div className="flex flex-row gap-4">
          <span>PIN</span>
          <input type="text" value={pin} readOnly maxLength={6} placeholder="000000" className="border border-gray-300 text-center w-24"/>
        </div>
      </div>
      <LineTextArea className="flex-1" value={text} onChange={setText} placeholder="Insira o texto a ser compartilhado aqui e clique em enviar." />
      <div className="flex flex-row items-center gap-4">
        <button className="border border-gray-300 hover:bg-gray-200 bg-gray-100 active:bg-gray-300 px-4" onClick={format} disabled={formatting || sending}>{formatting ? "Limpando Comentários e Formatando..." : "Limpar Comentários e Formatar"}</button>
        <button className="flex-1 border border-gray-300 hover:bg-gray-200 bg-gray-100 active:bg-gray-300 px-4" onClick={send} disabled={sending || formatting || !pin}>Enviar</button>
      </div>
    </div>
  );
}
