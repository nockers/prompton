import type { BlitzPage } from "@blitzjs/auth"
import {
  Box,
  Button,
  Card,
  Divider,
  HStack,
  Input,
  Select,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react"
import { useMemo, useState } from "react"
import { MainStackJA } from "app/components/MainStackJa"

const ViewerPlanNewPage: BlitzPage = () => {
  // const router = useRouter()

  const [category, setCategory] = useState("ILLUSTRATION_FREEDOM")

  const [name, setName] = useState("おまかせプラン")

  const [description, setDescription] = useState("")

  const [fee, setFee] = useState(1000)

  const categoryDescription = useMemo(() => {
    if (category === "ILLUSTRATION") {
      return "依頼者の要望になるべく近いイラストを作成します。"
    }
    if (category === "ILLUSTRATION_FREEDOM") {
      return "制作者がおまかせでイラストを作成します。"
    }
    if (category === "ILLUSTRATION_MODIFICATION") {
      return "依頼主の提示する作品の依頼された箇所を修正します。1時間の作業を目安としています。"
    }
  }, [category])

  const onChangeFee = (fee: number) => {
    setFee(fee)
  }

  const onChangeCategory = (category: string) => {
    setCategory(category)
    if (category === "ILLUSTRATION") {
      setName("要望ありプラン")
    }
    if (category === "ILLUSTRATION_FREEDOM") {
      setName("おまかせプラン")
    }
    if (category === "ILLUSTRATION_MODIFICATION") {
      setName("修正プラン")
    }
  }

  // const onCreate = async () => {
  //   router.replace("/viewer/plans")
  // }

  return (
    <MainStackJA pageTitle={null} pageDescription={null} fileId={null}>
      <HStack justifyContent={"center"} px={4} pt={4} pb={8}>
        <Stack w={"100%"} maxW={"xl"} spacing={8}>
          <Text fontWeight={"bold"} fontSize={"xl"}>
            {"新しいプランを作成する"}
          </Text>
          <Card variant={"outline"} borderRadius={"xl"}>
            <Stack p={{ base: 4, md: 8 }} spacing={8}>
              <Stack spacing={2}>
                <Text w={32} fontSize={"sm"} fontWeight={"bold"}>
                  {"プランの名前"}
                </Text>
                <Select
                  variant={"filled"}
                  value={category}
                  onChange={(event) => {
                    onChangeCategory(event.target.value)
                  }}
                >
                  <option value={"ILLUSTRATION_FREEDOM"}>
                    {"イラスト - おまかせ"}
                  </option>
                  <option value={"ILLUSTRATION"}>
                    {"イラスト - 要望あり"}
                  </option>
                  <option value={"ILLUSTRATION_MODIFICATION"}>
                    {"イラスト - 作品の修正"}
                  </option>
                </Select>
                <Text fontSize={"sm"}>{categoryDescription}</Text>
              </Stack>
              <Divider />
              <Stack spacing={2}>
                <Text w={32} fontSize={"sm"} fontWeight={"bold"}>
                  {"プランの名前"}
                </Text>
                <Input
                  variant={"filled"}
                  value={name}
                  placeholder={"おまかせプラン"}
                  onChange={(event) => {
                    setName(event.target.value)
                  }}
                />
              </Stack>
              <Stack spacing={2} alignItems={"flex-start"}>
                <Text w={32} fontSize={"sm"} fontWeight={"bold"}>
                  {"プランの説明"}
                </Text>
                <Textarea
                  variant={"filled"}
                  rows={4}
                  value={description}
                  placeholder={"プランの説明"}
                  onChange={(event) => {
                    setDescription(event.target.value)
                  }}
                />
              </Stack>
              <Stack spacing={2} alignItems={"flex-start"}>
                <Text w={32} fontSize={"sm"} fontWeight={"bold"}>
                  {"リクエストの報酬"}
                </Text>
                <Text fontWeight={"bold"} fontSize={"xl"}>
                  {fee === 0 ? "無償 😢" : `${fee}円（税込）`}
                </Text>
                <Slider
                  value={fee}
                  min={0}
                  max={6000}
                  step={500}
                  onChange={onChangeFee}
                >
                  <SliderTrack bg="red.100">
                    <Box position="relative" right={10} />
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb boxSize={6} />
                </Slider>
                <Text fontSize={"xs"}>
                  {"※1000円以上の場合は、手数料200円が発生します。"}
                </Text>
              </Stack>
              <HStack justifyContent={"flex-end"}>
                <Button colorScheme={"primary"} borderRadius={40}>
                  {"作成する"}
                </Button>
              </HStack>
            </Stack>
          </Card>
        </Stack>
      </HStack>
    </MainStackJA>
  )
}

export default ViewerPlanNewPage
