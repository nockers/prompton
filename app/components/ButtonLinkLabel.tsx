import { Button } from "@chakra-ui/react"
import { FC } from "react"

type Props = {
  label: string
  onClick(): void
}

export const ButtonLinkLabel: FC<Props> = (props) => {
  return (
    <Button size={"xs"} onClick={props.onClick}>
      {`#${props.label}`}
    </Button>
  )
}
