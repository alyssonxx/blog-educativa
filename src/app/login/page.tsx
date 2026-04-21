'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { getApps, initializeApp, getApp } from 'firebase/app'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDwuNCToV5xBrqB1amQQEvjIvUeC9UwvQs",
  authDomain: "blogwanessa-3c092.firebaseapp.com",
  projectId: "bblogwanessa-3c092",
  storageBucket: "blogwanessa-3c092.firebasestorage.app",
  messagingSenderId: "421874803885",
  appId: "1:421874803885:web:60950945df0aaf76939224"
}

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErro('')

    try {
      const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()
      const auth = getAuth(app)
      await signInWithEmailAndPassword(auth, email, senha)
      router.push('/') // ← MUDADO: agora vai para a home
    } catch (err: any) {
      console.error('Erro login:', err)
      setErro('Email ou senha incorretos!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-emerald-50 py-24">
      <div className="w-full max-w-md mx-4">

        {/* Logo */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black bg-gradient-to-r from-[#2e7d32] to-[#25a244] bg-clip-text text-transparent mb-2">
             Login
          </h1>
          <p className="text-gray-500">
            Faça login para o nosso blog, nossa voz.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white/90 backdrop-blur-xl p-10 rounded-3xl shadow-2xl">

          {/* Erro */}
          {erro && (
            <div className="bg-red-50 border-2 border-red-300 text-red-800 p-4 rounded-2xl mb-6 font-bold text-center">
              ❌ {erro}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-5 border-2 border-gray-200 rounded-2xl focus:border-[#2e7d32] focus:outline-none transition-all text-lg"
                required
              />
            </div>

            {/* Senha */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Senha
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full p-5 border-2 border-gray-200 rounded-2xl focus:border-[#2e7d32] focus:outline-none transition-all text-lg"
                required
              />
            </div>

            {/* Botão */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#2e7d32] to-[#25a244] text-white py-5 text-xl font-black rounded-2xl shadow-2xl hover:from-[#1b5e20] hover:to-[#2e7d32] transition-all disabled:opacity-50"
            >
              {loading ? ' Entrando...' : ' Entrar'}
            </button>
          </form>

          {/* Links */}
          <div className="text-center mt-8 space-y-3">
            <div>
              <a
                href="/"
                className="text-gray-400 hover:text-[#2e7d32] transition-colors font-medium"
              >
                ← Voltar ao Blog
              </a>
            </div>
            
            {/* NOVO LINK DE REGISTRO */}
            <div>
              <a
                href="/register"
                className="text-sm text-gray-500 hover:text-[#2e7d32] transition-colors font-medium"
              >
                Não tem uma conta? Cadastre-se
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}