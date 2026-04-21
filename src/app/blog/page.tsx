'use client'
import { usePosts } from '@/app/hooks/usePosts'
import Hero from '@/app/components/blog/Hero'
import PostCard from '@/app/components/blog/PostCard'
import Sidebar from '@/app/components/blog/Sidebar'

export default function BlogPage() {
  const { posts, loading } = usePosts(12)

  return (
    <div className="min-h-screen py-24 bg-gradient-to-br from-[#f0f4ff] via-white to-[#f0fff4]">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">

        {/* ===== HEADER CUSTOM ===== */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-black mb-4">
            <span className="text-[#003087]">Portal</span>{' '}
            <span className="text-[#C8102E]">Educativo</span>
          </h1>

          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Tecnologia, educação e inovação com a identidade de Pernambuco
          </p>

          {/* Linha colorida estilo bandeira */}
          <div className="flex justify-center mt-6">
            <div className="flex w-40 h-2 rounded-full overflow-hidden shadow">
              <div className="flex-1 bg-[#003087]" />
              <div className="flex-1 bg-[#C8102E]" />
              <div className="flex-1 bg-[#FFD700]" />
              <div className="flex-1 bg-[#009B3A]" />
            </div>
          </div>
        </div>

        {/* ===== CONTEÚDO ===== */}
        <div className="grid lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_420px] gap-12">

          {/* POSTS */}
          <section className="space-y-8">
            {loading ? (
              <div className="grid md:grid-cols-2 gap-8">
                {Array(4).fill(0).map((_, i) => (
                  <div key={i} className="h-80 bg-white rounded-3xl shadow animate-pulse" />
                ))}
              </div>
            ) : posts.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-8">
                {posts.map((post: any, index: number) => (
                  <div
                    key={post.id}
                    className="transition-all hover:-translate-y-2 hover:shadow-2xl rounded-3xl"
                  >
                    <PostCard post={post} />

                    {/* Barra colorida */}
                    <div
                      className="h-1 w-full rounded-b-3xl"
                      style={{
                        background:
                          index % 3 === 0
                            ? '#C8102E'
                            : index % 3 === 1
                            ? '#003087'
                            : '#009B3A',
                      }}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-32">
                <div className="text-6xl mb-6">📭</div>
                <h2 className="text-3xl font-bold text-gray-400 mb-4">
                  Nenhum post ainda
                </h2>

                <a
                  href="/admin/novo"
                  className="inline-block px-8 py-4 rounded-2xl text-white font-bold shadow-lg hover:scale-105 transition-all"
                  style={{ background: '#C8102E' }}
                >
                  ✍️ Criar primeiro post
                </a>
              </div>
            )}
          </section>

          {/* SIDEBAR */}
          <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
            <Sidebar />
          </div>

        </div>
      </div>
    </div>
  )
}