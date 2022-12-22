import "reflect-metadata"
import { ApolloServer } from "@apollo/server"
import { startServerAndCreateNextHandler } from "@as-integrations/next"
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader"
import { loadSchemaSync } from "@graphql-tools/load"
import { addResolversToSchema } from "@graphql-tools/schema"
import { getApps, initializeApp } from "firebase-admin/app"
import { getAuth } from "firebase-admin/auth"
import { Env } from "infrastructure/env"
import { sentryPlugin } from "interface/plugins/sentryPlugin"
import { resolvers } from "interface/resolvers/resolver"

if (getApps().length === 0) {
  initializeApp({
    credential: Env.googleCredential,
    storageBucket: Env.googleStorageBucket,
  })
}

const schema = loadSchemaSync("interface/schema.graphql", {
  loaders: [new GraphQLFileLoader()],
})

const server = new ApolloServer({
  schema: addResolversToSchema({ schema, resolvers }),
  introspection: true,
  plugins: [sentryPlugin],
})

export default startServerAndCreateNextHandler(server, {
  async context(req) {
    try {
      if (req.body.operationName === "IntrospectionQuery") {
        return {}
      }
      const token = req.headers["token"] ?? null
      if (typeof token === "string") {
        const decodedIdToken = await getAuth().verifyIdToken(token)
        return { currentUser: decodedIdToken }
      }
      return { currentUser: null }
    } catch (error) {
      return { currentUser: null }
    }
  },
})
