export const toHexFromRgb = (r: number, g: number, b: number) => {
  const hex = ((r << 16) | (g << 8) | b).toString(16)
  return `#${new Array(Math.abs(hex.length - 7)).join("0")}${hex}`
}
