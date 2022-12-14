import type { ButtonProps } from "@chakra-ui/react"
import { Button, Icon } from "@chakra-ui/react"
import type { FC } from "react"
import { SiTwitter } from "react-icons/si"

type Props = ButtonProps & {
  onClick(): void
}

export const ShareButtonTwitter: FC<Props> = (props) => {
  const { onClick, ...others } = props

  return (
    <Button
      {...others}
      leftIcon={<Icon color={"#1DA1F2"} as={SiTwitter} />}
      onClick={onClick}
    >
      {"Twitterでシェアする"}
    </Button>
  )
}
