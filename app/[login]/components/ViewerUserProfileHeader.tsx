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
  Textarea,
} from "@chakra-ui/react"
import type { FC } from "react"
import { BiCheck, BiPaint } from "react-icons/bi"
import { UserAvatarDropzone } from "app/[login]/components/UserAvatarDropzone"
import { useFileUpload } from "app/hooks/useFileUpload"
import {
  useUpdateUserProfileMutation,
  useUserQuery,
} from "interface/__generated__/react"

type Props = {
  userId: string
}

export const ViewerUserProfileHeader: FC<Props> = (props) => {
  const {
    isOpen: isEditMode,
    onOpen: onOpenEditor,
    onClose: onCloseEditor,
  } = useDisclosure()

  const [updateUserProfile] = useUpdateUserProfileMutation()

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
      await updateUserProfile({
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
      await updateUserProfile({
        variables: {
          input: {
            avatarFileId: data?.user?.avatarImageId ?? null,
            headerImageId: data?.user?.headerImageId ?? null,
            biography: data?.user?.biography ?? "",
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

  const onChangeBiography = async (biography: string) => {
    try {
      await updateUserProfile({
        variables: {
          input: {
            avatarFileId: data?.user?.avatarImageId ?? null,
            headerImageId: data?.user?.headerImageId ?? null,
            biography: biography,
            name: data?.user?.name ?? "",
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

  return (
    <Stack w={"100%"} spacing={4}>
      <HStack>
        <Button
          aria-label={""}
          size={"sm"}
          rightIcon={isEditMode ? <BiCheck /> : <BiPaint />}
          onClick={onEditProfile}
        >
          {isEditMode ? "編集を終了する" : "このページを編集する"}
        </Button>
      </HStack>
      <HStack
        spacing={4}
        justifyContent={"space-between"}
        alignItems={"flex-start"}
      >
        {isEditMode && (
          <Stack flex={1} borderRadius={"lg"}>
            <HStack spacing={4} flex={1}>
              <UserAvatarDropzone
                avatarImageURL={user!.avatarImageURL}
                isLoading={false}
                onChange={onChangeAvatarFileId}
              />
              <Stack w={"100%"} maxW={"sm"}>
                <Input
                  placeholder={"ユーザ名"}
                  defaultValue={user!.name}
                  onBlur={(event) => {
                    onChangeName(event.target.value)
                  }}
                />
              </Stack>
            </HStack>
          </Stack>
        )}
        {!isEditMode && (
          <HStack flex={1} spacing={4}>
            <SkeletonCircle size={"16"} isLoaded={!loading && user !== null}>
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
        )}
      </HStack>
      {!isEditMode && data?.user?.biography?.length !== 0 && (
        <Box>
          <Text>{data?.user?.biography}</Text>
        </Box>
      )}
      {isEditMode && (
        <Textarea
          defaultValue={data?.user?.biography}
          onBlur={(event) => {
            onChangeBiography(event.target.value)
          }}
        />
      )}
    </Stack>
  )
}
