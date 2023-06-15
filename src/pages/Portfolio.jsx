import React from 'react'
import { Header } from '@/components/Header'
import { storage, db } from '@/firebase/config'
import { ref, deleteObject } from 'firebase/storage'
import { doc, deleteDoc } from 'firebase/firestore'
import FileUpload from '@/components/FileUpload'

import { useImgContext } from '@/hooks/useImgContext'
import { useAuthContext } from '@/hooks/useAuthContext'
import { useImgGalary } from '@/hooks/useImgGalary'

export default function Portfolio() {
  const { imgList } = useImgContext()
  const { user, authIsReady } = useAuthContext()
  const { imgGalary } = useImgGalary('Products')

  const DeleteImg = (imgPath, id) => {
    const path = ''
    const desertRef = ref(storage, 'images/' + imgPath)
    const refDoc = doc(db, 'Products', id)
    deleteDoc(refDoc)

    deleteObject(desertRef)
      .then(() => {
        console.log('Done')
      })
      .catch((error) => {
        console.log('Erroe')
      })
  }

  return (
    <>
      <Header />
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 id="products-heading" className="sr-only">
            Products
          </h2>
          {authIsReady && (
            <div className=" w-full py-2 lg:w-[31%]">
              <FileUpload />
            </div>
          )}
          <div className="col-span-2 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {imgGalary?.map((prod) => (
              <a key={prod.name} className="group">
                <div className="aspect-h-1 aspect-w-1 sm:aspect-h-3 sm:aspect-w-2 w-full overflow-hidden rounded-lg">
                  <div className="relative flex-col">
                    {authIsReady && user && (
                      <span className="absolute right-0 inline-flex cursor-pointer items-center justify-end gap-x-0.5 rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10 hover:bg-red-600/20">
                        Delete
                        <button
                          type="button"
                          className="group relative -mr-1 h-3.5 w-3.5 rounded-sm "
                          onClick={() => DeleteImg(prod.name, prod.id)}
                        >
                          <span className="sr-only">Remove</span>
                          <svg
                            viewBox="0 0 14 14"
                            className="h-3.5 w-3.5 stroke-red-600/50 "
                          >
                            <path d="M4 4l6 6m0-6l-6 6" />
                          </svg>
                          <span className="absolute -inset-1" />
                        </button>
                      </span>
                    )}
                    <img
                      src={prod.imgSrc}
                      className="h-full w-full object-cover object-center "
                    />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
