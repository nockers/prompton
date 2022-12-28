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
} from "@chakra-ui/react"
import Link from "next/link"
import type { FC } from "react"
import { useContext } from "react"
import {
  BiBell,
  BiCog,
  BiDotsHorizontalRounded,
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

  const { colorMode, toggleColorMode } = useColorMode()

  const isMobile = useBreakpointValue({ base: true, md: false })

  if (appContext.isLoading) {
    return <Button isLoading={true} fontSize={14} />
  }

  if (appContext.currentUser === null) {
    return (
      <Button
        leftIcon={<Icon as={FcGoogle} />}
        fontSize={14}
        onClick={props.onLogin}
        minW={28}
      >
        {"ログイン"}
      </Button>
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
        <Button fontSize={14} isDisabled>
          {"リクエスト"}
        </Button>
      )}
      {!isMobile && (
        <Link href={`/${appContext.currentUser.uid}`}>
          <Button fontSize={14}>{"マイページ"}</Button>
        </Link>
      )}
      {!isMobile && (
        <ButtonDarkMode colorMode={colorMode} onClick={toggleColorMode} />
      )}
      {!isMobile && (
        <Link href={"/settings"}>
          <Tooltip label={"設定"}>
            <IconButton aria-label={""}>
              <Icon as={BiCog} />
            </IconButton>
          </Tooltip>
        </Link>
      )}
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label={"その他"}
          icon={<Icon as={BiDotsHorizontalRounded} />}
        />
        <MenuList>
          {isMobile && (
            <MenuItem
              icon={<Icon display={"flex"} fontSize={16} as={BiUser} />}
            >
              {"マイページ"}
            </MenuItem>
          )}
          {isMobile && (
            <MenuItem
              icon={<Icon display={"flex"} fontSize={16} as={BiSend} />}
            >
              {"リクエスト"}
            </MenuItem>
          )}
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
            isDisabled
            icon={<Icon display={"flex"} fontSize={16} as={BiBell} />}
          >
            {"通知"}
          </MenuItem>
          <MenuItem
            isDisabled
            icon={<Icon display={"flex"} fontSize={16} as={BiWrench} />}
          >
            {"設定"}
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
        </MenuList>
      </Menu>
    </HStack>
  )
}
