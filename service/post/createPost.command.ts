import { captureException } from "@sentry/node"
import { injectable } from "tsyringe"
import { Id, IdFactory, PostCreatedEvent, SoftwareFactory } from "core"
import { EventStore } from "infrastructure"

type Props = {
  userId: string
  postFileId: string
  postFileName: string
  isPublic: boolean
  requestId: string | null
}

@injectable()
export class CreatePostCommand {
  constructor(private eventStore: EventStore) {}

  async execute(props: Props) {
    try {
      const postId = IdFactory.create()

      const detectedSoftware = SoftwareFactory.fromFileName(props.postFileName)

      const detectedPrompt = this.parsePrompt(props.postFileName)

      const detectedSeed = this.parseSeed(props.postFileName)

      const event = new PostCreatedEvent({
        id: IdFactory.create(),
        postId: postId,
        fileId: new Id(props.postFileId),
        userId: new Id(props.userId),
        detectedSoftware: detectedSoftware,
        detectedPrompt: detectedPrompt,
        detectedSeed: detectedSeed,
        software: null,
        prompt: null,
        seed: null,
        isPublic: props.isPublic,
        requestId: props.requestId === null ? null : new Id(props.requestId),
      })

      await this.eventStore.commit(event)

      return event
    } catch (error) {
      captureException(error)
      return new Error()
    }
  }

  parsePrompt(fileName: string) {
    const software = SoftwareFactory.fromFileName(fileName)

    if (software === null) {
      return null
    }

    if (software.isHolara) {
      const text = fileName
        .replace("_0.png", "")
        .replace("_1.png", "")
        .replace("_2.png", "")
        .replace("_3.png", "")
      const [, ...prompts] = text.split("_")
      return prompts.join("_")
    }

    return null
  }

  parseSeed(fileName: string) {
    const software = SoftwareFactory.fromFileName(fileName)

    if (software === null) {
      return null
    }

    if (software.isHolara) {
      const text = fileName
        .replace("_0.png", "")
        .replace("_1.png", "")
        .replace("_2.png", "")
        .replace("_3.png", "")
      const [seed] = text.split("_")
      return seed
    }

    return null
  }
}
