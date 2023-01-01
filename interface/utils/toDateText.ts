import { format } from "date-fns"

export const toDateText = (time: number) => {
  const date = new Date(time * 1000)
  return format(date, "yyyy年MM月dd日 HH時mm分")
}
