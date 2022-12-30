import type { z } from "zod"
import type { zUserCreatedEventData } from "infrastructure/validations/user/userCreatedEventData"
import type { zUserLoginUpdatedEventData } from "infrastructure/validations/user/userLoginUpdatedEventData"
import type { zUserProfileUpdatedEventData } from "infrastructure/validations/user/userProfileUpdatedEventData"
import type { zUserRequestSettingsUpdatedEventData } from "infrastructure/validations/user/userRequestSettingsUpdatedEventData"

export type UserEventData =
  | z.infer<typeof zUserCreatedEventData>
  | z.infer<typeof zUserLoginUpdatedEventData>
  | z.infer<typeof zUserProfileUpdatedEventData>
  | z.infer<typeof zUserRequestSettingsUpdatedEventData>
