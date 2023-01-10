import { Stack, Text, Card } from "@chakra-ui/react"
import type { FC } from "react"

export const CardRequestDisabled: FC = () => {
  return (
    <Card
      variant={"filled"}
      borderColor={"red.200"}
      borderWidth={4}
      borderRadius={"xl"}
    >
      <Stack
        justifyContent={"space-between"}
        direction={{ base: "column", md: "row" }}
        alignItems={{ base: "", md: "center" }}
        p={6}
        spacing={4}
      >
        <Text fontWeight={"bold"}>{"この機能は現在開発中です。"}</Text>
      </Stack>
    </Card>
  )
}
