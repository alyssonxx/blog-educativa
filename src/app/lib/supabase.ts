import { createClient, StorageApiError } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase =
  supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null

// ✅ Upload imagem posts
export async function uploadPostImage(file: File): Promise<string> {
  if (!supabase) {
    throw new Error('Supabase não configurado. Defina NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY (ou ANON_KEY) no .env.local')
  }

  const fileExt = file.name.split('.').pop()
  const fileName = `${crypto.randomUUID()}.${fileExt}`

  const { error } = await supabase.storage
    .from('posts-images') // Bucket criado no Supabase
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false
    })

  if (error) {
    console.error('Upload error:', error)

    const storageError = error as StorageApiError
    const message = storageError?.message?.toLowerCase() || ''

    if (message.includes('row-level security policy')) {
      throw new Error('Upload bloqueado pela política de segurança (RLS) do bucket posts-images. Ajuste as policies de INSERT no Supabase Storage.')
    }

    throw new Error(`Falha no upload da imagem: ${storageError.message}`)
  }

  const { data: { publicUrl } } = supabase.storage
    .from('posts-images')
    .getPublicUrl(fileName)

  return publicUrl
}

// ✅ Lista imagens públicas
export async function listPostImages() {
  if (!supabase) return []
  const { data } = await supabase.storage
    .from('posts-images')
    .list('', { limit: 100 })
  return data || []
}
