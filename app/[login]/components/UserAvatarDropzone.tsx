import { Box, Avatar } from "@chakra-ui/react"
import type { FC } from "react"
import { useDropzone } from "react-dropzone"

type Props = {
  avatarImageURL: string | null
  isLoading: boolean
  onChange(file: File): void
}

export const UserAvatarDropzone: FC<Props> = (props) => {
  const onDrop = (files: File[]) => {
    const [file = null] = files
    if (file === null) return
    props.onChange(file)
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
  })

  return (
    <Box
      {...getRootProps()}
      bg={"gray.700"}
      rounded={"100"}
      borderStyle={"dashed"}
      borderWidth={2}
      cursor={"pointer"}
      _hover={{ opacity: 0.9 }}
    >
      <input {...getInputProps()} />
      <Avatar size={"lg"} src={props.avatarImageURL || ""} />
    </Box>
  )
}
