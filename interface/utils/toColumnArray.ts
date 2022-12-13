export const toColumnArray = <T>(items: T[], columnCount: number) => {
  const columns: T[][] = [
    ...Array(columnCount)
      .fill(null)
      .map(() => []),
  ]

  items.forEach((item, index) => {
    columns[index % columnCount].push(item)
  })

  return columns
}
