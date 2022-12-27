import { Alert, AlertDescription, AlertTitle } from "@chakra-ui/react"
import type { FC } from "react"

export const AlertIntroductionFollow: FC = () => {
  const text =
    "気になるユーザをフォローすれば、そのユーザの作品がタイムラインに表示され見つけやすくなります。また、フォローしたことは相手には通知されず、気づかれることはありません。"

  return (
    <Alert
      status={"info"}
      borderRadius={"md"}
      flexDirection={"column"}
      alignItems={"flex-start"}
      py={4}
    >
      <AlertTitle pl={0}>{"だれもフォローしていません"}</AlertTitle>
      <AlertDescription pt={2}>{text}</AlertDescription>
    </Alert>
  )
}
