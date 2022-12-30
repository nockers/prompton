import type { ButtonProps } from "@chakra-ui/react"
import { Button, Icon } from "@chakra-ui/react"
import type { FC } from "react"
import { BiBookmark } from "react-icons/bi"

type Props = ButtonProps & {
  isLoading: boolean
  isActive: boolean
  onCreate(): void
  onDelete(): void
}

export const ButtonBookmark: FC<Props> = (props) => {
  const { isLoading, isActive, onCreate, onDelete, ...others } = props

  return (
    <Button
      {...others}
      leftIcon={<Icon as={BiBookmark} />}
      isLoading={isLoading}
      colorScheme={isActive ? "primary" : "gray"}
      onClick={isActive ? onDelete : onCreate}
    >
      {"ブックマーク"}
    </Button>
  )
}
