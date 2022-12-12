export const toColumnArray = <T>(items: T[], columnCount: number) => {
  const columns: T[][] = [
    ...Array(columnCount)
      .fill(null)
      .map(() => []),
  ]

  items.forEach((item, index) => {
    console.log(index, index % columnCount)
    columns[index % columnCount].push(item)
  })

  return columns.flat()
}
