import { getAuth } from "firebase/auth"

export const useCurrentUser = () => {
  if (typeof window === "undefined") {
    return null
  }

  return getAuth().currentUser
}
