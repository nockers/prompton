import { useBreakpointValue } from "@chakra-ui/react"

export const useHomeColumnCount = () => {
  const value = useBreakpointValue(
    { base: 2, sm: 2, md: 3, lg: 4, xl: 5 },
    { ssr: true },
  )

  return value ?? 1
}
