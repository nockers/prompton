import { Box, Button, HStack, Icon, Stack } from "@chakra-ui/react"
import Link from "next/link"
import type { FC } from "react"
import { useContext } from "react"
import { BiRightArrowAlt } from "react-icons/bi"
import { CardLabelPost } from "app/components/CardLabelPost"
import { useSearchLabelsQuery } from "interface/__generated__/react"
import { AppContext } from "interface/contexts/appContext"

type Props = {
  searchText: string
}

export const SearchLabelList: FC<Props> = (props) => {
  const appContext = useContext(AppContext)

  const { data } = useSearchLabelsQuery({
    notifyOnNetworkStatusChange: true,
    variables: {
      offset: 0,
      limit: 40,
      where: {
        search: props.searchText ?? null,
      },
    },
  })

  return (
    <Stack spacing={{ base: 4, md: 8 }} w={"100%"}>
      {data?.labels.map((label) => (
        <Stack key={label.id} spacing={{ base: 2, md: 4 }}>
          <Box px={{ base: 4, md: 8 }}>
            <Link href={`/labels/${label.name}`}>
              <Button size={"md"} rightIcon={<Icon as={BiRightArrowAlt} />}>
                {`#${label.nameJA || label.name}`}
              </Button>
            </Link>
          </Box>
          <HStack overflow={"auto"} pl={{ base: 4, md: 8 }}>
            {label.works.map((work) => (
              <Box key={work.id} minW={40}>
                <CardLabelPost
                  id={work.id}
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
                    label.nameJA || label.name,
                    label.count,
                  ])}
                  postColors={work.colors}
                  postWebColors={work.webColors}
                  postSquareThumbnailURL={work.squareThumbnailURL}
                  userId={work.user.id}
                  userName={work.user.name}
                  userAvatarImageURL={work.user.avatarImageURL}
                  isLiked={work.isLiked}
                  isBookmarked={work.isBookmarked}
                  isFollowee={work.user.isFollowee}
                  isEditable={work.user.id === appContext.currentUser?.uid}
                />
              </Box>
            ))}
            <Box opacity={0}>{"a"}</Box>
          </HStack>
        </Stack>
      ))}
    </Stack>
  )
}
