import type { Event } from "@prisma/client"
import type { z } from "zod"
import type { UserEvent } from "core"
import {
  Biography,
  Name,
  UserProfileUpdatedEvent,
  UserLoginUpdatedEvent,
  Username,
  Url,
  Email,
  Id,
  UserCreatedEvent,
} from "core"
import type { PrismaUserEvent } from "infrastructure/validations"
import {
  zPrismaUserLoginUpdatedEvent,
  zPrismaUserProfileUpdatedEvent,
  zPrismaUserCreatedEvent,
} from "infrastructure/validations"

export class UserEventConverter {
  static toData(event: UserEvent): PrismaUserEvent {
    if (event.type === UserCreatedEvent.type) {
      const data: z.infer<typeof zPrismaUserCreatedEvent> = {
        userId: event.userId.value,
        email: event.email.value,
        name: event.name.value,
        avatarImageURL: event.avatarImageURL?.value ?? null,
      }
      return zPrismaUserCreatedEvent.parse(data)
    }

    if (event.type === UserLoginUpdatedEvent.type) {
      const data: z.infer<typeof zPrismaUserLoginUpdatedEvent> = {
        userId: event.userId.value,
        login: event.login.value,
      }
      return zPrismaUserLoginUpdatedEvent.parse(data)
    }

    if (event.type === UserProfileUpdatedEvent.type) {
      const data: z.infer<typeof zPrismaUserProfileUpdatedEvent> = {
        userId: event.userId.value,
        name: event.name.value,
        biography: event.biography.value,
        headerImageId: event.headerImageId?.value ?? null,
        avatarImageURL: event.avatarImageURL?.value ?? null,
        avatarImageId: event.avatarImageId?.value ?? null,
      }
      return zPrismaUserProfileUpdatedEvent.parse(data)
    }

    return event
  }

  static toEntity(event: Event): UserEvent {
    if (event.type === UserCreatedEvent.type) {
      const data = zPrismaUserCreatedEvent.parse(event.data)
      return new UserCreatedEvent({
        id: new Id(event.id),
        userId: new Id(data.userId),
        email: new Email(data.email),
        name: new Name(data.name),
        avatarImageURL: data.avatarImageURL
          ? new Url(data.avatarImageURL)
          : null,
      })
    }

    if (event.type === UserLoginUpdatedEvent.type) {
      const data = zPrismaUserLoginUpdatedEvent.parse(event.data)
      return new UserLoginUpdatedEvent({
        id: new Id(event.id),
        userId: new Id(data.userId),
        login: new Username(data.login),
      })
    }

    if (event.type === UserProfileUpdatedEvent.type) {
      const data = zPrismaUserProfileUpdatedEvent.parse(event.data)
      return new UserProfileUpdatedEvent({
        id: new Id(event.id),
        userId: new Id(data.userId),
        name: new Name(data.name),
        biography: new Biography(data.biography),
        headerImageId:
          data.headerImageId !== null ? new Id(data.headerImageId) : null,
        avatarImageURL:
          data.avatarImageURL !== null ? new Url(data.avatarImageURL) : null,
        avatarImageId:
          data.avatarImageId !== null ? new Id(data.avatarImageId) : null,
      })
    }

    throw new Error()
  }
}
