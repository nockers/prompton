import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client"
import { ContextSetter, setContext } from "@apollo/client/link/context"
import { offsetLimitPagination } from "@apollo/client/utilities"
import { getApps } from "firebase/app"
import { getAuth, getIdToken } from "firebase/auth"

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  credentials: "same-origin",
})

const contextSetter: ContextSetter = async (_, context) => {
  if (getApps().length === 0) {
    return {
      headers: {
        ...context.headers,
        token: null,
      },
    }
  }
  const currentUser = getAuth().currentUser
  if (currentUser === null) {
    return {
      headers: {
        ...context.headers,
        token: null,
      },
    }
  }
  const token = await getIdToken(currentUser)
  return {
    headers: {
      ...context.headers,
      token: token,
    },
  }
}

const authLink = setContext(contextSetter)

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        posts: offsetLimitPagination(["where"]),
        labels: offsetLimitPagination(),
      },
    },
  },
})

export const client = new ApolloClient({
  ssrMode: true,
  link: authLink.concat(httpLink),
  cache: cache,
})
