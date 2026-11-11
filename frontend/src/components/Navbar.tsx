'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '../lib/cartContext';
import {
  ShoppingBag,
  UtensilsCrossed,
  Calendar,
  MapPin,
  Monitor,
  Flame,
  ShieldAlert,
  Menu as MenuIcon,
  X,
  Phone,
  Image as ImageIcon,
  Sparkles,
  ChevronRight
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { items } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalCartCount = items.reduce((sum, i) => sum + i.quantity, 0);

  // Hide public navbar on full-screen operational apps (POS and KDS)
  if (pathname.startsWith('/pos') || pathname.startsWith('/kitchen')) {
    return null;
  }

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Menu', href: '/menu', icon: UtensilsCrossed },
    { name: 'Gallery & Ambience', href: '/gallery', icon: ImageIcon },
    { name: 'Outlets', href: '/outlets', icon: MapPin },
    { name: 'Reserve Cabana', href: '/booking', icon: Calendar },
    { name: 'Concierge', href: '/contact', icon: Phone },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#08090C]/95 backdrop-blur-xl border-b border-brand-gold/20 shadow-2xl shadow-black/80'
          : 'bg-[#08090C]/85 backdrop-blur-md border-b border-brand-cardBorder/60'
      }`}
    >
      {/* Top Luxury Concierge Bar */}
      <div className="bg-[#040507] border-b border-brand-gold/10 text-[11px] py-1.5 px-4 sm:px-8 text-brand-muted flex justify-between items-center tracking-wider">
        <div className="flex items-center space-x-3 text-gray-300">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="hidden sm:inline font-cinzel text-brand-gold uppercase text-[10px] tracking-[0.2em]">
            Bengaluru Flagship:
          </span>
          <span className="hidden md:inline text-gray-400 font-light">
            Hulimangala Main Road, Electronic City Phase 1
          </span>
          <span className="text-gray-500 hidden sm:inline">|</span>
          <a
            href="tel:+919980626699"
            className="text-brand-gold hover:text-brand-goldLight font-semibold flex items-center gap-1 transition-colors"
          >
            <Phone className="w-3 h-3 text-brand-gold" />
            <span>+91 99806 26699</span>
          </a>
        </div>

        <div className="flex items-center space-x-5 text-[11px]">
          <Link
            href="/pos"
            className="hover:text-brand-gold hidden lg:flex items-center gap-1.5 font-medium text-gray-300 transition-colors"
          >
            <Monitor className="w-3 h-3 text-brand-gold" />
            <span>Counter POS</span>
          </Link>
          <Link
            href="/kitchen"
            className="hover:text-amber-400 hidden lg:flex items-center gap-1.5 font-medium text-gray-300 transition-colors"
          >
            <Flame className="w-3 h-3 text-amber-500" />
            <span>Kitchen KDS</span>
          </Link>
          <Link
            href="/admin"
            className="text-brand-gold hover:text-white flex items-center gap-1 font-semibold uppercase tracking-wider text-[10px] px-2 py-0.5 rounded bg-brand-gold/10 border border-brand-gold/25 hover:border-brand-gold/60 transition-all"
          >
            <ShieldAlert className="w-3 h-3 text-brand-gold" />
            <span>Executive Portal</span>
          </Link>
        </div>
      </div>

      {/* Main Luxury Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Monogram */}
          <Link href="/" className="flex items-center space-x-3.5 group">
            <div className="relative">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#1C1F26] via-[#12141A] to-[#0A0C0E] flex items-center justify-center font-cinzel font-bold text-brand-gold text-lg shadow-lg border border-brand-gold/40 group-hover:border-brand-gold transition-all duration-300 group-hover:shadow-gold-glow">
                KB
              </div>
              <Sparkles className="w-3 h-3 text-brand-gold absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div>
              <div className="font-cinzel tracking-[0.22em] text-lg sm:text-xl font-bold text-brand-ivory group-hover:text-brand-gold transition-colors flex items-center gap-2">
                KICK BUNK
              </div>
              <div className="text-[9px] tracking-[0.25em] text-brand-gold/90 uppercase font-semibold">
                Luxury Garden Resto-Bar
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-xs uppercase tracking-[0.18em] font-medium transition-all relative py-1 ${
                    isActive
                      ? 'text-brand-gold font-bold'
                      : 'text-gray-300 hover:text-brand-gold'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-gold to-transparent" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Luxury Actions */}
          <div className="hidden sm:flex items-center space-x-4">
            {/* Bag / Cart */}
            <Link
              href="/cart"
              className="relative p-2.5 rounded-xl bg-[#12151B] hover:bg-[#1A1E26] text-gray-200 transition-all border border-brand-gold/20 hover:border-brand-gold/50 hover:shadow-gold-glow"
              title="View Cart"
            >
              <ShoppingBag className="w-4 h-4 text-brand-gold" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-brand-gold to-amber-600 text-brand-dark text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow-lg">
                  {totalCartCount}
                </span>
              )}
            </Link>

            {/* Reserve Table CTA */}
            <Link
              href="/booking"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#DFBE50] via-[#D4AF37] to-[#B08D26] hover:from-[#F3E5AB] hover:to-[#DFBE50] text-[#08090C] font-bold text-xs uppercase tracking-[0.16em] transition-all shadow-lg shadow-brand-gold/20 hover:shadow-gold-glow flex items-center gap-2 group"
            >
              <Calendar className="w-3.5 h-3.5 text-brand-dark" />
              <span>Reserve Table</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-3 lg:hidden">
            <Link
              href="/cart"
              className="relative p-2 rounded-xl bg-[#12151B] text-brand-gold border border-brand-gold/20"
            >
              <ShoppingBag className="w-4 h-4" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-gold text-brand-dark text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalCartCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-[#12151B] border border-brand-gold/20 text-gray-200 hover:text-brand-gold transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-brand-gold" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Luxury Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#08090C]/98 backdrop-blur-2xl border-b border-brand-gold/30 px-6 pt-4 pb-8 space-y-4 shadow-2xl">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs uppercase tracking-[0.18em] font-medium transition-all ${
                    isActive
                      ? 'bg-brand-gold/15 text-brand-gold font-bold border border-brand-gold/30'
                      : 'text-gray-300 hover:bg-[#12151B] hover:text-brand-gold'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {Icon && <Icon className="w-4 h-4 text-brand-gold" />}
                    <span>{link.name}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
                </Link>
              );
            })}
          </div>

          <div className="pt-4 border-t border-brand-cardBorder space-y-3">
            <a
              href="tel:+919980626699"
              className="w-full py-3 rounded-xl bg-[#12151B] border border-brand-gold/30 text-brand-gold font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-brand-gold" />
              <span>Direct Concierge: +91 99806 26699</span>
            </a>
            <Link
              href="/booking"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-gold via-amber-500 to-yellow-600 text-brand-dark font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-lg shadow-brand-gold/20"
            >
              <Calendar className="w-4 h-4" />
              <span>Reserve Private Cabana</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
