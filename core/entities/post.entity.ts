import { z } from "zod"
import { Id, Software, Url } from "core/valueObjects"

const zProps = z.object({
  id: z.instanceof(Id),
  title: z.string().nullable(),
  fileId: z.instanceof(Id),
  prompt: z.string().nullable(),
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
  resizableImageURL: z.instanceof(Url).nullable(),
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
   * ファイルID
   */
  readonly fileId!: Props["fileId"]

  /**
   * ユーザーID
   */
  readonly userId!: Props["userId"]

  readonly prompt!: Props["prompt"]

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

  readonly resizableImageURL!: Props["resizableImageURL"]

  constructor(public props: Props) {
    zProps.parse(props)
    Object.assign(this, props)
    Object.freeze(this)
  }

  updatePrompt(prompt: string | null) {
    return new PostEntity({
      ...this.props,
      prompt,
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
    return new PostEntity({
      ...this.props,
      resizableImageURL,
    })
  }
}
