import type { BlitzPage } from "@blitzjs/auth"
import { Box, Divider, Stack, Tab, TabList, Tabs } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { HomeLabelList } from "app/components/HomeLabelList"
import { HomeWorkList } from "app/components/HomeWorkList"
import { MainStack } from "app/components/MainStack"

const RootPage: BlitzPage = () => {
  const router = useRouter()

  const onChange = (index: number) => {
    if (index === 1) {
      router.push("/requests")
    }
    if (index === 2) {
      router.push("/users")
    }
  }

  return (
    <MainStack title={null} description={null} fileId={null}>
      <Tabs
        index={0}
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
      <Stack spacing={{ base: 0, lg: 4 }}>
        <HomeLabelList />
        <Box px={{ base: 4, md: 8 }}>
          <HomeWorkList />
        </Box>
      </Stack>
    </MainStack>
  )
}

RootPage.getLayout = (page) => {
  return <>{page}</>
}

export default RootPage
