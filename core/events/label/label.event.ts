import type { LabelCreatedEvent } from "core/events/label/labelCreated.event"
import type { LabelNameUpdatedEvent } from "core/events/label/labelNameUpdated.event"

export type LabelEvent = LabelCreatedEvent | LabelNameUpdatedEvent
