import { container } from "tsyringe"
import type { DomainEvent } from "core"
import { LabelCreatedEvent, PostCreatedEvent } from "core"
import { LabelCreatedEventHandler } from "service/label"
import { PostCreatedEventHandler } from "service/post"

export class EventHandler {
  execute(event: DomainEvent) {
    if (event instanceof LabelCreatedEvent) {
      return container.resolve(LabelCreatedEventHandler).execute(event)
    }

    if (event instanceof PostCreatedEvent) {
      return container.resolve(PostCreatedEventHandler).execute(event)
    }

    return null
  }
}
