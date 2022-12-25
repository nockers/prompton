import { captureException } from "@sentry/node"
import { injectable } from "tsyringe"
import type { LikeCreatedEvent } from "core"

@injectable()
export class LikeCreatedEventHandler {
  async execute(event: LikeCreatedEvent) {
    try {
      event
      return null
    } catch (error) {
      captureException(error)
      return new Error()
    }
  }
}
