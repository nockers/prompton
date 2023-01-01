import type { BlitzPage } from "@blitzjs/auth"
import {
  Button,
  Card,
  Checkbox,
  Divider,
  HStack,
  ListItem,
  Stack,
  Tag,
  Text,
  Textarea,
  UnorderedList,
  useToast,
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useContext } from "react"
import { UserRequestHeader } from "app/[login]/requests/components/UserRequestHeader"
import { MainStack } from "app/components/MainStack"
import {
  useCreateRequestMutation,
  useUserQuery,
} from "interface/__generated__/react"
import { AppContext } from "interface/contexts/appContext"

const UserRequestsNewPage: BlitzPage = () => {
  const appContext = useContext(AppContext)

  const router = useRouter()

  const [createRequest, { loading }] = useCreateRequestMutation()

  const userId = router.query.login?.toString() ?? null

  const { data } = useUserQuery({
    skip: userId === null,
    variables: { id: userId! },
  })

  const isMyPage = router.query.login === appContext.currentUser?.uid

  const toast = useToast()

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

  if (userId === null) {
    return null
  }

  if (isMyPage === null) {
    return null
  }

  if (data === null || data?.user === null) {
    return null
  }

  return (
    <MainStack title={null} description={null} fileId={null}>
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
            <Card variant={"filled"} borderRadius={"xl"}>
              <Stack p={6}>
                <Stack>
                  <HStack justifyContent={"space-between"}>
                    <Text fontWeight={"bold"} fontSize={"lg"}>
                      {"おまかせリクエストで支援"}
                    </Text>
                    <Tag colorScheme={"primary"}>{"イラスト"}</Tag>
                  </HStack>
                  <Text fontWeight={"bold"} fontSize={"2xl"}>
                    {`${data?.user.minimumFee}〜${data?.user.maximumFee}円（税込）`}
                  </Text>
                  <Text>
                    {
                      "この依頼では制作者がおまかせで作品を制作します。制作物の内容について要望を提示できますが、反映されるかどうかは制作者の判断に委ねられます。"
                    }
                  </Text>
                </Stack>
              </Stack>
            </Card>
            <Card variant={"filled"} borderRadius={"xl"}>
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
            <Card variant={"filled"} borderRadius={"xl"}>
              <Stack p={6} spacing={4}>
                <Text fontWeight={"bold"} fontSize={"xl"}>
                  {"新しいリクエスト"}
                </Text>
                <Stack>
                  <Text>{"作品の内容についての要望を書いてください。"}</Text>
                  <Textarea
                    placeholder={"例：白い背景でお願いします。（最大200文字）"}
                    rows={4}
                  />
                  <Text fontSize={"sm"}>
                    {"※全ての要望が作品に反映されるとは限りません。"}
                  </Text>
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
                  <Checkbox defaultChecked>
                    {"制作者へ打ち合わせなどの連絡をしないことに同意する。"}
                  </Checkbox>
                </Stack>
                <Divider />
                <Stack>
                  <Text fontSize={"sm"}>
                    {"決済方法の登録が完了するとリクエストが送信されます。"}
                  </Text>
                  <HStack>
                    <Button
                      isLoading={loading}
                      colorScheme={"primary"}
                      onClick={onCreateRequest}
                    >
                      {"決済方法を登録する"}
                    </Button>
                  </HStack>
                </Stack>
              </Stack>
            </Card>
          </Stack>
        </Stack>
      </HStack>
    </MainStack>
  )
}

export default UserRequestsNewPage
