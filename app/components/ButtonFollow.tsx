import type { ButtonProps } from "@chakra-ui/react"
import { Button } from "@chakra-ui/react"
import type { FC } from "react"

type Props = ButtonProps & {
  isLoading: boolean
  isActive: boolean
  onFollow(): void
  onUnfollow(): void
}

export const ButtonFollow: FC<Props> = (props) => {
  return (
    <Button
      {...props}
      isLoading={props.isLoading}
      colorScheme={props.isActive ? "pink" : "gray"}
      onClick={props.isActive ? props.onUnfollow : props.onFollow}
    >
      {"フォロー"}
    </Button>
  )
}
