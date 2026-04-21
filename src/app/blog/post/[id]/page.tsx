'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { getApps, initializeApp, getApp } from 'firebase/app'
import { getFirestore, doc, getDoc, updateDoc, increment, collection, addDoc, query, orderBy, getDocs } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDwuNCToV5xBrqB1amQQEvjIvUeC9UwvQs",
  authDomain: "blogwanessa-3c092.firebaseapp.com",
  projectId: "blogwanessa-3c092",
  storageBucket: "blogwanessa-3c092.firebasestorage.app",
  messagingSenderId: "421874803885",
  appId: "1:421874803885:web:60950945df0aaf76939224"
}

export default function PostPage() {
  const params = useParams()
  const [post, setPost] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [usuario, setUsuario] = useState<any>(null)
  const [comentarios, setComentarios] = useState<any[]>([])
  const [novoComentario, setNovoComentario] = useState('')
  const [nomeComentario, setNomeComentario] = useState('')
  const [enviandoComentario, setEnviandoComentario] = useState(false)
  const [statusComentario, setStatusComentario] = useState('')

  useEffect(() => {
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()
    const auth = getAuth(app)
    const unsub = onAuthStateChanged(auth, (user) => {
      setUsuario(user)
      if (user) {
        setNomeComentario(user.email?.split('@')[0] || 'Usuário')
      }
    })
    return () => unsub()
  }, [])

  useEffect(() => {
    async function buscarPost() {
      try {
        const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()
        const db = getFirestore(app)
        const postRef = doc(db, 'posts', params.id as string)
        const postSnap = await getDoc(postRef)

        if (postSnap.exists()) {
          setPost({ id: postSnap.id, ...postSnap.data() })
          await updateDoc(postRef, { views: increment(1) })
        }

        // Buscar comentários
        const comentariosRef = collection(db, 'posts', params.id as string, 'comentarios')
        const q = query(comentariosRef, orderBy('createdAt', 'desc'))
        const snap = await getDocs(q)
        setComentarios(snap.docs.map(d => ({ id: d.id, ...d.data() })))

      } catch (error) {
        console.error('Erro:', error)
      } finally {
        setLoading(false)
      }
    }
    if (params.id) buscarPost()
  }, [params.id])

  const enviarComentario = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!novoComentario.trim() || !nomeComentario.trim()) return

    setEnviandoComentario(true)
    setStatusComentario('')

    try {
      const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()
      const db = getFirestore(app)
      const comentariosRef = collection(db, 'posts', params.id as string, 'comentarios')

      const comentario = {
        nome: nomeComentario,
        texto: novoComentario,
        email: usuario?.email || '',
        createdAt: new Date().toISOString()
      }

      const ref = await addDoc(comentariosRef, comentario)
      setComentarios(prev => [{ id: ref.id, ...comentario }, ...prev])
      setNovoComentario('')
      setStatusComentario('✅ Comentário publicado!')

    } catch (err: any) {
      setStatusComentario('❌ Erro: ' + err.message)
    } finally {
      setEnviandoComentario(false)
    }
  }

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-emerald-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#2e7d32] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium text-lg">Carregando post...</p>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-emerald-50">
        <div className="text-center">
          <p className="text-6xl mb-6">😕</p>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Post não encontrado
          </h1>
          <a
            href="/blog"
            className="bg-[#2e7d32] text-white px-8 py-4 rounded-2xl font-bold inline-block hover:bg-[#25a244] transition-all"
          >
            ← Voltar ao Blog
          </a>
        </div>
      </div>
    )
  }

  return (
    <article className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50 py-24">
      <div className="container mx-auto px-6 max-w-4xl">

        {/* Voltar */}
        <a
          href="/blog"
          className="inline-flex items-center gap-2 text-[#2e7d32] font-bold mb-12 hover:underline group"
        >
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Voltar ao Blog
        </a>

        {/* Card Post */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden mb-12">

          {/* Imagem */}
          {post.imageUrl && (
            <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          )}

          <div className="p-8 md:p-16">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-6">
              <span>📅 {formatDate(post.createdAt)}</span>
              <span>•</span>
              <span>👁️ {post.views || 0} visualizações</span>
              <span>•</span>
              <span>💬 {comentarios.length} comentários</span>
            </div>

            {/* Título */}
            <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Descrição */}
            {post.description && (
              <p className="text-xl text-gray-500 mb-12 pb-12 border-b border-gray-100 leading-relaxed italic">
                {post.description}
              </p>
            )}

            {/* Conteúdo */}
            <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed whitespace-pre-wrap text-lg">
              {post.content}
            </div>

            {/* Footer Post */}
            <div className="mt-16 pt-8 border-t border-gray-100 flex items-center justify-between">
              <a
                href="/blog"
                className="inline-flex items-center gap-2 text-[#2e7d32] font-bold hover:underline"
              >
                ← Mais posts
              </a>
              <span className="text-sm text-gray-400">
                👁️ {post.views || 0} visualizações
              </span>
            </div>
          </div>
        </div>

        {/* SEÇÃO COMENTÁRIOS */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12">
          <h2 className="text-3xl font-black text-gray-900 mb-8 flex items-center gap-3">
            💬 Comentários
            <span className="text-lg font-normal text-gray-400">
              ({comentarios.length})
            </span>
          </h2>

          {/* Form Comentário */}
          <form onSubmit={enviarComentario} className="mb-12">
            <div className="bg-gray-50 rounded-2xl p-6 space-y-4 border border-gray-100">
              <h3 className="font-bold text-gray-700 text-lg">
                {usuario
                  ? `💬 Comentando como ${nomeComentario}`
                  : '💬 Deixe seu comentário'
                }
              </h3>

              {/* Nome só se não logado */}
              {!usuario && (
                <input
                  type="text"
                  placeholder="Seu nome *"
                  value={nomeComentario}
                  onChange={(e) => setNomeComentario(e.target.value)}
                  className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-[#2e7d32] focus:outline-none transition-all text-lg"
                  required
                />
              )}

              {/* Comentário */}
              <textarea
                placeholder="Escreva seu comentário..."
                value={novoComentario}
                onChange={(e) => setNovoComentario(e.target.value)}
                rows={4}
                className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-[#2e7d32] focus:outline-none transition-all resize-none text-lg"
                required
              />

              {/* Status */}
              {statusComentario && (
                <p className={`font-bold text-lg ${
                  statusComentario.includes('✅')
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}>
                  {statusComentario}
                </p>
              )}

              {/* Botão */}
              <button
                type="submit"
                disabled={enviandoComentario}
                className="bg-gradient-to-r from-[#2e7d32] to-[#25a244] text-white px-8 py-4 rounded-2xl font-bold hover:from-[#1b5e20] transition-all disabled:opacity-50 text-lg"
              >
                {enviandoComentario ? '⏳ Enviando...' : '💬 Publicar Comentário'}
              </button>
            </div>
          </form>

          {/* Lista Comentários */}
          <div className="space-y-6">
            {comentarios.length > 0 ? (
              comentarios.map((comentario: any) => (
                <div
                  key={comentario.id}
                  className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-[#2e7d32]/30 transition-all"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-[#2e7d32] to-[#25a244] rounded-full flex items-center justify-center text-white font-black text-lg shrink-0">
                      {comentario.nome?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">
                        {comentario.nome}
                      </p>
                      <p className="text-xs text-gray-400">
                        {formatDate(comentario.createdAt)}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {comentario.texto}
                  </p>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-5xl mb-4">💬</p>
                <p className="text-gray-400 text-lg font-medium">
                  Nenhum comentário ainda. Seja o primeiro!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}