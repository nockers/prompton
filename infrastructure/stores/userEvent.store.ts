import { injectable } from "tsyringe"
import { UserCreatedEvent, Biography, UserEntity } from "core"
import { UserRepository } from "infrastructure/repositories"

@injectable()
export class UserEventStore {
  constructor(private userRepository: UserRepository) {}

  execute(event: UserCreatedEvent) {
    if (event.type === UserCreatedEvent.type) {
      return this.created(event)
    }

    return null
  }

  async created(event: UserCreatedEvent) {
    const user = new UserEntity({
      id: event.userId,
      email: event.email,
      biography: new Biography(""),
      headerImageId: null,
      avatarImageId: null,
      avatarImageURL: event.avatarImageURL,
      name: event.name,
      login: null,
    })

    await this.userRepository.persist(user)

    return null
  }
}
