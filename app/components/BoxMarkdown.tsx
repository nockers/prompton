import {
  Box,
  Heading,
  Image,
  Link,
  ListItem,
  OrderedList,
  Text,
  UnorderedList,
} from "@chakra-ui/react"
import type { FC, ReactNode } from "react"
import React from "react"
import ReactMarkdown from "react-markdown"

type Props = {
  children: ReactNode
}

export const MarkdownDocument: FC<Props> = (props) => {
  if (typeof props.children !== "string") {
    return <>{props.children}</>
  }

  return (
    <ReactMarkdown
      linkTarget={"_blank"}
      components={{
        li(props) {
          return (
            <ListItem
              fontSize={{ base: "sm", md: "md" }}
              ml={{ base: 4, md: 6 }}
              mt={2}
            >
              {props.children}
            </ListItem>
          )
        },
        ul(props) {
          return (
            <UnorderedList mt={"4"} ml={0}>
              {props.children}
            </UnorderedList>
          )
        },
        ol(props) {
          return (
            <OrderedList mt={"4"} ml={0}>
              {props.children}
            </OrderedList>
          )
        },
        h1(props) {
          return (
            <Heading
              as={"h1"}
              fontWeight={"bold"}
              fontSize={{ base: "xl", md: "2xl" }}
              mt={props.node.position?.start.line === 1 ? 0 : 12}
            >
              {props.children}
            </Heading>
          )
        },
        h2(props) {
          return (
            <Heading
              as={"h2"}
              fontWeight={"bold"}
              fontSize={{ base: "lg", md: "xl" }}
              mt={props.node.position?.start.line === 1 ? 0 : 6}
            >
              {props.children}
            </Heading>
          )
        },
        h3(props) {
          return (
            <Text as={"p"} whiteSpace={"pre-wrap"}>
              {props.children}
            </Text>
          )
        },
        p(props) {
          if (props.children.some((a) => typeof a === "string")) {
            return (
              <Text
                lineHeight={1.5}
                mt={props.node.position?.start.line === 1 ? 0 : 4}
                whiteSpace={"pre-wrap"}
              >
                {props.children}
              </Text>
            )
          }
          return <>{props.children}</>
        },
        a(props) {
          return (
            <Link
              color={"blue.500"}
              href={props.href as string}
              rel={"noreferrer"}
              target={"_blank"}
              fontWeight={"bold"}
              wordBreak={"break-all"}
            >
              {props.children}
            </Link>
          )
        },
        img(props) {
          return (
            <Image
              alt={props.alt}
              mx={"auto"}
              w={"100%"}
              rounded={"lg"}
              ml={0}
              {...props}
            />
          )
        },
        strong(props) {
          return <Box as={"strong"} color={"pink.500"} {...props} />
        },
        blockquote(props) {
          return (
            <Box as={"blockquote"} mt={4}>
              <Box borderLeftWidth={8} pl={4} pb={4}>
                {props.children}
              </Box>
            </Box>
          )
        },
      }}
    >
      {props.children}
    </ReactMarkdown>
  )
}
