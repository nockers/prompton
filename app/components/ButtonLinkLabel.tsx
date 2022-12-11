import { Button, Text } from "@chakra-ui/react"
import { FC } from "react"

type Props = {
  label: string
  count: number
  onClick(): void
}

export const ButtonLinkLabel: FC<Props> = (props) => {
  return (
    <Button
      size={"xs"}
      onClick={props.onClick}
      rightIcon={<Text color={"blue.500"}>{props.count}</Text>}
    >
      {`#${props.label}`}
    </Button>
  )
}
