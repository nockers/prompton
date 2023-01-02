import type { ButtonProps } from "@chakra-ui/react"
import { Button, Icon } from "@chakra-ui/react"
import type { FC } from "react"
import { BiTrashAlt } from "react-icons/bi"

type Props = ButtonProps & {
  isLoading: boolean
  onClick(): void
}

export const ButtonDelete: FC<Props> = (props) => {
  const { isLoading, onClick, ...others } = props

  return (
    <Button
      {...others}
      leftIcon={<Icon as={BiTrashAlt} />}
      isLoading={isLoading}
      onClick={onClick}
    >
      {"削除"}
    </Button>
  )
}
