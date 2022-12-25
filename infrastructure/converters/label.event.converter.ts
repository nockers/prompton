import type { Event } from "@prisma/client"
import type { z } from "zod"
import type { LabelEvent } from "core"
import { LabelNameUpdatedEvent, LabelCreatedEvent, Id } from "core"
import type { LabelEventData } from "infrastructure/validations"
import {
  zLabelNameUpdatedEventData,
  zLabelCreatedEventData,
} from "infrastructure/validations"

export class LabelEventConverter {
  static toData(event: LabelEvent): LabelEventData {
    if (event.type === LabelCreatedEvent.type) {
      const data: z.infer<typeof zLabelCreatedEventData> = {
        labelId: event.labelId.value,
        name: event.name,
        nameJA: event.nameJA,
      }
      return zLabelCreatedEventData.parse(data)
    }

    if (event.type === LabelNameUpdatedEvent.type) {
      const data: z.infer<typeof zLabelNameUpdatedEventData> = {
        labelId: event.labelId.value,
        name: event.name,
        nameJA: event.nameJA,
      }
      return zLabelNameUpdatedEventData.parse(data)
    }

    return event
  }

  static toEntity(event: Event): LabelEvent {
    if (event.type === LabelCreatedEvent.type) {
      const data = zLabelCreatedEventData.parse(event.data)
      return new LabelCreatedEvent({
        id: new Id(event.id),
        labelId: new Id(data.labelId),
        name: data.name,
        nameJA: data.nameJA,
      })
    }

    if (event.type === LabelNameUpdatedEvent.type) {
      const data = zLabelNameUpdatedEventData.parse(event.data)
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
