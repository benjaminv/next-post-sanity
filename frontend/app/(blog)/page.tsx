import HeroBanner from '@/app/components/home/HeroBanner'
import LatestWriting from '@/app/components/home/LatestWriting'
import FeaturedContent from '@/app/components/home/FeaturedContent'
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
      <LatestWriting posts={posts} />
      <FeaturedContent />
      <AboutMe settings={settings} />
    </>
  )
}
