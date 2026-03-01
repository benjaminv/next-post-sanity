import Link from 'next/link'

import {AllPostsQueryResult} from '@/sanity.types'
import DateComponent from '@/app/components/Date'
import SectionHeading from './SectionHeading'
import {dataAttr} from '@/sanity/lib/utils'

const TAG_COLORS = [
  'bg-red-100 text-red-700',
  'bg-green-100 text-green-700',
  'bg-blue-100 text-blue-700',
  'bg-amber-100 text-amber-700',
  'bg-purple-100 text-purple-700',
  'bg-teal-100 text-teal-700',
  'bg-pink-100 text-pink-700',
  'bg-indigo-100 text-indigo-700',
]

function getTagColor(tag: string): string {
  let hash = 0
  for (let i = 0; i < tag.length; i++) {
    hash = tag.charCodeAt(i) + ((hash << 5) - hash)
  }
  return TAG_COLORS[Math.abs(hash) % TAG_COLORS.length]
}

function PostCard({post}: {post: AllPostsQueryResult[number]}) {
  const {_id, title, slug, excerpt, date, tags, readTime} = post

  return (
    <article
      data-sanity={dataAttr({id: _id, type: 'post', path: 'title'}).toString()}
      className="border border-gray-200 rounded-lg p-6 flex flex-col justify-start hover:border-gray-300 transition-colors relative bg-white"
    >
      <Link href={`/posts/${slug}`}>
        <span className="absolute inset-0 z-10" />
      </Link>
      <div>
        <div className="flex items-center gap-2 mb-3">
          <time className="text-gray-400 text-xs font-mono" dateTime={date}>
            <DateComponent dateString={date} />
          </time>
          {readTime > 0 && (
            <>
              <span className="text-gray-300">&bull;</span>
              <span className="text-gray-400 text-xs font-mono">{readTime} min read</span>
            </>
          )}
        </div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        {excerpt && (
          <p className="line-clamp-3 text-sm leading-relaxed text-gray-500">{excerpt}</p>
        )}
      </div>
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className={`text-xs font-medium px-3 py-1 rounded-full ${getTagColor(tag)}`}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  )
}

type LatestPostsProps = {
  posts: AllPostsQueryResult
}

export default function LatestPosts({posts}: LatestPostsProps) {
  if (!posts || posts.length === 0) return null

  const displayPosts = posts.slice(0, 4)

  return (
    <section className="py-16 sm:py-24">
      <div className="container">
        <SectionHeading
          eyebrow="Articles and Tutorials"
          heading="Latest Posts"
          description="Thoughts on product, code, and the space in between."
          action={{label: 'View all', href: '/posts'}}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayPosts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}
