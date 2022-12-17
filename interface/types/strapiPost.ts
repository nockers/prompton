export type StrapiPost = {
  id: string
  attributes: {
    title: string
    /**
     * '2022-12-17'
     */
    publishedAt: string
    body: string
    slug: string
  }
}
