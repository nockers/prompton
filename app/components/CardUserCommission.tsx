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
        <Stack>
          <Text fontWeight={"bold"}>{"リクエストして支援"}</Text>
          <Stack
            spacing={4}
            direction={{ base: "column", sm: "row" }}
            alignItems={{ base: "flex-start", sm: "center" }}
          >
            <Stack flex={1}>
              <Text fontWeight={"bold"}>
                {`1回 ${props.minimumFee}〜${props.maximumFee}円（税込）`}
              </Text>
            </Stack>
            <Link href={`/${props.userId}/requests/new`}>
              <Button w={{ base: "100%", sm: "auto" }} colorScheme={"primary"}>
                {"リクエスト"}
              </Button>
            </Link>
          </Stack>
        </Stack>
      </CardBody>
    </Card>
  )
}
