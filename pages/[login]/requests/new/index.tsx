import type { BlitzPage } from "@blitzjs/auth"
import { Divider, HStack, Stack, useToast } from "@chakra-ui/react"
import {
  getAuth,
  getIdTokenResult,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import { UserRequestHeader } from "app/[login]/requests/components/UserRequestHeader"
import { CardRequestDisabled } from "app/[login]/requests/new/components/CardRequestDisabled"
import { CardRequestFee } from "app/[login]/requests/new/components/CardRequestFee"
import { CardRequestLogin } from "app/[login]/requests/new/components/CardRequestLogin"
import { CardRequestNote } from "app/[login]/requests/new/components/CardRequestNote"
import { CardRequestPayment } from "app/[login]/requests/new/components/CardRequestPayment"
import { CardRequestSubmit } from "app/[login]/requests/new/components/CardRequestSubmit"
import { MainStackJA } from "app/components/MainStackJa"
import { useRedirectResult } from "app/hooks/useRedirectResult"
import RootLoading from "app/loading"
import {
  useCreatePaymentMethodMutation,
  useCreateRequestMutation,
  useUserQuery,
  useViewerUserQuery,
} from "interface/__generated__/react"
import { Config } from "interface/config"
import { AppContext } from "interface/contexts/appContext"

const UserRequestsNewPage: BlitzPage = () => {
  const appContext = useContext(AppContext)

  const router = useRouter()

  const [note, setNote] = useState("")

  const [createRequest, { loading: isLoading }] = useCreateRequestMutation()

  const { data: sender = null, loading: isLoadingSender } = useViewerUserQuery({
    skip: appContext.currentUser === null,
  })

  const [createPaymentMethod, { loading: isCreatingPaymentMethod }] =
    useCreatePaymentMethodMutation()

  const [additionalFee, setAdditionalFee] = useState(() => {
    return 0
  })

  const userId = router.query.login?.toString() ?? null

  const { data = null, loading: isLoadingRecipient } = useUserQuery({
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
    }, 100)
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
          input: { planId: null, fee: fee, note: note, recipientId: userId },
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

  const onLogin = async () => {
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

  if (appContext.isLoading || isLoadingSender || isLoadingRecipient) {
    return <RootLoading />
  }

  if (data === null || data.user === null) {
    return null
  }

  const hasSender = sender !== null && sender.viewer.user !== null

  const isActive = sender !== null && sender.viewer.user.paymentMethod !== null

  const isDisabled =
    typeof appContext.currentUser?.uid !== "string" || !hasSender || !isActive

  const hasPaymentMethod =
    sender !== null &&
    sender.viewer.user !== null &&
    sender.viewer.user.paymentMethod !== null

  const fee = data.user.minimumFee + additionalFee

  return (
    <MainStackJA pageTitle={null} pageDescription={null} fileId={null}>
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
            {!Config.featureRequest && <CardRequestDisabled />}
            {!hasSender && <CardRequestLogin onLogin={onLogin} />}
            {hasSender && !hasPaymentMethod && (
              <CardRequestPayment
                onCreatePaymentMethod={onCreatePaymentMethod}
                isLoading={isCreatingPaymentMethod}
              />
            )}
            <CardRequestFee
              userName={data.user.name}
              fee={fee}
              maximumFee={data.user.maximumFee}
              minimumFee={data.user.minimumFee}
              additionalFee={additionalFee}
              onChangeAdditionalFee={setAdditionalFee}
            />
            <CardRequestNote />
          </Stack>
          <Stack maxW={"container.md"} w={"100%"} spacing={4}>
            <CardRequestSubmit
              fee={fee}
              note={note}
              isDisabled={isDisabled}
              isLoading={isLoading}
              onChangeNote={setNote}
              onCreateRequest={onCreateRequest}
            />
          </Stack>
        </Stack>
      </HStack>
    </MainStackJA>
  )
}

export default UserRequestsNewPage
