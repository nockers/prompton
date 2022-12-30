import type { BlitzPage } from "@blitzjs/auth"
import { Button, Card, HStack, Icon, Stack, Tag, Text } from "@chakra-ui/react"
import Link from "next/link"
import { BiPlus } from "react-icons/bi"
import { MainStack } from "app/components/MainStack"

const ViewerPlansPage: BlitzPage = () => {
  return (
    <MainStack title={null} description={null} fileId={null}>
      <Stack p={{ base: 4, sm: 8 }}>
        <Text fontWeight={"bold"} fontSize={"2xl"}>
          {"あなたのプラン"}
        </Text>
        <Text>{"プランを作成して依頼を受けることが出来ます。"}</Text>
      </Stack>
      <Stack px={8} spacing={8}>
        <Card variant={"filled"} borderRadius={"xl"}>
          <Stack p={6}>
            <HStack justifyContent={"space-between"}>
              <Text fontWeight={"bold"} fontSize={"xl"}>
                {"おまかせプラン"}
              </Text>
              <Tag colorScheme={"primary"}>{"イラスト"}</Tag>
            </HStack>
            <Text>{"プランを作成して依頼を受けることが出来ます。"}</Text>
          </Stack>
        </Card>
      </Stack>
      <HStack justifyContent={"center"}>
        <Link href={"/viewer/plans/new"}>
          <Button
            size={"lg"}
            borderRadius={40}
            leftIcon={<Icon as={BiPlus} />}
            aria-label={""}
          >
            {"追加"}
          </Button>
        </Link>
      </HStack>
    </MainStack>
  )
}

export default ViewerPlansPage
