import { DecodedIdToken } from "firebase-admin/auth"

// GraphQL
export type Context = {
  currentUser: DecodedIdToken | null
}
