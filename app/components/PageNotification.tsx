import { Alert, AlertIcon, HStack } from "@chakra-ui/react"
import type { FC } from "react"

type Props = {
  isJA: boolean
}

export const PageNotification: FC<Props> = (props) => {
  const text = props.isJA
    ? "このサイトは現在、開発中のものです。"
    : "The website is currently under development."

  return (
    <HStack justifyContent={"center"}>
      <Alert status={"warning"} rounded={"md"}>
        <AlertIcon />
        {text}
      </Alert>
    </HStack>
  )
}
