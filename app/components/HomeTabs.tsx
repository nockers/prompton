import { Box, Tab, TabList, Tabs } from "@chakra-ui/react"
import { useRouter } from "next/router"
import type { FC } from "react"

type Props = {
  index: number
}

export const HomeTabs: FC<Props> = (props) => {
  const router = useRouter()

  const onChange = (index: number) => {
    if (index === 0) {
      router.push("/")
    }
    if (index === 1) {
      router.push("/requests")
    }
    if (index === 2) {
      router.push("/users")
    }
  }

  return (
    <Box overflowX={"auto"}>
      <Tabs
        index={props.index}
        px={4}
        size={"sm"}
        w={"max-content"}
        variant={"soft-rounded"}
        onChange={onChange}
      >
        <TabList>
          <Tab mr={1}>{"作品"}</Tab>
          <Tab mr={1}>{"リクエスト"}</Tab>
          <Tab mr={1}>{"ユーザ"}</Tab>
        </TabList>
      </Tabs>
    </Box>
  )
}
