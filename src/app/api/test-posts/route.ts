import { getPosts } from '@/app/lib/firebase'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const posts = await getPosts(5)
    return NextResponse.json(posts)
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'Firebase falhou' }, { status: 500 })
  }
}