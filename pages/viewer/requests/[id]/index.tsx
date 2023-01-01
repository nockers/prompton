import type { BlitzPage } from "@blitzjs/auth"
import {
  Box,
  Button,
  Card,
  Divider,
  HStack,
  Icon,
  Stack,
  Tag,
  Text,
} from "@chakra-ui/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useContext } from "react"
import { BiArrowBack } from "react-icons/bi"
import { MainStack } from "app/components/MainStack"
import ViewerLayout from "app/viewer/layout"

import { useRequestQuery } from "interface/__generated__/react"
import { AppContext } from "interface/contexts/appContext"
import { toDateText } from "interface/utils/toDateText"

const ViewerRequestPage: BlitzPage = () => {
  const appContext = useContext(AppContext)

  const router = useRouter()

  const requestId = router.query.id?.toString() ?? null

  const { data = null } = useRequestQuery({
    skip: appContext.currentUser === null || requestId === null,
    variables: { id: requestId! },
  })

  if (data === null || data.request === null) {
    return null
  }

  return (
    <MainStack title={"リクエスト"} description={null} fileId={null}>
      <HStack justifyContent={"center"} px={{ base: 4, md: 8 }}>
        <Stack
          pt={{ base: 4, md: 8 }}
          w={"100%"}
          maxW={"container.md"}
          spacing={{ base: 4, md: 8 }}
        >
          <HStack>
            <Link href={"/viewer/requests"}>
              <Button size={"sm"} leftIcon={<Icon as={BiArrowBack} />}>
                {"戻る"}
              </Button>
            </Link>
          </HStack>
          <Stack>
            <HStack justifyContent={"space-between"}>
              <Text fontWeight={"bold"} fontSize={"xl"}>
                {"リクエスト"}
              </Text>
              <Tag variant={"subtle"} colorScheme={"primary"}>
                {data.request.id}
              </Tag>
            </HStack>
            <Text>{toDateText(data.request.createdAt)}</Text>
          </Stack>
          <Divider />
          <Stack spacing={4}>
            <Card variant={"filled"}>
              <Stack p={4}>
                <Box>
                  <Tag colorScheme={"primary"}>{"要望"}</Tag>
                </Box>
                <Text>{data?.request.note}</Text>
              </Stack>
            </Card>
          </Stack>
        </Stack>
      </HStack>
    </MainStack>
  )
}

ViewerRequestPage.getLayout = (page) => {
  return <ViewerLayout>{page}</ViewerLayout>
}

export default ViewerRequestPage
