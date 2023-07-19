import { allBlogs } from 'contentlayer/generated'
export const getViewsForSlug = (
  allViews: {
    slug: string
    count: number
  }[],
  slug: string,
) => {
  const viewsForSlug = allViews && allViews.find((view) => view.slug === slug)
  const number = new Number(viewsForSlug?.count || 0).toLocaleString()
  return number
}

export const allBlogsSorted = () => {
  return allBlogs.sort((a, b) => {
    if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
      return -1
    }
    return 1
  })
}
