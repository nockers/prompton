"use client"
import { Box, Button, HStack, Stack, Text } from "@chakra-ui/react"
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { FC } from "react"

type Props = {
  reset(): void
}

export const HomeLogin: FC<Props> = (props) => {
  const onLogin = async () => {
    try {
      const provider = new GoogleAuthProvider()
      await signInWithPopup(getAuth(), provider)
      props.reset()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <HStack px={4} pt={16} justifyContent={"center"}>
      <Box maxW={"sm"} bg={"gray.700"} rounded={"md"} p={4}>
        <Stack gap={2}>
          <Text>{"ログイン"}</Text>
          <Box>
            <Button onClick={onLogin}>{"Login with Google"}</Button>
          </Box>
        </Stack>
      </Box>
    </HStack>
  )
}
