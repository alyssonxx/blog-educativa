import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer' // ✅ ADICIONADO

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} font-sans antialiased`}>
        
        {/* HEADER */}
        <Header />

        {/* MAIN */}
        <main className="min-h-screen bg-gradient-to-br from-[#f0f4ff] via-white to-[#f0fff4]">
          {children}
        </main>

        {/* FOOTER */}
        <Footer />

      </body>
    </html>
  )
}