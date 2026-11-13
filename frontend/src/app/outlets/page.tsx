'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchApi } from '../../lib/api';
import { MapPin, Phone, Clock, Calendar, CheckCircle2, Navigation, Utensils, Sparkles, ChevronRight } from 'lucide-react';

export default function OutletsPage() {
  const [branches, setBranches] = useState<any[]>([]);

  useEffect(() => {
    fetchApi('/branches').then((res) => {
      if (res.success && res.data) setBranches(res.data);
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 text-[#F4EFE5]">
      {/* Luxury Editorial Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full luxury-glass border border-brand-gold/30 text-brand-gold text-[10px] font-cinzel font-semibold tracking-[0.25em] uppercase shadow-gold-glow">
          <MapPin className="w-3.5 h-3.5 text-brand-gold" />
          <span>Multi-Destination Hospitality</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-serif font-bold text-brand-ivory leading-tight">
          Our Dining Destinations
        </h1>
        <p className="text-sm sm:text-base text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
          Step into our lush garden sanctuaries in Bengaluru and Tirupati. Unwind under fairy-lit wooden cabanas, live cricket screenings, and sizzling charcoal tandoor fires.
        </p>
      </div>

      <div className="space-y-12">
        {branches.map((b, idx) => (
          <div
            key={b.id}
            className="luxury-glass rounded-3xl border border-brand-gold/25 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0 hover:border-brand-gold/60 transition-all duration-500 shadow-luxury-card hover:shadow-gold-glow"
          >
            {/* Visual Column with Authentic Photos */}
            <div className="lg:col-span-5 relative h-72 lg:h-auto min-h-[340px] bg-black">
              <img
                src={
                  idx === 0
                    ? '/images/kickbunk/google_01_garden_lights_night.jpg'
                    : '/images/kickbunk/magicpin_06_garden_building_night.webp'
                }
                alt={b.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C0E] via-transparent to-transparent opacity-80" />

              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[10px] font-cinzel font-bold tracking-wider text-brand-gold border border-brand-gold/40">
                {idx === 0 ? 'FLAGSHIP VENUE • BENGALURU' : 'BRANCH • TIRUPATI'}
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between space-y-6">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-cinzel uppercase tracking-[0.2em] text-brand-gold">
                      {b.city} Branch
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-brand-ivory mt-0.5">
                      {b.name}
                    </h2>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs text-brand-green font-semibold bg-brand-green/10 px-3 py-1 rounded-full border border-brand-green/30">
                    <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse"></span>
                    <span>Open Today</span>
                  </span>
                </div>

                <div className="space-y-3 text-xs text-gray-300 font-light">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                    <span>{b.address}, {b.city}, {b.state} - {b.postalCode}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-brand-gold shrink-0" />
                    <a href={`tel:${b.phone}`} className="hover:text-brand-gold font-semibold transition-colors">
                      {b.phone} (Direct Table Desk)
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-brand-gold shrink-0" />
                    <span>Open 7 Days: 11:30 AM – 11:30 PM (Kitchen Orders until 11:00 PM)</span>
                  </div>
                </div>

                {/* Features & Atmosphere */}
                <div className="pt-2">
                  <div className="text-[10px] font-cinzel font-bold uppercase tracking-[0.2em] text-brand-gold mb-3">
                    Venue Highlights & Amenities
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs text-gray-300">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-green" />
                      <span>Open Garden Dining</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-green" />
                      <span>Private Wooden Cabanas</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-green" />
                      <span>Live Clay Tandoor</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-green" />
                      <span>Sports Big Screen</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-green" />
                      <span>Cocktails & Resto-Bar</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-green" />
                      <span>Ample Free Parking</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions Strip */}
              <div className="pt-6 border-t border-brand-gold/15 flex flex-col sm:flex-row gap-3">
                <Link
                  href={`/booking?branchId=${b.id}`}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-brand-gold to-amber-600 hover:from-brand-goldLight hover:to-brand-gold text-brand-dark font-bold text-xs uppercase tracking-[0.18em] transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Reserve a Table or Cabana</span>
                </Link>

                <Link
                  href="/menu"
                  className="px-6 py-3.5 rounded-xl luxury-glass hover:border-brand-gold text-brand-ivory hover:text-brand-gold text-xs uppercase tracking-[0.16em] font-semibold flex items-center justify-center gap-2 transition-all"
                >
                  <Utensils className="w-4 h-4 text-brand-gold" />
                  <span>Explore Menu</span>
                </Link>

                <a
                  href={b.googleMapsUrl || `https://maps.google.com/?q=${encodeURIComponent(b.name)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3.5 rounded-xl bg-[#12151B] hover:bg-[#1A1E26] border border-brand-cardBorder text-gray-300 hover:text-white text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <Navigation className="w-4 h-4 text-brand-gold" />
                  <span>Directions</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
