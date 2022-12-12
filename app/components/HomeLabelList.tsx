import { BlitzPage } from "@blitzjs/auth"
import { Button, Wrap, WrapItem } from "@chakra-ui/react"
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
    <Wrap>
      {data?.labels.map((label) => (
        <WrapItem key={label.id}>
          <Link href={`/labels/${label.name}`}>
            <Button size={"sm"}>{`#${label.name}`}</Button>
          </Link>
        </WrapItem>
      ))}
    </Wrap>
  )
}
