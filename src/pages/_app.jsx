import 'focus-visible'
import '@/styles/tailwind.css'
import { AuthContextProvider } from '@/context/AuthContext'
import { ImgContextProvider } from '@/context/imgContext'

export default function App({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <ImgContextProvider>
        <Component {...pageProps} />
      </ImgContextProvider>
    </AuthContextProvider>
  )
}
