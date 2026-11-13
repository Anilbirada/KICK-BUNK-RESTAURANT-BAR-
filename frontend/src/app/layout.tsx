import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '../lib/cartContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { LoadingScreen } from '../components/LoadingScreen';

export const metadata: Metadata = {
  metadataBase: new URL('https://kickbunk.com'),
  title: 'KICK BUNK – Restaurant & Bar | Bengaluru Luxury Garden Resto-Bar',
  description:
    'Discover KICK BUNK Restaurant & Bar in Bengaluru. An extraordinary luxury garden resto-bar experience with charcoal clay-oven tandoor, signature cocktails, private cabanas, and night ambience on Hulimangala Main Road. Call: +91 99806 26699.',
  keywords: [
    'Kick Bunk',
    'Kick Bunk Restaurant and Bar',
    'Kick Bunk Bengaluru',
    'Garden Restaurant Bengaluru',
    'Luxury Resto Bar Electronic City',
    'Hulimangala Main Road restaurant',
    'Open air garden cabanas',
    'Tandoori kebabs Bengaluru',
    'Cocktail bar Bangalore',
  ],
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/icon.png',
  },
  authors: [{ name: 'Kick Bunk Hospitality Group' }],
  creator: 'Kick Bunk',
  publisher: 'Kick Bunk Hospitality Group',
  formatDetection: {
    telephone: true,
    address: true,
  },
  openGraph: {
    title: 'KICK BUNK – Restaurant & Bar | Bengaluru Flagship',
    description:
      'Where dining meets the art of experience. Discover luxury open-air garden dining, authentic charcoal tandoor, craft libations, and private cabanas in Bengaluru.',
    url: 'https://kickbunk.com',
    siteName: 'KICK BUNK Restaurant & Bar',
    images: [
      {
        url: '/images/kickbunk/google_01_garden_lights_night.jpg',
        width: 1200,
        height: 800,
        alt: 'Kick Bunk Restaurant & Bar Bengaluru Garden Ambience at Night',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KICK BUNK – Restaurant & Bar | Luxury Garden Dining',
    description:
      'Lush open-air garden cabanas, charcoal tandoor kebabs, craft cocktail bar in Bengaluru. Call: +91 99806 26699.',
    images: ['/images/kickbunk/google_01_garden_lights_night.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: 'KICK BUNK Restaurant & Bar',
    image: [
      'https://kickbunk.com/images/kickbunk/google_01_garden_lights_night.jpg',
      'https://kickbunk.com/images/kickbunk/magicpin_02_entrance_night.webp',
      'https://kickbunk.com/images/kickbunk/magicpin_01_kalmi_kebab.webp',
      'https://kickbunk.com/images/logo.png',
    ],
    '@id': 'https://kickbunk.com',
    url: 'https://kickbunk.com',
    telephone: '+919980626699',
    priceRange: '₹₹',
    menu: 'https://kickbunk.com/menu',
    servesCuisine: ['North Indian', 'Tandoori', 'Biryani', 'Continental', 'Bar Delights', 'Mocktails & Cocktails'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Hulimangala Main Road, Vinayaka Layout, Vabasandra',
      addressLocality: 'Electronic City Phase 1, Bengaluru',
      addressRegion: 'Karnataka',
      postalCode: '560105',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 12.8242,
      longitude: 77.6835,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '11:30',
        closes: '23:30',
      },
    ],
    sameAs: [
      'https://www.instagram.com/kick_bunk_gardenrestobar/',
      'https://www.google.com/maps/search/?api=1&query=Kick+Bunk+Restaurant+and+Bar+Hulimangala+Bengaluru',
      'https://magicpin.in/Bangalore/Yarandahalli/Restaurant/Kick-Bunk-Restaurant/store/621360/photos?id=6&img=Store-Images',
      'https://restaurant-guru.in/Kick-Bunk-Restaurant-and-Bar-Bengaluru',
      'https://www.zomato.com/bangalore/kick-bunk-restaurant-electronic-city-bangalore',
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#F7F3EB] text-[#25231F] min-h-screen flex flex-col antialiased selection:bg-[#B58A45] selection:text-[#25231F]">
        <LoadingScreen />
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
