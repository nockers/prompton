import {
  HStack,
  Input,
  Stack,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react"
import type { FC } from "react"
import { useState } from "react"
import { UserAvatarDropzone } from "app/[login]/components/UserAvatarDropzone"

type Props = {
  userName: string
  userAvatarFileURL: string | null
  isOpen: boolean
  onClose(): void
  onChangeName(name: string): void
  onChangeAvatarFileId(file: File): void
}

export const UserModalProfile: FC<Props> = (props) => {
  const [userName, setUserName] = useState(props.userName)

  const onChange = (file: File) => {
    props.onChangeAvatarFileId(file)
  }

  const onBlue = () => {
    if (userName === props.userName) return
    props.onChangeName(userName)
  }

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent pb={4}>
        <ModalHeader>{"プロフィール更新"}</ModalHeader>
        <ModalCloseButton top={4} />
        <ModalBody pt={0}>
          <Stack spacing={4}>
            <HStack spacing={4}>
              <UserAvatarDropzone
                avatarImageURL={props.userAvatarFileURL}
                isLoading={false}
                onChange={onChange}
              />
              <Stack flex={1}>
                <Input
                  placeholder={"ユーザ名"}
                  value={userName}
                  onBlur={onBlue}
                  onChange={(event) => {
                    setUserName(event.target.value)
                  }}
                />
              </Stack>
            </HStack>
            <Textarea />
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
