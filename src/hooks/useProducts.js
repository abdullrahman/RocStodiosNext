import { useState, useEffect } from 'react'
import { db } from '@/firebase/config'
import { collection, getDocs, onSnapshot } from 'firebase/firestore'
export const useProducts = (p) => {
  const [product, setProduct] = useState(null)
  useEffect(() => {
    let ref = collection(db, p)
    const unsub = onSnapshot(ref, (snapshot) => {
      let result = []
      snapshot.docs.forEach((doc) => {
        result.push({ id: doc.id, ...doc.data() })
      })
      setProduct(result)
    })
    return () => unsub()
  }, [p])
  return { product }
}
