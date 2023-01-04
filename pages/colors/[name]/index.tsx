import type { BlitzPage } from "@blitzjs/auth"
import { Button, HStack, Spinner, Stack, Text } from "@chakra-ui/react"
import type { GetStaticPaths, GetStaticProps } from "next"
import { useRouter } from "next/router"
import { useContext } from "react"
import UserLayout from "app/[login]/layout"
import { CardWork } from "app/components/CardWork"
import { MainFallback } from "app/components/MainFallback"
import { MainStack } from "app/components/MainStack"
import { useColumnCount } from "app/hooks/useColumnCount"
import type {
  WorksQuery,
  WorksQueryVariables,
} from "interface/__generated__/react"
import { WorksDocument, useWorksQuery } from "interface/__generated__/react"
import { AppContext } from "interface/contexts/appContext"
import { client } from "interface/utils/client"
import { toColumnArray } from "interface/utils/toColumnArray"

type Props = {}

type Paths = {
  name: string
}

const ColorPage: BlitzPage<Props> = () => {
  const appContext = useContext(AppContext)

  const router = useRouter()

  const {
    data = null,
    fetchMore,
    loading,
  } = useWorksQuery({
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true,
    skip: typeof router.query.name === "undefined",
    variables: {
      offset: 0,
      limit: 9 * 4,
      where: {
        color: router.query.name as string,
        labelName: null,
        userId: null,
      },
    },
  })

  const columnCount = useColumnCount()

  const onFetchMore = () => {
    fetchMore({ variables: { offset: data!.works.length ?? 0 } })
  }

  const label = router.query.name?.toString()

  if (router.isFallback) {
    return <MainFallback />
  }

  if (loading && data === null) {
    return (
      <HStack pt={40} justifyContent={"center"}>
        <Spinner size={"xl"} />
      </HStack>
    )
  }

  return (
    <MainStack
      title={`#${label}`}
      description={`カラーコード「#${label}」に関連する作品があります。`}
      fileId={null}
    >
      <Stack pt={{ base: 4, md: 8 }} px={{ base: 4, md: 8 }}>
        <Text lineHeight={1} fontSize={"4xl"} fontWeight={"bold"}>
          {`#${label}`}
        </Text>
      </Stack>
      <HStack px={{ base: 4, md: 8 }} alignItems={"flex-start"} spacing={4}>
        {toColumnArray(data?.works ?? [], columnCount).map((column, index) => (
          <Stack key={index} spacing={4}>
            {column.map((work) => (
              <CardWork
                id={work.id}
                key={work.id}
                postFileId={work.fileId}
                postPrompt={work.prompt}
                postLikeCount={work.likesCount}
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
                postThumbnailURL={work.thumbnailURL}
                userId={work.user.id}
                userName={work.user.name}
                userAvatarImageURL={work.user.avatarImageURL}
                isLiked={work.isLiked}
                isBookmarked={work.isBookmarked}
                isFollowee={work.user.isFollowee}
                isEditable={work.user.id === appContext.currentUser?.uid}
              />
            ))}
          </Stack>
        ))}
      </HStack>
      <HStack justifyContent={"center"} px={4} w={"100%"}>
        <Button
          w={"100%"}
          maxW={"xs"}
          isLoading={loading}
          onClick={onFetchMore}
        >
          {"MORE"}
        </Button>
      </HStack>
    </MainStack>
  )
}

ColorPage.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>
}

export const getStaticPaths: GetStaticPaths<Paths> = async () => {
  const paths = [].map(() => {
    return { params: { name: "" } }
  })

  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps<Props, Paths> = async (context) => {
  if (typeof context.params?.name === "undefined") {
    throw new Error()
  }

  await client.query<WorksQuery, WorksQueryVariables>({
    query: WorksDocument,
    variables: {
      offset: 0,
      limit: 8,
      where: {
        color: context.params!.name,
        labelName: null,
        userId: null,
      },
    },
  })

  return {
    props: { cache: client.cache.extract() },
    revalidate: 60,
  }
}

export default ColorPage
