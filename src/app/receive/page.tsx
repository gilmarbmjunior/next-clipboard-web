import useReceive from "./usePage";

export default function Receive() {
  const {text, setText} = useReceive();

  return (
    <div className="w-full h-full flex flex-col p-4 gap-4">
      <span>Área de Transferência Compartilhada</span>
      <textarea className="flex-1 resize-none border border-gray-500 focus:outline-none p-4 text-gray-500" placeholder="O texto compartilhado aparece aqui."></textarea>
    </div>
  );
}
