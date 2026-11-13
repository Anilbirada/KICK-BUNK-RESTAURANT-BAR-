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
    { id: 'ALL', name: 'ALL SIPS' },
    { id: 'SIGNATURE', name: 'SIGNATURE MIXOLOGY' },
    { id: 'COCKTAILS', name: 'CLASSIC COCKTAILS' },
    { id: 'MOCKTAILS', name: 'ZERO-PROOF BOTANICALS' },
    { id: 'SPIRITS', name: 'PREMIUM SPIRITS' },
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
      name: 'Velvet Midnight Espresso Martini',
      type: 'Nightcap Cocktail',
      description:
        'Triple-distilled vodka, freshly pulled single-origin Arabica espresso, Kahlúa coffee liqueur, garnished with gold-dusted roasted coffee beans.',
      price: '₹490',
      tag: 'Rich & Silky',
      image: '/images/kickbunk/restaurant_guru_interior.jpg',
    },
    {
      id: 'b-5',
      category: 'MOCKTAILS',
      name: 'Hulimangala Passion Twilight',
      type: 'Zero-Proof Botanical',
      description:
        'Crushed purple passionfruit, fresh Thai basil leaves, ginger honey shrub, sparkling Perrier water, and dehydrated dragonfruit slice.',
      price: '₹280',
      tag: 'Refreshing & Non-Alcoholic',
      image: '/images/kickbunk/magicpin_03_garden_courtyard_night.webp',
    },
    {
      id: 'b-6',
      category: 'SPIRITS',
      name: 'Single Malt & Premium Scotch',
      type: 'Fine Pours (30ml / 60ml)',
      description:
        'Curated selection of Glenfiddich 12, Talisker 10, Glenlivet, Black Dog Reserve, and Chivas Regal served with artisanal clear ice spheres.',
      price: 'From ₹350',
      tag: 'Connoisseur Reserve',
      image: '/images/kickbunk/magicpin_09_garden_pathway_night.webp',
    },
  ];

  const filteredDrinks =
    activeTab === 'ALL'
      ? drinks
      : drinks.filter((d) => d.category === activeTab);

  return (
    <div className="bg-[#482A32] text-[#F7F3EB] min-h-screen pt-28 pb-24">
      
      {/* Hero Header in Deep Burgundy */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#361E25] border border-[#DCC18B]/30 text-[#DCC18B] text-xs font-semibold tracking-[0.2em] uppercase">
          <Wine className="w-3.5 h-3.5" />
          <span>The Resto-Bar Experience</span>
        </div>

        <h1 className="font-cormorant text-5xl sm:text-6xl md:text-7xl font-normal text-white tracking-tight">
          RAISE YOUR EVENINGS.
        </h1>

        <p className="max-w-2xl mx-auto font-manrope text-base sm:text-lg text-[#F7F3EB]/85 font-light leading-relaxed">
          Crafted mixology, starlit garden seating, chilled glassware, and international hospitality. Welcome to Bangalore&apos;s premier nightfall destination.
        </p>

        {/* Category Filters */}
        <div className="pt-8 flex flex-wrap items-center justify-center gap-2.5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-5 py-2.5 rounded-full font-manrope text-xs font-bold tracking-[0.14em] uppercase transition-all duration-300 ${
                activeTab === cat.id
                  ? 'bg-[#B58A45] text-[#25231F] shadow-[0_4px_16px_rgba(181,138,69,0.4)]'
                  : 'bg-[#361E25] text-[#DCC18B]/80 hover:bg-[#5A353F] hover:text-white border border-[#DCC18B]/20'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Drink Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDrinks.map((drink) => (
            <div
              key={drink.id}
              className="group bg-[#361E25] rounded-2xl overflow-hidden border border-[#DCC18B]/25 hover:border-[#DCC18B] transition-all duration-300 hover:shadow-burgundy-glow flex flex-col justify-between"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={drink.image}
                  alt={drink.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <span className="absolute top-4 left-4 bg-[#B58A45] text-[#25231F] text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full shadow-sm">
                  {drink.tag}
                </span>
                <span className="absolute top-4 right-4 bg-[#25231F]/80 backdrop-blur-md text-[#DCC18B] font-cormorant text-lg font-bold px-3 py-0.5 rounded-lg border border-[#DCC18B]/30">
                  {drink.price}
                </span>
              </div>

              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-[#DCC18B] block mb-1">
                    {drink.type}
                  </span>
                  <h3 className="font-cormorant text-2xl font-normal text-white">
                    {drink.name}
                  </h3>
                  <p className="font-manrope text-xs text-[#F7F3EB]/75 font-light leading-relaxed mt-2">
                    {drink.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#DCC18B]/20 flex items-center justify-between">
                  <span className="text-[11px] text-[#DCC18B]/60">Served Chilled & Garnished</span>
                  <Link
                    href="/booking"
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#DCC18B] hover:text-white transition-colors"
                  >
                    <span>Reserve Seat</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Highlights Banner */}
        <div className="mt-16 bg-[#361E25] rounded-3xl p-8 sm:p-12 border border-[#DCC18B]/30 grid grid-cols-1 md:grid-cols-3 gap-8 text-center sm:text-left">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#482A32] border border-[#DCC18B]/40 flex items-center justify-center shrink-0 text-[#DCC18B]">
              <Music className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-cormorant text-xl font-bold text-white mb-1">Live DJ & Acoustic Sets</h4>
              <p className="font-manrope text-xs text-[#F7F3EB]/70 font-light">
                Weekend curated soundscapes and starlit acoustic sessions in the courtyard.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#482A32] border border-[#DCC18B]/40 flex items-center justify-center shrink-0 text-[#DCC18B]">
              <Tv className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-cormorant text-xl font-bold text-white mb-1">Live Sports Screenings</h4>
              <p className="font-manrope text-xs text-[#F7F3EB]/70 font-light">
                Catch high-voltage cricket, football and F1 races on large HD outdoor screens.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#482A32] border border-[#DCC18B]/40 flex items-center justify-center shrink-0 text-[#DCC18B]">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-cormorant text-xl font-bold text-white mb-1">Master Mixologists</h4>
              <p className="font-manrope text-xs text-[#F7F3EB]/70 font-light">
                Handcrafted syrups, fresh botanical garnishes, and international cocktail precision.
              </p>
            </div>
          </div>
        </div>

        {/* Reserve Bar Table CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/booking"
            className="inline-flex items-center gap-2 bg-[#B58A45] hover:bg-[#DCC18B] text-[#25231F] px-8 py-3.5 rounded-full font-manrope text-xs font-bold tracking-[0.14em] uppercase transition-all shadow-lg"
          >
            <Calendar className="w-4 h-4" />
            <span>Book a High Counter / Resto-Bar Table</span>
          </Link>
        </div>

      </div>

    </div>
  );
}
