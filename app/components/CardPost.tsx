import {
  Image,
  useDisclosure,
  Button,
  Box,
  Avatar,
  Text,
  HStack,
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import type { FC } from "react"
import { ModalPost } from "app/components/ModalPost"
import { Config } from "interface/config"

type Props = {
  id: string
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
  isEditable: boolean
}

export const CardPost: FC<Props> = (props) => {
  const router = useRouter()

  const { isOpen, onOpen, onClose } = useDisclosure()

  const onOpenUser = () => {
    onClose()
    router.push(`/${props.userId}`)
  }

  const onLinkColor = (color: string) => {
    onClose()
    router.push(`/colors/${color.replace("#", "")}`)
  }

  const onLinkLabel = (label: string) => {
    onClose()
    router.push(`/labels/${label}`)
  }

  const onLinkWork = () => {
    onClose()
    router.push(`/works/${props.id}`, undefined, { scroll: true })
  }

  const onOpenWork = () => {
    if (window.innerWidth < 768) {
      router.push(`/works/${props.id}`, undefined, { scroll: true })
      return
    }
    onOpen()
  }

  return (
    <>
      <Button
        display={"block"}
        key={props.id}
        h={"auto"}
        p={0}
        onClick={onOpenWork}
        borderRadius={"lg"}
        overflow={"hidden"}
        boxShadow={"md"}
      >
        <Box position={"relative"}>
          <Image
            w={"100%"}
            alt={""}
            src={`${Config.imageUrl}/${props.postFileId}?w=512`}
          />
          <Box
            position={"absolute"}
            bottom={2}
            left={2}
            py={2}
            pl={2}
            pr={4}
            backdropFilter={"blur(16px) saturate(2) brightness(0.8)"}
            borderRadius={40}
            overflow={"hidden"}
          >
            <HStack spacing={2}>
              <Avatar src={props.userAvatarImageURL ?? ""} size={"sm"} />
              <Text
                fontSize={"sm"}
                overflow={"hidden"}
                textOverflow={"ellipsis"}
              >
                {props.userName}
              </Text>
            </HStack>
          </Box>
        </Box>
      </Button>
      <ModalPost
        postId={props.id}
        postFileId={props.postFileId}
        postPrompt={props.postPrompt}
        postLikeCount={props.postLikeCount}
        postAnnotationAdult={props.postAnnotationAdult}
        postAnnotationMedical={props.postAnnotationMedical}
        postAnnotationRacy={props.postAnnotationRacy}
        postAnnotationSpoof={props.postAnnotationSpoof}
        postAnnotationViolence={props.postAnnotationViolence}
        postLabels={props.postLabels}
        postColors={props.postColors}
        postWebColors={props.postWebColors}
        userId={props.userId}
        userName={props.userName}
        userAvatarImageURL={props.userAvatarImageURL}
        onOpenUser={onOpenUser}
        isOpen={isOpen}
        isLiked={props.isLiked}
        isBookmarked={props.isBookmarked}
        isFollowee={props.isFollowee}
        isEditable={props.isEditable}
        onClose={onClose}
        onLinkColor={onLinkColor}
        onLinkLabel={onLinkLabel}
        onLinkWork={onLinkWork}
      />
    </>
  )
}
