'use client'

import {useEffect, useRef} from 'react'
import SectionHeading from './SectionHeading'

export default function FeaturedContent() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://platform.twitter.com/widgets.js'
    script.async = true
    script.onload = () => {
      if (window.twttr?.widgets) {
        window.twttr.widgets.load(containerRef.current)
      }
    }
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="container">
        <SectionHeading
          eyebrow="Beyond the Blog"
          heading="Featured Content"
          description="Beyond writing, I share insights across platforms. Here's some of my recent activity."
        />

        <div className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center">
                <svg height="16" width="16" viewBox="0 0 834.782 853.566" xmlns="http://www.w3.org/2000/svg" fill="white">
                  <path d="M496.809 361.241 807.576 0h-73.642L464.095 313.661 248.576 0H0l325.907 474.31L0 853.127h73.646l284.957-331.236 227.604 331.236h248.576L496.791 361.241zM395.941 478.489l-33.022-47.23-262.738-375.82h113.116L425.33 358.737l33.022 47.23L733.97 800.208H620.853L395.941 478.506z" />
                </svg>
              </div>
              <span className="font-mono text-base font-medium">@benuoa</span>
            </div>
            <a
              href="https://x.com/Benuoa"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand font-mono text-sm hover:underline"
            >
              Follow &rarr;
            </a>
          </div>

          <div ref={containerRef} className="max-w-2xl">
            <a
              className="twitter-timeline"
              data-height="600"
              data-theme="light"
              data-chrome="noheader nofooter noborders transparent"
              href="https://twitter.com/Benuoa"
            >
              Loading posts from @benuoa...
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

declare global {
  interface Window {
    twttr?: {
      widgets: {
        load: (el?: Element | null) => void
      }
    }
  }
}
