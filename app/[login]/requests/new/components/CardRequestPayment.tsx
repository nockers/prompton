import { Stack, Text, Button, Card, HStack } from "@chakra-ui/react"
import type { FC } from "react"

type Props = {
  isLoading: boolean
  onCreatePaymentMethod(): void
}

export const CardRequestPayment: FC<Props> = (props) => {
  return (
    <Card
      variant={"filled"}
      borderColor={"red.200"}
      borderWidth={4}
      borderRadius={"xl"}
    >
      <Stack p={6} spacing={4}>
        <Text fontWeight={"bold"}>
          {
            "リクエストを送るにはお支払い方法の登録が必要です。クリックするとお支払い方法の登録画面に遷移します。"
          }
        </Text>
        <HStack justifyContent={"flex-end"}>
          <Button
            isLoading={props.isLoading}
            colorScheme={"red"}
            onClick={props.onCreatePaymentMethod}
          >
            {"お支払い方法を登録する"}
          </Button>
        </HStack>
      </Stack>
    </Card>
  )
}
