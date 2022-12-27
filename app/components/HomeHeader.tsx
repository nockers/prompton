import {
  Box,
  HStack,
  Icon,
  IconButton,
  Input,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react"
import { useDebounce } from "@react-hook/debounce"
import {
  getAuth,
  getIdTokenResult,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth"
import Link from "next/link"
import { useRouter } from "next/router"
import type { FC } from "react"
import { useEffect, useState } from "react"
import { BiHome } from "react-icons/bi"
import { HomeHeaderLogin } from "app/components/HomeHeaderLogin"
import { HomeHeaderUtilities } from "app/components/HomeHeaderUtilities"

export const HomeHeader: FC = () => {
  const router = useRouter()

  const backgroundColor = useColorModeValue("gray.50", "gray.900")

  const [searchText, setSearchText] = useState("")

  const [search, setSearch] = useDebounce(searchText, 1000)

  const toast = useToast()

  const query = router.query.q?.toString() ?? ""

  useEffect(() => {
    setSearchText(query)
  }, [query])

  useEffect(() => {
    if (search.trim() === "") return
    router.replace(`/search?q=${search}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  const onLogin = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(getAuth(), provider)
      const idTokenResult = await getIdTokenResult(result.user)
      if (!idTokenResult.claims.isInitialized) {
        router.push("/new")
      }
      toast({ title: "アカウントを確認できました" })
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "ERROR",
          description: error.message,
          status: "error",
        })
      }
    }
  }

  return (
    <>
      <Box
        p={4}
        position={"fixed"}
        w={"100%"}
        top={0}
        bg={backgroundColor}
        zIndex={99}
      >
        <HStack spacing={4}>
          <Link href={"/"}>
            <IconButton aria-label={"Home"}>
              <Icon as={BiHome} />
            </IconButton>
          </Link>
          <Input
            variant={"filled"}
            placeholder={"検索"}
            value={searchText}
            onChange={(event) => {
              setSearchText(event.target.value)
              setSearch(event.target.value)
            }}
          />
          {searchText.trim() === "" && (
            <HStack>
              <HomeHeaderLogin onLogin={onLogin} />
              <HomeHeaderUtilities />
            </HStack>
          )}
        </HStack>
      </Box>
      <Box h={"4.5rem"} />
    </>
  )
}
