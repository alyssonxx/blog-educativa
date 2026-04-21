export default function Sidebar() {
  return (
    <div className="space-y-6 p-6 bg-white/80 rounded-3xl shadow-xl">
      <div>
        <h3 className="text-xl font-bold mb-4"> Buscar</h3>
        <input className="w-full p-4 border rounded-xl" placeholder="Procurar posts..." />
      </div>
      <div>
        <h3 className="text-xl font-bold mb-4"> Categorias</h3>
        <div className="space-y-2">
          <button className="w-full text-left p-3 rounded-xl hover:bg-gray-100">Educação</button>
          <button className="w-full text-left p-3 rounded-xl hover:bg-gray-100">Tecnologia</button>
        </div>
      </div>
    </div>
  )
}