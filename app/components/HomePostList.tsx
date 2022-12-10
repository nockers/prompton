import { BlitzPage } from "@blitzjs/auth"
import { Box, SimpleGrid } from "@chakra-ui/react"
import { useContext } from "react"
import { CardPost } from "app/components/CardPost"
import { toBlanks } from "app/utils/toBlanks"
import { usePostsQuery } from "interface/__generated__/react"
import { AppContext } from "interface/contexts/appContext"

export const HomePostList: BlitzPage = () => {
  const appContext = useContext(AppContext)

  const { data } = usePostsQuery({
    variables: { after: null },
  })

  return (
    <SimpleGrid minChildWidth={"280px"} gap={4}>
      {data?.posts.edges.map((edge) => (
        <CardPost
          key={edge.node.id}
          id={edge.node.id}
          postFileId={edge.node.fileId}
          postPrompt={edge.node.prompt}
          userId={edge.node.user.id}
          userName={edge.node.user.name}
          userAvatarImageURL={edge.node.user.avatarImageURL}
          isEditable={edge.node.user.id === appContext.currentUser?.uid}
        />
      ))}
      {toBlanks(data?.posts.edges ?? []).map((_, index) => (
        <Box key={index} />
      ))}
    </SimpleGrid>
  )
}
