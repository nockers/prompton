import type { BlitzPage } from "@blitzjs/auth"
import { Divider, Stack, Tab, TabList, Tabs } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { MainStack } from "app/components/MainStack"

const RequestsPage: BlitzPage = () => {
  const router = useRouter()

  const onChange = (index: number) => {
    if (index === 0) {
      router.push("/")
    }
    if (index === 2) {
      router.push("/users")
    }
  }

  return (
    <MainStack title={null} description={null} fileId={null}>
      <Tabs
        index={1}
        pt={{ base: 4, md: 8 }}
        size={"sm"}
        variant={"soft-rounded"}
        onChange={onChange}
      >
        <TabList px={{ base: 4, md: 8 }}>
          <Tab>{"投稿"}</Tab>
          <Tab>{"リクエスト"}</Tab>
          <Tab>{"ユーザ"}</Tab>
        </TabList>
      </Tabs>
      <Divider />
      <Stack spacing={0} w={"100%"} px={{ base: 4, md: 8 }}></Stack>
    </MainStack>
  )
}

RequestsPage.getLayout = (page) => {
  return <>{page}</>
}

export default RequestsPage
