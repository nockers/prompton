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
import { HomeWorkList } from "app/components/HomeWorkList"
import { MainStack } from "app/components/MainStack"
import { HomeUserList } from "app/users/components/HomeUserList"

const RootPage: BlitzPage = () => {
  const [tabIndex, setTabIndex] = useState(0)

  const onChange = (index: number) => {
    setTabIndex(index)
  }

  return (
    <MainStack title={null} description={null} fileId={null}>
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
        <Divider pt={4} />
        <TabPanels>
          <TabPanel px={0}>
            <Stack spacing={4}>
              <HStack justifyContent={"flex-start"} w={"100%"} px={4}>
                <HomeNotification isJA={false} />
              </HStack>
              <Stack spacing={0} w={"100%"}>
                <HomeLabelList />
                <HomeWorkList />
              </Stack>
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
