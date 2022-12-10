import { Stack } from "@chakra-ui/react"
import { FC, ReactNode } from "react"

type Props = {
  children: ReactNode
}

const UserLayout: FC<Props> = (props) => {
  return <Stack>{props.children}</Stack>
}

export default UserLayout
