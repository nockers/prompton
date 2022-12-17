import { BlitzPage } from "@blitzjs/auth"
import { HStack, Stack, Text } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useContext } from "react"
import UserLayout from "app/[login]/layout"
import { CardPost } from "app/components/CardPost"
import { useColumnCount } from "app/hooks/useColumnCount"
import { usePostsQuery } from "interface/__generated__/react"
import { AppContext } from "interface/contexts/appContext"
import { toColumnArray } from "interface/utils/toColumnArray"

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

  const columnCount = useColumnCount()

  const label = router.query.name?.toString()

  return (
    <Stack as={"main"} px={4} spacing={4} pb={4}>
      <Text fontSize={"4xl"} fontWeight={"bold"}>{`#${label}`}</Text>
      <HStack maxW={"fit-content"} alignItems={"flex-start"}>
        {toColumnArray(data?.works ?? [], columnCount).map((column, index) => (
          <Stack key={index}>
            {column.map((work) => (
              <CardPost
                id={work.id}
                key={work.id}
                postFileId={work.fileId}
                postPrompt={work.prompt}
                postAnnotationAdult={work.annotationAdult}
                postAnnotationMedical={work.annotationMedical}
                postAnnotationRacy={work.annotationRacy}
                postAnnotationSpoof={work.annotationSpoof}
                postAnnotationViolence={work.annotationViolence}
                postLabels={work.labels.map((label) => [
                  label.name,
                  label.count,
                ])}
                postColors={work.colors}
                postWebColors={work.webColors}
                userId={work.user.id}
                userName={work.user.name}
                userAvatarImageURL={work.user.avatarImageURL}
                isEditable={work.user.id === appContext.currentUser?.uid}
              />
            ))}
          </Stack>
        ))}
      </HStack>
    </Stack>
  )
}

ColorPage.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>
}

export default ColorPage
