import type { BlitzPage } from "@blitzjs/auth"
import { Divider, Stack, Tab, TabList, Tabs } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { MainStackJA } from "app/components/MainStackJA"
import { HomeUserList } from "app/users/components/HomeUserList"

const UsersPage: BlitzPage = () => {
  const router = useRouter()

  const onChange = (index: number) => {
    if (index === 0) {
      router.push("/")
    }
    if (index === 1) {
      router.push("/requests")
    }
  }

  return (
    <MainStackJA title={null} description={null} fileId={null}>
      <Tabs
        index={2}
        pt={{ base: 4, md: 8 }}
        size={"sm"}
        variant={"soft-rounded"}
        onChange={onChange}
      >
        <TabList px={{ base: 4, md: 8 }}>
          <Tab>{"投稿"}</Tab>
          <Tab>{"リクエスト"}</Tab>
          <Tab>{"ユーザ"}</Tab>
        </TabList>
      </Tabs>
      <Divider />
      <Stack spacing={0} w={"100%"} px={{ base: 4, md: 8 }}>
        <HomeUserList />
      </Stack>
    </MainStackJA>
  )
}

UsersPage.getLayout = (page) => {
  return <>{page}</>
}

export default UsersPage
