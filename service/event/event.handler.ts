import { container } from "tsyringe"
import type { DomainEvent } from "core"
import { PostCreatedEvent } from "core"
import { PostCreatedEventHandler } from "service/post"

export class EventHandler {
  execute(event: DomainEvent) {
    if (event instanceof PostCreatedEvent) {
      return container.resolve(PostCreatedEventHandler).execute(event)
    }

    return null
  }
}
