'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { register } from '@/app/lib/firebase'

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !password || !confirmPassword) {
      setError('Preencha todos os campos.')
      return
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.')
      return
    }

    if (password.length < 6) {
      setError('A senha deve ter no mínimo 6 caracteres.')
      return
    }

    try {
      setLoading(true)
      await register(email, password)
      router.push('/') // ← MUDADO: agora vai para a home
    } catch (err: any) {
      setError(err?.message || 'Não foi possível criar a conta.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-emerald-50 px-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
        <h1 className="text-3xl font-black text-gray-900 mb-2">Criar conta</h1>
        <p className="text-gray-500 mb-8">Cadastre-se para acessar o painel administrativo</p>

        {error && (
          <div className="mb-6 p-4 rounded-xl border border-red-300 bg-red-50 text-red-700 text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-[#2e7d32]"
              placeholder="seu@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-[#2e7d32]"
              placeholder="••••••••"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Confirmar senha</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-[#2e7d32]"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#2e7d32] to-[#25a244] text-white py-3 rounded-xl font-black hover:opacity-95 disabled:opacity-60"
          >
            {loading ? 'Criando conta...' : 'Cadastrar'}
          </button>
        </form>

        {/* Link para voltar ao login (opcional) */}
        <div className="text-center mt-6">
          <a
            href="/login"
            className="text-sm text-gray-500 hover:text-[#2e7d32] transition-colors font-medium"
          >
            ← Já tem uma conta? Faça login
          </a>
        </div>
      </div>
    </div>
  )
}