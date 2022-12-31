import type { BlitzPage } from "@blitzjs/auth"
import {
  Divider,
  HStack,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useToast,
} from "@chakra-ui/react"
import { useContext } from "react"
import { MainStack } from "app/components/MainStack"
import ViewerLayout from "app/viewer/layout"
import { CardViewerReceivedRequest } from "app/viewer/requests/components/CardViewerReceivedRequest"
import { CardViewerRequest } from "app/viewer/requests/components/CardViewerRequest"
import { CardViewerRequestSettings } from "app/viewer/requests/components/CardViewerRequestSettings"
import {
  useUpdateUserRequestSettingsMutation,
  useViewerReceivedRequestsQuery,
  useViewerSentRequestsQuery,
  useViewerUserQuery,
} from "interface/__generated__/react"
import { AppContext } from "interface/contexts/appContext"

const ViewerRequestsPage: BlitzPage = () => {
  const appContext = useContext(AppContext)

  const { data = null, refetch } = useViewerUserQuery({
    skip: appContext.currentUser === null,
  })

  const { data: sentRequests = null } = useViewerSentRequestsQuery({
    skip: appContext.currentUser === null,
  })

  const { data: receivedRequests = null } = useViewerReceivedRequestsQuery({
    skip: appContext.currentUser === null,
  })

  const [updateUserSettings] = useUpdateUserRequestSettingsMutation()

  const toast = useToast()

  const onMarkAsRequestable = async (isRequestable: boolean) => {
    if (data === null) return
    try {
      await updateUserSettings({
        variables: {
          input: {
            minimumFee: data.viewer.user.minimumFee,
            maximumFee: data.viewer.user.maximumFee,
            isRequestable,
          },
        },
      })
      if (isRequestable) {
        toast({ status: "success", description: "リクエストを有効にしました" })
      }
      if (!isRequestable) {
        toast({ status: "success", description: "リクエストを無効にしました" })
      }
      await refetch()
    } catch (error) {
      if (error instanceof Error) {
        toast({ status: "error", description: error.message })
      }
    }
  }

  const onUpdateUserSettings = async (
    minimumFee: number,
    maximumFee: number,
  ) => {
    if (data === null) return
    try {
      await updateUserSettings({
        variables: {
          input: {
            minimumFee,
            maximumFee,
            isRequestable: data.viewer.user.isRequestable,
          },
        },
      })
    } catch (error) {
      if (error instanceof Error) {
        toast({ status: "error", description: error.message })
      }
    }
  }

  if (data === null) {
    return null
  }

  return (
    <MainStack title={"リクエスト"} description={null} fileId={null}>
      <HStack justifyContent={"center"} px={{ base: 4, md: 8 }}>
        <Stack w={"100%"} maxW={"container.md"} spacing={{ base: 4, md: 8 }}>
          <Stack pt={{ base: 4, md: 8 }}>
            <Text fontWeight={"bold"} fontSize={"xl"}>
              {"リクエスト"}
            </Text>
            <Text fontSize={"sm"}>
              {
                "リクエストを有効にするとユーザから制作のリクエストと支援を受けることができます。"
              }
            </Text>
          </Stack>
          <Divider />
          <CardViewerRequestSettings
            isRequestable={data.viewer.user.isRequestable}
            minimumFee={data.viewer.user.minimumFee}
            maximumFee={data.viewer.user.maximumFee}
            onChangeFeeRange={(minimumFee, maximumFee) => {
              onUpdateUserSettings(minimumFee, maximumFee)
            }}
            onMarkAsRequestable={(isRequestable) => {
              onMarkAsRequestable(isRequestable)
            }}
          />
          <Tabs variant={"soft-rounded"}>
            <TabList>
              <Tab>{"受け取った"}</Tab>
              <Tab>{"送った"}</Tab>
            </TabList>
            <TabPanels>
              <TabPanel px={0}>
                <Stack spacing={4}>
                  {receivedRequests?.viewer?.receivedRequests.map((request) => (
                    <CardViewerReceivedRequest
                      key={request.id}
                      fee={2000}
                      createdAt={0}
                      isPending={true}
                      isAccepted={false}
                      isRejected={false}
                      isCompleted={false}
                      isCanceled={false}
                      isCanceledBySystem={false}
                      isCanceledByCreator={false}
                      isTimeout={false}
                    />
                  ))}
                </Stack>
              </TabPanel>
              <TabPanel px={0}>
                <Stack spacing={4}>
                  {sentRequests?.viewer?.sentRequests.map((request) => (
                    <CardViewerRequest
                      key={request.id}
                      fee={2000}
                      createdAt={0}
                      isPending={true}
                      isAccepted={false}
                      isRejected={false}
                      isCompleted={false}
                      isCanceled={false}
                      isCanceledBySystem={false}
                      isCanceledByCreator={false}
                      isTimeout={false}
                    />
                  ))}
                </Stack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Stack>
      </HStack>
    </MainStack>
  )
}

ViewerRequestsPage.getLayout = (page) => {
  return <ViewerLayout>{page}</ViewerLayout>
}

export default ViewerRequestsPage
