import { BlitzPage } from "@blitzjs/auth"
import {
  Box,
  SimpleGrid,
  Stack,
  useToast,
  Text,
  HStack,
  Avatar,
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useState } from "react"
import { UploadDropzone } from "app/[login]/components/UploadDropzone"
import UserLayout from "app/[login]/layout"
import UserLoading from "app/[login]/loading"
import { CardPost } from "app/components/CardPost"
import { useFileUpload } from "app/hooks/useFileUpload"
import { toBlanks } from "app/utils/toBlanks"
import {
  useCreatePostMutation,
  useUserQuery,
} from "interface/__generated__/react"

const UserPage: BlitzPage = () => {
  const router = useRouter()

  const [isLoading, setLoading] = useState(false)

  const [createPost] = useCreatePostMutation()

  const {
    data = null,
    loading,
    refetch,
  } = useUserQuery({
    variables: { id: router.query.login as string },
    skip: typeof router.query.login === "undefined",
  })

  const isMyPage = data?.user?.id === router.query.login

  const [uploadFile] = useFileUpload()

  const toast = useToast()

  const onUploadFiles = async (files: File[]) => {
    try {
      setLoading(true)
      const id = toast({
        title: `${files.length}件の画像を投稿しています`,
        isClosable: false,
      })
      for (const file of Array.from(files)) {
        const fileId = await uploadFile(file)
        await createPost({ variables: { input: { fileId: fileId } } })
      }
      toast.close(id)
      toast({
        title: "投稿が完了しました！",
        status: "success",
      })
      setLoading(false)
      await refetch()
    } catch (error) {
      setLoading(false)
      if (error instanceof Error) {
        toast({
          title: "ERROR",
          description: error.message,
          status: "error",
        })
      }
    }
  }

  if (typeof router.query.login === "undefined" && loading) {
    return <UserLoading />
  }

  const user = data?.user ?? null

  if (user === null) {
    return <Box>{"NOT FOUND"}</Box>
  }

  return (
    <Stack as={"main"} px={4} spacing={4} pb={4}>
      {isMyPage && (
        <Stack py={4}>
          <HStack spacing={4}>
            <Avatar size={"lg"} src={user.avatarImageURL ?? ""} />
            <Stack spacing={1}>
              <Text fontSize={"xs"} fontWeight={"bold"} opacity={0.8}>
                {`@${user.id}`}
              </Text>
              <Text fontSize={"2xl"} lineHeight={1} fontWeight={"bold"}>
                {user.name}
              </Text>
            </Stack>
          </HStack>
        </Stack>
      )}
      <UploadDropzone isLoading={isLoading} onChange={onUploadFiles} />
      <SimpleGrid minChildWidth={"280px"} gap={4}>
        {user.posts.edges.map((edge) => (
          <CardPost
            key={edge.node.id}
            id={edge.node.id}
            postFileId={edge.node.fileId}
            userId={user.id}
            userName={user.name}
            userAvatarImageURL={user.avatarImageURL ?? null}
          />
        ))}
        {toBlanks(user.posts.edges).map((_, index) => (
          <Box key={index} />
        ))}
      </SimpleGrid>
    </Stack>
  )
}

UserPage.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>
}

export default UserPage
