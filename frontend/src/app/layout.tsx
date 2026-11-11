import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '../lib/cartContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://kickbunk.com'),
  title: 'Kick Bunk Restaurant & Bar | Bengaluru Flagship | Garden Dining & Charcoal Tandoor',
  description:
    'Experience Kick Bunk Restaurant & Bar in Bengaluru (Hulimangala Main Road, Electronic City Phase 1). Authentic charcoal clay-oven tandoor, royal dum biryani, open-air garden cabanas, live sports screening and full resto-bar. Call: +91 99806 26699.',
  keywords: [
    'Kick Bunk',
    'Kick Bunk Restaurant and Bar',
    'Kick Bunk Bengaluru',
    'Garden Restaurant Bengaluru',
    'Resto Bar Electronic City',
    'Hulimangala Main Road restaurant',
    'Open air dining Bengaluru',
    'Tandoori kebabs Bengaluru',
    'Cabana dining Bangalore',
    'Best family garden restaurant',
  ],
  authors: [{ name: 'Kick Bunk Hospitality Group' }],
  creator: 'RSR Technologies',
  publisher: 'Kick Bunk Hospitality Group',
  formatDetection: {
    telephone: true,
    address: true,
  },
  openGraph: {
    title: 'Kick Bunk Restaurant & Bar | Bengaluru Garden Dining & Resto-Bar',
    description:
      'Lush open-air garden dining, private cabanas, charcoal clay-oven tandoors, and vibrant resto-bar on Hulimangala Main Road, Bengaluru. Call +91 99806 26699.',
    url: 'https://kickbunk.com',
    siteName: 'Kick Bunk Restaurant & Bar',
    images: [
      {
        url: '/images/kickbunk/google_01_garden_lights_night.jpg',
        width: 1200,
        height: 800,
        alt: 'Kick Bunk Bengaluru Garden Cabanas and Night Lights',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kick Bunk Restaurant & Bar | Bengaluru Garden Dining',
    description:
      'Lush open-air garden cabanas, charcoal tandoor kebabs, dum biryani, and full resto-bar in Bengaluru. Call: +91 99806 26699.',
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
    name: 'Kick Bunk Restaurant & Bar',
    image: [
      'https://kickbunk.com/images/kickbunk/google_01_garden_lights_night.jpg',
      'https://kickbunk.com/images/kickbunk/magicpin_02_entrance_night.webp',
      'https://kickbunk.com/images/kickbunk/magicpin_01_kalmi_kebab.webp',
    ],
    '@id': 'https://kickbunk.com',
    url: 'https://kickbunk.com',
    telephone: '+919980626699',
    priceRange: '₹₹',
    menu: 'https://kickbunk.com/menu',
    servesCuisine: ['North Indian', 'Tandoori', 'Biryani', 'South Indian', 'Chinese', 'Bar Snacks'],
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
      'https://magicpin.in/Bangalore/Yarandahalli/Restaurant/Kick-Bunk-Restaurant/store/621360/photos?id=6&img=Store-Images',
      'https://restaurant-guru.in/Kick-Bunk-Restaurant-and-Bar-Bengaluru',
      'https://www.zomato.com/bangalore/kick-bunk-restaurant-electronic-city-bangalore',
      'https://www.google.com/maps/search/?api=1&query=Kick+Bunk+Restaurant+and+Bar+Hulimangala+Bengaluru',
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
      <body className="bg-brand-dark text-brand-ivory min-h-screen flex flex-col antialiased selection:bg-brand-gold selection:text-brand-dark">
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
