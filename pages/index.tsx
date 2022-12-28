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
} from "@chakra-ui/react"
import { useState } from "react"
import { HomeLabelList } from "app/components/HomeLabelList"
import { HomeNotification } from "app/components/HomeNotification"
import { HomePostList } from "app/components/HomePostList"
import { MainStack } from "app/components/MainStack"
import { HomeUserList } from "app/users/components/HomeUserList"

const RootPage: BlitzPage = () => {
  const [tabIndex, setTabIndex] = useState(0)

  const onChange = (index: number) => {
    setTabIndex(index)
  }

  return (
    <MainStack title={null} description={null} fileId={null}>
      <HStack justifyContent={"flex-start"} w={"100%"} px={4}>
        <HomeNotification isJA={false} />
      </HStack>
      <Divider />
      <Tabs
        index={tabIndex}
        size={"sm"}
        variant={"soft-rounded"}
        onChange={onChange}
      >
        <TabList px={4}>
          <Tab>{"投稿"}</Tab>
          <Tab>{"リクエスト"}</Tab>
          <Tab>{"ユーザ"}</Tab>
        </TabList>
        <TabPanels>
          <TabPanel px={0}>
            <Stack spacing={0} w={"100%"}>
              <HomeLabelList />
              <HomePostList />
            </Stack>
          </TabPanel>
          <TabPanel px={0}>
            <Stack spacing={0} w={"100%"}></Stack>
          </TabPanel>
          <TabPanel px={0}>
            <Stack spacing={0} w={"100%"}>
              <HomeUserList />
            </Stack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </MainStack>
  )
}

RootPage.getLayout = (page) => {
  return <>{page}</>
}

export default RootPage
