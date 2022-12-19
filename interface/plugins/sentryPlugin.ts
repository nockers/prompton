import { ApolloError } from "@apollo/client"
import type { ApolloServerPlugin } from "@apollo/server"
import { captureException, withScope } from "@sentry/node"

export const sentryPlugin: ApolloServerPlugin = {
  async requestDidStart() {
    return {
      async parsingDidStart() {},
      async validationDidStart() {},
      async didEncounterErrors(ctx) {
        if (typeof ctx.operation === "undefined") return
        for (const error of ctx.errors) {
          if (error instanceof ApolloError) continue
          withScope((scope) => {
            scope.setTag("kind", ctx.operation!.operation)
            scope.setExtra("query", ctx.request.query)
            scope.setExtra("variables", ctx.request.variables)
            if (typeof error.path !== "undefined") {
              scope.addBreadcrumb({
                category: "query-path",
                message: error.path.join(" > "),
                level: "debug",
              })
            }
            captureException(error)
          })
        }
      },
    }
  },
}
