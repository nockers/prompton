import { BlitzPage } from "@blitzjs/auth"
import { Box, SimpleGrid } from "@chakra-ui/react"
import { CardPost } from "app/components/CardPost"
import { toBlanks } from "app/utils/toBlanks"
import { usePostsQuery } from "interface/__generated__/react"

export const HomePostList: BlitzPage = () => {
  const { data } = usePostsQuery({
    variables: {},
  })

  return (
    <SimpleGrid minChildWidth={"280px"} gap={4}>
      {data?.posts.edges.map((edge) => (
        <CardPost
          key={edge.node.id}
          id={edge.node.id}
          postFileId={edge.node.fileId}
          userId={edge.node.user.id}
          userName={edge.node.user.name}
          userAvatarImageURL={edge.node.user.avatarImageURL ?? null}
        />
      ))}
      {toBlanks(data?.posts.edges ?? []).map((_, index) => (
        <Box key={index} />
      ))}
    </SimpleGrid>
  )
}
