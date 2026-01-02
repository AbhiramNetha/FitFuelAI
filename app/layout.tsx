import type { Metadata } from 'next'
import { DM_Sans, Outfit } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/contexts/ThemeContext'

const dmSans = DM_Sans({ 
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700']
})

const outfit = Outfit({ 
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['600', '700', '800']
})

export const metadata: Metadata = {
  title: 'FitFuel AI - AI-Powered Nutrition Coach',
  description: 'Track calories, macros, and nutrition with AI-powered food recognition and personalized recommendations',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dmSans.variable} ${outfit.variable} font-sans antialiased`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
