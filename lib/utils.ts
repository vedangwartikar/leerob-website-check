
import { allBlogs } from 'contentlayer/generated';
export const allBlogsSorted = () => {
  return allBlogs
        .sort((a, b) => {
          if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
            return -1;
          }
          return 1;
        })
}
