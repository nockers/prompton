"use client"
import type { User } from "firebase/auth"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import type { FC, ReactNode } from "react"
import { useEffect, useState } from "react"
import { Config } from "interface/config"
import { AppContext } from "interface/contexts/appContext"

type Props = {
  children: ReactNode
}

export const AppContextProvider: FC<Props> = (props) => {
  const [isLoading, setLoadingState] = useState(() => {
    return true
  })

  const [currentUser, setCurrentUser] = useState<User | null>(null)

  useEffect(() => {
    if (Config.isNotClient) return
    onAuthStateChanged(getAuth(), (user) => {
      setLoadingState(false)
      setCurrentUser(user)
    })
  }, [])

  const value = {
    isLoading: isLoading,
    isLoggedIn: currentUser !== null,
    isNotLoggedIn: currentUser === null,
    currentUser: currentUser,
  }

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  )
}
