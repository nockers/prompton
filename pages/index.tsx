import type { BlitzPage } from "@blitzjs/auth"
import {
  Box,
  Divider,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react"
import { useState } from "react"
import { HomeLabelList } from "app/components/HomeLabelList"
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
        <TabList px={{ base: 4, md: 8 }} pt={{ base: 4, md: 8 }}>
          <Tab>{"投稿"}</Tab>
          <Tab>{"リクエスト"}</Tab>
          <Tab>{"ユーザ"}</Tab>
        </TabList>
        <Divider pt={{ base: 4, md: 8 }} />
        <TabPanels>
          <TabPanel p={0}>
            <Stack spacing={{ base: 0, lg: 4 }} pt={{ base: 4, md: 8 }}>
              <HomeLabelList />
              <Box px={{ base: 4, md: 8 }}>
                <HomeWorkList />
              </Box>
            </Stack>
          </TabPanel>
          <TabPanel p={0}>
            <Stack
              spacing={0}
              w={"100%"}
              px={{ base: 4, md: 8 }}
              pt={{ base: 4, md: 8 }}
            ></Stack>
          </TabPanel>
          <TabPanel p={0}>
            <Stack
              spacing={0}
              w={"100%"}
              px={{ base: 4, md: 8 }}
              pt={{ base: 4, md: 8 }}
            >
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
