import type { User } from "firebase/auth"
import { createContext } from "react"

type Value = {
  isLoading: boolean
  isLoggedIn: boolean
  isNotLoggedIn: boolean
  currentUser: User | null
}

export const AppContext = createContext<Value>({
  isLoading: false,
  isLoggedIn: false,
  isNotLoggedIn: true,
  currentUser: null,
})
