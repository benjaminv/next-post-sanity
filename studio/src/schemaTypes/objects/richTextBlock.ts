import {defineField, defineType} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons'

export const richTextBlock = defineType({
  name: 'richTextBlock',
  title: 'Rich Text',
  type: 'object',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent',
    }),
  ],
  preview: {
    select: {
      title: 'content',
    },
    prepare({title}) {
      const firstBlock = title?.find((b: {_type: string}) => b._type === 'block')
      return {
        title: firstBlock?.children?.[0]?.text || 'Untitled Rich Text',
        subtitle: 'Rich Text',
      }
    },
  },
})
