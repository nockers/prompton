import type { Event } from "@prisma/client"
import {
  BookmarkCreatedEvent,
  PostCreatedEvent,
  PostDeletedEvent,
  FriendshipCreatedEvent,
  FriendshipDeletedEvent,
  LabelCreatedEvent,
  LabelNameUpdatedEvent,
  LikeCreatedEvent,
  LikeDeletedEvent,
  NotificationCreatedEvent,
  PostAnnotationsUpdatedEvent,
  PostUpdatedEvent,
  BookmarkDeletedEvent,
  UserCreatedEvent,
  UserLoginUpdatedEvent,
  UserProfileUpdatedEvent,
} from "core"
import type { DomainEvent } from "core/events/domainEvent"
import { BookmarkEventConverter } from "infrastructure/converters/bookmark.event.converter"
import { FriendshipEventConverter } from "infrastructure/converters/friendship.event.converter"
import { LabelEventConverter } from "infrastructure/converters/label.event.converter"
import { LikeEventConverter } from "infrastructure/converters/like.event.converter"
import { NotificationEventConverter } from "infrastructure/converters/notification.event.converter"
import { PostEventConverter } from "infrastructure/converters/post.event.converter"
import { UserEventConverter } from "infrastructure/converters/user.event.converter"
import type { PrismaEvent } from "infrastructure/validations"

export class EventConverter {
  static toData(event: DomainEvent): PrismaEvent {
    if (
      event.type === BookmarkCreatedEvent.type ||
      event.type === BookmarkDeletedEvent.type
    ) {
      return BookmarkEventConverter.toData(event)
    }

    if (
      event.type === FriendshipCreatedEvent.type ||
      event.type === FriendshipDeletedEvent.type
    ) {
      return FriendshipEventConverter.toData(event)
    }

    if (
      event.type === LabelCreatedEvent.type ||
      event.type === LabelNameUpdatedEvent.type
    ) {
      return LabelEventConverter.toData(event)
    }

    if (
      event.type === LikeCreatedEvent.type ||
      event.type === LikeDeletedEvent.type
    ) {
      return LikeEventConverter.toData(event)
    }

    if (event.type === NotificationCreatedEvent.type) {
      return NotificationEventConverter.toData(event)
    }

    if (
      event.type === PostAnnotationsUpdatedEvent.type ||
      event.type === PostCreatedEvent.type ||
      event.type === PostDeletedEvent.type ||
      event.type === PostUpdatedEvent.type
    ) {
      return PostEventConverter.toData(event)
    }

    if (
      event.type === UserCreatedEvent.type ||
      event.type === UserLoginUpdatedEvent.type ||
      event.type === UserProfileUpdatedEvent.type
    ) {
      return UserEventConverter.toData(event)
    }

    return event
  }

  static toEntity(event: Event): DomainEvent {
    if (
      event.type === BookmarkCreatedEvent.type ||
      event.type === BookmarkDeletedEvent.type
    ) {
      return BookmarkEventConverter.toEntity(event)
    }

    if (
      event.type === FriendshipCreatedEvent.type ||
      event.type === FriendshipDeletedEvent.type
    ) {
      return FriendshipEventConverter.toEntity(event)
    }

    if (
      event.type === LabelCreatedEvent.type ||
      event.type === LabelNameUpdatedEvent.type
    ) {
      return LabelEventConverter.toEntity(event)
    }

    if (
      event.type === LikeCreatedEvent.type ||
      event.type === LikeDeletedEvent.type
    ) {
      return LikeEventConverter.toEntity(event)
    }

    if (event.type === NotificationCreatedEvent.type) {
      return NotificationEventConverter.toEntity(event)
    }

    if (
      event.type === PostAnnotationsUpdatedEvent.type ||
      event.type === PostCreatedEvent.type ||
      event.type === PostDeletedEvent.type ||
      event.type === PostUpdatedEvent.type
    ) {
      return PostEventConverter.toEntity(event)
    }

    if (
      event.type === UserCreatedEvent.type ||
      event.type === UserLoginUpdatedEvent.type ||
      event.type === UserProfileUpdatedEvent.type
    ) {
      return UserEventConverter.toEntity(event)
    }

    throw new Error()
  }
}
