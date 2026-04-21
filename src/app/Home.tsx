'use client'
import { useEffect, useState } from 'react'
import { getApps, initializeApp, getApp } from 'firebase/app'
import { getFirestore, collection, query, orderBy, limit, getDocs } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDwuNCToV5xBrqB1amQQEvjIvUeC9UwvQs",
  authDomain: "blogwanessa-3c092.firebaseapp.com",
  projectId: "bblogwanessa-3c092",
  storageBucket: "blogwanessa-3c092.firebasestorage.app",
  messagingSenderId: "421874803885",
  appId: "1:421874803885:web:60950945df0aaf76939224"
}

export default function HomePage() {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function buscarPosts() {
      try {
        const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()
        const db = getFirestore(app)
        const q = query(
          collection(db, 'posts'),
          orderBy('createdAt', 'desc'),
          limit(6)
        )
        const snapshot = await getDocs(q)
        const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
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
    if (!data) return 'Agora'
    try {
      const date = data.toDate ? data.toDate() : new Date(data)
      return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    } catch {
      return 'Agora'
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50">

      {/* Hero Section */}
      <section className="relative py-32 md:py-40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2e7d32]/5 to-emerald-100/30" />
        <div className="container mx-auto px-6 max-w-7xl relative">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block bg-[#f1f8e9] text-[#2e7d32] font-bold px-6 py-2 rounded-full text-sm mb-8 border border-[#2e7d32]/20">
              🎓 Blog Educativo
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 leading-[0.9] tracking-tight mb-8">
              Educação que{' '}
              <span className="bg-gradient-to-r from-[#2e7d32] to-[#25a244] bg-clip-text text-transparent">
                transforma
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-12">
              Conteúdo educativo de qualidade sobre tecnologia, inovação e o futuro da educação.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/blog"
                className="bg-gradient-to-r from-[#2e7d32] to-[#25a244] text-white px-10 py-5 rounded-2xl font-black text-xl hover:from-[#1b5e20] hover:to-[#2e7d32] transition-all shadow-2xl hover:shadow-[#2e7d32]/25 hover:scale-105"
              >
                📚 Ver todos os posts
              </a>
              <a
                href="#posts"
                className="bg-white border-2 border-gray-200 text-gray-800 px-10 py-5 rounded-2xl font-black text-xl hover:border-[#2e7d32] hover:text-[#2e7d32] transition-all shadow-lg"
              >
                🔽 Posts recentes
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white/80 backdrop-blur-xl border-y border-gray-100">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto text-center">
            <div>
              <p className="text-4xl font-black text-[#2e7d32]">{posts.length}+</p>
              <p className="text-gray-500 font-medium mt-1">Posts</p>
            </div>
            <div>
              <p className="text-4xl font-black text-[#2e7d32]">
                {posts.reduce((acc, p) => acc + (p.views || 0), 0)}
              </p>
              <p className="text-gray-500 font-medium mt-1">Visualizações</p>
            </div>
            <div>
              <p className="text-4xl font-black text-[#2e7d32]">100%</p>
              <p className="text-gray-500 font-medium mt-1">Gratuito</p>
            </div>
          </div>
        </div>
      </section>

      {/* Posts Recentes */}
      <section id="posts" className="py-24">
        <div className="container mx-auto px-6 max-w-7xl">

          {/* Título seção */}
          <div className="flex items-center justify-between mb-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-3">
                Posts Recentes
              </h2>
              <p className="text-gray-500 text-lg">
                Últimas publicações do blog
              </p>
            </div>
            <a
              href="/blog"
              className="hidden md:flex items-center gap-2 text-[#2e7d32] font-bold hover:underline text-lg"
            >
              Ver todos →
            </a>
          </div>

          {/* Grid Posts */}
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array(6).fill(0).map((_, i) => (
                <div key={i} className="animate-pulse bg-white rounded-3xl h-96 shadow-xl" />
              ))}
            </div>
          ) : posts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Post Destaque (primeiro) */}
              {posts[0] && (
                <a
                  href={`/blog/post/${posts[0].id}`}
                  className="md:col-span-2 lg:col-span-2 group block"
                >
                  <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-gray-100 h-full">
                    {posts[0].imageUrl && (
                      <div className="relative h-72 overflow-hidden">
                        <img
                          src={posts[0].imageUrl}
                          alt={posts[0].title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        <span className="absolute top-4 left-4 bg-[#2e7d32] text-white text-xs font-bold px-3 py-1 rounded-full">
                          ⭐ Destaque
                        </span>
                      </div>
                    )}
                    <div className="p-8">
                      <div className="flex items-center gap-3 text-xs text-gray-400 mb-4">
                        <span>📅 {formatDate(posts[0].createdAt)}</span>
                        <span>•</span>
                        <span>👁️ {posts[0].views || 0} views</span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 group-hover:text-[#2e7d32] transition-colors leading-tight">
                        {posts[0].title}
                      </h3>
                      <p className="text-gray-500 leading-relaxed line-clamp-2 text-lg mb-6">
                        {posts[0].description}
                      </p>
                      <div className="flex items-center gap-3 group-hover:gap-4 transition-all">
                        <span className="font-bold text-[#2e7d32]">Ler post completo</span>
                        <div className="w-8 h-8 bg-[#2e7d32] rounded-full flex items-center justify-center group-hover:scale-110 transition-all">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              )}

              {/* Posts restantes */}
              {posts.slice(1).map((post: any) => (
                <a
                  key={post.id}
                  href={`/blog/post/${post.id}`}
                  className="group block"
                >
                  <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-gray-100 h-full">
                    {post.imageUrl ? (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={post.imageUrl}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                    ) : (
                      <div className="h-48 bg-gradient-to-br from-[#2e7d32]/10 to-emerald-100 flex items-center justify-center">
                        <span className="text-5xl">📝</span>
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                        <span>📅 {formatDate(post.createdAt)}</span>
                        <span>•</span>
                        <span>👁️ {post.views || 0}</span>
                      </div>
                      <h3 className="text-xl font-black text-gray-900 mb-3 group-hover:text-[#2e7d32] transition-colors line-clamp-2 leading-tight">
                        {post.title}
                      </h3>
                      <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed mb-4">
                        {post.description}
                      </p>
                      <span className="text-[#2e7d32] font-bold text-sm group-hover:underline">
                        Continue lendo →
                      </span>
                    </div>
                  </div>
                </a>
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
                className="bg-[#2e7d32] text-white px-8 py-4 rounded-2xl font-bold inline-block hover:bg-[#25a244] transition-all"
              >
                ✍️ Criar primeiro post
              </a>
            </div>
          )}

          {/* Ver todos */}
          {posts.length > 0 && (
            <div className="text-center mt-16">
              <a
                href="/blog"
                className="inline-flex items-center gap-3 bg-white border-2 border-[#2e7d32] text-[#2e7d32] px-10 py-5 rounded-2xl font-black text-xl hover:bg-[#2e7d32] hover:text-white transition-all shadow-lg"
              >
                📚 Ver todos os posts
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          )}
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 bg-gradient-to-r from-[#2e7d32] to-[#25a244]">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Fique por dentro das novidades!
          </h2>
          <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
            Acesse nosso blog e descubra conteúdos exclusivos sobre educação e tecnologia.
          </p>
          <a
            href="/blog"
            className="inline-block bg-white text-[#2e7d32] px-12 py-5 rounded-2xl font-black text-xl hover:bg-gray-50 transition-all shadow-2xl hover:scale-105"
          >
            📚 Acessar Blog
          </a>
        </div>
      </section>
    </main>
  )
}