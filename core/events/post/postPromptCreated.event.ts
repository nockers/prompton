import { z } from "zod"
import { PrototypeEvent } from "core/events/prototype.event"
import type { inferEventProps } from "core/types"
import { Id, Software, Url } from "core/valueObjects"

const zProps = z.object({
  postId: z.instanceof(Id),
  userId: z.instanceof(Id),
  fileId: z.instanceof(Id),
  detectedPrompt: z.string().nullable(),
  software: z.instanceof(Software).nullable(),
  detectedSoftware: z.instanceof(Software).nullable(),
  seed: z.string().nullable(),
  detectedSeed: z.string().nullable(),
  isPublic: z.boolean(),
  promptId: z.instanceof(Id),
  imageURL: z.instanceof(Url),
})

type Props = inferEventProps<typeof zProps>

export class PostPromptCreatedEvent extends PrototypeEvent implements Props {
  static readonly type = "POST_PROMPT_CREATED" as const

  get type() {
    return PostPromptCreatedEvent.type
  }

  readonly collectionId = "POSTS" as const

  readonly postId!: Props["postId"]

  readonly userId!: Props["userId"]

  readonly fileId!: Props["fileId"]

  readonly detectedPrompt!: Props["detectedPrompt"]

  readonly seed!: Props["seed"]

  readonly detectedSeed!: Props["detectedSeed"]

  readonly software!: Props["software"]

  readonly detectedSoftware!: Props["detectedSoftware"]

  readonly isPublic!: Props["isPublic"]

  readonly promptId!: Props["promptId"]

  readonly imageURL!: Props["imageURL"]

  constructor(props: Props) {
    super({ ...props, documentId: props.postId })
    Object.assign(this, zProps.parse(props))
    Object.freeze(this)
  }
}
