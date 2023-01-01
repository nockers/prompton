import { captureException } from "@sentry/node"
import { injectable } from "tsyringe"
import type { LabelCreatedEvent } from "core"
import { IdFactory, LabelNameUpdatedEvent } from "core"
import { EventStore, LabelRepository, TranslationAdapter } from "infrastructure"

@injectable()
export class LabelCreatedEventHandler {
  constructor(
    private eventStore: EventStore,
    private labelRepository: LabelRepository,
    private translationAdapter: TranslationAdapter,
  ) {}

  async execute(event: LabelCreatedEvent) {
    try {
      const label = await this.labelRepository.findByName(event.name)

      if (label instanceof Error) {
        return new Error()
      }

      if (label === null) {
        captureException("data not found.")
        return new Error()
      }

      if (event.nameJA !== null) {
        return null
      }

      const nameJA = await this.translationAdapter.translate(event.name)

      if (nameJA instanceof Error) {
        return new Error()
      }

      const nextEvent = new LabelNameUpdatedEvent({
        id: IdFactory.create(),
        labelId: label.id,
        name: event.name,
        nameJA: nameJA,
      })

      await this.eventStore.commit(nextEvent)

      return nextEvent
    } catch (error) {
      captureException(error)
      return new Error()
    }
  }
}
