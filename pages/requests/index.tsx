import type { BlitzPage } from "@blitzjs/auth"
import { Divider, HStack } from "@chakra-ui/react"
import { HomeNotification } from "app/components/HomeNotification"
import { MainStack } from "app/components/MainStack"

const RequestsPage: BlitzPage = () => {
  return (
    <MainStack title={null} description={null} fileId={null}>
      <HStack justifyContent={"flex-start"} w={"100%"} px={4}>
        <HomeNotification isJA={false} />
      </HStack>
      <Divider />
    </MainStack>
  )
}

RequestsPage.getLayout = (page) => {
  return <>{page}</>
}

export default RequestsPage
