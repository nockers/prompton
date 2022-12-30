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
  useBreakpointValue,
  HStack,
  Textarea,
  Wrap,
  WrapItem,
  Box,
  ModalHeader,
  useToast,
} from "@chakra-ui/react"
import type { FC } from "react"
import { useContext, useState } from "react"
import { ButtonFollow } from "app/components/ButtonFollow"
import { ButtonLike } from "app/components/ButtonLike"
import { ButtonLinkColor } from "app/components/ButtonLinkColor"
import { ButtonLinkLabel } from "app/components/ButtonLinkLabel"
import { IconButtonBookmark } from "app/components/IconButtonBookmark"
import { UserProfile } from "app/components/UserProfile"
import {
  useCreateWorkBookmarkMutation,
  useCreateWorkLikeMutation,
  useDeleteWorkBookmarkMutation,
  useDeleteWorkLikeMutation,
  useFollowUserMutation,
  useUnfollowUserMutation,
  useUpdateWorkMutation,
  useWorkQuery,
} from "interface/__generated__/react"
import { Config } from "interface/config"
import { AppContext } from "interface/contexts/appContext"

type Props = {
  postId: string
  postFileId: string
  postPrompt: string | null
  postLikeCount: number
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
  isLiked: boolean
  isBookmarked: boolean
  isFollowee: boolean
  isOpen: boolean
  isEditable: boolean
  onOpenUser(): void
  onClose(): void
  onLinkColor(color: string): void
  onLinkLabel(label: string): void
  onLinkWork(): void
}

export const ModalPost: FC<Props> = (props) => {
  const appContext = useContext(AppContext)

  /**
   * データを更新する
   */
  useWorkQuery({
    fetchPolicy: "cache-and-network",
    skip: !props.isOpen,
    variables: { id: props.postId },
  })

  const margin = useBreakpointValue({ base: 0, md: 4 })

  const [updatePost] = useUpdateWorkMutation()

  const [isEditable] = useState(false)

  const [prompt, setPrompt] = useState(props.postPrompt ?? "")

  const [followUser, { loading: isCreatingFriendship }] =
    useFollowUserMutation()

  const [unfollowUser, { loading: isDeletingFriendship }] =
    useUnfollowUserMutation()

  const [createWorkLike, { loading: isCreatingLike }] =
    useCreateWorkLikeMutation()

  const [deleteWorkLike, { loading: isDeletingLike }] =
    useDeleteWorkLikeMutation()

  const [createWorkBookmark, { loading: isCreatingBookmark }] =
    useCreateWorkBookmarkMutation()

  const [deleteWorkBookmark, { loading: isDeletingBookmark }] =
    useDeleteWorkBookmarkMutation()

  const toast = useToast()

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

  const onFollowUser = async () => {
    try {
      await followUser({
        variables: { input: { userId: props.userId } },
      })
      toast({ status: "success", description: "フォローしました" })
    } catch (error) {
      if (error instanceof Error) {
        toast({ status: "error", description: error.message })
      }
    }
  }

  const onUnfollowUser = async () => {
    try {
      await unfollowUser({
        variables: { input: { userId: props.userId } },
      })
    } catch (error) {
      if (error instanceof Error) {
        toast({ status: "error", description: error.message })
      }
    }
  }

  const onCreateLike = async () => {
    try {
      await createWorkLike({
        variables: { input: { workId: props.postId } },
      })
    } catch (error) {
      if (error instanceof Error) {
        toast({ status: "error", description: error.message })
      }
    }
  }

  const onDeleteLike = async () => {
    try {
      await deleteWorkLike({
        variables: { input: { workId: props.postId } },
      })
    } catch (error) {
      if (error instanceof Error) {
        toast({ status: "error", description: error.message })
      }
    }
  }

  const onCreateBookmark = async () => {
    try {
      await createWorkBookmark({
        variables: { input: { workId: props.postId } },
      })
    } catch (error) {
      if (error instanceof Error) {
        toast({ status: "error", description: error.message })
      }
    }
  }

  const onDeleteBookmark = async () => {
    try {
      await deleteWorkBookmark({
        variables: { input: { workId: props.postId } },
      })
    } catch (error) {
      if (error instanceof Error) {
        toast({ status: "error", description: error.message })
      }
    }
  }

  const isLoadingFriendship = isCreatingFriendship || isDeletingFriendship

  const isLoadingLike = isCreatingLike || isDeletingLike

  const isLoadingBookmark = isCreatingBookmark || isDeletingBookmark

  const isSelf = props.userId === appContext.currentUser?.uid

  return (
    <Modal
      isOpen={props.isOpen}
      size={{ base: "full", md: "xl", lg: "4xl" }}
      onClose={props.onClose}
    >
      <ModalOverlay backdropFilter="blur(6px)" />
      <ModalContent mx={margin}>
        <ModalHeader px={4} py={4}>
          <HStack justifyContent={"space-between"}>
            <Text fontSize={"md"}>{props.postId}</Text>
            <Button
              size={"sm"}
              colorScheme={"primary"}
              aria-label={""}
              onClick={props.onLinkWork}
            >
              {"詳細ページ"}
            </Button>
          </HStack>
        </ModalHeader>
        <ModalBody pb={0} pt={0} px={4}>
          <Stack direction={{ base: "column", lg: "row" }} spacing={4}>
            <Image
              alt={""}
              src={`${Config.imageUrl}/${props.postFileId}?w=512`}
              borderRadius={8}
              w={"100%"}
            />
            <Stack spacing={4}>
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
          </Stack>
        </ModalBody>
        <ModalFooter px={4}>
          <HStack justifyContent={"space-between"} w={"100%"}>
            <HStack spacing={4}>
              <UserProfile
                userId={props.userId}
                userAvatarImageURL={props.userAvatarImageURL}
                userName={props.userName}
                onOpenUser={props.onOpenUser}
              />
              {!isSelf && (
                <ButtonFollow
                  size={"sm"}
                  isLoading={isLoadingFriendship}
                  isActive={props.isFollowee}
                  isDisabled={isSelf || appContext.currentUser === null}
                  onFollow={onFollowUser}
                  onUnfollow={onUnfollowUser}
                />
              )}
            </HStack>
            <HStack>
              <IconButtonBookmark
                aria-label={"Bookmark"}
                size={"sm"}
                isLoading={isLoadingBookmark}
                isDisabled={appContext.currentUser === null}
                isActive={props.isBookmarked}
                onCreate={onCreateBookmark}
                onDelete={onDeleteBookmark}
              />
              {!props.isEditable && (
                <ButtonLike
                  size={"sm"}
                  count={props.postLikeCount}
                  isLoading={isLoadingLike}
                  isActive={props.isLiked}
                  isDisabled={isSelf || appContext.currentUser === null}
                  onCreate={onCreateLike}
                  onDelete={onDeleteLike}
                />
              )}
            </HStack>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
