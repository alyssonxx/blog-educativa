'use client'
import { useEffect, useState } from 'react'
import { getPosts } from '@/app/lib/firebase'
import Link from 'next/link' // ← ADICIONE ESSE IMPORT

export default function HomePage() {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function buscarPosts() {
      try {
        const data = await getPosts(6)
        setPosts(data)
      } catch (error) {
        console.error('Erro:', error)
      } finally {
        setLoading(false)
      }
    }
    buscarPosts()
  }, [])

  const formatDate = (data: any) => {
    if (!data) return ''
    try {
      const date = data.toDate ? data.toDate() : new Date(data)
      return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    } catch {
      return ''
    }
  }

  const totalViews = posts.reduce((acc, p) => acc + (p.views || 0), 0)

  return (
    <main className="min-h-screen bg-white">

      {/* ===== HERO ===== */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden" style={{ background: 'linear-gradient(135deg, #003087 0%, #C8102E 60%, #009B3A 100%)' }}>

        {/* Faixa topo PE */}
        <div className="absolute top-0 left-0 right-0 h-2 flex z-20">
          <div className="flex-1" style={{ background: '#003087' }} />
          <div className="flex-1" style={{ background: '#C8102E' }} />
          <div className="flex-1" style={{ background: '#FFD700' }} />
          <div className="flex-1" style={{ background: '#009B3A' }} />
        </div>

        {/* Background blur */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-white rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[0.95] tracking-tight mb-8">
                Educação que
                <span className="block mt-2" style={{ color: '#FFD700' }}>
                  transforma vidas
                </span>
              </h1>
              <p className="text-xl text-white/80 leading-relaxed mb-12 max-w-lg">
                Conteúdo educativo de qualidade sobre tecnologia, inovação pedagógica e o futuro da educação brasileira.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/blog"
                  className="inline-flex items-center justify-center gap-3 bg-white px-8 py-4 rounded-2xl font-black text-lg shadow-2xl hover:scale-105 hover:bg-yellow-300 transition-all"
                  style={{ color: '#C8102E' }}
                >
                  📚 Acessar Blog
                </a>
                <a
                  href="#posts"
                  className="inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-8 py-4 rounded-2xl font-black text-lg hover:bg-white/20 transition-all"
                >
                  🔽 Posts Recentes
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 80L1440 80L1440 40C1440 40 1080 0 720 0C360 0 0 40 0 40L0 80Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-2 gap-8">
            {[
              { numero: `${posts.length}+`, label: 'Artigos Publicados', icon: '📝', cor: '#C8102E', bg: '#fff5f5' },
              { numero: `${totalViews}+`, label: 'Visualizações', icon: '👁️', cor: '#003087', bg: '#f0f4ff' },
            ].map((stat, i) => (
              <div
                key={i}
                className="text-center p-8 rounded-3xl border hover:shadow-xl transition-all"
                style={{ background: stat.bg, borderColor: `${stat.cor}20` }}
              >
                <p className="text-4xl mb-3">{stat.icon}</p>
                <p className="text-4xl font-black mb-2" style={{ color: stat.cor }}>
                  {stat.numero}
                </p>
                <p className="text-gray-500 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== POSTS RECENTES ===== */}
      <section id="posts" className="py-24" style={{ background: 'linear-gradient(135deg, #f0f4ff 0%, #fff5f5 50%, #f0fff4 100%)' }}>
        <div className="container mx-auto px-6 max-w-7xl">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
             
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
                Posts Recentes
              </h2>
              <p className="text-gray-500 text-lg mt-3">
                Fique por dentro das últimas novidades
              </p>
            </div>
            <a
              href="/blog"
              className="inline-flex items-center gap-2 font-bold text-lg hover:underline shrink-0"
              style={{ color: '#C8102E' }}
            >
              Ver todos os posts →
            </a>
          </div>

          {/* Grid */}
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array(6).fill(0).map((_, i) => (
                <div key={i} className="animate-pulse bg-white rounded-3xl h-96 shadow-xl" />
              ))}
            </div>
          ) : posts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post: any, index: number) => (
                // ← MUDADO: de <a> para <Link>
                <Link key={post.id} href={`/blog/post/${post.id}`} className="group block">
                  <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-gray-100 h-full flex flex-col">

                    {/* Barra colorida topo */}
                    <div
                      className="h-1 w-full"
                      style={{
                        background: index % 3 === 0 ? '#C8102E' :
                                    index % 3 === 1 ? '#003087' : '#009B3A'
                      }}
                    />

                    {/* Imagem */}
                    <div className="relative h-52 overflow-hidden" style={{ background: '#f8f9ff' }}>
                      {post.imageUrl ? (
                        <img
                          src={post.imageUrl}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-5xl">📝</span>
                        </div>
                      )}
                    </div>

                    {/* Conteúdo */}
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                        <span>📅 {formatDate(post.createdAt)}</span>
                        <span>•</span>
                        <span>👁️ {post.views || 0}</span>
                      </div>
                      <h3
                        className="text-xl font-black text-gray-900 mb-3 transition-colors line-clamp-2 leading-tight"
                        style={{ color: 'inherit' }}
                      >
                        <span
                          className="group-hover:text-[#C8102E] transition-colors"
                        >
                          {post.title}
                        </span>
                      </h3>
                      <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed mb-4 flex-1">
                        {post.description}
                      </p>

                      {/* CTA */}
                      <div className="flex items-center gap-2 group-hover:gap-3 transition-all mt-auto pt-4 border-t border-gray-50">
                        <span
                          className="font-bold text-sm"
                          style={{
                            color: index % 3 === 0 ? '#C8102E' :
                                   index % 3 === 1 ? '#003087' : '#009B3A'
                          }}
                        >
                          Continue lendo
                        </span>
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center group-hover:scale-110 transition-all ml-auto"
                          style={{
                            background: index % 3 === 0 ? '#C8102E' :
                                        index % 3 === 1 ? '#003087' : '#009B3A'
                          }}
                        >
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-32">
              <p className="text-6xl mb-6">📝</p>
              <h2 className="text-3xl font-bold text-gray-400 mb-4">
                Nenhum post ainda
              </h2>
              <a
                href="/admin/novo"
                className="text-white px-8 py-4 rounded-2xl font-bold inline-block hover:opacity-90 transition-all"
                style={{ background: '#C8102E' }}
              >
                ✍️ Criar primeiro post
              </a>
            </div>
          )}
        </div>
      </section>

    </main>
  )
}