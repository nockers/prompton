import type { BlitzPage } from "@blitzjs/auth"
import {
  Button,
  Card,
  Checkbox,
  Divider,
  HStack,
  Icon,
  Link as ChakraLink,
  ListItem,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Spinner,
  Stack,
  Tag,
  Text,
  Textarea,
  UnorderedList,
  useToast,
} from "@chakra-ui/react"
import {
  getAuth,
  getIdTokenResult,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth"
import Link from "next/link"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import { FcGoogle } from "react-icons/fc"
import { UserRequestHeader } from "app/[login]/requests/components/UserRequestHeader"
import { MainStackJA } from "app/components/MainStackJa"
import { useRedirectResult } from "app/hooks/useRedirectResult"
import {
  useCreatePaymentMethodMutation,
  useCreateRequestMutation,
  useUserQuery,
  useViewerUserQuery,
} from "interface/__generated__/react"
import { AppContext } from "interface/contexts/appContext"

const UserRequestsNewPage: BlitzPage = () => {
  const appContext = useContext(AppContext)

  const router = useRouter()

  const [createRequest, { loading }] = useCreateRequestMutation()

  const { data: sender = null } = useViewerUserQuery({
    skip: appContext.currentUser === null,
  })

  const [createPaymentMethod] = useCreatePaymentMethodMutation()

  const [additionalFee, setAdditionalFee] = useState(() => {
    return 0
  })

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
            fee: 500,
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

  const onCreatePaymentMethod = async () => {
    try {
      const result = await createPaymentMethod({
        variables: {
          input: { requestRecipientId: userId! },
        },
      })
      const pageURL = result.data?.createPaymentMethod?.checkoutURL ?? null
      if (pageURL === null) {
        return null
      }
      location.replace(pageURL)
    } catch (error) {
      if (error instanceof Error) {
        toast({ status: "error", description: error.message })
      }
    }
  }

  const onLogout = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(getAuth(), provider)
      const idTokenResult = await getIdTokenResult(result.user)
      if (!idTokenResult.claims.isInitialized) {
        router.push("/new")
      }
      toast({ title: "アカウントを確認できました" })
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

  if (userId === null) {
    return null
  }

  if (isMyPage === null) {
    return null
  }

  if (data === null || data.user === null) {
    return (
      <HStack py={40} justifyContent={"center"}>
        <Spinner size={"xl"} />
      </HStack>
    )
  }

  const hasSender = sender !== null && sender.viewer.user !== null

  const isActive = sender !== null && sender.viewer.user.paymentMethod === null

  const isDisabled =
    typeof appContext.currentUser?.uid !== "string" || hasSender || !isActive

  const hasPaymentMethod =
    sender !== null &&
    sender.viewer.user !== null &&
    sender.viewer.user.paymentMethod === null

  const fee = data.user.minimumFee + additionalFee

  return (
    <MainStackJA title={null} description={null} fileId={null}>
      <Stack px={{ base: 4, md: 8 }} pt={{ base: 4, md: 8 }}>
        <UserRequestHeader userId={userId} />
      </Stack>
      <Divider />
      <HStack
        px={{ base: 4, md: 8 }}
        justifyContent={"center"}
        alignSelf={"center"}
      >
        <Stack
          direction={{ base: "column", lg: "row" }}
          w={"100%"}
          spacing={4}
          alignItems={{ base: "center", lg: "flex-start" }}
        >
          <Stack maxW={"container.md"} w={"100%"} spacing={4}>
            {!hasSender && (
              <Card
                variant={"filled"}
                borderColor={"red.200"}
                borderWidth={4}
                borderRadius={"xl"}
              >
                <Stack
                  justifyContent={"space-between"}
                  direction={{ base: "column", md: "row" }}
                  alignItems={{ base: "", md: "center" }}
                  p={6}
                  spacing={4}
                >
                  <Text fontWeight={"bold"}>
                    {"リクエストを送るにはログインが必要です。"}
                  </Text>
                  <Button
                    leftIcon={<Icon as={FcGoogle} />}
                    fontSize={14}
                    onClick={onLogout}
                    minW={28}
                    colorScheme={"primary"}
                  >
                    {"ログイン"}
                  </Button>
                </Stack>
              </Card>
            )}
            {hasSender && !hasPaymentMethod && (
              <Card
                variant={"filled"}
                borderColor={"red.200"}
                borderWidth={4}
                borderRadius={"xl"}
              >
                <Stack p={6} spacing={4}>
                  <Text fontWeight={"bold"}>
                    {"リクエストを送るにはお支払い方法の登録が必要です。"}
                  </Text>
                  <HStack justifyContent={"flex-end"}>
                    <Button colorScheme={"red"} onClick={onCreatePaymentMethod}>
                      {"お支払い方法を登録する"}
                    </Button>
                  </HStack>
                </Stack>
              </Card>
            )}
            <Card variant={"filled"} borderRadius={"xl"} borderWidth={4}>
              <Stack p={6}>
                <Stack>
                  <HStack justifyContent={"space-between"}>
                    <Text fontWeight={"bold"} fontSize={"lg"}>
                      {"新しいリクエスト"}
                    </Text>
                    <Tag colorScheme={"primary"}>{"イラスト"}</Tag>
                  </HStack>
                  <Text>
                    {`次の金額で「${data.user.name}」さんにイラストの制作をリクエストします。`}
                  </Text>
                  <Text fontWeight={"bold"} fontSize={"2xl"}>
                    {`料金 ${fee}円（税込）`}
                  </Text>
                  <RangeSlider
                    step={500}
                    min={0}
                    max={data.user.maximumFee - data.user.minimumFee}
                    value={[additionalFee]}
                    onChange={([value]) => {
                      setAdditionalFee(value)
                    }}
                  >
                    <RangeSliderTrack>
                      <RangeSliderFilledTrack />
                    </RangeSliderTrack>
                    <RangeSliderThumb index={0} />
                  </RangeSlider>
                  <Text
                    fontSize={"sm"}
                  >{`※最大${data.user.maximumFee}円まで増額できます。`}</Text>
                </Stack>
              </Stack>
            </Card>
            <Card variant={"filled"} borderRadius={"xl"} borderWidth={4}>
              <Stack p={6}>
                <Text fontWeight={"bold"} fontSize={"xl"}>
                  {"注意事項"}
                </Text>
                <UnorderedList pl={4}>
                  <ListItem>
                    {
                      "いかなる場合も作品の全ての権利は制作者にあり、権利を譲渡するといったことを要望に含めることは出来ません。"
                    }
                  </ListItem>
                  <ListItem>
                    {
                      "納品物の完成度は保証されずリテイクや返金を求めることはできません。"
                    }
                  </ListItem>
                  <ListItem>
                    {
                      "10日を経過しても納品物が確認できない場合は自動的に返金されます。"
                    }
                  </ListItem>
                  <ListItem>
                    {
                      "依頼が承認されるまでの期間は、依頼をキャンセルすることができ、依頼料は全額返金されます。"
                    }
                  </ListItem>
                </UnorderedList>
              </Stack>
            </Card>
          </Stack>
          <Stack maxW={"container.md"} w={"100%"} spacing={4}>
            <Card variant={"filled"} borderRadius={"xl"} borderWidth={4}>
              <Stack p={6} spacing={4}>
                <Text fontWeight={"bold"} fontSize={"xl"}>
                  {"リクエストの内容"}
                </Text>
                <Stack>
                  <Text>{"作品の内容についての要望を書いてください。"}</Text>
                  <Textarea
                    isDisabled={isDisabled}
                    placeholder={"例：白い背景でお願いします。（最大200文字）"}
                    rows={4}
                  />
                  <Text fontSize={"sm"} opacity={0.8}>
                    {"※全ての要望が作品に反映されるとは限りません。"}
                  </Text>
                </Stack>
                <Divider />
                <Stack>
                  <Text>{"以下のことを確認してください。"}</Text>
                  <Checkbox defaultChecked>
                    <Text as={"span"}>{"本サイトの"}</Text>
                    <ChakraLink as={Link} href={"/terms"} color={"blue.500"}>
                      {"利用規約"}
                    </ChakraLink>
                    <Text as={"span"}>{"に同意する。"}</Text>
                  </Checkbox>
                  <Checkbox defaultChecked>
                    {"制作物の全ての権利は制作者にあることに同意する。"}
                  </Checkbox>
                  <Checkbox defaultChecked>
                    {"制作者へ打ち合わせなどの連絡をしないことに同意する。"}
                  </Checkbox>
                </Stack>
                <Divider />
                <Stack>
                  <Text
                    fontSize={"sm"}
                    fontWeight={"bold"}
                    color={"primary.500"}
                  >
                    {`クリックすると${fee}円（税込）が決済されます。`}
                  </Text>
                  <Button
                    isDisabled={isDisabled}
                    isLoading={loading}
                    colorScheme={"primary"}
                    onClick={onCreateRequest}
                  >
                    {"決済する"}
                  </Button>
                </Stack>
              </Stack>
            </Card>
          </Stack>
        </Stack>
      </HStack>
    </MainStackJA>
  )
}

export default UserRequestsNewPage
