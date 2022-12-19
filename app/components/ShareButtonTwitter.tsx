import { Button, Icon } from "@chakra-ui/react"
import type { FC } from "react"
import { SiTwitter } from "react-icons/si"

type Props = {
  onClick(): void
}

export const ShareButtonTwitter: FC<Props> = (props) => {
  return (
    <Button
      leftIcon={<Icon color={"#1DA1F2"} as={SiTwitter} />}
      onClick={props.onClick}
    >
      {"Twitterでシェアする"}
    </Button>
  )
}
