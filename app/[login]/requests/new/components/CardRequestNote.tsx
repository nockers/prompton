import { Stack, Text, Card, UnorderedList, ListItem } from "@chakra-ui/react"
import type { FC } from "react"

export const CardRequestNote: FC = () => {
  return (
    <Card variant={"filled"} borderRadius={"xl"} borderWidth={4}>
      <Stack p={6}>
        <Text fontWeight={"bold"} fontSize={"xl"}>
          {"注意事項"}
        </Text>
        <UnorderedList pl={4}>
          <ListItem>
            {
              "いかなる場合も作品の全ての権利は制作者にあり、権利を譲渡するといったことを要望に含めることは出来ません。"
            }
          </ListItem>
          <ListItem>
            {
              "納品物の完成度は保証されずリテイクや返金を求めることはできません。"
            }
          </ListItem>
          <ListItem>
            {"10日を経過しても納品物が確認できない場合は自動的に返金されます。"}
          </ListItem>
          <ListItem>
            {
              "依頼が承認されるまでの期間は、依頼をキャンセルすることができ、依頼料は全額返金されます。"
            }
          </ListItem>
        </UnorderedList>
      </Stack>
    </Card>
  )
}
