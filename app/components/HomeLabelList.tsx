import { Box, Button, HStack } from "@chakra-ui/react"
import Link from "next/link"
import type { FC } from "react"
import { useLabelsQuery } from "interface/__generated__/react"

export const HomeLabelList: FC = () => {
  const { data } = useLabelsQuery({
    notifyOnNetworkStatusChange: true,
    variables: {
      offset: 0,
      limit: 40,
    },
  })

  return (
    <Box overflow={"hidden"} w={"100%"}>
      <Box overflowX={"auto"} pb={4} px={{ base: 4, md: 8 }}>
        <HStack>
          {data?.labels.map((label) => (
            <Link key={label.id} href={`/labels/${label.name}`}>
              <Button size={"sm"}>{`#${label.nameJA || label.name}`}</Button>
            </Link>
          ))}
          {/** for right-side padding */}
          <Box opacity={0}>{"a"}</Box>
        </HStack>
      </Box>
    </Box>
  )
}
