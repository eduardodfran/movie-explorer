import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Movie Explorer - Discover Your Next Favorite Film',
  description:
    'Search and explore millions of movies with our advanced movie discovery platform',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`bg-slate-900 antialiased min-h-screen text-slate-100 flex items-center justify-center`}
      >
        {children}
      </body>
    </html>
  )
}
