import {
  Stack,
  Text,
  Button,
  Card,
  CardBody,
  Alert,
  AlertIcon,
} from "@chakra-ui/react"
import Link from "next/link"
import type { FC } from "react"

type Props = {
  isRequestable: boolean
  userId: string
  minimumFee: number
  maximumFee: number
}

export const CardUserCommission: FC<Props> = (props) => {
  if (!props.isRequestable) {
    return (
      <Card variant={"filled"} borderWidth={4} borderRadius={"xl"}>
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
    <Card
      variant={"filled"}
      borderWidth={4}
      borderColor={"primary.200"}
      borderRadius={"xl"}
    >
      <CardBody>
        <Stack spacing={2}>
          <Text fontWeight={"bold"} color={"primary.500"}>
            {"リクエスト受付中"}
          </Text>
          <Stack
            spacing={4}
            direction={{ base: "column", md: "row" }}
            alignItems={{ base: "flex-start", md: "center" }}
          >
            <Stack flex={1}>
              <Text fontWeight={"bold"} fontSize={"lg"}>
                {`料金 ${props.minimumFee}円（税込）`}
              </Text>
              <Text fontSize={"xs"} opacity={"sm"}>
                {`※最大 ${props.maximumFee}円（税込）まで変更できます。`}
              </Text>
            </Stack>
            <Link href={`/${props.userId}/requests/new`}>
              <Button w={{ base: "100%", sm: "auto" }} colorScheme={"primary"}>
                {"リクエストする"}
              </Button>
            </Link>
          </Stack>
        </Stack>
      </CardBody>
    </Card>
  )
}
