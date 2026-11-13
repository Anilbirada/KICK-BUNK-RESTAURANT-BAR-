'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Wine,
  Sparkles,
  GlassWater,
  Calendar,
  Phone,
  Clock,
  MapPin,
  ChevronRight,
  Music,
  Tv,
  Award,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export default function BarExperiencePage() {
  const [activeTab, setActiveTab] = useState('ALL');

  const categories = [
    { id: 'ALL', name: 'ALL DRINKS' },
    { id: 'SIGNATURE', name: 'SIGNATURE DRINKS' },
    { id: 'COCKTAILS', name: 'COCKTAILS' },
    { id: 'MOCKTAILS', name: 'MOCKTAILS' },
    { id: 'WHISKY', name: 'WHISKY & SCOTCH' },
    { id: 'GIN_VODKA', name: 'GIN & VODKA' },
    { id: 'BEER_WINE', name: 'BEER & WINE' },
  ];

  const drinks = [
    {
      id: 'b-1',
      category: 'SIGNATURE',
      name: 'Kick Bunk Golden Elixir',
      type: 'Signature Cocktail',
      description:
        'Aged small-batch bourbon, house-infused Kashmiri saffron reduction, aromatic bitters, smoked applewood mist, and flamed orange peel.',
      price: '₹550',
      tag: 'Kick Bunk Exclusive',
      image: '/images/kickbunk/magicpin_06_garden_building_night.webp',
    },
    {
      id: 'b-2',
      category: 'SIGNATURE',
      name: 'Bengaluru Garden Breeze',
      type: 'Botanical Gin Infusion',
      description:
        'Artisanal Indian craft gin, fresh garden cucumber ribbons, handpicked mint sprigs, elderflower tonic, and cracked juniper berries.',
      price: '₹480',
      tag: 'Fresh & Botanical',
      image: '/images/kickbunk/google_01_garden_lights_night.jpg',
    },
    {
      id: 'b-3',
      category: 'COCKTAILS',
      name: 'Smoked Oak Old Fashioned',
      type: 'Classic Heritage',
      description:
        'Selected bourbon whiskey, demerara sugar syrup, aromatic Angostura bitters, served over crystal clear ice cube with charred oak smoke.',
      price: '₹520',
      tag: 'Smoky & Bold',
      image: '/images/kickbunk/magicpin_02_entrance_night.webp',
    },
    {
      id: 'b-4',
      category: 'COCKTAILS',
      name: 'Passionfruit Jalapeño Margarita',
      type: 'Spicy Agave Cocktail',
      description:
        '100% blue agave silver tequila, tropical passionfruit pulp, fresh lime cordial, muddled jalapeño slice, and black volcanic salt rim.',
      price: '₹490',
      tag: 'Zesty & Fiery',
      image: '/images/kickbunk/magicpin_04_food_spread_dining.webp',
    },
    {
      id: 'b-5',
      category: 'MOCKTAILS',
      name: 'Garden Mint & Green Apple Sparkle',
      type: 'Zero-Proof Specialty',
      description:
        'Cold-pressed Granny Smith apple nectar, crushed garden spearmint, lime wheel, and artisanal sparkling soda.',
      price: '₹240',
      tag: 'Non-Alcoholic Refreshment',
      image: '/images/kickbunk/google_03_garden_courtyard.jpg',
    },
    {
      id: 'b-6',
      category: 'MOCKTAILS',
      name: 'Sunset Lychee Basil Cooler',
      type: 'Zero-Proof Botanical',
      description:
        'Fragrant lychee reduction, fresh sweet basil seeds, cranberry floater, and grated candied ginger.',
      price: '₹240',
      tag: 'Non-Alcoholic Classic',
      image: '/images/kickbunk/magicpin_07_outdoor_seating_daylight.webp',
    },
    {
      id: 'b-7',
      category: 'WHISKY',
      name: 'Single Malts & Blended Scotches',
      type: 'Curated Cellar Pours',
      description:
        'Glenfiddich, Glenlivet, Macallan, Talisker, Johnnie Walker Black & Gold Reserve poured neat or on artisanal carved ice spheres.',
      price: 'Priced per 30ml / 60ml',
      tag: 'Highland & Islay',
      image: '/images/kickbunk/magicpin_06_garden_building_night.webp',
    },
    {
      id: 'b-8',
      category: 'GIN_VODKA',
      name: 'Craft Gins & Ultra-Premium Vodkas',
      type: 'Spirits Showcase',
      description:
        'Jaisalmer, Stranger & Sons, Roku, Hendrick’s, Grey Goose, and Ketel One served with premium imported botanicals and craft tonics.',
      price: 'Priced per pour',
      tag: 'Top Shelf',
      image: '/images/kickbunk/magicpin_03_garden_courtyard_night.webp',
    },
    {
      id: 'b-9',
      category: 'BEER_WINE',
      name: 'Draught Pitchers & International Brews',
      type: 'On Tap & Bottles',
      description:
        'Freshly poured chilled Belgian wheat beers, crisp German lagers, stouts, and fine estate-bottled reds, whites, and sparkling bubblies.',
      price: 'From ₹250',
      tag: 'Chilled Pours',
      image: '/images/kickbunk/magicpin_06_garden_building_night.webp',
    },
  ];

  const filteredDrinks = drinks.filter((d) => {
    if (activeTab === 'ALL') return true;
    return d.category === activeTab;
  });

  return (
    <div className="min-h-screen bg-[#050505] text-[#F4EFE5] pt-24 pb-20">
      {/* 1. Bar Hero Section */}
      <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 rounded-3xl"
          style={{
            backgroundImage: `url('/images/kickbunk/magicpin_06_garden_building_night.webp')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent rounded-3xl" />

        <div className="relative z-10 max-w-3xl space-y-6 p-6 sm:p-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4A017]/15 border border-[#D4A017]/40 text-[#F5D77A] text-xs font-semibold tracking-wider uppercase">
            <Wine className="w-3.5 h-3.5 text-[#D4A017]" />
            <span>KICK BUNK RESTO-BAR & LOUNGE</span>
          </div>

          <h1 className="font-cormorant text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
            THE NIGHT HAS ITS OWN CHARACTER.
          </h1>

          <p className="font-manrope text-base sm:text-lg text-[#B8B1A5] font-light leading-relaxed">
            Welcome to the bar experience at Kick Bunk. Where masterfully shaken cocktails, chilled draughts, and top-shelf single malts pair with the lively buzz of sports screening and open-air garden breeze.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/booking"
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D4A017] via-[#F5D77A] to-[#D4A017] text-[#050505] text-xs font-bold tracking-[0.16em] uppercase shadow-gold-glow hover:shadow-gold-glow-lg transition-all"
            >
              RESERVE A BAR TABLE
            </Link>

            <a
              href="tel:+919980626699"
              className="px-6 py-3.5 rounded-full border border-[#D4A017]/40 text-white text-xs font-semibold tracking-wider hover:border-[#D4A017] flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#D4A017]" />
              <span>Table Concierge: +91 99806 26699</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. Bar Experience Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="luxury-glass rounded-2xl p-6 border border-[#D4A017]/20 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#D4A017]/15 border border-[#D4A017]/40 flex items-center justify-center text-[#F5D77A] shrink-0">
              <Tv className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-cormorant text-xl font-bold text-white">
                Live Sports Screenings
              </h3>
              <p className="text-xs text-[#B8B1A5] font-light leading-relaxed">
                Catch every cricket, football, and racing clash on massive HD screens across the resto-bar patio.
              </p>
            </div>
          </div>

          <div className="luxury-glass rounded-2xl p-6 border border-[#D4A017]/20 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#D4A017]/15 border border-[#D4A017]/40 flex items-center justify-center text-[#F5D77A] shrink-0">
              <Music className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-cormorant text-xl font-bold text-white">
                Curated Sound & Beats
              </h3>
              <p className="text-xs text-[#B8B1A5] font-light leading-relaxed">
                Eclectic weekend playlists and deep acoustic rhythms curated to elevate evening dining and conversations.
              </p>
            </div>
          </div>

          <div className="luxury-glass rounded-2xl p-6 border border-[#D4A017]/20 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#D4A017]/15 border border-[#D4A017]/40 flex items-center justify-center text-[#F5D77A] shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-cormorant text-xl font-bold text-white">
                Artisanal Bar Pairings
              </h3>
              <p className="text-xs text-[#B8B1A5] font-light leading-relaxed">
                Every libation is designed to pair seamlessly with our clay-oven Kalmi kebabs and spicy tandoor platters.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Bar Menu Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <span className="font-cinzel text-xs font-semibold tracking-[0.25em] text-[#D4A017] uppercase">
              DRINKS DIRECTORY
            </span>
            <h2 className="font-cormorant text-3xl sm:text-5xl font-bold text-white">
              The Libation Collection
            </h2>
          </div>

          {/* Responsible Drinking Disclaimer */}
          <div className="text-right text-xs text-[#B8B1A5] font-mono">
            <p>Licensed Resto-Bar • Age 21+ for Alcoholic Beverages</p>
            <p className="text-gray-500">Government taxes applicable as per regulations</p>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveTab(c.id)}
              className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all whitespace-nowrap ${
                activeTab === c.id
                  ? 'bg-gradient-to-r from-[#D4A017] via-[#F5D77A] to-[#D4A017] text-[#050505] font-bold shadow-gold-glow'
                  : 'bg-[#0F1115] text-[#B8B1A5] hover:text-white border border-[#1F242D]'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Drink Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDrinks.map((drink) => (
            <div
              key={drink.id}
              className="luxury-glass rounded-2xl overflow-hidden border border-[#D4A017]/20 hover:border-[#D4A017]/60 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={drink.image}
                  alt={drink.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1115] via-transparent to-transparent opacity-90" />
                <span className="absolute top-3 left-3 bg-[#050505]/90 border border-[#D4A017]/40 px-2.5 py-0.5 rounded-full text-[10px] font-mono text-[#F5D77A] tracking-wider uppercase">
                  {drink.tag}
                </span>
              </div>

              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-cormorant text-2xl font-bold text-white">
                      {drink.name}
                    </h3>
                    <span className="font-mono text-sm font-bold text-[#F5D77A] shrink-0">
                      {drink.price}
                    </span>
                  </div>
                  <p className="text-[11px] font-mono text-[#D4A017] uppercase tracking-wider">
                    {drink.type}
                  </p>
                  <p className="text-xs text-[#B8B1A5] font-light leading-relaxed">
                    {drink.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#1F242D] flex items-center justify-between text-xs">
                  <span className="text-gray-400">Available at Bengalur Flagship</span>
                  <Link
                    href="/booking"
                    className="font-bold text-[#D4A017] hover:text-[#F5D77A] flex items-center gap-1"
                  >
                    <span>Reserve Seat</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Bottom Booking Banner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="luxury-glass border border-[#D4A017]/40 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl">
          <Wine className="w-12 h-12 text-[#D4A017] mx-auto" />
          <h2 className="font-cormorant text-3xl sm:text-4xl font-bold text-white">
            Plan an Evening at the Bar Lounge
          </h2>
          <p className="text-sm text-[#B8B1A5] font-light max-w-lg mx-auto">
            Reserve a high-top table or outdoor patio lounge ahead of time for weekend matches and dinner get-togethers.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/booking"
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D4A017] via-[#F5D77A] to-[#D4A017] text-[#050505] text-xs font-bold tracking-[0.16em] uppercase shadow-gold-glow"
            >
              BOOK YOUR TABLE
            </Link>
            <Link
              href="/menu"
              className="px-8 py-3.5 rounded-full border border-[#D4A017]/40 text-white text-xs font-semibold tracking-wider hover:border-[#D4A017]"
            >
              PAIR WITH FOOD MENU
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
