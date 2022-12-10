import { z } from "zod"

const zValue = z
  .string()
  .max(20)
  .regex(/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i)

/**
 * ユーザーネーム
 */
export class Username {
  constructor(public value: z.infer<typeof zValue>) {
    zValue.parse(value)
    Object.freeze(this)
  }
}
