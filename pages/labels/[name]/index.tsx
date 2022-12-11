import { BlitzPage } from "@blitzjs/auth"
import { Box, HStack, Stack, Text } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useContext } from "react"
import UserLayout from "app/[login]/layout"
import { CardPost } from "app/components/CardPost"
import { usePostsQuery } from "interface/__generated__/react"
import { AppContext } from "interface/contexts/appContext"

const LabelPage: BlitzPage = () => {
  const appContext = useContext(AppContext)

  const router = useRouter()

  const { data } = usePostsQuery({
    fetchPolicy: "cache-and-network",
    skip: typeof router.query.name === "undefined",
    variables: {
      after: null,
      color: null,
      labelName: router.query.name as string,
    },
  })

  const label = router.query.name?.toString()

  return (
    <Stack as={"main"} px={4} spacing={4} pb={4}>
      <Text fontSize={"4xl"} fontWeight={"bold"}>{`#${label}`}</Text>
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
                postAnnotationAdult={edge.node.annotationAdult}
                postAnnotationMedical={edge.node.annotationMedical}
                postAnnotationRacy={edge.node.annotationRacy}
                postAnnotationSpoof={edge.node.annotationSpoof}
                postAnnotationViolence={edge.node.annotationViolence}
                postLabels={edge.node.labels.map((label) => [
                  label.name,
                  label.count,
                ])}
                postColors={edge.node.colors}
                postWebColors={edge.node.webColors}
                userId={edge.node.user.id}
                userName={edge.node.user.name}
                userAvatarImageURL={edge.node.user.avatarImageURL}
                isEditable={edge.node.user.id === appContext.currentUser?.uid}
              />
            </Box>
          ))}
        </Box>
      </HStack>
    </Stack>
  )
}

LabelPage.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>
}

export default LabelPage
