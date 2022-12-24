import { z } from "zod"

const zValue = z.union([
  /**
   * Firebase Doc ID
   */
  z.string().length(20),
  /**
   * Prisma Record
   */
  z.string().length(21),
  /**
   * Firebase Authentication
   */
  z.string().length(28),
])

type Value = z.infer<typeof zValue>

/**
 * ID
 */
export class Id {
  constructor(public value: z.infer<typeof zValue>) {
    zValue.parse(value)
    Object.freeze(this)
  }

  static nullable(value: Value | null) {
    return value === null ? null : new Id(value)
  }
}
