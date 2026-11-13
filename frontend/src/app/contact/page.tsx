'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { fetchApi } from '../../lib/api';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Sparkles,
  Navigation,
  MessageCircle,
  ExternalLink,
  Calendar,
  AlertCircle
} from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [subject, setSubject] = useState<string>('Table Reservation / Event Enquiry');
  const [message, setMessage] = useState<string>('');

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

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
        name,
        phone,
        email: email || undefined,
        subject,
        message,
      }),
    });

    setIsSubmitting(false);

    if (res.success) {
      setIsSubmitted(true);
      setName('');
      setPhone('');
      setEmail('');
      setMessage('');
    } else {
      setErrorMsg(res.message || 'Unable to submit enquiry. Please call our hotline directly.');
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F4EFE5] pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden border border-[#D4A017]/50 p-1 bg-[#050505] shadow-gold-glow">
            <Image
              src="/images/logo.png"
              alt="KICK BUNK"
              width={48}
              height={48}
              className="object-contain"
            />
          </div>
          <span className="font-cinzel text-xs font-semibold tracking-[0.3em] text-[#D4A017] uppercase">
            CONCIERGE & VENUE LOCATION
          </span>
        </div>

        <h1 className="font-cormorant text-4xl sm:text-6xl font-bold tracking-tight text-white">
          CONNECT WITH KICK BUNK
        </h1>

        <p className="font-manrope text-sm sm:text-base text-[#B8B1A5] font-light">
          Whether planning an intimate dining evening, a private cabana birthday celebration, or a corporate dinner — our guest relations team is ready to assist you.
        </p>
      </div>

      {/* Main Grid: Info Cards + Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Venue Contact Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="luxury-glass rounded-3xl border border-[#D4A017]/25 p-8 space-y-6 shadow-xl">
            <h2 className="font-cormorant text-2xl font-bold text-white border-b border-[#1F242D] pb-3">
              Bengaluru Flagship Venue
            </h2>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#D4A017] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Address</p>
                  <p className="text-[#B8B1A5] leading-relaxed">
                    Hulimangala Main Road, Vinayaka Layout, Vabasandra, Electronic City Phase 1, Bengaluru, Karnataka 560105
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#D4A017] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Direct Phone</p>
                  <a
                    href="tel:+919980626699"
                    className="text-[#F5D77A] font-mono hover:underline text-sm font-semibold"
                  >
                    +91 99806 26699
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#D4A017] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Guest Email</p>
                  <p className="text-[#B8B1A5]">bengaluru@kickbunk.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#D4A017] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Operating Hours</p>
                  <p className="text-[#B8B1A5]">Monday – Sunday: 11:30 AM – 11:30 PM</p>
                  <p className="text-xs text-[#D4A017] mt-0.5">Dinner & Garden Ambience from 6:30 PM</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#1F242D] flex flex-col gap-3">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Kick+Bunk+Restaurant+and+Bar+Hulimangala+Bengaluru"
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 rounded-full bg-gradient-to-r from-[#D4A017] via-[#F5D77A] to-[#D4A017] text-[#050505] text-xs font-bold tracking-wider uppercase text-center flex items-center justify-center gap-2 shadow-gold-glow"
              >
                <Navigation className="w-4 h-4" />
                <span>OPEN IN GOOGLE MAPS</span>
              </a>

              <a
                href="https://wa.me/919980626699?text=Hello%20Kick%20Bunk,%20I%20would%20like%20to%20enquire%20about%20a%20table%20reservation."
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold tracking-wider uppercase text-center flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>CHAT ON WHATSAPP</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Contact Form */}
        <div className="lg:col-span-7">
          <div className="luxury-glass rounded-3xl border border-[#D4A017]/35 p-6 sm:p-10 shadow-2xl">
            <h2 className="font-cormorant text-3xl font-bold text-white mb-2">
              Send a Direct Message
            </h2>
            <p className="text-xs text-[#B8B1A5] font-light mb-6">
              Our concierge team typically responds within 30 minutes during restaurant hours.
            </p>

            {isSubmitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#D4A017]/20 border border-[#D4A017] text-[#F5D77A] flex items-center justify-center mx-auto shadow-gold-glow">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-cormorant text-2xl font-bold text-white">
                  Message Transmitted Successfully!
                </h3>
                <p className="text-xs text-gray-300 max-w-sm mx-auto">
                  Thank you for contacting Kick Bunk Restaurant & Bar. Our guest coordinator will get in touch with you shortly.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2 rounded-full bg-[#D4A017] text-[#050505] text-xs font-bold uppercase tracking-wider"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 text-xs">
                {errorMsg && (
                  <div className="p-3.5 rounded-xl bg-red-950/50 border border-red-500/40 text-red-200">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-gray-300 font-medium uppercase tracking-wider">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Anand Kumar"
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
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-gray-300 font-medium uppercase tracking-wider">
                      Email Address (Optional)
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
                      Enquiry Subject
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-[#050505] border border-[#1F242D] focus:border-[#D4A017] rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                    >
                      <option value="Table Reservation Enquiry">Table Reservation Enquiry</option>
                      <option value="Fairy-Lit Garden Cabana Booking">Fairy-Lit Garden Cabana</option>
                      <option value="Private Event & Birthday Banquet">Private Event & Birthday</option>
                      <option value="Corporate Dinner Party">Corporate Dinner Party</option>
                      <option value="Catering & Takeaway">Takeaway & Catering</option>
                      <option value="General Hospitality Feedback">General Feedback</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-gray-300 font-medium uppercase tracking-wider">
                    Your Message / Special Request *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your dining plans, guest count, dietary preferences, or any questions..."
                    className="w-full bg-[#050505] border border-[#1F242D] focus:border-[#D4A017] rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-full bg-gradient-to-r from-[#D4A017] via-[#F5D77A] to-[#D4A017] text-[#050505] text-xs font-bold tracking-[0.2em] uppercase shadow-gold-glow hover:shadow-gold-glow-lg transition-all disabled:opacity-50"
                >
                  {isSubmitting ? 'TRANSMITTING MESSAGE...' : 'SEND MESSAGE'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Embedded Google Maps Section */}
      <div className="luxury-glass rounded-3xl overflow-hidden border border-[#D4A017]/30 shadow-2xl p-2 bg-[#0A0C10]">
        <div className="h-[400px] w-full rounded-2xl overflow-hidden">
          <iframe
            title="Kick Bunk Restaurant and Bar Google Maps Embed"
            src="https://maps.google.com/maps?q=Kick%20Bunk%20Restaurant%20and%20Bar%20Hulimangala%20Bengaluru&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}
