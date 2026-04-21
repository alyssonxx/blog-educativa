export default async function DebugPage() {
  // Teste Firebase direto
  const posts = await fetch('http://localhost:3000/api/test-posts').then(r => r.json())
  
  return (
    <div className="min-h-screen p-12">
      <h1 className="text-4xl font-bold mb-12">🔍 Debug Firebase</h1>
      <pre className="bg-gray-900 text-green-400 p-8 rounded-3xl font-mono text-sm max-h-96 overflow-auto">
{JSON.stringify({
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  postsCount: posts.length,
  posts: posts.slice(0,2)
}, null, 2)}
      </pre>
    </div>
  )
}