import { Text, Spinner, Stack, useColorModeValue } from "@chakra-ui/react"
import type { FC } from "react"

type Props = {
  text?: string
}

export const MainLoading: FC<Props> = (props) => {
  const backgroundColor = useColorModeValue("white", "gray.800")

  return (
    <Stack
      as={"main"}
      h={"100vh"}
      alignItems={"center"}
      justifyContent={"center"}
      position={"fixed"}
      top={0}
      left={0}
      w={"100%"}
      zIndex={1}
      background={backgroundColor}
    >
      <Stack alignItems={"center"} spacing={8}>
        {props.text && <Text fontWeight={"bold"}>{props.text}</Text>}
        <Spinner size={"xl"} />
      </Stack>
    </Stack>
  )
}
