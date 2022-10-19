import { createContext, useContext, useEffect, useState } from "react";
import api from '../services/api'

const AuthContext = createContext()

export function AuthProvider({children}) {
  const [user, setUser] = useState(null);

  const signIn = (credential, callback) => {
    api.auth.signin(credential, (user) => {
      if(user) {
        setUser(user)
        localStorage.setItem('user', JSON.stringify(user))
        callback()
      }
    })
  }

  const signOut = (callback) => {
    api.auth.signout(() => {
      setUser(false)
      localStorage.removeItem('user')
      callback()
    })
  }

  useEffect(() => {
    const user = localStorage.getItem('user')

    if(user) setUser(JSON.parse(user))
    else setUser(false)
  }, [])

  const value = {user, signIn, signOut}

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext)
}