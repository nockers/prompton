import type { BlitzPage } from "@blitzjs/auth"
import { Card, Divider, HStack, Stack, Text } from "@chakra-ui/react"
import { MainStack } from "app/components/MainStack"

const SpecifiedCommercialTransactionActPage: BlitzPage = () => {
  return (
    <MainStack
      title={"特定商取引法に基づく表記"}
      description={null}
      fileId={null}
    >
      <HStack justifyContent={"center"} px={4}>
        <Stack w={"100%"} maxW={"container.md"} spacing={4}>
          <Text fontWeight={"bold"} fontSize={"2xl"}>
            {"特定商取引法に基づく表記"}
          </Text>
          <Card
            variant={"filled"}
            p={6}
            w={"100%"}
            maxW={"container.md"}
            borderRadius={"xl"}
          >
            <Stack spacing={4}>
              <HStack spacing={2}>
                <Text fontWeight={"bold"} minW={"max-content"}>
                  {"商品"}
                </Text>
                <Text>{"イラストを依頼する為の依頼チケット"}</Text>
              </HStack>
              <Divider />
              <Stack spacing={1}>
                <Text fontWeight={"bold"} minW={"max-content"}>
                  {"商品の提供時期"}
                </Text>
                <Text>{"決済が完了してから即時反映されます。"}</Text>
              </Stack>
              <Divider />
              <Stack spacing={1}>
                <Text fontWeight={"bold"} minW={"max-content"}>
                  {"販売価格"}
                </Text>
                <Text>
                  {"価格は商品によって異なり、価格は各ページに記載があります。"}
                </Text>
              </Stack>

              <Divider />
              <Stack spacing={1}>
                <Text fontWeight={"bold"} minW={"max-content"}>
                  {"返品について"}
                </Text>
                <Text>
                  {
                    "チケットを購入後、依頼が承諾されるまでの間は返金が可能です。"
                  }
                </Text>
              </Stack>
              <Divider />
              <Stack spacing={1}>
                <Text fontWeight={"bold"} minW={"max-content"}>
                  {"支払い方法について"}
                </Text>
                <Text>
                  {
                    "クレジットカードまたはデビットカード、プリペイドカードでのオンラインカード決済"
                  }
                </Text>
              </Stack>
              <Divider />
              <Stack spacing={1}>
                <Text fontWeight={"bold"} minW={"max-content"}>
                  {"運営会社"}
                </Text>
                <Text>{"Nocker株式会社"}</Text>
                <Text>{"法人番号 4011001149061"}</Text>
                <Text>
                  {
                    "住所 東京都渋谷区道玄坂１丁目１０番８号渋谷道玄坂東急ビル２Ｆ－Ｃ"
                  }
                </Text>
              </Stack>
              <Divider />
              <HStack spacing={4} alignItems={"flex-start"}>
                <Text fontWeight={"bold"} minW={"max-content"}>
                  {"営業時間"}
                </Text>
                <Text>{"土曜日（12時から17時）（祝日は休み）"}</Text>
              </HStack>
              <Divider />
              <HStack spacing={4}>
                <Text fontWeight={"bold"} minW={"max-content"}>
                  {"責任者"}
                </Text>
                <Text>{"代表取締役 高田亜門"}</Text>
              </HStack>
              <Divider />
              <HStack spacing={4}>
                <Text fontWeight={"bold"} minW={"max-content"}>
                  {"連絡先"}
                </Text>
                <Text>{"hello@nocker.io"}</Text>
              </HStack>
            </Stack>
          </Card>
        </Stack>
      </HStack>
    </MainStack>
  )
}

SpecifiedCommercialTransactionActPage.getLayout = (page) => {
  return <>{page}</>
}

export default SpecifiedCommercialTransactionActPage
