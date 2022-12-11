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
  ModalHeader,
  Textarea,
  Wrap,
  WrapItem,
} from "@chakra-ui/react"
import { FC, useState } from "react"
import { BiBookmark, BiEdit, BiHeart } from "react-icons/bi"
import { ButtonLinkColor } from "app/components/ButtonLinkColor"
import { ButtonLinkLabel } from "app/components/ButtonLinkLabel"
import { UserProfile } from "app/components/UserProfile"
import { useUpdatePostMutation } from "interface/__generated__/react"

type Props = {
  postId: string
  postFileId: string
  postPrompt: string | null
  postAnnotationAdult: string | null
  postAnnotationMedical: string | null
  postAnnotationRacy: string | null
  postAnnotationSpoof: string | null
  postAnnotationViolence: string | null
  postLabels: [string, number][]
  postColors: string[]
  postWebColors: string[]
  userId: string
  userName: string
  userAvatarImageURL: string | null
  isOpen: boolean
  isEditable: boolean
  onOpenUser(): void
  onOpen(): void
  onClose(): void
  onLinkColor(color: string): void
  onLinkLabel(label: string): void
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
              src={`/api/images/${props.postFileId}?w=512`}
              borderRadius={8}
              w={"100%"}
            />
            <Wrap>
              {props.postLabels.map(([label, count]) => (
                <WrapItem key={label}>
                  <ButtonLinkLabel
                    label={label}
                    count={count}
                    onClick={() => {
                      props.onLinkLabel(label)
                    }}
                  />
                </WrapItem>
              ))}
            </Wrap>
            <Wrap>
              {props.postWebColors.map((color) => (
                <WrapItem key={color}>
                  <ButtonLinkColor
                    color={color}
                    onClick={() => {
                      props.onLinkColor(color)
                    }}
                  />
                </WrapItem>
              ))}
            </Wrap>
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
