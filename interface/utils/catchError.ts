import { captureException } from "@sentry/node"

export const catchError = <T extends Error>(
  error: unknown,
  ErrorClass?: new () => T,
) => {
  captureException(error)
  console.error(error)
  if (error instanceof Error) {
    return error
  }
  return new (ErrorClass ?? Error)()
}
