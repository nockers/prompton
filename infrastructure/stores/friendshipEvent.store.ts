import { injectable } from "tsyringe"
import type { FriendshipEvent } from "core"

import { FriendshipRepository } from "infrastructure/repositories"

@injectable()
export class FriendshipEventStore {
  constructor(private repository: FriendshipRepository) {}

  execute(event: FriendshipEvent) {
    this.repository
    event
    return null
  }
}
