import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client"
import { ContextSetter, setContext } from "@apollo/client/link/context"
import { relayStylePagination } from "@apollo/client/utilities"
import { getAuth, getIdToken } from "firebase/auth"

export const createClient = () => {
  const httpLink = createHttpLink({
    uri: "/api/graphql",
  })

  const contextSetter: ContextSetter = async (_, context) => {
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
          posts: relayStylePagination(),
          threads: relayStylePagination(),
        },
      },
    },
  })

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: cache,
  })
}
