import { readFile } from "fs/promises"
import type { BlitzPage } from "@blitzjs/auth"
import {
  Box,
  Button,
  Card,
  HStack,
  Stack,
  Text,
  SimpleGrid,
  Image,
  Divider,
  Icon,
  Tag,
  Wrap,
  WrapItem,
  useClipboard,
  useToast,
} from "@chakra-ui/react"
import type { GetStaticProps } from "next"
import { useEffect, useState } from "react"
import { BiClipboard, BiPlus, BiReset, BiSave } from "react-icons/bi"
import { MainStackJA } from "app/components/MainStackJa"

type Props = {
  prompts: {
    category: string
    name: string
    texts: string[]
  }[]
  categories: { name: string; value: string }[]
}

const BuilderPage: BlitzPage<Props> = (props) => {
  const [currentCategory, setCurrentCategory] = useState("CHARACTER")

  const [prompts, setPrompts] = useState([["nsfw"]])

  const toast = useToast()

  const { onCopy, setValue } = useClipboard("")

  useEffect(() => {
    setValue(prompts.map((prompt) => prompt.join(", ")).join(", "))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prompts])

  const categories = props.categories

  const categoryPrompts = props.prompts.filter((prompt) => {
    return prompt.category === currentCategory
  })

  const onSelectCategory = (category: string) => {
    setCurrentCategory(category)
  }

  const onAddPrompt = (words: string[]) => {
    const index = prompts.findIndex((prompt) => {
      return prompt.join(",") === words.join(",")
    })
    const value =
      index === -1 ? [...prompts, words] : prompts.filter((_, i) => i !== index)
    setPrompts(value)
  }

  const onCopyPrompt = () => {
    onCopy()
    toast({ status: "success", description: "コピーしました" })
  }

  const onReset = () => {
    setPrompts([])
  }

  const isActive = (texts: string[]) => {
    return prompts.some((prompt) => {
      return prompt.join(",") === texts.join(",")
    })
  }

  return (
    <MainStackJA
      pageTitle={null}
      pageDescription={null}
      fileId={null}
      pb={0}
      h={"calc(100vh - 72px)"}
      spacing={0}
      overflow={"hidden"}
    >
      <Card variant={"filled"} w={"100%"} borderRadius={0}>
        <Wrap spacing={1} py={2} px={{ base: 4, md: 8 }}>
          {prompts.map((word) => (
            <WrapItem key={word.join(",")}>
              <Tag
                whiteSpace={"nowrap"}
                size={"sm"}
                variant={"subtle"}
                colorScheme={"primary"}
                fontWeight={"bold"}
                cursor={"pointer"}
                onClick={() => {
                  onAddPrompt(word)
                }}
              >
                {word.join(",")}
              </Tag>
            </WrapItem>
          ))}
        </Wrap>
      </Card>
      <HStack
        flex={1}
        alignItems={"flex-start"}
        h={"100%"}
        overflowY={"auto"}
        pl={{ base: 4, md: 6 }}
        pr={{ base: 4, md: 8 }}
        spacing={{ base: 0, md: 4 }}
      >
        <Box
          w={40}
          overflowY={"auto"}
          h={"100%"}
          py={4}
          display={{ base: "none", md: "block" }}
        >
          <Stack spacing={2}>
            <Button
              justifyContent={"flex-start"}
              size={"sm"}
              onClick={() => {}}
            >
              {"保管庫"}
            </Button>
            <Button
              justifyContent={"flex-start"}
              size={"sm"}
              onClick={() => {}}
            >
              {"全て"}
            </Button>
            {categories.map((category) => (
              <Button
                key={category.value}
                justifyContent={"flex-start"}
                size={"sm"}
                bg={
                  currentCategory === category.value ? undefined : "transparent"
                }
                colorScheme={
                  currentCategory === category.value ? "primary" : "gray"
                }
                onClick={() => {
                  onSelectCategory(category.value)
                }}
              >
                {category.name}
              </Button>
            ))}
          </Stack>
        </Box>
        <Stack flex={1} overflowY={"auto"} h={"100%"} spacing={0}>
          <HStack spacing={4} justifyContent={"space-between"} py={4}>
            <HStack spacing={2} justifyContent={"flex-end"}>
              <Button
                size={"xs"}
                leftIcon={<Icon as={BiPlus} />}
                onReset={onReset}
              >
                {"追加"}
              </Button>
            </HStack>
            <HStack spacing={2} justifyContent={"flex-end"}>
              <Button
                size={"xs"}
                leftIcon={<Icon as={BiReset} />}
                onReset={onReset}
              >
                {"リセット"}
              </Button>
              <Button size={"xs"} leftIcon={<Icon as={BiSave} />}>
                {"セーブ"}
              </Button>
              <Button
                size={"xs"}
                colorScheme={"primary"}
                leftIcon={<Icon as={BiClipboard} />}
                onClick={onCopyPrompt}
              >
                {"コピー"}
              </Button>
            </HStack>
          </HStack>
          <Divider />
          <Stack overflowY={"auto"} py={4}>
            <SimpleGrid minChildWidth="160px" spacing={4}>
              {categoryPrompts.map((prompt) => (
                <Stack key={prompt.texts.join(",")} spacing={1}>
                  <Button
                    px={0}
                    h={"auto"}
                    variant={"outline"}
                    colorScheme={isActive(prompt.texts) ? "primary" : "gray"}
                    borderWidth={4}
                    borderRadius={"xl"}
                    onClick={() => {
                      onAddPrompt(prompt.texts)
                    }}
                  >
                    <Image
                      alt={""}
                      w={"100%"}
                      src={"https://via.placeholder.com/150"}
                      height={"80px"}
                      borderRadius={"lg"}
                    />
                  </Button>
                  <Text fontWeight={"bold"} fontSize={"sm"}>
                    {prompt.name || prompt.texts.join(",")}
                  </Text>
                </Stack>
              ))}
            </SimpleGrid>
          </Stack>
        </Stack>
      </HStack>
    </MainStackJA>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const promptsText = await readFile("interface/assets/prompts.json", "utf8")

  const categoriesText = await readFile(
    "interface/assets/categories.json",
    "utf8",
  )

  return {
    props: {
      categories: JSON.parse(categoriesText),
      prompts: JSON.parse(promptsText),
    },
  }
}

BuilderPage.getLayout = (page) => {
  return <>{page}</>
}

export default BuilderPage
