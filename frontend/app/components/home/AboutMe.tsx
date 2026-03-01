import {PortableText} from '@portabletext/react'
import {PortableTextBlock} from 'next-sanity'

import {SettingsQueryResult} from '@/sanity.types'
import SectionHeading from './SectionHeading'

const TOPIC_COLORS = [
  'bg-pink-100 text-pink-700',
  'bg-rose-100 text-rose-700',
  'bg-green-100 text-green-700',
  'bg-teal-100 text-teal-700',
  'bg-amber-100 text-amber-700',
  'bg-purple-100 text-purple-700',
  'bg-blue-100 text-blue-700',
  'bg-orange-100 text-orange-700',
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
                <h3 className="font-bold text-lg mb-4">What I Write About</h3>
                <div className="flex flex-wrap gap-2">
                  {settings.topics.map((topic, index) => (
                    <span
                      key={topic._key}
                      className={`text-sm font-medium px-4 py-1.5 rounded-full ${TOPIC_COLORS[index % TOPIC_COLORS.length]}`}
                    >
                      {topic.name}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="lg:col-span-2">
            <div className="bg-gray-50 rounded-xl p-8 text-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">
                  {settings.title ? getInitials(settings.title) : '?'}
                </span>
              </div>
              <h3 className="font-bold text-xl mb-1">{settings.title}</h3>
              {settings.profileTitle && (
                <p className="text-gray-500 text-sm mb-2">{settings.profileTitle}</p>
              )}
              <p className="text-brand font-mono text-sm">@benuoa everywhere</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
