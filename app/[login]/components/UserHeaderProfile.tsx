import { Stack, Text, HStack, Avatar, Button } from "@chakra-ui/react"
import { FC } from "react"
import { BiEdit } from "react-icons/bi"

type Props = {
  avatarImageURL: string | null
  userId: string
  userName: string
  isEditable: boolean
  onEdit(): void
}

export const UserHeaderProfile: FC<Props> = (props) => {
  return (
    <Stack py={4}>
      <HStack spacing={4} alignItems={"flex-start"}>
        <HStack flex={1} spacing={4}>
          <Avatar size={"lg"} src={props.avatarImageURL || ""} />
          <Stack spacing={1}>
            <Text fontSize={"xs"} fontWeight={"bold"} opacity={0.8}>
              {`@${props.userId}`}
            </Text>
            <Text fontSize={"2xl"} lineHeight={1} fontWeight={"bold"}>
              {props.userName}
            </Text>
          </Stack>
        </HStack>
        {props.isEditable && (
          <Stack alignItems={"flex-start"}>
            <Button
              aria-label={""}
              size={"sm"}
              rightIcon={<BiEdit />}
              onClick={props.onEdit}
            >
              {"編集"}
            </Button>
          </Stack>
        )}
      </HStack>
    </Stack>
  )
}
