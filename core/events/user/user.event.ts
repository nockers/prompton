import type { UserCreatedEvent } from "core/events/user/userCreated.event"
import type { UserLoginUpdatedEvent } from "core/events/user/userLoginUpdated.event"
import type { UserProfileUpdatedEvent } from "core/events/user/userProfileUpdated.event"

export type UserEvent =
  | UserCreatedEvent
  | UserLoginUpdatedEvent
  | UserProfileUpdatedEvent
