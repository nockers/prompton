import { z } from "zod"
import { Id, Software, Url } from "core/valueObjects"

const zProps = z.object({
  id: z.instanceof(Id),
  title: z.string().nullable(),
  description: z.string().nullable(),
  fileId: z.instanceof(Id),
  promptId: z.instanceof(Id).nullable(),
  inputtedPrompt: z.string().nullable(),
  detectedPrompt: z.string().nullable(),
  seed: z.string().nullable(),
  detectedSeed: z.string().nullable(),
  software: z.instanceof(Software).nullable(),
  detectedSoftware: z.instanceof(Software).nullable(),
  userId: z.instanceof(Id),
  colors: z.array(z.string()),
  webColors: z.array(z.string()),
  annotationAdult: z.string().nullable(),
  annotationMedical: z.string().nullable(),
  annotationRacy: z.string().nullable(),
  annotationSpoof: z.string().nullable(),
  annotationViolence: z.string().nullable(),
  labelIds: z.array(z.instanceof(Id)),
  imageURL: z.instanceof(Url).nullable(),
  requestId: z.instanceof(Id).nullable(),
  isPublic: z.boolean(),
  isPublicPrompt: z.boolean(),
})

type Props = z.infer<typeof zProps>

/**
 * 投稿
 */
export class PostEntity implements Props {
  /**
   * ID
   */
  readonly id!: Props["id"]

  /**
   * タイトル
   */
  readonly title!: Props["title"]

  /**
   * 説明
   */
  readonly description!: Props["description"]

  /**
   * ファイルID
   */
  readonly fileId!: Props["fileId"]

  /**
   * ユーザーID
   */
  readonly userId!: Props["userId"]

  /**
   * プロンプトID
   */
  readonly promptId!: Props["promptId"]

  readonly inputtedPrompt!: Props["inputtedPrompt"]

  readonly detectedPrompt!: Props["detectedPrompt"]

  readonly seed!: Props["seed"]

  readonly detectedSeed!: Props["detectedSeed"]

  readonly software!: Props["software"]

  readonly detectedSoftware!: Props["detectedSoftware"]

  readonly colors!: Props["colors"]

  readonly webColors!: Props["webColors"]

  readonly annotationAdult!: Props["annotationAdult"]

  readonly annotationMedical!: Props["annotationMedical"]

  readonly annotationRacy!: Props["annotationRacy"]

  readonly annotationSpoof!: Props["annotationSpoof"]

  readonly annotationViolence!: Props["annotationViolence"]

  readonly labelIds!: Props["labelIds"]

  /**
   * リサイズ可能な画像のURL
   */
  readonly imageURL!: Props["imageURL"]

  /**
   * リクエストのID
   */
  readonly requestId!: Props["requestId"]

  /**
   * 公開済みかどうか
   */
  readonly isPublic!: Props["isPublic"]

  /**
   * プロンプトが公開されているかどうか
   */
  readonly isPublicPrompt!: Props["isPublicPrompt"]

  get isDeliverable() {
    return this.requestId !== null
  }

  constructor(public props: Props) {
    zProps.parse(props)
    Object.assign(this, props)
    Object.freeze(this)
  }

  updatePrompt(prompt: string | null) {
    return new PostEntity({
      ...this.props,
      inputtedPrompt: prompt,
    })
  }

  updateColors(colors: string[]) {
    return new PostEntity({
      ...this.props,
      colors,
    })
  }

  updateWebColors(webColors: string[]) {
    return new PostEntity({
      ...this.props,
      webColors,
    })
  }

  updateAnnotationAdult(annotationAdult: string | null) {
    return new PostEntity({
      ...this.props,
      annotationAdult,
    })
  }

  updateAnnotationMedical(annotationMedical: string | null) {
    return new PostEntity({
      ...this.props,
      annotationMedical,
    })
  }

  updateAnnotationRacy(annotationRacy: string | null) {
    return new PostEntity({
      ...this.props,
      annotationRacy,
    })
  }

  updateAnnotationSpoof(annotationSpoof: string | null) {
    return new PostEntity({
      ...this.props,
      annotationSpoof,
    })
  }

  updateAnnotationViolence(annotationViolence: string | null) {
    return new PostEntity({
      ...this.props,
      annotationViolence,
    })
  }

  updateLabelIds(labelIds: Id[]) {
    return new PostEntity({
      ...this.props,
      labelIds,
    })
  }

  updateResizableImageURL(resizableImageURL: Url | null) {
    if (resizableImageURL === null) {
      return new PostEntity({ ...this.props })
    }

    return new PostEntity({
      ...this.props,
      imageURL: resizableImageURL,
    })
  }

  updateRequestId(requestId: Id | null) {
    return new PostEntity({
      ...this.props,
      requestId,
    })
  }

  makePublic() {
    return new PostEntity({
      ...this.props,
      isPublic: true,
    })
  }

  makePrivate() {
    return new PostEntity({
      ...this.props,
      isPublic: false,
    })
  }
}
