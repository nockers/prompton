import { Box, Button, useToast } from "@chakra-ui/react"
import { getAuth, signOut } from "firebase/auth"
import { useRouter } from "next/router"
import type { FC } from "react"
import { MainStack } from "app/components/MainStack"

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
    <MainStack title={"設定"} description={null} fileId={null}>
      <Box px={4}>
        <Button onClick={onLogout}>{"ログアウト"}</Button>
      </Box>
    </MainStack>
  )
}

export default SettingsPage
