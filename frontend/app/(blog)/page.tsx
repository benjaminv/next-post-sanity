import HeroBanner from '@/app/components/home/HeroBanner'
import LatestPosts from '@/app/components/home/LatestPosts'
import RecentTweets from '@/app/components/home/RecentTweets'
import AboutMe from '@/app/components/home/AboutMe'
import {settingsQuery, allPostsQuery} from '@/sanity/lib/queries'
import {sanityFetch} from '@/sanity/lib/live'

export default async function Page() {
  const [{data: settings}, {data: posts}] = await Promise.all([
    sanityFetch({query: settingsQuery}),
    sanityFetch({query: allPostsQuery}),
  ])

  return (
    <>
      <HeroBanner settings={settings} />
      <LatestPosts posts={posts} />
      <RecentTweets settings={settings} />
      <AboutMe settings={settings} />
    </>
  )
}
