import { ApolloServerErrorCode } from "@apollo/server/errors"
import { GraphQLError } from "graphql"
import { container } from "tsyringe"
import db from "db"
import type {
  MutationUpdateUserRequestSettingsArgs,
  RequireFields,
  Resolver,
} from "interface/__generated__/node"
import { UpdateUserRequestSettingsCommand } from "service"
import type { ApolloContext } from "types"

type Resolvers = Resolver<
  unknown,
  unknown,
  ApolloContext,
  RequireFields<MutationUpdateUserRequestSettingsArgs, "input">
>

export const updateUserRequestSettingsResolver: Resolvers = async (
  _,
  args,
  ctx,
) => {
  if (ctx.currentUser === null) {
    throw new GraphQLError("ERROR", {
      extensions: { code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR },
    })
  }

  const command = container.resolve(UpdateUserRequestSettingsCommand)

  const output = await command.execute({
    userId: ctx.currentUser.uid,
    userIsRequestable: args.input.isRequestable,
    userIsRequestableForFree: args.input.isRequestableForFree,
    userMaximumFee: args.input.maximumFee,
    userMinimumFee: args.input.minimumFee,
  })

  if (output instanceof Error) {
    throw new GraphQLError("ERROR", {
      extensions: { code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR },
    })
  }

  return db.user.findUnique({ where: { id: ctx.currentUser.uid } })
}
