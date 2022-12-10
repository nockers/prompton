import { Box, Avatar } from "@chakra-ui/react"
import { FC } from "react"
import { useDropzone } from "react-dropzone"

type Props = {
  userAvatarFileId: string | null
  isLoading: boolean
  onChange(file: File): void
}

export const UserAvatarDropzone: FC<Props> = (props) => {
  const onDrop = (files: File[]) => {
    const [file = null] = files
    if (file === null) return
    props.onChange(file)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
  })

  const src =
    props.userAvatarFileId !== null
      ? `/api/images/${props.userAvatarFileId}?w=280&q=80`
      : ""

  return (
    <Box
      {...getRootProps()}
      bg={"gray.700"}
      rounded={"100"}
      borderStyle={"dashed"}
      borderWidth={4}
      cursor={"pointer"}
      _hover={{ opacity: 0.9 }}
    >
      <input {...getInputProps()} />
      <Avatar size={"lg"} src={src} />
    </Box>
  )
}
