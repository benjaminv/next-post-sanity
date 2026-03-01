import type {Metadata} from 'next'
import Link from 'next/link'

import {sanityFetch} from '@/sanity/lib/live'
import {allPostsQuery, settingsQuery} from '@/sanity/lib/queries'
import {AllPostsQueryResult} from '@/sanity.types'
import DateComponent from '@/app/components/Date'
import SectionHeading from '@/app/components/home/SectionHeading'
import {dataAttr} from '@/sanity/lib/utils'

export async function generateMetadata(): Promise<Metadata> {
  const {data: settings} = await sanityFetch({query: settingsQuery, stega: false})

  return {
    title: `Blog | ${settings?.title || 'Blog'}`,
    description: 'Thoughts on product management, developer experience, building in public, and the space between code and strategy.',
  }
}

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
      className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors relative bg-white"
    >
      <Link href={`/posts/${slug}`}>
        <span className="absolute inset-0 z-10" />
      </Link>
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
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      {excerpt && (
        <p className="text-sm leading-relaxed text-gray-500">{excerpt}</p>
      )}
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

export default async function PostsPage() {
  const {data: posts} = await sanityFetch({query: allPostsQuery})

  return (
    <div className="mt-24 lg:mt-32">
      <div className="container py-16 sm:py-24">
        <SectionHeading
          eyebrow="Blog"
          heading="Posts"
          description="Thoughts on product management, developer experience, building in public, and the space between code and strategy."
        />
        <div className="flex flex-col gap-4">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </div>
  )
}
