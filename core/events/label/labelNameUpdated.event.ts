import { z } from "zod"
import { PrototypeEvent } from "core/events/prototype.event"
import type { inferEventProps } from "core/types"
import { Id } from "core/valueObjects"

const zProps = z.object({
  labelId: z.instanceof(Id),
  name: z.string(),
  nameJA: z.string().nullable(),
})

type Props = inferEventProps<typeof zProps>

export class LabelNameUpdatedEvent extends PrototypeEvent implements Props {
  static readonly type = "LABEL_NAME_UPDATED" as const

  get type() {
    return LabelNameUpdatedEvent.type
  }

  readonly collectionId = "LABELS"

  readonly labelId!: Props["labelId"]

  readonly name!: Props["name"]

  readonly nameJA!: Props["nameJA"]

  constructor(props: Props) {
    super({ ...props, documentId: props.labelId })
    Object.assign(this, zProps.parse(props))
    Object.freeze(this)
  }
}
