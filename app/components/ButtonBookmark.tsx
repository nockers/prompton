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
  return (
    <Button
      {...props}
      leftIcon={<Icon as={BiBookmark} />}
      isLoading={props.isLoading}
      colorScheme={props.isActive ? "pink" : "gray"}
      onClick={props.isActive ? props.onDelete : props.onCreate}
    >
      {"ブックマーク"}
    </Button>
  )
}
