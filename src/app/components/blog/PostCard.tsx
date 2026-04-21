import Link from 'next/link'
import Image from 'next/image'

export default function PostCard({ post }: any) {
  return (
    <Link href={`/blog/post/${post?.id}`} className="block blog-card p-8 hover:shadow-xl transition-all">
      {post?.imageUrl && (
        <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-6">
          <Image src={post.imageUrl} alt={post?.title || 'Post'} fill className="object-cover" />
        </div>
      )}

      <h3 className="text-2xl font-bold mb-4">{post?.title || 'Post'}</h3>
      <p>{post?.description || 'Descrição teste'}</p>
      <div className="mt-6">
        <span className="btn-primary inline-block px-6 py-3 rounded-xl font-bold">
          Continue lendo
        </span>
      </div>
    </Link>
  )
}
