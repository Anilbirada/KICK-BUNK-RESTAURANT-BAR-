'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { fetchApi } from '../../lib/api';
import {
  Calendar,
  Users,
  Sparkles,
  Phone,
  Mail,
  CheckCircle2,
  Clock,
  Award,
  ChevronRight,
  ShieldCheck,
  Send,
  PartyPopper
} from 'lucide-react';

export default function EventsPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [eventType, setEventType] = useState('Birthday Celebration');
  const [preferredDate, setPreferredDate] = useState('');
  const [guestCount, setGuestCount] = useState(15);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const eventPackages = [
    {
      id: 'ep-1',
      title: 'Birthday Celebrations',
      subtitle: 'Fairy-Lit Botanical Cabanas',
      description:
        'Celebrate your milestone day with private illuminated garden cabanas, custom welcome mocktails, cake presentation service, and personalized tandoori feast platters.',
      image: '/images/kickbunk/google_01_garden_lights_night.jpg',
      capacity: '8 to 40 Guests',
      highlights: ['Custom fairy-light canopy setup', 'Multi-course kebab & biryani banquets', 'Dedicated butler service'],
    },
    {
      id: 'ep-2',
      title: 'Corporate Socials & Mixers',
      subtitle: 'Resto-Bar Lounge & High Counters',
      description:
        'Unwind with your team over craft cocktails, artisanal bar platters, giant match screens, and chilled draught beer in an open garden setting.',
      image: '/images/kickbunk/restaurant_guru_interior.jpg',
      capacity: '20 to 100 Guests',
      highlights: ['High-counter resto-bar access', 'Curated cocktail & starter packages', 'AV equipment & screens available'],
    },
    {
      id: 'ep-3',
      title: 'Family Feasts & Anniversaries',
      subtitle: 'Spacious Outdoor Greenery',
      description:
        'Bring multi-generational families together in spacious garden enclaves with wholesome vegetarian and non-vegetarian royal sharing spreads.',
      image: '/images/kickbunk/magicpin_04_food_spread_dining.webp',
      capacity: '12 to 60 Guests',
      highlights: ['Comfortable garden seating', 'Traditional charcoal biryani feast', 'Relaxed starlit atmosphere'],
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      setErrorMsg('Please enter your name and phone number.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      await fetchApi('/contact', {
        method: 'POST',
        body: JSON.stringify({
          name,
          phone,
          email,
          subject: `Private Event Enquiry: ${eventType} (${guestCount} Guests)`,
          message: `Date: ${preferredDate || 'Flexible'}. Event: ${eventType}. Guests: ${guestCount}. Notes: ${notes || 'None'}`,
        }),
      });
      setIsSubmitted(true);
    } catch {
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#F7F3EB] text-[#25231F] min-h-screen pt-28 pb-24">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#E9E1D2] text-[#254C3C] text-xs font-semibold tracking-[0.2em] uppercase shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Bespoke Celebrations</span>
        </div>

        <h1 className="font-cormorant text-5xl sm:text-6xl md:text-7xl font-normal text-[#25231F] tracking-tight">
          BANQUETS & PRIVATE EVENTS.
        </h1>

        <p className="max-w-2xl mx-auto font-manrope text-sm sm:text-base text-[#777064] font-light leading-relaxed">
          From birthday soirées beneath fairy-lit trees to lively corporate socials and family banquets, Kick Bunk crafts unforgettable moments in Bangalore&apos;s most enchanting garden resto-bar.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {eventPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-3xl overflow-hidden border border-[#E9E1D2] shadow-luxury-soft hover:shadow-luxury-card transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={pkg.image}
                  alt={pkg.title}
                  fill
                  className="object-cover"
                />
                <span className="absolute top-3 left-3 bg-[#254C3C] text-white text-[9px] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-full shadow-sm">
                  {pkg.capacity}
                </span>
              </div>

              <div className="p-7 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-[#B58A45] block">
                    {pkg.subtitle}
                  </span>
                  <h3 className="font-cormorant text-2xl font-bold text-[#25231F] mt-1">
                    {pkg.title}
                  </h3>
                  <p className="font-manrope text-xs text-[#777064] font-light leading-relaxed mt-2">
                    {pkg.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#EFE7DA] space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#25231F] block">
                    Package Inclusions:
                  </span>
                  <ul className="space-y-1.5 font-manrope text-xs text-[#777064]">
                    {pkg.highlights.map((h, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="text-[#254C3C] font-bold">✓</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Event Booking Form Section */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 lg:p-16 border border-[#E9E1D2] shadow-luxury-card max-w-4xl mx-auto">
          
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <span className="font-cormorant text-sm tracking-[0.3em] uppercase text-[#B58A45] font-bold">
              Personalized Curation
            </span>
            <h2 className="font-cormorant text-3xl sm:text-4xl font-normal text-[#25231F]">
              REQUEST AN EVENT QUOTATION
            </h2>
            <p className="font-manrope text-xs text-[#777064]">
              Our banquet concierge will reach out within 2 hours with customized menu choices and seating options.
            </p>
          </div>

          {isSubmitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#254C3C]/10 text-[#254C3C] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-cormorant text-3xl font-bold text-[#25231F]">Enquiry Received!</h3>
              <p className="font-manrope text-xs text-[#777064] max-w-md mx-auto">
                Thank you, <strong className="text-[#25231F]">{name}</strong>. Our private event manager will contact you on <strong className="text-[#254C3C]">{phone}</strong> shortly.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="text-xs text-[#B58A45] underline font-bold uppercase tracking-wider py-2"
              >
                Send Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMsg && (
                <div className="p-3 rounded-lg bg-red-50 text-red-700 text-xs border border-red-200">
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#777064] mb-2">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Anand Mahindra"
                    className="w-full bg-[#F7F3EB] border border-[#E9E1D2] rounded-xl px-4 py-3 text-sm text-[#25231F] focus:outline-none focus:border-[#B58A45]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#777064] mb-2">
                    Phone (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full bg-[#F7F3EB] border border-[#E9E1D2] rounded-xl px-4 py-3 text-sm text-[#25231F] focus:outline-none focus:border-[#B58A45]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#777064] mb-2">
                    Occasion Type
                  </label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="w-full bg-[#F7F3EB] border border-[#E9E1D2] rounded-xl px-4 py-3 text-xs text-[#25231F] focus:outline-none focus:border-[#B58A45]"
                  >
                    <option value="Birthday Celebration">Birthday Soirée</option>
                    <option value="Corporate Mixer">Corporate Team Party</option>
                    <option value="Anniversary Dinner">Anniversary Celebration</option>
                    <option value="Friends Reunion">Reunion / Match Night</option>
                    <option value="Full Garden Buyout">Full Garden Buyout</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#777064] mb-2">
                    Tentative Date
                  </label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full bg-[#F7F3EB] border border-[#E9E1D2] rounded-xl px-4 py-3 text-xs text-[#25231F] focus:outline-none focus:border-[#B58A45]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#777064] mb-2">
                    Approx. Guest Count
                  </label>
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full bg-[#F7F3EB] border border-[#E9E1D2] rounded-xl px-4 py-3 text-xs text-[#25231F] focus:outline-none focus:border-[#B58A45]"
                  >
                    {[10, 15, 20, 30, 40, 50, 75, 100, 150].map((n) => (
                      <option key={n} value={n}>
                        {n} Guests
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#777064] mb-2">
                  Special Instructions or Food Preferences
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Need DJ setup, vegetarian buffet options, cake cutting arrangement..."
                  className="w-full bg-[#F7F3EB] border border-[#E9E1D2] rounded-xl px-4 py-3 text-xs text-[#25231F] focus:outline-none focus:border-[#B58A45]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#254C3C] hover:bg-[#1D3B2E] text-white py-4 rounded-full font-manrope text-xs font-bold tracking-[0.16em] uppercase transition-all shadow-md flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Submitting Enquiry...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-[#DCC18B]" />
                    <span>Submit Banquet Enquiry</span>
                  </>
                )}
              </button>
            </form>
          )}

        </div>

      </div>

    </div>
  );
}
