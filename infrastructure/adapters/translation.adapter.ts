import { v2 } from "@google-cloud/translate"
import { captureException } from "@sentry/node"
import { Env } from "infrastructure/env"

export class TranslationAdapter {
  async translate(text: string) {
    try {
      const client = new v2.Translate({
        credentials: {
          client_email: Env.googleClientEmail,
          private_key: Env.googlePrivateKey,
        },
      })

      const [translate] = await client.translate(text, "ja")

      return translate
    } catch (error) {
      captureException(error)
      return new Error()
    }
  }
}
