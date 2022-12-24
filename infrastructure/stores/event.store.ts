import { injectable } from "tsyringe"
import { UserCreatedEvent } from "core"
import type { DomainEvent } from "core/events/domainEvent"
import { EventRepository } from "infrastructure/repositories"
import { UserEventStore } from "infrastructure/stores/userEvent.store"

@injectable()
export class EventStore {
  constructor(
    private repository: EventRepository,
    private userEventStore: UserEventStore,
  ) {}

  async execute(event: DomainEvent) {
    await this.repository.persist(event)

    if (event instanceof UserCreatedEvent) {
      await this.userEventStore.created(event)
    }

    return null
  }
}
