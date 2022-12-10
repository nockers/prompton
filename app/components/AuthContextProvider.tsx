"use client"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { FC, ReactNode, useEffect, useState } from "react"
import { AppContext } from "interface/contexts/appContext"

type Props = {
  children: ReactNode
}

export const AppContextProvider: FC<Props> = (props) => {
  const [isLoading, setLoadingState] = useState(() => {
    return true
  })

  useEffect(() => {
    if (typeof window === "undefined") return
    onAuthStateChanged(getAuth(), () => {
      setLoadingState(false)
    })
  }, [])

  const value = {
    isLoading: isLoading,
  }

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  )
}
