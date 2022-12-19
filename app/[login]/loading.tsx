"use client"
import { Box, Spinner } from "@chakra-ui/react"
import type { FC } from "react"

const UserLoading: FC = () => {
  return (
    <Box>
      <Spinner />
    </Box>
  )
}

export default UserLoading
