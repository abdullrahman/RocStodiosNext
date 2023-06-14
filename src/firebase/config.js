import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAuth } from 'firebase/auth'
const firebaseConfig = {
  apiKey: 'AIzaSyBqBcM4esjI6Jc-rY7I1XkHvxdi2LValv4',
  authDomain: 'rocstodios.firebaseapp.com',
  projectId: 'rocstodios',
  storageBucket: 'rocstodios.appspot.com',
  messagingSenderId: '20250536561',
  appId: '1:20250536561:web:2f131acceee23e722309d0',
}
initializeApp(firebaseConfig)
const db = getFirestore()
const auth = getAuth()
const storage = getStorage()

export { db, auth, storage }
