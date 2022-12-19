import type { User } from "firebase/auth"
import { createContext } from "react"

type Value = {
  isLoading: boolean
  currentUser: User | null
}

export const AppContext = createContext<Value>({
  isLoading: false,
  currentUser: null,
})
