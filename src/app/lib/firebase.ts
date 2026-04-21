import { initializeApp, getApps, getApp } from 'firebase/app'
import { 
  getFirestore, 
  collection, 
  query, 
  orderBy, 
  limit, 
  getDocs, 
  addDoc, 
  doc, 
  getDoc, 
  serverTimestamp,
  increment,
  updateDoc
} from 'firebase/firestore'
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut 
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDwuNCToV5xBrqB1amQQEvjIvUeC9UwvQs",
  authDomain: "blogwanessa-3c092.firebaseapp.com",
  projectId: "blogwanessa-3c092",
  storageBucket: "blogwanessa-3c092.appspot.com",
  messagingSenderId: "421874803885",
  appId: "1:421874803885:web:60950945df0aaf76939224"
}

// ✅ EVITAR DUPLICAR APP
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()

export const db = getFirestore(app)
export const auth = getAuth(app)

export interface Post {
  id: string
  title: string
  subtitle?: string
  description: string
  content: string
  imageUrl?: string
  views: number
  authorId: string
  createdAt: any
}

// ✅ Get posts
export async function getPosts(limitCount = 12): Promise<Post[]> {
  try {
    const q = query(
      collection(db, 'posts'),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    )
    const snapshot = await getDocs(q)
    const data = snapshot.docs.map(d => ({
      id: d.id,
      ...d.data()
    })) as Post[]
    console.log('✅ getPosts:', data.length)
    return data
  } catch (error) {
    console.error('❌ getPosts erro:', error)
    return []
  }
}

// ✅ Get post individual
export async function getPost(postId: string): Promise<Post | null> {
  try {
    const postRef = doc(db, 'posts', postId)
    const postSnap = await getDoc(postRef)
    if (!postSnap.exists()) return null
    await updateDoc(postRef, { views: increment(1) })
    return { id: postSnap.id, ...postSnap.data() } as Post
  } catch (error) {
    console.error('❌ getPost erro:', error)
    return null
  }
}

// ✅ Create post
export async function createPost(postData: {
  title: string
  subtitle?: string
  description: string
  content: string
  authorId: string
  imageUrl?: string
}): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, 'posts'), {
      ...postData,
      views: 0,
      createdAt: serverTimestamp()
    })
    console.log('✅ Post criado:', docRef.id)
    return docRef.id
  } catch (error) {
    console.error('❌ createPost erro:', error)
    throw error
  }
}

// ✅ Auth
export async function login(email: string, password: string) {
  return await signInWithEmailAndPassword(auth, email, password)
}

export async function register(email: string, password: string) {
  return await createUserWithEmailAndPassword(auth, email, password)
}

export async function logout() {
  return await signOut(auth)
}