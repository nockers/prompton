import { Alert, AlertDescription, AlertTitle } from "@chakra-ui/react"
import type { FC } from "react"

export const AlertIntroductionBookmark: FC = () => {
  const text =
    "気になった作品をブックマークしておくことができます。作品がブックマークされたことは投稿者には通知されません。"

  return (
    <Alert
      status={"info"}
      borderRadius={"md"}
      flexDirection={"column"}
      alignItems={"flex-start"}
      py={4}
    >
      <AlertTitle pl={0}>{"まだブックマークした作品はありません"}</AlertTitle>
      <AlertDescription pt={2}>{text}</AlertDescription>
    </Alert>
  )
}
