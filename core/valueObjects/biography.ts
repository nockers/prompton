import { z } from "zod"

const zValue = z.string().max(128)

/**
 * 紹介文
 */
export class Biography {
  constructor(public value: z.infer<typeof zValue>) {
    zValue.parse(value)
    Object.freeze(this)
  }
}
