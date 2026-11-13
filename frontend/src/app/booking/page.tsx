'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { fetchApi } from '../../lib/api';
import {
  Calendar,
  Users,
  Clock,
  CheckCircle2,
  MapPin,
  Sparkles,
  Phone,
  ChevronRight,
  MessageCircle,
  Wine,
  ShieldCheck,
  ChevronLeft
} from 'lucide-react';

export default function BookingPage() {
  const [branches, setBranches] = useState<any[]>([]);
  const [selectedBranchId, setSelectedBranchId] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [reservationDate, setReservationDate] = useState<string>(() => {
    const d = new Date();
    return d.toISOString().split('T')[0];
  });
  const [reservationTime, setReservationTime] = useState<string>('19:30');
  const [guestCount, setGuestCount] = useState<number>(4);
  const [seatingPreference, setSeatingPreference] = useState<string>('Fairy-Lit Garden Cabana');
  const [specialRequests, setSpecialRequests] = useState<string>('');

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [confirmedBooking, setConfirmedBooking] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    fetchApi('/branches').then((res) => {
      if (res.success && res.data && res.data.length > 0) {
        setBranches(res.data);
        const blr = res.data.find((b: any) => b.city === 'Bengaluru') || res.data[0];
        setSelectedBranchId(blr.id);
      }
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!customerName || !customerPhone || !reservationDate || !reservationTime) {
      setErrorMsg('Please complete all mandatory reservation fields.');
      return;
    }

    setIsSubmitting(true);
    const refCode = `KB-RES-${Math.floor(100000 + Math.random() * 900000)}`;

    const res = await fetchApi('/tables/reservations', {
      method: 'POST',
      body: JSON.stringify({
        branchId: selectedBranchId || undefined,
        customerName,
        customerPhone,
        customerEmail: customerEmail || undefined,
        reservationDate,
        reservationTime,
        guestCount,
        specialRequests: `Seating: ${seatingPreference}. ${specialRequests}`,
        referenceNumber: refCode,
      }),
    });

    setIsSubmitting(false);

    if (res.success) {
      setConfirmedBooking(
        res.data || {
          referenceNumber: refCode,
          customerName,
          customerPhone,
          reservationDate,
          reservationTime,
          guestCount,
          specialRequests,
        }
      );
    } else {
      setErrorMsg(res.message || 'Unable to confirm reservation slot. Please try another time.');
    }
  };

  const seatingOptions = [
    {
      title: 'Fairy-Lit Garden Cabana',
      desc: 'Secluded luxury dining under canopy fairy lights for intimate couples and groups',
      tag: 'Most Popular',
    },
    {
      title: 'Open Air Garden Patio',
      desc: 'Lush greenery, breezy courtyard with evening mood illumination and decorative trees',
      tag: 'Breezy & Lush',
    },
    {
      title: 'Family AC Salon',
      desc: 'Spacious climate-controlled comfort with plush upholstered booths and quiet atmosphere',
      tag: 'Air Conditioned',
    },
    {
      title: 'Resto-Bar Lounge',
      desc: 'Lively cocktail atmosphere next to big screen match displays and music',
      tag: 'Vibrant & Energetic',
    },
  ];

  return (
    <div className="min-h-screen bg-[#050505] pt-28 pb-20 px-4 sm:px-6 lg:px-8 text-[#F4EFE5]">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Reservation Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4A017]/15 border border-[#D4A017]/40 text-[#F5D77A] text-xs font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#D4A017]" />
            <span>ONLINE TABLE CONCIERGE</span>
          </div>

          <h1 className="font-cormorant text-4xl sm:text-6xl font-bold tracking-tight text-white">
            RESERVE YOUR TABLE
          </h1>

          <p className="font-manrope text-sm sm:text-base text-[#B8B1A5] font-light max-w-xl mx-auto">
            Experience the culinary artistry and enchanting garden ambience of Kick Bunk Restaurant & Bar Bengaluru.
          </p>
        </div>

        {confirmedBooking ? (
          /* Confirmation Screen with Customer Official Logo */
          <div className="luxury-glass border border-[#D4A017]/50 rounded-3xl p-8 sm:p-14 text-center space-y-8 shadow-2xl relative overflow-hidden">
            {/* Background Subtle Radial Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[radial-gradient(circle,_rgba(212,160,23,0.1)_0%,_transparent_70%)] pointer-events-none" />

            {/* Official Customer Logo in Confirmation Screen */}
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-[#D4A017] p-1 bg-[#08090C] mx-auto shadow-gold-glow">
              <Image
                src="/images/logo.png"
                alt="KICK BUNK Official Logo"
                width={96}
                height={96}
                className="object-contain"
                priority
              />
            </div>

            <div className="space-y-3">
              <span className="font-mono text-xs text-[#D4A017] tracking-[0.25em] uppercase font-semibold">
                RESERVATION CONFIRMED
              </span>
              <h2 className="font-cormorant text-3xl sm:text-4xl font-bold text-white">
                We Look Forward to Welcoming You, {customerName}!
              </h2>
              <div className="inline-block bg-[#0B0D11] border border-[#D4A017]/40 px-6 py-2.5 rounded-full mt-2">
                <span className="text-xs text-gray-400 uppercase tracking-widest mr-2">Booking ID:</span>
                <span className="font-mono text-lg font-bold text-[#F5D77A]">
                  {confirmedBooking.referenceNumber || 'KB-RES-VERIFIED'}
                </span>
              </div>
            </div>

            {/* Booking Details Summary Card */}
            <div className="bg-[#08090C]/90 border border-[#1F242D] rounded-2xl p-6 max-w-lg mx-auto text-left space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between py-1.5 border-b border-[#1F242D]">
                <span className="text-gray-400">Venue</span>
                <span className="font-semibold text-white">Kick Bunk Bengaluru Flagship</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#1F242D]">
                <span className="text-gray-400">Date & Time</span>
                <span className="font-semibold text-[#F5D77A]">
                  {reservationDate} at {reservationTime}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#1F242D]">
                <span className="text-gray-400">Guests</span>
                <span className="font-semibold text-white">{guestCount} Guests</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#1F242D]">
                <span className="text-gray-400">Seating Preference</span>
                <span className="font-semibold text-[#D4A017]">{seatingPreference}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-gray-400">Guest Phone</span>
                <span className="font-mono text-white">{customerPhone}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`https://wa.me/919980626699?text=Hello%20Kick%20Bunk,%20I%20have%20booked%20table%20${confirmedBooking.referenceNumber}%20for%20${customerName}%20on%20${reservationDate}%20at%20${reservationTime}.`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold tracking-wider flex items-center justify-center gap-2 shadow-lg"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Notify via WhatsApp Concierge</span>
              </a>

              <a
                href="tel:+919980626699"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full border border-[#D4A017]/40 text-white text-xs font-semibold tracking-wider hover:border-[#D4A017] flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#D4A017]" />
                <span>Call Restaurant Concierge</span>
              </a>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setConfirmedBooking(null)}
                className="text-xs text-[#B8B1A5] hover:text-[#D4A017] underline"
              >
                Make Another Table Reservation
              </button>
            </div>
          </div>
        ) : (
          /* Reservation Booking Form */
          <form
            onSubmit={handleSubmit}
            className="luxury-glass border border-[#D4A017]/35 rounded-3xl p-6 sm:p-12 space-y-8 shadow-2xl"
          >
            {errorMsg && (
              <div className="p-4 rounded-xl bg-red-950/50 border border-red-500/40 text-red-200 text-xs">
                {errorMsg}
              </div>
            )}

            {/* Seating Preference Selector Cards */}
            <div className="space-y-3">
              <label className="text-xs font-semibold tracking-[0.2em] text-[#D4A017] uppercase block">
                1. Select Desired Dining Environment
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {seatingOptions.map((opt) => (
                  <div
                    key={opt.title}
                    onClick={() => setSeatingPreference(opt.title)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      seatingPreference === opt.title
                        ? 'bg-[#151922] border-[#D4A017] shadow-gold-glow'
                        : 'bg-[#08090C] border-[#1F242D] hover:border-[#D4A017]/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-cormorant text-lg font-bold text-white">
                        {opt.title}
                      </h4>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#D4A017]/20 text-[#F5D77A] border border-[#D4A017]/40">
                        {opt.tag}
                      </span>
                    </div>
                    <p className="text-xs text-[#B8B1A5] font-light mt-1.5 leading-relaxed">
                      {opt.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Guest Details */}
            <div className="space-y-4">
              <label className="text-xs font-semibold tracking-[0.2em] text-[#D4A017] uppercase block">
                2. Guest & Reservation Information
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs text-gray-300 uppercase">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Vikram Malhotra"
                    className="w-full bg-[#050505] border border-[#1F242D] focus:border-[#D4A017] rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-gray-300 uppercase">Contact Phone *</label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="+91 99806 26699"
                    className="w-full bg-[#050505] border border-[#1F242D] focus:border-[#D4A017] rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-gray-300 uppercase">Email Address (Optional)</label>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="vikram@example.com"
                    className="w-full bg-[#050505] border border-[#1F242D] focus:border-[#D4A017] rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-gray-300 uppercase">Reservation Date *</label>
                  <input
                    type="date"
                    required
                    value={reservationDate}
                    onChange={(e) => setReservationDate(e.target.value)}
                    className="w-full bg-[#050505] border border-[#1F242D] focus:border-[#D4A017] rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-gray-300 uppercase">Time Slot *</label>
                  <select
                    value={reservationTime}
                    onChange={(e) => setReservationTime(e.target.value)}
                    className="w-full bg-[#050505] border border-[#1F242D] focus:border-[#D4A017] rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                  >
                    <option value="12:00">12:00 PM (Lunch Opening)</option>
                    <option value="13:00">01:00 PM (Lunch Dining)</option>
                    <option value="14:00">02:00 PM (Late Lunch)</option>
                    <option value="18:30">06:30 PM (Evening Sunset Service)</option>
                    <option value="19:30">07:30 PM (Fairy-Lit Dinner)</option>
                    <option value="20:30">08:30 PM (Peak Dinner & Cabana)</option>
                    <option value="21:30">09:30 PM (Late Night Resto-Bar)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-gray-300 uppercase">Number of Guests *</label>
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full bg-[#050505] border border-[#1F242D] focus:border-[#D4A017] rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 20, 25, 30].map(
                      (num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Guest' : 'Guests'}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-gray-300 uppercase">Special Requests & Occasion Notes</label>
                <textarea
                  rows={3}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="e.g. Birthday anniversary celebration, quiet corner table, high chair required..."
                  className="w-full bg-[#050505] border border-[#1F242D] focus:border-[#D4A017] rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-full bg-gradient-to-r from-[#D4A017] via-[#F5D77A] to-[#D4A017] text-[#050505] text-xs font-bold tracking-[0.2em] uppercase shadow-gold-glow hover:shadow-gold-glow-lg transition-all disabled:opacity-50"
              >
                {isSubmitting ? 'CONFIRMING TABLE RESERVATION...' : 'COMPLETE RESERVATION'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
