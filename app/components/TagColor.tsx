import { Tag } from "@chakra-ui/react"
import Color from "color"
import { FC } from "react"
import { findWebColor } from "infrastructure/utils/findWebColor"

type Props = {
  color: string
}

export const TagColor: FC<Props> = (props) => {
  const webColor = findWebColor(props.color)

  return (
    <Tag
      color={Color(props.color).isDark() ? "gray.50" : "gray.900"}
      bgColor={props.color}
    >
      {webColor?.name ?? props.color}
    </Tag>
  )
}
