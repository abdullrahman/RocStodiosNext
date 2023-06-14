import { auth } from '@/firebase/config'
import { signOut } from 'firebase/auth'
import { useRouter } from 'next/router'

import { useAuthContext } from './useAuthContext'

export const useLogout = () => {
  const router = useRouter()
  const { dispatch } = useAuthContext()
  const logout = () => {
    signOut(auth)
      .then(() => {
        dispatch({ type: 'LOGOUT' })
        router.push({
          pathname: '/login',
        })
      })
      .catch((err) => {
        console.log(err.message)
      })
  }
  return { logout }
}
