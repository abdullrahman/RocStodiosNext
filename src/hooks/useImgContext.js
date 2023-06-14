import { ImgContext } from '../context/imgContext'
import { useContext } from 'react'

export const useImgContext = () => {
  const context = useContext(ImgContext)

  if (!context) {
    throw Error('useAuthContext must be used inside an AuthContextProvider')
  }

  return context
}
