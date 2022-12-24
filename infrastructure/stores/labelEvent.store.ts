import { injectable } from "tsyringe"
import type { LabelEvent } from "core"
import { LabelNameUpdatedEvent, LabelCreatedEvent, LabelEntity } from "core"

import { LabelRepository } from "infrastructure/repositories"

@injectable()
export class LabelEventStore {
  constructor(private repository: LabelRepository) {}

  execute(event: LabelEvent) {
    if (event.type === LabelCreatedEvent.type) {
      return this.created(event)
    }

    if (event.type === LabelNameUpdatedEvent.type) {
      return this.labelNameUpdated(event)
    }

    return null
  }

  async created(event: LabelCreatedEvent) {
    const draftLabel = new LabelEntity({
      id: event.labelId,
      name: event.name,
      nameJA: null,
    })

    return this.repository.persist(draftLabel)
  }

  async labelNameUpdated(event: LabelNameUpdatedEvent) {
    const draftLabel = new LabelEntity({
      id: event.labelId,
      name: event.name,
      nameJA: event.nameJA,
    })

    return this.repository.persist(draftLabel)
  }
}
