import type React from 'react'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import OCConnectWrapper from '@/provider/OCConnectWrapper'
import { ThemeProvider } from '@/components/theme-provider'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Research Scholar - OpenCampus ID',
  description: 'Connect with OpenCampus ID for decentralized research funding'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <OCConnectWrapper sandboxMode={true}>{children}</OCConnectWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}
