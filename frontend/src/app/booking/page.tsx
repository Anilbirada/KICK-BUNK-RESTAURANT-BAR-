'use client';

import React, { useState, useEffect } from 'react';
import { fetchApi } from '../../lib/api';
import { Calendar, Users, Clock, CheckCircle2, MapPin, Sparkles } from 'lucide-react';

export default function BookingPage() {
  const [branches, setBranches] = useState<any[]>([]);
  const [selectedBranchId, setSelectedBranchId] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [reservationDate, setReservationDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [reservationTime, setReservationTime] = useState<string>('19:30');
  const [guestCount, setGuestCount] = useState<number>(4);
  const [seatingPreference, setSeatingPreference] = useState<string>('Open Air Garden');
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
      setErrorMsg('Please fill in all required fields.');
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
        specialRequests: `${seatingPreference ? `Preference: ${seatingPreference}. ` : ''}${specialRequests}`,
      }),
    });

    setIsSubmitting(false);

    if (res.success && res.data) {
      setConfirmedBooking(res.data);
    } else {
      setErrorMsg(res.message || 'Failed to confirm reservation. Please try again.');
    }
  };

  const seatingOptions = [
    { title: 'Open Air Garden', desc: 'Surrounded by lush greenery and mood lighting' },
    { title: 'Private Cabana / Gazebo', desc: 'Secluded luxury dining for groups & couples' },
    { title: 'Family Dining Hall', desc: 'Spacious air-conditioned indoor comfort' },
    { title: 'Lounge & Bar', desc: 'Next to the mocktail & beverage counter' },
  ];

  return (
    <div className="min-h-screen bg-brand-dark py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {confirmedBooking ? (
        <div className="bg-brand-card border border-brand-green/40 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-brand-green/20 text-brand-green flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-serif font-bold text-brand-ivory">Table Reservation Confirmed!</h2>
            <p className="text-sm text-gray-300">
              We look forward to hosting you at <strong>{confirmedBooking.branch?.name}</strong>.
            </p>
          </div>

          <div className="bg-brand-dark p-6 rounded-2xl border border-brand-cardBorder max-w-md mx-auto text-left space-y-3 text-xs">
            <div className="flex justify-between py-1 border-b border-brand-cardBorder/60">
              <span className="text-gray-400">Reservation Reference</span>
              <span className="font-mono font-bold text-brand-gold">KB-RES-{confirmedBooking.id.slice(0, 8).toUpperCase()}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-brand-cardBorder/60">
              <span className="text-gray-400">Guest Name</span>
              <span className="font-semibold text-brand-ivory">{confirmedBooking.customerName}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-brand-cardBorder/60">
              <span className="text-gray-400">Date & Time</span>
              <span className="font-semibold text-brand-ivory">{new Date(confirmedBooking.reservationDate).toLocaleDateString()} at {confirmedBooking.reservationTime}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-brand-cardBorder/60">
              <span className="text-gray-400">Number of Guests</span>
              <span className="font-semibold text-brand-ivory">{confirmedBooking.guestCount} Guests</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-gray-400">Contact Phone</span>
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
              className="px-6 py-3 rounded-xl bg-brand-cardBorder hover:bg-gray-700 text-xs font-semibold text-gray-200 transition-colors"
            >
              Book Another Table
            </button>
            <a
              href="/menu"
              className="px-6 py-3 rounded-xl bg-brand-gold hover:bg-brand-goldHover text-brand-dark text-xs font-bold transition-colors"
            >
              Browse Digital Menu
            </a>
          </div>
        </div>
      ) : (
        <div className="bg-brand-card border border-brand-cardBorder rounded-3xl p-6 sm:p-10 space-y-8 shadow-xl">
          <div className="text-center space-y-2">
            <div className="text-brand-gold text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>Kick Bunk Hospitality</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-brand-ivory">
              Reserve Your Experience
            </h1>
            <p className="text-xs text-gray-400">
              Zero booking fees. Instant confirmation. Please arrive 15 minutes before your reserved time.
            </p>
          </div>

          {errorMsg && (
            <div className="p-4 rounded-xl bg-red-950/60 border border-red-500/50 text-red-300 text-xs text-center font-medium">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 1. Select Outlet */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-brand-gold">
                1. Select Restaurant Outlet
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {branches.map((b) => (
                  <div
                    key={b.id}
                    onClick={() => setSelectedBranchId(b.id)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      selectedBranchId === b.id
                        ? 'border-brand-gold bg-brand-gold/10 text-brand-gold font-semibold shadow-md'
                        : 'border-brand-cardBorder bg-brand-dark text-gray-300 hover:border-gray-600'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-brand-gold" />
                      <span className="text-sm">{b.name}</span>
                    </div>
                    <div className="text-[11px] text-gray-400 mt-1 pl-6">
                      {b.city} ({b.code})
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Date, Time & Guests */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-brand-gold">Date</label>
                <div className="relative">
                  <Calendar className="w-4 h-4 absolute left-3.5 top-3 text-gray-400" />
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={reservationDate}
                    onChange={(e) => setReservationDate(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-brand-dark border border-brand-cardBorder text-xs text-brand-ivory focus:outline-none focus:border-brand-gold"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-brand-gold">Time Slot</label>
                <div className="relative">
                  <Clock className="w-4 h-4 absolute left-3.5 top-3 text-gray-400" />
                  <select
                    value={reservationTime}
                    onChange={(e) => setReservationTime(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-brand-dark border border-brand-cardBorder text-xs text-brand-ivory focus:outline-none focus:border-brand-gold"
                  >
                    {['12:00', '12:30', '13:00', '13:30', '14:00', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00'].map(
                      (t) => (
                        <option key={t} value={t} className="bg-brand-dark">
                          {t} hrs
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-brand-gold">Guests</label>
                <div className="relative">
                  <Users className="w-4 h-4 absolute left-3.5 top-3 text-gray-400" />
                  <input
                    type="number"
                    min="1"
                    max="30"
                    required
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-brand-dark border border-brand-cardBorder text-xs text-brand-ivory focus:outline-none focus:border-brand-gold"
                  />
                </div>
              </div>
            </div>

            {/* 3. Seating Preference */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-brand-gold">
                Seating Atmosphere Preference
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {seatingOptions.map((opt) => (
                  <div
                    key={opt.title}
                    onClick={() => setSeatingPreference(opt.title)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      seatingPreference === opt.title
                        ? 'border-brand-gold bg-brand-gold/10 text-brand-gold'
                        : 'border-brand-cardBorder bg-brand-dark text-gray-300'
                    }`}
                  >
                    <div className="text-xs font-bold">{opt.title}</div>
                    <div className="text-[11px] text-gray-400 mt-0.5">{opt.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Guest Details */}
            <div className="space-y-4 pt-2">
              <label className="text-xs font-bold uppercase tracking-wider text-brand-gold">
                Primary Contact Details
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Full Name *"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="px-3.5 py-2.5 rounded-xl bg-brand-dark border border-brand-cardBorder text-xs text-brand-ivory focus:outline-none focus:border-brand-gold"
                />
                <input
                  type="tel"
                  required
                  placeholder="Mobile Number (e.g. 9876543210) *"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="px-3.5 py-2.5 rounded-xl bg-brand-dark border border-brand-cardBorder text-xs text-brand-ivory focus:outline-none focus:border-brand-gold"
                />
                <input
                  type="email"
                  placeholder="Email Address (Optional)"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="px-3.5 py-2.5 rounded-xl bg-brand-dark border border-brand-cardBorder text-xs text-brand-ivory focus:outline-none focus:border-brand-gold"
                />
              </div>

              <textarea
                placeholder="Special requests (e.g. Birthday celebration, anniversary cake, quiet corner)..."
                rows={2}
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-brand-dark border border-brand-cardBorder text-xs text-brand-ivory focus:outline-none focus:border-brand-gold"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl bg-brand-gold hover:bg-brand-goldHover text-brand-dark font-bold text-sm transition-all shadow-xl shadow-brand-gold/20 flex items-center justify-center gap-2"
            >
              <Calendar className="w-5 h-5 text-brand-dark" />
              <span>{isSubmitting ? 'Confirming Reservation...' : 'Confirm Table Reservation'}</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
