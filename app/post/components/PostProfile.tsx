import { Stack, Text, Textarea, Box } from "@chakra-ui/react"
import { FC, useState } from "react"
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
  isEditable: boolean
  onLinkLabel(label: string): void
  onLinkColor(color: string): void
}

export const PostProfile: FC<Props> = (props) => {
  const [updateWork] = useUpdateWorkMutation()

  const [isEditable, setIsEditable] = useState(false)

  const [prompt, setPrompt] = useState(props.postPrompt ?? "")

  const onBlur = async () => {
    await updateWork({
      variables: {
        input: {
          workId: props.postId,
          prompt: prompt,
        },
      },
    })
  }

  return (
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
    </Stack>
  )
}
