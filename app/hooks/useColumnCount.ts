import { useBreakpointValue } from "@chakra-ui/react"

export const useColumnCount = () => {
  const value = useBreakpointValue({ base: 1, md: 2, lg: 3 }, { ssr: true })

  return value ?? 1
}
