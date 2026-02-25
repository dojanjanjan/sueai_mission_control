import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "Grande Beach - AI powered Control Center",
  description: 'AI powered Control Center Dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body className="min-h-screen bg-black">{children}</body>
    </html>
  )
}
