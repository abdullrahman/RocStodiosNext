import { createContext, useReducer, useState } from 'react'


export const ImgContext = createContext()



export const ImgContextProvider = ({ children }) => {
    const [imgList, setImgList] = useState([])
  
  return (
    <ImgContext.Provider value={{ imgList, setImgList }}>
      {children}
    </ImgContext.Provider>
  )
}
