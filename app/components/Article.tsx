import { Card } from './Card'
export function formatDate(dateString: string) {
  return new Date(`${dateString}T00:00:00Z`).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

export function Article({
  article,
}: {
  article: {
    title: string
    slug: string
    date: string
    description: string
    views: number | string
  }
}) {
  return (
    <Card as="article">
      <Card.Title href={`/blog/${article.slug}`}>{article.title}</Card.Title>
      <Card.Eyebrow as="time" dateTime={article.date} decorate>
        {formatDate(article.date)}
      </Card.Eyebrow>
      <Card.Description>
        <div className="flex justify-between ">
          <div className="max-w-[250px] sm:max-w-md lg:max-w-lg">{article.description}</div>
          <div className="text-right flex-row">
            {`${Number(article.views).toLocaleString('en-US')}`} {'Views'}
          </div>
        </div>
      </Card.Description>

      <Card.Cta>Read Article</Card.Cta>
    </Card>
  )
}
