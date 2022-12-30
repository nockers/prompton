import {
  HStack,
  Stack,
  Text,
  Button,
  Card,
  CardBody,
  Box,
  Divider,
  Alert,
  AlertIcon,
} from "@chakra-ui/react"
import type { FC } from "react"

type Props = {
  isRequestable: boolean
  userId: string
}

export const CardUserCommission: FC<Props> = (props) => {
  if (!props.isRequestable) {
    return (
      <Card variant={"filled"}>
        <CardBody>
          <Stack spacing={4}>
            <Text fontWeight={"bold"}>{"リクエスト"}</Text>
            <Alert status="warning">
              <AlertIcon />
              {"現在、このユーザはリクエストを受け付けていません。"}
            </Alert>
          </Stack>
        </CardBody>
      </Card>
    )
  }

  return (
    <Card variant={"filled"}>
      <CardBody>
        <Stack spacing={4}>
          <Text fontWeight={"bold"}>{"制作依頼"}</Text>
          {!props.isRequestable && (
            <Text>{"現在、このユーザは制作を受け付けていません。"}</Text>
          )}
          <Divider />
          <HStack>
            <Stack flex={1}>
              <Text fontWeight={"bold"}>{"おまかせ"}</Text>
              <Text>{"1320円（税込）"}</Text>
            </Stack>
            <Box>
              <Button colorScheme={"primary"}>{"依頼する"}</Button>
            </Box>
          </HStack>
        </Stack>
      </CardBody>
    </Card>
  )
}
