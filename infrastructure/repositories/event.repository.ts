import { injectable } from "tsyringe"
import type { Id } from "core"
import type { DomainEvent } from "core/events/domainEvent"
import db from "db"
import { EventConverter } from "infrastructure/converters"
import { catchError } from "infrastructure/utils/catchError"

/**
 * イベント
 */
@injectable()
export class EventRepository {
  async persist(event: DomainEvent) {
    try {
      await db.event.create({
        data: {
          id: event.id.value,
          timestamp: new Date(event.timestamp * 1000),
          collectionId: event.collectionId,
          documentId: event.documentId?.value ?? null,
          type: event.type,
          data: EventConverter.toData(event),
        },
      })

      return null
    } catch (error) {
      return catchError(error)
    }
  }

  async find(id: Id) {
    try {
      const event = await db.event.findUnique({
        where: { id: id.value },
      })

      if (event === null) {
        return null
      }

      return EventConverter.toEntity(event)
    } catch (error) {
      console.log(error)
      return catchError(error)
    }
  }
}
