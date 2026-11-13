'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useCart } from '../lib/cartContext';
import {
  ShoppingBag,
  Menu as MenuIcon,
  X,
  Phone,
  Calendar,
  Sparkles,
  ChevronRight,
  MapPin,
  Clock,
  Instagram,
  Wine
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { items } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const totalCartCount = items.reduce((sum, i) => sum + i.quantity, 0);

  // Hide public navbar on full-screen operational tools (POS & KDS)
  if (pathname.startsWith('/pos') || pathname.startsWith('/kitchen')) {
    return null;
  }

  const navLinks = [
    { name: 'HOME', href: '/' },
    { name: 'OUR STORY', href: '/about' },
    { name: 'FOOD MENU', href: '/menu' },
    { name: 'BAR EXPERIENCE', href: '/bar' },
    { name: 'GALLERY', href: '/gallery' },
    { name: 'EVENTS', href: '/events' },
    { name: 'CONTACT', href: '/contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          scrolled
            ? 'bg-[#050505]/95 backdrop-blur-xl border-b border-[#D4A017]/25 shadow-2xl shadow-black/90 py-2.5'
            : 'bg-gradient-to-b from-[#050505]/90 via-[#050505]/50 to-transparent backdrop-blur-[2px] py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* 1. Customer Logo on the Left */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="KICK BUNK - Home"
          >
            <div className="relative w-11 h-11 sm:w-13 sm:h-13 rounded-full overflow-hidden border border-[#D4A017]/40 p-0.5 bg-[#08090C] group-hover:border-[#F5D77A] group-hover:shadow-gold-glow transition-all duration-300">
              <Image
                src="/images/logo.png"
                alt="KICK BUNK Restaurant & Bar Logo"
                width={52}
                height={52}
                className="object-contain w-full h-full transform group-hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-cinzel text-lg sm:text-xl font-bold tracking-[0.2em] text-[#FAF8F5] group-hover:text-[#F5D77A] transition-colors leading-none">
                KICK BUNK
              </span>
              <span className="font-cormorant text-[11px] sm:text-xs text-[#D4A017] tracking-[0.25em] uppercase font-medium">
                Restaurant & Bar
              </span>
            </div>
          </Link>

          {/* 2. Navigation in the Middle (Desktop) */}
          <nav className="hidden lg:flex items-center space-x-7 xl:space-x-8">
            {navLinks.map((link) => {
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative py-1 text-xs xl:text-[13px] font-medium tracking-[0.16em] transition-colors duration-300 ${
                    isActive
                      ? 'text-[#F5D77A]'
                      : 'text-[#B8B1A5] hover:text-[#FAF8F5]'
                  }`}
                >
                  <span>{link.name}</span>
                  {/* Subtle Gold Underline Animation */}
                  <span
                    className={`absolute bottom-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-[#D4A017] to-transparent transition-transform duration-300 origin-center ${
                      isActive ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0 group-hover:scale-x-100'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* 3. Actions on the Right */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Direct Concierge Call */}
            <a
              href="tel:+919980626699"
              className="hidden sm:flex items-center gap-1.5 text-xs text-[#B8B1A5] hover:text-[#F5D77A] transition-colors py-1.5 px-2.5 rounded-full border border-transparent hover:border-[#D4A017]/25"
              title="Call Kick Bunk Flagship"
            >
              <Phone className="w-3.5 h-3.5 text-[#D4A017]" />
              <span className="hidden xl:inline font-mono text-[11px]">+91 99806 26699</span>
            </a>

            {/* Cart Button (if items present) */}
            {totalCartCount > 0 && (
              <Link
                href="/cart"
                className="relative p-2 rounded-full bg-[#0F1115] border border-[#D4A017]/40 text-[#F5D77A] hover:bg-[#151922] transition-colors"
                title="View Dining Order"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 bg-[#D4A017] text-[#050505] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalCartCount}
                </span>
              </Link>
            )}

            {/* Gold Reservation Button CTA */}
            <Link
              href="/booking"
              className="relative group overflow-hidden px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-[#D4A017] via-[#F5D77A] to-[#D4A017] text-[#050505] text-xs font-bold tracking-[0.15em] uppercase shadow-gold-glow hover:shadow-gold-glow-lg transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
            >
              <Calendar className="w-3.5 h-3.5 text-[#050505]" />
              <span className="relative z-10 whitespace-nowrap">RESERVE YOUR TABLE</span>
              <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#F5D77A] hover:bg-white/5 focus:outline-none transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-[#F5D77A]" />
              ) : (
                <MenuIcon className="w-6 h-6 text-[#F5D77A]" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* 4. Full-Screen Mobile Navigation Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[#050505]/98 backdrop-blur-2xl transition-all duration-500 lg:hidden flex flex-col justify-between p-6 pt-24 ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
      >
        <div className="flex flex-col space-y-6 max-w-sm mx-auto w-full">
          <div className="flex items-center justify-center gap-3 pb-4 border-b border-[#D4A017]/15">
            <div className="w-12 h-12 rounded-full overflow-hidden border border-[#D4A017]/40 p-0.5">
              <Image
                src="/images/logo.png"
                alt="KICK BUNK"
                width={48}
                height={48}
                className="object-contain"
              />
            </div>
            <div>
              <div className="font-cinzel text-lg font-bold tracking-[0.2em] text-[#FAF8F5]">
                KICK BUNK
              </div>
              <div className="font-cormorant text-xs text-[#D4A017] tracking-[0.2em] uppercase">
                Restaurant & Bar • Bengaluru
              </div>
            </div>
          </div>

          <nav className="flex flex-col space-y-3 text-center">
            {navLinks.map((link, idx) => {
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-2 font-cormorant text-2xl tracking-[0.1em] transition-all duration-200 ${
                    isActive
                      ? 'text-[#F5D77A] font-semibold'
                      : 'text-[#B8B1A5] hover:text-[#FAF8F5]'
                  }`}
                  style={{ transitionDelay: `${idx * 40}ms` }}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-[#D4A017]/15 flex flex-col gap-3">
            <Link
              href="/booking"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#D4A017] via-[#F5D77A] to-[#D4A017] text-[#050505] text-xs font-bold tracking-[0.2em] uppercase text-center shadow-gold-glow flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4 text-[#050505]" />
              <span>RESERVE YOUR TABLE</span>
            </Link>

            <a
              href="tel:+919980626699"
              className="w-full py-3 rounded-full border border-[#D4A017]/30 text-[#FAF8F5] text-xs font-medium tracking-wider text-center flex items-center justify-center gap-2 hover:border-[#D4A017]"
            >
              <Phone className="w-4 h-4 text-[#D4A017]" />
              <span>Concierge: +91 99806 26699</span>
            </a>
          </div>
        </div>

        {/* Mobile Footer Info */}
        <div className="text-center text-xs text-[#B8B1A5] pb-4 space-y-1">
          <p>Hulimangala Main Road, Bengaluru</p>
          <div className="flex items-center justify-center gap-4 pt-1 text-[#D4A017]">
            <a
              href="https://www.instagram.com/kick_bunk_gardenrestobar/"
              target="_blank"
              rel="noreferrer"
              className="hover:underline flex items-center gap-1"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>@kick_bunk_gardenrestobar</span>
            </a>
            <span>•</span>
            <Link href="/admin" className="text-gray-400 hover:text-[#D4A017]">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
