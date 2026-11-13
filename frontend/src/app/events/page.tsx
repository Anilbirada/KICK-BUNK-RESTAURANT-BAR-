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
  Heart,
  Award,
  ChevronRight,
  ShieldCheck,
  Send
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
      subtitle: 'Magical Cabanas Under Fairy Lights',
      description:
        'Celebrate your special day with private garden cabanas, illuminated canopies, custom welcome mocktails, cake presentation service, and personalized tandoori feast platters.',
      image: '/images/kickbunk/google_01_garden_lights_night.jpg',
      capacity: '6 to 40 Guests',
      highlights: ['Custom fairy-light canopy setup', 'Multi-course kebab & biryani banquets', 'Dedicated event staff'],
    },
    {
      id: 'ep-2',
      title: 'Family Gatherings & Reunions',
      subtitle: 'Spacious Outdoor Greenery & Comfort',
      description:
        'Bring multi-generational families together in spacious garden enclaves or air-conditioned dining salons with wholesome vegetarian and non-vegetarian sharing platters.',
      image: '/images/kickbunk/magicpin_04_food_spread_dining.webp',
      capacity: '10 to 60 Guests',
      highlights: ['Kid-friendly & elder-accessible seating', 'Traditional handi dum biryani feast', 'Relaxed garden atmosphere'],
    },
    {
      id: 'ep-3',
      title: 'Friends Meetups & Match Nights',
      subtitle: 'Resto-Bar Cocktails & Big Screens',
      description:
        'Cheer for your team on giant sports screens while enjoying chilled draught pitchers, artisanal gin tonics, and hot clay-oven bar bites in the outdoor patio lounge.',
      image: '/images/kickbunk/magicpin_06_garden_building_night.webp',
      capacity: '8 to 50 Guests',
      highlights: ['Live cricket & football match projection', 'Beer pitcher & bar bite packages', 'High-energy music & vibe'],
    },
    {
      id: 'ep-4',
      title: 'Corporate Dinners & Team Outings',
      subtitle: 'Professional Hospitality & Executive Banquets',
      description:
        'Unwind after a sprint with team dinners, quarterly celebrations, and farewell banquets featuring streamlined billing, custom menu curation, and private dining zones.',
      image: '/images/kickbunk/magicpin_10_decorative_tree_seating.webp',
      capacity: '15 to 100+ Guests',
      highlights: ['GST invoicing & corporate credit support', 'Custom curated fixed-price banquets', 'Dedicated VIP cabana clusters'],
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!name || !phone) {
      setErrorMsg('Please enter your name and contact phone number.');
      return;
    }

    setIsSubmitting(true);
    const res = await fetchApi('/inquiries', {
      method: 'POST',
      body: JSON.stringify({
        name,
        phone,
        email: email || undefined,
        subject: `Event Enquiry: ${eventType} (${guestCount} Guests)`,
        message: `Event Type: ${eventType}\nPreferred Date: ${preferredDate || 'TBD'}\nEstimated Guests: ${guestCount}\nSpecial Requirements: ${notes}`,
      }),
    });

    setIsSubmitting(false);
    if (res.success) {
      setIsSubmitted(true);
    } else {
      setErrorMsg(res.message || 'Unable to submit enquiry. Please call +91 99806 26699 directly.');
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F4EFE5] pt-24 pb-20">
      {/* 1. Header Hero */}
      <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 rounded-3xl"
          style={{
            backgroundImage: `url('/images/kickbunk/google_01_garden_lights_night.jpg')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent rounded-3xl" />

        <div className="relative z-10 max-w-3xl space-y-6 p-6 sm:p-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4A017]/15 border border-[#D4A017]/40 text-[#F5D77A] text-xs font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#D4A017]" />
            <span>KICK BUNK PRIVATE CELEBRATIONS</span>
          </div>

          <h1 className="font-cormorant text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
            PLAN YOUR SPECIAL MOMENT.
          </h1>

          <p className="font-manrope text-base sm:text-lg text-[#B8B1A5] font-light leading-relaxed">
            From fairy-lit garden cabanas to grand family dining feasts, Kick Bunk Restaurant & Bar offers a picturesque sanctuary in Bengaluru for birthdays, anniversaries, corporate milestones, and memorable get-togethers.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="#enquiry-form"
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D4A017] via-[#F5D77A] to-[#D4A017] text-[#050505] text-xs font-bold tracking-[0.16em] uppercase shadow-gold-glow hover:shadow-gold-glow-lg transition-all"
            >
              SEND EVENT ENQUIRY
            </a>

            <a
              href="tel:+919980626699"
              className="px-6 py-3.5 rounded-full border border-[#D4A017]/40 text-white text-xs font-semibold tracking-wider hover:border-[#D4A017] flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#D4A017]" />
              <span>Event Hotline: +91 99806 26699</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. Event Packages Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="font-cinzel text-xs font-semibold tracking-[0.25em] text-[#D4A017] uppercase">
            CURATED CELEBRATIONS
          </span>
          <h2 className="font-cormorant text-3xl sm:text-5xl font-bold text-white">
            Occasions Crafted with Care
          </h2>
          <p className="text-sm text-[#B8B1A5] font-light">
            Every celebration package can be tailored with custom menus, seating configurations, and décor arrangements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {eventPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="luxury-glass rounded-3xl overflow-hidden border border-[#D4A017]/20 hover:border-[#D4A017]/60 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={pkg.image}
                  alt={pkg.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1115] via-transparent to-transparent opacity-90" />
                <span className="absolute top-4 left-4 bg-[#050505]/90 border border-[#D4A017]/40 px-3 py-1 rounded-full text-xs font-mono text-[#F5D77A] tracking-wider">
                  Capacity: {pkg.capacity}
                </span>
              </div>

              <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="font-cormorant text-2xl sm:text-3xl font-bold text-white">
                    {pkg.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#D4A017] uppercase tracking-wider">
                    {pkg.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm text-[#B8B1A5] font-light leading-relaxed">
                    {pkg.description}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-[#1F242D]">
                  {pkg.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-gray-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D4A017] shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-[#1F242D] flex items-center justify-between">
                  <a
                    href="#enquiry-form"
                    onClick={() => setEventType(pkg.title)}
                    className="text-xs font-bold text-[#F5D77A] hover:text-white flex items-center gap-1"
                  >
                    <span>Enquire for {pkg.title}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Enquiry Form Section */}
      <section id="enquiry-form" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="luxury-glass border border-[#D4A017]/35 rounded-3xl p-6 sm:p-12 space-y-8 shadow-2xl">
          <div className="text-center space-y-2">
            <span className="font-cinzel text-xs font-semibold tracking-[0.25em] text-[#D4A017] uppercase">
              GET IN TOUCH WITH OUR EVENT DIRECTOR
            </span>
            <h2 className="font-cormorant text-3xl sm:text-5xl font-bold text-white">
              Event Booking Enquiry
            </h2>
            <p className="text-xs sm:text-sm text-[#B8B1A5] font-light max-w-md mx-auto">
              Please share your event requirements and our banquet coordinator will reach out with customized packages and menus.
            </p>
          </div>

          {isSubmitted ? (
            <div className="text-center space-y-4 py-8">
              <div className="w-16 h-16 rounded-full bg-[#D4A017]/20 border border-[#D4A017] text-[#F5D77A] flex items-center justify-center mx-auto shadow-gold-glow">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-cormorant text-2xl font-bold text-white">
                Thank You, {name}!
              </h3>
              <p className="text-sm text-gray-300 max-w-md mx-auto">
                Your event enquiry for {eventType} ({guestCount} guests) has been safely recorded. Our team will contact you at {phone} within 24 hours.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="px-6 py-2.5 rounded-full bg-[#D4A017] text-[#050505] text-xs font-bold uppercase tracking-wider"
              >
                Submit Another Enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 text-xs">
              {errorMsg && (
                <div className="p-3.5 rounded-xl bg-red-950/50 border border-red-500/40 text-red-200">
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-gray-300 font-medium uppercase tracking-wider">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ramesh Reddy"
                    className="w-full bg-[#050505] border border-[#1F242D] focus:border-[#D4A017] rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-gray-300 font-medium uppercase tracking-wider">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 99806 26699"
                    className="w-full bg-[#050505] border border-[#1F242D] focus:border-[#D4A017] rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-gray-300 font-medium uppercase tracking-wider">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-[#050505] border border-[#1F242D] focus:border-[#D4A017] rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-gray-300 font-medium uppercase tracking-wider">
                    Event Type *
                  </label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="w-full bg-[#050505] border border-[#1F242D] focus:border-[#D4A017] rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                  >
                    <option value="Birthday Celebration">Birthday Celebration</option>
                    <option value="Family Gathering & Reunion">Family Gathering & Reunion</option>
                    <option value="Friends Meetup & Match Night">Friends Meetup & Match Night</option>
                    <option value="Corporate Dinner & Outing">Corporate Dinner & Outing</option>
                    <option value="Anniversary & Romantic Cabana">Anniversary & Romantic Cabana</option>
                    <option value="Private Dining Experience">Private Dining Experience</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-gray-300 font-medium uppercase tracking-wider">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full bg-[#050505] border border-[#1F242D] focus:border-[#D4A017] rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-gray-300 font-medium uppercase tracking-wider">
                    Estimated Guests
                  </label>
                  <input
                    type="number"
                    min={4}
                    max={250}
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full bg-[#050505] border border-[#1F242D] focus:border-[#D4A017] rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-gray-300 font-medium uppercase tracking-wider">
                  Additional Requirements & Preferences
                </label>
                <textarea
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Tell us about food preferences (veg/non-veg), cabana preference, cake setup, audiovisual requirements, or any specific requests..."
                  className="w-full bg-[#050505] border border-[#1F242D] focus:border-[#D4A017] rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-full bg-gradient-to-r from-[#D4A017] via-[#F5D77A] to-[#D4A017] text-[#050505] text-xs font-bold tracking-[0.2em] uppercase shadow-gold-glow hover:shadow-gold-glow-lg transition-all disabled:opacity-50"
                >
                  {isSubmitting ? 'TRANSMITTING ENQUIRY...' : 'SUBMIT EVENT ENQUIRY'}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
