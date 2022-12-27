import type { BlitzPage } from "@blitzjs/auth"
import { Divider, HStack, Stack } from "@chakra-ui/react"
import { HomeLabelList } from "app/components/HomeLabelList"
import { HomeNotification } from "app/components/HomeNotification"
import { HomePostList } from "app/components/HomePostList"
import { HomeTabs } from "app/components/HomeTabs"
import { MainStack } from "app/components/MainStack"

const RootPage: BlitzPage = () => {
  return (
    <MainStack title={null} description={null} fileId={null}>
      <HStack justifyContent={"flex-start"} w={"100%"} px={4}>
        <HomeNotification isJA={false} />
      </HStack>
      <HomeTabs index={0} />
      <Divider />
      <Stack spacing={0} w={"100%"} alignItems={"center"}>
        <HomeLabelList />
        <HomePostList />
      </Stack>
    </MainStack>
  )
}

RootPage.getLayout = (page) => {
  return <>{page}</>
}

export default RootPage
