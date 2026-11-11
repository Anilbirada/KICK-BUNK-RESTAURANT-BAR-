'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchApi } from '../../lib/api';
import { MapPin, Phone, Clock, Calendar, CheckCircle2, Navigation, Utensils } from 'lucide-react';

export default function OutletsPage() {
  const [branches, setBranches] = useState<any[]>([]);

  useEffect(() => {
    fetchApi('/branches').then((res) => {
      if (res.success && res.data) setBranches(res.data);
    });
  }, []);

  return (
    <div className="min-h-screen bg-brand-dark py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <div className="text-brand-gold text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-1.5">
          <MapPin className="w-4 h-4" />
          <span>Kick Bunk Hospitality Group</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-brand-ivory">
          Our Outlets
        </h1>
        <p className="text-sm text-gray-400">
          Visit our garden dining spaces in Bengaluru and Tirupati. Immerse in open-air cabanas, sports screenings, and live clay-oven charcoal grills.
        </p>
      </div>

      <div className="space-y-12">
        {branches.map((b, idx) => (
          <div
            key={b.id}
            className="bg-brand-card rounded-3xl border border-brand-cardBorder overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0 hover:border-brand-gold/40 transition-all shadow-xl"
          >
            {/* Visual Column */}
            <div className="lg:col-span-5 relative h-72 lg:h-auto min-h-[300px] bg-brand-dark">
              <img
                src={
                  idx === 0
                    ? 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80'
                    : 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80'
                }
                alt={b.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-brand-dark/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-brand-gold border border-brand-gold/30">
                {b.code}
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-7 p-8 lg:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-serif font-bold text-brand-ivory">
                    {b.name}
                  </h2>
                  <span className="inline-flex items-center gap-1.5 text-xs text-brand-green font-semibold bg-brand-green/10 px-2.5 py-1 rounded-full border border-brand-green/30">
                    <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse"></span> Open Today
                  </span>
                </div>

                <div className="space-y-3 text-xs text-gray-300">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                    <span>{b.address}, {b.city}, {b.state} - {b.postalCode}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-brand-gold shrink-0" />
                    <span>{b.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-brand-gold shrink-0" />
                    <span>Open 7 Days: 11:30 AM to 11:30 PM (Kitchen closes at 11:00 PM)</span>
                  </div>
                </div>

                {/* Amenities */}
                <div className="pt-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2">Features & Ambience</div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-gray-300">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-green" />
                      <span>Open-Air Garden Dining</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-green" />
                      <span>Private Cabanas & Gazebos</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-green" />
                      <span>Live Clay Tandoor</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-green" />
                      <span>Sports Screening</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-green" />
                      <span>Lounge & Full Bar</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-green" />
                      <span>Valet Parking</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-6 border-t border-brand-cardBorder/60 flex flex-col sm:flex-row gap-3">
                <Link
                  href={`/booking?branchId=${b.id}`}
                  className="px-6 py-3 rounded-xl bg-brand-gold hover:bg-brand-goldHover text-brand-dark font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Reserve a Table or Cabana</span>
                </Link>

                <Link
                  href={`/menu`}
                  className="px-5 py-3 rounded-xl bg-brand-card hover:bg-brand-cardBorder border border-brand-cardBorder text-gray-200 text-xs font-semibold flex items-center justify-center gap-2"
                >
                  <Utensils className="w-4 h-4 text-brand-gold" />
                  <span>View Branch Menu</span>
                </Link>

                <a
                  href={b.googleMapsUrl || `https://maps.google.com/?q=${encodeURIComponent(b.name)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3 rounded-xl bg-brand-dark hover:bg-gray-800 border border-brand-cardBorder text-gray-300 text-xs font-semibold flex items-center justify-center gap-2"
                >
                  <Navigation className="w-4 h-4 text-brand-amber" />
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
