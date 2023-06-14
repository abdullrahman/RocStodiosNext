import { useState, useEffect } from 'react'
import { db } from '@/firebase/config'

import { collection, onSnapshot } from 'firebase/firestore'

export const useImgGalary = (c) => {
  const [imgGalary, setImgGalary] = useState(null)

  useEffect(() => {
    let ref = collection(db, c)

    const unsub = onSnapshot(ref, (snapshot) => {
      let result = []
      snapshot.docs.forEach((doc) => {
        result.push({ ...doc.data(), id: doc.id })
      })
      setImgGalary(result)
    })
    return () => unsub()
  }, [c])
  return { imgGalary }
}
