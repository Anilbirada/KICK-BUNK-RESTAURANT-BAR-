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
      setErrorMsg('Please fill in your name, phone number, and message.');
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
    <div className="min-h-screen bg-[#0A0C0E] py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="text-brand-gold text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-1.5">
          <MessageSquare className="w-4 h-4" />
          <span>Location & Direct Venue Assistance</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-brand-ivory">
          Contact Kick Bunk Restaurant & Bar
        </h1>
        <p className="text-sm text-gray-300 font-light max-w-2xl mx-auto">
          Planning a family dinner, garden cabana celebration, or corporate team get-together in Bengaluru? Connect directly with our on-site team or send an enquiry below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Direct Contacts & Google Maps Embed */}
        <div className="lg:col-span-6 space-y-8">
          {/* Bengaluru Flagship Venue Card (Verified from Reference Pack) */}
          <div className="bg-brand-card p-6 sm:p-8 rounded-3xl border border-brand-cardBorder space-y-6 hover:border-brand-gold/40 transition-all shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase px-3 py-1 rounded-full bg-brand-gold text-brand-dark shadow-sm">
                Bengaluru Flagship Venue
              </span>
              <span className="text-xs text-brand-green font-semibold flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-green animate-pulse"></span>
                <span>Open Today (11:30 AM – 11:30 PM)</span>
              </span>
            </div>

            <div>
              <h3 className="font-serif text-2xl font-bold text-brand-ivory">
                Kick Bunk Restaurant & Bar
              </h3>
              <p className="text-xs text-brand-gold font-medium mt-0.5">
                Electronic City Phase 1 • Hulimangala Main Road
              </p>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-gray-300 border-y border-brand-cardBorder/60 py-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                <div>
                  <strong className="text-brand-ivory block">Verified Address:</strong>
                  <span>Hulimangala Main Road, Vinayaka Layout, Vabasandra, Electronic City Phase 1, Bengaluru, Karnataka 560105</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brand-gold shrink-0" />
                <div>
                  <strong className="text-brand-ivory block">Direct Phone & Table Inquiries:</strong>
                  <a href="tel:+919980626699" className="hover:text-brand-gold font-bold text-base text-brand-gold">
                    +91 99806 26699
                  </a>
                  <span className="text-gray-400 text-xs ml-2">/ +91 99453 21367</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-brand-gold shrink-0" />
                <div>
                  <strong className="text-brand-ivory block">Service Timings:</strong>
                  <span>Daily 11:30 AM – 11:30 PM (All 7 Days Open)</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-gold shrink-0" />
                <div>
                  <strong className="text-brand-ivory block">Email:</strong>
                  <span>bengaluru@kickbunk.com</span>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-1">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Kick+Bunk+Restaurant+and+Bar+Hulimangala+Bengaluru"
                target="_blank"
                rel="noreferrer"
                className="flex-1 min-w-[140px] py-3 rounded-xl bg-brand-gold hover:bg-brand-goldHover text-brand-dark font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions</span>
              </a>

              <a
                href="https://wa.me/919980626699?text=Hello%20Kick%20Bunk%20Bengaluru,%20I%20have%20an%20enquiry%20regarding%20table%20reservation"
                target="_blank"
                rel="noreferrer"
                className="py-3 px-5 rounded-xl bg-brand-green hover:bg-brand-greenHover text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>

              <a
                href="tel:+919980626699"
                className="py-3 px-5 rounded-xl bg-brand-dark hover:bg-brand-cardBorder border border-brand-cardBorder text-gray-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4 text-brand-gold" />
                <span>Call Venue</span>
              </a>
            </div>

            {/* Embedded Google Maps View */}
            <div className="rounded-2xl overflow-hidden border border-brand-cardBorder h-60 relative shadow-inner">
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

          {/* Secondary Tirupati Branch Card */}
          <div className="bg-brand-card p-6 rounded-2xl border border-brand-cardBorder space-y-3 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase px-2.5 py-0.5 rounded bg-brand-cardBorder text-gray-300">
                Tirupati Branch
              </span>
              <span className="text-xs text-gray-400">Daily 11:30 AM – 11:00 PM</span>
            </div>
            <h4 className="font-serif text-lg font-bold text-brand-ivory">
              Kick Bunk Garden Bar & Restaurant
            </h4>
            <p className="text-xs text-gray-300">
              Korramenugunta Road, Tata Nagar, Tirupati, Andhra Pradesh 517501
            </p>
            <p className="text-xs text-brand-gold font-medium">
              Phone: +91 77605 94868
            </p>
          </div>
        </div>

        {/* Right Column: Interactive Reservation & Inquiry Form */}
        <div className="lg:col-span-6 bg-brand-card p-6 sm:p-10 rounded-3xl border border-brand-cardBorder space-y-6 shadow-2xl">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-brand-gold text-xs font-bold uppercase tracking-widest">
              <Calendar className="w-4 h-4" />
              <span>Direct Reservation & Inquiry</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-brand-ivory">
              Send an Enquiry or Table Request
            </h3>
            <p className="text-xs text-gray-400 font-light">
              Submit your preferred date, guest count, and cabana preference. Our reception desk will confirm your reservation immediately.
            </p>
          </div>

          {submittedInquiry ? (
            <div className="p-8 rounded-2xl bg-brand-green/10 border border-brand-green/30 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-brand-green/20 text-brand-green flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-xl font-bold text-brand-ivory">
                Enquiry Submitted Successfully!
              </h4>
              <p className="text-xs text-gray-300 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{submittedInquiry.name}</strong>. Your enquiry for{' '}
                <span className="text-brand-gold font-medium">{submittedInquiry.subject}</span> has been routed to our Bengaluru host team. We will call you on{' '}
                <span className="text-brand-gold font-bold">{submittedInquiry.phone}</span> shortly.
              </p>
              <button
                onClick={() => setSubmittedInquiry(null)}
                className="mt-2 px-6 py-2.5 rounded-xl bg-brand-green hover:bg-brand-greenHover text-white text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Send Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Branch Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-300">Select Outlet</label>
                <select
                  value={selectedBranchId}
                  onChange={(e) => setSelectedBranchId(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#0A0C0E] border border-brand-cardBorder text-brand-ivory text-xs focus:outline-none focus:border-brand-gold"
                >
                  {branches.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name} ({b.city})
                    </option>
                  ))}
                </select>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-300">
                    Your Name <span className="text-brand-gold">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#0A0C0E] border border-brand-cardBorder text-brand-ivory text-xs focus:outline-none focus:border-brand-gold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-300">
                    Phone Number <span className="text-brand-gold">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#0A0C0E] border border-brand-cardBorder text-brand-ivory text-xs focus:outline-none focus:border-brand-gold"
                  />
                </div>
              </div>

              {/* Email & Subject */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-300">Email Address (Optional)</label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#0A0C0E] border border-brand-cardBorder text-brand-ivory text-xs focus:outline-none focus:border-brand-gold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-300">Nature of Request</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#0A0C0E] border border-brand-cardBorder text-brand-ivory text-xs focus:outline-none focus:border-brand-gold"
                  >
                    <option value="Private Garden Cabana Booking">Private Garden Cabana Booking</option>
                    <option value="Family Dining Table (4-8 Pax)">Family Dining Table (4-8 Pax)</option>
                    <option value="Corporate Team Outing (15+ Pax)">Corporate Team Outing (15+ Pax)</option>
                    <option value="Birthday / Anniversary Celebration">Birthday / Anniversary Celebration</option>
                    <option value="Weekend Sports Match Screening Table">Weekend Sports Match Screening Table</option>
                    <option value="General Inquiry / Feedback">General Inquiry / Feedback</option>
                  </select>
                </div>
              </div>

              {/* Message / Special Instructions */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-300">
                  Date, Guest Count & Special Requests <span className="text-brand-gold">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="e.g. Table for 6 guests on Friday evening 8:00 PM in the garden cabana. Prefer smoking/non-smoking zone and tandoori platter starters."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#0A0C0E] border border-brand-cardBorder text-brand-ivory text-xs focus:outline-none focus:border-brand-gold resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-gold to-brand-amber hover:from-brand-goldHover hover:to-brand-gold text-brand-dark font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-xl shadow-brand-gold/20 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Submitting Request...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-brand-dark" />
                    <span>Submit Table Reservation Request</span>
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
