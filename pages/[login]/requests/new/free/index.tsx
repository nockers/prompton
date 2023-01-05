import type { BlitzPage } from "@blitzjs/auth"
import {
  Button,
  Card,
  Checkbox,
  Divider,
  HStack,
  Stack,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useContext, useEffect } from "react"
import { MainStackJA } from "app/components/MainStackJA_"
import { useRedirectResult } from "app/hooks/useRedirectResult"
import {
  useCreatePaymentMethodMutation,
  useCreateRequestMutation,
  useUserQuery,
  useViewerUserQuery,
} from "interface/__generated__/react"
import { AppContext } from "interface/contexts/appContext"

const UserRequestsNewFreePage: BlitzPage = () => {
  const appContext = useContext(AppContext)

  const router = useRouter()

  const [createRequest, { loading }] = useCreateRequestMutation()

  const { data: sender = null } = useViewerUserQuery({
    skip: appContext.currentUser === null,
  })

  const [createPaymentMethod] = useCreatePaymentMethodMutation()

  const userId = router.query.login?.toString() ?? null

  const { data = null } = useUserQuery({
    skip: userId === null,
    variables: { id: userId! },
  })

  useEffect(() => {
    if (typeof window === "undefined") return
    if (location.search.includes("success")) {
      toast({ status: "success", description: "お支払い方法を登録しました。" })
    }
    if (location.search.includes("cancel")) {
      toast({
        status: "error",
        description: "お支払い方法の登録がキャンセルされました。",
      })
    }
    setTimeout(() => {
      history.replaceState({}, document.title, location.pathname)
    }, 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const isMyPage = router.query.login === appContext.currentUser?.uid

  const toast = useToast()

  useRedirectResult({
    onSuccess() {
      toast({ status: "success", description: "お支払い方法を登録しました。" })
    },
    onCancel() {
      toast({
        status: "error",
        description: "お支払い方法の登録がキャンセルされました。",
      })
    },
  })

  const onCreateRequest = async () => {
    if (userId === null) return
    try {
      const { data = null } = await createRequest({
        variables: {
          input: {
            planId: null,
            fee: 0,
            note: "test",
            recipientId: userId,
          },
        },
      })
      const requestId = data?.createRequest.id ?? null
      if (requestId === null) return
      router.replace(`/viewer/requests/${requestId}`)
      toast({ description: "リクエストを送信しました", status: "success" })
    } catch (error) {
      if (error instanceof Error) {
        toast({ description: error.message, status: "error" })
      }
    }
  }

  if (userId === null) {
    return null
  }

  if (isMyPage === null) {
    return null
  }

  if (
    data === null ||
    data.user === null ||
    sender === null ||
    sender.viewer === null
  ) {
    return null
  }

  return (
    <MainStackJA title={"リクエスト"} description={null} fileId={null}>
      <HStack justifyContent={"center"} px={{ base: 4, md: 8 }}>
        <Stack w={"100%"} maxW={"container.md"} spacing={{ base: 4, md: 8 }}>
          <Stack pt={{ base: 4, md: 8 }}>
            <Text fontWeight={"bold"} fontSize={"xl"}>
              {"新しいリクエスト"}
            </Text>
          </Stack>
          <Divider />
          <Stack w={"100%"} spacing={4}>
            <Card variant={"filled"} borderRadius={"xl"}>
              <Stack p={6} spacing={4}>
                <Stack>
                  <Text>{"どのようなイラストが希望ですか？"}</Text>
                  <Textarea
                    placeholder={"例：白い背景でお願いします。（最大200文字）"}
                    rows={4}
                  />
                </Stack>
                <Divider />
                <Stack>
                  <Text>{"以下のことを確認してください。"}</Text>
                  <Checkbox defaultChecked>
                    {"本サイトの利用規約に同意する。"}
                  </Checkbox>
                  <Checkbox defaultChecked>
                    {"制作物の全ての権利は制作者にあることに同意する。"}
                  </Checkbox>
                </Stack>
                <Divider />
                <Stack>
                  <HStack>
                    <Button
                      isLoading={loading}
                      colorScheme={"primary"}
                      onClick={onCreateRequest}
                    >
                      {"リクエストする"}
                    </Button>
                  </HStack>
                </Stack>
              </Stack>
            </Card>
          </Stack>
        </Stack>
      </HStack>
    </MainStackJA>
  )
}

export default UserRequestsNewFreePage
