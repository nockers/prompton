import type { Event } from "@prisma/client"

import type { DomainEvent } from "core/events/domainEvent"
import { BookmarkEventConverter } from "infrastructure/converters/bookmark.event.converter"
import { FriendshipEventConverter } from "infrastructure/converters/friendship.event.converter"
import { LabelEventConverter } from "infrastructure/converters/label.event.converter"
import { LikeEventConverter } from "infrastructure/converters/like.event.converter"
import { NotificationEventConverter } from "infrastructure/converters/notification.event.converter"
import { PaymentEventConverter } from "infrastructure/converters/payment.event.converter"
import { PostEventConverter } from "infrastructure/converters/post.event.converter"
import { RequestEventConverter } from "infrastructure/converters/request.event.converter"
import { UserEventConverter } from "infrastructure/converters/user.event.converter"
import type { EventData } from "infrastructure/validations"

export class EventConverter {
  static toData(event: DomainEvent): EventData {
    if (event.collectionId === "BOOKMARKS") {
      return BookmarkEventConverter.toData(event)
    }

    if (event.collectionId === "FRIENDSHIPS") {
      return FriendshipEventConverter.toData(event)
    }

    if (event.collectionId === "LABELS") {
      return LabelEventConverter.toData(event)
    }

    if (event.collectionId === "LIKES") {
      return LikeEventConverter.toData(event)
    }

    if (event.collectionId === "NOTIFICATIONS") {
      return NotificationEventConverter.toData(event)
    }

    if (event.collectionId === "PAYMENTS") {
      return PaymentEventConverter.toData(event)
    }

    if (event.collectionId === "POSTS") {
      return PostEventConverter.toData(event)
    }

    if (event.collectionId === "REQUESTS") {
      return RequestEventConverter.toData(event)
    }

    if (event.collectionId === "USERS") {
      return UserEventConverter.toData(event)
    }

    return event
  }

  static toEntity(event: Event): DomainEvent {
    if (event.collectionId === "BOOKMARKS") {
      return BookmarkEventConverter.toEntity(event)
    }

    if (event.collectionId === "FRIENDSHIPS") {
      return FriendshipEventConverter.toEntity(event)
    }

    if (event.collectionId === "LABELS") {
      return LabelEventConverter.toEntity(event)
    }

    if (event.collectionId === "LIKES") {
      return LikeEventConverter.toEntity(event)
    }

    if (event.collectionId === "NOTIFICATIONS") {
      return NotificationEventConverter.toEntity(event)
    }

    if (event.collectionId === "PAYMENTS") {
      return PaymentEventConverter.toEntity(event)
    }

    if (event.collectionId === "POSTS") {
      return PostEventConverter.toEntity(event)
    }

    if (event.collectionId === "REQUESTS") {
      return RequestEventConverter.toEntity(event)
    }

    if (event.collectionId === "USERS") {
      return UserEventConverter.toEntity(event)
    }

    throw new Error()
  }
}
