import { Alert, AlertDescription, AlertTitle } from "@chakra-ui/react"
import type { FC } from "react"

export const AlertIntroductionLike: FC = () => {
  const text =
    "気になった作品にリアクションすることができます。作品へのリアクションは投稿者に通知されます。"

  return (
    <Alert
      status={"info"}
      borderRadius={"md"}
      flexDirection={"column"}
      alignItems={"flex-start"}
      py={4}
    >
      <AlertTitle pl={0}>{"まだリアクションした作品はありません"}</AlertTitle>
      <AlertDescription pt={2}>{text}</AlertDescription>
    </Alert>
  )
}
