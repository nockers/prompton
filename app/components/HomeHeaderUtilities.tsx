import {
  Button,
  HStack,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Tooltip,
  useBreakpointValue,
  useColorMode,
  useToast,
} from "@chakra-ui/react"
import { getAuth, signOut } from "firebase/auth"
import Link from "next/link"
import { useRouter } from "next/router"
import type { FC } from "react"
import { useContext } from "react"
import {
  BiBell,
  BiCreditCard,
  BiDotsHorizontalRounded,
  BiExit,
  BiMoon,
  BiSend,
  BiSun,
  BiUser,
  BiWrench,
} from "react-icons/bi"
import { FcGoogle } from "react-icons/fc"
import { ButtonDarkMode } from "app/components/ButtonDarkMode"
import { AppContext } from "interface/contexts/appContext"

type Props = {
  onLogin(): void
}

export const HomeHeaderUtilities: FC<Props> = (props) => {
  const appContext = useContext(AppContext)

  const router = useRouter()

  const { colorMode, toggleColorMode } = useColorMode()

  const isMobile = useBreakpointValue({ base: true, md: false })

  const toast = useToast()

  const onLogout = async () => {
    try {
      await signOut(getAuth())
      router.push("/")
      toast({ title: "ログアウトしました" })
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

  if (appContext.isLoading) {
    return <Button isLoading={true} fontSize={14} />
  }

  if (appContext.currentUser === null) {
    return (
      <HStack>
        <Button
          leftIcon={<Icon as={FcGoogle} />}
          fontSize={14}
          onClick={props.onLogin}
          minW={28}
        >
          {"ログイン"}
        </Button>
        {!isMobile && (
          <ButtonDarkMode colorMode={colorMode} onClick={toggleColorMode} />
        )}
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label={"その他"}
            icon={<Icon as={BiDotsHorizontalRounded} />}
          />
          <MenuList>
            <MenuItem
              icon={
                <Icon
                  display={"flex"}
                  fontSize={16}
                  as={colorMode === "light" ? BiMoon : BiSun}
                />
              }
              onClick={toggleColorMode}
            >
              {colorMode === "light" ? "ダークモード" : "ライトモード"}
            </MenuItem>
            <MenuDivider />
            <MenuItem isDisabled>{"使い方"}</MenuItem>
            <MenuItem isDisabled> {"ガイドライン"}</MenuItem>
            <Link href={"/terms"}>
              <MenuItem>{"利用規約"}</MenuItem>
            </Link>
            <Link href={"/privacy"}>
              <MenuItem>{"プライバシーポリシー"}</MenuItem>
            </Link>
            <Link href={"/specified-commercial-transaction-act"}>
              <MenuItem>{"特定商取引法に基づく表記"}</MenuItem>
            </Link>
          </MenuList>
        </Menu>
      </HStack>
    )
  }

  return (
    <HStack>
      {isMobile && (
        <Link href={`/${appContext.currentUser.uid}`}>
          <Tooltip label={"マイページ"}>
            <IconButton aria-label={""}>
              <Icon as={BiUser} />
            </IconButton>
          </Tooltip>
        </Link>
      )}
      {!isMobile && (
        <Link href={"/viewer/requests"}>
          <Button fontSize={14}>{"リクエスト"}</Button>
        </Link>
      )}
      {!isMobile && (
        <Link href={`/${appContext.currentUser.uid}`}>
          <Button fontSize={14}>{"マイページ"}</Button>
        </Link>
      )}
      {!isMobile && (
        <ButtonDarkMode colorMode={colorMode} onClick={toggleColorMode} />
      )}
      <Menu>
        <Tooltip label={"設定など"}>
          <MenuButton
            as={IconButton}
            aria-label={"その他"}
            icon={<Icon as={BiDotsHorizontalRounded} />}
          />
        </Tooltip>
        <MenuList>
          {isMobile && (
            <Link href={`/${appContext.currentUser.uid}`}>
              <MenuItem
                icon={<Icon display={"flex"} fontSize={16} as={BiUser} />}
              >
                {"マイページ"}
              </MenuItem>
            </Link>
          )}
          {isMobile && (
            <Link href={"/viewer/requests"}>
              <MenuItem
                icon={<Icon display={"flex"} fontSize={16} as={BiSend} />}
              >
                {"リクエスト"}
              </MenuItem>
            </Link>
          )}
          <MenuItem
            isDisabled
            icon={<Icon display={"flex"} fontSize={16} as={BiBell} />}
          >
            {"通知"}
          </MenuItem>
          <Link href={"/viewer/payments"}>
            <MenuItem
              icon={<Icon display={"flex"} fontSize={16} as={BiCreditCard} />}
            >
              {"お支払い"}
            </MenuItem>
          </Link>
          <Link href={"/settings"}>
            <MenuItem
              icon={<Icon display={"flex"} fontSize={16} as={BiWrench} />}
            >
              {"設定"}
            </MenuItem>
          </Link>
          <MenuItem
            icon={
              <Icon
                display={"flex"}
                fontSize={16}
                as={colorMode === "light" ? BiMoon : BiSun}
              />
            }
            onClick={toggleColorMode}
          >
            {colorMode === "light" ? "ダークモード" : "ライトモード"}
          </MenuItem>
          <MenuItem
            icon={<Icon display={"flex"} fontSize={16} as={BiExit} />}
            onClick={onLogout}
          >
            {"ログアウト"}
          </MenuItem>
          <MenuDivider />
          <Link href={"/about"}>
            <MenuItem>{"サイトについて"}</MenuItem>
          </Link>
          <MenuItem isDisabled>{"使い方"}</MenuItem>
          <Link href={"/guide"}>
            <MenuItem>{"ガイドライン"}</MenuItem>
          </Link>
          <Link href={"/terms"}>
            <MenuItem>{"利用規約"}</MenuItem>
          </Link>
          <Link href={"/privacy"}>
            <MenuItem>{"プライバシーポリシー"}</MenuItem>
          </Link>
          <Link href={"/specified-commercial-transaction-act"}>
            <MenuItem>{"特定商取引法に基づく表記"}</MenuItem>
          </Link>
        </MenuList>
      </Menu>
    </HStack>
  )
}
