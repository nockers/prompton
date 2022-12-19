import type { BlitzPage } from "@blitzjs/auth"
import { Box, Button, HStack } from "@chakra-ui/react"
import Link from "next/link"
import { useLabelsQuery } from "interface/__generated__/react"

export const HomeLabelList: BlitzPage = () => {
  const { data } = useLabelsQuery({
    fetchPolicy: "cache-and-network",
    variables: {
      offset: 0,
      limit: 8,
    },
  })

  return (
    <Box overflowX={"auto"} pb={4}>
      <HStack>
        {data?.labels.map((label) => (
          <Link key={label.id} href={`/labels/${label.name}`}>
            <Button size={"sm"}>{`#${label.name}`}</Button>
          </Link>
        ))}
      </HStack>
    </Box>
  )
}
