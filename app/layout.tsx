import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { StructuredData } from '@/components/structured-data'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://smartcardio.ru'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'СмартКардио® — портативный кардиограф для ЭКГ дома и в клинике',
    template: '%s | СмартКардио®',
  },
  description:
    'СмартКардио® — портативный кардиограф, который позволяет снять ЭКГ за 20 секунд без гелей и проводов. Запись 6 отведений с медицинской точностью, мгновенная расшифровка ЭКГ на основе ИИ и пульсоксиметрия. Кардиология и дистанционная диагностика сердца дома.',
  keywords: [
    'кардиограф',
    'портативный кардиограф',
    'снять ЭКГ',
    'ЭКГ дома',
    'сделать ЭКГ',
    'ЭКГ онлайн',
    'кардиология',
    'дистанционная ЭКГ',
    'электрокардиограмма',
    'расшифровка ЭКГ',
    'ЭКГ 6 отведений',
    'портативный ЭКГ прибор',
    'диагностика сердца',
    'мониторинг сердца',
    'кардиомонитор',
    'пульсоксиметрия',
    'аритмия',
    'прибор для ЭКГ',
    'СмартКардио',
    'SmartCardio',
  ],
  authors: [{ name: 'СмартКардио®' }],
  creator: 'СмартКардио®',
  publisher: 'СмартКардио®',
  applicationName: 'СмартКардио®',
  category: 'health',
  alternates: {
    canonical: '/',
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: siteUrl,
    siteName: 'СмартКардио®',
    title: 'СмартКардио® — портативный кардиограф для ЭКГ дома и в клинике',
    description:
      'Снимите ЭКГ за 20 секунд без гелей и проводов. Запись 6 отведений с медицинской точностью и мгновенная расшифровка на основе ИИ.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'СмартКардио® — портативный кардиограф для снятия ЭКГ',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'СмартКардио® — портативный кардиограф для ЭКГ дома и в клинике',
    description:
      'Снимите ЭКГ за 20 секунд без гелей и проводов. Запись 6 отведений и мгновенная расшифровка на основе ИИ.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
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
        type: 'image/svg+xml',
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
    <html lang="ru" className="bg-background overflow-x-hidden">
      <body className="font-sans antialiased overflow-x-hidden max-w-full">
        <StructuredData />
        {children}
      </body>
    </html>
  )
}
