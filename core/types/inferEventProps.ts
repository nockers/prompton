import type { ZodType } from "zod"
import { z } from "zod"
import { Id } from "core/valueObjects"

const zProps = z.object({
  id: z.instanceof(Id),
  timestamp: z.number().optional(),
  // documentId: z.instanceof(Id).nullable(),
})

export type inferEventProps<T extends ZodType> = z.infer<T> &
  z.infer<typeof zProps>
