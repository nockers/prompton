import type { BlitzPage } from "@blitzjs/auth"
import { Box, Stack } from "@chakra-ui/react"
import { HomeLabelList } from "app/components/HomeLabelList"
import { HomeNotification } from "app/components/HomeNotification"
import { HomePostList } from "app/components/HomePostList"
import { MainStack } from "app/components/MainStack"

const RootPage: BlitzPage = () => {
  return (
    <MainStack title={null} description={null} fileId={null}>
      <Box px={4} w={"100%"} maxW={"container.xl"}>
        <HomeNotification isJA={false} />
      </Box>
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
