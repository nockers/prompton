import axios from "axios"
import { injectable } from "tsyringe"
import {
  BookmarkCreatedEvent,
  BookmarkDeletedEvent,
  FriendshipCreatedEvent,
  FriendshipDeletedEvent,
  LabelCreatedEvent,
  LabelNameUpdatedEvent,
  LikeCreatedEvent,
  LikeDeletedEvent,
  NotificationCreatedEvent,
  PostAnnotationsUpdatedEvent,
  PostCreatedEvent,
  PostDeletedEvent,
  PostUpdatedEvent,
  UserCreatedEvent,
  UserLoginUpdatedEvent,
  UserProfileUpdatedEvent,
} from "core"
import type { DomainEvent } from "core/events/domainEvent"
import { Env } from "infrastructure/env"
import { EventRepository } from "infrastructure/repositories"
import { BookmarkEventStore } from "infrastructure/stores/bookmarkEvent.store"
import { FriendshipEventStore } from "infrastructure/stores/friendshipEvent.store"
import { LabelEventStore } from "infrastructure/stores/labelEvent.store"
import { LikeEventStore } from "infrastructure/stores/likeEvent.store"
import { NotificationEventStore } from "infrastructure/stores/notificationEvent.store"
import { PostEventStore } from "infrastructure/stores/postEvent.store"
import { UserEventStore } from "infrastructure/stores/userEvent.store"

@injectable()
export class EventStore {
  constructor(
    private eventRepository: EventRepository,
    private bookmarkEventStore: BookmarkEventStore,
    private friendshipEventStore: FriendshipEventStore,
    private labelEventStore: LabelEventStore,
    private likeEventStore: LikeEventStore,
    private notificationEventStore: NotificationEventStore,
    private postEventStore: PostEventStore,
    private userEventStore: UserEventStore,
  ) {}

  async commit(event: DomainEvent) {
    await this.eventRepository.persist(event)

    if (
      event instanceof BookmarkCreatedEvent ||
      event instanceof BookmarkDeletedEvent
    ) {
      await this.bookmarkEventStore.execute(event)
    }

    if (
      event instanceof FriendshipCreatedEvent ||
      event instanceof FriendshipDeletedEvent
    ) {
      await this.friendshipEventStore.execute(event)
    }

    if (
      event instanceof LabelCreatedEvent ||
      event instanceof LabelNameUpdatedEvent
    ) {
      await this.labelEventStore.execute(event)
    }

    if (
      event instanceof LikeCreatedEvent ||
      event instanceof LikeDeletedEvent
    ) {
      await this.likeEventStore.execute(event)
    }

    if (event instanceof NotificationCreatedEvent) {
      await this.notificationEventStore.execute(event)
    }

    if (
      event instanceof PostAnnotationsUpdatedEvent ||
      event instanceof PostCreatedEvent ||
      event instanceof PostDeletedEvent ||
      event instanceof PostUpdatedEvent
    ) {
      await this.postEventStore.execute(event)
    }

    if (
      event instanceof UserCreatedEvent ||
      event instanceof UserLoginUpdatedEvent ||
      event instanceof UserProfileUpdatedEvent
    ) {
      await this.userEventStore.execute(event)
    }

    axios.request({
      method: "POST",
      baseURL: process.env.APP_URL,
      url: `${Env.appURL}/api/events/${event.id.value}`,
      data: { eventToken: Env.eventToken },
    })

    return null
  }
}
