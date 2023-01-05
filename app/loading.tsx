import { HStack, Spinner } from "@chakra-ui/react"
import type { FC } from "react"

const RootLoading: FC = () => {
  return (
    <HStack py={40} justifyContent={"center"}>
      <Spinner size={"xl"} />
    </HStack>
  )
}

export default RootLoading
