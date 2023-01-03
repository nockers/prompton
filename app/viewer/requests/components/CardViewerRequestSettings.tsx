import {
  Button,
  Card,
  Divider,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Stack,
  Switch,
  Text,
} from "@chakra-ui/react"
import type { FC } from "react"
import { useState } from "react"
import { BiLink } from "react-icons/bi"
import { Config } from "interface/config"

type Props = {
  userId: string
  isRequestable: boolean
  isRequestableForFree: boolean
  minimumFee: number
  maximumFee: number
  onChangeFeeRange(minimumFee: number, maximumFee: number): void
  onMarkAsRequestable(isChecked: boolean): void
  onMarkAsRequestableForFree(isChecked: boolean): void
  onShareRequestLink(): void
  onShareFreeRequestLink(): void
}

export const CardViewerRequestSettings: FC<Props> = (props) => {
  const [minimumFee, setMinimumFee] = useState(() => {
    return props.minimumFee
  })

  const [maximumFee, setMaximumFee] = useState(() => {
    return props.maximumFee
  })

  const isRequestable = props.isRequestable || props.isRequestableForFree

  return (
    <Card
      variant={"outline"}
      borderRadius={"xl"}
      borderColor={isRequestable ? "primary.400" : "gray.100"}
      borderWidth={4}
    >
      <Stack p={{ base: 4, md: 4 }} spacing={4}>
        <HStack spacing={4} alignItems={"center"}>
          <Text fontWeight={"bold"}>{"1回の支援額"}</Text>
          <Text fontSize={"2xl"}>{`${minimumFee}円〜${maximumFee}円`}</Text>
        </HStack>
        <RangeSlider
          step={500}
          min={500}
          max={8000}
          value={[minimumFee, maximumFee]}
          onChange={([min, max]) => {
            setMinimumFee(min)
            setMaximumFee(max)
            props.onChangeFeeRange(min, max)
          }}
        >
          <RangeSliderTrack>
            <RangeSliderFilledTrack />
          </RangeSliderTrack>
          <RangeSliderThumb index={0} />
          <RangeSliderThumb index={1} />
        </RangeSlider>
        <HStack spacing={4}>
          <Switch
            isChecked={props.isRequestable}
            onChange={(event) => {
              props.onMarkAsRequestable(event.target.checked)
            }}
          />
          <Text opacity={props.isRequestable ? 1 : 0.6}>
            {"有償リクエストを受け付ける"}
          </Text>
        </HStack>
        {props.isRequestable && (
          <HStack spacing={2}>
            <InputGroup>
              <InputLeftElement pointerEvents="none" h={"100%"}>
                <Icon fontSize={"xl"} as={BiLink} />
              </InputLeftElement>
              <Input
                size={"sm"}
                borderRadius={"md"}
                isReadOnly
                value={`${Config.appURL}/${props.userId}/requests/new`}
              />
            </InputGroup>
            <Button size="sm" onClick={props.onShareRequestLink}>
              {"シェア"}
            </Button>
          </HStack>
        )}
        <Divider />
        <HStack spacing={4}>
          <Switch
            colorScheme={"pink"}
            isChecked={props.isRequestableForFree}
            onChange={(event) => {
              props.onMarkAsRequestableForFree(event.target.checked)
            }}
          />
          <Text opacity={props.isRequestableForFree ? 1 : 0.6}>
            {"無償リクエストを受け付ける"}
          </Text>
        </HStack>
        {props.isRequestableForFree && (
          <HStack spacing={2}>
            <InputGroup>
              <InputLeftElement pointerEvents="none" h={"100%"}>
                <Icon fontSize={"xl"} as={BiLink} />
              </InputLeftElement>
              <Input
                size={"sm"}
                borderRadius={"md"}
                isReadOnly
                value={`${Config.appURL}/${props.userId}/requests/new/free`}
              />
            </InputGroup>
            <Button size="sm" onClick={props.onShareFreeRequestLink}>
              {"シェア"}
            </Button>
          </HStack>
        )}
      </Stack>
    </Card>
  )
}
