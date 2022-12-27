import { HStack, useColorMode } from "@chakra-ui/react"
import type { FC } from "react"
import { ButtonDarkMode } from "app/components/ButtonDarkMode"

export const HomeHeaderUtilities: FC = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <HStack>
      <ButtonDarkMode colorMode={colorMode} onClick={toggleColorMode} />
    </HStack>
  )
}
