import { injectable } from "tsyringe"
import type { LabelEvent } from "core"

import { LabelRepository } from "infrastructure/repositories"

@injectable()
export class LabelEventStore {
  constructor(private repository: LabelRepository) {}

  execute(event: LabelEvent) {
    this.repository
    event
    return null
  }
}
