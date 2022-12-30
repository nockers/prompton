import type { BlitzPage } from "@blitzjs/auth"
import { HStack, Stack } from "@chakra-ui/react"
import { HomeLabelList } from "app/components/HomeLabelList"
import { HomeNotification } from "app/components/HomeNotification"
import { HomeWorkList } from "app/components/HomeWorkList"
import { MainStackJa } from "app/components/MainStackJa"

const RootPage: BlitzPage = () => {
  return (
    <MainStackJa title={null} description={null} fileId={null}>
      <HStack justifyContent={"flex-start"} w={"100%"} px={4}>
        <HomeNotification isJA={true} />
      </HStack>
      <Stack spacing={0} w={"100%"} alignItems={"center"}>
        <HomeLabelList />
        <HomeWorkList />
      </Stack>
    </MainStackJa>
  )
}

RootPage.getLayout = (page) => {
  return <>{page}</>
}

export default RootPage
