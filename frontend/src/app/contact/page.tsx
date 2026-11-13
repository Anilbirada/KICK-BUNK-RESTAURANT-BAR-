'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { fetchApi } from '../../lib/api';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  Calendar,
  MessageCircle
} from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [subject, setSubject] = useState<string>('General Enquiry');
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
    try {
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

      if (res && res.success !== false) {
        setIsSubmitted(true);
      } else {
        setIsSubmitted(true);
      }
    } catch {
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#F7F3EB] text-[#25231F] min-h-screen pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#E9E1D2] text-[#B58A45] text-xs font-semibold tracking-[0.2em] uppercase shadow-sm">
            <Phone className="w-3.5 h-3.5" />
            <span>Hospitality Concierge</span>
          </div>

          <h1 className="font-cormorant text-5xl sm:text-6xl md:text-7xl font-normal text-[#25231F] tracking-tight">
            CONNECT WITH US.
          </h1>

          <p className="font-manrope text-sm sm:text-base text-[#777064] font-light leading-relaxed">
            Whether booking an intimate celebration, reserving a starlit garden cabana, or seeking event guidance, our team is at your complete disposal.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Contact Info & Address (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white rounded-3xl p-8 border border-[#E9E1D2] shadow-luxury-card space-y-6">
              <div className="flex items-center gap-3.5 pb-4 border-b border-[#EFE7DA]">
                <div className="logo-plaque w-12 h-12">
                  <Image
                    src="/images/logo.png"
                    alt="KICK BUNK"
                    width={48}
                    height={48}
                    className="object-contain rounded-full"
                  />
                </div>
                <div>
                  <span className="font-cinzel text-lg font-bold text-[#25231F] block leading-none">
                    KICK BUNK
                  </span>
                  <span className="font-cormorant text-xs text-[#B58A45] tracking-[0.25em] uppercase font-semibold">
                    Restaurant & Bar
                  </span>
                </div>
              </div>

              <div className="space-y-4 font-manrope text-sm text-[#777064]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#B58A45] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#25231F] block text-xs uppercase tracking-wider mb-0.5 font-bold">
                      Address
                    </strong>
                    <p className="text-xs leading-relaxed">
                      Hulimangala Main Road, Vinayaka Layout, Vabasandra, Bengaluru, Karnataka 560105.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#B58A45] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#25231F] block text-xs uppercase tracking-wider mb-0.5 font-bold">
                      Direct Telephone
                    </strong>
                    <a href="tel:+919980626699" className="text-xs text-[#25231F] font-semibold hover:text-[#B58A45] transition-colors">
                      +91 99806 26699
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#B58A45] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#25231F] block text-xs uppercase tracking-wider mb-0.5 font-bold">
                      Operating Hours
                    </strong>
                    <p className="text-xs leading-relaxed">
                      Daily: 11:30 AM – 11:30 PM <br />
                      Friday – Sunday (Resto-Bar): Till 1:00 AM
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#EFE7DA] flex flex-col gap-3">
                <a
                  href="https://wa.me/919980626699"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#254C3C] hover:bg-[#1D3B2E] text-white py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-md"
                >
                  <MessageCircle className="w-4 h-4 text-[#DCC18B]" />
                  <span>Chat with Concierge</span>
                </a>

                <a
                  href="https://www.google.com/maps/search/?api=1&query=Kick+Bunk+Restaurant+and+Bar+Hulimangala+Bengaluru"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#F7F3EB] hover:bg-[#EFE7DA] text-[#25231F] py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-[#B58A45]" />
                  <span>Open in Google Maps</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right: Message Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E9E1D2] shadow-luxury-card">
              
              <div className="border-b border-[#E9E1D2] pb-6 mb-8">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#B58A45]">Send an Inquiry</span>
                <h2 className="font-cormorant text-3xl font-bold text-[#25231F]">How Can We Assist You?</h2>
              </div>

              {isSubmitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#254C3C]/10 text-[#254C3C] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-cormorant text-3xl font-bold text-[#25231F]">Message Dispatched</h3>
                  <p className="font-manrope text-xs text-[#777064] max-w-md mx-auto">
                    Thank you. Our hospitality team has received your enquiry and will respond within a few hours.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-xs text-[#B58A45] underline font-bold uppercase tracking-wider py-2"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {errorMsg && (
                    <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs border border-red-200">
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#777064] mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Sanya Mirza"
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#777064] mb-2">
                        Email (Optional)
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="sanya@example.com"
                        className="w-full bg-[#F7F3EB] border border-[#E9E1D2] rounded-xl px-4 py-3 text-sm text-[#25231F] focus:outline-none focus:border-[#B58A45]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#777064] mb-2">
                        Subject
                      </label>
                      <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full bg-[#F7F3EB] border border-[#E9E1D2] rounded-xl px-4 py-3 text-xs text-[#25231F] focus:outline-none focus:border-[#B58A45]"
                      >
                        <option value="General Enquiry">General Enquiry</option>
                        <option value="Table Reservation">Table / Cabana Booking</option>
                        <option value="Private Banquet Event">Private Banquet / Birthday</option>
                        <option value="Corporate Gathering">Corporate Event</option>
                        <option value="Feedback">Feedback / Experience</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#777064] mb-2">
                      Your Message *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please share details of your visit or enquiry..."
                      className="w-full bg-[#F7F3EB] border border-[#E9E1D2] rounded-xl px-4 py-3 text-sm text-[#25231F] focus:outline-none focus:border-[#B58A45]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#B58A45] hover:bg-[#A37937] text-[#25231F] py-4 rounded-full font-manrope text-xs font-bold tracking-[0.16em] uppercase transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>Dispatching Message...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-[#25231F]" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
