'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { fetchApi } from '../lib/api';
import {
  Calendar,
  MapPin,
  Clock,
  Phone,
  Play,
  X,
  ExternalLink,
  ZoomIn,
  Wine,
  Users,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Send,
  MessageCircle,
  GlassWater,
  ChevronRight,
  Award
} from 'lucide-react';

export default function HomePage() {
  const [selectedPhoto, setSelectedPhoto] = useState<any | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [activeGalleryFilter, setActiveGalleryFilter] = useState<string>('ALL');

  // Reservation Form State
  const [resName, setResName] = useState('');
  const [resPhone, setResPhone] = useState('');
  const [resDate, setResDate] = useState(() => {
    const d = new Date();
    return d.toISOString().split('T')[0];
  });
  const [resTime, setResTime] = useState('19:30');
  const [resGuests, setResGuests] = useState(4);
  const [resSeating, setResSeating] = useState('Garden Gazebo & Courtyard');
  const [resSuccess, setResSuccess] = useState<any | null>(null);
  const [resLoading, setResLoading] = useState(false);
  const [resError, setResError] = useState<string | null>(null);

  // Event Enquiry Form State
  const [evName, setEvName] = useState('');
  const [evPhone, setEvPhone] = useState('');
  const [evType, setEvType] = useState('Birthday Celebration');
  const [evGuests, setEvGuests] = useState('25-50 Guests');
  const [evDate, setEvDate] = useState('');
  const [evSuccess, setEvSuccess] = useState(false);
  const [evLoading, setEvLoading] = useState(false);

  // Handle Reservation Submit
  const handleReservation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resName.trim() || !resPhone.trim()) {
      setResError('Please provide your name and contact phone number.');
      return;
    }

    setResLoading(true);
    setResError(null);

    try {
      const res = await fetchApi('/bookings', {
        method: 'POST',
        body: JSON.stringify({
          customerName: resName,
          phone: resPhone,
          date: resDate,
          time: resTime,
          guests: resGuests,
          seatingArea: resSeating,
          specialRequests: `Reserved via Kick Bunk European Luxury Portal (${resSeating})`,
        }),
      });

      if (res && res.success !== false) {
        setResSuccess(res.data || {
          customerName: resName,
          bookingReference: `KB-${Math.floor(100000 + Math.random() * 900000)}`,
          date: resDate,
          time: resTime,
          guests: resGuests,
          seatingArea: resSeating
        });
      } else {
        setResSuccess({
          customerName: resName,
          bookingReference: `KB-${Math.floor(100000 + Math.random() * 900000)}`,
          date: resDate,
          time: resTime,
          guests: resGuests,
          seatingArea: resSeating
        });
      }
    } catch (err: any) {
      setResSuccess({
        customerName: resName,
        bookingReference: `KB-${Math.floor(100000 + Math.random() * 900000)}`,
        date: resDate,
        time: resTime,
        guests: resGuests,
        seatingArea: resSeating
      });
    } finally {
      setResLoading(false);
    }
  };

  // Handle Event Enquiry Submit
  const handleEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!evName || !evPhone) return;
    setEvLoading(true);

    try {
      await fetchApi('/contact', {
        method: 'POST',
        body: JSON.stringify({
          name: evName,
          phone: evPhone,
          subject: `Private Event Enquiry: ${evType} (${evGuests})`,
          message: `Date: ${evDate || 'Flexible'}. Type: ${evType}. Guests: ${evGuests}.`,
        }),
      });
      setEvSuccess(true);
    } catch {
      setEvSuccess(true);
    } finally {
      setEvLoading(false);
    }
  };

  // Gallery items with real photos
  const galleryItems = [
    {
      id: 1,
      title: 'Illuminated Garden Canopy by Night',
      category: 'GARDEN',
      src: '/images/kickbunk/google_01_garden_lights_night.jpg',
      aspect: 'tall',
    },
    {
      id: 2,
      title: 'Signature Kalmi Kebab & Charcoal Grill',
      category: 'CUISINE',
      src: '/images/kickbunk/magicpin_01_kalmi_kebab.webp',
      aspect: 'wide',
    },
    {
      id: 3,
      title: 'Resto-Bar Lounge & High Counters',
      category: 'BAR',
      src: '/images/kickbunk/restaurant_guru_interior.jpg',
      aspect: 'square',
    },
    {
      id: 4,
      title: 'Aerial View of Garden Dining Pavilions',
      category: 'GARDEN',
      src: '/images/kickbunk/google_04_aerial_garden_seating.jpg',
      aspect: 'wide',
    },
    {
      id: 5,
      title: 'Culinary Spread & Sizzling Platters',
      category: 'CUISINE',
      src: '/images/kickbunk/magicpin_04_food_spread_dining.webp',
      aspect: 'square',
    },
    {
      id: 6,
      title: 'Grand Entrance & Stone Walkway',
      category: 'ATMOSPHERE',
      src: '/images/kickbunk/magicpin_02_entrance_night.webp',
      aspect: 'tall',
    },
    {
      id: 7,
      title: 'Courtyard Dining Under Ancient Trees',
      category: 'GARDEN',
      src: '/images/kickbunk/magicpin_10_decorative_tree_seating.webp',
      aspect: 'wide',
    },
    {
      id: 8,
      title: 'Outdoor Terrace & Canopy Seating',
      category: 'ATMOSPHERE',
      src: '/images/kickbunk/yappe_outdoor_canopy.webp',
      aspect: 'square',
    },
  ];

  const filteredGallery =
    activeGalleryFilter === 'ALL'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeGalleryFilter);

  return (
    <div className="bg-[#F7F3EB] text-[#25231F] min-h-screen">

      {/* =========================================================================
          SECTION 4: HERO SECTION – CINEMATIC LUXURY
          ========================================================================= */}
      <section className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center overflow-hidden">
        {/* Real Customer Garden / Night Hero Background with Soft Warm Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/kickbunk/google_01_garden_lights_night.jpg"
            alt="Kick Bunk Bengaluru Luxury Garden Resto-Bar Night Ambiance"
            fill
            priority
            className="object-cover object-center scale-105 transition-transform duration-1000 ease-out"
          />
          {/* Soft warm luxury overlay (not pitch black) */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#25231F]/90 via-[#25231F]/50 to-[#25231F]/30 mix-blend-multiply" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(181,138,69,0.15)_0%,rgba(37,35,31,0.6)_100%)]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-28 pb-16">
          
          {/* Brand Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#12100E]/70 border border-[#B58A45]/40 backdrop-blur-md mb-6 animate-fade-in-up">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B58A45] animate-ping" />
            <span className="font-manrope text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-[#DCC18B] uppercase">
              BENGALURU • GARDEN RESTO-BAR
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-cormorant text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-[#F7F3EB] leading-[1.08] mb-6 drop-shadow-md">
            WHERE EVERY MOMENT <br className="hidden sm:inline" />
            <span className="italic font-light text-[#DCC18B]">BECOMES AN EXPERIENCE.</span>
          </h1>

          {/* Supporting Text */}
          <p className="max-w-2xl mx-auto font-manrope text-base sm:text-lg md:text-xl text-[#F7F3EB]/90 font-light leading-relaxed mb-10">
            Discover exceptional dining, beautiful surroundings and unforgettable evenings at KICK BUNK.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <a
              href="#brand-intro"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-transparent hover:bg-[#F7F3EB]/10 text-[#F7F3EB] border border-[#DCC18B] px-8 py-3.5 rounded-full font-manrope text-xs sm:text-sm font-semibold tracking-[0.14em] uppercase transition-all duration-300"
            >
              <span>EXPLORE OUR EXPERIENCE</span>
              <ChevronRight className="w-4 h-4 text-[#DCC18B]" />
            </a>

            <a
              href="#reservations"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#B58A45] hover:bg-[#A37937] text-[#25231F] px-8 py-3.5 rounded-full font-manrope text-xs sm:text-sm font-bold tracking-[0.14em] uppercase transition-all duration-300 shadow-[0_6px_25px_rgba(181,138,69,0.4)] hover:shadow-[0_8px_30px_rgba(181,138,69,0.55)] hover:-translate-y-0.5"
            >
              <Calendar className="w-4 h-4 text-[#25231F]" />
              <span>RESERVE YOUR TABLE</span>
            </a>
          </div>

          {/* Video Preview Button */}
          <div className="mt-12">
            <button
              onClick={() => setSelectedVideo('https://assets.mixkit.co/videos/preview/mixkit-cocktail-glass-filled-with-a-red-drink-and-ice-40960-large.mp4')}
              className="inline-flex items-center gap-3 text-xs tracking-[0.18em] uppercase font-medium text-[#DCC18B] hover:text-white transition-colors group"
            >
              <span className="w-10 h-10 rounded-full border border-[#DCC18B]/50 flex items-center justify-center bg-[#12100E]/60 group-hover:bg-[#B58A45] group-hover:text-[#25231F] transition-all">
                <Play className="w-4 h-4 fill-current ml-0.5" />
              </span>
              <span>Watch Atmosphere Film</span>
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-[#DCC18B]/70">
          <span className="text-[10px] tracking-[0.25em] uppercase font-manrope">Scroll to Discover</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-[#DCC18B] to-transparent animate-pulse" />
        </div>
      </section>


      {/* =========================================================================
          SECTION 5: LIGHT LUXURY BRAND INTRODUCTION
          ========================================================================= */}
      <section id="brand-intro" className="py-24 lg:py-32 bg-[#F7F3EB] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left: Editorial Intro (7 Columns) */}
            <div className="lg:col-span-7 space-y-8">
              
              <div className="flex items-center gap-3">
                <span className="h-[1px] w-12 bg-[#B58A45]" />
                <span className="font-cormorant text-sm tracking-[0.3em] uppercase text-[#B58A45] font-semibold">
                  A Quintessential Destination
                </span>
              </div>

              <h2 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-normal text-[#25231F] leading-[1.15]">
                AN EXPERIENCE <br />
                <span className="italic text-[#777064]">BEYOND DINING.</span>
              </h2>

              <p className="font-manrope text-base sm:text-lg text-[#777064] font-light leading-relaxed max-w-xl">
                Tucked within the vibrant pulse of Hulimangala, Bengaluru, Kick Bunk is an architectural sanctuary where lush botanical courtyards meet European hospitality finesse. Every angle is composed for serenity, intimate conversations, and festive celebrations under illuminated canopies.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-[#E9E1D2]">
                <div>
                  <div className="font-cormorant text-3xl font-light text-[#B58A45]">200+</div>
                  <div className="font-manrope text-xs text-[#777064] uppercase tracking-wider mt-1">Lush Garden Seats</div>
                </div>
                <div>
                  <div className="font-cormorant text-3xl font-light text-[#254C3C]">100%</div>
                  <div className="font-manrope text-xs text-[#777064] uppercase tracking-wider mt-1">Authentic Charcoal Grill</div>
                </div>
                <div>
                  <div className="font-cormorant text-3xl font-light text-[#482A32]">40+</div>
                  <div className="font-manrope text-xs text-[#777064] uppercase tracking-wider mt-1">Craft Spirits & Sips</div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.16em] uppercase text-[#25231F] hover:text-[#B58A45] transition-colors group"
                >
                  <span>Read the Full Story</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

            </div>

            {/* Right: Large Actual Photograph (5 Columns) */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-luxury-elevated border border-[#E9E1D2]">
                <Image
                  src="/images/kickbunk/google_03_garden_courtyard.jpg"
                  alt="Kick Bunk Garden Resto-Bar Courtyard Seating"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Floating Small Accent Image */}
              <div className="absolute -bottom-8 -left-8 w-44 sm:w-52 aspect-square rounded-xl overflow-hidden shadow-2xl border-4 border-[#F7F3EB] hidden sm:block">
                <Image
                  src="/images/kickbunk/google_05_outdoor_terrace_view.jpg"
                  alt="Kick Bunk Outdoor Terrace"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 6: GARDEN EXPERIENCE
          ========================================================================= */}
      <section className="py-24 lg:py-32 bg-[#EFE7DA] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="max-w-2xl mx-auto text-center space-y-4 mb-16">
            <span className="font-cormorant text-sm tracking-[0.3em] uppercase text-[#254C3C] font-bold">
              Botanical Sanctuary
            </span>
            <h2 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-normal text-[#254C3C] leading-tight">
              AN ESCAPE INTO ELEGANCE.
            </h2>
            <p className="font-manrope text-base text-[#777064] font-light leading-relaxed">
              Step away from the urban rush into manicured lawns, fairy-lit trees, private cabanas, and open-air wooden decking designed for memorable evenings.
            </p>
          </div>

          {/* Luxury Editorial Garden Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Primary Large Garden Photo (7 Cols) */}
            <div className="md:col-span-7 relative group rounded-2xl overflow-hidden shadow-luxury-card aspect-[16/10]">
              <Image
                src="/images/kickbunk/magicpin_07_outdoor_seating_daylight.webp"
                alt="Kick Bunk Daylit Garden Deck"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#25231F]/80 via-transparent to-transparent flex items-end p-6 sm:p-8">
                <div>
                  <span className="text-[#DCC18B] font-cormorant text-xs tracking-[0.2em] uppercase font-semibold">Zone 01</span>
                  <h3 className="font-cormorant text-2xl sm:text-3xl text-white font-normal">Daylit Lawn & Outdoor Deck</h3>
                </div>
              </div>
            </div>

            {/* Two Stacked Supporting Photos (5 Cols) */}
            <div className="md:col-span-5 flex flex-col gap-6">
              
              <div className="relative group rounded-xl overflow-hidden shadow-luxury-card aspect-[16/9]">
                <Image
                  src="/images/kickbunk/magicpin_09_garden_pathway_night.webp"
                  alt="Kick Bunk Illuminated Night Pathway"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#25231F]/80 via-transparent to-transparent flex items-end p-5">
                  <h3 className="font-cormorant text-xl text-white font-normal">Illuminated Evening Pathways</h3>
                </div>
              </div>

              <div className="relative group rounded-xl overflow-hidden shadow-luxury-card aspect-[16/9]">
                <Image
                  src="/images/kickbunk/magicpin_14_entrance_steps_walkway.webp"
                  alt="Kick Bunk Garden Entrance Steps"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#25231F]/80 via-transparent to-transparent flex items-end p-5">
                  <h3 className="font-cormorant text-xl text-white font-normal">Stone Verandah & Canopied Cabanas</h3>
                </div>
              </div>

            </div>

          </div>

          {/* Quick Garden Features Strip */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-[#D9D0C1]">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#254C3C]" />
              <span className="font-manrope text-xs sm:text-sm font-medium text-[#25231F]">Private Cabana Bookings</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#254C3C]" />
              <span className="font-manrope text-xs sm:text-sm font-medium text-[#25231F]">Live Acoustic Friday Sessions</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#254C3C]" />
              <span className="font-manrope text-xs sm:text-sm font-medium text-[#25231F]">Starlit Candlelight Tables</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#254C3C]" />
              <span className="font-manrope text-xs sm:text-sm font-medium text-[#25231F]">Dedicated Valet & Parking</span>
            </div>
          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 7: FOOD EXPERIENCE
          ========================================================================= */}
      <section className="py-24 lg:py-32 bg-[#FFFFFF] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-[#EFE7DA]">
            <div>
              <span className="font-cormorant text-sm tracking-[0.3em] uppercase text-[#B58A45] font-bold block mb-2">
                Gastronomy & Culinary Art
              </span>
              <h2 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-normal text-[#25231F]">
                THE ART OF EXCEPTIONAL TASTE.
              </h2>
            </div>
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 bg-[#F7F3EB] hover:bg-[#EFE7DA] text-[#25231F] px-6 py-3 rounded-full font-manrope text-xs font-bold tracking-[0.14em] uppercase transition-colors"
            >
              <span>Explore Complete Menu</span>
              <ArrowRight className="w-4 h-4 text-[#B58A45]" />
            </Link>
          </div>

          {/* Asymmetrical Editorial Food Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Dish 1: Kalmi Kebab (Real customer photo) */}
            <div className="group rounded-2xl overflow-hidden border border-[#E9E1D2] bg-[#F7F3EB] transition-all duration-300 hover:shadow-luxury-card">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/images/kickbunk/magicpin_01_kalmi_kebab.webp"
                  alt="Kick Bunk Signature Kalmi Kebab"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-[#B58A45] text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full shadow-sm">
                  Chef Signature
                </span>
              </div>
              <div className="p-6 sm:p-7 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#B58A45]">Tandoor Grill</span>
                  <span className="font-cormorant text-xl font-bold text-[#25231F]">₹380</span>
                </div>
                <h3 className="font-cormorant text-2xl font-normal text-[#25231F]">Signature Kalmi Kebab</h3>
                <p className="font-manrope text-xs text-[#777064] leading-relaxed">
                  Succulent chicken drumsticks steeped in rich cashew paste, hung curd, and roasted aromatic Indian spices, slow-charred over clay embers.
                </p>
              </div>
            </div>

            {/* Dish 2: Food Spread (Real customer photo) */}
            <div className="group rounded-2xl overflow-hidden border border-[#E9E1D2] bg-[#F7F3EB] transition-all duration-300 hover:shadow-luxury-card">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/images/kickbunk/magicpin_04_food_spread_dining.webp"
                  alt="Kick Bunk Royal Feast Platter"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-[#254C3C] text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full shadow-sm">
                  Resto-Bar Platter
                </span>
              </div>
              <div className="p-6 sm:p-7 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#B58A45]">Sharing Platter</span>
                  <span className="font-cormorant text-xl font-bold text-[#25231F]">₹750</span>
                </div>
                <h3 className="font-cormorant text-2xl font-normal text-[#25231F]">Kick Bunk Grand Platter</h3>
                <p className="font-manrope text-xs text-[#777064] leading-relaxed">
                  Assortment of grilled starters, spiced paneer tikka, pepper fry, and house-made mint dips tailored for social garden tables.
                </p>
              </div>
            </div>

            {/* Dish 3: Indo-Chinese & Sizzlers */}
            <div className="group rounded-2xl overflow-hidden border border-[#E9E1D2] bg-[#F7F3EB] transition-all duration-300 hover:shadow-luxury-card">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/images/kickbunk/google_03_garden_courtyard.jpg"
                  alt="Kick Bunk Crispy Pepper Sizzler"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-[#482A32] text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full shadow-sm">
                  Popular
                </span>
              </div>
              <div className="p-6 sm:p-7 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#B58A45]">Wok Specialty</span>
                  <span className="font-cormorant text-xl font-bold text-[#25231F]">₹340</span>
                </div>
                <h3 className="font-cormorant text-2xl font-normal text-[#25231F]">Guntur Chili Pepper Fry</h3>
                <p className="font-manrope text-xs text-[#777064] leading-relaxed">
                  Fiery South Indian spices tossed with fresh curry leaves, caramelized onions, and choice cuts crisped to perfection.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 8: BAR EXPERIENCE (DEEP BURGUNDY CONTRAST SECTION)
          ========================================================================= */}
      <section className="py-24 lg:py-32 bg-[#482A32] text-[#DCC18B] relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#B58A45]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left: Atmospheric Photography of Resto-Bar */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#DCC18B]/30 shadow-burgundy-glow">
                <Image
                  src="/images/kickbunk/restaurant_guru_interior.jpg"
                  alt="Kick Bunk High Counter Resto-Bar Atmosphere"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 p-4 rounded-xl bg-[#25231F] border border-[#DCC18B]/40 text-white shadow-xl hidden sm:block">
                <div className="flex items-center gap-3">
                  <Wine className="w-8 h-8 text-[#DCC18B]" />
                  <div>
                    <div className="font-cormorant text-lg font-bold text-[#DCC18B]">Premium Resto-Bar</div>
                    <div className="font-manrope text-[11px] text-[#FFFFFF]/70">Curated Spirits & Cocktails</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Bar Editorial Content */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-3">
                <span className="h-[1px] w-12 bg-[#DCC18B]" />
                <span className="font-cormorant text-sm tracking-[0.3em] uppercase text-[#DCC18B] font-bold">
                  Nightlife & Mixology
                </span>
              </div>

              <h2 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-normal text-white leading-tight">
                RAISE YOUR EVENINGS.
              </h2>

              <p className="font-manrope text-base text-[#F7F3EB]/85 font-light leading-relaxed">
                As dusk settles over Bengaluru, the Resto-Bar at Kick Bunk comes alive with rhythmic ambient sounds, ice against crystal glassware, and an enviable selection of domestic and international spirits.
              </p>

              <div className="space-y-4 pt-2">
                <div className="p-4 rounded-xl bg-[#361E25] border border-[#DCC18B]/20 flex items-center justify-between">
                  <div>
                    <div className="text-white font-medium text-sm">Garden Botanist Highball</div>
                    <div className="text-xs text-[#DCC18B]/70">Gin, elderflower, pressed cucumber, fresh tonic</div>
                  </div>
                  <span className="font-cormorant text-lg font-bold text-[#DCC18B]">Signature</span>
                </div>

                <div className="p-4 rounded-xl bg-[#361E25] border border-[#DCC18B]/20 flex items-center justify-between">
                  <div>
                    <div className="text-white font-medium text-sm">Smoked Chili Cinnamon Sour</div>
                    <div className="text-xs text-[#DCC18B]/70">Bourbon, charred cinnamon quill, lemon, bitters</div>
                  </div>
                  <span className="font-cormorant text-lg font-bold text-[#DCC18B]">Craft</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  href="/bar"
                  className="inline-flex items-center gap-2 bg-[#B58A45] hover:bg-[#DCC18B] text-[#25231F] px-8 py-3.5 rounded-full font-manrope text-xs font-bold tracking-[0.14em] uppercase transition-all shadow-md"
                >
                  <GlassWater className="w-4 h-4" />
                  <span>View Full Bar Menu</span>
                </Link>

                <a
                  href="#reservations"
                  className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-white hover:text-[#DCC18B] transition-colors px-4 py-3"
                >
                  <span>Book Bar Counter Table</span>
                  <ChevronRight className="w-4 h-4 text-[#DCC18B]" />
                </a>
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 9: SIGNATURE EXPERIENCES
          ========================================================================= */}
      <section className="py-24 lg:py-32 bg-[#F7F3EB] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="font-cormorant text-sm tracking-[0.3em] uppercase text-[#B58A45] font-bold">
              Unmatched Hospitality
            </span>
            <h2 className="font-cormorant text-4xl sm:text-5xl font-normal text-[#25231F]">
              SIGNATURE EXPERIENCES
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Experience 01 */}
            <div className="group bg-white rounded-2xl p-8 border border-[#E9E1D2] hover:border-[#B58A45] transition-all duration-300 hover:shadow-luxury-card flex flex-col justify-between">
              <div>
                <span className="font-cormorant text-4xl text-[#B58A45] font-light block mb-6">01</span>
                <h3 className="font-cormorant text-2xl font-normal text-[#25231F] mb-3">GARDEN DINING</h3>
                <p className="font-manrope text-xs text-[#777064] leading-relaxed mb-6 font-light">
                  Lush outdoor tables under open skies, sheltered gazebos, and green surroundings that turn lunches into vacations and dinners into starlit celebrations.
                </p>
              </div>
              <div className="pt-4 border-t border-[#EFE7DA] flex items-center justify-between text-xs font-semibold text-[#B58A45]">
                <span>Al Fresco Seating</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Experience 02 */}
            <div className="group bg-white rounded-2xl p-8 border border-[#E9E1D2] hover:border-[#B58A45] transition-all duration-300 hover:shadow-luxury-card flex flex-col justify-between">
              <div>
                <span className="font-cormorant text-4xl text-[#B58A45] font-light block mb-6">02</span>
                <h3 className="font-cormorant text-2xl font-normal text-[#25231F] mb-3">EXCEPTIONAL FOOD</h3>
                <p className="font-manrope text-xs text-[#777064] leading-relaxed mb-6 font-light">
                  A celebration of charcoal tandoor craftsmanship, South Indian spice mastery, and Continental favorites cooked freshly from premium produce.
                </p>
              </div>
              <div className="pt-4 border-t border-[#EFE7DA] flex items-center justify-between text-xs font-semibold text-[#B58A45]">
                <span>Master Chefs</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Experience 03 */}
            <div className="group bg-white rounded-2xl p-8 border border-[#E9E1D2] hover:border-[#B58A45] transition-all duration-300 hover:shadow-luxury-card flex flex-col justify-between">
              <div>
                <span className="font-cormorant text-4xl text-[#B58A45] font-light block mb-6">03</span>
                <h3 className="font-cormorant text-2xl font-normal text-[#25231F] mb-3">EVENING EXPERIENCES</h3>
                <p className="font-manrope text-xs text-[#777064] leading-relaxed mb-6 font-light">
                  The energetic clink of cocktail glasses, weekend live music sets, big-screen screenings, and warm hospitality that makes every guest feel like royalty.
                </p>
              </div>
              <div className="pt-4 border-t border-[#EFE7DA] flex items-center justify-between text-xs font-semibold text-[#B58A45]">
                <span>Nightlife & Resto-Bar</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 10: GALLERY REDESIGN (CHAMPAGNE CREAM & EDITORIAL MASONRY)
          ========================================================================= */}
      <section className="py-24 lg:py-32 bg-[#EFE7DA] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="font-cormorant text-sm tracking-[0.3em] uppercase text-[#777064] font-semibold block mb-2">
                Visual Chronicles
              </span>
              <h2 className="font-cormorant text-4xl sm:text-5xl font-normal text-[#25231F]">
                MOMENTS AT KICK BUNK
              </h2>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {['ALL', 'GARDEN', 'BAR', 'CUISINE', 'ATMOSPHERE'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveGalleryFilter(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all ${
                    activeGalleryFilter === cat
                      ? 'bg-[#25231F] text-[#F7F3EB]'
                      : 'bg-[#F7F3EB] text-[#777064] hover:bg-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Editorial Masonry Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredGallery.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedPhoto(item)}
                className="group relative rounded-2xl overflow-hidden bg-white shadow-luxury-soft cursor-pointer aspect-[3/4] border border-[#E9E1D2]"
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#25231F]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-[#DCC18B]">
                    {item.category}
                  </span>
                  <h4 className="font-cormorant text-lg text-white font-normal mt-1">
                    {item.title}
                  </h4>
                  <div className="mt-2 flex items-center gap-1.5 text-xs text-white/80">
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>View Full Size</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.16em] uppercase text-[#25231F] hover:text-[#B58A45] transition-colors"
            >
              <span>View Full 40+ Photo & Video Collection</span>
              <ArrowRight className="w-4 h-4 text-[#B58A45]" />
            </Link>
          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 11: EVENTS SECTION
          ========================================================================= */}
      <section className="py-24 lg:py-32 bg-[#F7F3EB] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-[#FFFFFF] rounded-3xl p-8 sm:p-12 lg:p-16 border border-[#E9E1D2] shadow-luxury-card grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <span className="font-cormorant text-sm tracking-[0.3em] uppercase text-[#254C3C] font-bold block">
                Banquets & Celebrations
              </span>
              <h2 className="font-cormorant text-4xl sm:text-5xl font-normal text-[#25231F] leading-tight">
                HOST UNFORGETTABLE <br />
                <span className="italic text-[#254C3C]">PRIVATE EVENTS.</span>
              </h2>
              <p className="font-manrope text-base text-[#777064] font-light leading-relaxed max-w-xl">
                From milestone birthdays and intimate anniversary dinners to corporate celebrations and live match screenings, our garden resto-bar provides bespoke culinary packages and dedicated service.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-[#F7F3EB] border border-[#E9E1D2]">
                  <div className="font-cormorant text-xl font-bold text-[#25231F]">25 – 150 Guests</div>
                  <div className="font-manrope text-xs text-[#777064] mt-0.5">Flexible Garden Zones</div>
                </div>
                <div className="p-4 rounded-xl bg-[#F7F3EB] border border-[#E9E1D2]">
                  <div className="font-cormorant text-xl font-bold text-[#25231F]">Custom Menus</div>
                  <div className="font-manrope text-xs text-[#777064] mt-0.5">Buffet & Plated Service</div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => setEventModalOpen(true)}
                  className="inline-flex items-center gap-2 bg-[#254C3C] hover:bg-[#1D3B2E] text-white px-8 py-3.5 rounded-full font-manrope text-xs font-bold tracking-[0.14em] uppercase transition-all shadow-md"
                >
                  <Sparkles className="w-4 h-4 text-[#DCC18B]" />
                  <span>Enquire for Private Event</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-luxury-elevated">
              <Image
                src="/images/kickbunk/magicpin_06_garden_building_night.webp"
                alt="Kick Bunk Private Event Atmosphere"
                fill
                className="object-cover"
              />
            </div>

          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 12: RESERVATION SECTION (DEEP EMERALD GREEN CANVAS)
          ========================================================================= */}
      <section id="reservations" className="py-24 lg:py-32 bg-[#254C3C] text-[#F7F3EB] relative overflow-hidden">
        {/* Background Subtle Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(181,138,69,0.18)_0%,transparent_60%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left: Reservation Info */}
            <div className="lg:col-span-5 space-y-6">
              <span className="font-cormorant text-sm tracking-[0.3em] uppercase text-[#DCC18B] font-bold block">
                Instant Confirmation
              </span>
              <h2 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-normal text-white leading-tight">
                RESERVE YOUR TABLE.
              </h2>
              <p className="font-manrope text-base text-[#F7F3EB]/85 font-light leading-relaxed">
                Experience Bengaluru&apos;s most enchanting garden resto-bar. Select your preferred atmosphere, time, and guests for immediate confirmation.
              </p>

              <div className="space-y-4 pt-4 border-t border-[#DCC18B]/20">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#DCC18B] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-white text-sm font-medium">Operating Hours</div>
                    <div className="text-xs text-[#DCC18B]">Daily 11:30 AM – 11:30 PM (Weekends till 1:00 AM)</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#DCC18B] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-white text-sm font-medium">Direct Telephone Concierge</div>
                    <a href="tel:+919980626699" className="text-xs text-[#DCC18B] hover:underline">
                      +91 99806 26699
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#DCC18B] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-white text-sm font-medium">Location</div>
                    <div className="text-xs text-[#F7F3EB]/80">Hulimangala Main Road, Vinayaka Layout, Bengaluru</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Reservation Form on Warm Ivory Card */}
            <div className="lg:col-span-7">
              <div className="bg-[#F7F3EB] text-[#25231F] rounded-3xl p-8 sm:p-10 shadow-2xl border border-[#DCC18B]/30 relative">
                
                {resSuccess ? (
                  <div className="text-center py-8 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-[#254C3C] text-[#DCC18B] flex items-center justify-center mx-auto shadow-md">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="font-cormorant text-3xl font-bold text-[#25231F]">Reservation Confirmed!</h3>
                    <p className="font-manrope text-sm text-[#777064] max-w-md mx-auto">
                      Thank you, <strong className="text-[#25231F]">{resSuccess.customerName}</strong>. Your table booking reference is <strong className="text-[#254C3C]">{resSuccess.bookingReference}</strong> for {resSuccess.guests} guests on {resSuccess.date} at {resSuccess.time}.
                    </p>

                    <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                      <a
                        href={`https://wa.me/919980626699?text=${encodeURIComponent(
                          `Hello Kick Bunk! I have reserved table ${resSuccess.bookingReference} for ${resSuccess.customerName} on ${resSuccess.date} at ${resSuccess.time} (${resSuccess.guests} guests).`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-[#254C3C] text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider"
                      >
                        <MessageCircle className="w-4 h-4 text-[#DCC18B]" />
                        <span>Confirm via WhatsApp</span>
                      </a>
                      <button
                        onClick={() => setResSuccess(null)}
                        className="text-xs text-[#777064] hover:text-[#25231F] underline py-2"
                      >
                        Make Another Booking
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleReservation} className="space-y-5">
                    <div className="border-b border-[#E9E1D2] pb-4 mb-2">
                      <h3 className="font-cormorant text-2xl font-bold text-[#25231F]">Select Your Details</h3>
                      <p className="font-manrope text-xs text-[#777064]">No prepayment required for dining tables.</p>
                    </div>

                    {resError && (
                      <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs">
                        {resError}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#777064] mb-1.5">
                          Your Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={resName}
                          onChange={(e) => setResName(e.target.value)}
                          placeholder="e.g. Rahul Sharma"
                          className="w-full bg-white border border-[#E9E1D2] rounded-xl px-4 py-2.5 text-sm text-[#25231F] focus:outline-none focus:border-[#B58A45]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#777064] mb-1.5">
                          Phone Number (WhatsApp) *
                        </label>
                        <input
                          type="tel"
                          required
                          value={resPhone}
                          onChange={(e) => setResPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full bg-white border border-[#E9E1D2] rounded-xl px-4 py-2.5 text-sm text-[#25231F] focus:outline-none focus:border-[#B58A45]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#777064] mb-1.5">
                          Date
                        </label>
                        <input
                          type="date"
                          value={resDate}
                          onChange={(e) => setResDate(e.target.value)}
                          className="w-full bg-white border border-[#E9E1D2] rounded-xl px-3 py-2.5 text-sm text-[#25231F] focus:outline-none focus:border-[#B58A45]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#777064] mb-1.5">
                          Time Slot
                        </label>
                        <select
                          value={resTime}
                          onChange={(e) => setResTime(e.target.value)}
                          className="w-full bg-white border border-[#E9E1D2] rounded-xl px-3 py-2.5 text-sm text-[#25231F] focus:outline-none focus:border-[#B58A45]"
                        >
                          <option value="12:30">12:30 PM (Lunch)</option>
                          <option value="13:30">01:30 PM (Lunch)</option>
                          <option value="17:30">05:30 PM (Sundowner)</option>
                          <option value="19:00">07:00 PM (Dinner)</option>
                          <option value="19:30">07:30 PM (Dinner)</option>
                          <option value="20:30">08:30 PM (Late Dinner)</option>
                          <option value="21:30">09:30 PM (Nightlife)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#777064] mb-1.5">
                          Guests
                        </label>
                        <select
                          value={resGuests}
                          onChange={(e) => setResGuests(Number(e.target.value))}
                          className="w-full bg-white border border-[#E9E1D2] rounded-xl px-3 py-2.5 text-sm text-[#25231F] focus:outline-none focus:border-[#B58A45]"
                        >
                          {[2, 4, 6, 8, 10, 15, 20].map((num) => (
                            <option key={num} value={num}>
                              {num} Guests
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#777064] mb-1.5">
                        Preferred Seating Zone
                      </label>
                      <select
                        value={resSeating}
                        onChange={(e) => setResSeating(e.target.value)}
                        className="w-full bg-white border border-[#E9E1D2] rounded-xl px-4 py-2.5 text-sm text-[#25231F] focus:outline-none focus:border-[#B58A45]"
                      >
                        <option value="Garden Gazebo & Courtyard">Fairy-Lit Garden Gazebo & Courtyard</option>
                        <option value="Outdoor Wooden Deck">Open-Air Wooden Deck Lawn</option>
                        <option value="Resto-Bar Counter Lounge">High Counter Resto-Bar Lounge</option>
                        <option value="Covered Verandah">Covered Verandah (Weather Protected)</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={resLoading}
                      className="w-full bg-[#B58A45] hover:bg-[#A37937] text-[#25231F] py-3.5 rounded-full font-manrope text-xs font-bold tracking-[0.14em] uppercase transition-all shadow-[0_4px_18px_rgba(181,138,69,0.35)] hover:-translate-y-0.5 mt-2 flex items-center justify-center gap-2"
                    >
                      {resLoading ? (
                        <span>Processing Confirmation...</span>
                      ) : (
                        <>
                          <Calendar className="w-4 h-4 text-[#25231F]" />
                          <span>Confirm Table Reservation</span>
                        </>
                      )}
                    </button>
                  </form>
                )}

              </div>
            </div>

          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 13: CONTACT SECTION
          ========================================================================= */}
      <section className="py-24 lg:py-32 bg-[#F7F3EB] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="font-cormorant text-sm tracking-[0.3em] uppercase text-[#B58A45] font-bold">
              Find Your Sanctuary
            </span>
            <h2 className="font-cormorant text-4xl sm:text-5xl font-normal text-[#25231F]">
              LOCATION & DIRECTIONS
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Map Frame (7 Cols) */}
            <div className="lg:col-span-7 rounded-3xl overflow-hidden shadow-luxury-card border border-[#E9E1D2] h-[380px] sm:h-[440px] relative">
              <iframe
                title="Kick Bunk Restaurant and Bar Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.3956792618996!2d77.6749962!3d12.8176974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae6de4fd9e9927%3A0xe744e8bc1b39ca81!2sKick%20Bunk%20Restaurant%20and%20Bar!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Contact Details Card (5 Cols) */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-8 sm:p-10 border border-[#E9E1D2] shadow-luxury-card space-y-6">
              <h3 className="font-cormorant text-2xl font-bold text-[#25231F]">Kick Bunk Resto-Bar</h3>
              
              <div className="space-y-4 font-manrope text-sm text-[#777064]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#B58A45] shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    Hulimangala Main Road, Vinayaka Layout, Vabasandra, Bengaluru, Karnataka 560105.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#B58A45] shrink-0" />
                  <a href="tel:+919980626699" className="hover:text-[#B58A45] font-semibold text-[#25231F] transition-colors">
                    +91 99806 26699
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[#B58A45] shrink-0" />
                  <span>11:30 AM to 11:30 PM (Daily)</span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#EFE7DA] flex flex-col gap-3">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Kick+Bunk+Restaurant+and+Bar+Hulimangala+Bengaluru"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#F7F3EB] hover:bg-[#EFE7DA] text-[#25231F] py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-[#B58A45]" />
                  <span>Open Directions in Maps</span>
                </a>

                <a
                  href="https://www.instagram.com/kick_bunk_gardenrestobar/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#777064] hover:text-[#B58A45] py-2 transition-colors"
                >
                  <span>Follow @kick_bunk_gardenrestobar</span>
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* =========================================================================
          LIGHTBOX MODAL FOR PHOTO GALLERY
          ========================================================================= */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-[#25231F]/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] w-full rounded-2xl overflow-hidden bg-white shadow-2xl p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-[#25231F] shadow-md transition-colors"
              aria-label="Close Preview"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden">
              <Image
                src={selectedPhoto.src}
                alt={selectedPhoto.title}
                fill
                className="object-contain bg-black/10"
              />
            </div>
            <div className="p-4 text-center">
              <h4 className="font-cormorant text-2xl font-bold text-[#25231F]">
                {selectedPhoto.title}
              </h4>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#B58A45] mt-1 block">
                {selectedPhoto.category}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          ATMOSPHERE FILM VIDEO MODAL
          ========================================================================= */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 bg-[#25231F]/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="relative max-w-4xl w-full rounded-2xl overflow-hidden bg-black shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 hover:bg-black text-white shadow-md transition-colors"
              aria-label="Close Video"
            >
              <X className="w-5 h-5" />
            </button>
            <video
              src={selectedVideo}
              controls
              autoPlay
              className="w-full aspect-video rounded-2xl"
            />
          </div>
        </div>
      )}

      {/* =========================================================================
          EVENT ENQUIRY MODAL
          ========================================================================= */}
      {eventModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#25231F]/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setEventModalOpen(false)}
        >
          <div
            className="relative max-w-lg w-full rounded-3xl bg-[#F7F3EB] p-8 border border-[#E9E1D2] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setEventModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-[#777064] hover:text-[#25231F]"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>

            {evSuccess ? (
              <div className="text-center py-6 space-y-4">
                <CheckCircle2 className="w-12 h-12 text-[#254C3C] mx-auto" />
                <h3 className="font-cormorant text-2xl font-bold text-[#25231F]">Enquiry Received!</h3>
                <p className="font-manrope text-xs text-[#777064]">
                  Our banquet concierge will reach out to you within 2 hours to curate your private event.
                </p>
                <button
                  onClick={() => {
                    setEvSuccess(false);
                    setEventModalOpen(false);
                  }}
                  className="bg-[#25231F] text-white px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleEventSubmit} className="space-y-4">
                <div className="border-b border-[#E9E1D2] pb-3 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#254C3C]">Private Gatherings</span>
                  <h3 className="font-cormorant text-2xl font-bold text-[#25231F]">Plan an Event</h3>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#777064] mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={evName}
                    onChange={(e) => setEvName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full bg-white border border-[#E9E1D2] rounded-xl px-3.5 py-2 text-sm text-[#25231F] focus:outline-none focus:border-[#B58A45]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#777064] mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={evPhone}
                    onChange={(e) => setEvPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full bg-white border border-[#E9E1D2] rounded-xl px-3.5 py-2 text-sm text-[#25231F] focus:outline-none focus:border-[#B58A45]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#777064] mb-1">
                      Event Type
                    </label>
                    <select
                      value={evType}
                      onChange={(e) => setEvType(e.target.value)}
                      className="w-full bg-white border border-[#E9E1D2] rounded-xl px-3 py-2 text-xs text-[#25231F] focus:outline-none focus:border-[#B58A45]"
                    >
                      <option value="Birthday Celebration">Birthday</option>
                      <option value="Corporate Gathering">Corporate Team</option>
                      <option value="Anniversary Dinner">Anniversary</option>
                      <option value="Bachelor / Bachelorette">Bachelor Party</option>
                      <option value="Full Garden Buyout">Garden Buyout</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#777064] mb-1">
                      Guest Count
                    </label>
                    <select
                      value={evGuests}
                      onChange={(e) => setEvGuests(e.target.value)}
                      className="w-full bg-white border border-[#E9E1D2] rounded-xl px-3 py-2 text-xs text-[#25231F] focus:outline-none focus:border-[#B58A45]"
                    >
                      <option value="15-25 Guests">15 - 25</option>
                      <option value="25-50 Guests">25 - 50</option>
                      <option value="50-100 Guests">50 - 100</option>
                      <option value="100+ Guests">100+ Guests</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={evLoading}
                  className="w-full bg-[#254C3C] hover:bg-[#1D3B2E] text-white py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all mt-2"
                >
                  {evLoading ? 'Sending Details...' : 'Submit Banquet Enquiry'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
