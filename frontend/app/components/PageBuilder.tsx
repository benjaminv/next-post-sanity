'use client'

import {SanityDocument} from 'next-sanity'
import {useOptimistic} from 'next-sanity/hooks'

import BlockRenderer from '@/app/components/BlockRenderer'
import {dataAttr} from '@/sanity/lib/utils'
import {PageBuilderSection, PageBuilderDocument} from '@/sanity/lib/types'

type PageBuilderProps = {
  page: PageBuilderDocument | null
  hideEmptyState?: boolean
}

type PageData = {
  _id: string
  _type: string
  pageBuilder?: PageBuilderSection[]
}

/**
 * The PageBuilder component is used to render the blocks from the `pageBuilder` field in the Page type in your Sanity Studio.
 */

function RenderSections({
  pageBuilderSections,
  page,
}: {
  pageBuilderSections: PageBuilderSection[]
  page: PageBuilderDocument
}) {
  return (
    <div
      className="min-w-0"
      data-sanity={dataAttr({
        id: page._id,
        type: page._type,
        path: `pageBuilder`,
      }).toString()}
    >
      {pageBuilderSections.map((block: PageBuilderSection, index: number) => (
        <BlockRenderer
          key={block._key}
          index={index}
          block={block}
          pageId={page._id}
          pageType={page._type}
        />
      ))}
    </div>
  )
}

function RenderEmptyState({page}: {page: PageBuilderDocument}) {
  return (
    <div
      className="container mt-10"
      data-sanity={dataAttr({
        id: page._id,
        type: page._type,
        path: `pageBuilder`,
      }).toString()}
    >
      <div className="prose">
        <h2 className="">This page has no content!</h2>
        <p className="">Open the page in Sanity Studio to add content.</p>
      </div>
    </div>
  )
}

export default function PageBuilder({page, hideEmptyState}: PageBuilderProps) {
  const pageBuilderSections = useOptimistic<
    PageBuilderSection[] | undefined,
    SanityDocument<PageData>
  >(page?.pageBuilder || [], (currentSections, action) => {
    if (action.id !== page?._id) {
      return currentSections
    }

    if (action.document.pageBuilder) {
      return action.document.pageBuilder.map(
        (section) => currentSections?.find((s) => s._key === section?._key) || section,
      )
    }

    return currentSections
  })

  if (pageBuilderSections && pageBuilderSections.length > 0) {
    return <RenderSections pageBuilderSections={pageBuilderSections} page={page!} />
  }

  if (!hideEmptyState && page) {
    return <RenderEmptyState page={page} />
  }

  return null
}
