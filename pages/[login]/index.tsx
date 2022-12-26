import type { BlitzPage } from "@blitzjs/auth"
import {
  Box,
  HStack,
  Stack,
  useDisclosure,
  useToast,
  Text,
  Input,
  Button,
  Avatar,
} from "@chakra-ui/react"
import type { GetStaticPaths, GetStaticProps } from "next"
import { useRouter } from "next/router"
import { useContext, useState } from "react"
import { BiEdit } from "react-icons/bi"
import { UploadDropzone } from "app/[login]/components/UploadDropzone"
import { UserAvatarDropzone } from "app/[login]/components/UserAvatarDropzone"
import UserLayout from "app/[login]/layout"
import UserLoading from "app/[login]/loading"
import { CardPost } from "app/components/CardPost"
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
      console.error(error)
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
    if (isOpenModalProfile) {
      onCloseModalProfile()
      return
    }
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

  if (
    router.isFallback ||
    typeof router.query.login === "undefined" ||
    loading
  ) {
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
      <HStack justifyContent={"center"}>
        <Box px={4} w={"100%"}>
          <HStack
            spacing={4}
            py={4}
            px={isOpenModalProfile ? 4 : 0}
            borderRadius={"lg"}
            justifyContent={"space-between"}
            alignItems={"flex-start"}
            background={isOpenModalProfile ? "blackAlpha.200" : "transparent"}
          >
            {isOpenModalProfile && (
              <Stack flex={1} borderRadius={"lg"}>
                <Text>{"プロフィール更新"}</Text>
                <HStack spacing={4} flex={1}>
                  <UserAvatarDropzone
                    avatarImageURL={user.avatarImageURL}
                    isLoading={false}
                    onChange={onChangeAvatarFileId}
                  />
                  <Stack w={"100%"} maxW={"sm"}>
                    <Input
                      placeholder={"ユーザ名"}
                      defaultValue={user.name}
                      onBlur={(event) => {
                        onChangeName(event.target.value)
                      }}
                    />
                  </Stack>
                </HStack>
              </Stack>
            )}
            {!isOpenModalProfile && (
              <Stack flex={1}>
                <HStack flex={1} spacing={4}>
                  <Avatar size={"lg"} src={user.avatarImageURL || ""} />
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
            {isEditable && (
              <Stack alignItems={"flex-start"}>
                <Button
                  aria-label={""}
                  size={"sm"}
                  rightIcon={<BiEdit />}
                  onClick={onEditProfile}
                >
                  {isOpenModalProfile ? "閉じる" : "プロフィール編集"}
                </Button>
              </Stack>
            )}
          </HStack>
        </Box>
      </HStack>
      {isEditable && (
        <HStack justifyContent={"center"} px={4} w={"100%"}>
          <UploadDropzone isLoading={isLoading} onChange={onUploadFiles} />
        </HStack>
      )}
      <HStack w={"100%"} justifyContent={"center"}>
        <HStack px={4} alignItems={"flex-start"} spacing={4}>
          {toColumnArray(user.works, columnCount).map((column, index) => (
            <Stack key={index} spacing={4}>
              {column.map((work) => (
                <CardPost
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
                    label.nameJA || label.name,
                    label.count,
                  ])}
                  postColors={work.colors}
                  postWebColors={work.webColors}
                  userId={user.id}
                  userName={user.name}
                  userAvatarImageURL={user.avatarImageURL}
                  isLiked={false}
                  isBookmarked={false}
                  isFollower={false}
                  isEditable={user.id === appContext.currentUser?.uid}
                />
              ))}
            </Stack>
          ))}
        </HStack>
      </HStack>
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
