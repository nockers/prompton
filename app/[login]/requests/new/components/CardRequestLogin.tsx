import { Stack, Text, Button, Card, Icon } from "@chakra-ui/react"
import type { FC } from "react"
import { FcGoogle } from "react-icons/fc"

type Props = {
  onLogin(): void
}

export const CardRequestLogin: FC<Props> = (props) => {
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
        <Text fontWeight={"bold"}>
          {"リクエストを送るにはログインが必要です。"}
        </Text>
        <Button
          leftIcon={<Icon as={FcGoogle} />}
          fontSize={14}
          onClick={props.onLogin}
          minW={28}
          colorScheme={"primary"}
        >
          {"ログイン"}
        </Button>
      </Stack>
    </Card>
  )
}
