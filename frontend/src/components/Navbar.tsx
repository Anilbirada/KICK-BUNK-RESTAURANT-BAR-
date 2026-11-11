'use client';

import React, { useState } from 'react';
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
  Video
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { items } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalCartCount = items.reduce((sum, i) => sum + i.quantity, 0);

  // Hide public navbar on full-screen operational apps (POS and KDS)
  if (pathname.startsWith('/pos') || pathname.startsWith('/kitchen')) {
    return null;
  }

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Menu', href: '/menu', icon: UtensilsCrossed },
    { name: 'Gallery & Videos', href: '/gallery', icon: ImageIcon },
    { name: 'Outlets', href: '/outlets', icon: MapPin },
    { name: 'Book Table', href: '/booking', icon: Calendar },
    { name: 'Contact & Location', href: '/contact', icon: Phone },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0A0C0E]/95 backdrop-blur-md border-b border-brand-cardBorder">
      {/* Top Banner for Verified Venue Contact & Internal Portals */}
      <div className="bg-[#12151B] border-b border-brand-cardBorder/60 text-xs py-1.5 px-4 text-brand-muted flex justify-between items-center">
        <div className="flex items-center space-x-3 text-gray-300">
          <span className="inline-block w-2 h-2 rounded-full bg-brand-green animate-pulse"></span>
          <span className="font-medium text-brand-ivory">Kick Bunk Bengaluru Flagship:</span>
          <span className="hidden sm:inline text-gray-400">Hulimangala Main Road, Vinayaka Layout</span>
          <span className="text-brand-gold font-semibold flex items-center gap-1">
            <Phone className="w-3 h-3 text-brand-gold" />
            <a href="tel:+919980626699" className="hover:underline">+91 99806 26699</a>
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/pos" className="hover:text-brand-gold hidden md:flex items-center gap-1 font-medium text-gray-300">
            <Monitor className="w-3.5 h-3.5 text-brand-gold" />
            <span>Counter POS</span>
          </Link>
          <Link href="/kitchen" className="hover:text-amber-400 hidden md:flex items-center gap-1 font-medium text-gray-300">
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            <span>Kitchen KDS</span>
          </Link>
          <Link href="/admin" className="hover:text-brand-green flex items-center gap-1 font-semibold text-brand-gold hover:underline">
            <ShieldAlert className="w-3.5 h-3.5 text-brand-green" />
            <span>Admin Portal</span>
          </Link>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-gold via-brand-amber to-yellow-600 flex items-center justify-center font-serif font-black text-brand-dark text-2xl shadow-lg shadow-brand-gold/20 group-hover:scale-105 transition-transform border border-brand-gold/40">
              KB
            </div>
            <div>
              <div className="font-serif tracking-widest text-xl font-bold text-brand-ivory group-hover:text-brand-gold transition-colors flex items-center gap-1.5">
                KICK BUNK
              </div>
              <div className="text-[10px] tracking-widest text-brand-gold uppercase font-semibold">
                Restaurant & Bar • Bengaluru
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium tracking-wide transition-colors ${
                    isActive ? 'text-brand-gold font-bold border-b-2 border-brand-gold pb-1' : 'text-gray-300 hover:text-brand-gold'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Cart & Booking Button */}
          <div className="hidden sm:flex items-center space-x-4">
            <Link
              href="/cart"
              className="relative p-2.5 rounded-full bg-brand-card hover:bg-brand-cardBorder text-gray-200 transition-colors border border-brand-cardBorder"
              title="View Cart"
            >
              <ShoppingBag className="w-5 h-5 text-brand-gold" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-green text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow">
                  {totalCartCount}
                </span>
              )}
            </Link>

            <Link
              href="/booking"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-gold to-brand-amber hover:from-brand-goldHover hover:to-brand-gold text-brand-dark font-bold text-xs tracking-wider uppercase transition-all shadow-md shadow-brand-gold/20 flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-brand-dark" />
              <span>Book Table</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-3 lg:hidden">
            <Link
              href="/cart"
              className="relative p-2 rounded-lg bg-brand-card text-brand-gold border border-brand-cardBorder"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-green text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalCartCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-brand-card border border-brand-cardBorder text-gray-200 hover:text-brand-gold transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A0C0E] border-b border-brand-cardBorder px-4 pt-2 pb-6 space-y-3">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive ? 'bg-brand-gold/10 text-brand-gold font-bold' : 'text-gray-300 hover:bg-brand-card hover:text-brand-gold'
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4 text-brand-gold" />}
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-4 border-t border-brand-cardBorder/60 space-y-2">
            <a
              href="tel:+919980626699"
              className="w-full py-2.5 rounded-xl bg-brand-card border border-brand-cardBorder text-brand-gold font-semibold text-xs flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-brand-gold" />
              <span>Call: +91 99806 26699</span>
            </a>
            <Link
              href="/booking"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 rounded-xl bg-brand-gold text-brand-dark font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Reserve Table / Cabana</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
