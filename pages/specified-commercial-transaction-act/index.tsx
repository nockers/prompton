import type { BlitzPage } from "@blitzjs/auth"
import { Card, Divider, HStack, Stack, Text } from "@chakra-ui/react"
import { MainStackJA } from "app/components/MainStackJa"

const SpecifiedCommercialTransactionActPage: BlitzPage = () => {
  return (
    <MainStackJA
      pageTitle={"特定商取引法に基づく表記"}
      pageDescription={null}
      fileId={null}
    >
      <HStack justifyContent={"center"} px={{ base: 4, md: 8 }}>
        <Stack w={"100%"} maxW={"container.md"} spacing={{ base: 4, md: 8 }}>
          <Stack pt={{ base: 4, md: 8 }}>
            <Text fontWeight={"bold"} fontSize={"xl"}>
              {"特定商取引法に基づく表記"}
            </Text>
            <Text fontSize={"sm"}>
              {"本サービスは取引仲介システムを通して販売機会の提供を行います。"}
            </Text>
          </Stack>
          <Divider />
          <Card
            variant={"filled"}
            p={6}
            w={"100%"}
            maxW={"container.md"}
            borderRadius={"xl"}
          >
            <Stack spacing={4}>
              <Stack spacing={1}>
                <Text fontWeight={"bold"} minW={"max-content"}>
                  {"提供するもの"}
                </Text>
                <Text>
                  {
                    "イラストなどの制作物を有償で指定するリクエストの権利の販売機会。"
                  }
                </Text>
              </Stack>
              <Divider />
              <Stack spacing={1}>
                <Text fontWeight={"bold"} minW={"max-content"}>
                  {"役務の対価"}
                </Text>
                <Text>{"購入者が指定した購入額に対する最大10%の手数料。"}</Text>
              </Stack>
              <Divider />
              <Stack spacing={1}>
                <Text fontWeight={"bold"} minW={"max-content"}>
                  {"商品の提供時期"}
                </Text>
                <Text>{"購入者との取引の成立した際。"}</Text>
              </Stack>
              <Divider />
              <Stack spacing={1}>
                <Text fontWeight={"bold"} minW={"max-content"}>
                  {"販売価格"}
                </Text>
                <Text>
                  {"各商品ページに最大8000円までの金額が記載されます。"}
                </Text>
              </Stack>
              <Divider />
              <Stack spacing={1}>
                <Text fontWeight={"bold"} minW={"max-content"}>
                  {"返金について"}
                </Text>
                <Text>
                  {
                    "取引成立後から10日間が経過しても制作物が納品されなかった場合のみ自動返金されます。"
                  }
                </Text>
              </Stack>
              <Divider />
              <Stack spacing={1}>
                <Text fontWeight={"bold"} minW={"max-content"}>
                  {"支払い方法について"}
                </Text>
                <Text>{"クレジットカードまたはデビットカード"}</Text>
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
              <Stack spacing={1}>
                <Text fontWeight={"bold"} minW={"max-content"}>
                  {"連絡先"}
                </Text>
                <HStack>
                  <Text>{"メールアドレス"}</Text>
                  <Text>{"hello@nocker.io"}</Text>
                </HStack>
                <HStack>
                  <Text>{"電話番号"}</Text>
                  <Text>{"07089973096"}</Text>
                </HStack>
              </Stack>
              <Divider />
              <HStack spacing={4}>
                <Text fontWeight={"bold"} minW={"max-content"}>
                  {"運営統括責任者"}
                </Text>
                <Text>{"代表 高田亜門"}</Text>
              </HStack>
            </Stack>
          </Card>
        </Stack>
      </HStack>
    </MainStackJA>
  )
}

SpecifiedCommercialTransactionActPage.getLayout = (page) => {
  return <>{page}</>
}

export default SpecifiedCommercialTransactionActPage
