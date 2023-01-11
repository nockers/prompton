import { ApolloServerErrorCode } from "@apollo/server/errors"
import { GraphQLError } from "graphql"
import { IdFactory } from "core"
import db from "db"
import type {
  MutationCreatePromptArgs,
  RequireFields,
  Resolver,
} from "interface/__generated__/node"
import type { ApolloContext } from "types"

type Resolvers = Resolver<
  unknown,
  unknown,
  ApolloContext,
  RequireFields<MutationCreatePromptArgs, "input">
>

export const createPromptResolver: Resolvers = async (_, args, ctx) => {
  if (ctx.currentUser === null) {
    throw new GraphQLError("ERROR", {
      extensions: { code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR },
    })
  }

  const duplicatedTexts = args.input.text.split(",").map((t) => t.trim())

  const texts = [...Array.from(new Set(duplicatedTexts))]

  const text = texts.join(",")

  const promptId = IdFactory.create().value

  if (texts.length === 0) {
    throw new GraphQLError("ERROR", {
      extensions: { code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR },
    })
  }

  await db.prompt.create({
    data: {
      id: promptId,
      isNsfw: args.input.isNsfw,
      text: args.input.text,
      texts: text,
      title: null,
      titleJA: null,
      userId: ctx.currentUser.uid,
      isBase: args.input.isBase,
      isSingle: args.input.isSingle,
    },
  })

  return db.prompt.findUnique({ where: { id: promptId } })
}
