export default function Footer() {
  return (
    <footer className="mt-20">

      {/* FAIXA SUPERIOR */}
      <div className="bg-white border-t border-gray-200 py-4">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">

          <p>
            <span className="font-bold text-[#003087]">
              Blog Educativo
            </span>{' '}
            | Todos os direitos reservados.
          </p>

          <div className="flex flex-wrap justify-center gap-6 font-semibold">
            <a href="/" className="hover:text-[#C8102E] transition">
              Início
            </a>
            <a href="/sobre" className="hover:text-[#C8102E] transition">
              Sobre o Blog
            </a>
            <a href="/contato" className="hover:text-[#C8102E] transition">
              Contato
            </a>
            <a href="#" className="hover:text-[#C8102E] transition">
              Política de Privacidade
            </a>
          </div>
        </div>
      </div>

      {/* FAIXA INFERIOR (IDENTIDADE PE) */}
      <div className="bg-[#003087] py-10">
        <div className="container mx-auto px-6 text-center text-white">

          {/* Nome do projeto */}
          <h2 className="text-2xl font-black mb-2">
            Blog Educativo Pernambuco
          </h2>

          <p className="text-white/80 mb-6">
            Educação, tecnologia e inovação com identidade pernambucana
          </p>

          {/* Linha colorida bandeira */}
          <div className="flex justify-center mb-6">
            <div className="flex w-52 h-2 rounded-full overflow-hidden">
              <div className="flex-1 bg-[#003087]" />
              <div className="flex-1 bg-[#C8102E]" />
              <div className="flex-1 bg-[#FFD700]" />
              <div className="flex-1 bg-[#009B3A]" />
            </div>
          </div>

          {/* Créditos */}
          <p className="text-sm text-white/70">
            Projeto educacional desenvolvido por estudantes • 2026
          </p>
        </div>
      </div>

    </footer>
  )
}