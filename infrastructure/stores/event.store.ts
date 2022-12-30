import axios from "axios"
import { injectable } from "tsyringe"
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

    if (event.collectionId === "BOOKMARKS") {
      await this.bookmarkEventStore.execute(event)
    }

    if (event.collectionId === "FRIENDSHIPS") {
      await this.friendshipEventStore.execute(event)
    }

    if (event.collectionId === "LABELS") {
      await this.labelEventStore.execute(event)
    }

    if (event.collectionId === "LIKES") {
      await this.likeEventStore.execute(event)
    }

    if (event.collectionId === "NOTIFICATIONS") {
      await this.notificationEventStore.execute(event)
    }

    if (event.collectionId === "POSTS") {
      await this.postEventStore.execute(event)
    }

    if (event.collectionId === "USERS") {
      await this.userEventStore.execute(event)
    }

    axios.request({
      method: "POST",
      baseURL: Env.appURL,
      url: `api/events/${event.id.value}`,
      data: { eventToken: Env.eventToken },
    })

    return null
  }
}
