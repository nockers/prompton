import { Image, useDisclosure, Button } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { FC } from "react"
import { ModalPost } from "app/components/ModalPost"

type Props = {
  id: string
  postFileId: string
  postPrompt: string | null
  userId: string
  userName: string
  userAvatarImageURL: string | null
  isEditable: boolean
}

export const CardPost: FC<Props> = (props) => {
  const router = useRouter()

  const { isOpen, onOpen, onClose } = useDisclosure()

  const onOpenUser = () => {
    router.push(`/${props.userId}`)
  }

  return (
    <>
      <Button
        key={props.id}
        h={"auto"}
        colorScheme={isOpen ? "blue" : "gray"}
        p={1}
        onClick={onOpen}
      >
        <Image
          w={"100%"}
          alt={""}
          src={`/api/images/${props.postFileId}?w=400&q=100`}
          borderRadius={4}
        />
      </Button>
      <ModalPost
        postId={props.id}
        postFileId={props.postFileId}
        postPrompt={props.postPrompt}
        userId={props.userId}
        userName={props.userName}
        userAvatarImageURL={props.userAvatarImageURL}
        onOpenUser={onOpenUser}
        isOpen={isOpen}
        isEditable={props.isEditable}
        onOpen={onOpen}
        onClose={onClose}
      />
    </>
  )
}
