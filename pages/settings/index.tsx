import { Box, Button, Stack, useToast } from "@chakra-ui/react"
import { getAuth, signOut } from "firebase/auth"
import { useRouter } from "next/router"
import { FC } from "react"

const SettingsPage: FC = () => {
  const router = useRouter()

  const toast = useToast()

  const onLogout = async () => {
    try {
      await signOut(getAuth())
      router.push("/")
      toast({ title: "ログアウトしました" })
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "ERROR",
          description: error.message,
          status: "error",
        })
      }
    }
  }

  return (
    <Stack px={4}>
      <Box>
        <Button onClick={onLogout}>{"ログアウト"}</Button>
      </Box>
    </Stack>
  )
}

export default SettingsPage
