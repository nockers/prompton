import { Box, Text, HStack, Icon, Spinner } from "@chakra-ui/react"
import type { FC } from "react"
import { useDropzone } from "react-dropzone"
import { BiCloudSnow, BiCloudUpload } from "react-icons/bi"

type Props = {
  isLoading: boolean
  onChange(files: File[]): void
}

export const UploadDropzone: FC<Props> = (props) => {
  const onDrop = (files: File[]) => {
    props.onChange(files)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const getText = () => {
    if (props.isLoading) {
      return "アップロード中..."
    }
    if (isDragActive) {
      return "その調子です！"
    }
    return "ここに画像をドロップして追加できます"
  }

  return (
    <Box
      {...getRootProps()}
      bg={"gray.700"}
      p={4}
      rounded={"md"}
      w={"100%"}
      borderStyle={"dashed"}
      borderWidth={4}
      cursor={"pointer"}
      _hover={{ opacity: 0.9 }}
    >
      <input {...getInputProps()} />
      <HStack spacing={4} minH={12}>
        {props.isLoading && <Spinner mr={2} />}
        {!props.isLoading && (
          <Icon
            as={props.isLoading ? BiCloudSnow : BiCloudUpload}
            fontSize={32}
          />
        )}
        <Text fontWeight={"bold"}>{getText()}</Text>
      </HStack>
    </Box>
  )
}
