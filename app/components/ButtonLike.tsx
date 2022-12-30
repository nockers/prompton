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
  const { isLoading, isActive, onCreate, onDelete, count, ...others } = props

  return (
    <Button
      {...others}
      leftIcon={<Icon as={BiStar} />}
      isLoading={isLoading}
      colorScheme={isActive ? "primary" : "gray"}
      onClick={isActive ? onDelete : onCreate}
    >
      {0 < count ? `スキ +${count}` : "スキ"}
    </Button>
  )
}
