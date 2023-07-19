import { Article } from 'app/components/Article'
import { getViewsCount } from 'lib/metrics'
import { allBlogsSorted, getViewsForSlug } from 'lib/utils'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read my thoughts on software development, design, and more.',
}

export default async function BlogPage() {
  const allViews = await getViewsCount()

  return (
    <section>
      <h1 className="font-bold text-2xl mb-8 tracking-tighter">thoughts, lessons, and rants</h1>
      {allBlogsSorted().map((post, i) => (
        <Article
          key={i}
          article={{
            date: post.publishedAt,
            description: post.summary,
            slug: post.slug,
            title: post.title,
            views: getViewsForSlug(allViews, post.slug),
          }}
        />
      ))}
    </section>
  )
}
