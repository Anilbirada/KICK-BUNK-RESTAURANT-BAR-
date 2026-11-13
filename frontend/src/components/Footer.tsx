'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  MapPin,
  Phone,
  Clock,
  Instagram,
  ArrowUpRight,
  Sparkles,
  Heart
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#254C3C] text-[#DCC18B] relative overflow-hidden border-t-2 border-[#B58A45]">
      {/* Decorative subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#DCC18B_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-14 border-b border-[#DCC18B]/20">
          
          {/* Column 1: Brand & Logo */}
          <div className="space-y-5">
            <Link href="/" className="inline-flex items-center gap-3.5 group">
              <div className="logo-plaque w-14 h-14 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/images/logo.png"
                  alt="KICK BUNK Official Brand Logo"
                  width={56}
                  height={56}
                  className="object-contain w-full h-full rounded-full"
                />
              </div>
              <div>
                <span className="font-cinzel text-xl font-bold tracking-[0.2em] text-[#FFFFFF] group-hover:text-[#DCC18B] transition-colors block">
                  KICK BUNK
                </span>
                <span className="font-cormorant text-xs text-[#DCC18B] tracking-[0.3em] uppercase font-semibold">
                  Restaurant & Bar
                </span>
              </div>
            </Link>

            <p className="font-manrope text-sm text-[#FFFFFF]/80 leading-relaxed font-light">
              Bengaluru&apos;s premier luxury garden resto-bar. An escape into elegance featuring bespoke mixology, signature culinary creations, and illuminated outdoor dining beneath Bangalore&apos;s evening sky.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://www.instagram.com/kick_bunk_gardenrestobar/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-[#DCC18B]/30 flex items-center justify-center text-[#DCC18B] hover:text-[#254C3C] hover:bg-[#DCC18B] transition-all duration-300"
                aria-label="Kick Bunk Instagram Profile"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Kick+Bunk+Restaurant+and+Bar+Hulimangala+Bengaluru"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-[#DCC18B]/30 flex items-center justify-center text-[#DCC18B] hover:text-[#254C3C] hover:bg-[#DCC18B] transition-all duration-300"
                aria-label="Kick Bunk Google Maps Location"
              >
                <MapPin className="w-4 h-4" />
              </a>
              <a
                href="tel:+919980626699"
                className="w-10 h-10 rounded-full border border-[#DCC18B]/30 flex items-center justify-center text-[#DCC18B] hover:text-[#254C3C] hover:bg-[#DCC18B] transition-all duration-300"
                aria-label="Kick Bunk Telephone"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="font-cormorant text-lg font-bold tracking-[0.2em] text-[#FFFFFF] uppercase border-b border-[#DCC18B]/30 pb-2 inline-block">
              Navigation
            </h3>
            <ul className="space-y-2.5 font-manrope text-sm font-light text-[#FFFFFF]/80">
              <li>
                <Link href="/" className="hover:text-[#DCC18B] transition-colors flex items-center gap-1.5">
                  <span className="text-[#DCC18B]">•</span> Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#DCC18B] transition-colors flex items-center gap-1.5">
                  <span className="text-[#DCC18B]">•</span> Our Story & Philosophy
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-[#DCC18B] transition-colors flex items-center gap-1.5">
                  <span className="text-[#DCC18B]">•</span> Food Menu
                </Link>
              </li>
              <li>
                <Link href="/bar" className="hover:text-[#DCC18B] transition-colors flex items-center gap-1.5">
                  <span className="text-[#DCC18B]">•</span> Resto-Bar Experience
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-[#DCC18B] transition-colors flex items-center gap-1.5">
                  <span className="text-[#DCC18B]">•</span> Photography Gallery
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-[#DCC18B] transition-colors flex items-center gap-1.5">
                  <span className="text-[#DCC18B]">•</span> Banquets & Celebrations
                </Link>
              </li>
              <li>
                <Link href="/booking" className="hover:text-[#DCC18B] transition-colors flex items-center gap-1.5">
                  <span className="text-[#DCC18B]">•</span> Reserve a Cabana / Table
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Hours & Operations */}
          <div className="space-y-4">
            <h3 className="font-cormorant text-lg font-bold tracking-[0.2em] text-[#FFFFFF] uppercase border-b border-[#DCC18B]/30 pb-2 inline-block">
              Hours of Elegance
            </h3>
            <div className="space-y-3 font-manrope text-sm text-[#FFFFFF]/85">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#DCC18B] mt-1 shrink-0" />
                <div>
                  <div className="font-medium text-[#FFFFFF]">Monday – Thursday</div>
                  <div className="text-xs text-[#DCC18B]">11:30 AM – 11:30 PM</div>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#DCC18B] mt-1 shrink-0" />
                <div>
                  <div className="font-medium text-[#FFFFFF]">Friday – Sunday (Garden Resto-Bar)</div>
                  <div className="text-xs text-[#DCC18B]">11:30 AM – 1:00 AM</div>
                </div>
              </div>
              <div className="p-3 bg-[#1D3B2E] border border-[#DCC18B]/20 rounded-lg text-xs leading-relaxed text-[#FFFFFF]/80">
                <strong className="text-[#DCC18B] block mb-1 font-semibold">Live Music & Screenings:</strong>
                Friday Acoustic Nights & Weekend Live DJ Sets in the Garden Courtyard.
              </div>
            </div>
          </div>

          {/* Column 4: Location & Concierge */}
          <div className="space-y-4">
            <h3 className="font-cormorant text-lg font-bold tracking-[0.2em] text-[#FFFFFF] uppercase border-b border-[#DCC18B]/30 pb-2 inline-block">
              Visit Kick Bunk
            </h3>
            <div className="space-y-3 font-manrope text-sm text-[#FFFFFF]/85">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#DCC18B] mt-1 shrink-0" />
                <p className="text-xs leading-relaxed">
                  Hulimangala Main Road, Vinayaka Layout, Vabasandra, Bengaluru, Karnataka 560105.
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#DCC18B] shrink-0" />
                <a href="tel:+919980626699" className="text-xs hover:text-[#DCC18B] font-medium transition-colors">
                  +91 99806 26699
                </a>
              </div>

              <div className="pt-2">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Kick+Bunk+Restaurant+and+Bar+Hulimangala+Bengaluru"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#DCC18B] hover:text-white transition-colors group"
                >
                  <span>Open in Google Maps</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Gold Line & Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-manrope text-xs text-[#DCC18B]/80 font-light">
          <div>
            &copy; {new Date().getFullYear()} <strong className="text-white font-medium">KICK BUNK – Restaurant & Bar</strong>. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/admin" className="hover:text-white transition-colors">
              Owner & Staff Portal
            </Link>
            <span className="text-[#DCC18B]/40">•</span>
            <span>Bengaluru Luxury Garden Resto-Bar</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
