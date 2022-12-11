import { BlitzPage } from "@blitzjs/auth"
import { Box, HStack, Stack, useDisclosure, useToast } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useContext, useState } from "react"
import { UploadDropzone } from "app/[login]/components/UploadDropzone"
import { UserHeaderProfile } from "app/[login]/components/UserHeaderProfile"
import { UserModalProfile } from "app/[login]/components/UserModalProfile"
import UserLayout from "app/[login]/layout"
import UserLoading from "app/[login]/loading"
import { CardPost } from "app/components/CardPost"
import { useFileUpload } from "app/hooks/useFileUpload"
import {
  useCreatePostMutation,
  useUpdateUserMutation,
  useUserQuery,
} from "interface/__generated__/react"
import { AppContext } from "interface/contexts/appContext"

const UserPage: BlitzPage = () => {
  const appContext = useContext(AppContext)

  const router = useRouter()

  const {
    isOpen: isOpenModalProfile,
    onOpen: onOpenModalProfile,
    onClose: onCloseModalProfile,
  } = useDisclosure()

  const [isLoading, setLoading] = useState(false)

  const [createPost] = useCreatePostMutation()

  const [updateUser] = useUpdateUserMutation()

  const {
    data = null,
    loading,
    refetch,
  } = useUserQuery({
    variables: { id: router.query.login as string },
    skip: typeof router.query.login === "undefined",
  })

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

  const onChangeAvatarFileId = async (file: File) => {
    try {
      const fileId = await uploadFile(file)
      await updateUser({
        variables: {
          input: {
            avatarFileId: fileId,
            headerImageId: data?.user?.headerImageId ?? null,
            biography: "",
            name: data?.user?.name ?? "-",
          },
        },
      })
      await refetch()
      toast({ title: "プロフィールを更新しました" })
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "ERROR",
          description: error.message,
          status: "error",
        })
      }
    }
  }

  const onEditProfile = () => {
    onOpenModalProfile()
  }

  const onChangeName = async (name: string) => {
    try {
      await updateUser({
        variables: {
          input: {
            avatarFileId: data?.user?.avatarImageId ?? null,
            headerImageId: data?.user?.headerImageId ?? null,
            biography: "",
            name: name,
          },
        },
      })
      await refetch()
      toast({ title: "プロフィールを更新しました" })
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "ERROR",
          description: error.message,
          status: "error",
        })
      }
    }
  }

  if (typeof router.query.login === "undefined" || loading) {
    return <UserLoading />
  }

  const user = data?.user ?? null

  if (user === null) {
    return <Box>{"NOT FOUND"}</Box>
  }

  const isEditable = router.query.login === appContext.currentUser?.uid

  return (
    <Stack as={"main"} px={4} spacing={4} pb={4}>
      <UserHeaderProfile
        avatarImageId={user.avatarImageId}
        userId={user.id}
        userName={user.name}
        isEditable={isEditable}
        onEdit={onEditProfile}
      />
      {isEditable && (
        <UploadDropzone isLoading={isLoading} onChange={onUploadFiles} />
      )}
      <HStack justifyContent={"center"}>
        <Box
          maxW={"fit-content"}
          sx={{ columnCount: [1, 2, 3, 4], columnGap: 4 }}
        >
          {user.posts.map((post) => (
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
                postLabels={post.labels.map((label) => label.name)}
                postColors={post.colors}
                postWebColors={post.webColors}
                userId={user.id}
                userName={user.name}
                userAvatarImageURL={user.avatarImageURL}
                isEditable={isEditable}
              />
            </Box>
          ))}
        </Box>
      </HStack>
      <UserModalProfile
        userName={user.name}
        userAvatarFileId={user.avatarImageId}
        isOpen={isOpenModalProfile}
        onClose={onCloseModalProfile}
        onChangeAvatarFileId={onChangeAvatarFileId}
        onChangeName={onChangeName}
      />
    </Stack>
  )
}

UserPage.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>
}

export default UserPage
