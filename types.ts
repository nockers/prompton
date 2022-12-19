import type { DecodedIdToken } from "firebase-admin/auth"

// GraphQL
export type ApolloContext = {
  currentUser: DecodedIdToken | null
}
