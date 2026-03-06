import {GetPageQueryResult, PostQueryResult} from '@/sanity.types'

export type PageBuilderSection = NonNullable<NonNullable<GetPageQueryResult>['pageBuilder']>[number]
export type ExtractPageBuilderType<T extends PageBuilderSection['_type']> = Extract<
  PageBuilderSection,
  {_type: T}
>

export type PageBuilderDocument = {
  _id: string
  _type: string
  pageBuilder?: PageBuilderSection[] | null
}

// Represents a Link after GROQ dereferencing (page/post become slug strings)
export type DereferencedLink = {
  _type: 'link'
  linkType?: 'href' | 'page' | 'post'
  href?: string
  page?: string | null
  post?: string | null
  openInNewTab?: boolean
}
