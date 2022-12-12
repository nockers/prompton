import { BlitzPage } from "@blitzjs/auth"
import { Box, HStack, Stack, Text } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useContext } from "react"
import UserLayout from "app/[login]/layout"
import { CardPost } from "app/components/CardPost"
import { useColumnCount } from "app/hooks/useColumnCount"
import { usePostsQuery } from "interface/__generated__/react"
import { AppContext } from "interface/contexts/appContext"
import { toColumnArray } from "interface/utils/toColumnArray"

const LabelPage: BlitzPage = () => {
  const appContext = useContext(AppContext)

  const router = useRouter()

  const { data } = usePostsQuery({
    fetchPolicy: "cache-and-network",
    skip: typeof router.query.name === "undefined",
    variables: {
      offset: 0,
      limit: 8,
      where: {
        color: null,
        labelName: router.query.name as string,
      },
    },
  })

  const columnCount = useColumnCount()

  const label = router.query.name?.toString()

  return (
    <Stack as={"main"} px={4} spacing={4} pb={4}>
      <Text fontSize={"4xl"} fontWeight={"bold"}>{`#${label}`}</Text>
      <HStack justifyContent={"center"}>
        <Box maxW={"fit-content"} sx={{ columnCount, columnGap: 4 }}>
          {toColumnArray(data?.posts ?? [], columnCount).map((post) => (
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

LabelPage.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>
}

export default LabelPage
