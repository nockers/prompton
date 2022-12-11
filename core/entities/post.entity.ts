import { z } from "zod"
import { Id } from "core/valueObjects"

const zProps = z.object({
  id: z.instanceof(Id),
  title: z.string().nullable(),
  fileId: z.instanceof(Id),
  prompt: z.string().nullable(),
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

type Props = z.infer<typeof zProps>

/**
 * 投稿
 */
export class PostEntity {
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

  readonly colors!: Props["colors"]

  readonly webColors!: Props["webColors"]

  readonly annotationAdult!: Props["annotationAdult"]

  readonly annotationMedical!: Props["annotationMedical"]

  readonly annotationRacy!: Props["annotationRacy"]

  readonly annotationSpoof!: Props["annotationSpoof"]

  readonly annotationViolence!: Props["annotationViolence"]

  readonly labelIds!: Props["labelIds"]

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
}

/**
 * RGBAをHexに変換する関数
 */
export const rgbaToHex = (rgba: string) => {
  const [r, g, b, a] = rgba
    .replace("rgba(", "")
    .replace(")", "")
    .split(",")
    .map((v) => parseInt(v))

  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
}
