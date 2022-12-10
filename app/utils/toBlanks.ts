export const toBlanks = <T>(items: T[]) => {
  return items.length < 4 ? [...Array(3 - items.length)] : []
}
