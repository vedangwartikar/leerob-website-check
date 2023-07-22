import { FadeLeft } from 'app/components/Animations'
import { Article } from 'app/components/Article'
import { getViewsForRoute } from 'lib/metrics'
import { allBlogsSorted } from 'lib/utils'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read my thoughts on software development, design, and more.',
}

export default async function BlogPage() {
  const sortedBlogs = allBlogsSorted()
  const allViews = await Promise.all([...sortedBlogs.map((post) => getViewsForRoute(`/blog/${post.slug}`))])
  return (
    <section>
      <FadeLeft delay={0.2}>
        <h1 className="font-bold text-2xl mb-8 tracking-tighter">thoughts, lessons, and rants</h1>
      </FadeLeft>
      {allBlogsSorted().map((post, i) => (
        <Article
          key={i}
          article={{
            date: post.publishedAt,
            description: post.summary,
            slug: post.slug,
            title: post.title,
            views: allViews[i],
          }}
        />
      ))}
    </section>
  )
}
