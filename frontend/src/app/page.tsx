'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { fetchApi } from '../lib/api';
import {
  Utensils,
  Calendar,
  MapPin,
  Sparkles,
  ChevronRight,
  Clock,
  Phone,
  Flame,
  Camera,
  Video,
  Navigation,
  Play,
  X,
  ExternalLink,
  ZoomIn,
  Wine,
  Users,
  CheckCircle2,
  ArrowRight,
  Award,
  Layers,
  Heart,
  GlassWater,
  Music,
  Send,
  MessageCircle,
  ShieldCheck,
  ChevronLeft
} from 'lucide-react';

export default function HomePage() {
  const [selectedPhoto, setSelectedPhoto] = useState<any | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<any | null>(null);
  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [activeFoodCategory, setActiveFoodCategory] = useState<string>('TANDOOR');
  const [activeBarCategory, setActiveBarCategory] = useState<string>('SIGNATURE');

  // Reservation Form State in Hero / Widget
  const [resName, setResName] = useState('');
  const [resPhone, setResPhone] = useState('');
  const [resDate, setResDate] = useState(() => {
    const d = new Date();
    return d.toISOString().split('T')[0];
  });
  const [resTime, setResTime] = useState('19:30');
  const [resGuests, setResGuests] = useState(4);
  const [resSeating, setResSeating] = useState('Fairy-Lit Garden Cabana');
  const [resSuccess, setResSuccess] = useState<any | null>(null);
  const [resLoading, setResLoading] = useState(false);
  const [resError, setResError] = useState<string | null>(null);

  // Event Enquiry Form State
  const [evName, setEvName] = useState('');
  const [evPhone, setEvPhone] = useState('');
  const [evEmail, setEvEmail] = useState('');
  const [evType, setEvType] = useState('Birthday Celebration');
  const [evDate, setEvDate] = useState('');
  const [evGuests, setEvGuests] = useState(15);
  const [evNotes, setEvNotes] = useState('');
  const [evSubmitted, setEvSubmitted] = useState(false);
  const [evLoading, setEvLoading] = useState(false);

  const handleReservationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResError(null);
    if (!resName || !resPhone || !resDate || !resTime) {
      setResError('Please provide your name, phone number, and reservation slot.');
      return;
    }

    setResLoading(true);
    const refId = `KB-${Math.floor(100000 + Math.random() * 900000)}`;

    const res = await fetchApi('/tables/reservations', {
      method: 'POST',
      body: JSON.stringify({
        customerName: resName,
        customerPhone: resPhone,
        reservationDate: resDate,
        reservationTime: resTime,
        guestCount: Number(resGuests),
        specialRequests: `Seating Preference: ${resSeating}`,
        referenceNumber: refId,
      }),
    });

    setResLoading(false);
    if (res.success) {
      setResSuccess({
        referenceNumber: res.data?.referenceNumber || refId,
        customerName: resName,
        date: resDate,
        time: resTime,
        guests: resGuests,
        seating: resSeating,
      });
    } else {
      setResError(res.message || 'Unable to confirm booking. Please call +91 99806 26699 directly.');
    }
  };

  const handleEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!evName || !evPhone) return;

    setEvLoading(true);
    await fetchApi('/inquiries', {
      method: 'POST',
      body: JSON.stringify({
        name: evName,
        phone: evPhone,
        email: evEmail || undefined,
        subject: `Event Enquiry: ${evType} (${evGuests} Guests)`,
        message: `Preferred Date: ${evDate || 'TBD'}. Guests: ${evGuests}. Special Notes: ${evNotes}`,
      }),
    });
    setEvLoading(false);
    setEvSubmitted(true);
  };

  // 1. Garden Experience Showcase Data
  const gardenPillars = [
    {
      number: '01',
      title: 'THE GARDEN',
      subtitle: 'Natural Foliage & Shaded Cabanas',
      description:
        'Dine amidst lush tropical greenery, manicured planters, and open-air wooden dining gazebos that bring an immediate sense of calm and rejuvenation.',
      image: '/images/kickbunk/magicpin_07_outdoor_seating_daylight.webp',
      tag: 'Day & Evening Refreshment',
    },
    {
      number: '02',
      title: 'THE AMBIENCE',
      subtitle: 'Enchanting Night Mood Illumination',
      description:
        'When twilight descends, thousands of warm golden fairy lights, decorative feature trees, and illuminated pathways transform Kick Bunk into a captivating wonderland.',
      image: '/images/kickbunk/google_01_garden_lights_night.jpg',
      tag: 'Signature Night Experience',
    },
    {
      number: '03',
      title: 'THE EXPERIENCE',
      subtitle: 'Spacious Spaces & Private Cabanas',
      description:
        'From high-angle terrace vistas and secluded cabanas to high-ceiling covered verandas, choose the dining enclave that matches your mood and party size.',
      image: '/images/kickbunk/google_05_outdoor_terrace_view.jpg',
      tag: 'Private & Group Comfort',
    },
  ];

  // 2. Confirmed & Authentic Food Menu Showcase
  const foodDelicacies = [
    {
      id: 'fd-1',
      category: 'TANDOOR',
      name: 'Charcoal Roasted Kalmi Kebab',
      description:
        'Kick Bunk signature chicken drumsticks marinated in rich hung yogurt, Kashmiri chili, and aromatic royal spices, roasted to smoky perfection in clay tandoors.',
      price: '₹340',
      isVeg: false,
      isSignature: true,
      image: '/images/kickbunk/magicpin_01_kalmi_kebab.webp',
      badge: 'Chef Signature',
    },
    {
      id: 'fd-2',
      category: 'TANDOOR',
      name: 'Murgh Malai Tikka',
      description:
        'Tender boneless chicken morsels steeped in rich cream, cashew paste, green cardamom, and grilled over red-hot charcoal embers.',
      price: '₹360',
      isVeg: false,
      isSignature: true,
      image: '/images/kickbunk/magicpin_04_food_spread_dining.webp',
      badge: 'Guest Favorite',
    },
    {
      id: 'fd-3',
      category: 'TANDOOR',
      name: 'Paneer Tikka Angaare',
      description:
        'Fresh cottage cheese cubes marinated with carom seeds, pounded spices, bell peppers and onions, crisped in our tandoor oven.',
      price: '₹290',
      isVeg: true,
      isSignature: false,
      image: '/images/kickbunk/restaurant_guru_menu_snapshot.jpg',
      badge: 'Vegetarian Delicacy',
    },
    {
      id: 'fd-4',
      category: 'INDIAN CUISINE',
      name: 'Kick Bunk Royal Dum Biryani',
      description:
        'Fragrant long-grain aged basmati rice slow-cooked in handi seal with spiced meats, caramelized onions, saffron, and fresh mint.',
      price: '₹380',
      isVeg: false,
      isSignature: true,
      image: '/images/kickbunk/magicpin_04_food_spread_dining.webp',
      badge: 'Handi Specialty',
    },
    {
      id: 'fd-5',
      category: 'INDIAN CUISINE',
      name: 'Dal Makhani Bukhara',
      description:
        'Black lentils slow-simmered overnight over smoldering coals with fresh tomato puree, butter, and heavy cream for a velvety finish.',
      price: '₹280',
      isVeg: true,
      isSignature: false,
      image: '/images/kickbunk/magicpin_04_food_spread_dining.webp',
      badge: 'Classic Heritage',
    },
    {
      id: 'fd-6',
      category: 'CONTINENTAL',
      name: 'Crispy Garlic Herb Prawns',
      description:
        'Succulent coastal prawns tossed with clarified butter, roasted garlic, fresh parsley, and mild crushed red chilies.',
      price: '₹420',
      isVeg: false,
      isSignature: true,
      image: '/images/kickbunk/restaurant_guru_menu_snapshot.jpg',
      badge: 'Bar Pairing',
    },
    {
      id: 'fd-7',
      category: 'STARTERS',
      name: 'Spicy Pepper Chicken Fry',
      description:
        'Southern coastal style wok-tossed chicken chunks with tellicherry black pepper, curry leaves, and toasted coconut slivers.',
      price: '₹320',
      isVeg: false,
      isSignature: false,
      image: '/images/kickbunk/magicpin_01_kalmi_kebab.webp',
      badge: 'Bestseller',
    },
    {
      id: 'fd-8',
      category: 'STARTERS',
      name: 'Crispy Corn & Water Chestnut Salt & Pepper',
      description:
        'Golden fried corn kernels and crisp water chestnuts tossed with scallions, roasted garlic, and crushed black pepper.',
      price: '₹260',
      isVeg: true,
      isSignature: false,
      image: '/images/kickbunk/restaurant_guru_menu_snapshot.jpg',
      badge: 'Crispy Crunch',
    },
  ];

  // 3. Premium Bar Showcase
  const barCategories = [
    { id: 'SIGNATURE', name: 'SIGNATURE DRINKS' },
    { id: 'COCKTAILS', name: 'COCKTAILS' },
    { id: 'MOCKTAILS', name: 'MOCKTAILS' },
    { id: 'BEER_WINE', name: 'BEER & WINE' },
    { id: 'SPIRITS', name: 'PREMIUM SPIRITS' },
  ];

  const barMenu = [
    {
      category: 'SIGNATURE',
      name: 'Kick Bunk Golden Elixir',
      type: 'Signature Cocktail',
      notes: 'Bourbon, spiced saffron reduction, smoked applewood essence, charred orange twist',
      price: '₹550',
      abv: 'Contains Alcohol',
    },
    {
      category: 'SIGNATURE',
      name: 'Bengaluru Garden Breeze',
      type: 'Botanical Gin Cocktail',
      notes: 'Artisanal gin, fresh cucumber ribbon, garden mint, elderflower tonic, juniper berries',
      price: '₹480',
      abv: 'Contains Alcohol',
    },
    {
      category: 'COCKTAILS',
      name: 'Smoked Charcoal Old Fashioned',
      type: 'Classic Twist',
      notes: 'Aged whiskey, Angostura bitters, demerara sugar cube, enveloped in charred oak smoke',
      price: '₹520',
      abv: 'Contains Alcohol',
    },
    {
      category: 'COCKTAILS',
      name: 'Passionfruit Jalapeño Margarita',
      type: 'Spicy Citrus',
      notes: 'Blanco tequila, passionfruit puree, lime juice, jalapeño slice, black lava salt rim',
      price: '₹490',
      abv: 'Contains Alcohol',
    },
    {
      category: 'MOCKTAILS',
      name: 'Green Apple Mint Fizz',
      type: 'Zero-Proof Refreshment',
      notes: 'Granny Smith apple juice, muddled lime, crushed garden mint, topped with sparkling soda',
      price: '₹240',
      abv: 'Non-Alcoholic',
    },
    {
      category: 'MOCKTAILS',
      name: 'Sunset Lychee Cooler',
      type: 'Zero-Proof Exotic',
      notes: 'Sweet lychee nectar, cranberry float, basil seeds, fresh ginger extract',
      price: '₹240',
      abv: 'Non-Alcoholic',
    },
    {
      category: 'BEER_WINE',
      name: 'Chilled Draught Pitchers & International Brews',
      type: 'Tap & Bottles',
      notes: 'Selection of wheat beers, crisp lagers, IPAs, and full-bodied Indian & international varietals',
      price: 'From ₹250',
      abv: 'Licensed Resto-Bar',
    },
    {
      category: 'SPIRITS',
      name: 'Single Malts, Blended Scotch & Fine Gins',
      type: 'Top-Shelf Cellar',
      notes: 'Carefully curated spirits served with artisanal ice, fresh garnishes, and premium mixers',
      price: 'As per pour',
      abv: '21+ Only',
    },
  ];

  // 4. Signature Experiences Data
  const signatureExperiences = [
    {
      number: '01',
      title: 'DINING EXPERIENCE',
      subtitle: 'Clay-Oven Grills & Family Feasts',
      description:
        'Savor sizzling platters of Kalmi kebabs, fragrant dum biryanis, and curated continental specialties served fresh to your table.',
      image: '/images/kickbunk/magicpin_04_food_spread_dining.webp',
      link: '/menu',
      linkText: 'Explore Food Menu',
    },
    {
      number: '02',
      title: 'GARDEN EXPERIENCE',
      subtitle: 'Fairy-Lit Cabanas & Outdoor Breezes',
      description:
        'Escape city bustle in our expansive garden sanctuary illuminated by golden canopy lights and shaded by tranquil flora.',
      image: '/images/kickbunk/google_01_garden_lights_night.jpg',
      link: '/booking',
      linkText: 'Reserve A Cabana',
    },
    {
      number: '03',
      title: 'BAR EXPERIENCE',
      subtitle: 'Craft Cocktails & Live Sports',
      description:
        'Immerse yourself in our vibrant resto-bar lounge featuring large match screening displays, artisanal drinks, and energetic music.',
      image: '/images/kickbunk/magicpin_06_garden_building_night.webp',
      link: '/bar',
      linkText: 'Discover The Bar',
    },
    {
      number: '04',
      title: 'SPECIAL MOMENTS',
      subtitle: 'Birthdays, Anniversaries & Gatherings',
      description:
        'Make milestones unforgettable with custom dining setups, tailored celebration menus, and attentive VIP hospitality.',
      image: '/images/kickbunk/magicpin_10_decorative_tree_seating.webp',
      link: '/events',
      linkText: 'Plan Your Celebration',
    },
  ];

  // 5. Authentic Gallery Assets
  const galleryAssets = [
    {
      id: 'gal-1',
      title: 'Fairy-Lit Garden Cabanas at Night',
      category: 'GARDEN',
      url: '/images/kickbunk/google_01_garden_lights_night.jpg',
      source: 'Google Business Profile Elevated View',
    },
    {
      id: 'gal-2',
      title: 'Illuminated Entrance & Golden Signboard',
      category: 'AMBIENCE',
      url: '/images/kickbunk/magicpin_02_entrance_night.webp',
      source: 'Magicpin Verified Store Photo',
    },
    {
      id: 'gal-3',
      title: 'Signature Charcoal Roasted Kalmi Kebab',
      category: 'FOOD',
      url: '/images/kickbunk/magicpin_01_kalmi_kebab.webp',
      source: 'Magicpin Official Promotional Dish Photo',
    },
    {
      id: 'gal-4',
      title: 'Outdoor Garden Dining in Daylight',
      category: 'OUTDOOR',
      url: '/images/kickbunk/magicpin_07_outdoor_seating_daylight.webp',
      source: 'Magicpin Verified Store Photo',
    },
    {
      id: 'gal-5',
      title: 'Grand Family Dining Spread & Biryani',
      category: 'FOOD',
      url: '/images/kickbunk/magicpin_04_food_spread_dining.webp',
      source: 'Magicpin Store Dining Photo',
    },
    {
      id: 'gal-6',
      title: 'Illuminated Feature Tree & Garden Seating',
      category: 'GARDEN',
      url: '/images/kickbunk/magicpin_10_decorative_tree_seating.webp',
      source: 'Magicpin Verified Store Photo',
    },
    {
      id: 'gal-7',
      title: 'Garden Resto-Bar Compound at Night',
      category: 'AMBIENCE',
      url: '/images/kickbunk/magicpin_06_garden_building_night.webp',
      source: 'Magicpin Verified Store Photo',
    },
    {
      id: 'gal-8',
      title: 'Air-Conditioned Indoor Dining Booths',
      category: 'INTERIOR',
      url: '/images/kickbunk/restaurant_guru_interior.jpg',
      source: 'Restaurant Guru Interior Venue Photo',
    },
    {
      id: 'gal-9',
      title: 'Stone Garden Pathway with Night Lanterns',
      category: 'GARDEN',
      url: '/images/kickbunk/magicpin_09_garden_pathway_night.webp',
      source: 'Magicpin Verified Store Photo',
    },
    {
      id: 'gal-10',
      title: 'All-Weather Canopy Seating Deck',
      category: 'OUTDOOR',
      url: '/images/kickbunk/yappe_outdoor_canopy.webp',
      source: 'Yappe Verified Venue Photo',
    },
    {
      id: 'gal-11',
      title: 'Official Food & Beverage Menu Card',
      category: 'FOOD',
      url: '/images/kickbunk/restaurant_guru_menu_snapshot.jpg',
      source: 'Restaurant Guru Menu Card Snapshot',
    },
    {
      id: 'gal-12',
      title: 'Daytime Entrance with Official KICK BUNK Sign',
      category: 'OUTDOOR',
      url: '/images/kickbunk/google_02_entrance_daytime_sign.jpg',
      source: 'Google Business Profile Gallery Entry',
    },
  ];

  const [activeGalleryFilter, setActiveGalleryFilter] = useState('ALL');

  const filteredGallery = galleryAssets.filter((item) => {
    if (activeGalleryFilter === 'ALL') return true;
    return item.category === activeGalleryFilter;
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#050505] text-[#F4EFE5] overflow-hidden">
      {/* =========================================================================
          SECTION 1: CINEMATIC FULL-SCREEN HERO EXPERIENCE
          ========================================================================= */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        {/* Full-bleed authentic restaurant background image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 scale-105 transition-transform duration-1000 ease-out"
          style={{
            backgroundImage: `url('/images/kickbunk/google_01_garden_lights_night.jpg')`,
          }}
        />

        {/* Cinematic Vignette & Deep Luxury Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/75 to-[#050505]/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,160,23,0.15)_0%,_rgba(5,5,5,0.7)_60%,_#050505_100%)]" />

        <div className="relative max-w-5xl mx-auto text-center space-y-8 z-10">
          {/* Official Customer Brand Identity Emblem */}
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-[#0B0B0B]/90 border border-[#D4A017]/40 shadow-gold-glow backdrop-blur-md">
            <div className="w-6 h-6 rounded-full overflow-hidden border border-[#D4A017]/50 p-0.5">
              <Image
                src="/images/logo.png"
                alt="KICK BUNK"
                width={24}
                height={24}
                className="object-contain"
              />
            </div>
            <span className="font-cinzel text-xs uppercase tracking-[0.25em] text-[#F5D77A] font-semibold">
              KICK BUNK RESTAURANT & BAR • BENGALURU
            </span>
          </div>

          {/* Exact Required Hero Headline */}
          <h1 className="font-cormorant text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[#FAF8F5] leading-[1.08] max-w-4xl mx-auto">
            AN EXTRAORDINARY PLACE.{' '}
            <span className="text-gold-gradient block mt-1">
              UNFORGETTABLE EXPERIENCES.
            </span>
          </h1>

          {/* Exact Required Supporting Text */}
          <p className="font-manrope text-base sm:text-lg md:text-xl text-[#B8B1A5] font-light max-w-2xl mx-auto leading-relaxed">
            Discover the perfect atmosphere for exceptional dining, memorable evenings and unforgettable moments.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-4">
            <a
              href="#story"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D4A017] via-[#F5D77A] to-[#D4A017] text-[#050505] text-xs sm:text-sm font-bold tracking-[0.18em] uppercase shadow-gold-glow hover:shadow-gold-glow-lg transition-all duration-300 transform hover:-translate-y-0.5"
            >
              EXPLORE THE EXPERIENCE
            </a>

            <a
              href="#reservation"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-[#D4A017]/60 hover:border-[#F5D77A] hover:bg-white/5 text-[#FAF8F5] text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <Calendar className="w-4 h-4 text-[#D4A017] group-hover:scale-110 transition-transform" />
              <span>RESERVE YOUR TABLE</span>
            </a>
          </div>

          {/* Video Walkthrough Teaser Pill */}
          <div className="pt-6">
            <button
              onClick={() =>
                setSelectedVideo({
                  title: 'Drone View Walkthrough & Night Ambience',
                  url: 'https://magicpin.in/Bangalore/Yarandahalli/Restaurant/Kick-Bunk-Restaurant/store/621360/stories?post_id=978426497',
                  caption: 'Official Magicpin verified drone video story showing complete garden resto-bar',
                })
              }
              className="inline-flex items-center gap-2.5 text-xs text-[#B8B1A5] hover:text-[#F5D77A] bg-[#0F1115]/80 border border-[#1F242D] hover:border-[#D4A017]/40 px-4 py-2 rounded-full transition-all group backdrop-blur-sm"
            >
              <span className="w-6 h-6 rounded-full bg-[#D4A017]/20 border border-[#D4A017]/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-3 h-3 text-[#F5D77A] fill-[#F5D77A]" />
              </span>
              <span>Watch Drone & Night Ambience Tour (Video)</span>
            </button>
          </div>
        </div>

        {/* Animated Scroll Down Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 hover:text-[#D4A017] transition-colors cursor-pointer">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#B8B1A5]/60">
            SCROLL TO EXPLORE
          </span>
          <div className="w-5 h-8 rounded-full border border-[#D4A017]/30 flex items-start justify-center p-1">
            <div className="w-1.5 h-2 rounded-full bg-[#D4A017] animate-bounce" />
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: BRAND INTRODUCTION
          ========================================================================= */}
      <section id="story" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Text Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-[#D4A017] uppercase">
              <Sparkles className="w-4 h-4 text-[#D4A017]" />
              <span>WELCOME TO KICK BUNK</span>
            </div>

            <h2 className="font-cormorant text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FAF8F5] leading-tight">
              WHERE DINING MEETS THE ART OF EXPERIENCE.
            </h2>

            <p className="font-manrope text-base sm:text-lg text-[#B8B1A5] font-light leading-relaxed">
              Discover a destination where great food, beautiful surroundings and memorable moments come together. Experience the atmosphere of KICK BUNK Restaurant & Bar.
            </p>

            <div className="pt-2 border-t border-[#1F242D] grid grid-cols-2 sm:grid-cols-3 gap-6 text-sm">
              <div>
                <p className="font-cormorant text-2xl font-bold text-[#F5D77A]">4.1 ★</p>
                <p className="text-xs text-gray-400">1,800+ Google Reviews</p>
              </div>
              <div>
                <p className="font-cormorant text-2xl font-bold text-[#F5D77A]">100%</p>
                <p className="text-xs text-gray-400">Clay Tandoor Charcoal</p>
              </div>
              <div>
                <p className="font-cormorant text-2xl font-bold text-[#F5D77A]">Open-Air</p>
                <p className="text-xs text-gray-400">Lush Garden Cabanas</p>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.16em] uppercase text-[#F5D77A] hover:text-white transition-colors"
              >
                <span>Read Full Story</span>
                <ChevronRight className="w-4 h-4 text-[#D4A017]" />
              </Link>
            </div>
          </div>

          {/* Right Visual Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-[#D4A017]/30 shadow-2xl group">
              <Image
                src="/images/kickbunk/magicpin_02_entrance_night.webp"
                alt="Kick Bunk illuminated restaurant entrance at night"
                width={600}
                height={700}
                className="w-full h-[450px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />

              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[11px] font-mono tracking-widest text-[#F5D77A] uppercase bg-[#0B0B0B]/90 border border-[#D4A017]/40 px-2.5 py-1 rounded-full">
                  Verified Flagship Entrance
                </span>
                <p className="font-cormorant text-xl font-bold text-white mt-2">
                  Bengaluru Garden Resto-Bar
                </p>
                <p className="text-xs text-gray-300">
                  Hulimangala Main Road, Electronic City Phase 1
                </p>
              </div>
            </div>

            {/* Overlapping Gold Accent Card */}
            <div className="absolute -bottom-6 -left-6 bg-[#0B0B0B] border border-[#D4A017]/40 rounded-2xl p-4 shadow-gold-glow hidden sm:flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#D4A017]/20 border border-[#D4A017]/60 flex items-center justify-center text-[#F5D77A]">
                <Utensils className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-white uppercase tracking-wider">Authentic Cuisine</p>
                <p className="text-[11px] text-[#B8B1A5]">Tandoori • Dum Biryani • Bar</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: GARDEN RESTAURANT EXPERIENCE (CORE DIFFERENTIATOR)
          ========================================================================= */}
      <section className="py-24 sm:py-32 bg-[#08090C] border-y border-[#1F242D] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="font-cinzel text-xs font-semibold tracking-[0.3em] text-[#D4A017] uppercase">
              THE GARDEN RESTO-BAR DIFFERENCE
            </span>
            <h2 className="font-cormorant text-4xl sm:text-6xl font-bold tracking-tight text-[#FAF8F5]">
              ESCAPE THE ORDINARY.
            </h2>
            <p className="font-manrope text-base sm:text-lg text-[#B8B1A5] font-light">
              Discover the beauty of dining in an extraordinary garden atmosphere.
            </p>
          </div>

          {/* Three Visual Experiences Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {gardenPillars.map((pillar) => (
              <div
                key={pillar.number}
                className="luxury-glass rounded-3xl overflow-hidden border border-[#D4A017]/20 hover:border-[#D4A017]/60 transition-all duration-500 group flex flex-col justify-between"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={pillar.image}
                    alt={pillar.title}
                    fill
                    className="object-cover group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F1115] via-transparent to-transparent opacity-90" />
                  <span className="absolute top-4 left-4 bg-[#050505]/85 border border-[#D4A017]/40 px-3 py-1 rounded-full text-[11px] font-mono text-[#F5D77A] tracking-wider">
                    {pillar.tag}
                  </span>
                </div>

                <div className="p-6 sm:p-8 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="font-mono text-xs text-[#D4A017] tracking-widest">
                      {pillar.number}
                    </span>
                    <h3 className="font-cormorant text-2xl font-bold text-[#FAF8F5]">
                      {pillar.title}
                    </h3>
                    <p className="text-xs font-semibold text-[#F5D77A] uppercase tracking-wider">
                      {pillar.subtitle}
                    </p>
                    <p className="text-xs sm:text-sm text-[#B8B1A5] font-light leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#1F242D]/60">
                    <Link
                      href="/booking"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D4A017] group-hover:text-[#F5D77A] transition-colors"
                    >
                      <span>Reserve Garden Seating</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Garden Photo Showcase Carousel / Grid Strip */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div
              onClick={() =>
                setSelectedPhoto({
                  url: '/images/kickbunk/magicpin_03_garden_courtyard_night.webp',
                  title: 'Courtyard Seating Illuminated by Warm Lanterns',
                  source: 'Magicpin Verified Store Photo',
                })
              }
              className="relative h-44 rounded-2xl overflow-hidden border border-[#1F242D] hover:border-[#D4A017]/60 cursor-pointer group"
            >
              <Image
                src="/images/kickbunk/magicpin_03_garden_courtyard_night.webp"
                alt="Garden Courtyard Night"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>

            <div
              onClick={() =>
                setSelectedPhoto({
                  url: '/images/kickbunk/magicpin_09_garden_pathway_night.webp',
                  title: 'Stone Garden Pathway with Night Lanterns',
                  source: 'Magicpin Verified Store Photo',
                })
              }
              className="relative h-44 rounded-2xl overflow-hidden border border-[#1F242D] hover:border-[#D4A017]/60 cursor-pointer group"
            >
              <Image
                src="/images/kickbunk/magicpin_09_garden_pathway_night.webp"
                alt="Garden Pathway Night"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>

            <div
              onClick={() =>
                setSelectedPhoto({
                  url: '/images/kickbunk/magicpin_10_decorative_tree_seating.webp',
                  title: 'Central Illuminated Decorative Garden Tree',
                  source: 'Magicpin Verified Store Photo',
                })
              }
              className="relative h-44 rounded-2xl overflow-hidden border border-[#1F242D] hover:border-[#D4A017]/60 cursor-pointer group"
            >
              <Image
                src="/images/kickbunk/magicpin_10_decorative_tree_seating.webp"
                alt="Decorative Tree Seating"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>

            <div
              onClick={() =>
                setSelectedPhoto({
                  url: '/images/kickbunk/google_03_garden_courtyard.jpg',
                  title: 'Peaceful Courtyard Tables in Daylight',
                  source: 'Google Business Profile Gallery Entry',
                })
              }
              className="relative h-44 rounded-2xl overflow-hidden border border-[#1F242D] hover:border-[#D4A017]/60 cursor-pointer group"
            >
              <Image
                src="/images/kickbunk/google_03_garden_courtyard.jpg"
                alt="Garden Courtyard Daytime"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: FOOD EXPERIENCE (CRAFTED TO DELIGHT)
          ========================================================================= */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="font-cinzel text-xs font-semibold tracking-[0.3em] text-[#D4A017] uppercase">
              CULINARY MASTERY
            </span>
            <h2 className="font-cormorant text-4xl sm:text-6xl font-bold tracking-tight text-[#FAF8F5]">
              CRAFTED TO DELIGHT.
            </h2>
            <p className="font-manrope text-base text-[#B8B1A5] font-light">
              Explore a selection of flavours and dining experiences at KICK BUNK.
            </p>
          </div>

          <Link
            href="/menu"
            className="self-start md:self-auto px-6 py-2.5 rounded-full border border-[#D4A017]/50 hover:bg-[#D4A017] hover:text-[#050505] text-[#FAF8F5] text-xs font-bold tracking-[0.16em] uppercase transition-all duration-300 flex items-center gap-2 group"
          >
            <span>EXPLORE FULL MENU</span>
            <ChevronRight className="w-4 h-4 text-[#D4A017] group-hover:text-[#050505]" />
          </Link>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {['TANDOOR', 'INDIAN CUISINE', 'CONTINENTAL', 'STARTERS'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFoodCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all whitespace-nowrap ${
                activeFoodCategory === cat
                  ? 'bg-[#D4A017] text-[#050505] shadow-gold-glow'
                  : 'bg-[#0F1115] text-[#B8B1A5] hover:text-white border border-[#1F242D]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Food Dishes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {foodDelicacies
            .filter((dish) => dish.category === activeFoodCategory)
            .map((dish) => (
              <div
                key={dish.id}
                className="luxury-glass rounded-3xl overflow-hidden border border-[#D4A017]/20 hover:border-[#D4A017]/60 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F1115] via-transparent to-transparent opacity-85" />
                  <span className="absolute top-4 left-4 bg-[#050505]/90 border border-[#D4A017]/40 px-2.5 py-0.5 rounded-full text-[10px] font-mono text-[#F5D77A] tracking-wider">
                    {dish.badge}
                  </span>

                  {/* Veg / Non-Veg Indicator Badge */}
                  <div className="absolute top-4 right-4 bg-[#050505]/90 p-1.5 rounded-md border border-white/20">
                    <span
                      className={`inline-block w-2.5 h-2.5 rounded-full ${
                        dish.isVeg ? 'bg-emerald-500' : 'bg-red-500'
                      }`}
                    />
                  </div>
                </div>

                <div className="p-6 sm:p-7 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-cormorant text-2xl font-bold text-[#FAF8F5] leading-snug">
                        {dish.name}
                      </h3>
                      <span className="font-mono text-base font-bold text-[#F5D77A]">
                        {dish.price}
                      </span>
                    </div>
                    <p className="text-xs text-[#B8B1A5] font-light leading-relaxed">
                      {dish.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#1F242D] flex items-center justify-between">
                    <span className="text-[11px] text-gray-400">
                      {dish.isSignature ? '★ Signature Selection' : 'Freshly Prepared'}
                    </span>
                    <Link
                      href="/menu"
                      className="text-xs font-bold text-[#D4A017] hover:text-[#F5D77A] flex items-center gap-1"
                    >
                      <span>Order Now</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: PREMIUM BAR EXPERIENCE (THE NIGHT HAS ITS OWN CHARACTER)
          ========================================================================= */}
      <section className="py-24 sm:py-32 bg-[#060709] border-y border-[#D4A017]/20 relative overflow-hidden">
        {/* Subtle Amber Glow Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[radial-gradient(circle,_rgba(212,160,23,0.08)_0%,_transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="font-cinzel text-xs font-semibold tracking-[0.3em] text-[#D4A017] uppercase">
              RESTO-BAR & LOUNGE
            </span>
            <h2 className="font-cormorant text-4xl sm:text-6xl font-bold tracking-tight text-[#FAF8F5]">
              THE NIGHT HAS ITS OWN CHARACTER.
            </h2>
            <p className="font-manrope text-base sm:text-lg text-[#B8B1A5] font-light">
              Craft cocktails, chilled draughts, and refined spirits in a sophisticated evening lounge.
            </p>
          </div>

          {/* Bar Category Tabs */}
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {barCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveBarCategory(cat.id)}
                className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all ${
                  activeBarCategory === cat.id
                    ? 'bg-gradient-to-r from-[#D4A017] via-[#F5D77A] to-[#D4A017] text-[#050505] font-bold shadow-gold-glow'
                    : 'bg-[#0F1115] text-[#B8B1A5] hover:text-white border border-[#1F242D]'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Bar Menu Items Card Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {barMenu
              .filter(
                (item) =>
                  activeBarCategory === 'ALL' || item.category === activeBarCategory
              )
              .map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#0B0D11]/90 border border-[#1F242D] hover:border-[#D4A017]/50 rounded-2xl p-6 transition-all duration-300 flex items-start justify-between gap-4"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <Wine className="w-4 h-4 text-[#D4A017]" />
                      <h4 className="font-cormorant text-xl font-bold text-white">
                        {item.name}
                      </h4>
                    </div>
                    <p className="text-[11px] font-mono text-[#F5D77A] tracking-wider uppercase">
                      {item.type} • {item.abv}
                    </p>
                    <p className="text-xs text-[#B8B1A5] font-light leading-relaxed">
                      {item.notes}
                    </p>
                  </div>
                  <span className="font-mono text-sm font-bold text-[#F5D77A] shrink-0">
                    {item.price}
                  </span>
                </div>
              ))}
          </div>

          <div className="text-center pt-4">
            <Link
              href="/bar"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-[#D4A017]/60 hover:bg-[#D4A017] hover:text-[#050505] text-[#FAF8F5] text-xs font-bold tracking-[0.16em] uppercase transition-all duration-300"
            >
              <span>EXPLORE THE BAR MENU</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: SIGNATURE EXPERIENCES
          ========================================================================= */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="font-cinzel text-xs font-semibold tracking-[0.3em] text-[#D4A017] uppercase">
            IMMERSIVE HOSPITALITY
          </span>
          <h2 className="font-cormorant text-4xl sm:text-6xl font-bold tracking-tight text-[#FAF8F5]">
            SIGNATURE EXPERIENCES
          </h2>
          <p className="font-manrope text-base text-[#B8B1A5] font-light">
            Every moment at Kick Bunk is curated for memory, taste, and connection.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {signatureExperiences.map((exp) => (
            <div
              key={exp.number}
              className="relative rounded-3xl overflow-hidden border border-[#1F242D] hover:border-[#D4A017]/60 group h-[420px] flex flex-col justify-end p-6 transition-all duration-500"
            >
              <Image
                src={exp.image}
                alt={exp.title}
                fill
                className="object-cover group-hover:scale-108 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />

              <div className="relative z-10 space-y-2">
                <span className="font-mono text-xs text-[#F5D77A] tracking-widest font-semibold">
                  {exp.number}
                </span>
                <h3 className="font-cormorant text-2xl font-bold text-white">
                  {exp.title}
                </h3>
                <p className="text-xs font-medium text-[#D4A017] uppercase tracking-wider">
                  {exp.subtitle}
                </p>
                <p className="text-xs text-gray-300 font-light leading-relaxed line-clamp-3">
                  {exp.description}
                </p>

                <div className="pt-2">
                  <Link
                    href={exp.link}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F5D77A] hover:text-white transition-colors"
                  >
                    <span>{exp.linkText}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: GALLERY – IMMERSIVE VISUAL EXPERIENCE
          ========================================================================= */}
      <section className="py-24 sm:py-32 bg-[#08090C] border-y border-[#1F242D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <span className="font-cinzel text-xs font-semibold tracking-[0.3em] text-[#D4A017] uppercase">
                AUTHENTIC PHOTOGRAPHY & AMBIENCE
              </span>
              <h2 className="font-cormorant text-4xl sm:text-6xl font-bold tracking-tight text-[#FAF8F5]">
                VISUAL DISCOVERY
              </h2>
              <p className="text-sm text-[#B8B1A5] font-light">
                Verified gallery photography featuring our sprawling garden, nighttime cabanas, and culinary creations.
              </p>
            </div>

            <Link
              href="/gallery"
              className="self-start md:self-auto px-6 py-2.5 rounded-full border border-[#D4A017]/40 hover:bg-[#D4A017] hover:text-[#050505] text-[#FAF8F5] text-xs font-bold tracking-widest uppercase transition-all"
            >
              VIEW ALL 66+ PHOTOS
            </Link>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {['ALL', 'GARDEN', 'FOOD', 'OUTDOOR', 'AMBIENCE', 'INTERIOR'].map(
              (f) => (
                <button
                  key={f}
                  onClick={() => setActiveGalleryFilter(f)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all whitespace-nowrap ${
                    activeGalleryFilter === f
                      ? 'bg-[#D4A017] text-[#050505] font-bold'
                      : 'bg-[#0F1115] text-[#B8B1A5] hover:text-white border border-[#1F242D]'
                  }`}
                >
                  {f}
                </button>
              )
            )}
          </div>

          {/* Masonry / Responsive Photography Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredGallery.slice(0, 8).map((photo) => (
              <div
                key={photo.id}
                onClick={() => setSelectedPhoto(photo)}
                className="relative h-60 rounded-2xl overflow-hidden border border-[#1F242D] hover:border-[#D4A017]/60 group cursor-pointer transition-all duration-300"
              >
                <Image
                  src={photo.url}
                  alt={photo.title}
                  fill
                  className="object-cover group-hover:scale-108 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                  <p className="text-xs font-bold text-white leading-tight">
                    {photo.title}
                  </p>
                  <p className="text-[10px] text-[#F5D77A] mt-0.5">
                    {photo.source}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: EVENTS AND CELEBRATIONS
          ========================================================================= */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="font-cinzel text-xs font-semibold tracking-[0.3em] text-[#D4A017] uppercase">
              CELEBRATE WITH US
            </span>
            <h2 className="font-cormorant text-4xl sm:text-6xl font-bold tracking-tight text-[#FAF8F5] leading-tight">
              PLAN YOUR SPECIAL MOMENT.
            </h2>
            <p className="font-manrope text-base text-[#B8B1A5] font-light leading-relaxed">
              From intimate birthday dinners in illuminated cabanas to vibrant group gatherings, anniversary dinners, and corporate team events — our dedicated event team coordinates custom setups, tailored feast menus, and attentive VIP service.
            </p>

            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#D4A017] shrink-0" />
                <span>Private Fairy-Lit Garden Cabana reservations</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#D4A017] shrink-0" />
                <span>Custom banquet buffet & live barbecue counters</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#D4A017] shrink-0" />
                <span>Big screen displays for celebratory slideshows & match viewing</span>
              </li>
            </ul>

            <div className="pt-2">
              <button
                onClick={() => setEventModalOpen(true)}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D4A017] via-[#F5D77A] to-[#D4A017] text-[#050505] text-xs font-bold tracking-[0.18em] uppercase shadow-gold-glow hover:shadow-gold-glow-lg transition-all"
              >
                ENQUIRE FOR EVENTS
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-[#D4A017]/30 shadow-2xl h-[420px]">
              <Image
                src="/images/kickbunk/google_01_garden_lights_night.jpg"
                alt="Event celebration at Kick Bunk"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-85" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#0B0B0B]/85 border border-[#D4A017]/30 backdrop-blur-md">
                <p className="font-cormorant text-xl font-bold text-white">
                  Corporate & Family Garden Evenings
                </p>
                <p className="text-xs text-[#B8B1A5]">
                  Dedicated event coordinator: +91 99806 26699
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 9: ONLINE TABLE RESERVATION SYSTEM (EMBEDDED)
          ========================================================================= */}
      <section id="reservation" className="py-24 sm:py-32 bg-[#0A0C10] border-t border-[#1F242D] relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <span className="font-cinzel text-xs font-semibold tracking-[0.3em] text-[#D4A017] uppercase">
              TABLE & CABANA BOOKINGS
            </span>
            <h2 className="font-cormorant text-4xl sm:text-6xl font-bold tracking-tight text-[#FAF8F5]">
              BOOK YOUR EXPERIENCE
            </h2>
            <p className="font-manrope text-sm sm:text-base text-[#B8B1A5] font-light max-w-xl mx-auto">
              Reserve your table at Kick Bunk Restaurant & Bar Bengaluru. Instant confirmation and table coordination.
            </p>
          </div>

          {resSuccess ? (
            <div className="luxury-glass border border-[#D4A017]/50 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl">
              <div className="w-16 h-16 rounded-full bg-[#D4A017]/20 border border-[#D4A017] text-[#F5D77A] flex items-center justify-center mx-auto shadow-gold-glow">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="font-mono text-xs text-[#D4A017] tracking-widest uppercase">
                  CONFIRMATION REFERENCE
                </span>
                <p className="font-mono text-2xl sm:text-3xl font-bold text-white">
                  {resSuccess.referenceNumber}
                </p>
                <p className="font-cormorant text-xl text-[#F5D77A] font-semibold">
                  Thank You, {resSuccess.customerName}!
                </p>
                <p className="text-xs text-gray-300 max-w-md mx-auto">
                  Your table reservation for {resSuccess.guests} guests on {resSuccess.date} at {resSuccess.time} ({resSuccess.seating}) has been recorded. Our concierge will welcome you upon arrival.
                </p>
              </div>

              <div className="pt-4 flex flex-wrap justify-center gap-4">
                <a
                  href={`https://wa.me/919980626699?text=Hello%20Kick%20Bunk,%20I%20have%20reserved%20a%20table%20with%20reference%20${resSuccess.referenceNumber}%20for%20${resSuccess.date}%20at%20${resSuccess.time}.`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold tracking-wider flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Confirm on WhatsApp</span>
                </a>

                <button
                  onClick={() => setResSuccess(null)}
                  className="px-6 py-2.5 rounded-full border border-[#D4A017]/40 text-xs text-white hover:border-[#D4A017]"
                >
                  Make Another Booking
                </button>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleReservationSubmit}
              className="luxury-glass border border-[#D4A017]/30 rounded-3xl p-6 sm:p-10 space-y-6 shadow-2xl"
            >
              {resError && (
                <div className="p-3.5 rounded-xl bg-red-950/50 border border-red-500/40 text-red-200 text-xs">
                  {resError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={resName}
                    onChange={(e) => setResName(e.target.value)}
                    placeholder="e.g. Arjun Sharma"
                    className="w-full bg-[#050505] border border-[#1F242D] focus:border-[#D4A017] rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={resPhone}
                    onChange={(e) => setResPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full bg-[#050505] border border-[#1F242D] focus:border-[#D4A017] rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Reservation Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={resDate}
                    onChange={(e) => setResDate(e.target.value)}
                    className="w-full bg-[#050505] border border-[#1F242D] focus:border-[#D4A017] rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Preferred Time Slot *
                  </label>
                  <select
                    value={resTime}
                    onChange={(e) => setResTime(e.target.value)}
                    className="w-full bg-[#050505] border border-[#1F242D] focus:border-[#D4A017] rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                  >
                    <option value="12:30">12:30 PM (Lunch)</option>
                    <option value="13:30">01:30 PM (Lunch)</option>
                    <option value="18:30">06:30 PM (Early Dinner)</option>
                    <option value="19:30">07:30 PM (Garden Dinner)</option>
                    <option value="20:30">08:30 PM (Peak Dinner)</option>
                    <option value="21:30">09:30 PM (Late Night Bar)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Number of Guests *
                  </label>
                  <select
                    value={resGuests}
                    onChange={(e) => setResGuests(Number(e.target.value))}
                    className="w-full bg-[#050505] border border-[#1F242D] focus:border-[#D4A017] rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 25].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Seating Preference
                  </label>
                  <select
                    value={resSeating}
                    onChange={(e) => setResSeating(e.target.value)}
                    className="w-full bg-[#050505] border border-[#1F242D] focus:border-[#D4A017] rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                  >
                    <option value="Fairy-Lit Garden Cabana">Fairy-Lit Garden Cabana</option>
                    <option value="Open Air Garden Patio">Open Air Garden Patio</option>
                    <option value="Family AC Salon">Family AC Dining Salon</option>
                    <option value="Resto-Bar Lounge">Resto-Bar High-Top / Lounge</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={resLoading}
                  className="w-full py-4 rounded-full bg-gradient-to-r from-[#D4A017] via-[#F5D77A] to-[#D4A017] text-[#050505] text-xs font-bold tracking-[0.2em] uppercase shadow-gold-glow hover:shadow-gold-glow-lg transition-all disabled:opacity-50"
                >
                  {resLoading ? 'CONFIRMING AVAILABILITY...' : 'CONFIRM RESERVATION'}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* =========================================================================
          SECTION 10: CONTACT AND LOCATION (MAPS EMBED)
          ========================================================================= */}
      <section id="contact" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="font-cinzel text-xs font-semibold tracking-[0.3em] text-[#D4A017] uppercase">
              BENGALURU FLAGSHIP LOCATION
            </span>
            <h2 className="font-cormorant text-4xl sm:text-5xl font-bold tracking-tight text-[#FAF8F5]">
              KICK BUNK RESTAURANT & BAR
            </h2>

            <div className="space-y-4 text-sm text-gray-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#D4A017] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Address</p>
                  <p className="text-gray-400 leading-relaxed">
                    Hulimangala Main Road, Vinayaka Layout, Vabasandra, Electronic City Phase 1, Bengaluru, Karnataka 560105
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#D4A017] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Direct Phone</p>
                  <a
                    href="tel:+919980626699"
                    className="text-[#F5D77A] font-mono hover:underline"
                  >
                    +91 99806 26699
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#D4A017] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Opening Hours</p>
                  <p className="text-gray-400">Monday – Sunday: 11:30 AM – 11:30 PM</p>
                  <p className="text-xs text-[#D4A017]">Evening Garden Lights from 6:30 PM</p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-4">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Kick+Bunk+Restaurant+and+Bar+Hulimangala+Bengaluru"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-full bg-gradient-to-r from-[#D4A017] via-[#F5D77A] to-[#D4A017] text-[#050505] text-xs font-bold tracking-wider uppercase flex items-center gap-2 shadow-gold-glow"
              >
                <Navigation className="w-4 h-4" />
                <span>GET DIRECTIONS (GOOGLE MAPS)</span>
              </a>

              <a
                href="tel:+919980626699"
                className="px-6 py-3 rounded-full border border-[#D4A017]/40 text-white text-xs font-semibold tracking-wider hover:border-[#D4A017] flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#D4A017]" />
                <span>CLICK TO CALL</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="relative rounded-3xl overflow-hidden border border-[#D4A017]/30 shadow-2xl h-[420px] bg-[#0A0C10]">
              <iframe
                title="Kick Bunk Restaurant and Bar Google Maps Location"
                src="https://maps.google.com/maps?q=Kick%20Bunk%20Restaurant%20and%20Bar%20Hulimangala%20Bengaluru&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          PHOTO LIGHTBOX MODAL
          ========================================================================= */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-[#0B0D11] border border-[#D4A017]/40 rounded-3xl overflow-hidden shadow-2xl"
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/70 text-white hover:text-[#D4A017] flex items-center justify-center border border-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-[65vh] w-full">
              <Image
                src={selectedPhoto.url}
                alt={selectedPhoto.title}
                fill
                className="object-contain"
              />
            </div>

            <div className="p-6 bg-[#08090C] border-t border-[#1F242D] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-cormorant text-2xl font-bold text-white">
                  {selectedPhoto.title}
                </h3>
                <p className="text-xs text-[#D4A017]">{selectedPhoto.source}</p>
              </div>

              <Link
                href="/booking"
                onClick={() => setSelectedPhoto(null)}
                className="px-5 py-2 rounded-full bg-[#D4A017] text-[#050505] text-xs font-bold tracking-wider uppercase"
              >
                Reserve This Setting
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIDEO MODAL
          ========================================================================= */}
      {selectedVideo && (
        <div
          onClick={() => setSelectedVideo(null)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl w-full bg-[#0B0D11] border border-[#D4A017]/50 rounded-3xl overflow-hidden p-6 sm:p-8 space-y-6 shadow-2xl text-center"
          >
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/80 text-white hover:text-[#D4A017] flex items-center justify-center border border-white/20"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 rounded-full bg-[#D4A017]/20 border border-[#D4A017] flex items-center justify-center mx-auto text-[#F5D77A] shadow-gold-glow">
              <Video className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="font-cormorant text-2xl sm:text-3xl font-bold text-white">
                {selectedVideo.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#B8B1A5] max-w-lg mx-auto">
                {selectedVideo.caption}
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={selectedVideo.url}
                target="_blank"
                rel="noreferrer"
                className="px-8 py-3 rounded-full bg-gradient-to-r from-[#D4A017] via-[#F5D77A] to-[#D4A017] text-[#050505] text-xs font-bold tracking-wider uppercase shadow-gold-glow flex items-center gap-2"
              >
                <span>OPEN OFFICIAL VIDEO STORY</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <a
                href="https://www.instagram.com/kick_bunk_gardenrestobar/"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-full border border-[#D4A017]/40 text-white text-xs font-semibold tracking-wider hover:border-[#D4A017]"
              >
                Watch Instagram Reels
              </a>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          EVENT ENQUIRY MODAL
          ========================================================================= */}
      {eventModalOpen && (
        <div
          onClick={() => setEventModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-lg w-full bg-[#0B0D11] border border-[#D4A017]/50 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl"
          >
            <button
              onClick={() => setEventModalOpen(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/80 text-white hover:text-[#D4A017] flex items-center justify-center border border-white/20"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-1">
              <span className="font-cinzel text-xs text-[#D4A017] uppercase tracking-widest">
                KICK BUNK PRIVATE DINING
              </span>
              <h3 className="font-cormorant text-2xl sm:text-3xl font-bold text-white">
                Plan Your Special Moment
              </h3>
            </div>

            {evSubmitted ? (
              <div className="text-center space-y-4 py-8">
                <CheckCircle2 className="w-12 h-12 text-[#D4A017] mx-auto" />
                <p className="font-cormorant text-xl text-white font-semibold">
                  Enquiry Submitted Successfully!
                </p>
                <p className="text-xs text-gray-300">
                  Our event coordinator will contact you at {evPhone} shortly to personalize your celebration.
                </p>
                <button
                  onClick={() => {
                    setEvSubmitted(false);
                    setEventModalOpen(false);
                  }}
                  className="px-6 py-2 rounded-full bg-[#D4A017] text-[#050505] text-xs font-bold uppercase tracking-wider"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleEventSubmit} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="text-gray-300 uppercase">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={evName}
                    onChange={(e) => setEvName(e.target.value)}
                    placeholder="e.g. Priya Nair"
                    className="w-full bg-[#050505] border border-[#1F242D] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#D4A017]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-gray-300 uppercase">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={evPhone}
                      onChange={(e) => setEvPhone(e.target.value)}
                      placeholder="+91 99806 26699"
                      className="w-full bg-[#050505] border border-[#1F242D] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#D4A017]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-gray-300 uppercase">Event Type</label>
                    <select
                      value={evType}
                      onChange={(e) => setEvType(e.target.value)}
                      className="w-full bg-[#050505] border border-[#1F242D] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#D4A017]"
                    >
                      <option value="Birthday Celebration">Birthday Celebration</option>
                      <option value="Family Gathering">Family Gathering</option>
                      <option value="Friends Meetup">Friends Meetup</option>
                      <option value="Special Occasion / Anniversary">Anniversary</option>
                      <option value="Private Dining">Private Dining</option>
                      <option value="Corporate Dinner">Corporate Dinner</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-gray-300 uppercase">Date of Event</label>
                    <input
                      type="date"
                      value={evDate}
                      onChange={(e) => setEvDate(e.target.value)}
                      className="w-full bg-[#050505] border border-[#1F242D] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#D4A017]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-gray-300 uppercase">Estimated Guests</label>
                    <input
                      type="number"
                      min={4}
                      max={200}
                      value={evGuests}
                      onChange={(e) => setEvGuests(Number(e.target.value))}
                      className="w-full bg-[#050505] border border-[#1F242D] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#D4A017]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-gray-300 uppercase">Additional Requirements</label>
                  <textarea
                    rows={3}
                    value={evNotes}
                    onChange={(e) => setEvNotes(e.target.value)}
                    placeholder="e.g. Garden cabana setup, cake arrangement, special dietary requirements..."
                    className="w-full bg-[#050505] border border-[#1F242D] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#D4A017]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={evLoading}
                  className="w-full py-3 rounded-full bg-gradient-to-r from-[#D4A017] via-[#F5D77A] to-[#D4A017] text-[#050505] font-bold uppercase tracking-wider text-xs shadow-gold-glow"
                >
                  {evLoading ? 'SUBMITTING...' : 'SEND EVENT ENQUIRY'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
