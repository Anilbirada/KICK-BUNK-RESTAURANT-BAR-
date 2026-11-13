'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Instagram,
  ExternalLink,
  Navigation,
  Calendar,
  Sparkles,
  ShieldCheck,
  Award,
  Lock
} from 'lucide-react';

export const Footer: React.FC = () => {
  const pathname = usePathname();

  // Hide public footer on POS & KDS terminal screens
  if (pathname.startsWith('/pos') || pathname.startsWith('/kitchen')) {
    return null;
  }

  return (
    <footer className="bg-[#050505] border-t border-[#D4A017]/20 text-[#B8B1A5] text-sm relative overflow-hidden">
      {/* Background Subtle Golden Radial Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse_at_bottom,_rgba(212,160,23,0.08)_0%,_transparent_70%)] pointer-events-none" />

      {/* Top Experience Banner */}
      <div className="border-b border-[#D4A017]/15 bg-[#0B0B0B]/80 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-14 h-14 rounded-full overflow-hidden border border-[#D4A017]/40 p-1 bg-[#050505] shrink-0 shadow-gold-glow">
              <Image
                src="/images/logo.png"
                alt="KICK BUNK Original Logo"
                width={56}
                height={56}
                className="object-contain"
              />
            </div>
            <div>
              <div className="font-cormorant text-2xl font-bold text-[#FAF8F5] tracking-wide">
                Experience Luxury Garden Dining at Kick Bunk
              </div>
              <p className="text-xs text-[#B8B1A5] font-light mt-0.5">
                Authentic charcoal tandoor, royal dum biryanis, craft bar drinks & open-air garden cabanas in Bengaluru.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/booking"
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#D4A017] via-[#F5D77A] to-[#D4A017] text-[#050505] text-xs font-bold tracking-[0.15em] uppercase shadow-gold-glow hover:shadow-gold-glow-lg transition-all"
            >
              RESERVE YOUR TABLE
            </Link>
            <a
              href="tel:+919980626699"
              className="px-5 py-2.5 rounded-full border border-[#D4A017]/40 text-[#FAF8F5] hover:border-[#F5D77A] hover:text-[#F5D77A] text-xs font-semibold tracking-wider transition-colors flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-[#D4A017]" />
              <span>+91 99806 26699</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Information */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1 & 2: Brand Identity with Golden Logo */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3.5">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border border-[#D4A017]/50 p-1 bg-[#08090C] shadow-gold-glow">
                <Image
                  src="/images/logo.png"
                  alt="KICK BUNK Brand Logo"
                  width={56}
                  height={56}
                  className="object-contain"
                />
              </div>
              <div>
                <span className="font-cinzel text-2xl font-bold tracking-[0.2em] text-[#FAF8F5]">
                  KICK BUNK
                </span>
                <p className="font-cormorant text-xs tracking-[0.25em] text-[#D4A017] uppercase">
                  Restaurant & Bar • Garden Resto-Bar
                </p>
              </div>
            </div>

            <p className="text-sm text-[#B8B1A5] font-light leading-relaxed max-w-sm">
              An extraordinary culinary haven nestled in Bengaluru where timeless open-air garden ambience meets masterfully crafted food, signature resto-bar libations, and unforgettable hospitality.
            </p>

            <div className="pt-2 flex flex-wrap gap-2.5">
              <a
                href="https://www.instagram.com/kick_bunk_gardenrestobar/"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-[#0F1115] border border-[#1F242D] hover:border-pink-500/50 hover:text-pink-400 text-xs font-medium flex items-center gap-1.5 transition-colors"
              >
                <Instagram className="w-3.5 h-3.5 text-pink-500" />
                <span>Instagram</span>
                <ExternalLink className="w-3 h-3 text-gray-500" />
              </a>

              <a
                href="https://www.google.com/maps/search/?api=1&query=Kick+Bunk+Restaurant+and+Bar+Hulimangala+Bengaluru"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-[#0F1115] border border-[#1F242D] hover:border-[#D4A017]/50 hover:text-[#F5D77A] text-xs font-medium flex items-center gap-1.5 transition-colors"
              >
                <Navigation className="w-3.5 h-3.5 text-[#D4A017]" />
                <span>Google Maps</span>
                <ExternalLink className="w-3 h-3 text-gray-500" />
              </a>

              <a
                href="https://magicpin.in/Bangalore/Yarandahalli/Restaurant/Kick-Bunk-Restaurant/store/621360/photos?id=6&img=Store-Images"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-[#0F1115] border border-[#1F242D] hover:border-amber-500/50 hover:text-amber-400 text-xs font-medium flex items-center gap-1.5 transition-colors"
              >
                <span className="text-amber-400 font-bold text-xs">M</span>
                <span>Magicpin (66 Photos)</span>
                <ExternalLink className="w-3 h-3 text-gray-500" />
              </a>
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div className="space-y-4">
            <h4 className="font-cinzel text-xs font-semibold tracking-[0.25em] text-[#F5D77A] uppercase">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs tracking-wider">
              <li>
                <Link href="/" className="hover:text-[#F5D77A] transition-colors">
                  Home Experience
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#F5D77A] transition-colors">
                  Our Story & Heritage
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-[#F5D77A] transition-colors">
                  Food Delicacies
                </Link>
              </li>
              <li>
                <Link href="/bar" className="hover:text-[#F5D77A] transition-colors">
                  Bar & Libations
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-[#F5D77A] transition-colors">
                  Ambience & Gallery
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-[#F5D77A] transition-colors">
                  Private Events
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#F5D77A] transition-colors">
                  Concierge & Location
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Experiences */}
          <div className="space-y-4">
            <h4 className="font-cinzel text-xs font-semibold tracking-[0.25em] text-[#F5D77A] uppercase">
              Experiences
            </h4>
            <ul className="space-y-2.5 text-xs tracking-wider">
              <li>
                <Link href="/booking" className="hover:text-[#F5D77A] transition-colors">
                  Fairy-Lit Garden Cabanas
                </Link>
              </li>
              <li>
                <Link href="/booking" className="hover:text-[#F5D77A] transition-colors">
                  Outdoor Terrace Deck
                </Link>
              </li>
              <li>
                <Link href="/bar" className="hover:text-[#F5D77A] transition-colors">
                  Resto-Bar & Sports Nights
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-[#F5D77A] transition-colors">
                  Birthday & Family Gatherings
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-[#F5D77A] transition-colors">
                  Charcoal Tandoori Specialties
                </Link>
              </li>
              <li>
                <Link href="/booking" className="hover:text-[#F5D77A] transition-colors">
                  Corporate Dinner Packages
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Location & Timings */}
          <div className="space-y-4">
            <h4 className="font-cinzel text-xs font-semibold tracking-[0.25em] text-[#F5D77A] uppercase">
              Bengaluru Flagship
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4A017] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Hulimangala Main Road, Vinayaka Layout, Vabasandra, Bengaluru, Karnataka 560105
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D4A017] shrink-0" />
                <a href="tel:+919980626699" className="hover:text-[#F5D77A] transition-colors font-mono">
                  +91 99806 26699
                </a>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#D4A017] shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-[#FAF8F5]">Monday – Sunday</p>
                  <p className="text-gray-400">11:30 AM – 11:30 PM</p>
                  <p className="text-[10px] text-[#D4A017] mt-0.5">Dinner & Garden Service from 6:30 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright and Portal Links */}
        <div className="mt-14 pt-8 border-t border-[#1F242D] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            © {new Date().getFullYear()} KICK BUNK RESTAURANT & BAR. All Rights Reserved.
          </div>

          <div className="flex items-center space-x-6">
            <Link href="/admin" className="hover:text-[#D4A017] transition-colors flex items-center gap-1">
              <Lock className="w-3 h-3" />
              <span>Owner Admin Suite</span>
            </Link>
            <Link href="/pos" className="hover:text-[#D4A017] transition-colors">
              Billing POS
            </Link>
            <Link href="/kitchen" className="hover:text-amber-400 transition-colors">
              Kitchen KDS
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
