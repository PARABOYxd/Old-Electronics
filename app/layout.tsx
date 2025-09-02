import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ezelectronicspickup.com'),
  title: {
    template: '%s | EZElectronicsPickup',
    default: 'EZElectronicsPickup - Sell Your Old Electronics for Instant Cash | Free Pickup',
  },
  description: 'Get instant cash for your old electronics with free doorstep pickup. Trusted by 15,000+ customers across India. Fair prices, quick service, secure transactions. Smartphones, laptops, tablets & more.',
  keywords: [
    'sell electronics India',
    'electronics pickup service',
    'old phone buyer',
    'laptop buyer India',
    'instant cash electronics',
    'e-waste recycling',
    'doorstep pickup electronics',
    'electronics resale platform',
    'sell mobile phone',
    'sell laptop online',
  ],
  authors: [{ name: 'EZElectronicsPickup Team' }],
  creator: 'EZElectronicsPickup',
  publisher: 'EZElectronicsPickup',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://ezelectronicspickup.com',
    title: 'EZElectronicsPickup - Sell Your Old Electronics for Instant Cash',
    description: 'Get instant cash for your old electronics with free doorstep pickup. Trusted by 15,000+ customers across India.',
    siteName: 'EZElectronicsPickup',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'EZElectronicsPickup - Sell Your Electronics for Cash',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@ezelectronics',
    creator: '@ezelectronics',
    title: 'EZElectronicsPickup - Sell Electronics for Instant Cash',
    description: 'Get instant cash for old electronics with free doorstep pickup. Trusted across India.',
    images: ['/twitter-image.jpg'],
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
  verification: {
    google: 'your-google-site-verification-code',
  },
  other: {
    'msapplication-TileColor': '#22c55e',
    'theme-color': '#22c55e',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}