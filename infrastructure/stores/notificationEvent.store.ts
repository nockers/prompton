import { injectable } from "tsyringe"
import type { NotificationEvent } from "core"

import { NotificationRepository } from "infrastructure/repositories"

@injectable()
export class NotificationEventStore {
  constructor(private repository: NotificationRepository) {}

  execute(event: NotificationEvent) {
    this.repository
    event
    return null
  }
}
