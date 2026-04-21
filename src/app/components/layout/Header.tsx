'use client'
import { Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { getApps, initializeApp, getApp } from 'firebase/app'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDwuNCToV5xBrqB1amQQEvjIvUeC9UwvQs",
  authDomain: "blogwanessa-3c092.firebaseapp.com",
  projectId: "bblogwanessa-3c092",
  storageBucket: "blogwanessa-3c092.firebasestorage.app",
  messagingSenderId: "421874803885",
  appId: "1:421874803885:web:60950945df0aaf76939224"
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [usuario, setUsuario] = useState<any>(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  useEffect(() => {
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()
    const auth = getAuth(app)
    const unsub = onAuthStateChanged(auth, (user) => {
      setUsuario(user)
    })
    return () => unsub()
  }, [])

  const handleLogout = async () => {
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()
    const auth = getAuth(app)
    await signOut(auth)
    setUsuario(null)
    setDropdownOpen(false)
  }

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">

        <div className="container mx-auto px-6 h-20 flex items-center justify-between">

          {/* Logo */}
          <a href="/" className="shrink-0">
            <img
              src="/logo.png"
              alt="Educativa"
              className="h-20 w-auto hover:scale-105 transition-transform duration-300"
            />
          </a>

          {/* MENU DESKTOP */}
          <nav className="hidden md:flex items-center gap-6 ml-10">
            <a href="/" className="font-semibold text-gray-700 hover:text-[#C8102E] transition">
              Início
            </a>
            <a href="/blog" className="font-semibold text-gray-700 hover:text-[#C8102E] transition">
              Blog
            </a>
            <a href="/sobre" className="font-semibold text-gray-700 hover:text-[#C8102E] transition">
              Sobre nós
            </a>
          </nav>

          {/* Auth Area */}
          <div className="flex items-center gap-4">
            {usuario ? (
              <div className="relative hidden md:block">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-3 bg-[#f1f8e9] hover:bg-[#e8f5e9] px-5 py-2 rounded-2xl border-2 border-[#2e7d32]/20 hover:border-[#2e7d32]/40 transition-all"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-[#2e7d32] to-[#25a244] rounded-full flex items-center justify-center text-white font-black text-sm">
                    {usuario.email?.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-bold text-[#2e7d32] text-sm">
                    {usuario.email?.split('@')[0]}
                  </span>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 top-14 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                    <div className="p-4 bg-[#f1f8e9] border-b border-gray-100">
                      <p className="text-xs text-gray-500 font-medium">Logado como</p>
                      <p className="font-bold text-[#2e7d32] truncate text-sm">
                        {usuario.email}
                      </p>
                    </div>
                    <div className="p-2">
                      <a href="/admin/novo" className="block px-4 py-3 hover:bg-[#f1f8e9] rounded-xl">
                        ✍️ Novo Post
                      </a>
                      <a href="/blog" className="block px-4 py-3 hover:bg-[#f1f8e9] rounded-xl">
                        📝 Ver Blog
                      </a>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl"
                      >
                         Sair
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <a
                href="/login"
                className="hidden md:flex items-center gap-2 bg-white hover:bg-[#f1f8e9] border-2 border-gray-200 hover:border-[#2e7d32] text-gray-800 hover:text-[#2e7d32] font-bold px-6 py-2 rounded-xl shadow-sm transition-all duration-300"
              >
                 Login
              </a>
            )}

            {/* Mobile Button */}
            <button
              className="lg:hidden p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition-all"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-white shadow-2xl">
          <div className="p-8">
            <div className="flex justify-between mb-8">
              <h2 className="text-2xl font-bold">Menu</h2>
              <button onClick={() => setMobileOpen(false)}>
                <X />
              </button>
            </div>

            <nav className="flex flex-col gap-6 text-lg">
              <a href="/" onClick={() => setMobileOpen(false)}>🏠 Início</a>
              <a href="/blog" onClick={() => setMobileOpen(false)}>📝 Blog</a>
              <a href="/sobre" onClick={() => setMobileOpen(false)}>📖 Sobre nós</a>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}