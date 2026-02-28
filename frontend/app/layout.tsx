import './globals.css'

import {SpeedInsights} from '@vercel/speed-insights/next'
import {Inter, IBM_Plex_Mono} from 'next/font/google'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

const ibmPlexMono = IBM_Plex_Mono({
  variable: '--font-ibm-plex-mono',
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${ibmPlexMono.variable} bg-white text-black`}>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}
