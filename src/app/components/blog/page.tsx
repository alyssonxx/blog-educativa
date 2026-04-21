'use client'
import { usePosts } from '@/app/hooks/usePosts'
import Hero from '@/app/components/blog/Hero'
import PostCard from '@/app/components/blog/PostCard'
import Sidebar from '@/app/components/blog/Sidebar'

export default function BlogPage() {
  const { posts, loading } = usePosts(12)

  return (
    <div className="min-h-screen py-24 bg-gradient-to-br from-gray-50 to-emerald-50">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        <Hero />
        <div className="grid lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_420px] gap-12 mt-24">
          <section className="space-y-8">
            {loading ? (
              <div>Carregando posts...</div>
            ) : posts.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-8">
                {posts.map((post: any) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-32">
                <h2 className="text-4xl font-bold text-gray-500"> Nenhum post</h2>
              </div>
            )}
          </section>
          <Sidebar />
        </div>
      </div>
    </div>
  )
}