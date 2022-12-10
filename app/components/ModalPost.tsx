import {
  Image,
  Button,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  Text,
  ModalBody,
  ModalFooter,
  Icon,
  useBreakpointValue,
  IconButton,
  HStack,
  Tag,
  ModalHeader,
  Textarea,
} from "@chakra-ui/react"
import { FC, useState } from "react"
import { BiBookmark, BiEdit, BiHeart } from "react-icons/bi"
import { UserProfile } from "app/components/UserProfile"
import { useUpdatePostMutation } from "interface/__generated__/react"

type Props = {
  postId: string
  postFileId: string
  postPrompt: string | null
  userId: string
  userName: string
  userAvatarImageURL: string | null
  isOpen: boolean
  isEditable: boolean
  onOpenUser(): void
  onOpen(): void
  onClose(): void
}

export const ModalPost: FC<Props> = (props) => {
  const margin = useBreakpointValue({ base: 0, md: 4 })

  const [updatePost] = useUpdatePostMutation()

  const [isEditable, setIsEditable] = useState(false)

  const [prompt, setPrompt] = useState(props.postPrompt ?? "")

  const onEdit = () => {
    setIsEditable((state) => !state)
  }

  const onBlur = async () => {
    await updatePost({
      variables: {
        input: {
          postId: props.postId,
          prompt: prompt,
        },
      },
    })
  }

  return (
    <Modal
      isOpen={props.isOpen}
      size={{ base: "full", md: "xl" }}
      scrollBehavior={"inside"}
      onClose={props.onClose}
    >
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent mx={margin}>
        <ModalHeader px={4}>{props.postId}</ModalHeader>
        <ModalCloseButton top={4} right={4} />
        <ModalBody pb={0} pt={0} px={4}>
          <Stack spacing={4}>
            <Image
              alt={""}
              src={`/api/images/${props.postFileId}?w=1024`}
              borderRadius={8}
              w={"100%"}
            />
            <HStack spacing={2}>
              <HStack spacing={2}>
                <Tag>{"#Prompt"}</Tag>
                <Tag>{"#Prompt"}</Tag>
                <Tag>{"#Prompt"}</Tag>
              </HStack>
            </HStack>
            {isEditable && (
              <Textarea
                value={prompt}
                onChange={(event) => {
                  setPrompt(event.target.value)
                }}
                onBlur={onBlur}
              />
            )}
            {!isEditable && <Text>{props.postPrompt ?? "no prompt"}</Text>}
            <UserProfile
              userId={props.userId}
              userAvatarImageURL={props.userAvatarImageURL}
              userName={props.userName}
              onOpenUser={props.onOpenUser}
            />
          </Stack>
        </ModalBody>
        <ModalFooter px={4}>
          <HStack>
            <IconButton size={"sm"} onClick={props.onClose} aria-label={""}>
              <Icon as={BiBookmark} />
            </IconButton>
            {!props.isEditable && (
              <Button
                size={"sm"}
                leftIcon={<Icon as={BiHeart} />}
                colorScheme={"blue"}
              >
                {"いいね"}
              </Button>
            )}
            {props.isEditable && (
              <Button
                size={"sm"}
                leftIcon={<Icon as={BiEdit} />}
                colorScheme={"blue"}
                onClick={onEdit}
              >
                {isEditable ? "終了" : "編集"}
              </Button>
            )}
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
