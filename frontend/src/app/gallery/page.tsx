'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Sparkles,
  X,
  Play,
  ZoomIn,
  Camera,
  ArrowRight,
  Calendar,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  const galleryItems = [
    {
      id: 'g-1',
      title: 'Illuminated Kick Bunk Entrance at Night',
      category: 'ARCHITECTURE',
      url: '/images/kickbunk/magicpin_02_entrance_night.webp',
      desc: 'Golden entrance arch welcoming guests beneath Bangalore evening skies.',
    },
    {
      id: 'g-2',
      title: 'Daytime Entrance with Official KICK BUNK Signage',
      category: 'ARCHITECTURE',
      url: '/images/kickbunk/google_02_entrance_daytime_sign.jpg',
      desc: 'Arrival porch and landscaped flora along Hulimangala Main Road.',
    },
    {
      id: 'g-3',
      title: 'Fairy-Lit Garden Canopy & Trees',
      category: 'GARDEN',
      url: '/images/kickbunk/google_01_garden_lights_night.jpg',
      desc: 'Bespoke canopy illumination creating starlit outdoor ambience.',
    },
    {
      id: 'g-4',
      title: 'Garden Courtyard Dining Tables',
      category: 'GARDEN',
      url: '/images/kickbunk/google_03_garden_courtyard.jpg',
      desc: 'Intimate alfresco seating enveloped by vibrant tropical foliage.',
    },
    {
      id: 'g-5',
      title: 'Aerial View of Garden Seating & Cabanas',
      category: 'GARDEN',
      url: '/images/kickbunk/google_04_aerial_garden_seating.jpg',
      desc: 'Sprawling outdoor layout with dedicated private dining zones.',
    },
    {
      id: 'g-6',
      title: 'Open Terrace & Upper Deck View',
      category: 'GARDEN',
      url: '/images/kickbunk/google_05_outdoor_terrace_view.jpg',
      desc: 'Elevated vantage point overlooking the lush botanical resto-bar.',
    },
    {
      id: 'g-7',
      title: 'Signature Kalmi Kebab Fresh from the Tandoor',
      category: 'CUISINE',
      url: '/images/kickbunk/magicpin_01_kalmi_kebab.webp',
      desc: 'Richly marinated chicken drumsticks charred over live embers.',
    },
    {
      id: 'g-8',
      title: 'Resto-Bar Dining Feast & Starters',
      category: 'CUISINE',
      url: '/images/kickbunk/magicpin_04_food_spread_dining.webp',
      desc: 'Generous sharing platters tailored for social gatherings.',
    },
    {
      id: 'g-9',
      title: 'Resto-Bar Interior Lounge & High Counters',
      category: 'NIGHTLIFE',
      url: '/images/kickbunk/restaurant_guru_interior.jpg',
      desc: 'Atmospheric high counter seating directly facing the mixology bar.',
    },
    {
      id: 'g-10',
      title: 'Main Building Illumination & Resto-Bar',
      category: 'NIGHTLIFE',
      url: '/images/kickbunk/magicpin_06_garden_building_night.webp',
      desc: 'Architectural lighting reflecting off outdoor water elements.',
    },
    {
      id: 'g-11',
      title: 'Daylight Open-Air Lawn Seating',
      category: 'GARDEN',
      url: '/images/kickbunk/magicpin_07_outdoor_seating_daylight.webp',
      desc: 'Sunlit wooden tables ideal for leisurely weekend garden brunches.',
    },
    {
      id: 'g-12',
      title: 'Night Garden Pathway & Lanterns',
      category: 'NIGHTLIFE',
      url: '/images/kickbunk/magicpin_09_garden_pathway_night.webp',
      desc: 'Softly lit stone walkway leading to exclusive VIP garden cabanas.',
    },
    {
      id: 'g-13',
      title: 'Decorative Tree Canopy Seating',
      category: 'GARDEN',
      url: '/images/kickbunk/magicpin_10_decorative_tree_seating.webp',
      desc: 'Tables encircling heritage trees adorned with fairy lights.',
    },
    {
      id: 'g-14',
      title: 'Covered Verandah Seating',
      category: 'ARCHITECTURE',
      url: '/images/kickbunk/magicpin_13_covered_indoor_seating.webp',
      desc: 'Sheltered pavilion providing full comfort with garden vistas.',
    },
    {
      id: 'g-15',
      title: 'Stone Steps & Arrival Walkway',
      category: 'ARCHITECTURE',
      url: '/images/kickbunk/magicpin_14_entrance_steps_walkway.webp',
      desc: 'Elegant stone masonry arrival entrance.',
    },
    {
      id: 'g-16',
      title: 'Outdoor Dining Canopies',
      category: 'GARDEN',
      url: '/images/kickbunk/yappe_outdoor_canopy.webp',
      desc: 'Weather-ready canopy seating for intimate dinners.',
    },
  ];

  const categories = [
    { id: 'ALL', name: 'ALL CHRONICLES' },
    { id: 'GARDEN', name: 'GARDEN & LAWNS' },
    { id: 'NIGHTLIFE', name: 'RESTO-BAR & NIGHTS' },
    { id: 'CUISINE', name: 'FOOD & KEBABS' },
    { id: 'ARCHITECTURE', name: 'ARCHITECTURE & COURTYARDS' },
  ];

  const filteredItems =
    activeFilter === 'ALL'
      ? galleryItems
      : galleryItems.filter((i) => i.category === activeFilter);

  return (
    <div className="bg-[#EFE7DA] text-[#25231F] min-h-screen pt-28 pb-24">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F7F3EB] border border-[#E9E1D2] text-[#B58A45] text-xs font-semibold tracking-[0.2em] uppercase shadow-sm">
          <Camera className="w-3.5 h-3.5" />
          <span>Visual Editorial</span>
        </div>

        <h1 className="font-cormorant text-5xl sm:text-6xl md:text-7xl font-normal text-[#25231F] tracking-tight">
          CHRONICLES OF ELEGANCE.
        </h1>

        <p className="max-w-2xl mx-auto font-manrope text-sm sm:text-base text-[#777064] font-light leading-relaxed">
          An authentic photographic journey through Kick Bunk&apos;s botanical gardens, vibrant resto-bar nightlife, and charcoal-grilled culinary creations.
        </p>

        {/* Filters */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-5 py-2.5 rounded-full font-manrope text-xs font-bold tracking-[0.14em] uppercase transition-all duration-300 ${
                activeFilter === cat.id
                  ? 'bg-[#25231F] text-white shadow-md'
                  : 'bg-[#F7F3EB] text-[#777064] hover:bg-white border border-[#E9E1D2]'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Editorial Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group bg-white rounded-2xl overflow-hidden shadow-luxury-soft cursor-pointer border border-[#E9E1D2] hover:border-[#B58A45] transition-all duration-300 hover:shadow-luxury-card flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#F7F3EB]">
                <Image
                  src={item.url}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#25231F]/80 backdrop-blur-sm text-[#DCC18B] text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-md">
                  {item.category}
                </span>
              </div>

              <div className="p-5 space-y-1.5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-cormorant text-xl font-normal text-[#25231F] leading-snug">
                    {item.title}
                  </h3>
                  <p className="font-manrope text-xs text-[#777064] font-light leading-relaxed mt-1">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#EFE7DA] flex items-center justify-between text-[11px] font-semibold text-[#B58A45]">
                  <span>Enlarge Photo</span>
                  <ZoomIn className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Reserve Table Strip */}
        <div className="mt-16 bg-[#254C3C] text-white rounded-3xl p-8 sm:p-12 text-center space-y-4 shadow-luxury-elevated">
          <h2 className="font-cormorant text-3xl sm:text-4xl font-normal text-white">
            Experience These Moments in Person.
          </h2>
          <p className="max-w-xl mx-auto font-manrope text-xs sm:text-sm text-[#F7F3EB]/85 font-light">
            Step into the starlit gardens of Hulimangala. Reserve your table or private gazebo today.
          </p>
          <div className="pt-2">
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 bg-[#B58A45] hover:bg-[#A37937] text-[#25231F] px-8 py-3.5 rounded-full font-manrope text-xs font-bold tracking-[0.14em] uppercase transition-all shadow-md"
            >
              <Calendar className="w-4 h-4" />
              <span>Reserve a Garden Table</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 bg-[#25231F]/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] w-full bg-white rounded-3xl overflow-hidden shadow-2xl p-3 border border-[#E9E1D2]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-5 right-5 z-10 p-2.5 rounded-full bg-white/90 hover:bg-white text-[#25231F] shadow-lg transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-[#F7F3EB]">
              <Image
                src={selectedItem.url}
                alt={selectedItem.title}
                fill
                className="object-contain"
              />
            </div>

            <div className="p-6 text-center space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#B58A45]">
                {selectedItem.category}
              </span>
              <h3 className="font-cormorant text-2xl sm:text-3xl font-bold text-[#25231F]">
                {selectedItem.title}
              </h3>
              <p className="font-manrope text-xs text-[#777064] max-w-lg mx-auto">
                {selectedItem.desc}
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
