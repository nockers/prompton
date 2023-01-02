import { ApolloServerErrorCode } from "@apollo/server/errors"
import { getAuth } from "firebase-admin/auth"
import { GraphQLError } from "graphql"
import { container } from "tsyringe"
import type { MutationResolvers } from "interface/__generated__/node"
import { CreateUserCommand } from "service"

export const createUserResolver: MutationResolvers["createUser"] = async (
  _,
  args,
  ctx,
) => {
  if (ctx.currentUser === null) {
    throw new GraphQLError("ERROR", {
      extensions: { code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR },
    })
  }

  const command = container.resolve(CreateUserCommand)

  const output = await command.execute({
    userId: ctx.currentUser.uid,
    userAvatarURL: ctx.currentUser.picture ?? null,
    userName: args.input.name,
    userEmail: ctx.currentUser.email ?? null,
  })

  if (output instanceof Error) {
    throw new GraphQLError("ERROR", {
      extensions: { code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR },
    })
  }

  await getAuth().updateUser(ctx.currentUser.uid, {
    displayName: args.input.name,
  })

  await getAuth().setCustomUserClaims(ctx.currentUser.uid, {
    isInitialized: true,
  })

  return true
}
