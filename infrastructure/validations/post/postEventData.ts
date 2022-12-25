import type { z } from "zod"
import type { zPostAnnotationsUpdatedEventData } from "infrastructure/validations/post/postAnnotationsUpdatedEventData"
import type { zPostCreatedEventData } from "infrastructure/validations/post/postCreatedEventData"
import type { zPostDeletedEventData } from "infrastructure/validations/post/postDeletedEventData"
import type { zPostUpdatedEventData } from "infrastructure/validations/post/postUpdatedEventData"

export type PostEventData =
  | z.infer<typeof zPostAnnotationsUpdatedEventData>
  | z.infer<typeof zPostCreatedEventData>
  | z.infer<typeof zPostDeletedEventData>
  | z.infer<typeof zPostUpdatedEventData>
