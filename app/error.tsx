"use client"
import { FC } from "react"
import { HomeLogin } from "app/components/HomeLogin"
import { UnauthorizedException } from "infrastructure/exceptions"

type Props = {
  error: Error
  resetError(): void
}

const RootError: FC<Props> = (props) => {
  if (props.error instanceof UnauthorizedException) {
    return <HomeLogin reset={props.resetError} />
  }

  return null
}

export default RootError
