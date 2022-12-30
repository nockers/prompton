import { Box, Avatar, Text, HStack } from "@chakra-ui/react"
import type { FC } from "react"

type Props = {
  userName: string
  userAvatarImageURL: string | null
}

export const BoxPostUserProfile: FC<Props> = (props) => {
  return (
    <Box
      position={"absolute"}
      bottom={2}
      pl={2}
      pr={2}
      w={"100%"}
      overflow={"hidden"}
    >
      <Box
        w={"auto"}
        backdropFilter={"blur(16px) saturate(2) brightness(0.8)"}
        borderRadius={40}
        overflow={"hidden"}
      >
        <HStack spacing={2}>
          <Avatar src={props.userAvatarImageURL ?? ""} size={"xs"} />
          <Text fontSize={"11px"} overflow={"hidden"} textOverflow={"ellipsis"}>
            {props.userName}
          </Text>
        </HStack>
      </Box>
    </Box>
  )
}
