import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { useEffect, useState } from 'react'

import firebaseApp from '../firebaseApp'

const auth = getAuth(firebaseApp)

const userListeners = []

onAuthStateChanged(auth, user => {
  AuthService._user = user
  userListeners.forEach(listener => listener(user))
})

const AuthService = {
  login: ({ email, password }) =>
    signInWithEmailAndPassword(auth, email, password),
  logout: () => signOut(auth),
  get user() {
    return this._user
  },
}

export const useUser = () => {
  const [user, setUser] = useState(AuthService.user)

  useEffect(() => {
    const listener = user => setUser(user)

    userListeners.push(listener)
    return () => userListeners.splice(userListeners.indexOf(listener), 1)
  }, [])

  return user
}

export default AuthService
