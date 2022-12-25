import type { z } from "zod"
import type { zLabelCreatedEventData } from "infrastructure/validations/label/labelCreatedEventData"
import type { zLabelNameUpdatedEventData } from "infrastructure/validations/label/labelNameUpdatedEventData"

export type LabelEventData =
  | z.infer<typeof zLabelCreatedEventData>
  | z.infer<typeof zLabelNameUpdatedEventData>
