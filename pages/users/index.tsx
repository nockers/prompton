import type { BlitzPage } from "@blitzjs/auth"
import { HStack } from "@chakra-ui/react"
import { HomeNotification } from "app/components/HomeNotification"
import { MainStack } from "app/components/MainStack"
import { HomeUserList } from "app/users/components/HomeUserList"

const UsersPage: BlitzPage = () => {
  return (
    <MainStack title={null} description={null} fileId={null}>
      <HStack justifyContent={"flex-start"} w={"100%"} px={4}>
        <HomeNotification isJA={false} />
      </HStack>
      <HomeUserList />
    </MainStack>
  )
}

UsersPage.getLayout = (page) => {
  return <>{page}</>
}

export default UsersPage
