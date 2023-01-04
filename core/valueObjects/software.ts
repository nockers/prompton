import { z } from "zod"

const zValue = z.union([
  z.literal("STABLE_DIFFUSION"),
  z.literal("NOVEL_AI"),
  z.literal("HOLARA"),
  z.literal("MIDJOURNEY"),
  z.literal("NIJIJOURNEY"),
  z.literal("DALL_E_2"),
])

/**
 * ソフトウェア
 */
export class Software {
  constructor(public value: z.infer<typeof zValue>) {
    zValue.parse(value)
    Object.freeze(this)
  }

  get isHolara() {
    return this.value === "HOLARA"
  }
}
