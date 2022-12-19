import { Text, HStack, Avatar, Box, Button } from "@chakra-ui/react"
import type { FC } from "react"

type Props = {
  userId: string
  userName: string
  userAvatarImageURL: string | null
  onOpenUser(): void
}

export const UserProfile: FC<Props> = (props) => {
  return (
    <HStack spacing={4}>
      <Avatar
        size={"sm"}
        src={props.userAvatarImageURL ?? ""}
        onClick={props.onOpenUser}
      />
      <Box flex={1} onClick={props.onOpenUser}>
        <Text fontWeight={"bold"}>{props.userName}</Text>
      </Box>
      <Button size={"sm"}>{"フォロー"}</Button>
    </HStack>
  )
}
