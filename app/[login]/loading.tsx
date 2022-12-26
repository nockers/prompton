"use client"
import { HStack, Spinner } from "@chakra-ui/react"
import type { FC } from "react"

const UserLoading: FC = () => {
  return (
    <HStack pt={40} justifyContent={"center"}>
      <Spinner size={"xl"} />
    </HStack>
  )
}

export default UserLoading
