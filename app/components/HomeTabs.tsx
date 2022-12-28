import { Box, Tab, TabList, Tabs } from "@chakra-ui/react"
import type { FC } from "react"

type Props = {
  index: number
  onChange(index: number): void
}

export const HomeTabs: FC<Props> = (props) => {
  return (
    <Box overflowX={"auto"}>
      <Tabs
        index={props.index}
        px={4}
        size={"sm"}
        w={"max-content"}
        variant={"soft-rounded"}
        onChange={props.onChange}
      >
        <TabList>
          <Tab mr={1}>{"投稿"}</Tab>
          <Tab mr={1}>{"リクエスト"}</Tab>
          <Tab mr={1}>{"ユーザ"}</Tab>
        </TabList>
      </Tabs>
    </Box>
  )
}
