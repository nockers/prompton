import { injectable } from "tsyringe"
import type { LikeEvent } from "core"

import { LikeRepository } from "infrastructure/repositories"

@injectable()
export class LikeEventStore {
  constructor(private repository: LikeRepository) {}

  execute(event: LikeEvent) {
    this.repository
    event
    return null
  }
}
