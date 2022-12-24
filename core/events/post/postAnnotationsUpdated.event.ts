import { z } from "zod"
import { PrototypeEvent } from "core/events/prototype.event"
import type { inferEventProps } from "core/types"
import { Id } from "core/valueObjects"

const zProps = z.object({
  postId: z.instanceof(Id),
  userId: z.instanceof(Id),
  colors: z.array(z.string()),
  webColors: z.array(z.string()),
  annotationAdult: z.string().nullable(),
  annotationMedical: z.string().nullable(),
  annotationRacy: z.string().nullable(),
  annotationSpoof: z.string().nullable(),
  annotationViolence: z.string().nullable(),
  labelIds: z.array(z.instanceof(Id)),
})

type Props = inferEventProps<typeof zProps>

export class PostAnnotationsUpdatedEvent
  extends PrototypeEvent
  implements Props
{
  static readonly type = "POST_ANNOTATIONS_UPDATED" as const

  get type() {
    return PostAnnotationsUpdatedEvent.type
  }

  readonly collectionId = "POSTS"

  readonly postId!: Props["postId"]

  readonly userId!: Props["userId"]

  readonly colors!: Props["colors"]

  readonly webColors!: Props["webColors"]

  readonly annotationAdult!: Props["annotationAdult"]

  readonly annotationMedical!: Props["annotationMedical"]

  readonly annotationRacy!: Props["annotationRacy"]

  readonly annotationSpoof!: Props["annotationSpoof"]

  readonly annotationViolence!: Props["annotationViolence"]

  readonly labelIds!: Props["labelIds"]

  constructor(props: Props) {
    super({ ...props, documentId: props.postId })
    Object.assign(this, zProps.parse(props))
    Object.freeze(this)
  }
}
