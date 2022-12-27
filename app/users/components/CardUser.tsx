import { Avatar, Button, Card, HStack, Stack, Text } from "@chakra-ui/react"
import type { FC } from "react"

type Props = {
  userId: string
  userAvatarURL: string | null
  userName: string
  isFollowee: boolean
  onFollow(): void
  onUnfollow(): void
}

export const CardUser: FC<Props> = (props) => {
  return (
    <Card variant={"filled"} borderRadius={"lg"} p={4}>
      <Stack spacing={4}>
        <HStack alignItems={"center"} spacing={4}>
          <Avatar src={props.userAvatarURL ?? ""} />
          <Stack flex={1}>
            <Text
              opacity={0.8}
              fontWeight={"bold"}
              lineHeight={1}
              fontSize={"xs"}
            >
              {`@${props.userId.slice(0, 8)}`}
            </Text>
            <Text fontWeight={"bold"} lineHeight={1}>
              {props.userName}
            </Text>
          </Stack>
          <Button
            colorScheme={props.isFollowee ? "pink" : "blue"}
            size={"sm"}
            borderRadius={40}
            onClick={props.isFollowee ? props.onUnfollow : props.onFollow}
          >
            {props.isFollowee ? "フォロー解除" : "フォロー"}
          </Button>
        </HStack>
        <Text>{"説明がありません。"}</Text>
      </Stack>
    </Card>
  )
}
