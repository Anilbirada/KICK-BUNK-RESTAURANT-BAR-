'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchApi } from '../lib/api';
import {
  Utensils,
  Calendar,
  MapPin,
  Star,
  Sparkles,
  ChevronRight,
  Award,
  ShieldCheck,
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
  MessageCircle,
  Wine,
  Users,
  Tv,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export default function HomePage() {
  const [branches, setBranches] = useState<any[]>([]);
  const [featuredDishes, setFeaturedDishes] = useState<any[]>([]);
  const [mediaAssets, setMediaAssets] = useState<any[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<any | null>(null);

  useEffect(() => {
    // Load branches
    fetchApi('/branches').then((res) => {
      if (res.success && res.data) setBranches(res.data);
    });

    // Load bestsellers
    fetchApi('/menu/items?isBestSeller=true').then((res) => {
      if (res.success && res.data) setFeaturedDishes(res.data.slice(0, 4));
    });

    // Load authentic media assets
    fetchApi('/media').then((res) => {
      if (res.success && res.data) {
        setMediaAssets(res.data);
      }
    });
  }, []);

  // Curated showcase of verified Kick Bunk restaurant photography
  const verifiedShowcasePhotos = [
    {
      id: 'hp-1',
      title: 'Fairy-Lit Garden Cabanas at Night',
      category: 'Garden Ambience',
      url: '/images/kickbunk/google_01_garden_lights_night.jpg',
      source: 'Google Business Profile Gallery',
    },
    {
      id: 'hp-2',
      title: 'Illuminated Entrance & Signboard',
      category: 'Exterior',
      url: '/images/kickbunk/magicpin_02_entrance_night.webp',
      source: 'Magicpin Verified Store Photo',
    },
    {
      id: 'hp-3',
      title: 'Signature Charcoal Kalmi Kebab',
      category: 'Food Delicacies',
      url: '/images/kickbunk/magicpin_01_kalmi_kebab.webp',
      source: 'Magicpin Food Special Feature',
    },
    {
      id: 'hp-4',
      title: 'Lush Daytime Garden Seating Deck',
      category: 'Outdoor Seating',
      url: '/images/kickbunk/magicpin_07_outdoor_seating_daylight.webp',
      source: 'Magicpin Verified Store Photo',
    },
    {
      id: 'hp-5',
      title: 'Cozy Air-Conditioned Indoor Booths',
      category: 'Restaurant Interior',
      url: '/images/kickbunk/restaurant_guru_interior.jpg',
      source: 'Restaurant Guru Interior Photo',
    },
    {
      id: 'hp-6',
      title: 'Grand Family Dining Food Spread',
      category: 'Dining Feast',
      url: '/images/kickbunk/magicpin_04_food_spread_dining.webp',
      source: 'Magicpin Store Dining Photo',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#08090C] text-[#FAF8F5]">
      {/* 1. CINEMATIC ULTRA-LUXURY HERO SECTION */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        {/* Background Verified Photograph with Depth Gradients */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-35 scale-105 transition-transform duration-1000 ease-out"
          style={{
            backgroundImage: `url('/images/kickbunk/google_01_garden_lights_night.jpg')`,
          }}
        />
        {/* Cinematic Vignette Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090C] via-[#08090C]/70 to-[#08090C]/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-950/20 via-[#08090C]/60 to-[#08090C]" />

        <div className="relative max-w-5xl mx-auto text-center space-y-8 z-10">
          {/* Luxury Micro-Badge */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full luxury-glass border border-brand-gold/40 shadow-gold-glow">
            <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
            <span className="font-cinzel text-brand-gold text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase">
              Bengaluru Flagship • Garden Resto-Bar Sanctuary
            </span>
          </div>

          {/* Master Headline */}
          <div className="space-y-4">
            <div className="font-cinzel text-brand-gold tracking-[0.3em] uppercase text-xs sm:text-sm font-semibold">
              KICK BUNK GROUP PRESENTS
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-brand-ivory leading-[1.08] tracking-tight">
              Where Charcoal Fire <br />
              <span className="text-gold-gradient italic font-serif">
                Meets Starlit Elegance
              </span>
            </h1>
            <p className="font-cinzel text-xs sm:text-sm tracking-[0.2em] text-gray-400 uppercase">
              Electronic City Phase 1 • Hulimangala Main Road • Bengaluru
            </p>
          </div>

          {/* Editorial Hook */}
          <p className="max-w-3xl mx-auto text-base sm:text-lg text-gray-300 font-light leading-relaxed">
            Step into Bengaluru’s premier open-air culinary sanctuary. Savor slow-fired clay tandoori grills, fragrant handi dum biryanis, and crafted resto-bar spirits amidst secluded bamboo cabanas, illuminated canopies, and weekend sports screenings.
          </p>

          {/* Luxury Action Triggers */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 pt-3">
            <Link
              href="/booking"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#DFBE50] via-[#D4AF37] to-[#B08D26] hover:from-[#F3E5AB] hover:to-[#DFBE50] text-[#08090C] font-bold text-xs uppercase tracking-[0.2em] transition-all shadow-xl shadow-brand-gold/25 hover:shadow-gold-glow-lg flex items-center gap-2.5 group"
            >
              <Calendar className="w-4 h-4 text-brand-dark" />
              <span>Reserve Cabana</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/menu"
              className="px-8 py-4 rounded-xl luxury-glass hover:border-brand-gold text-brand-ivory hover:text-brand-gold font-semibold text-xs uppercase tracking-[0.18em] transition-all flex items-center gap-2.5 shadow-luxury-card hover:shadow-gold-glow"
            >
              <Utensils className="w-4 h-4 text-brand-gold" />
              <span>Explore Menu</span>
            </Link>

            <Link
              href="/gallery"
              className="px-7 py-4 rounded-xl luxury-glass hover:border-brand-gold/70 text-gray-300 hover:text-white font-medium text-xs uppercase tracking-[0.16em] transition-all flex items-center gap-2"
            >
              <Camera className="w-4 h-4 text-brand-gold" />
              <span>Visual Gallery</span>
            </Link>

            <a
              href="https://www.google.com/maps/search/?api=1&query=Kick+Bunk+Restaurant+and+Bar+Hulimangala+Bengaluru"
              target="_blank"
              rel="noreferrer"
              className="px-7 py-4 rounded-xl bg-[#12151B] hover:bg-[#1A1E26] border border-brand-cardBorder hover:border-brand-gold/40 text-gray-300 hover:text-white font-medium text-xs uppercase tracking-[0.16em] transition-all flex items-center gap-2"
            >
              <Navigation className="w-4 h-4 text-brand-gold" />
              <span>Directions</span>
            </a>
          </div>

          {/* Accolades Strip */}
          <div className="pt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto border-t border-brand-gold/15">
            <div className="p-4 rounded-2xl luxury-glass text-center space-y-1">
              <div className="font-serif text-2xl sm:text-3xl font-bold text-brand-gold">100%</div>
              <div className="text-[11px] uppercase tracking-wider text-gray-300 font-medium">Clay Charcoal Tandoor</div>
            </div>
            <div className="p-4 rounded-2xl luxury-glass text-center space-y-1">
              <div className="font-serif text-2xl sm:text-3xl font-bold text-brand-gold flex items-center justify-center gap-1">
                <span>4.8</span>
                <Star className="w-4 h-4 fill-brand-gold text-brand-gold" />
              </div>
              <div className="text-[11px] uppercase tracking-wider text-gray-300 font-medium">1,800+ Verified Reviews</div>
            </div>
            <div className="p-4 rounded-2xl luxury-glass text-center space-y-1">
              <div className="font-serif text-2xl sm:text-3xl font-bold text-brand-gold">Cabanas</div>
              <div className="text-[11px] uppercase tracking-wider text-gray-300 font-medium">Private Garden Gazebos</div>
            </div>
            <div className="p-4 rounded-2xl luxury-glass text-center space-y-1">
              <div className="font-serif text-2xl sm:text-3xl font-bold text-brand-gold">Bengaluru</div>
              <div className="text-[11px] uppercase tracking-wider text-gray-300 font-medium">Electronic City Flagship</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. EDITORIAL BRAND PHILOSOPHY SECTION */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-7">
            <div className="inline-flex items-center gap-2 text-brand-gold text-xs font-cinzel tracking-[0.25em] uppercase font-semibold">
              <Flame className="w-4 h-4 text-brand-amber" />
              <span>The Art of Authentic Hospitality</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-brand-ivory leading-[1.15]">
              A Dining Sanctuary <br />
              <span className="text-gold-gradient italic">Crafted for Celebrations</span>
            </h2>

            <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-light">
              Tucked away from the bustling thoroughfares of Electronic City, <strong>Kick Bunk Restaurant & Bar</strong> was envisioned as an unhurried culinary retreat. Spanning expansive landscaped garden courtyards, natural bamboo pergolas, and glowing fairy-lit canopies, Kick Bunk brings friends, families, and colleagues together over authentic gastronomy and celebratory spirits.
            </p>

            <blockquote className="p-5 rounded-2xl border-l-2 border-brand-gold bg-[#10131A] text-xs sm:text-sm text-gray-300 italic font-serif leading-relaxed">
              &ldquo;From live charcoal embers to handcrafted cocktail infusions, every moment at Kick Bunk is designed to feel celebratory, unhurried, and distinctly memorable.&rdquo;
            </blockquote>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl luxury-glass space-y-1.5 border border-brand-gold/15">
                <div className="flex items-center gap-2 text-brand-gold font-semibold text-xs tracking-wider uppercase font-cinzel">
                  <Flame className="w-4 h-4 text-brand-amber" />
                  <span>Clay-Oven Grills</span>
                </div>
                <p className="text-xs text-gray-400 font-light leading-relaxed">
                  Cashew-crusted Kalmi Kebabs and tender Tikkas smoked over natural coal.
                </p>
              </div>

              <div className="p-4 rounded-xl luxury-glass space-y-1.5 border border-brand-gold/15">
                <div className="flex items-center gap-2 text-brand-gold font-semibold text-xs tracking-wider uppercase font-cinzel">
                  <Wine className="w-4 h-4 text-brand-gold" />
                  <span>Curated Resto-Bar</span>
                </div>
                <p className="text-xs text-gray-400 font-light leading-relaxed">
                  Chilled draught beers, single malts, and hand-shaken artisanal cocktails.
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <Link
                href="/about"
                className="text-xs font-bold uppercase tracking-[0.2em] text-brand-gold hover:text-brand-goldLight flex items-center gap-2 group"
              >
                <span>Discover Heritage & Architecture</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <span className="text-gray-600">•</span>
              <a
                href="tel:+919980626699"
                className="text-xs uppercase tracking-wider text-gray-400 hover:text-brand-gold flex items-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-brand-gold" />
                <span>Concierge Desk: +91 99806 26699</span>
              </a>
            </div>
          </div>

          {/* Right Editorial Photographic Collage */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="rounded-3xl overflow-hidden border border-brand-gold/25 relative group shadow-2xl">
                <img
                  src="/images/kickbunk/magicpin_02_entrance_night.webp"
                  alt="Kick Bunk Illuminated Entrance at Night"
                  className="w-full h-56 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex items-end p-4">
                  <span className="text-[11px] font-cinzel tracking-wider text-brand-gold uppercase font-bold">
                    Illuminated Entrance
                  </span>
                </div>
              </div>

              <div className="rounded-3xl overflow-hidden border border-brand-gold/25 relative group shadow-2xl">
                <img
                  src="/images/kickbunk/magicpin_01_kalmi_kebab.webp"
                  alt="Signature Kalmi Kebab"
                  className="w-full h-44 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex items-end p-4">
                  <span className="text-[11px] font-cinzel tracking-wider text-brand-gold uppercase font-bold">
                    Signature Kalmi Kebab
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-6">
              <div className="rounded-3xl overflow-hidden border border-brand-gold/25 relative group shadow-2xl">
                <img
                  src="/images/kickbunk/google_01_garden_lights_night.jpg"
                  alt="Fairy-Lit Cabanas"
                  className="w-full h-44 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex items-end p-4">
                  <span className="text-[11px] font-cinzel tracking-wider text-brand-gold uppercase font-bold">
                    Fairy-Lit Cabanas
                  </span>
                </div>
              </div>

              <div className="rounded-3xl overflow-hidden border border-brand-gold/25 relative group shadow-2xl">
                <img
                  src="/images/kickbunk/magicpin_07_outdoor_seating_daylight.webp"
                  alt="Garden Seating Deck"
                  className="w-full h-56 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex items-end p-4">
                  <span className="text-[11px] font-cinzel tracking-wider text-brand-gold uppercase font-bold">
                    Palm-Lined Deck
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE FIVE EXCLUSIVE HALLMARKS */}
      <section className="py-24 bg-[#050608] border-y border-brand-gold/15 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="text-brand-gold text-xs font-cinzel tracking-[0.25em] uppercase font-semibold flex items-center justify-center gap-2">
              <Award className="w-4 h-4 text-brand-gold" />
              <span>Curated Dining Pillars</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-brand-ivory">
              The Five Hallmarks of Kick Bunk
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 font-light">
              Each experience is designed to immerse your senses in luxury, comfort, and culinary excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* Hallmark 1: Charcoal Mastery */}
            <div className="luxury-glass rounded-3xl overflow-hidden border border-brand-gold/20 hover:border-brand-gold/60 transition-all duration-500 group shadow-luxury-card flex flex-col">
              <div className="relative h-48 overflow-hidden bg-black">
                <img
                  src="/images/kickbunk/magicpin_01_kalmi_kebab.webp"
                  alt="Clay Tandoor Charcoal Grills"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C0E] to-transparent" />
                <span className="absolute bottom-3 left-4 text-xs font-cinzel font-bold text-brand-gold uppercase tracking-[0.15em]">
                  Charcoal Grills
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <p className="text-xs text-gray-300 font-light leading-relaxed">
                  Continuous clay-oven coals yielding charred rotis, juicy Kalmi Kebabs, and tandoori platters.
                </p>
                <div className="pt-2 border-t border-brand-gold/10 text-[10px] text-brand-gold uppercase tracking-wider font-semibold">
                  Tandoori Craftsmanship
                </div>
              </div>
            </div>

            {/* Hallmark 2: Garden Ambience */}
            <div className="luxury-glass rounded-3xl overflow-hidden border border-brand-gold/20 hover:border-brand-gold/60 transition-all duration-500 group shadow-luxury-card flex flex-col">
              <div className="relative h-48 overflow-hidden bg-black">
                <img
                  src="/images/kickbunk/google_01_garden_lights_night.jpg"
                  alt="Starlit Garden Cabanas"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C0E] to-transparent" />
                <span className="absolute bottom-3 left-4 text-xs font-cinzel font-bold text-brand-gold uppercase tracking-[0.15em]">
                  Garden Ambience
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <p className="text-xs text-gray-300 font-light leading-relaxed">
                  Lush lawns, fairy-lit tree canopies, and private cabanas for starlit evening dinners.
                </p>
                <div className="pt-2 border-t border-brand-gold/10 text-[10px] text-brand-gold uppercase tracking-wider font-semibold">
                  Open-Air Sanctuary
                </div>
              </div>
            </div>

            {/* Hallmark 3: Indoor AC Salon */}
            <div className="luxury-glass rounded-3xl overflow-hidden border border-brand-gold/20 hover:border-brand-gold/60 transition-all duration-500 group shadow-luxury-card flex flex-col">
              <div className="relative h-48 overflow-hidden bg-black">
                <img
                  src="/images/kickbunk/restaurant_guru_interior.jpg"
                  alt="Air-Conditioned Indoor Dining"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C0E] to-transparent" />
                <span className="absolute bottom-3 left-4 text-xs font-cinzel font-bold text-brand-gold uppercase tracking-[0.15em]">
                  Family AC Salon
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <p className="text-xs text-gray-300 font-light leading-relaxed">
                  Plush booths and climate-controlled elegance for formal corporate dinners and family reunions.
                </p>
                <div className="pt-2 border-t border-brand-gold/10 text-[10px] text-brand-gold uppercase tracking-wider font-semibold">
                  Climate Comfort
                </div>
              </div>
            </div>

            {/* Hallmark 4: Resto-Bar Lounge */}
            <div className="luxury-glass rounded-3xl overflow-hidden border border-brand-gold/20 hover:border-brand-gold/60 transition-all duration-500 group shadow-luxury-card flex flex-col">
              <div className="relative h-48 overflow-hidden bg-black">
                <img
                  src="/images/kickbunk/magicpin_06_garden_building_night.webp"
                  alt="Resto-Bar & Mixology"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C0E] to-transparent" />
                <span className="absolute bottom-3 left-4 text-xs font-cinzel font-bold text-brand-gold uppercase tracking-[0.15em]">
                  Resto-Bar Lounge
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <p className="text-xs text-gray-300 font-light leading-relaxed">
                  Craft draught beers, single malts, and hand-shaken cocktails with live match outdoor screenings.
                </p>
                <div className="pt-2 border-t border-brand-gold/10 text-[10px] text-brand-gold uppercase tracking-wider font-semibold">
                  Mixology & Draught
                </div>
              </div>
            </div>

            {/* Hallmark 5: Banquets & Events */}
            <div className="luxury-glass rounded-3xl overflow-hidden border border-brand-gold/20 hover:border-brand-gold/60 transition-all duration-500 group shadow-luxury-card flex flex-col">
              <div className="relative h-48 overflow-hidden bg-black">
                <img
                  src="/images/kickbunk/magicpin_04_food_spread_dining.webp"
                  alt="Banquets & Celebrations"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C0E] to-transparent" />
                <span className="absolute bottom-3 left-4 text-xs font-cinzel font-bold text-brand-gold uppercase tracking-[0.15em]">
                  Celebrations
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <p className="text-xs text-gray-300 font-light leading-relaxed">
                  Dedicated lawns and cabanas for birthdays, anniversaries, corporate parties, and private feasts.
                </p>
                <div className="pt-2 border-t border-brand-gold/10 text-[10px] text-brand-gold uppercase tracking-wider font-semibold">
                  Private Gatherings
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SIGNATURE GASTRONOMY & MASTERPIECES */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="text-brand-gold text-xs font-cinzel tracking-[0.25em] uppercase font-semibold flex items-center gap-2">
              <Flame className="w-4 h-4 text-brand-amber" />
              <span>Chef's Masterpieces</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-brand-ivory">
              Signature Culinary Creations
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 font-light max-w-xl">
              Prepared to perfection using ancient clay tandoor techniques, royal dum cooking, and farm-fresh ingredients.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/menu"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-gold to-amber-600 hover:from-brand-goldLight hover:to-brand-gold text-brand-dark font-bold text-xs uppercase tracking-[0.18em] transition-all shadow-md shadow-brand-gold/20 flex items-center gap-2 group"
            >
              <span>Explore Complete Menu</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredDishes.map((item) => (
            <div
              key={item.id}
              className="luxury-glass rounded-3xl overflow-hidden border border-brand-gold/20 hover:border-brand-gold/60 transition-all duration-500 group flex flex-col shadow-luxury-card hover:shadow-gold-glow"
            >
              <div className="relative h-52 overflow-hidden bg-black">
                <img
                  src={item.images?.[0]?.imageUrl || '/images/kickbunk/magicpin_01_kalmi_kebab.webp'}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C0E] via-transparent to-transparent" />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span
                    className={`w-5 h-5 rounded-md border flex items-center justify-center text-[10px] bg-black/80 backdrop-blur-md ${
                      item.isVeg ? 'border-brand-green text-brand-green' : 'border-red-500 text-red-500'
                    }`}
                  >
                    ●
                  </span>
                  {item.isBestSeller && (
                    <span className="px-2.5 py-0.5 rounded-full bg-brand-gold text-brand-dark text-[9px] font-extrabold uppercase tracking-widest font-cinzel shadow">
                      Signature
                    </span>
                  )}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1">
                  <h3 className="font-serif font-bold text-lg text-brand-ivory group-hover:text-brand-gold transition-colors line-clamp-1">
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-400 font-light line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-brand-gold/15">
                  <div className="text-brand-gold font-serif font-bold text-xl">
                    ₹{item.basePrice}
                  </div>
                  <Link
                    href="/menu"
                    className="px-4 py-2 rounded-xl bg-brand-gold/15 hover:bg-brand-gold text-brand-gold hover:text-brand-dark border border-brand-gold/40 text-xs font-bold uppercase tracking-wider transition-all"
                  >
                    Order Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. VISUAL PHOTOGRAPHIC GALLERY */}
      <section className="py-24 bg-[#050608] border-y border-brand-gold/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="text-brand-gold text-xs font-cinzel tracking-[0.25em] uppercase font-semibold flex items-center gap-2">
                <Camera className="w-4 h-4 text-brand-gold" />
                <span>Visual Retrospective</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-brand-ivory">
                Authentic Restaurant Gallery
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 font-light max-w-xl">
                Real photographs of our fairy-lit garden cabanas, live tandoor kitchen, and banquet spreads.
              </p>
            </div>

            <Link
              href="/gallery"
              className="px-6 py-3 rounded-xl luxury-glass hover:border-brand-gold text-brand-gold text-xs font-bold uppercase tracking-[0.18em] transition-all flex items-center gap-2 group self-start md:self-auto"
            >
              <span>Explore All 24+ Media Assets</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {verifiedShowcasePhotos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => setSelectedPhoto(photo)}
                className="luxury-glass rounded-3xl overflow-hidden border border-brand-gold/20 hover:border-brand-gold/60 transition-all duration-500 cursor-pointer group shadow-luxury-card flex flex-col"
              >
                <div className="relative h-64 overflow-hidden bg-black">
                  <img
                    src={photo.url}
                    alt={photo.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                  <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity border border-brand-gold/40">
                    <ZoomIn className="w-4 h-4 text-brand-gold" />
                  </div>

                  <div className="absolute bottom-4 left-5 right-5 space-y-1">
                    <span className="text-[9px] uppercase font-cinzel font-bold tracking-[0.2em] px-2.5 py-0.5 rounded-full bg-brand-gold text-brand-dark inline-block">
                      {photo.category}
                    </span>
                    <h3 className="font-serif font-bold text-base text-brand-ivory group-hover:text-brand-gold transition-colors">
                      {photo.title}
                    </h3>
                    <p className="text-[10px] text-gray-400 font-light">
                      {photo.source}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. VERIFIED GUEST REVIEWS & REPUTATION */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="text-brand-gold text-xs font-cinzel tracking-[0.25em] uppercase font-semibold flex items-center justify-center gap-2">
            <Star className="w-4 h-4 fill-brand-gold text-brand-gold" />
            <span>Guest Voices & Testimonials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-brand-ivory">
            Loved by Over 1,800+ Verified Diners
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 font-light">
            Genuine experiences from Google Maps, Magicpin, and Zomato diners.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="luxury-glass p-8 rounded-3xl border border-brand-gold/20 space-y-5 shadow-luxury-card">
            <div className="flex items-center justify-between">
              <div className="flex text-brand-gold text-sm tracking-widest">★★★★★</div>
              <span className="text-[9px] font-cinzel bg-brand-gold/20 text-brand-gold px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                Google Verified
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed italic font-serif">
              &ldquo;Kick Bunk on Hulimangala Main Road has the most serene garden atmosphere in Electronic City. The Kalmi Kebabs were smoked to perfection, and our private cabana made the anniversary dinner unforgettable.&rdquo;
            </p>
            <div className="pt-3 border-t border-brand-gold/15 flex items-center justify-between text-xs">
              <span className="font-serif font-bold text-brand-ivory">Ananya Deshmukh</span>
              <span className="text-gray-400 font-light">Bengaluru</span>
            </div>
          </div>

          <div className="luxury-glass p-8 rounded-3xl border border-brand-gold/20 space-y-5 shadow-luxury-card">
            <div className="flex items-center justify-between">
              <div className="flex text-brand-gold text-sm tracking-widest">★★★★★</div>
              <span className="text-[9px] font-cinzel bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                Magicpin Top Review
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed italic font-serif">
              &ldquo;The fairy lights at night give this place a resort-like feel. Fragrant dum handi biryani, fast service, and courteous staff. One of the best resto-bars in South Bengaluru.&rdquo;
            </p>
            <div className="pt-3 border-t border-brand-gold/15 flex items-center justify-between text-xs">
              <span className="font-serif font-bold text-brand-ivory">Rohit Nair</span>
              <span className="text-gray-400 font-light">Electronic City</span>
            </div>
          </div>

          <div className="luxury-glass p-8 rounded-3xl border border-brand-gold/20 space-y-5 shadow-luxury-card">
            <div className="flex items-center justify-between">
              <div className="flex text-brand-gold text-sm tracking-widest">★★★★★</div>
              <span className="text-[9px] font-cinzel bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                Zomato Review
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed italic font-serif">
              &ldquo;Spacious garden layout with ample parking. Crispy Hong Kong chicken paired with cold draught beer while watching the cricket match on the big screen was pure joy.&rdquo;
            </p>
            <div className="pt-3 border-t border-brand-gold/15 flex items-center justify-between text-xs">
              <span className="font-serif font-bold text-brand-ivory">Varun Kulkarni</span>
              <span className="text-gray-400 font-light">Regular Guest</span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. TWO LUXURY DESTINATIONS (BENGALURU & TIRUPATI) */}
      <section className="py-24 bg-[#050608] border-t border-brand-gold/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="text-brand-gold text-xs font-cinzel tracking-[0.25em] uppercase font-semibold flex items-center justify-center gap-2">
              <MapPin className="w-4 h-4 text-brand-gold" />
              <span>Multi-Outlet Presence</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-brand-ivory">
              Two Premier Destinations
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 font-light">
              Experience Kick Bunk hospitality across Karnataka and Andhra Pradesh.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Bengaluru Flagship */}
            <div className="luxury-glass rounded-3xl p-8 sm:p-10 border border-brand-gold/25 space-y-6 shadow-luxury-card flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-cinzel text-xs font-bold uppercase tracking-[0.2em] text-brand-gold">
                    Flagship Venue
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-brand-green/20 text-brand-green font-bold text-[10px] uppercase tracking-wider">
                    Bengaluru
                  </span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-ivory">
                  Kick Bunk Family Garden Restaurant & Bar
                </h3>
                <p className="text-xs text-gray-300 font-light leading-relaxed">
                  Hulimangala Main Road, Vinayaka Layout, Electronic City Phase 1, Bengaluru 560105
                </p>
                <div className="space-y-2 text-xs text-gray-300 pt-2 border-t border-brand-gold/15">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-brand-gold" />
                    <span>+91 99806 26699 / +91 82962 19302</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-brand-gold" />
                    <span>11:30 AM – 11:30 PM (All 7 Days)</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-3">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Kick+Bunk+Restaurant+and+Bar+Hulimangala+Bengaluru"
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-gold to-amber-600 text-brand-dark font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Google Maps</span>
                </a>
                <Link
                  href="/booking"
                  className="px-5 py-2.5 rounded-xl luxury-glass hover:border-brand-gold text-brand-ivory hover:text-brand-gold font-semibold text-xs uppercase tracking-wider flex items-center gap-2"
                >
                  <Calendar className="w-3.5 h-3.5 text-brand-gold" />
                  <span>Reserve Cabana</span>
                </Link>
              </div>
            </div>

            {/* Tirupati Outlet */}
            <div className="luxury-glass rounded-3xl p-8 sm:p-10 border border-brand-gold/25 space-y-6 shadow-luxury-card flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-cinzel text-xs font-bold uppercase tracking-[0.2em] text-brand-gold">
                    Branch Destination
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-brand-gold/20 text-brand-gold font-bold text-[10px] uppercase tracking-wider">
                    Tirupati
                  </span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-ivory">
                  Kick Bunk Garden Bar & Restaurant
                </h3>
                <p className="text-xs text-gray-300 font-light leading-relaxed">
                  Door No. 19-1-G/25, Kothapalli, Samavayi Margam, Chinthalachenu, Korlagunta, Tirupati 517501
                </p>
                <div className="space-y-2 text-xs text-gray-300 pt-2 border-t border-brand-gold/15">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-brand-gold" />
                    <span>+91 98855 20220 / +91 77605 94868</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-brand-gold" />
                    <span>11:30 AM – 11:00 PM (All 7 Days)</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-3">
                <a
                  href="tel:+917760594868"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-gold to-amber-600 text-brand-dark font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Tirupati Desk</span>
                </a>
                <Link
                  href="/outlets"
                  className="px-5 py-2.5 rounded-xl luxury-glass hover:border-brand-gold text-brand-ivory hover:text-brand-gold font-semibold text-xs uppercase tracking-wider flex items-center gap-2"
                >
                  <MapPin className="w-3.5 h-3.5 text-brand-gold" />
                  <span>Outlet Details</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LIGHTBOX PREVIEW MODAL */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full luxury-glass rounded-3xl overflow-hidden border border-brand-gold/40 space-y-4 p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-brand-gold/20">
              <div>
                <span className="text-[10px] font-cinzel uppercase font-bold tracking-[0.2em] text-brand-gold">
                  {selectedPhoto.category}
                </span>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-brand-ivory">
                  {selectedPhoto.title}
                </h3>
              </div>

              <button
                onClick={() => setSelectedPhoto(null)}
                className="p-2 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-brand-gold hover:text-white hover:bg-brand-gold/30 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative max-h-[68vh] flex items-center justify-center overflow-hidden rounded-2xl bg-black">
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.title}
                className="max-h-[66vh] w-auto object-contain rounded-xl"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-3 pt-2">
              <div>
                <strong className="text-brand-gold">Verified Source:</strong> {selectedPhoto.source}
              </div>
              <Link
                href="/gallery"
                onClick={() => setSelectedPhoto(null)}
                className="text-brand-gold hover:text-brand-goldLight font-semibold flex items-center gap-1.5"
              >
                <span>View Complete Media Archive</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
