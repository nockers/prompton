import { captureException } from "@sentry/node"
import { injectable } from "tsyringe"
import type { FriendshipCreatedEvent } from "core"

@injectable()
export class FriendshipCreatedEventHandler {
  async execute(event: FriendshipCreatedEvent) {
    try {
      event
      return null
    } catch (error) {
      captureException(error)
      return new Error()
    }
  }
}
