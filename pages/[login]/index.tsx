import type { BlitzPage } from "@blitzjs/auth"
import { Box, HStack, Stack, useDisclosure, useToast } from "@chakra-ui/react"
import type { GetStaticPaths, GetStaticProps } from "next"
import { useRouter } from "next/router"
import { useContext, useState } from "react"
import { UploadDropzone } from "app/[login]/components/UploadDropzone"
import { UserHeaderProfile } from "app/[login]/components/UserHeaderProfile"
import { UserModalProfile } from "app/[login]/components/UserModalProfile"
import UserLayout from "app/[login]/layout"
import UserLoading from "app/[login]/loading"
import { CardPost } from "app/components/CardPost"
import { MainFallback } from "app/components/MainFallback"
import { MainStack } from "app/components/MainStack"
import { useColumnCount } from "app/hooks/useColumnCount"
import { useFileUpload } from "app/hooks/useFileUpload"
import {
  useCreateWorkMutation,
  useUpdateUserMutation,
  useUserQuery,
} from "interface/__generated__/react"
import { AppContext } from "interface/contexts/appContext"
import { toColumnArray } from "interface/utils/toColumnArray"

type Props = {}

type Paths = {
  login: string
}

const UserPage: BlitzPage = () => {
  const appContext = useContext(AppContext)

  const router = useRouter()

  const {
    isOpen: isOpenModalProfile,
    onOpen: onOpenModalProfile,
    onClose: onCloseModalProfile,
  } = useDisclosure()

  const [isLoading, setLoading] = useState(false)

  const [createWork] = useCreateWorkMutation()

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

  const columnCount = useColumnCount()

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
        await createWork({ variables: { input: { fileId: fileId } } })
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

  if (router.isFallback) {
    return <MainFallback />
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
    <MainStack
      title={`${user.name}さんの作品`}
      description={null}
      fileId={null}
    >
      <Box px={4}>
        <UserHeaderProfile
          avatarImageURL={user.avatarImageURL}
          userId={user.id}
          userName={user.name}
          isEditable={isEditable}
          onEdit={onEditProfile}
        />
      </Box>
      <Box px={4}>
        {isEditable && (
          <UploadDropzone isLoading={isLoading} onChange={onUploadFiles} />
        )}
      </Box>
      <HStack px={4} justifyContent={"center"}>
        <HStack maxW={"fit-content"} alignItems={"flex-start"}>
          {toColumnArray(user.works, columnCount).map((column, index) => (
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
                  userId={user.id}
                  userName={user.name}
                  userAvatarImageURL={user.avatarImageURL}
                  isEditable={user.id === appContext.currentUser?.uid}
                />
              ))}
            </Stack>
          ))}
        </HStack>
      </HStack>
      <UserModalProfile
        userName={user.name}
        userAvatarFileURL={user.avatarImageURL}
        isOpen={isOpenModalProfile}
        onClose={onCloseModalProfile}
        onChangeAvatarFileId={onChangeAvatarFileId}
        onChangeName={onChangeName}
      />
    </MainStack>
  )
}

UserPage.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>
}

export const getStaticPaths: GetStaticPaths<Paths> = async () => {
  const paths = [].map(() => {
    return { params: { login: "" } }
  })

  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps<Props, Paths> = async (context) => {
  if (typeof context.params?.login === "undefined") {
    throw new Error()
  }

  return {
    props: {},
  }
}

export default UserPage
