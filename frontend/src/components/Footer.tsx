'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Instagram,
  ShieldCheck,
  ExternalLink,
  Navigation,
  Sparkles,
  Camera,
  Video
} from 'lucide-react';

export const Footer: React.FC = () => {
  const pathname = usePathname();

  if (pathname.startsWith('/pos') || pathname.startsWith('/kitchen')) {
    return null;
  }

  return (
    <footer className="bg-[#08090B] border-t border-brand-cardBorder text-gray-400 text-sm">
      {/* Social & Media Presence Bar */}
      <div className="border-b border-brand-cardBorder/60 bg-[#0E1116] py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center md:text-left">
            <span className="w-10 h-10 rounded-xl bg-brand-gold/10 text-brand-gold border border-brand-gold/30 flex items-center justify-center shrink-0">
              <Camera className="w-5 h-5" />
            </span>
            <div>
              <div className="text-sm font-serif font-bold text-brand-ivory flex items-center gap-2 justify-center md:justify-start">
                <span>Connect With Kick Bunk On Social Platforms</span>
                <span className="text-[10px] bg-brand-gold text-brand-dark px-1.5 py-0.2 rounded font-sans font-bold">Verified</span>
              </div>
              <div className="text-xs text-gray-400">
                Official Instagram: <span className="text-brand-gold font-medium">@kick_bunk_gardenrestobar</span> • Verified Google & Magicpin Gallery
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <a
              href="https://www.instagram.com/kick_bunk_gardenrestobar/"
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-1.5 rounded-lg bg-brand-card border border-brand-cardBorder hover:border-pink-500/60 hover:text-pink-400 text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <Instagram className="w-3.5 h-3.5 text-pink-500" />
              <span>Instagram</span>
              <ExternalLink className="w-3 h-3 text-gray-500" />
            </a>

            <a
              href="https://magicpin.in/Bangalore/Yarandahalli/Restaurant/Kick-Bunk-Restaurant/store/621360/photos?id=6&img=Store-Images"
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-1.5 rounded-lg bg-brand-card border border-brand-cardBorder hover:border-amber-500/60 hover:text-amber-400 text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <span className="font-bold text-amber-500 text-xs">M</span>
              <span>Magicpin</span>
              <ExternalLink className="w-3 h-3 text-gray-500" />
            </a>

            <a
              href="https://www.zomato.com/bangalore/kick-bunk-restaurant-electronic-city-bangalore"
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-1.5 rounded-lg bg-brand-card border border-brand-cardBorder hover:border-red-500/60 hover:text-red-400 text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <span className="font-bold text-red-500 text-xs">Z</span>
              <span>Zomato</span>
              <ExternalLink className="w-3 h-3 text-gray-500" />
            </a>

            <a
              href="https://restaurant-guru.in/Kick-Bunk-Restaurant-and-Bar-Bengaluru"
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-1.5 rounded-lg bg-brand-card border border-brand-cardBorder hover:border-brand-gold/60 hover:text-brand-gold text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <span className="font-bold text-brand-gold text-xs">RG</span>
              <span>Restaurant Guru</span>
              <ExternalLink className="w-3 h-3 text-gray-500" />
            </a>

            <a
              href="https://www.google.com/maps/search/?api=1&query=Kick+Bunk+Restaurant+and+Bar+Hulimangala+Bengaluru"
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-1.5 rounded-lg bg-brand-gold hover:bg-brand-goldHover text-brand-dark text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Google Maps</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Identity & Verified Overview */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-gold via-brand-amber to-yellow-600 flex items-center justify-center font-serif font-black text-brand-dark text-xl border border-brand-gold/40 shadow-lg shadow-brand-gold/20">
                KB
              </div>
              <span className="font-serif tracking-widest text-lg font-bold text-brand-ivory">
                KICK BUNK
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed font-light">
              Premier Garden Restaurant & Bar in Bengaluru. Renowned for authentic charcoal clay tandoori grills, royal dum handi biryanis, chilled cocktails & mocktails, private garden cabanas and weekend live sports screenings.
            </p>
            <div className="pt-2 text-xs text-gray-400 space-y-1">
              <div className="flex items-center gap-1.5 text-brand-gold font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Verified Outlets: Bengaluru & Tirupati</span>
              </div>
              <div className="text-[11px] text-gray-500">Google Rating: 4.8 ★ (1,800+ Verified Customer Reviews)</div>
            </div>
          </div>

          {/* Bengaluru Flagship (Verified Details) */}
          <div className="space-y-3 bg-[#0D0F14] p-5 rounded-2xl border border-brand-cardBorder">
            <div className="flex items-center justify-between">
              <h4 className="font-serif text-brand-gold text-base font-semibold">Bengaluru Flagship</h4>
              <span className="text-[9px] bg-brand-green/20 text-brand-green px-1.5 py-0.5 rounded font-bold uppercase">Main Venue</span>
            </div>
            <p className="text-xs text-gray-300 flex items-start gap-2">
              <MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
              <span>Hulimangala Main Road, Vinayaka Layout, Vabasandra, Electronic City Phase 1, Bengaluru 560105</span>
            </p>
            <p className="text-xs text-gray-300 flex items-center gap-2">
              <Phone className="w-4 h-4 text-brand-gold shrink-0" />
              <a href="tel:+919980626699" className="hover:text-brand-gold font-semibold">+91 99806 26699</a>
            </p>
            <p className="text-xs text-gray-400 flex items-center gap-2">
              <Clock className="w-4 h-4 text-brand-gold shrink-0" />
              <span>11:30 AM – 11:30 PM (All 7 Days)</span>
            </p>
            <div className="pt-1">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Kick+Bunk+Restaurant+and+Bar+Hulimangala+Bengaluru"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-brand-gold hover:underline flex items-center gap-1 font-medium"
              >
                <span>View on Google Maps</span>
                <Navigation className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Tirupati Outlet */}
          <div className="space-y-3 bg-[#0D0F14] p-5 rounded-2xl border border-brand-cardBorder">
            <div className="flex items-center justify-between">
              <h4 className="font-serif text-brand-gold text-base font-semibold">Tirupati Garden Bar</h4>
              <span className="text-[9px] bg-brand-cardBorder text-gray-300 px-1.5 py-0.5 rounded font-bold uppercase">Branch</span>
            </div>
            <p className="text-xs text-gray-300 flex items-start gap-2">
              <MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
              <span>Korramenugunta Road, Tata Nagar, Tirupati 517501</span>
            </p>
            <p className="text-xs text-gray-300 flex items-center gap-2">
              <Phone className="w-4 h-4 text-brand-gold shrink-0" />
              <a href="tel:+917760594868" className="hover:text-brand-gold font-medium">+91 77605 94868</a>
            </p>
            <p className="text-xs text-gray-400 flex items-center gap-2">
              <Clock className="w-4 h-4 text-brand-gold shrink-0" />
              <span>11:30 AM – 11:00 PM (All 7 Days)</span>
            </p>
          </div>

          {/* Navigation & Digital Portals */}
          <div className="space-y-3">
            <h4 className="font-serif text-brand-gold text-base font-semibold">Explore & Reserve</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/menu" className="hover:text-brand-gold transition-colors flex items-center gap-1.5">
                  <span>Digital Food & Bar Menu</span>
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-brand-gold transition-colors flex items-center gap-1.5">
                  <span>Photo Gallery & Videos</span>
                </Link>
              </li>
              <li>
                <Link href="/booking" className="hover:text-brand-gold transition-colors flex items-center gap-1.5">
                  <span>Reserve Garden Cabana / Table</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-gold transition-colors flex items-center gap-1.5">
                  <span>Directions & Contact</span>
                </Link>
              </li>
              <li className="pt-2 border-t border-brand-cardBorder/60">
                <Link href="/admin" className="text-brand-gold font-semibold hover:underline flex items-center gap-1.5">
                  <span>Executive Admin Portal</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits & Integrity */}
        <div className="mt-12 pt-8 border-t border-brand-cardBorder/60 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 gap-4">
          <div>
            &copy; 2026 Kick Bunk Restaurant & Bar. All rights reserved.
          </div>
          <div className="flex items-center gap-1.5 text-gray-400">
            <ShieldCheck className="w-4 h-4 text-brand-green" />
            <span>Digital Hospitality Architecture by <strong>RSR TECHNOLOGIES</strong> (Contact: +91 77605 94868 / +91 99453 21367)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
