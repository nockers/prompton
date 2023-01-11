import type { BlitzPage } from "@blitzjs/auth"
import {
  Box,
  Button,
  Divider,
  HStack,
  Icon,
  Image,
  Input,
  InputGroup,
  Text,
  InputLeftElement,
  Stack,
  Tab,
  TabList,
  Tabs,
  useToast,
} from "@chakra-ui/react"
import { useContext, useState } from "react"
import { BiArrowToTop, BiPlus, BiSearch } from "react-icons/bi"
import { MainLoading } from "app/components/MainLoading"
import { MainStackJA } from "app/components/MainStackJa"
import { CardViewerPrompt } from "app/note/components/CardViwerPrompt"
import {
  useCreatePromptMutation,
  useDeletePromptMutation,
  useViewerPromptsQuery,
} from "interface/__generated__/react"
import { AppContext } from "interface/contexts/appContext"

const ViewerNotePage: BlitzPage = () => {
  const appContext = useContext(AppContext)

  const [searchText, setSearchText] = useState("")

  const {
    data = null,
    loading: isLoading,
    refetch,
  } = useViewerPromptsQuery({
    skip: appContext.currentUser === null,
    variables: {
      limit: 0,
      offset: 9 * 6,
    },
  })

  const [newPromptText, setNewPromptText] = useState("")

  const [createPrompt, { loading: isCreatingPrompt }] =
    useCreatePromptMutation()

  const [deletePrompt] = useDeletePromptMutation()

  const toast = useToast()

  const imageURL =
    "https://lh3.googleusercontent.com/tFn-0rbAn7xSDl7lXZFyVF5qVvrPdezRJg0aSRTXtyeqTs6s1VpufCH6yHvXRAdKL8bJ2anJLZvCu5821_IGOKyk8162ssWsKq67XjwEeshsiJCJBg=s512"

  const onCreatePrompt = async () => {
    try {
      await createPrompt({
        variables: {
          input: {
            isNsfw: false,
            isBase: false,
            isSingle: false,
            text: newPromptText,
          },
        },
      })
      setNewPromptText("")
      await refetch()
      toast({ status: "success", description: "プロンプトを追加しました" })
    } catch (error) {
      if (error instanceof Error) {
        toast({ status: "error", description: error.message })
      }
    }
  }

  const onDeletePrompt = async (promptId: string) => {
    try {
      await deletePrompt({
        variables: { input: { promptId: promptId } },
      })
      await refetch()
      toast({ status: "success", description: "プロンプトを削除しました" })
    } catch (error) {
      if (error instanceof Error) {
        toast({ status: "error", description: error.message })
      }
    }
  }

  if (isLoading) {
    return <MainLoading />
  }

  if (appContext.currentUser === null) {
    return (
      <Box p={4}>
        <Text>{"ログインが必要です"}</Text>
      </Box>
    )
  }

  if (data === null) {
    return null
  }

  const searchPrompts = data.viewer.prompts.filter((prompt) => {
    return prompt.text.includes(searchText)
  })

  return (
    <MainStackJA
      pageTitle={"ノート"}
      pageDescription={null}
      fileId={null}
      pb={0}
      h={"calc(100vh - 72px)"}
      minH={0}
      spacing={0}
      overflow={"hidden"}
    >
      <HStack
        flex={1}
        alignItems={"flex-start"}
        h={"100%"}
        overflowY={"hidden"}
        pl={{ base: 4, md: 8 }}
        pr={{ base: 4, md: 8 }}
        spacing={{ base: 0, md: 4 }}
      >
        <Stack flex={1} overflowY={"auto"} h={"100%"} spacing={0}>
          <Box py={4}>
            <InputGroup size={"sm"}>
              <InputLeftElement pointerEvents="none">
                <Icon as={BiSearch} fontSize={16} />
              </InputLeftElement>
              <Input
                variant={"filled"}
                placeholder={"プロンプトを探す"}
                borderRadius={"md"}
                value={searchText}
                onChange={(event) => {
                  setSearchText(event.target.value)
                }}
              />
            </InputGroup>
          </Box>
          <Divider />
          <Stack overflowY={"auto"} spacing={0}>
            <Stack py={4}>
              <HStack>
                <Input
                  isDisabled={isCreatingPrompt}
                  variant={"filled"}
                  placeholder={"new prompt, white background, xxxx, yyyy"}
                  borderRadius={"md"}
                  value={newPromptText}
                  onChange={(event) => {
                    setNewPromptText(event.target.value)
                  }}
                />
                <Button
                  isLoading={isCreatingPrompt}
                  rightIcon={<Icon as={BiPlus} fontSize={16} />}
                  onClick={onCreatePrompt}
                >
                  {"追加"}
                </Button>
              </HStack>
            </Stack>
            <Divider />
            <Stack spacing={4} h={"100%"} pt={4}>
              <HStack justifyContent={"space-between"}>
                <Tabs variant={"soft-rounded"} size={"sm"}>
                  <TabList>
                    <Tab>{"全て"}</Tab>
                    <Tab>{"ベースのみ"}</Tab>
                  </TabList>
                </Tabs>
                <HStack>
                  <Button
                    size={"sm"}
                    rightIcon={<Icon as={BiArrowToTop} fontSize={14} />}
                  >
                    {"新しい順"}
                  </Button>
                </HStack>
              </HStack>
              <Stack spacing={4} pb={4}>
                {searchPrompts.length === 0 && (
                  <Box>
                    <Text opacity={0.8}>{"プロンプトが見つかりません。"}</Text>
                  </Box>
                )}
                {searchPrompts.map((prompt) => (
                  <CardViewerPrompt
                    key={prompt.id}
                    text={prompt.text}
                    imageURL={imageURL}
                    createdAt={prompt.createdAt}
                    onDelete={() => {
                      onDeletePrompt(prompt.id)
                    }}
                  />
                ))}
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Stack
          display={{ base: "none", lg: "flex" }}
          w={"100%"}
          maxW={64}
          py={4}
          h={"100%"}
          overflowY={"auto"}
        >
          <Box>
            <Image borderRadius={"xl"} w={"100%"} src={imageURL} alt={""} />
          </Box>
          <Box>
            <Image borderRadius={"xl"} w={"100%"} src={imageURL} alt={""} />
          </Box>
          <Box>
            <Image borderRadius={"xl"} w={"100%"} src={imageURL} alt={""} />
          </Box>
        </Stack>
      </HStack>
    </MainStackJA>
  )
}

export default ViewerNotePage
