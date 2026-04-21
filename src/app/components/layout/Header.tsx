'use client'

import { Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getApps, initializeApp, getApp } from 'firebase/app'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDwuNCToV5xBrqB1amQQEvjIvUeC9UwvQs",
  authDomain: "blogwanessa-3c092.firebaseapp.com",
  projectId: "blogwanessa-3c092",
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
    setMobileOpen(false)
  }

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b shadow-sm">
        <div className="container mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">

          {/* Logo */}
          <a href="/" className="flex items-center">
            <img
              src="/logo.png"
              alt="Educativa"
              className="h-12 md:h-16 w-auto hover:scale-105 transition"
            />
          </a>

          {/* MENU DESKTOP */}
          <nav className="hidden md:flex items-center gap-6 ml-10">
            <a href="/" className="font-semibold text-gray-700 hover:text-red-600 transition">Início</a>
            <a href="/blog" className="font-semibold text-gray-700 hover:text-red-600 transition">Blog</a>
            <a href="/sobre" className="font-semibold text-gray-700 hover:text-red-600 transition">Sobre</a>
          </nav>

          {/* RIGHT AREA */}
          <div className="flex items-center gap-3">

            {/* DESKTOP AUTH */}
            <div className="hidden md:block">
              {usuario ? (
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 bg-green-100 px-4 py-2 rounded-xl"
                  >
                    <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                      {usuario.email?.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-semibold text-sm">
                      {usuario.email?.split('@')[0]}
                    </span>
                  </button>

                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border"
                      >
                        <a href="/admin/novo" className="block px-4 py-3 hover:bg-gray-100">Novo Post</a>
                        <button onClick={handleLogout} className="w-full text-left px-4 py-3 text-red-500 hover:bg-red-50">
                          Sair
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <a href="/login" className="bg-white border px-5 py-2 rounded-xl hover:bg-gray-100">
                  Login
                </a>
              )}
            </div>

            {/* MOBILE BUTTON */}
            <button
              className="md:hidden p-2 rounded-lg bg-gray-100"
              onClick={() => setMobileOpen(true)}
            >
              <Menu />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 260, damping: 25 }}
              className="fixed top-0 right-0 w-72 h-full bg-white z-50 shadow-2xl p-6"
            >
              <div className="flex justify-between mb-6">
                <h2 className="text-xl font-bold">Menu</h2>
                <button onClick={() => setMobileOpen(false)}>
                  <X />
                </button>
              </div>

              <nav className="flex flex-col gap-5 text-lg">
                <a href="/" onClick={() => setMobileOpen(false)}>🏠 Início</a>
                <a href="/blog" onClick={() => setMobileOpen(false)}>📝 Blog</a>
                <a href="/sobre" onClick={() => setMobileOpen(false)}>📖 Sobre</a>

                <hr />

                {/* MOBILE AUTH */}
                {usuario ? (
                  <>
                    <a href="/admin/novo" onClick={() => setMobileOpen(false)}>✍️ Novo Post</a>
                    <button onClick={handleLogout} className="text-red-500 text-left">
                      🚪 Sair
                    </button>
                  </>
                ) : (
                  <a href="/login" onClick={() => setMobileOpen(false)}>🔐 Login</a>
                )}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}