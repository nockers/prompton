import { captureException } from "@sentry/node"
import { injectable } from "tsyringe"
import type { NotificationCreatedEvent } from "core"

@injectable()
export class NotificationCreatedEventHandler {
  async execute(event: NotificationCreatedEvent) {
    try {
      event
      return null
    } catch (error) {
      captureException(error)
      return new Error()
    }
  }
}
