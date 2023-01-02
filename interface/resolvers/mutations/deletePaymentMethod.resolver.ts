import { ApolloServerErrorCode } from "@apollo/server/errors"
import { GraphQLError } from "graphql"
import { container } from "tsyringe"

import { DeletePaymentMethodCommand } from "service"
import type { ApolloContext } from "types"

export const deletePaymentMethodResolver = async (
  _: unknown,
  __: unknown,
  ctx: ApolloContext,
) => {
  if (ctx.currentUser === null) {
    throw new GraphQLError("ERROR", {
      extensions: { code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR },
    })
  }

  const command = container.resolve(DeletePaymentMethodCommand)

  const output = await command.execute({
    userId: ctx.currentUser.uid,
  })

  if (output instanceof Error) {
    throw new GraphQLError("ERROR", {
      extensions: { code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR },
    })
  }

  return null
}
