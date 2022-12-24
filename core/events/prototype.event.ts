import { z } from "zod"
import { Id } from "core/valueObjects"

const zProps = z.object({
  id: z.instanceof(Id),
  timestamp: z.number().optional(),
  documentId: z.instanceof(Id).nullable(),
})

type Props = z.infer<typeof zProps>

export abstract class PrototypeEvent implements Props {
  readonly id!: Props["id"]

  readonly timestamp!: number

  abstract readonly type: string

  abstract readonly collectionId: string | null

  readonly documentId!: Props["documentId"]

  constructor(props: Props) {
    Object.assign(this, zProps.parse(props))
    if (typeof props.timestamp === "undefined") {
      this.timestamp = Math.floor(Date.now() / 1000)
    }
  }
}
