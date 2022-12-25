import { IconButton, Tooltip } from "@chakra-ui/react"
import type { FC } from "react"
import { BiMoon, BiSun } from "react-icons/bi"

type Props = {
  colorMode: "dark" | "light"
  onClick(): void
}

export const ButtonDarkMode: FC<Props> = (props) => {
  const modeText = props.colorMode === "dark" ? "明るく" : "暗く"

  return (
    <Tooltip label={`画面を${modeText}する`}>
      <IconButton
        aria-label={"ダークモード"}
        onClick={props.onClick}
        icon={
          props.colorMode === "light" ? (
            <BiSun size={18} />
          ) : (
            <BiMoon size={18} />
          )
        }
      />
    </Tooltip>
  )
}
