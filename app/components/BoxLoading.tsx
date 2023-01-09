import { Text, Spinner, Stack } from "@chakra-ui/react"
import type { FC } from "react"

type Props = {
  text?: string
}

export const BoxLoading: FC<Props> = (props) => {
  return (
    <Stack py={40} alignItems={"center"} spacing={8}>
      {props.text && <Text fontWeight={"bold"}>{props.text}</Text>}
      <Spinner size={"xl"} />
    </Stack>
  )
}
