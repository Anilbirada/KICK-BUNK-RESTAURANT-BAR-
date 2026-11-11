'use client';

import React, { useState, useEffect } from 'react';
import { fetchApi } from '../../lib/api';
import { Calendar, Users, Clock, CheckCircle2, MapPin, Sparkles, Phone, ChevronRight } from 'lucide-react';

export default function BookingPage() {
  const [branches, setBranches] = useState<any[]>([]);
  const [selectedBranchId, setSelectedBranchId] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [reservationDate, setReservationDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [reservationTime, setReservationTime] = useState<string>('19:30');
  const [guestCount, setGuestCount] = useState<number>(4);
  const [seatingPreference, setSeatingPreference] = useState<string>('Private Cabana / Gazebo');
  const [specialRequests, setSpecialRequests] = useState<string>('');

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [confirmedBooking, setConfirmedBooking] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    fetchApi('/branches').then((res) => {
      if (res.success && res.data && res.data.length > 0) {
        setBranches(res.data);
        setSelectedBranchId(res.data[0].id);
      }
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!selectedBranchId || !customerName || !customerPhone || !reservationDate || !reservationTime) {
      setErrorMsg('Please complete all mandatory reservation fields.');
      return;
    }

    setIsSubmitting(true);
    const res = await fetchApi('/tables/reservations', {
      method: 'POST',
      body: JSON.stringify({
        branchId: selectedBranchId,
        customerName,
        customerPhone,
        customerEmail,
        reservationDate,
        reservationTime,
        guestCount,
        specialRequests: `${seatingPreference ? `Seating: ${seatingPreference}. ` : ''}${specialRequests}`,
      }),
    });

    setIsSubmitting(false);

    if (res.success && res.data) {
      setConfirmedBooking(res.data);
    } else {
      setErrorMsg(res.message || 'Unable to confirm reservation slot. Please try another time.');
    }
  };

  const seatingOptions = [
    { title: 'Private Cabana / Gazebo', desc: 'Secluded luxury dining under fairy lights for intimate groups' },
    { title: 'Open Air Garden Patio', desc: 'Lush greenery, breezy courtyard with evening mood illumination' },
    { title: 'Family AC Salon', desc: 'Spacious climate-controlled comfort with upholstered booths' },
    { title: 'Resto-Bar Lounge', desc: 'Lively cocktail atmosphere next to big screen match displays' },
  ];

  return (
    <div className="min-h-screen bg-[#08090C] py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-[#FAF8F5]">
      {confirmedBooking ? (
        <div className="luxury-glass border border-brand-gold/40 rounded-3xl p-8 sm:p-14 text-center space-y-8 shadow-2xl">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-brand-gold/20 to-amber-600/30 text-brand-gold flex items-center justify-center mx-auto border border-brand-gold/40 shadow-gold-glow">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-3">
            <span className="text-[10px] font-cinzel tracking-[0.25em] uppercase text-brand-gold font-bold">
              VIP Reservation Confirmed
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-brand-ivory">
              We Look Forward To Welcoming You
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 font-light max-w-md mx-auto">
              Your table at <strong>{confirmedBooking.branch?.name}</strong> has been secured.
            </p>
          </div>

          <div className="bg-[#050608] p-6 sm:p-8 rounded-2xl border border-brand-gold/20 max-w-md mx-auto text-left space-y-3.5 text-xs">
            <div className="flex justify-between py-1.5 border-b border-brand-gold/15">
              <span className="text-gray-400 font-cinzel">Booking Reference</span>
              <span className="font-mono font-bold text-brand-gold text-sm tracking-wider">
                KB-RES-{confirmedBooking.id.slice(0, 8).toUpperCase()}
              </span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-brand-gold/15">
              <span className="text-gray-400 font-cinzel">Guest Name</span>
              <span className="font-semibold text-brand-ivory">{confirmedBooking.customerName}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-brand-gold/15">
              <span className="text-gray-400 font-cinzel">Date & Slot</span>
              <span className="font-semibold text-brand-ivory">
                {new Date(confirmedBooking.reservationDate).toLocaleDateString()} at {confirmedBooking.reservationTime} hrs
              </span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-brand-gold/15">
              <span className="text-gray-400 font-cinzel">Party Size</span>
              <span className="font-semibold text-brand-ivory">{confirmedBooking.guestCount} Guests</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-gray-400 font-cinzel">Contact Number</span>
              <span className="font-semibold text-brand-ivory">{confirmedBooking.customerPhone}</span>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => {
                setConfirmedBooking(null);
                setCustomerName('');
                setCustomerPhone('');
                setSpecialRequests('');
              }}
              className="px-6 py-3.5 rounded-xl bg-[#12151B] hover:bg-[#1A1E26] border border-brand-cardBorder text-xs uppercase tracking-wider font-semibold text-gray-300 transition-colors"
            >
              Book Another Table
            </button>
            <a
              href="/menu"
              className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-brand-gold to-amber-600 hover:from-brand-goldLight hover:to-brand-gold text-brand-dark text-xs uppercase tracking-[0.18em] font-bold transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>Explore Menu</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      ) : (
        <div className="luxury-glass border border-brand-gold/25 rounded-3xl p-6 sm:p-12 space-y-10 shadow-2xl">
          <div className="text-center space-y-3">
            <div className="text-brand-gold text-xs font-cinzel tracking-[0.25em] uppercase font-semibold flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-gold" />
              <span>VIP Table & Cabana Concierge</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-brand-ivory">
              Reserve Your Dining Experience
            </h1>
            <p className="text-xs sm:text-sm text-gray-300 font-light max-w-lg mx-auto">
              Zero reservation fee. Immediate confirmation. Please arrive 15 minutes prior to your booking.
            </p>
          </div>

          {errorMsg && (
            <div className="p-4 rounded-2xl bg-red-950/70 border border-red-500/50 text-red-300 text-xs text-center font-medium">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* 1. Select Outlet */}
            <div className="space-y-3">
              <label className="text-xs font-cinzel font-bold uppercase tracking-[0.18em] text-brand-gold">
                1. Select Destination Outlet
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {branches.map((b) => (
                  <div
                    key={b.id}
                    onClick={() => setSelectedBranchId(b.id)}
                    className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                      selectedBranchId === b.id
                        ? 'border-brand-gold bg-brand-gold/15 text-brand-gold shadow-gold-glow'
                        : 'border-brand-cardBorder bg-[#10131A] text-gray-300 hover:border-brand-gold/30'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <MapPin className="w-4 h-4 text-brand-gold" />
                      <span className="font-serif font-bold text-sm sm:text-base">{b.name}</span>
                    </div>
                    <div className="text-xs text-gray-400 mt-1 pl-6 font-light">
                      {b.city} ({b.code}) • Open 7 Days
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Date, Slot & Guests */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-cinzel font-bold uppercase tracking-[0.18em] text-brand-gold">
                  Date
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={reservationDate}
                    onChange={(e) => setReservationDate(e.target.value)}
                    className="w-full pl-10 pr-3 py-3 rounded-2xl bg-[#10131A] border border-brand-cardBorder text-xs text-brand-ivory focus:outline-none focus:border-brand-gold transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-cinzel font-bold uppercase tracking-[0.18em] text-brand-gold">
                  Time Slot
                </label>
                <div className="relative">
                  <Clock className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
                  <select
                    value={reservationTime}
                    onChange={(e) => setReservationTime(e.target.value)}
                    className="w-full pl-10 pr-3 py-3 rounded-2xl bg-[#10131A] border border-brand-cardBorder text-xs text-brand-ivory focus:outline-none focus:border-brand-gold transition-colors"
                  >
                    {['12:00', '12:30', '13:00', '13:30', '14:00', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00'].map(
                      (t) => (
                        <option key={t} value={t} className="bg-[#0A0C0E]">
                          {t} hrs
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-cinzel font-bold uppercase tracking-[0.18em] text-brand-gold">
                  Party Size
                </label>
                <div className="relative">
                  <Users className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
                  <input
                    type="number"
                    min="1"
                    max="40"
                    required
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full pl-10 pr-3 py-3 rounded-2xl bg-[#10131A] border border-brand-cardBorder text-xs text-brand-ivory focus:outline-none focus:border-brand-gold transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* 3. Seating Atmosphere Preference */}
            <div className="space-y-3">
              <label className="text-xs font-cinzel font-bold uppercase tracking-[0.18em] text-brand-gold">
                Seating Atmosphere Preference
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {seatingOptions.map((opt) => (
                  <div
                    key={opt.title}
                    onClick={() => setSeatingPreference(opt.title)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      seatingPreference === opt.title
                        ? 'border-brand-gold bg-brand-gold/15 text-brand-gold shadow-gold-glow'
                        : 'border-brand-cardBorder bg-[#10131A] text-gray-300 hover:border-brand-gold/30'
                    }`}
                  >
                    <div className="font-serif font-bold text-sm">{opt.title}</div>
                    <div className="text-xs text-gray-400 font-light mt-1">{opt.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Guest Details */}
            <div className="space-y-4 pt-2">
              <label className="text-xs font-cinzel font-bold uppercase tracking-[0.18em] text-brand-gold">
                Primary Contact Details
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <input
                  type="text"
                  required
                  placeholder="Full Name *"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="px-4 py-3 rounded-2xl bg-[#10131A] border border-brand-cardBorder text-xs text-brand-ivory focus:outline-none focus:border-brand-gold"
                />
                <input
                  type="tel"
                  required
                  placeholder="Mobile (e.g. 9980626699) *"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="px-4 py-3 rounded-2xl bg-[#10131A] border border-brand-cardBorder text-xs text-brand-ivory focus:outline-none focus:border-brand-gold"
                />
                <input
                  type="email"
                  placeholder="Email (Optional)"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="px-4 py-3 rounded-2xl bg-[#10131A] border border-brand-cardBorder text-xs text-brand-ivory focus:outline-none focus:border-brand-gold"
                />
              </div>

              <textarea
                placeholder="Special requests (e.g. Birthday celebration, anniversary cake, quiet corner cabana)..."
                rows={2}
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-[#10131A] border border-brand-cardBorder text-xs text-brand-ivory focus:outline-none focus:border-brand-gold"
              />
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-brand-gold via-amber-500 to-yellow-600 hover:from-brand-goldLight hover:to-brand-gold text-brand-dark font-bold text-xs uppercase tracking-[0.2em] transition-all shadow-xl shadow-brand-gold/20 flex items-center justify-center gap-2.5"
            >
              <Calendar className="w-4 h-4 text-brand-dark" />
              <span>{isSubmitting ? 'Confirming Reservation...' : 'Confirm Table Reservation'}</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
