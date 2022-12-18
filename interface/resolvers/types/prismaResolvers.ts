import type { ApolloContext } from "types"

export type PrismaResolvers<T, U> = {
  [K in keyof T]: (parent: U, args: any, context: ApolloContext) => unknown
}
