import { injectable } from "tsyringe"
import type { UserEvent } from "core"
import {
  UserCreatedEvent,
  Biography,
  UserEntity,
  UserLoginUpdatedEvent,
  UserProfileUpdatedEvent,
} from "core"
import { UserRepository } from "infrastructure/repositories"

@injectable()
export class UserEventStore {
  constructor(private repository: UserRepository) {}

  execute(event: UserEvent) {
    if (event.type === UserCreatedEvent.type) {
      return this.created(event)
    }

    if (event.type === UserLoginUpdatedEvent.type) {
      return this.loginUpdated(event)
    }

    if (event.type === UserProfileUpdatedEvent.type) {
      return this.profileUpdated(event)
    }

    return null
  }

  async created(event: UserCreatedEvent) {
    const draftUser = new UserEntity({
      id: event.userId,
      email: event.email,
      biography: new Biography(""),
      headerImageId: null,
      avatarImageId: null,
      avatarImageURL: event.avatarImageURL,
      name: event.name,
      login: null,
    })

    return this.repository.persist(draftUser)
  }

  async loginUpdated(event: UserLoginUpdatedEvent) {
    event
    return null
  }

  async profileUpdated(event: UserProfileUpdatedEvent) {
    const user = await this.repository.find(event.userId)

    if (user === null) {
      return new Error()
    }

    if (user instanceof Error) {
      return new Error()
    }

    const draftUser = user.update({
      avatarImageId: event.avatarImageId ? event.avatarImageId : null,
      name: event.name,
      biography: event.biography,
    })

    return this.repository.persist(draftUser)
  }
}
