export default function Send() {
  return (
    <div className="w-full h-full flex flex-col p-4 gap-4">
      <span>Área de Transferência Compartilhada</span>
      <textarea className="flex-1 resize-none border border-gray-500 focus:outline-none p-4 text-gray-500" placeholder="Insira o texto a ser compartilhado aqui e clique em enviar."></textarea>
      <button className="border border-gray-300 hover:bg-gray-200 bg-gray-100 active:bg-gray-300">Enviar</button>
    </div>
  );
}
