import {defineField, defineType} from 'sanity'
import {CodeBlockIcon} from '@sanity/icons'

export const codeBlock = defineType({
  name: 'codeBlock',
  title: 'Code Block',
  type: 'object',
  icon: CodeBlockIcon,
  fields: [
    defineField({
      name: 'filename',
      title: 'Filename',
      description: 'Optional filename displayed above the code block.',
      type: 'string',
    }),
    defineField({
      name: 'code',
      title: 'Code',
      type: 'code',
      initialValue: {
        language: 'typescript',
      },
      options: {
        language: 'typescript',
        languageAlternatives: [
          {title: 'JavaScript', value: 'javascript'},
          {title: 'TypeScript', value: 'typescript'},
          {title: 'JSX', value: 'jsx'},
          {title: 'TSX', value: 'tsx'},
          {title: 'Python', value: 'python'},
          {title: 'HTML', value: 'html'},
          {title: 'CSS', value: 'css'},
          {title: 'JSON', value: 'json'},
          {title: 'Bash', value: 'bash'},
          {title: 'Go', value: 'go'},
          {title: 'Rust', value: 'rust'},
          {title: 'SQL', value: 'sql'},
          {title: 'GROQ', value: 'groq'},
          {title: 'Plain Text', value: 'text'},
        ],
        withFilename: false,
      },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      filename: 'filename',
      code: 'code',
    },
    prepare({filename, code}) {
      return {
        title: filename || code?.language || 'Code Block',
        subtitle: 'Code Block',
      }
    },
  },
})
