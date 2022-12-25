import { captureException } from "@sentry/node"
import { injectable } from "tsyringe"
import type { UserCreatedEvent } from "core"

@injectable()
export class UserCreatedEventHandler {
  async execute(event: UserCreatedEvent) {
    try {
      event
      return null
    } catch (error) {
      captureException(error)
      return new Error()
    }
  }
}
