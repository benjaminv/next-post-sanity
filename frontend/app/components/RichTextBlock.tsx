import {type PortableTextBlock} from 'next-sanity'

import PortableText from '@/app/components/PortableText'
import {RichTextBlock as RichTextBlockType} from '@/sanity.types'

type RichTextBlockProps = {
  block: RichTextBlockType
  index: number
  pageId: string
  pageType: string
}

export default function RichTextBlock({block}: RichTextBlockProps) {
  if (!block?.content?.length) {
    return null
  }

  return (
    <div className="my-6">
      <div className="max-w-3xl">
        <PortableText
          className="prose-headings:font-medium prose-headings:tracking-tight"
          value={block.content as PortableTextBlock[]}
        />
      </div>
    </div>
  )
}
