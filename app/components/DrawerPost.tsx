import {
  Image,
  Button,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Icon,
  useBreakpointValue,
  IconButton,
  HStack,
  Tag,
} from "@chakra-ui/react"
import { FC } from "react"
import { BiBookmark, BiHeart } from "react-icons/bi"
import { PostPrompt } from "app/components/PostPrompt"
import { UserProfile } from "app/components/UserProfile"

type Props = {
  postId: string
  postFileId: string
  userId: string
  userName: string
  userAvatarImageURL: string | null
  isOpen: boolean
  onOpenUser(): void
  onOpen(): void
  onClose(): void
}

export const DrawerPost: FC<Props> = (props) => {
  const margin = useBreakpointValue({ base: 0, md: 4 })

  return (
    <Modal
      isOpen={props.isOpen}
      size={{ sm: "full", md: "xl" }}
      scrollBehavior={"inside"}
      onClose={props.onClose}
    >
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent mx={margin}>
        {/* <ModalHeader px={4}>{props.postId}</ModalHeader> */}
        <ModalCloseButton top={4} right={4} />
        <ModalBody pb={0} pt={4} px={4}>
          <Stack spacing={4}>
            <Image
              alt={""}
              src={`/api/images/${props.postFileId}?w=1024&q=100`}
              borderRadius={8}
              w={"100%"}
            />
            <HStack spacing={2}>
              <Tag>{"#Prompt"}</Tag>
              <Tag>{"#Prompt"}</Tag>
              <Tag>{"#Prompt"}</Tag>
            </HStack>
            <PostPrompt />
            <UserProfile
              userId={props.userId}
              userAvatarImageURL={props.userAvatarImageURL}
              userName={props.userName}
              onOpenUser={props.onOpenUser}
            />
          </Stack>
        </ModalBody>
        <ModalFooter px={4}>
          <IconButton
            mr={2}
            size={"sm"}
            onClick={props.onClose}
            aria-label={""}
          >
            <Icon as={BiBookmark} />
          </IconButton>
          <Button
            size={"sm"}
            leftIcon={<Icon as={BiHeart} />}
            colorScheme={"blue"}
          >
            {"いいね"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
