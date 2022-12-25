import type { ButtonProps } from "@chakra-ui/react"
import { Button, Icon } from "@chakra-ui/react"
import type { FC } from "react"
import { BiStar } from "react-icons/bi"

type Props = ButtonProps & {
  count: number
  isLoading: boolean
  isActive: boolean
  onCreate(): void
  onDelete(): void
}

export const ButtonLike: FC<Props> = (props) => {
  return (
    <Button
      {...props}
      leftIcon={<Icon as={BiStar} />}
      isLoading={props.isLoading}
      colorScheme={props.isActive ? "blue" : "gray"}
      onClick={props.isActive ? props.onDelete : props.onCreate}
    >
      {0 < props.count ? `スキ +${props.count}` : "スキ"}
    </Button>
  )
}
