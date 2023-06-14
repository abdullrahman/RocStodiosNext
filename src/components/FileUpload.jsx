import { React, useState, useEffect } from 'react'
import { storage } from '@/firebase/config'
import { ref, getDownloadURL, listAll, uploadBytes } from 'firebase/storage'
import { useImgContext } from '@/hooks/useImgContext'

export default function FileUpload() {
  const { setImgList } = useImgContext()
  const [imageUpload, setImageUpload] = useState()
  const imageRef = ref(storage, 'images/')

  const uploadFile = () => {
    if (!imageUpload) return
    const imageReff = ref(storage, 'images/' + imageUpload.name)
    uploadBytes(imageReff, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImgList((prev) => [...prev, { url: url }])
      })
      alert('upload done')
    })
    setImageUpload(null)
  }

  useEffect(() => {
    listAll(imageRef).then((res) => {
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImgList((prev) => [
            ...prev,
            { url: url, name: item._location.path_ },
          ])
        })
      })
    })
  }, [])
  return (
    <div className="w-full">
      <label
        htmlFor="cover-photo"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Cover photo
      </label>
      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
        <div className="text-center">
          <div className="mt-4 flex text-sm leading-6 text-gray-600">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
            >
              {imageUpload ? (
                <span>{imageUpload.name} </span>
              ) : (
                <span>Upload a file</span>
              )}
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
                onChange={(e) => setImageUpload(e.target.files[0])}
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs leading-5 text-gray-600">
            PNG, JPG, GIF up to 10MB
          </p>
          <button
            type="button"
            className="mt-3 rounded-md bg-white px-2.5 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            onClick={uploadFile}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  )
}
