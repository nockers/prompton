import { BlitzPage } from "@blitzjs/auth"
import { Box, HStack } from "@chakra-ui/react"
import { useContext } from "react"
import { CardPost } from "app/components/CardPost"
import { usePostsQuery } from "interface/__generated__/react"
import { AppContext } from "interface/contexts/appContext"

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

  return (
    <HStack justifyContent={"center"}>
      <Box
        maxW={"fit-content"}
        sx={{ columnCount: [1, 2, 3, 4], columnGap: 4 }}
      >
        {data?.posts.map((post) => (
          <Box key={post.id} mb={4}>
            <CardPost
              id={post.id}
              postFileId={post.fileId}
              postPrompt={post.prompt}
              postAnnotationAdult={post.annotationAdult}
              postAnnotationMedical={post.annotationMedical}
              postAnnotationRacy={post.annotationRacy}
              postAnnotationSpoof={post.annotationSpoof}
              postAnnotationViolence={post.annotationViolence}
              postLabels={post.labels.map((label) => [label.name, label.count])}
              postColors={post.colors}
              postWebColors={post.webColors}
              userId={post.user.id}
              userName={post.user.name}
              userAvatarImageURL={post.user.avatarImageURL}
              isEditable={post.user.id === appContext.currentUser?.uid}
            />
          </Box>
        ))}
      </Box>
    </HStack>
  )
}
