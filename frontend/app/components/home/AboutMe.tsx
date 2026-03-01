import {PortableText} from '@portabletext/react'
import {PortableTextBlock} from 'next-sanity'

import {SettingsQueryResult} from '@/sanity.types'
import SectionHeading from './SectionHeading'

const RANDOM_COLORS = [
  {bg: '#fce7f3', text: '#be185d'},
  {bg: '#ffe4e6', text: '#be123c'},
  {bg: '#dcfce7', text: '#15803d'},
  {bg: '#ccfbf1', text: '#0f766e'},
  {bg: '#fef3c7', text: '#b45309'},
  {bg: '#ede9fe', text: '#6d28d9'},
  {bg: '#dbeafe', text: '#1d4ed8'},
  {bg: '#ffedd5', text: '#c2410c'},
]

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

type AboutMeProps = {
  settings: SettingsQueryResult
}

export default function AboutMe({settings}: AboutMeProps) {
  if (!settings) return null

  const author = settings.profileAuthor as {
    firstName: string | null
    lastName: string | null
  } | null

  return (
    <section className="py-16 sm:py-24">
      <div className="container">
        <SectionHeading eyebrow="Get to Know Me" heading="About Me" />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mt-4">
          <div className="lg:col-span-3">
            {settings.aboutBio && (
              <div className="prose prose-gray prose-lg max-w-none mb-8">
                <PortableText value={settings.aboutBio as PortableTextBlock[]} />
              </div>
            )}

            {settings.topics && settings.topics.length > 0 && (
              <>
                <hr className="border-gray-200 mb-6" />
                <h3 className="font-bold text-lg mb-4">Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {settings.topics.map((topic, index) => {
                    const hex = topic.color?.hex
                    const fallback = RANDOM_COLORS[index % RANDOM_COLORS.length]
                    const bgColor = hex || fallback.bg
                    const textColor = hex ? contrastText(hex) : fallback.text

                    return (
                      <span
                        key={topic._key}
                        className="text-sm font-medium px-4 py-1.5 rounded-full"
                        style={{backgroundColor: bgColor, color: textColor}}
                      >
                        {topic.name}
                      </span>
                    )
                  })}
                </div>
              </>
            )}
          </div>

          <div className="lg:col-span-2">
            <div className="bg-gray-50 rounded-xl p-8 text-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-300 to-teal-500 flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">
                  {author
                    ? getInitials(`${author.firstName ?? ''} ${author.lastName ?? ''}`)
                    : settings.title
                      ? getInitials(settings.title)
                      : '?'}
                </span>
              </div>
              <h3 className="font-bold text-xl mb-1">
                {author
                  ? `${author.firstName} ${author.lastName}`
                  : settings.title}
              </h3>
              {settings.profileTitle && (
                <p className="text-gray-500 text-sm mb-2">{settings.profileTitle}</p>
              )}
              {settings.profileTagline && (
                <p className="text-brand font-mono text-sm">{settings.profileTagline}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function contrastText(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  // Relative luminance (WCAG formula)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.55 ? '#1a1a1a' : '#ffffff'
}
