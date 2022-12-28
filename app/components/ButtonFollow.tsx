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
  const { isLoading, isActive, onFollow, onUnfollow, ...others } = props

  return (
    <Button
      {...others}
      isLoading={isLoading}
      colorScheme={isActive ? "blue" : "gray"}
      onClick={isActive ? onUnfollow : onFollow}
    >
      {"フォロー"}
    </Button>
  )
}
