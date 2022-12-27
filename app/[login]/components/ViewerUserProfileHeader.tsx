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
  Skeleton,
  SkeletonCircle,
  useColorModeValue,
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import type { FC } from "react"
import { useContext } from "react"
import { BiEdit } from "react-icons/bi"
import { UserAvatarDropzone } from "app/[login]/components/UserAvatarDropzone"
import { useFileUpload } from "app/hooks/useFileUpload"
import {
  useUpdateUserMutation,
  useUserQuery,
} from "interface/__generated__/react"
import { AppContext } from "interface/contexts/appContext"

type Props = {
  userId: string
}

export const ViewerUserProfileHeader: FC<Props> = (props) => {
  const appContext = useContext(AppContext)

  const backgroundColor = useColorModeValue("gray.50", "gray.700")

  const router = useRouter()

  const {
    isOpen: isEditMode,
    onOpen: onOpenEditor,
    onClose: onCloseEditor,
  } = useDisclosure()

  const [updateUser] = useUpdateUserMutation()

  const {
    data = null,
    loading,
    refetch,
  } = useUserQuery({ variables: { id: props.userId } })

  const [uploadFile] = useFileUpload()

  const toast = useToast()

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
    if (isEditMode) {
      onCloseEditor()
      return
    }
    onOpenEditor()
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

  const user = data?.user ?? null

  const isEditable = router.query.login === appContext.currentUser?.uid

  return (
    <HStack justifyContent={"center"}>
      <Box px={4} w={"100%"}>
        <HStack
          spacing={4}
          py={4}
          px={isEditMode ? 4 : 0}
          borderRadius={"lg"}
          justifyContent={"space-between"}
          alignItems={"flex-start"}
          background={isEditMode ? backgroundColor : "transparent"}
        >
          {isEditMode && user && (
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
          {!isEditMode && (
            <Stack flex={1}>
              <HStack flex={1} spacing={4}>
                <SkeletonCircle
                  size={"16"}
                  isLoaded={!loading && user !== null}
                >
                  <Avatar size={"lg"} src={user?.avatarImageURL || ""} />
                </SkeletonCircle>
                <Stack spacing={1}>
                  <Skeleton isLoaded={!loading && user !== null}>
                    <Text
                      fontSize={"xs"}
                      fontWeight={"bold"}
                      opacity={0.8}
                      minW={40}
                    >
                      {`@${user?.id.slice(0, 8)}`}
                    </Text>
                  </Skeleton>
                  <Skeleton isLoaded={!loading && user !== null}>
                    <Text fontSize={"2xl"} lineHeight={1} fontWeight={"bold"}>
                      {user?.name ?? "-"}
                    </Text>
                  </Skeleton>
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
                {isEditMode ? "閉じる" : "編集"}
              </Button>
            </Stack>
          )}
        </HStack>
      </Box>
    </HStack>
  )
}
