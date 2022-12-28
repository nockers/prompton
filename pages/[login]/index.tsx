import type { BlitzPage } from "@blitzjs/auth"
import { TabList, Tab, Tabs, Divider, Box } from "@chakra-ui/react"
import type { GetStaticPaths, GetStaticProps } from "next"
import { useRouter } from "next/router"
import { useContext, useState } from "react"
import { UserProfileHeader } from "app/[login]/components/UserProfileHeader"
import { UserWorks } from "app/[login]/components/UserWorks"
import { ViewerBookmarkedWorkList } from "app/[login]/components/ViewerBookmarkedWorkList"
import { ViewerLikedWorkList } from "app/[login]/components/ViewerLikedWorkList"
import { ViewerUserProfileHeader } from "app/[login]/components/ViewerUserProfileHeader"
import { ViewerWorkList } from "app/[login]/components/ViewerWorkList"
import UserLayout from "app/[login]/layout"
import { MainStack } from "app/components/MainStack"
import { AppContext } from "interface/contexts/appContext"

type Props = {}

type Paths = {
  login: string
}

const UserPage: BlitzPage = () => {
  const appContext = useContext(AppContext)

  const router = useRouter()

  const [tabIndex, setTabIndex] = useState(0)

  const isMyPage = router.query.login === appContext.currentUser?.uid

  const userId = router.query.login?.toString() ?? null

  if (userId === null) {
    return null
  }

  if (router.query.login !== appContext.currentUser?.uid) {
    return (
      <MainStack title={null} description={null} fileId={null}>
        <UserProfileHeader userId={userId} />
        <Divider />
        <UserWorks userId={userId} isEditable={isMyPage} />
      </MainStack>
    )
  }

  return (
    <MainStack title={null} description={null} fileId={null}>
      <ViewerUserProfileHeader userId={userId} />
      <Divider />
      <Box overflowX={"auto"}>
        <Tabs
          w={"max-content"}
          variant={"soft-rounded"}
          onChange={(index) => {
            setTabIndex(index)
          }}
        >
          <TabList px={4}>
            <Tab mr={2}>{"作品"}</Tab>
            <Tab mr={2}>{"スキ"}</Tab>
            <Tab mr={2}>{"ブックマーク"}</Tab>
          </TabList>
        </Tabs>
      </Box>
      {tabIndex === 0 && <ViewerWorkList />}
      {tabIndex === 1 && <ViewerLikedWorkList />}
      {tabIndex === 2 && <ViewerBookmarkedWorkList />}
    </MainStack>
  )
}

UserPage.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>
}

export const getStaticPaths: GetStaticPaths<Paths> = async () => {
  const paths = [].map(() => {
    return { params: { login: "" } }
  })

  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps<Props, Paths> = async (context) => {
  if (typeof context.params?.login === "undefined") {
    throw new Error()
  }

  return {
    props: {},
  }
}

export default UserPage
