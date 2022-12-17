import { BlitzPage } from "@blitzjs/auth"
import {
  Stack,
  Image,
  Text,
  HStack,
  WrapItem,
  Wrap,
  Avatar,
  Box,
  Button,
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useContext, useState } from "react"
import UserLayout from "app/[login]/layout"
import { ButtonLinkColor } from "app/components/ButtonLinkColor"
import { ButtonLinkLabel } from "app/components/ButtonLinkLabel"
import { HomePostList } from "app/components/HomePostList"
import { usePostQuery } from "interface/__generated__/react"
import { AppContext } from "interface/contexts/appContext"

const PostPage: BlitzPage = () => {
  const appContext = useContext(AppContext)

  const [isEditable, markAsEditable] = useState(false)

  const router = useRouter()

  const { data = null } = usePostQuery({
    fetchPolicy: "cache-and-network",
    skip: typeof router.query.id === "undefined",
    variables: {
      id: router.query.id?.toString() ?? "",
    },
  })

  const onLinkColor = (color: string) => {
    router.push(`/colors/${color.replace("#", "")}`)
  }

  const onLinkLabel = (label: string) => {
    router.push(`/labels/${label}`)
  }

  const onOpenUser = () => {}

  const label = router.query.id?.toString()

  if (data === null || data.post === null) {
    return null
  }

  return (
    <Stack as={"main"} px={4} spacing={4} pb={4}>
      <HStack justifyContent={"center"}>
        <Stack
          maxW={"8xl"}
          direction={{ base: "column", lg: "row" }}
          w={"100%"}
          spacing={4}
        >
          <Box flex={1}>
            <Image
              w={"100%"}
              alt={""}
              src={`/api/images/${data.post.fileId}?w=1024`}
              borderRadius={4}
            />
          </Box>
          <Stack w={{ base: "100%", lg: "xs" }} spacing={4}>
            <HStack spacing={4}>
              <Avatar
                size={"md"}
                src={data.post.user.avatarImageURL ?? ""}
                onClick={onOpenUser}
              />
              <Box flex={1} onClick={onOpenUser}>
                <Text fontWeight={"bold"}>{data.post.user.name}</Text>
              </Box>
              <Button size={"sm"}>{"フォロー"}</Button>
            </HStack>
            <HStack spacing={4}>
              <Button flex={1}>{"ブックマーク"}</Button>
              <Button flex={1}>{"いいね"}</Button>
            </HStack>
            <Box bg={"blackAlpha.400"} p={4} rounded={"lg"}>
              <Text>{data.post.prompt ?? "No prompt"}</Text>
            </Box>
            <Stack>
              <Wrap>
                {data.post.labels.map((label) => (
                  <WrapItem key={label.id}>
                    <ButtonLinkLabel
                      label={label.name}
                      count={label.count}
                      onClick={() => {
                        onLinkLabel(label.name)
                      }}
                    />
                  </WrapItem>
                ))}
                {data.post.webColors.map((color) => (
                  <WrapItem key={color}>
                    <ButtonLinkColor
                      color={color}
                      onClick={() => {
                        onLinkColor(color)
                      }}
                    />
                  </WrapItem>
                ))}
              </Wrap>
            </Stack>
          </Stack>
        </Stack>
      </HStack>
      <HomePostList />
    </Stack>
  )
}

PostPage.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>
}

export default PostPage
