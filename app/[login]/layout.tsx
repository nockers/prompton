import { Stack } from "@chakra-ui/react"
import type { FC, ReactNode } from "react"

type Props = {
  children: ReactNode
}

const UserLayout: FC<Props> = (props) => {
  return <Stack>{props.children}</Stack>
}

export default UserLayout
