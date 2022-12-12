import { BlitzPage } from "@blitzjs/auth"
import { Box, HStack, Stack, Text } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useContext } from "react"
import UserLayout from "app/[login]/layout"
import { CardPost } from "app/components/CardPost"
import { usePostsQuery } from "interface/__generated__/react"
import { AppContext } from "interface/contexts/appContext"

const ColorPage: BlitzPage = () => {
  const appContext = useContext(AppContext)

  const router = useRouter()

  const { data } = usePostsQuery({
    fetchPolicy: "cache-and-network",
    skip: typeof router.query.name === "undefined",
    variables: {
      offset: 0,
      limit: 8,
      where: {
        color: router.query.name as string,
        labelName: null,
      },
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
            </Box>
          ))}
        </Box>
      </HStack>
    </Stack>
  )
}

ColorPage.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>
}

export default ColorPage
