import { captureException } from "@sentry/node"
import { injectable } from "tsyringe"
import { Id, IdFactory, PostPromptCreatedEvent, SoftwareFactory } from "core"
import { EventStore, ImageAdapter } from "infrastructure"

type Props = {
  userId: string
  postFileId: string
  postFileName: string
  isPublic: boolean
  promptId: string
}

@injectable()
export class CreatePromptPostCommand {
  constructor(
    private eventStore: EventStore,
    private imageAdapter: ImageAdapter,
  ) {}

  async execute(props: Props) {
    try {
      const postId = IdFactory.create()

      const detectedSoftware = SoftwareFactory.fromFileName(props.postFileName)

      const detectedPrompt = this.parsePrompt(props.postFileName)

      const detectedSeed = this.parseSeed(props.postFileName)

      const fileId = new Id(props.postFileId)

      const imageURL = await this.imageAdapter.createURL(fileId)

      if (imageURL === null) {
        return new Error()
      }

      const event = new PostPromptCreatedEvent({
        id: IdFactory.create(),
        postId: postId,
        fileId: fileId,
        userId: new Id(props.userId),
        detectedSoftware: detectedSoftware,
        detectedPrompt: detectedPrompt,
        detectedSeed: detectedSeed,
        software: null,
        seed: null,
        isPublic: props.isPublic,
        promptId: new Id(props.promptId),
        imageURL: imageURL,
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
