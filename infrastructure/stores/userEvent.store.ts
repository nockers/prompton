import { getAuth } from "firebase-admin/auth"
import { injectable } from "tsyringe"
import type { UserEvent } from "core"
import {
  UserRequestSettingsUpdatedEvent,
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
    if (event instanceof UserCreatedEvent) {
      return this.created(event)
    }

    if (event instanceof UserLoginUpdatedEvent) {
      return this.loginUpdated(event)
    }

    if (event instanceof UserProfileUpdatedEvent) {
      return this.profileUpdated(event)
    }

    if (event instanceof UserRequestSettingsUpdatedEvent) {
      return this.requestSettingsUpdated(event)
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
      isRequestable: false,
      minimumFee: 1000,
      maximumFee: 8000,
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

    await getAuth().updateUser(event.userId.value, {
      displayName: event.name.value,
    })

    const draftUser = user.update({
      avatarImageId: event.avatarImageId ? event.avatarImageId : null,
      name: event.name,
      biography: event.biography,
    })

    return this.repository.persist(draftUser)
  }

  async requestSettingsUpdated(event: UserRequestSettingsUpdatedEvent) {
    const user = await this.repository.find(event.userId)

    if (user === null) {
      return new Error()
    }

    if (user instanceof Error) {
      return new Error()
    }

    const draftUser = user.updateRequestSettings({
      isRequestable: event.isRequestable,
      minimumFee: event.minimumFee,
      maximumFee: event.maximumFee,
    })

    return this.repository.persist(draftUser)
  }
}
