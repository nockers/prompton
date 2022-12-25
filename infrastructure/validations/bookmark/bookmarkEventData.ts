import type { z } from "zod"
import type { zBookmarkCreatedEventData } from "infrastructure/validations/bookmark/bookmarkCreatedEventData"
import type { zBookmarkDeletedEventData } from "infrastructure/validations/bookmark/bookmarkDeletedEventData"

export type BookmarkEventData =
  | z.infer<typeof zBookmarkCreatedEventData>
  | z.infer<typeof zBookmarkDeletedEventData>
