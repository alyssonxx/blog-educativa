'use client'
import { useState, useEffect } from 'react'
import { getPosts } from '../lib/firebase'

export interface Post {
  id: string
  title: string
  description: string
  views: number
  createdAt: any
}

export function usePosts(limit: number = 12) {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getPosts(limit)
      .then((data: Post[]) => setPosts(data))
      .catch((err: unknown) => {  // ✅ TIPADO unknown
        const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido'
        setError(errorMessage)
        console.error('Posts error:', err)
      })
      .finally(() => setLoading(false))
  }, [limit])

  const refetch = () => {
    getPosts(limit)
      .then(setPosts)
      .catch((err: unknown) => console.error(err))
  }

  return { posts, loading, error, refetch }
}