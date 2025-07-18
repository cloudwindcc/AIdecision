import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI决策助手 - 智能人生决策分析专家',
  description: '基于AI技术的个人决策助手，为您提供职业、财务、人际关系等生活重要决策的专业分析和建议。',
  keywords: 'AI决策助手, 人生决策, 职业选择, 投资分析, 关系咨询, 智能建议',
  authors: [{ name: 'AI Decision Assistant' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#1e293b' },
  ],
  openGraph: {
    title: 'AI决策助手 - 智能人生决策分析专家',
    description: '基于AI技术的个人决策助手，为您提供职业、财务、人际关系等生活重要决策的专业分析和建议。',
    type: 'website',
    locale: 'zh_CN',
    siteName: 'AI决策助手',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI决策助手 - 智能人生决策分析专家',
    description: '基于AI技术的个人决策助手，为您提供职业、财务、人际关系等生活重要决策的专业分析和建议。',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head />
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}