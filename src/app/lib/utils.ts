import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://blytjmbyracjocdxenvp.supabase.co'
const supabaseKey = 'sb_publishable_MN6sIL6z3Dy1ugxznm8QXA_jY2Z9yZy'

export const supabase = createClient(supabaseUrl, supabaseKey)

export async function uploadImage(file: File): Promise<string> {
  try {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}.${fileExt}`

    const { data, error } = await supabase.storage
      .from('posts-images')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) throw error

    const { data: { publicUrl } } = supabase.storage
      .from('posts-images')
      .getPublicUrl(fileName)

    return publicUrl
  } catch (error: any) {
    console.error('Upload error:', error)
    throw new Error('Falha no upload: ' + error.message)
  }
}