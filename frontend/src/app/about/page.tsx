'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  MapPin,
  Clock,
  Phone,
  Award,
  Sparkles,
  Calendar,
  Utensils,
  Wine,
  ShieldCheck,
  ChevronRight,
  ArrowRight
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-[#F7F3EB] text-[#25231F] min-h-screen pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Hero Section */}
        <section className="relative rounded-3xl overflow-hidden border border-[#E9E1D2] bg-white p-8 sm:p-16 shadow-luxury-card">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <div className="logo-plaque w-12 h-12">
                  <Image
                    src="/images/logo.png"
                    alt="KICK BUNK"
                    width={48}
                    height={48}
                    className="object-contain rounded-full"
                  />
                </div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFE7DA] text-[#B58A45] text-xs font-semibold tracking-wider uppercase">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>THE KICK BUNK STORY</span>
                </div>
              </div>

              <h1 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-normal text-[#25231F] leading-tight">
                Where Lush Garden Dining Meets <span className="text-[#B58A45]">Culinary Artistry.</span>
              </h1>

              <p className="font-manrope text-sm sm:text-base text-[#777064] font-light leading-relaxed">
                Born from a passion to create an oasis away from the concrete pace of Bengaluru, Kick Bunk brings together expansive garden landscapes, starlit dining pavilions, authentic charcoal tandoor craftsmanship, and an energetic resto-bar experience.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href="/booking"
                  className="inline-flex items-center gap-2 bg-[#B58A45] hover:bg-[#A37937] text-[#25231F] px-7 py-3 rounded-full text-xs font-bold tracking-[0.14em] uppercase transition-all shadow-md"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Reserve Your Table</span>
                </Link>
                <Link
                  href="/menu"
                  className="inline-flex items-center gap-2 bg-[#F7F3EB] hover:bg-[#EFE7DA] text-[#25231F] px-7 py-3 rounded-full text-xs font-bold tracking-[0.14em] uppercase transition-all"
                >
                  <Utensils className="w-4 h-4 text-[#B58A45]" />
                  <span>View Our Menu</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-luxury-elevated">
              <Image
                src="/images/kickbunk/google_03_garden_courtyard.jpg"
                alt="Kick Bunk Garden Dining"
                fill
                className="object-cover"
              />
            </div>

          </div>
        </section>

        {/* The 3 Pillars of Kick Bunk */}
        <section className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="font-cormorant text-sm tracking-[0.3em] uppercase text-[#254C3C] font-bold">
              Our Foundations
            </span>
            <h2 className="font-cormorant text-3xl sm:text-4xl font-normal text-[#25231F]">
              THE PILLARS OF KICK BUNK
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-[#E9E1D2] shadow-luxury-soft space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#F7F3EB] text-[#254C3C] flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-cormorant text-2xl font-bold text-[#25231F]">Lush Garden Ambiance</h3>
              <p className="font-manrope text-xs text-[#777064] font-light leading-relaxed">
                Over 200 open-air seats nestled amidst leafy green canopies, stone verandahs, illuminated walkways, and open skies that give every meal an unhurried resort-like atmosphere.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-[#E9E1D2] shadow-luxury-soft space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#F7F3EB] text-[#B58A45] flex items-center justify-center">
                <Utensils className="w-6 h-6" />
              </div>
              <h3 className="font-cormorant text-2xl font-bold text-[#25231F]">Clay-Tandoor Craft</h3>
              <p className="font-manrope text-xs text-[#777064] font-light leading-relaxed">
                From our celebrated Kalmi Kebab to succulent mutton biryani and crispy ghee-roasted starters, our master chefs prioritize authentic clay tandoor smoking and fresh spices.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-[#E9E1D2] shadow-luxury-soft space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#F7F3EB] text-[#482A32] flex items-center justify-center">
                <Wine className="w-6 h-6" />
              </div>
              <h3 className="font-cormorant text-2xl font-bold text-[#25231F]">The Resto-Bar Pulse</h3>
              <p className="font-manrope text-xs text-[#777064] font-light leading-relaxed">
                A thoughtfully assembled beverage program featuring chilled draught pitchers, classic cocktails, single malt reserves, and upbeat acoustic sounds for spirited evenings.
              </p>
            </div>
          </div>
        </section>

        {/* Location & Contact Banner */}
        <section className="bg-[#254C3C] text-white rounded-3xl p-8 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center shadow-luxury-elevated">
          <div className="space-y-4">
            <span className="font-cormorant text-sm tracking-[0.3em] uppercase text-[#DCC18B] font-bold">
              Visit Us Today
            </span>
            <h2 className="font-cormorant text-3xl sm:text-4xl font-normal text-white">
              Experience the Garden in Person.
            </h2>
            <p className="font-manrope text-xs sm:text-sm text-[#F7F3EB]/85 font-light leading-relaxed max-w-md">
              Located on Hulimangala Main Road, Vinayaka Layout, Bengaluru. Open daily from 11:30 AM to 11:30 PM (Weekends till 1:00 AM).
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-end gap-4">
            <a
              href="tel:+919980626699"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-transparent border border-[#DCC18B] text-white hover:bg-white/10 px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider"
            >
              <Phone className="w-4 h-4 text-[#DCC18B]" />
              <span>Call +91 99806 26699</span>
            </a>

            <Link
              href="/booking"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#B58A45] hover:bg-[#A37937] text-[#25231F] px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-md"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Table</span>
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
