import type { Metadata } from 'next'
import { Geist_Mono, Silkscreen, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider, themeInitScript } from '@/components/site/theme'
import './globals.css'

const mono = Geist_Mono({ subsets: ['latin', 'latin-ext'], variable: '--font-mono' })
const pixel = Silkscreen({ subsets: ['latin', 'latin-ext'], weight: '400', variable: '--font-px' })
const display = Space_Grotesk({ subsets: ['latin', 'latin-ext'], weight: ['300', '700'], variable: '--font-display' })

export const metadata: Metadata = {
  title: 'Marko Ćirić | Portfolio',
  description: 'Portfolio of Marko Ćirić — RTL design engineer at AMD.',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${mono.variable} ${pixel.variable} ${display.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
