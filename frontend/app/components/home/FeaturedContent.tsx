'use client'

import {useEffect, useRef, useState} from 'react'
import SectionHeading from './SectionHeading'

export default function FeaturedContent() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    if (!containerRef.current) return

    const el = containerRef.current

    function createTimeline() {
      if (!window.twttr?.widgets?.createTimeline) return
      // Clear any previous content
      el.innerHTML = ''
      window.twttr.widgets
        .createTimeline(
          {sourceType: 'profile', screenName: 'Benuoa'},
          el,
          {height: 600, chrome: 'noheader nofooter noborders transparent', theme: 'light'},
        )
        .catch(() => setFailed(true))
    }

    // If twttr is already loaded (e.g. hot reload), use it directly
    if (window.twttr?.widgets?.createTimeline) {
      createTimeline()
      return
    }

    // Otherwise load the script
    const existing = document.querySelector('script[src="https://platform.twitter.com/widgets.js"]')
    if (existing) {
      // Script tag exists but may still be loading — poll for readiness
      const interval = setInterval(() => {
        if (window.twttr?.widgets?.createTimeline) {
          clearInterval(interval)
          createTimeline()
        }
      }, 200)
      const timeout = setTimeout(() => {
        clearInterval(interval)
        setFailed(true)
      }, 10000)
      return () => {
        clearInterval(interval)
        clearTimeout(timeout)
      }
    }

    const script = document.createElement('script')
    script.src = 'https://platform.twitter.com/widgets.js'
    script.async = true
    script.onload = () => {
      // widgets.js sets up twttr.widgets asynchronously after script load
      const interval = setInterval(() => {
        if (window.twttr?.widgets?.createTimeline) {
          clearInterval(interval)
          createTimeline()
        }
      }, 100)
      setTimeout(() => {
        clearInterval(interval)
        if (!window.twttr?.widgets?.createTimeline) setFailed(true)
      }, 5000)
    }
    script.onerror = () => setFailed(true)
    document.body.appendChild(script)
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

          <div ref={containerRef} className="max-w-2xl min-h-50">
            {failed && (
              <div className="text-gray-400 text-sm font-mono py-8">
                Could not load timeline.{' '}
                <a
                  href="https://x.com/Benuoa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand hover:underline"
                >
                  View on X &rarr;
                </a>
              </div>
            )}
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
        createTimeline: (
          source: {sourceType: string; screenName: string},
          el: HTMLElement,
          options?: Record<string, unknown>,
        ) => Promise<HTMLElement>
        load: (el?: Element | null) => void
      }
    }
  }
}
