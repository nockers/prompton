import { Stack, Text, HStack, Avatar, Button } from "@chakra-ui/react"
import { FC } from "react"
import { BiEdit } from "react-icons/bi"

type Props = {
  avatarImageId: string | null
  userId: string
  userName: string
  isEditable: boolean
  onEdit(): void
}

export const UserHeaderProfile: FC<Props> = (props) => {
  const src =
    props.avatarImageId !== null
      ? `/api/images/${props.avatarImageId}?w=280&q=80`
      : ""

  return (
    <Stack py={4}>
      <HStack spacing={4} alignItems={"flex-start"}>
        <HStack flex={1} spacing={4}>
          <Avatar size={"lg"} src={src} />
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
