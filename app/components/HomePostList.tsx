import { BlitzPage } from "@blitzjs/auth"
import { HStack, Stack } from "@chakra-ui/react"
import { useContext } from "react"
import { CardPost } from "app/components/CardPost"
import { useColumnCount } from "app/hooks/useColumnCount"
import { usePostsQuery } from "interface/__generated__/react"
import { AppContext } from "interface/contexts/appContext"
import { toColumnArray } from "interface/utils/toColumnArray"

export const HomePostList: BlitzPage = () => {
  const appContext = useContext(AppContext)

  const { data } = usePostsQuery({
    fetchPolicy: "cache-and-network",
    variables: {
      offset: 0,
      limit: 8,
      where: null,
    },
  })

  const columnCount = useColumnCount()

  return (
    <HStack justifyContent={"center"}>
      <HStack maxW={"fit-content"} alignItems={"flex-start"}>
        {toColumnArray(data?.posts ?? [], columnCount).map((column, index) => (
          <Stack key={index}>
            {column.map((post) => (
              <CardPost
                id={post.id}
                key={post.id}
                postFileId={post.fileId}
                postPrompt={post.prompt}
                postAnnotationAdult={post.annotationAdult}
                postAnnotationMedical={post.annotationMedical}
                postAnnotationRacy={post.annotationRacy}
                postAnnotationSpoof={post.annotationSpoof}
                postAnnotationViolence={post.annotationViolence}
                postLabels={post.labels.map((label) => [
                  label.name,
                  label.count,
                ])}
                postColors={post.colors}
                postWebColors={post.webColors}
                userId={post.user.id}
                userName={post.user.name}
                userAvatarImageURL={post.user.avatarImageURL}
                isEditable={post.user.id === appContext.currentUser?.uid}
              />
            ))}
          </Stack>
        ))}
      </HStack>
    </HStack>
  )
}
