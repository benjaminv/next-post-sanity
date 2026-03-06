import {codeToHtml} from 'shiki'

type CodeBlockSection = {
  _type: 'codeBlock'
  _key: string
  filename?: string
  code?: {
    _type: 'code'
    language?: string
    code?: string
  }
  highlightedHtml?: string
}

type PageBuilderSection = CodeBlockSection | {_type: string; _key: string; [key: string]: unknown}

/**
 * Pre-highlights code blocks server-side using shiki.
 * Call this in server components before passing pageBuilder data to the client PageBuilder.
 */
export async function highlightCodeBlocks(
  sections: PageBuilderSection[] | null | undefined,
): Promise<PageBuilderSection[] | null | undefined> {
  if (!sections) return sections

  return Promise.all(
    sections.map(async (block) => {
      if (block._type !== 'codeBlock') return block

      const codeBlock = block as CodeBlockSection
      const code = codeBlock.code?.code
      if (!code) return block

      const language = codeBlock.code?.language || 'typescript'
      try {
        const highlightedHtml = await codeToHtml(code, {
          lang: language,
          theme: 'github-dark',
        })
        return {...block, highlightedHtml}
      } catch {
        // If language isn't supported, fall back to plaintext
        try {
          const highlightedHtml = await codeToHtml(code, {
            lang: 'text',
            theme: 'github-dark',
          })
          return {...block, highlightedHtml}
        } catch {
          return block
        }
      }
    }),
  )
}
