'use client'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { auth, db } from '@/app/lib/firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import { uploadPostImage } from '@/app/lib/supabase'

export default function AdminNovo() {
  const router = useRouter()
  const [autorizado, setAutorizado] = useState(false)
  const [verificando, setVerificando] = useState(true)
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [conteudo, setConteudo] = useState('')
  const [imagem, setImagem] = useState<File | null>(null)
  const [preview, setPreview] = useState('')
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)
  const enviando = useRef(false)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAutorizado(true)
      } else {
        router.push('/login')
      }
      setVerificando(false)
    })
    return () => unsub()
  }, [router])

  const handleLogout = async () => {
    await signOut(auth)
    router.push('/login')
  }

  const handleImagem = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImagem(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (enviando.current) return
    if (!titulo || !descricao || !conteudo) {
      setStatus('❌ Preencha todos os campos!')
      return
    }

    enviando.current = true
    setLoading(true)

    try {
      let imageUrl = ''

      if (imagem) {
        setStatus('📤 Enviando imagem...')
        imageUrl = await uploadPostImage(imagem)
        console.log('✅ Imagem:', imageUrl)
      }

      setStatus('💾 Salvando Firebase...')
      const ref = await addDoc(collection(db, 'posts'), {
        title: titulo,
        description: descricao,
        content: conteudo,
        imageUrl,
        authorId: 'admin',
        views: 0,
        createdAt: Timestamp.now()
      })

      console.log('✅ Post ID:', ref.id)
      setStatus('✅ Publicado com sucesso!')
      setTitulo('')
      setDescricao('')
      setConteudo('')
      setImagem(null)
      setPreview('')
    } catch (err: any) {
      console.error('❌ Erro ao publicar:', {
        message: err?.message,
        code: err?.code,
        name: err?.name
      })
      setStatus(`❌ ${err?.message || 'Erro ao publicar post'}`)
    } finally {
      enviando.current = false
      setLoading(false)
    }
  }

  if (verificando) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-emerald-50">
        <div className="w-16 h-16 border-4 border-[#2e7d32] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!autorizado) return null

  return (
    <div className="min-h-screen py-24 bg-gradient-to-br from-gray-50 to-emerald-50">
      <div className="container mx-auto px-6 max-w-2xl">
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#2e7d32] to-[#25a244] bg-clip-text text-transparent">
            ✍️ Novo Post
          </h1>
          <div className="flex items-center gap-6">
            <a href="/blog" className="text-[#2e7d32] font-bold hover:underline">
              ← Ver Blog
            </a>
            <button onClick={handleLogout} className="text-red-500 font-bold hover:underline">
              Sair
            </button>
          </div>
        </div>

        {status && (
          <div
            className={`p-6 rounded-2xl mb-8 font-bold text-center text-lg border-2 ${
              status.includes('✅')
                ? 'bg-green-50 border-green-400 text-green-800'
                : status.includes('❌')
                ? 'bg-red-50 border-red-400 text-red-800'
                : 'bg-yellow-50 border-yellow-400 text-yellow-800'
            }`}
          >
            {status}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white/90 p-10 rounded-3xl shadow-2xl space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">🖼️ Imagem</label>
            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-[#2e7d32] transition-all">
              <input type="file" accept="image/*" onChange={handleImagem} className="hidden" id="img" />
              <label htmlFor="img" className="cursor-pointer block">
                {preview ? (
                  <div>
                    <img src={preview} className="w-full h-48 object-cover rounded-xl" alt="preview" />
                    <p className="text-sm text-gray-400 mt-2">Clique para trocar</p>
                  </div>
                ) : (
                  <div className="py-8">
                    <p className="text-5xl mb-3">📸</p>
                    <p className="text-gray-500">Clique para selecionar</p>
                    <p className="text-gray-400 text-sm">PNG, JPG, WEBP</p>
                  </div>
                )}
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Título *</label>
            <input
              type="text"
              placeholder="Título do post"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="w-full p-5 border-2 border-gray-200 rounded-2xl text-xl font-bold focus:border-[#2e7d32] focus:outline-none transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Descrição *</label>
            <textarea
              placeholder="Resumo do post (aparece no card)"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              rows={3}
              className="w-full p-5 border-2 border-gray-200 rounded-2xl focus:border-[#2e7d32] focus:outline-none transition-all resize-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Conteúdo *</label>
            <textarea
              placeholder="Conteúdo completo do post..."
              value={conteudo}
              onChange={(e) => setConteudo(e.target.value)}
              rows={12}
              className="w-full p-5 border-2 border-gray-200 rounded-2xl focus:border-[#2e7d32] focus:outline-none transition-all resize-vertical text-lg leading-relaxed"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#2e7d32] to-[#25a244] hover:from-[#1b5e20] hover:to-[#2e7d32] text-white py-6 text-xl font-black rounded-2xl shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '⏳ Aguarde...' : '🚀 Publicar Post'}
          </button>
        </form>
      </div>
    </div>
  )
}
