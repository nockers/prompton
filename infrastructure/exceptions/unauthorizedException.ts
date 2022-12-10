export class UnauthorizedException extends Error {
  readonly name = "UnauthorizedException"

  readonly code = "UNAUTHORIZED"

  constructor(message = "") {
    super()
    this.message = message
  }
}
