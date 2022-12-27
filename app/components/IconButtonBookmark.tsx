import type { IconButtonProps } from "@chakra-ui/react"
import { IconButton, Icon } from "@chakra-ui/react"
import type { FC } from "react"
import { BiBookmark } from "react-icons/bi"

type Props = IconButtonProps & {
  isLoading: boolean
  isActive: boolean
  onCreate(): void
  onDelete(): void
}

export const IconButtonBookmark: FC<Props> = (props) => {
  const { isLoading, isActive, onCreate, onDelete, ...others } = props

  return (
    <IconButton
      {...others}
      isLoading={isLoading}
      colorScheme={isActive ? "pink" : "gray"}
      onClick={isActive ? onDelete : onCreate}
    >
      <Icon as={BiBookmark} />
    </IconButton>
  )
}
