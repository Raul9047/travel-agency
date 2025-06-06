import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Agencia de Viajes',
  description: 'Created by Raúl',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
