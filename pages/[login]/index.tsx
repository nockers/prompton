import type { BlitzPage } from "@blitzjs/auth"
import { TabList, Tab, Tabs, Divider } from "@chakra-ui/react"
import type { GetStaticPaths, GetStaticProps } from "next"
import { useRouter } from "next/router"
import { useContext, useState } from "react"
import { UserProfileHeader } from "app/[login]/components/UserProfileHeader"
import { UserWorks } from "app/[login]/components/UserWorks"
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

  const isEditable = router.query.login === appContext.currentUser?.uid

  const userId = router.query.login?.toString() ?? null

  if (userId === null) {
    return null
  }

  return (
    <MainStack title={null} description={null} fileId={null}>
      <UserProfileHeader userId={userId} />
      <Divider />
      {isEditable && (
        <Tabs
          variant={"soft-rounded"}
          onChange={(index) => {
            setTabIndex(index)
          }}
        >
          <TabList px={4}>
            <Tab mr={2}>{"作品"}</Tab>
            <Tab mr={2}>{"スキ"}</Tab>
            <Tab mr={2}>{"ブックマーク"}</Tab>
            <Tab mr={2}>{"フォロー"}</Tab>
          </TabList>
        </Tabs>
      )}
      {tabIndex === 0 && <UserWorks userId={userId} isEditable={isEditable} />}
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
