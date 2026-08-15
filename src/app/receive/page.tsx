"use client";

import useReceive from "./usePage";
import LineTextArea from "@/components/LineTextArea";

export default function Receive() {
  const {pin, onPinChange, text, status} = useReceive();

  return (
    <div className="w-full h-full flex flex-col p-4 gap-4">
      <div className="flex flex-row flex-wrap gap-x-4 gap-y-2">
        <span className="mr-auto">Área de Transferência Compartilhada</span>
        <div className="flex flex-row gap-4">
          <span>PIN</span>
          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={pin}
            onChange={(e) => onPinChange(e.target.value)}
            placeholder="000000"
            className="border border-gray-300 text-center w-24"
          />
        </div>
      </div>
      {status === 'active' && (
        <LineTextArea className="flex-1" readOnly value={text} placeholder="O texto compartilhado aparecerá aqui." />
      )}
      {status === 'idle' && (
        <div className="flex-1 flex items-center justify-center text-gray-400">Informe o PIN de 6 dígitos para acessar o arquivo compartilhado.</div>
      )}
      {status === 'loading' && (
        <div className="flex-1 flex items-center justify-center text-gray-400">Conectando...</div>
      )}
      {status === 'inactive' && (
        <div className="flex-1 flex items-center justify-center text-gray-400">PIN inválido ou janela do remetente fechada.</div>
      )}
    </div>
  );
}
