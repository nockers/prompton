import { Button } from "@chakra-ui/react"
import Color from "color"
import { FC } from "react"
import { findWebColor } from "infrastructure/utils/findWebColor"

type Props = {
  color: string
  onClick(): void
}

export const ButtonLinkColor: FC<Props> = (props) => {
  const webColor = findWebColor(props.color)

  return (
    <Button
      size={"xs"}
      color={Color(props.color).isDark() ? "gray.50" : "gray.900"}
      bgColor={props.color}
      onClick={props.onClick}
    >
      {webColor?.name ?? props.color}
    </Button>
  )
}
