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
      setScrolled(window.scrollY > 20);
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
            ? 'bg-[#F7F3EB]/95 backdrop-blur-md border-b border-[#E9E1D2] shadow-[0_4px_24px_rgba(37,35,31,0.08)] py-3'
            : 'bg-[#F7F3EB]/90 backdrop-blur-sm border-b border-[#EFE7DA] py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* 1. Customer Logo inside a refined charcoal/black plaque */}
          <Link
            href="/"
            className="flex items-center gap-3.5 group focus:outline-none"
            aria-label="KICK BUNK - Home"
          >
            <div className="logo-plaque w-11 h-11 sm:w-12 sm:h-12 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/images/logo.png"
                alt="KICK BUNK Restaurant & Bar Logo"
                width={48}
                height={48}
                className="object-contain w-full h-full rounded-full"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-cinzel text-lg sm:text-xl font-bold tracking-[0.2em] text-[#25231F] group-hover:text-[#B58A45] transition-colors leading-none">
                KICK BUNK
              </span>
              <span className="font-cormorant text-[11px] sm:text-xs text-[#B58A45] tracking-[0.28em] uppercase font-semibold mt-0.5">
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
                  className={`nav-link-gold font-manrope text-xs tracking-[0.16em] uppercase font-medium transition-colors ${
                    isActive
                      ? 'text-[#B58A45] font-semibold active'
                      : 'text-[#25231F] hover:text-[#B58A45]'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* 3. Action Buttons (Right) */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Direct Call Quick Link */}
            <a
              href="tel:+919980626699"
              className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#777064] hover:text-[#B58A45] transition-colors px-2 py-1"
              title="Call Kick Bunk Concierge"
            >
              <Phone className="w-3.5 h-3.5 text-[#B58A45]" />
              <span className="hidden xl:inline">+91 99806 26699</span>
            </a>

            {/* Shopping Bag / Cart */}
            <Link
              href="/cart"
              className="relative p-2.5 text-[#25231F] hover:text-[#B58A45] transition-colors rounded-full hover:bg-[#EFE7DA]"
              aria-label="View Order Bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#254C3C] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                  {totalCartCount}
                </span>
              )}
            </Link>

            {/* Antique Gold Reservation Button with Elegant Dark Text */}
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 bg-[#B58A45] hover:bg-[#A37937] text-[#25231F] px-5 py-2.5 rounded-full font-manrope text-xs font-bold tracking-[0.12em] uppercase transition-all duration-300 shadow-[0_4px_16px_rgba(181,138,69,0.3)] hover:shadow-[0_6px_22px_rgba(181,138,69,0.45)] hover:-translate-y-0.5"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Reserve Table</span>
            </Link>
          </div>

          {/* 4. Mobile Hamburger Trigger */}
          <div className="flex items-center gap-3 lg:hidden">
            <Link
              href="/cart"
              className="relative p-2 text-[#25231F] hover:text-[#B58A45] transition-colors"
              aria-label="View Order Bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#254C3C] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalCartCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#25231F] hover:text-[#B58A45] focus:outline-none transition-colors"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-[#25231F]" />
              ) : (
                <MenuIcon className="w-6 h-6 text-[#25231F]" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer (Luxury Light Warm Ivory) */}
      <div
        className={`fixed inset-0 z-40 bg-[#25231F]/40 backdrop-blur-sm lg:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      <div
        className={`fixed top-0 right-0 bottom-0 w-[84%] max-w-sm bg-[#F7F3EB] border-l border-[#E9E1D2] z-50 lg:hidden shadow-2xl flex flex-col justify-between p-6 transform transition-transform duration-500 ease-out ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div>
          {/* Header in Drawer */}
          <div className="flex items-center justify-between pb-6 border-b border-[#E9E1D2]">
            <div className="flex items-center gap-3">
              <div className="logo-plaque w-10 h-10">
                <Image
                  src="/images/logo.png"
                  alt="KICK BUNK"
                  width={40}
                  height={40}
                  className="object-contain rounded-full"
                />
              </div>
              <div>
                <span className="font-cinzel text-base font-bold text-[#25231F] tracking-widest block leading-tight">
                  KICK BUNK
                </span>
                <span className="font-cormorant text-[10px] text-[#B58A45] tracking-[0.25em] uppercase font-semibold">
                  Restaurant & Bar
                </span>
              </div>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-1.5 text-[#777064] hover:text-[#25231F]"
              aria-label="Close Navigation Menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Links */}
          <nav className="mt-8 flex flex-col space-y-4">
            {navLinks.map((link) => {
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center justify-between py-2 text-sm tracking-[0.14em] uppercase font-medium transition-colors ${
                    isActive
                      ? 'text-[#B58A45] font-bold border-l-2 border-[#B58A45] pl-3'
                      : 'text-[#25231F] hover:text-[#B58A45]'
                  }`}
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-[#B58A45]/50" />
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer in Drawer */}
        <div className="pt-6 border-t border-[#E9E1D2] flex flex-col gap-3">
          <Link
            href="/booking"
            className="w-full flex items-center justify-center gap-2 bg-[#B58A45] hover:bg-[#A37937] text-[#25231F] py-3 rounded-full font-manrope text-xs font-bold tracking-widest uppercase transition-all shadow-[0_4px_16px_rgba(181,138,69,0.3)]"
          >
            <Calendar className="w-4 h-4" />
            <span>Reserve Table</span>
          </Link>

          <a
            href="tel:+919980626699"
            className="flex items-center justify-center gap-2 text-xs text-[#777064] hover:text-[#25231F] py-2"
          >
            <Phone className="w-3.5 h-3.5 text-[#B58A45]" />
            <span>+91 99806 26699</span>
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
