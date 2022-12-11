import { BlitzPage } from "@blitzjs/auth"
import { Box, HStack } from "@chakra-ui/react"
import { useContext } from "react"
import { CardPost } from "app/components/CardPost"
import { usePostsQuery } from "interface/__generated__/react"
import { AppContext } from "interface/contexts/appContext"

export const HomePostList: BlitzPage = () => {
  const appContext = useContext(AppContext)

  const { data } = usePostsQuery({
    variables: { after: null },
  })

  return (
    <HStack justifyContent={"center"}>
      <Box
        maxW={"fit-content"}
        sx={{ columnCount: [1, 2, 3, 4], columnGap: 4 }}
      >
        {data?.posts.edges.map((edge) => (
          <Box key={edge.node.id} mb={4}>
            <CardPost
              id={edge.node.id}
              postFileId={edge.node.fileId}
              postPrompt={edge.node.prompt}
              userId={edge.node.user.id}
              userName={edge.node.user.name}
              userAvatarImageURL={edge.node.user.avatarImageURL}
              isEditable={edge.node.user.id === appContext.currentUser?.uid}
            />
          </Box>
        ))}
      </Box>
    </HStack>
  )
}
