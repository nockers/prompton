export type NodeResolver<T, U> = {
  [K in keyof T]: (parent: U) => unknown
}
