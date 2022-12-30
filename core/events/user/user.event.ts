import type { UserCreatedEvent } from "core/events/user/userCreated.event"
import type { UserLoginUpdatedEvent } from "core/events/user/userLoginUpdated.event"
import type { UserProfileUpdatedEvent } from "core/events/user/userProfileUpdated.event"
import type { UserRequestSettingsUpdatedEvent } from "core/events/user/userRequestSettingsUpdated.event"

export type UserEvent =
  | UserCreatedEvent
  | UserLoginUpdatedEvent
  | UserProfileUpdatedEvent
  | UserRequestSettingsUpdatedEvent
