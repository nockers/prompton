import { getWebColors } from "infrastructure/utils/getWebColors"

export const findWebColor = (hex: string) => {
  const webColors = getWebColors()

  return webColors.find((webColor) => {
    return webColor.colorCode === hex
  })
}
