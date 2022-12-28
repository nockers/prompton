import { Avatar, Box, Button, HStack, Stack, Text } from "@chakra-ui/react"
import type { FC } from "react"

type Props = {
  userId: string
  userAvatarURL: string | null
  userName: string
  onUnfollow(): void
}

export const CardFollowee: FC<Props> = (props) => {
  return (
    <Box bg={"gray.100"} borderRadius={"lg"} p={4}>
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
            colorScheme={"blue"}
            size={"sm"}
            borderRadius={40}
            onClick={props.onUnfollow}
          >
            {"フォロー解除"}
          </Button>
        </HStack>
        <Text>{"説明がありません。"}</Text>
      </Stack>
    </Box>
  )
}
