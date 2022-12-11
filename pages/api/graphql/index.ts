import "reflect-metadata"
import { ApolloServer } from "@apollo/server"
import { startServerAndCreateNextHandler } from "@as-integrations/next"
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader"
import { loadSchemaSync } from "@graphql-tools/load"
import { addResolversToSchema } from "@graphql-tools/schema"
import { cert, getApps, initializeApp } from "firebase-admin/app"
import { getAuth } from "firebase-admin/auth"
import { resolvers } from "interface/resolvers/resolver"

if (getApps().length === 0) {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL!
  const privateKey = process.env.GOOGLE_PRIVATE_KEY!
  initializeApp({
    credential: cert({
      clientEmail,
      privateKey: privateKey.replace(/\\n/g, "\n").replace(/\\/g, ""),
      projectId,
    }),
    storageBucket: `${projectId}.appspot.com`,
  })
}

const schema = loadSchemaSync("interface/schema.graphql", {
  loaders: [new GraphQLFileLoader()],
})

const server = new ApolloServer({
  schema: addResolversToSchema({ schema, resolvers }),
  introspection: true,
})

if (getApps().length === 0) {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL!
  const privateKey = process.env.GOOGLE_PRIVATE_KEY!
  initializeApp({
    credential: cert({
      clientEmail,
      privateKey: privateKey.replace(/\\n/g, "\n").replace(/\\/g, ""),
      projectId,
    }),
    storageBucket: `${projectId}.appspot.com`,
  })
}

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
