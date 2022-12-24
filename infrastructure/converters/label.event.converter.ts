import type { Event } from "@prisma/client"
import type { z } from "zod"
import type { LabelEvent } from "core"
import { LabelNameUpdatedEvent, LabelCreatedEvent, Id } from "core"
import type { PrismaLabelEvent } from "infrastructure/validations"
import {
  zPrismaLabelNameUpdatedEvent,
  zPrismaLabelCreatedEvent,
} from "infrastructure/validations"

export class LabelEventConverter {
  static toData(event: LabelEvent): PrismaLabelEvent {
    if (event.type === LabelCreatedEvent.type) {
      const data: z.infer<typeof zPrismaLabelCreatedEvent> = {
        labelId: event.labelId.value,
        name: event.name,
        nameJA: event.nameJA,
      }
      return zPrismaLabelCreatedEvent.parse(data)
    }

    if (event.type === LabelNameUpdatedEvent.type) {
      const data: z.infer<typeof zPrismaLabelNameUpdatedEvent> = {
        labelId: event.labelId.value,
        name: event.name,
        nameJA: event.nameJA,
      }
      return zPrismaLabelNameUpdatedEvent.parse(data)
    }

    return event
  }

  static toEntity(event: Event): LabelEvent {
    if (event.type === LabelCreatedEvent.type) {
      const data = zPrismaLabelCreatedEvent.parse(event.data)
      return new LabelCreatedEvent({
        id: new Id(event.id),
        labelId: new Id(data.labelId),
        name: data.name,
        nameJA: data.nameJA,
      })
    }

    if (event.type === LabelNameUpdatedEvent.type) {
      const data = zPrismaLabelNameUpdatedEvent.parse(event.data)
      return new LabelNameUpdatedEvent({
        id: new Id(event.id),
        labelId: new Id(data.labelId),
        name: data.name,
        nameJA: data.nameJA,
      })
    }

    throw new Error()
  }
}
