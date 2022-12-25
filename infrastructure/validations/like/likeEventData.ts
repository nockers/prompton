import type { z } from "zod"
import type { zLikeCreatedEventData } from "infrastructure/validations/like/likeCreatedEventData"
import type { zLikeDeletedEventData } from "infrastructure/validations/like/likeDeletedEventData"

export type LikeEventData =
  | z.infer<typeof zLikeCreatedEventData>
  | z.infer<typeof zLikeDeletedEventData>
