import {
  Avatar,
  Box,
  Button,
  Card,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react"
import type { FC } from "react"

type Props = {
  userId: string
  userAvatarURL: string | null
  userName: string
  isFollowee: boolean
  onFollow(): void
  onUnfollow(): void
  onRoute(): void
}

export const CardUser: FC<Props> = (props) => {
  return (
    <Card variant={"filled"} borderRadius={"lg"} p={4}>
      <Stack spacing={4}>
        <HStack alignItems={"center"} spacing={4}>
          <Avatar
            src={props.userAvatarURL ?? ""}
            cursor={"pointer"}
            onClick={props.onRoute}
          />
          <Stack flex={1}>
            <Text
              opacity={0.8}
              fontWeight={"bold"}
              lineHeight={1}
              fontSize={"xs"}
            >
              {`@${props.userId.slice(0, 8)}`}
            </Text>
            <Box cursor={"pointer"} onClick={props.onRoute}>
              <Text fontWeight={"bold"} lineHeight={1}>
                {props.userName}
              </Text>
            </Box>
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
