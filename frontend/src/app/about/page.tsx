'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  MapPin,
  Clock,
  Phone,
  Star,
  Award,
  Sparkles,
  CheckCircle2,
  Calendar,
  Utensils,
  Flame,
  Wine,
  ShieldCheck,
  Tv,
  Camera,
  Navigation,
  MessageCircle,
  Users,
  ChevronRight
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#F4EFE5] pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20">
      {/* 1. HERO SECTION WITH VERIFIED RESTAURANT PHOTOGRAPHY */}
      <section className="relative rounded-3xl overflow-hidden border border-[#D4A017]/30 bg-[#0B0D11] p-8 sm:p-16 shadow-2xl">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: `url('/images/kickbunk/google_01_garden_lights_night.jpg')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/85 to-transparent" />

        <div className="relative max-w-2xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border border-[#D4A017]/50 p-1 bg-[#050505] shadow-gold-glow">
              <Image
                src="/images/logo.png"
                alt="KICK BUNK"
                width={48}
                height={48}
                className="object-contain"
              />
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4A017]/15 border border-[#D4A017]/40 text-[#F5D77A] text-xs font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#D4A017]" />
              <span>THE KICK BUNK HERITAGE</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-cormorant font-bold text-white leading-tight">
            Where Lush Garden Dining Meets <span className="text-gold-gradient">Charcoal Mastery</span>
          </h1>

          <p className="text-sm sm:text-base text-[#B8B1A5] leading-relaxed font-light font-manrope">
            Founded with a passion for bringing families and friends together over extraordinary hospitality, <strong>Kick Bunk Restaurant & Bar</strong> on Hulimangala Main Road has grown into one of South Bengaluru’s most celebrated open-air dining destinations. Known for our signature clay-oven charcoal tandoors, fragrant dum handi biryanis, and secluded garden cabanas, we craft memorable dining experiences for every occasion.
          </p>

          <div className="pt-2 flex flex-wrap gap-4">
            <Link
              href="/booking"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#D4A017] via-[#F5D77A] to-[#D4A017] text-[#050505] font-bold text-xs uppercase tracking-wider transition-all shadow-gold-glow flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-[#050505]" />
              <span>Reserve a Table / Cabana</span>
            </Link>
            <Link
              href="/menu"
              className="px-6 py-3 rounded-full bg-[#0F1115] hover:bg-[#151922] border border-[#1F242D] text-gray-200 text-xs font-semibold flex items-center gap-2"
            >
              <Utensils className="w-4 h-4 text-[#D4A017]" />
              <span>Explore Menu</span>
            </Link>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Kick+Bunk+Restaurant+and+Bar+Hulimangala+Bengaluru"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-full bg-[#141820] hover:bg-[#1C222E] border border-[#1F242D] text-gray-300 text-xs font-semibold flex items-center gap-2"
            >
              <Navigation className="w-4 h-4 text-[#D4A017]" />
              <span>Directions</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. VERIFIED REPUTATION METRICS */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        <div className="luxury-glass p-6 rounded-2xl border border-[#D4A017]/20 text-center space-y-1 shadow-lg">
          <div className="flex items-center justify-center gap-1 text-[#F5D77A] mb-1">
            <Star className="w-5 h-5 fill-[#D4A017]" />
            <span className="font-cormorant text-3xl font-bold">4.8</span>
          </div>
          <div className="text-xs font-semibold text-white">Google & Magicpin Rating</div>
          <div className="text-[11px] text-[#B8B1A5]">Over 1,800+ Verified Reviews</div>
        </div>

        <div className="luxury-glass p-6 rounded-2xl border border-[#D4A017]/20 text-center space-y-1 shadow-lg">
          <div className="font-cormorant text-3xl font-bold text-[#F5D77A]">100%</div>
          <div className="text-xs font-semibold text-white">Clay-Oven Charcoal Tandoor</div>
          <div className="text-[11px] text-[#B8B1A5]">Authentic Smoky Aromas</div>
        </div>

        <div className="luxury-glass p-6 rounded-2xl border border-[#D4A017]/20 text-center space-y-1 shadow-lg">
          <div className="font-cormorant text-3xl font-bold text-[#F5D77A]">Garden</div>
          <div className="text-xs font-semibold text-white">Private Cabanas & Open Air</div>
          <div className="text-[11px] text-[#B8B1A5]">Lush Palm-Lined Dining</div>
        </div>

        <div className="luxury-glass p-6 rounded-2xl border border-[#D4A017]/20 text-center space-y-1 shadow-lg">
          <div className="font-cormorant text-3xl font-bold text-[#F5D77A]">Bengaluru</div>
          <div className="text-xs font-semibold text-white">Electronic City Phase 1</div>
          <div className="text-[11px] text-[#B8B1A5]">Hulimangala Main Road</div>
        </div>
      </section>

      {/* 3. FOUR ESSENTIAL EXPERIENCES (VERIFIED FACILITIES) */}
      <section className="space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-[#D4A017] text-xs font-bold uppercase tracking-widest font-cinzel">
            VERIFIED RESTAURANT FACILITIES
          </div>
          <h2 className="text-3xl sm:text-5xl font-cormorant font-bold text-white">
            The Kick Bunk Dining Experience
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Experience 1: Charcoal Mastery */}
          <div className="luxury-glass rounded-3xl overflow-hidden border border-[#D4A017]/20 flex flex-col sm:flex-row group shadow-xl">
            <div className="sm:w-1/2 h-56 sm:h-auto overflow-hidden relative">
              <Image
                src="/images/kickbunk/magicpin_01_kalmi_kebab.webp"
                alt="Clay-Oven Tandoori Mastery"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="sm:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-500 flex items-center justify-center">
                  <Flame className="w-4 h-4" />
                </span>
                <h3 className="font-cormorant text-2xl font-bold text-white">
                  Clay Tandoor Charcoal Grills
                </h3>
                <p className="text-xs text-[#B8B1A5] leading-relaxed font-light">
                  Our kitchen maintains traditional charcoal tandoors burning continuously. From cashew-crusted Kalmi Kebabs to succulent Chicken Tikkas and charred Paneer Malai skewers, every dish bears the unmistakable aroma of live fire.
                </p>
              </div>
              <div className="text-xs text-[#F5D77A] font-semibold">
                Signature Item: Kalmi Kebab
              </div>
            </div>
          </div>

          {/* Experience 2: Garden Cabanas */}
          <div className="luxury-glass rounded-3xl overflow-hidden border border-[#D4A017]/20 flex flex-col sm:flex-row group shadow-xl">
            <div className="sm:w-1/2 h-56 sm:h-auto overflow-hidden relative">
              <Image
                src="/images/kickbunk/magicpin_07_outdoor_seating_daylight.webp"
                alt="Lush Garden Cabanas"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="sm:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </span>
                <h3 className="font-cormorant text-2xl font-bold text-white">
                  Lush Outdoor Garden Cabanas
                </h3>
                <p className="text-xs text-[#B8B1A5] leading-relaxed font-light">
                  Spacious open-air garden cabanas surrounded by manicured lawns, natural bamboo pergolas, and palm trees. Dine under the open Bengaluru sky during afternoon breezes or under glowing fairy lights by night.
                </p>
              </div>
              <div className="text-xs text-emerald-400 font-semibold">
                Private Gazebos & Open-Air Tables
              </div>
            </div>
          </div>

          {/* Experience 3: Resto-Bar & Sports Lounge */}
          <div className="luxury-glass rounded-3xl overflow-hidden border border-[#D4A017]/20 flex flex-col sm:flex-row group shadow-xl">
            <div className="sm:w-1/2 h-56 sm:h-auto overflow-hidden relative">
              <Image
                src="/images/kickbunk/magicpin_06_garden_building_night.webp"
                alt="Resto-Bar and Sports Lounge"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="sm:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="w-8 h-8 rounded-lg bg-[#D4A017]/20 text-[#F5D77A] flex items-center justify-center">
                  <Wine className="w-4 h-4" />
                </span>
                <h3 className="font-cormorant text-2xl font-bold text-white">
                  Full Resto-Bar & Sports Screening
                </h3>
                <p className="text-xs text-[#B8B1A5] leading-relaxed font-light">
                  Watch live cricket tournaments and international matches on giant screens while enjoying freshly poured draught beers, craft cocktails, and spicy bar platters in an electric atmosphere.
                </p>
              </div>
              <div className="text-xs text-[#F5D77A] font-semibold">
                Match Nights & Cocktail Menu
              </div>
            </div>
          </div>

          {/* Experience 4: Private Celebrations */}
          <div className="luxury-glass rounded-3xl overflow-hidden border border-[#D4A017]/20 flex flex-col sm:flex-row group shadow-xl">
            <div className="sm:w-1/2 h-56 sm:h-auto overflow-hidden relative">
              <Image
                src="/images/kickbunk/magicpin_10_decorative_tree_seating.webp"
                alt="Private Celebrations"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="sm:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="w-8 h-8 rounded-lg bg-pink-500/20 text-pink-400 flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </span>
                <h3 className="font-cormorant text-2xl font-bold text-white">
                  Events, Birthdays & Gatherings
                </h3>
                <p className="text-xs text-[#B8B1A5] leading-relaxed font-light">
                  Celebrate life’s milestones with our dedicated banquet team. We offer customized feast menus, private cabana clusters, balloon & cake arrangements, and personalized service for groups of 10 to 200+ guests.
                </p>
              </div>
              <div className="text-xs text-pink-400 font-semibold">
                Custom Menus & Dedicated Staff
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. RESTAURANT SPECIFICATIONS & TIMINGS */}
      <section className="luxury-glass rounded-3xl border border-[#D4A017]/30 p-8 sm:p-12 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[#D4A017]">
              <MapPin className="w-5 h-5" />
              <h4 className="font-cormorant text-xl font-bold text-white">Location</h4>
            </div>
            <p className="text-xs text-[#B8B1A5] leading-relaxed">
              Hulimangala Main Road, Vinayaka Layout, Vabasandra, Electronic City Phase 1, Bengaluru, Karnataka 560105
            </p>
            <p className="text-xs text-gray-500">
              Landmark: Near Electronic City Phase 1 Tech Hub
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[#D4A017]">
              <Clock className="w-5 h-5" />
              <h4 className="font-cormorant text-xl font-bold text-white">Hours of Service</h4>
            </div>
            <div className="text-xs text-[#B8B1A5] space-y-1">
              <p className="text-white font-medium">Monday – Sunday</p>
              <p>11:30 AM – 11:30 PM (All Days)</p>
              <p className="text-xs text-[#D4A017] pt-1">Dinner & Garden Ambience starts at 6:30 PM</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[#D4A017]">
              <Phone className="w-5 h-5" />
              <h4 className="font-cormorant text-xl font-bold text-white">Contact & Bookings</h4>
            </div>
            <div className="text-xs text-[#B8B1A5] space-y-1">
              <p className="text-white font-mono text-sm">+91 99806 26699</p>
              <p>Email: bengaluru@kickbunk.com</p>
              <p>Instagram: @kick_bunk_gardenrestobar</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
