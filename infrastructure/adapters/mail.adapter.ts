import type { MailDataRequired } from "@sendgrid/mail"
import sgMail from "@sendgrid/mail"
import { Env } from "infrastructure/env"
import { catchError } from "infrastructure/utils/catchError"

export class MailAdapter {
  async send(data: MailDataRequired) {
    try {
      const apiKey = Env.sendGridApiKey

      if (typeof apiKey === "undefined") {
        throw new Error("SENDGRID_API_KEY is undefined")
      }

      sgMail.setApiKey(apiKey)

      await sgMail.send(data)
    } catch (error) {
      return catchError(error)
    }
  }
}
