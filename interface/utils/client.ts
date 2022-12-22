import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client"
import type { ContextSetter } from "@apollo/client/link/context"
import { setContext } from "@apollo/client/link/context"
import { offsetLimitPagination } from "@apollo/client/utilities"
import { getApps } from "firebase/app"
import { getAuth, getIdToken } from "firebase/auth"
import { Config } from "interface/config"

const httpLink = createHttpLink({
  uri: Config.graphqlEndpoint,
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
        works: offsetLimitPagination(["where"]),
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
