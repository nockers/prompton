import { container } from "tsyringe"
import type { DomainEvent } from "core"
import {
  PostPromptCreatedEvent,
  NotificationCreatedEvent,
  UserCreatedEvent,
  LikeCreatedEvent,
  FriendshipCreatedEvent,
  LabelCreatedEvent,
  PostCreatedEvent,
} from "core"
import { FriendshipCreatedEventHandler } from "service/friendship"
import { LabelCreatedEventHandler } from "service/label"
import { LikeCreatedEventHandler } from "service/like"
import { NotificationCreatedEventHandler } from "service/notification"
import {
  PostCreatedEventHandler,
  PostPromptCreatedEventHandler,
} from "service/post"
import { UserCreatedEventHandler } from "service/user"

export class EventHandler {
  execute(event: DomainEvent) {
    if (event instanceof FriendshipCreatedEvent) {
      return container.resolve(FriendshipCreatedEventHandler).execute(event)
    }

    if (event instanceof LikeCreatedEvent) {
      return container.resolve(LikeCreatedEventHandler).execute(event)
    }

    if (event instanceof NotificationCreatedEvent) {
      return container.resolve(NotificationCreatedEventHandler).execute(event)
    }

    if (event instanceof UserCreatedEvent) {
      return container.resolve(UserCreatedEventHandler).execute(event)
    }

    if (event instanceof LabelCreatedEvent) {
      return container.resolve(LabelCreatedEventHandler).execute(event)
    }

    if (event instanceof PostCreatedEvent) {
      return container.resolve(PostCreatedEventHandler).execute(event)
    }

    if (event instanceof PostPromptCreatedEvent) {
      return container.resolve(PostPromptCreatedEventHandler).execute(event)
    }

    return null
  }
}
