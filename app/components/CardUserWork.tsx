import { Image, useDisclosure, Button, Box } from "@chakra-ui/react"
import { useRouter } from "next/router"
import type { FC } from "react"
import { ModalPost } from "app/components/ModalPost"

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
  postLabels: [string, string, number][]
  postColors: string[]
  postWebColors: string[]
  postThumbnailURL: string
  isEditable: boolean
  isLiked: boolean
  isBookmarked: boolean
  isFollowee: boolean
  isLoggedIn: boolean
}

export const CardUserWork: FC<Props> = (props) => {
  const router = useRouter()

  const { isOpen, onOpen, onClose } = useDisclosure()

  const onOpenUser = () => {}

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
        borderRadius={"xl"}
        overflow={"hidden"}
        boxShadow={"sm"}
      >
        <Box position={"relative"}>
          <Image w={"100%"} alt={""} src={props.postThumbnailURL} />
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
        postThumbnailURL={props.postThumbnailURL}
        userId={"-"}
        userName={"-"}
        userAvatarImageURL={"-"}
        onOpenUser={onOpenUser}
        isOpen={isOpen}
        isLiked={props.isLiked}
        isBookmarked={props.isBookmarked}
        isFollowee={props.isFollowee}
        isEditable={props.isEditable}
        isLoggedIn={props.isLoggedIn}
        onClose={onClose}
        onLinkColor={onLinkColor}
        onLinkLabel={onLinkLabel}
        onLinkWork={onLinkWork}
      />
    </>
  )
}
