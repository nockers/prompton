import type { RequestCreatedEvent } from "core/events/request/requestCreated.event"
import type { RequestMarkedAsAcceptedEvent } from "core/events/request/requestMarkedAsAccepted.event"
import type { RequestMarkedAsCanceledEvent } from "core/events/request/requestMarkedAsCanceled.event"
import type { RequestMarkedAsCanceledByRecipientEvent } from "core/events/request/requestMarkedAsCanceledByRecipient.event"
import type { RequestMarkedAsCanceledBySenderEvent } from "core/events/request/requestMarkedAsCanceledBySender.event"
import type { RequestMarkedAsCompletedEvent } from "core/events/request/requestMarkedAsCompleted.event"
import type { RequestMarkedAsRejectedEvent } from "core/events/request/requestMarkedAsRejected.event"

export type RequestEvent =
  | RequestCreatedEvent
  | RequestMarkedAsAcceptedEvent
  | RequestMarkedAsCanceledByRecipientEvent
  | RequestMarkedAsCanceledBySenderEvent
  | RequestMarkedAsCanceledEvent
  | RequestMarkedAsCompletedEvent
  | RequestMarkedAsRejectedEvent
