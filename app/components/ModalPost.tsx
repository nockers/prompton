import {
  Image,
  Button,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
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
  Box,
} from "@chakra-ui/react"
import type { FC } from "react"
import { useState } from "react"
import { BiBookmark, BiEdit, BiExpand, BiHeart } from "react-icons/bi"
import { ButtonLinkColor } from "app/components/ButtonLinkColor"
import { ButtonLinkLabel } from "app/components/ButtonLinkLabel"
import { UserProfile } from "app/components/UserProfile"
import { useUpdateWorkMutation } from "interface/__generated__/react"

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
  onLinkWork(): void
}

export const ModalPost: FC<Props> = (props) => {
  const margin = useBreakpointValue({ base: 0, md: 4 })

  const [updatePost] = useUpdateWorkMutation()

  const [isEditable, setIsEditable] = useState(false)

  const [prompt, setPrompt] = useState(props.postPrompt ?? "")

  const onEdit = () => {
    setIsEditable((state) => !state)
  }

  const onBlur = async () => {
    await updatePost({
      variables: {
        input: {
          workId: props.postId,
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
        <ModalHeader pl={4} pr={2} py={4}>
          <HStack justifyContent={"space-between"}>
            <Box></Box>
            <HStack>
              <IconButton
                variant={"link"}
                aria-label={""}
                onClick={props.onLinkWork}
              >
                <Icon as={BiExpand} />
              </IconButton>
            </HStack>
          </HStack>
        </ModalHeader>
        <ModalBody pb={0} pt={0} px={4}>
          <Stack spacing={4}>
            <Image
              alt={""}
              src={`/api/images/${props.postFileId}?w=512`}
              borderRadius={8}
              w={"100%"}
            />
            <Stack spacing={4}>
              {!isEditable && (
                <Box bg={"blackAlpha.400"} p={4} rounded={"lg"}>
                  <Text>{props.postPrompt ?? "no prompt"}</Text>
                </Box>
              )}
              {isEditable && (
                <Textarea
                  value={prompt}
                  onChange={(event) => {
                    setPrompt(event.target.value)
                  }}
                  onBlur={onBlur}
                />
              )}
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
            </Stack>
          </Stack>
        </ModalBody>
        <ModalFooter px={4}>
          <HStack justifyContent={"space-between"} w={"100%"}>
            <UserProfile
              userId={props.userId}
              userAvatarImageURL={props.userAvatarImageURL}
              userName={props.userName}
              onOpenUser={props.onOpenUser}
            />
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
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
