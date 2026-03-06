type CodeBlockProps = {
  block: {
    _type: 'codeBlock'
    filename?: string
    highlightedHtml?: string
    code?: {
      _type: 'code'
      language?: string
      code?: string
    }
  }
  index: number
  pageId: string
  pageType: string
}

export default function CodeBlock({block}: CodeBlockProps) {
  const code = block?.code?.code || ''
  const filename = block?.filename
  const html = block?.highlightedHtml

  if (!code) return null

  return (
    <div className="my-6">
      <div className="rounded-lg overflow-hidden border border-gray-200">
        {filename && (
          <div className="bg-gray-800 text-gray-300 text-xs font-mono px-4 py-2 border-b border-gray-700">
            {filename}
          </div>
        )}
        {html ? (
          <div
            className="text-sm [&_pre]:p-4 [&_pre]:overflow-x-auto [&_pre]:m-0"
            dangerouslySetInnerHTML={{__html: html}}
          />
        ) : (
          <pre className="bg-gray-900 text-gray-300 p-4 text-sm overflow-x-auto">
            <code>{code}</code>
          </pre>
        )}
      </div>
    </div>
  )
}
