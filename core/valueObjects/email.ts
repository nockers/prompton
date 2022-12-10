import { z } from "zod"

const zValue = z.string().email()

/**
 * メールアドレス
 */
export class Email {
  constructor(public value: z.infer<typeof zValue>) {
    zValue.parse(value)
    this.value = value.toLowerCase()
    Object.freeze(this)
  }
}
