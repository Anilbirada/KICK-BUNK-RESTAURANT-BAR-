'use client';

import React from 'react';
import Link from 'next/link';
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
  Server,
  Database,
  Smartphone,
  Layers,
  Code2,
  Lock,
  Activity,
  Cpu
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0A0C0E] py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20">
      {/* 1. HERO SECTION WITH VERIFIED RESTAURANT PHOTOGRAPHY */}
      <section className="relative rounded-3xl overflow-hidden border border-brand-cardBorder bg-[#0E1013] p-8 sm:p-16 shadow-2xl">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{
            backgroundImage: `url('/images/kickbunk/google_01_garden_lights_night.jpg')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0C0E] via-[#0A0C0E]/85 to-transparent" />

        <div className="relative max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold/15 border border-brand-gold/40 text-brand-gold text-xs font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Kick Bunk Heritage</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-brand-ivory leading-tight">
            Where Lush Garden Dining Meets <span className="text-brand-gold">Charcoal Mastery</span>
          </h1>

          <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-light">
            Founded with a passion for bringing families and friends together over extraordinary hospitality, <strong>Kick Bunk Restaurant & Bar</strong> on Hulimangala Main Road has grown into one of South Bengaluru’s most celebrated open-air dining destinations. Known for our signature clay-oven charcoal tandoors, fragrant dum handi biryanis, and secluded garden cabanas, we craft memorable dining experiences for every occasion.
          </p>

          <div className="pt-2 flex flex-wrap gap-4">
            <Link
              href="/booking"
              className="px-6 py-3 rounded-xl bg-brand-gold hover:bg-brand-goldHover text-brand-dark font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Reserve a Table / Cabana</span>
            </Link>
            <Link
              href="/menu"
              className="px-6 py-3 rounded-xl bg-brand-card hover:bg-brand-cardBorder border border-brand-cardBorder text-gray-200 text-xs font-semibold flex items-center gap-2"
            >
              <Utensils className="w-4 h-4 text-brand-gold" />
              <span>Explore Menu</span>
            </Link>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Kick+Bunk+Restaurant+and+Bar+Hulimangala+Bengaluru"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-xl bg-[#141820] hover:bg-[#1C222E] border border-brand-cardBorder text-gray-300 text-xs font-semibold flex items-center gap-2"
            >
              <Navigation className="w-4 h-4 text-brand-gold" />
              <span>Directions</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. VERIFIED REPUTATION METRICS */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        <div className="bg-brand-card p-6 rounded-2xl border border-brand-cardBorder text-center space-y-1 shadow-lg">
          <div className="flex items-center justify-center gap-1 text-brand-gold mb-1">
            <Star className="w-5 h-5 fill-brand-gold" />
            <span className="font-serif text-2xl font-bold">4.8</span>
          </div>
          <div className="text-xs font-semibold text-brand-ivory">Google & Magicpin Rating</div>
          <div className="text-[11px] text-gray-400">Over 1,800+ Verified Reviews</div>
        </div>

        <div className="bg-brand-card p-6 rounded-2xl border border-brand-cardBorder text-center space-y-1 shadow-lg">
          <div className="font-serif text-2xl font-bold text-brand-gold">100%</div>
          <div className="text-xs font-semibold text-brand-ivory">Clay-Oven Charcoal Tandoor</div>
          <div className="text-[11px] text-gray-400">Authentic Smoky Aromas</div>
        </div>

        <div className="bg-brand-card p-6 rounded-2xl border border-brand-cardBorder text-center space-y-1 shadow-lg">
          <div className="font-serif text-2xl font-bold text-brand-gold">Garden</div>
          <div className="text-xs font-semibold text-brand-ivory">Private Cabanas & Open Air</div>
          <div className="text-[11px] text-gray-400">Lush Palm-Lined Dining</div>
        </div>

        <div className="bg-brand-card p-6 rounded-2xl border border-brand-cardBorder text-center space-y-1 shadow-lg">
          <div className="font-serif text-2xl font-bold text-brand-gold">Bengaluru</div>
          <div className="text-xs font-semibold text-brand-ivory">Electronic City Phase 1</div>
          <div className="text-[11px] text-gray-400">Hulimangala Main Road</div>
        </div>
      </section>

      {/* 3. FOUR ESSENTIAL EXPERIENCES (VERIFIED FACILITIES) */}
      <section className="space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-brand-gold text-xs font-bold uppercase tracking-widest">
            Verified Restaurant Facilities
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-ivory">
            The Kick Bunk Dining Experience
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Experience 1: Charcoal Mastery */}
          <div className="bg-brand-card rounded-3xl overflow-hidden border border-brand-cardBorder flex flex-col sm:flex-row group shadow-xl">
            <div className="sm:w-1/2 h-56 sm:h-auto overflow-hidden">
              <img
                src="/images/kickbunk/magicpin_01_kalmi_kebab.webp"
                alt="Clay-Oven Tandoori Mastery"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="sm:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-500 flex items-center justify-center">
                  <Flame className="w-4 h-4" />
                </span>
                <h3 className="font-serif text-xl font-bold text-brand-ivory">
                  Clay Tandoor Charcoal Grills
                </h3>
                <p className="text-xs text-gray-300 leading-relaxed font-light">
                  Our kitchen maintains traditional charcoal tandoors burning continuously. From cashew-crusted Kalmi Kebabs to succulent Chicken Tikkas and charred Paneer Malai skewers, every dish bears the unmistakable aroma of live fire.
                </p>
              </div>
              <div className="text-xs text-brand-gold font-semibold">
                Signature Item: Kalmi Kebab
              </div>
            </div>
          </div>

          {/* Experience 2: Garden Cabanas */}
          <div className="bg-brand-card rounded-3xl overflow-hidden border border-brand-cardBorder flex flex-col sm:flex-row group shadow-xl">
            <div className="sm:w-1/2 h-56 sm:h-auto overflow-hidden">
              <img
                src="/images/kickbunk/magicpin_07_outdoor_seating_daylight.webp"
                alt="Lush Garden Cabanas"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="sm:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="w-8 h-8 rounded-lg bg-brand-green/20 text-brand-green flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </span>
                <h3 className="font-serif text-xl font-bold text-brand-ivory">
                  Lush Outdoor Garden Cabanas
                </h3>
                <p className="text-xs text-gray-300 leading-relaxed font-light">
                  Spacious open-air garden cabanas surrounded by manicured lawns, natural bamboo pergolas, and palm trees. Dine under the open Bengaluru sky during afternoon breezes or under glowing fairy lights by night.
                </p>
              </div>
              <div className="text-xs text-brand-green font-semibold">
                Private Gazebos & Open-Air Tables
              </div>
            </div>
          </div>

          {/* Experience 3: Resto-Bar & Sports Lounge */}
          <div className="bg-brand-card rounded-3xl overflow-hidden border border-brand-cardBorder flex flex-col sm:flex-row group shadow-xl">
            <div className="sm:w-1/2 h-56 sm:h-auto overflow-hidden">
              <img
                src="/images/kickbunk/magicpin_06_garden_building_night.webp"
                alt="Resto-Bar and Sports Lounge"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="sm:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="w-8 h-8 rounded-lg bg-brand-gold/20 text-brand-gold flex items-center justify-center">
                  <Wine className="w-4 h-4" />
                </span>
                <h3 className="font-serif text-xl font-bold text-brand-ivory">
                  Full Resto-Bar & Sports Screening
                </h3>
                <p className="text-xs text-gray-300 leading-relaxed font-light">
                  A lively resto-bar offering draught beers, premium spirits, classic cocktails, and crafted mocktails. On match days, our large outdoor screens transform the venue into an electrifying sports viewing hub.
                </p>
              </div>
              <div className="text-xs text-brand-gold font-semibold">
                Bar Service & Live Match Screenings
              </div>
            </div>
          </div>

          {/* Experience 4: Indoor AC Comfort */}
          <div className="bg-brand-card rounded-3xl overflow-hidden border border-brand-cardBorder flex flex-col sm:flex-row group shadow-xl">
            <div className="sm:w-1/2 h-56 sm:h-auto overflow-hidden">
              <img
                src="/images/kickbunk/restaurant_guru_interior.jpg"
                alt="Air-Conditioned Indoor Dining"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="sm:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </span>
                <h3 className="font-serif text-xl font-bold text-brand-ivory">
                  AC Family Dining Hall
                </h3>
                <p className="text-xs text-gray-300 leading-relaxed font-light">
                  For guests who prefer air-conditioned comfort, our interior dining pavilion features plush upholstered booths, private family table configurations, and courteous table-side service.
                </p>
              </div>
              <div className="text-xs text-blue-400 font-semibold">
                Climate-Controlled Family Hall
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ENTERPRISE ENGINEERING & KICK BUNK 360 ARCHITECTURE */}
      <section className="bg-gradient-to-b from-[#0E1013] to-[#0A0C0E] rounded-3xl border border-brand-cardBorder p-8 sm:p-12 shadow-2xl space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold/15 border border-brand-gold/40 text-brand-gold text-xs font-semibold tracking-wider uppercase">
            <Cpu className="w-3.5 h-3.5" />
            <span>Enterprise Digital Platform</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-ivory">
            Powered by KICK BUNK 360
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
            Engineered by <strong>RSR Technologies</strong> (+91 77605 94868 / +91 99453 21367) as a next-generation <strong>Toast POS benchmark</strong> enterprise hospitality suite. Designed to solve fragmented billing, eliminate paper KOT kitchen delays, prevent inventory shrinkage, and unify multi-branch operations under a single digital brain.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="bg-[#141820] p-6 rounded-2xl border border-brand-cardBorder/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-lg font-bold text-brand-ivory">Next.js 14 & React Native</h4>
            <p className="text-xs text-gray-300 leading-relaxed font-light">
              High-performance customer web portals, Toast-style POS billing terminal, and cross-platform mobile apps for Android & iOS (Expo SDK 51) sharing unified state and synchronized backend APIs.
            </p>
          </div>

          <div className="bg-[#141820] p-6 rounded-2xl border border-brand-cardBorder/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Activity className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-lg font-bold text-brand-ivory">Real-Time Socket.IO KDS</h4>
            <p className="text-xs text-gray-300 leading-relaxed font-light">
              Kitchen Display System with automatic station routing (Charcoal Tandoor, Main Curries, Chinese/Continental, Bar), countdown timers, delay alerts, and digital bump bar workflow.
            </p>
          </div>

          <div className="bg-[#141820] p-6 rounded-2xl border border-brand-cardBorder/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-brand-gold flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-lg font-bold text-brand-ivory">50-Entity PostgreSQL 16</h4>
            <p className="text-xs text-gray-300 leading-relaxed font-light">
              Prisma ORM schema powering automated recipe inventory ingredient deductions, GST invoice compliance (2.5% CGST + 2.5% SGST), multi-tender split payments, and executive financial telemetry.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-brand-gold/10 border border-brand-gold/20 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="text-gray-300">
            <strong className="text-brand-gold">Development Partner:</strong> RSR Technologies • Enterprise Restaurant Digital Transformation
          </div>
          <div className="flex items-center gap-3">
            <Link href="/admin" className="text-brand-gold hover:underline font-semibold flex items-center gap-1">
              <span>Owner Dashboard</span>
              <span>&rarr;</span>
            </Link>
            <span className="text-gray-500">|</span>
            <Link href="/pos" className="text-brand-gold hover:underline font-semibold flex items-center gap-1">
              <span>POS Terminal</span>
              <span>&rarr;</span>
            </Link>
            <span className="text-gray-500">|</span>
            <Link href="/kitchen" className="text-brand-gold hover:underline font-semibold flex items-center gap-1">
              <span>Kitchen KDS</span>
              <span>&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. VERIFIED LOCATION & CONTACT FOOTNOTE */}
      <section className="bg-brand-card rounded-3xl border border-brand-cardBorder p-8 sm:p-12 shadow-2xl">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-ivory">
            Visit Kick Bunk Restaurant & Bar Today
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 font-light">
            Located on Hulimangala Main Road, Vinayaka Layout, Electronic City Phase 1, Bengaluru. Open 7 days a week from 11:30 AM to 11:30 PM.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href="tel:+919980626699"
              className="px-6 py-3.5 rounded-xl bg-brand-gold hover:bg-brand-goldHover text-brand-dark font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-md"
            >
              <Phone className="w-4 h-4" />
              <span>Call: +91 99806 26699</span>
            </a>
            <a
              href="https://wa.me/919980626699?text=Hello%20Kick%20Bunk,%20I%20would%20like%20to%20know%20more%20about%20your%20restaurant"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 rounded-xl bg-brand-green hover:bg-brand-greenHover text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
            <Link
              href="/gallery"
              className="px-6 py-3.5 rounded-xl bg-[#141820] hover:bg-[#1C222E] border border-brand-cardBorder text-gray-200 text-xs font-semibold flex items-center gap-2"
            >
              <Camera className="w-4 h-4 text-brand-gold" />
              <span>View Verified Gallery</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
