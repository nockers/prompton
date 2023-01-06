import type { BlitzPage } from "@blitzjs/auth"
import {
  Button,
  Card,
  Divider,
  HStack,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react"
import { useContext } from "react"
import { MainStackJA } from "app/components/MainStackJa"
import { useRedirectResult } from "app/hooks/useRedirectResult"
import {
  useCreatePaymentMethodMutation,
  useDeletePaymentMethodMutation,
  useViewerUserQuery,
} from "interface/__generated__/react"
import { AppContext } from "interface/contexts/appContext"

const UserPaymentsPage: BlitzPage = () => {
  const appContext = useContext(AppContext)

  const { data = null, refetch } = useViewerUserQuery({
    skip: appContext.currentUser === null,
  })

  const [createPaymentMethod, { loading: isCreating }] =
    useCreatePaymentMethodMutation()

  const [deletePaymentMethod, { loading: isDeleting }] =
    useDeletePaymentMethodMutation()

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

  const onDeletePaymentMethod = async () => {
    try {
      await deletePaymentMethod()
      await refetch()
      toast({ status: "success", description: "決済方法を削除しました。" })
    } catch (error) {
      if (error instanceof Error) {
        toast({ status: "error", description: error.message })
      }
    }
  }

  const onCreatePaymentMethod = async () => {
    try {
      const result = await createPaymentMethod({
        variables: {
          input: {
            requestRecipientId: null,
          },
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

  if (data === null) {
    return null
  }

  const paymentMethod = data.viewer.user.paymentMethod

  return (
    <MainStackJA pageTitle={"お支払い"} pageDescription={null} fileId={null}>
      <HStack justifyContent={"center"} px={{ base: 4, md: 8 }}>
        <Stack w={"100%"} maxW={"container.md"} spacing={{ base: 4, md: 8 }}>
          <Stack pt={{ base: 4, md: 8 }}>
            <Text fontWeight={"bold"} fontSize={"xl"}>
              {"お支払い"}
            </Text>
          </Stack>
          <Divider />
          {paymentMethod !== null && (
            <Stack spacing={4}>
              <HStack>
                <Text>{"お支払い方法が登録されています。"}</Text>
                <Button
                  isLoading={isDeleting}
                  size={"sm"}
                  onClick={onDeletePaymentMethod}
                >
                  {"削除する"}
                </Button>
              </HStack>
              <Card
                maxW={"sm"}
                variant={"filled"}
                p={6}
                w={"100%"}
                borderRadius={"xl"}
                bg={"linear-gradient(45deg, #475569, #18181b)"}
                color={"white"}
                boxShadow={"md"}
              >
                <Stack spacing={16}>
                  <HStack justifyContent={"flex-end"} alignItems={"center"}>
                    <Text fontSize={"sm"}>
                      {paymentMethod.isLiveMode ? "" : "検証環境"}
                    </Text>
                    <Text fontSize={"lg"} fontWeight={"bold"}>
                      {`${paymentMethod.cardBrand.toUpperCase()}`}
                    </Text>
                  </HStack>
                  <Stack spacing={8}>
                    <Text fontSize={24} fontWeight={"bold"}>
                      {`xxxx xxxx xxxx ${paymentMethod.cardLast4}`}
                    </Text>
                    <HStack justifyContent={"space-between"}>
                      <Text>{`${paymentMethod.cardFunding}`}</Text>
                      <Text>{`${paymentMethod.cardExpMonth}/${paymentMethod.cardExpYear}`}</Text>
                    </HStack>
                  </Stack>
                </Stack>
              </Card>
            </Stack>
          )}
          {paymentMethod === null && (
            <Card
              variant={"filled"}
              p={6}
              w={"100%"}
              maxW={"container.md"}
              borderRadius={"xl"}
            >
              <Stack spacing={4}>
                <Text>{"お支払い方法が登録されていません。"}</Text>
                <HStack justifyContent={"flex-end"}>
                  <Button
                    isLoading={isCreating}
                    colorScheme={"primary"}
                    onClick={onCreatePaymentMethod}
                  >
                    {"登録する"}
                  </Button>
                </HStack>
              </Stack>
            </Card>
          )}
          <Divider />
          <Text>{"まだ決済履歴はありません。"}</Text>
        </Stack>
      </HStack>
    </MainStackJA>
  )
}

export default UserPaymentsPage
