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
  Tv
} from 'lucide-react';

export default function HomePage() {
  const [branches, setBranches] = useState<any[]>([]);
  const [featuredDishes, setFeaturedDishes] = useState<any[]>([]);
  const [mediaAssets, setMediaAssets] = useState<any[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<any | null>(null);
  const [videoModalOpen, setVideoModalOpen] = useState<boolean>(false);

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
    <div className="flex flex-col min-h-screen bg-[#0A0C0E]">
      {/* 1. CINEMATIC LUXURY HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#060709] via-[#0A0C0E] to-[#0A0C0E] px-4 py-24">
        {/* Background Verified Photograph with Gradient Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 scale-105 transition-transform duration-1000"
          style={{
            backgroundImage: `url('/images/kickbunk/google_01_garden_lights_night.jpg')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C0E] via-[#0A0C0E]/75 to-transparent" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#0A0C0E]/40 to-[#0A0C0E]" />

        <div className="relative max-w-5xl mx-auto text-center space-y-8 z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-gold/15 border border-brand-gold/40 text-brand-gold text-xs font-semibold tracking-wider uppercase shadow-lg shadow-brand-gold/10">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Bengaluru's Premier Garden Resto-Bar • Hulimangala Cross</span>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-serif text-brand-gold tracking-widest uppercase font-semibold">
              KICK BUNK
            </h2>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold text-brand-ivory leading-tight tracking-tight">
              Good Food. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-brand-amber to-yellow-200">
                Great Moments.
              </span>
            </h1>
            <p className="text-sm sm:text-base font-serif italic text-gray-400">
              Restaurant & Bar • Electronic City Phase 1, Bengaluru
            </p>
          </div>

          <p className="max-w-3xl mx-auto text-base sm:text-lg text-gray-300 font-light leading-relaxed">
            Immerse yourself in Bengaluru’s favorite open-air dining sanctuary. Savor live clay-oven charcoal tandoori grills, authentic royal dum biryanis, and crafted beverages amidst serene garden cabanas, illuminated walkways, and weekend sports screenings.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/menu"
              className="px-7 py-4 rounded-xl bg-gradient-to-r from-brand-gold to-brand-amber hover:from-brand-goldHover hover:to-brand-gold text-brand-dark font-bold text-sm tracking-wide transition-all shadow-xl shadow-brand-gold/20 flex items-center justify-center gap-2 group"
            >
              <Utensils className="w-4 h-4 text-brand-dark" />
              <span>Explore Menu</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/gallery"
              className="px-7 py-4 rounded-xl bg-brand-card hover:bg-brand-cardBorder border border-brand-cardBorder text-brand-ivory font-semibold text-sm transition-all flex items-center justify-center gap-2 hover:border-brand-gold/50"
            >
              <Camera className="w-4 h-4 text-brand-gold" />
              <span>Photos & Videos</span>
            </Link>

            <Link
              href="/booking"
              className="px-7 py-4 rounded-xl bg-brand-card hover:bg-brand-cardBorder border border-brand-cardBorder text-brand-ivory font-semibold text-sm transition-all flex items-center justify-center gap-2 hover:border-brand-gold/50"
            >
              <Calendar className="w-4 h-4 text-brand-gold" />
              <span>Reserve Table / Cabana</span>
            </Link>

            <a
              href="https://www.google.com/maps/search/?api=1&query=Kick+Bunk+Restaurant+and+Bar+Hulimangala+Bengaluru"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-4 rounded-xl bg-[#141820] hover:bg-[#1C222E] border border-brand-cardBorder text-gray-300 hover:text-white font-medium text-sm transition-all flex items-center justify-center gap-2"
            >
              <Navigation className="w-4 h-4 text-brand-gold" />
              <span>Get Directions</span>
            </a>
          </div>

          {/* Quick Metrics Banner */}
          <div className="pt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto border-t border-brand-cardBorder/60">
            <div className="p-3 rounded-xl bg-brand-card/40 border border-brand-cardBorder/40">
              <div className="font-serif text-2xl font-bold text-brand-gold">100%</div>
              <div className="text-xs text-gray-300 font-medium">Clay-Oven Charcoal Tandoor</div>
            </div>
            <div className="p-3 rounded-xl bg-brand-card/40 border border-brand-cardBorder/40">
              <div className="font-serif text-2xl font-bold text-brand-gold">4.8 ★</div>
              <div className="text-xs text-gray-300 font-medium">1,800+ Verified Reviews</div>
            </div>
            <div className="p-3 rounded-xl bg-brand-card/40 border border-brand-cardBorder/40">
              <div className="font-serif text-2xl font-bold text-brand-gold">Garden</div>
              <div className="text-xs text-gray-300 font-medium">Private Cabanas & Open-Air</div>
            </div>
            <div className="p-3 rounded-xl bg-brand-card/40 border border-brand-cardBorder/40">
              <div className="font-serif text-2xl font-bold text-brand-gold">Bengaluru</div>
              <div className="text-xs text-gray-300 font-medium">Hulimangala Main Road</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. VERIFIED RESTAURANT INTRODUCTION & AMBIENCE STORY */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-1.5 text-brand-gold text-xs font-bold uppercase tracking-widest">
              <Flame className="w-4 h-4 text-brand-amber" />
              <span>Welcome To Kick Bunk Restaurant & Bar</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-brand-ivory leading-tight">
              An Authentic Escape from the City’s Hustle
            </h2>

            <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-light">
              Nestled near Hulimangala Cross in Vinayaka Layout, Electronic City Phase 1, <strong>Kick Bunk Restaurant & Bar</strong> offers a one-of-a-kind open-air garden hospitality experience. Designed around lush palm-lined courtyards, decorative illuminated trees, and private wooden dining gazebos, Kick Bunk is the preferred choice for family gatherings, romantic candlelit dinners, and energetic corporate celebrations.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-brand-card border border-brand-cardBorder space-y-1">
                <div className="flex items-center gap-2 text-brand-gold font-semibold text-sm">
                  <Flame className="w-4 h-4 text-brand-amber" />
                  <span>Live Charcoal Tandoor</span>
                </div>
                <p className="text-xs text-gray-400">
                  Signature Kalmi Kebabs, Malai Tikkas, and tandoori rotis fired fresh over natural coal.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-brand-card border border-brand-cardBorder space-y-1">
                <div className="flex items-center gap-2 text-brand-gold font-semibold text-sm">
                  <Wine className="w-4 h-4 text-brand-gold" />
                  <span>Full Resto-Bar Counter</span>
                </div>
                <p className="text-xs text-gray-400">
                  Craft beers, signature spirit cocktails, tropical coolers, and chilled beverages.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-brand-card border border-brand-cardBorder space-y-1">
                <div className="flex items-center gap-2 text-brand-gold font-semibold text-sm">
                  <Users className="w-4 h-4 text-brand-green" />
                  <span>Private Cabana Dining</span>
                </div>
                <p className="text-xs text-gray-400">
                  Exclusive private garden cabanas for intimate family feasts and birthday celebrations.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-brand-card border border-brand-cardBorder space-y-1">
                <div className="flex items-center gap-2 text-brand-gold font-semibold text-sm">
                  <Tv className="w-4 h-4 text-brand-amber" />
                  <span>Live Sports Screening</span>
                </div>
                <p className="text-xs text-gray-400">
                  High-definition outdoor match screenings with high-energy crowd ambiance.
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <Link
                href="/about"
                className="text-sm font-semibold text-brand-gold hover:text-brand-goldHover flex items-center gap-1.5"
              >
                <span>Read Full Restaurant Story</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
              <span className="text-gray-600">•</span>
              <a
                href="tel:+919980626699"
                className="text-sm font-medium text-gray-300 hover:text-brand-gold flex items-center gap-1.5"
              >
                <Phone className="w-4 h-4 text-brand-gold" />
                <span>Call Venue: +91 99806 26699</span>
              </a>
            </div>
          </div>

          {/* Right Photographic Feature Collage */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden border border-brand-cardBorder relative group shadow-xl">
                <img
                  src="/images/kickbunk/magicpin_02_entrance_night.webp"
                  alt="Kick Bunk Illuminated Entrance at Night"
                  className="w-full h-56 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                  <span className="text-xs font-semibold text-white">Illuminated Entrance at Night</span>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden border border-brand-cardBorder relative group shadow-xl">
                <img
                  src="/images/kickbunk/magicpin_01_kalmi_kebab.webp"
                  alt="Kick Bunk Charcoal Kalmi Kebab"
                  className="w-full h-44 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                  <span className="text-xs font-semibold text-brand-gold">Signature Kalmi Kebab</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-6">
              <div className="rounded-2xl overflow-hidden border border-brand-cardBorder relative group shadow-xl">
                <img
                  src="/images/kickbunk/google_01_garden_lights_night.jpg"
                  alt="Fairy-Lit Garden Ambience"
                  className="w-full h-44 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                  <span className="text-xs font-semibold text-brand-gold">Fairy-Lit Cabanas</span>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden border border-brand-cardBorder relative group shadow-xl">
                <img
                  src="/images/kickbunk/magicpin_07_outdoor_seating_daylight.webp"
                  alt="Daylight Outdoor Garden Seating"
                  className="w-full h-56 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                  <span className="text-xs font-semibold text-white">Lush Garden Seating Deck</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. RESTAURANT HIGHLIGHT CARDS (Section 3) */}
      <section className="py-16 bg-[#0E1116] border-y border-brand-cardBorder">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="text-brand-gold text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-1.5">
              <Award className="w-4 h-4 text-brand-gold" />
              <span>The Five Hallmarks of Kick Bunk</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-ivory">
              Curated Dining Highlights
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              Each facet of Kick Bunk has been thoughtfully crafted to deliver an authentic culinary journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {/* 1. Food & Beverages */}
            <div className="bg-brand-card rounded-2xl overflow-hidden border border-brand-cardBorder hover:border-brand-gold/40 transition-all flex flex-col group shadow-lg">
              <div className="relative h-44 overflow-hidden">
                <img
                  src="/images/kickbunk/magicpin_01_kalmi_kebab.webp"
                  alt="Food and Beverages"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C0E] to-transparent" />
                <span className="absolute bottom-3 left-3 text-xs font-bold text-brand-gold uppercase tracking-wider">
                  Food & Beverages
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <p className="text-xs text-gray-300 leading-relaxed font-light">
                  Charcoal roasted tandoori grills, royal handi biryanis, wok-fried starters, and refreshing drinks.
                </p>
                <div className="pt-3 border-t border-brand-cardBorder/60 text-[11px] text-brand-gold font-semibold">
                  Verified Menu Special
                </div>
              </div>
            </div>

            {/* 2. Restaurant Ambience */}
            <div className="bg-brand-card rounded-2xl overflow-hidden border border-brand-cardBorder hover:border-brand-gold/40 transition-all flex flex-col group shadow-lg">
              <div className="relative h-44 overflow-hidden">
                <img
                  src="/images/kickbunk/google_01_garden_lights_night.jpg"
                  alt="Restaurant Ambience"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C0E] to-transparent" />
                <span className="absolute bottom-3 left-3 text-xs font-bold text-brand-gold uppercase tracking-wider">
                  Garden Ambience
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <p className="text-xs text-gray-300 leading-relaxed font-light">
                  Magical fairy-lit trees, stone pathways, and breezy open skies for evening dining under the stars.
                </p>
                <div className="pt-3 border-t border-brand-cardBorder/60 text-[11px] text-brand-gold font-semibold">
                  Evening Night Vibe
                </div>
              </div>
            </div>

            {/* 3. Indoor Dining */}
            <div className="bg-brand-card rounded-2xl overflow-hidden border border-brand-cardBorder hover:border-brand-gold/40 transition-all flex flex-col group shadow-lg">
              <div className="relative h-44 overflow-hidden">
                <img
                  src="/images/kickbunk/restaurant_guru_interior.jpg"
                  alt="Indoor Dining"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C0E] to-transparent" />
                <span className="absolute bottom-3 left-3 text-xs font-bold text-brand-gold uppercase tracking-wider">
                  Indoor Dining
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <p className="text-xs text-gray-300 leading-relaxed font-light">
                  Spacious air-conditioned family dining hall and comfortable booth seating for all weather comfort.
                </p>
                <div className="pt-3 border-t border-brand-cardBorder/60 text-[11px] text-brand-gold font-semibold">
                  Family & Corporate AC
                </div>
              </div>
            </div>

            {/* 4. Outdoor Experience */}
            <div className="bg-brand-card rounded-2xl overflow-hidden border border-brand-cardBorder hover:border-brand-gold/40 transition-all flex flex-col group shadow-lg">
              <div className="relative h-44 overflow-hidden">
                <img
                  src="/images/kickbunk/magicpin_07_outdoor_seating_daylight.webp"
                  alt="Outdoor Seating"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C0E] to-transparent" />
                <span className="absolute bottom-3 left-3 text-xs font-bold text-brand-gold uppercase tracking-wider">
                  Outdoor Seating
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <p className="text-xs text-gray-300 leading-relaxed font-light">
                  Expansive garden deck, natural foliage, and secluded gazebos offering fresh outdoor dining.
                </p>
                <div className="pt-3 border-t border-brand-cardBorder/60 text-[11px] text-brand-gold font-semibold">
                  Lush Daylight Seating
                </div>
              </div>
            </div>

            {/* 5. Events & Celebrations */}
            <div className="bg-brand-card rounded-2xl overflow-hidden border border-brand-cardBorder hover:border-brand-gold/40 transition-all flex flex-col group shadow-lg">
              <div className="relative h-44 overflow-hidden">
                <img
                  src="/images/kickbunk/magicpin_06_garden_building_night.webp"
                  alt="Events and Celebrations"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C0E] to-transparent" />
                <span className="absolute bottom-3 left-3 text-xs font-bold text-brand-gold uppercase tracking-wider">
                  Celebrations
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <p className="text-xs text-gray-300 leading-relaxed font-light">
                  Tailored banquet packages for birthday parties, anniversaries, corporate team outings, and live sports.
                </p>
                <div className="pt-3 border-t border-brand-cardBorder/60 text-[11px] text-brand-gold font-semibold">
                  Cabanas & Groups
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. COMPLETE PHOTO GALLERY SHOWCASE (Section 4) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-brand-gold text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 mb-2">
              <Camera className="w-4 h-4 text-brand-gold" />
              <span>Real Venue Photography</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-ivory">
              Authentic Restaurant Photo Gallery
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-xl">
              Photographs captured directly at Kick Bunk Bengaluru, sourced from official Google Business Profile, Magicpin, and verified customer visits.
            </p>
          </div>

          <Link
            href="/gallery"
            className="px-6 py-3 rounded-xl bg-brand-gold hover:bg-brand-goldHover text-brand-dark font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2 group self-start md:self-auto"
          >
            <span>Explore All 24+ Photos & Videos</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Responsive Grid with Click-to-Zoom */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {verifiedShowcasePhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="bg-brand-card rounded-2xl overflow-hidden border border-brand-cardBorder hover:border-brand-gold/60 transition-all duration-300 cursor-pointer group shadow-xl flex flex-col"
            >
              <div className="relative h-64 overflow-hidden bg-black">
                <img
                  src={photo.url}
                  alt={photo.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-4 h-4 text-brand-gold" />
                </div>

                <div className="absolute bottom-4 left-4 right-4 space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-brand-gold text-brand-dark inline-block">
                    {photo.category}
                  </span>
                  <h3 className="font-serif font-bold text-base text-brand-ivory group-hover:text-brand-gold transition-colors">
                    {photo.title}
                  </h3>
                  <p className="text-[11px] text-gray-400">
                    Source: {photo.source}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. COMPLETE VIDEO GALLERY & EXPERIENCES SECTION (Section 5) */}
      <section className="py-20 bg-[#07090C] border-y border-brand-cardBorder">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="text-brand-gold text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-1.5">
              <Video className="w-4 h-4 text-brand-gold" />
              <span>Drone Tours & Social Reels</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-ivory">
              Videos & Venue Experiences
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              Immerse yourself in live footage, drone-view layouts, and food prep highlights from official restaurant channels.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Feature 1: Magicpin Drone Story Entry */}
            <div className="bg-brand-card rounded-3xl overflow-hidden border border-brand-cardBorder hover:border-brand-gold/40 transition-all shadow-2xl flex flex-col justify-between">
              <div className="relative h-72 sm:h-80 overflow-hidden bg-black group">
                <img
                  src="/images/kickbunk/google_01_garden_lights_night.jpg"
                  alt="Drone View of Complete Garden Resto-Bar"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C0E] via-transparent to-transparent" />

                {/* Big Play Button Overlay */}
                <a
                  href="https://magicpin.in/Bangalore/Yarandahalli/Restaurant/Kick-Bunk-Restaurant/store/621360/stories?post_id=978426497"
                  target="_blank"
                  rel="noreferrer"
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="w-20 h-20 rounded-full bg-brand-gold/90 text-brand-dark flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:bg-brand-gold transition-all duration-300">
                    <Play className="w-8 h-8 fill-brand-dark ml-1" />
                  </div>
                </a>

                <div className="absolute top-4 left-4 bg-brand-dark/80 backdrop-blur-md px-3 py-1 rounded-full border border-brand-gold/30 text-xs text-brand-gold font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                  <span>Official Drone Video</span>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-4">
                <div className="space-y-1">
                  <h3 className="font-serif text-2xl font-bold text-brand-ivory">
                    Complete Garden Resto-Bar Setup (Drone Walkthrough)
                  </h3>
                  <p className="text-xs text-gray-400">
                    Verified Customer Story • Magicpin Video Entry #978426497
                  </p>
                </div>

                <p className="text-sm text-gray-300 font-light leading-relaxed">
                  Experience a high-definition aerial drone perspective sweeping over the illuminated courtyard, lush garden dining gazebos, bamboo pathways, and outdoor dining tables under fairy lights.
                </p>

                <div className="pt-2 flex items-center justify-between">
                  <a
                    href="https://magicpin.in/Bangalore/Yarandahalli/Restaurant/Kick-Bunk-Restaurant/store/621360/stories?post_id=978426497"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-gold hover:bg-brand-goldHover text-brand-dark font-bold text-xs uppercase tracking-wider transition-all"
                  >
                    <span>Watch Drone Story Video</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <span className="text-xs text-gray-500">Official Magicpin Video</span>
                </div>
              </div>
            </div>

            {/* Feature 2: Official Instagram Reels Showcase */}
            <div className="bg-brand-card rounded-3xl overflow-hidden border border-brand-cardBorder hover:border-brand-gold/40 transition-all shadow-2xl flex flex-col justify-between">
              <div className="relative h-72 sm:h-80 overflow-hidden bg-black group">
                <img
                  src="/images/kickbunk/magicpin_03_garden_courtyard_night.webp"
                  alt="Kick Bunk Instagram Reels Showcase"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C0E] via-transparent to-transparent" />

                <a
                  href="https://www.instagram.com/kick_bunk_gardenrestobar/"
                  target="_blank"
                  rel="noreferrer"
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="w-20 h-20 rounded-full bg-pink-600/90 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:bg-pink-600 transition-all duration-300">
                    <Play className="w-8 h-8 fill-white ml-1" />
                  </div>
                </a>

                <div className="absolute top-4 left-4 bg-brand-dark/80 backdrop-blur-md px-3 py-1 rounded-full border border-pink-500/30 text-xs text-pink-400 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></span>
                  <span>Instagram Experience</span>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-4">
                <div className="space-y-1">
                  <h3 className="font-serif text-2xl font-bold text-brand-ivory">
                    Night Vibe & Tandoori Smoke: Instagram Video Reels
                  </h3>
                  <p className="text-xs text-gray-400">
                    Official Handle • @kick_bunk_gardenrestobar
                  </p>
                </div>

                <p className="text-sm text-gray-300 font-light leading-relaxed">
                  Watch behind-the-scenes tandoori preparations, chef skewer flips over glowing embers, and live weekend crowd atmosphere at the Bengaluru resto-bar.
                </p>

                <div className="pt-2 flex items-center justify-between">
                  <a
                    href="https://www.instagram.com/kick_bunk_gardenrestobar/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold text-xs uppercase tracking-wider transition-all"
                  >
                    <span>Follow & Watch on Instagram</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <span className="text-xs text-gray-500">@kick_bunk_gardenrestobar</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SIGNATURE MASTERPIECES MENU (Section 6) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-brand-gold text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 mb-2">
              <Flame className="w-4 h-4 text-brand-amber" />
              <span>Chef's Masterpieces</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-ivory">
              Signature Delicacies & Charcoal Grills
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Cooked with authentic Indian spices, live clay tandoor embers, and fresh local produce.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/images/kickbunk/restaurant_guru_menu_snapshot.jpg"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl bg-brand-card hover:bg-brand-cardBorder border border-brand-cardBorder text-brand-gold text-xs font-semibold flex items-center gap-1.5"
            >
              <span>View Original Menu Snapshot</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <Link
              href="/menu"
              className="px-5 py-2.5 rounded-xl bg-brand-gold hover:bg-brand-goldHover text-brand-dark font-bold text-xs uppercase tracking-wider flex items-center gap-1.5"
            >
              <span>Full Menu</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredDishes.map((item) => (
            <div
              key={item.id}
              className="bg-brand-card rounded-2xl overflow-hidden border border-brand-cardBorder hover:border-brand-gold/40 transition-all duration-300 group flex flex-col shadow-lg"
            >
              <div className="relative h-48 overflow-hidden bg-black">
                <img
                  src={item.images?.[0]?.imageUrl || '/images/kickbunk/magicpin_01_kalmi_kebab.webp'}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span
                    className={`w-5 h-5 rounded-sm border flex items-center justify-center text-[10px] bg-brand-dark/80 backdrop-blur-sm ${
                      item.isVeg ? 'border-brand-green text-brand-green' : 'border-red-500 text-red-500'
                    }`}
                  >
                    ●
                  </span>
                  {item.isBestSeller && (
                    <span className="px-2 py-0.5 rounded-full bg-brand-gold text-brand-dark text-[10px] font-bold uppercase tracking-wider">
                      Chef Special
                    </span>
                  )}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif font-bold text-base text-brand-ivory group-hover:text-brand-gold transition-colors line-clamp-1">
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-brand-cardBorder/60">
                  <div className="text-brand-gold font-serif font-bold text-lg">
                    ₹{item.basePrice}
                  </div>
                  <Link
                    href="/menu"
                    className="px-3.5 py-1.5 rounded-lg bg-brand-cardBorder hover:bg-brand-gold hover:text-brand-dark text-xs font-semibold text-gray-200 transition-colors"
                  >
                    Add to Cart
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. VERIFIED CUSTOMER REVIEWS & REPUTATION */}
      <section className="py-20 bg-[#0E1116] border-y border-brand-cardBorder">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="text-brand-gold text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-1.5">
              <Star className="w-4 h-4 fill-brand-gold text-brand-gold" />
              <span>Guest Voices & Testimonials</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-ivory">
              Loved by Bengaluru Food Lovers
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              Verified feedback gathered from Google Maps, Zomato, and Magicpin diners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-brand-card p-6 rounded-2xl border border-brand-cardBorder space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex text-brand-gold text-sm">★★★★★</div>
                <span className="text-[10px] bg-red-500/20 text-red-400 px-2 py-0.5 rounded font-bold">Zomato Review</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed italic">
                “Kick Bunk on Hulimangala Main Road has the most peaceful garden atmosphere. The Kalmi Kebabs were ultra-tender with smoky charcoal flavor, and the private cabana made our team celebration super special.”
              </p>
              <div className="pt-2 border-t border-brand-cardBorder/60 flex items-center justify-between text-xs">
                <span className="font-semibold text-brand-ivory">Rohit Nair</span>
                <span className="text-gray-500">Electronic City Phase 1</span>
              </div>
            </div>

            <div className="bg-brand-card p-6 rounded-2xl border border-brand-cardBorder space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex text-brand-gold text-sm">★★★★★</div>
                <span className="text-[10px] bg-brand-gold/20 text-brand-gold px-2 py-0.5 rounded font-bold">Google Maps</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed italic">
                “Fairy lights at night make this place magical. The chicken dum biryani in the handi was fragrant, authentic, and generously portioned. Highly recommend booking a cabana on weekends!”
              </p>
              <div className="pt-2 border-t border-brand-cardBorder/60 flex items-center justify-between text-xs">
                <span className="font-semibold text-brand-ivory">Ananya Deshmukh</span>
                <span className="text-gray-500">Bengaluru Diner</span>
              </div>
            </div>

            <div className="bg-brand-card p-6 rounded-2xl border border-brand-cardBorder space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex text-brand-gold text-sm">★★★★★</div>
                <span className="text-[10px] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded font-bold">Magicpin Review</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed italic">
                “Great resto-bar setup in Vinayaka Layout. Fast service, spacious parking, clean outdoor environment, and fantastic tandoori snacks to go along with drinks. 10/10 dining destination.”
              </p>
              <div className="pt-2 border-t border-brand-cardBorder/60 flex items-center justify-between text-xs">
                <span className="font-semibold text-brand-ivory">Varun Kulkarni</span>
                <span className="text-gray-500">Magicpin Gold Member</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. VERIFIED LOCATION & QUICK DIRECTIONS BANNER (Section 7) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="bg-gradient-to-br from-[#12161F] via-brand-card to-[#12161F] rounded-3xl border border-brand-cardBorder p-8 sm:p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-1.5 text-brand-gold text-xs font-bold uppercase tracking-widest">
                <MapPin className="w-4 h-4 text-brand-gold" />
                <span>Visit Kick Bunk Bengaluru Flagship</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-ivory leading-tight">
                Plan Your Visit to Kick Bunk Restaurant & Bar
              </h2>

              <div className="space-y-3 text-xs sm:text-sm text-gray-300">
                <p className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                  <span>
                    <strong>Address:</strong> Hulimangala Main Road, Vinayaka Layout, Vabasandra, Electronic City Phase 1, Bengaluru, Karnataka 560105
                  </span>
                </p>
                <p className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-brand-gold shrink-0" />
                  <span>
                    <strong>Phone:</strong> <a href="tel:+919980626699" className="hover:text-brand-gold font-bold">+91 99806 26699</a> (Direct Table Inquiries)
                  </span>
                </p>
                <p className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-brand-gold shrink-0" />
                  <span>
                    <strong>Timings:</strong> 11:30 AM – 11:30 PM (All 7 Days)
                  </span>
                </p>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Kick+Bunk+Restaurant+and+Bar+Hulimangala+Bengaluru"
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3.5 rounded-xl bg-brand-gold hover:bg-brand-goldHover text-brand-dark font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-md"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Open in Google Maps</span>
                </a>

                <a
                  href="https://wa.me/919980626699?text=Hello%20Kick%20Bunk%20Bengaluru,%20I%20would%20like%20to%20reserve%20a%20table"
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3.5 rounded-xl bg-brand-green hover:bg-brand-greenHover text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Reservation</span>
                </a>

                <Link
                  href="/booking"
                  className="px-6 py-3.5 rounded-xl bg-brand-card hover:bg-brand-cardBorder border border-brand-cardBorder text-brand-ivory font-semibold text-xs transition-all flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-brand-gold" />
                  <span>Online Table Booking</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-brand-cardBorder relative shadow-2xl h-64 sm:h-72">
              <iframe
                title="Kick Bunk Location Map"
                src="https://maps.google.com/maps?q=Kick+Bunk+Restaurant+and+Bar+Hulimangala+Bengaluru&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* LIGHTBOX PREVIEW MODAL */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#0E1116] rounded-3xl overflow-hidden border border-brand-cardBorder space-y-4 p-4 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-brand-cardBorder/60">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-brand-gold">
                  {selectedPhoto.category}
                </span>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-brand-ivory">
                  {selectedPhoto.title}
                </h3>
              </div>

              <button
                onClick={() => setSelectedPhoto(null)}
                className="p-2 rounded-full bg-brand-card hover:bg-brand-cardBorder text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative max-h-[70vh] flex items-center justify-center overflow-hidden rounded-2xl bg-black">
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.title}
                className="max-h-[68vh] w-auto object-contain rounded-xl"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-2 pt-2">
              <div>
                <strong>Verified Source:</strong> {selectedPhoto.source}
              </div>
              <Link
                href="/gallery"
                onClick={() => setSelectedPhoto(null)}
                className="text-brand-gold hover:underline font-semibold flex items-center gap-1"
              >
                <span>View Full Photo & Video Gallery</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
