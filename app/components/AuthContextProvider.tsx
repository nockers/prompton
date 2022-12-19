"use client"
import type { User } from "firebase/auth"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import type { FC, ReactNode } from "react"
import { useEffect, useState } from "react"
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
    if (typeof window === "undefined") return
    onAuthStateChanged(getAuth(), (user) => {
      setLoadingState(false)
      setCurrentUser(user)
    })
  }, [])

  const value = {
    isLoading: isLoading,
    currentUser: currentUser,
  }

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  )
}
