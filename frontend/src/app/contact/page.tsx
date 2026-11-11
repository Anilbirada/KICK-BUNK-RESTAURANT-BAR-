'use client';

import React, { useState, useEffect } from 'react';
import { fetchApi } from '../../lib/api';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  MessageSquare,
  Sparkles,
  Navigation,
  MessageCircle,
  ExternalLink,
  Calendar,
  AlertCircle
} from 'lucide-react';

export default function ContactPage() {
  const [branches, setBranches] = useState<any[]>([]);
  const [selectedBranchId, setSelectedBranchId] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [subject, setSubject] = useState<string>('Table Reservation / Event Enquiry');
  const [message, setMessage] = useState<string>('');

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedInquiry, setSubmittedInquiry] = useState<any | null>(null);
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

    if (!name || !phone || !message) {
      setErrorMsg('Please complete your name, phone number, and message.');
      return;
    }

    setIsSubmitting(true);
    const res = await fetchApi('/inquiries', {
      method: 'POST',
      body: JSON.stringify({
        branchId: selectedBranchId || undefined,
        name,
        phone,
        email: email || undefined,
        subject,
        message,
      }),
    });

    setIsSubmitting(false);

    if (res.success && res.data) {
      setSubmittedInquiry(res.data);
      setName('');
      setPhone('');
      setEmail('');
      setMessage('');
    } else {
      setErrorMsg(res.message || 'Failed to submit inquiry. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#08090C] py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 text-[#FAF8F5]">
      {/* Luxury Editorial Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full luxury-glass border border-brand-gold/30 text-brand-gold text-[10px] font-cinzel font-semibold tracking-[0.25em] uppercase shadow-gold-glow">
          <MessageSquare className="w-3.5 h-3.5 text-brand-gold" />
          <span>Concierge & Guest Relations</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-serif font-bold text-brand-ivory leading-tight">
          Direct Venue Concierge
        </h1>
        <p className="text-sm sm:text-base text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
          Planning a private garden cabana banquet, family celebration, or corporate feast? Connect directly with our on-site management team in Bengaluru & Tirupati.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Direct Contacts & Google Maps Embed */}
        <div className="lg:col-span-6 space-y-8">
          {/* Bengaluru Flagship Venue Card */}
          <div className="luxury-glass p-8 rounded-3xl border border-brand-gold/25 space-y-6 shadow-luxury-card hover:border-brand-gold/50 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-cinzel uppercase tracking-[0.2em] text-brand-gold">
                  Bengaluru Flagship
                </span>
                <h3 className="font-serif text-2xl font-bold text-brand-ivory">
                  Kick Bunk Family Garden Restaurant & Bar
                </h3>
              </div>
              <span className="text-[10px] font-cinzel bg-brand-green/20 text-brand-green px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
                Main Venue
              </span>
            </div>

            <div className="space-y-3.5 text-xs text-gray-300 font-light">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                <span>
                  Hulimangala Main Road, Vinayaka Layout, Vabasandra, Electronic City Phase 1, Bengaluru 560105
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-brand-gold shrink-0" />
                <a href="tel:+919980626699" className="hover:text-brand-gold font-semibold transition-colors">
                  +91 99806 26699 / +91 82962 19302
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-brand-gold shrink-0" />
                <span>11:30 AM – 11:30 PM (All 7 Days)</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Kick+Bunk+Restaurant+and+Bar+Hulimangala+Bengaluru"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-gold to-amber-600 text-brand-dark font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Google Maps</span>
              </a>

              <a
                href="https://wa.me/919980626699?text=Hello%20Kick%20Bunk%20Bengaluru,%20I%20have%20an%20enquiry"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-xl bg-brand-green/20 hover:bg-brand-green text-brand-green hover:text-white border border-brand-green/40 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Desk</span>
              </a>
            </div>
          </div>

          {/* Tirupati Branch Card */}
          <div className="luxury-glass p-8 rounded-3xl border border-brand-gold/25 space-y-6 shadow-luxury-card hover:border-brand-gold/50 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-cinzel uppercase tracking-[0.2em] text-brand-gold">
                  Tirupati Branch
                </span>
                <h3 className="font-serif text-2xl font-bold text-brand-ivory">
                  Kick Bunk Garden Bar & Restaurant
                </h3>
              </div>
              <span className="text-[10px] font-cinzel bg-brand-gold/20 text-brand-gold px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
                Rayalaseema
              </span>
            </div>

            <div className="space-y-3.5 text-xs text-gray-300 font-light">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                <span>Door No. 19-1-G/25, Kothapalli, Samavayi Margam, Chinthalachenu, Korlagunta, Tirupati 517501</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-brand-gold shrink-0" />
                <a href="tel:+917760594868" className="hover:text-brand-gold font-semibold transition-colors">
                  +91 98855 20220 / +91 77605 94868
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-brand-gold shrink-0" />
                <span>11:30 AM – 11:00 PM (All 7 Days)</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href="tel:+917760594868"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-gold to-amber-600 text-brand-dark font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Tirupati Desk</span>
              </a>
            </div>
          </div>

          {/* Interactive Google Maps */}
          <div className="rounded-3xl overflow-hidden border border-brand-gold/25 shadow-2xl h-72">
            <iframe
              title="Kick Bunk Location Map"
              src="https://maps.google.com/maps?q=Kick+Bunk+Restaurant+and+Bar+Hulimangala+Bengaluru&t=&z=14&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Right Column: Interactive Inquiries Form */}
        <div className="lg:col-span-6">
          <div className="luxury-glass p-8 sm:p-10 rounded-3xl border border-brand-gold/25 space-y-8 shadow-luxury-card">
            <div className="space-y-2">
              <span className="text-[10px] font-cinzel uppercase tracking-[0.25em] text-brand-gold font-bold">
                Online Inquiry Desk
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-brand-ivory">
                Send Direct Message
              </h2>
              <p className="text-xs text-gray-300 font-light">
                Submit banquet, catering, or dining inquiries directly to general management.
              </p>
            </div>

            {submittedInquiry && (
              <div className="p-5 rounded-2xl bg-brand-green/15 border border-brand-green/40 text-brand-green text-xs space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Inquiry Transmitted Successfully</span>
                </div>
                <p className="text-[11px] text-gray-300">
                  Ref: <span className="font-mono text-brand-gold font-bold">KB-INQ-{submittedInquiry.id.slice(0, 8).toUpperCase()}</span>. Our concierge team will reach out promptly.
                </p>
              </div>
            )}

            {errorMsg && (
              <div className="p-4 rounded-2xl bg-red-950/70 border border-red-500/50 text-red-300 text-xs text-center font-medium">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-[11px] font-cinzel font-bold uppercase tracking-wider text-brand-gold">
                  Select Branch
                </label>
                <select
                  value={selectedBranchId}
                  onChange={(e) => setSelectedBranchId(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-[#08090C] border border-brand-cardBorder text-xs text-brand-ivory focus:outline-none focus:border-brand-gold"
                >
                  {branches.map((b) => (
                    <option key={b.id} value={b.id} className="bg-[#08090C]">
                      {b.name} ({b.city})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-cinzel font-bold uppercase tracking-wider text-brand-gold">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-[#08090C] border border-brand-cardBorder text-xs text-brand-ivory focus:outline-none focus:border-brand-gold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-cinzel font-bold uppercase tracking-wider text-brand-gold">
                    Contact Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-[#08090C] border border-brand-cardBorder text-xs text-brand-ivory focus:outline-none focus:border-brand-gold"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-cinzel font-bold uppercase tracking-wider text-brand-gold">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  placeholder="e.g. ramesh@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-[#08090C] border border-brand-cardBorder text-xs text-brand-ivory focus:outline-none focus:border-brand-gold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-cinzel font-bold uppercase tracking-wider text-brand-gold">
                  Inquiry Purpose
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-[#08090C] border border-brand-cardBorder text-xs text-brand-ivory focus:outline-none focus:border-brand-gold"
                >
                  <option value="Table Reservation / Event Enquiry">Table Reservation / Event Enquiry</option>
                  <option value="Birthday / Anniversary Lawn Banquet">Birthday / Anniversary Lawn Banquet</option>
                  <option value="Corporate Team Lunch / Dinner">Corporate Team Lunch / Dinner</option>
                  <option value="Catering & Bulk Food Orders">Catering & Bulk Food Orders</option>
                  <option value="General Feedback / Management Query">General Feedback / Management Query</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-cinzel font-bold uppercase tracking-wider text-brand-gold">
                  Your Message *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell us about your event date, anticipated guest count, or specific dining questions..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-[#08090C] border border-brand-cardBorder text-xs text-brand-ivory focus:outline-none focus:border-brand-gold"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-brand-gold via-amber-500 to-yellow-600 hover:from-brand-goldLight hover:to-brand-gold text-brand-dark font-bold text-xs uppercase tracking-[0.2em] transition-all shadow-xl shadow-brand-gold/20 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Transmitting Message...' : 'Submit Inquiry'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
