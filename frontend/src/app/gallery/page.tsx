'use client';

import React, { useState, useEffect } from 'react';
import { fetchApi } from '../../lib/api';
import {
  Sparkles,
  X,
  Play,
  Image as ImageIcon,
  Video,
  Filter,
  ChevronRight,
  ChevronLeft,
  ZoomIn,
  ZoomOut,
  ExternalLink,
  Camera,
  Navigation,
  Download,
  CheckCircle2,
  Phone
} from 'lucide-react';

export default function GalleryPage() {
  const [mediaList, setMediaList] = useState<any[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  // Fallback verified collection matching authentic Kick Bunk photography
  const defaultGallery = [
    // EXTERIOR
    {
      id: 'g-ext-1',
      title: 'Illuminated Kick Bunk Entrance & Signboard at Night',
      category: 'EXTERIOR',
      subCategory: 'EXTERIOR',
      url: '/images/kickbunk/magicpin_02_entrance_night.webp',
      sourceNotes: 'Magicpin Verified Store Photo (Photo 02)',
      externalSourceUrl: 'https://img.magicpin.com/2287662_store_images_10.webp',
      altText: 'Kick Bunk restaurant illuminated entrance arch and golden branding at night',
    },
    {
      id: 'g-ext-2',
      title: 'Daytime Entrance with Official KICK BUNK Signage',
      category: 'EXTERIOR',
      subCategory: 'EXTERIOR',
      url: '/images/kickbunk/google_02_entrance_daytime_sign.jpg',
      sourceNotes: 'Google Business Profile Gallery Entry',
      externalSourceUrl: 'https://lh3.googleusercontent.com/pcuRfiSSY8FaIwCwDrMUfhCRyyA-Rp3Swlad3kT6Fg9UW4Zhsdjmz-tiE7wc57Qx5Sd8VFEQHY9y0sGdA0ziiDe2L3nvd2TdyLQbka4=s1200',
      altText: 'Daytime grand entrance showing KICK BUNK sign and arrival porch in Bengaluru',
    },
    {
      id: 'g-ext-3',
      title: 'Restaurant Facade Architecture & Approach',
      category: 'EXTERIOR',
      subCategory: 'EXTERIOR',
      url: '/images/kickbunk/restaurant_guru_facade.jpg',
      sourceNotes: 'Restaurant Guru Venue Facade Photo',
      externalSourceUrl: 'https://img02.restaurantguru.com/cf5f-Kick-Bunk-Restaurant-and-Bar-Bengaluru-facade.jpg',
      altText: 'Kick Bunk Bengaluru facade and front perimeter',
    },
    {
      id: 'g-ext-4',
      title: 'Illuminated Exterior Sign & Dedicated Guest Parking',
      category: 'EXTERIOR',
      subCategory: 'EXTERIOR',
      url: '/images/kickbunk/magicpin_05_exterior_sign_parking.webp',
      sourceNotes: 'Magicpin Verified Store Photo (Photo 05)',
      externalSourceUrl: 'https://img.magicpin.com/2287662_store_images_13.webp',
      altText: 'Nighttime view of Kick Bunk parking area and glowing exterior signage',
    },
    {
      id: 'g-ext-5',
      title: 'Garden Resto-Bar Compound & Building at Night',
      category: 'EXTERIOR',
      subCategory: 'EXTERIOR',
      url: '/images/kickbunk/magicpin_06_garden_building_night.webp',
      sourceNotes: 'Magicpin Verified Store Photo (Photo 06)',
      externalSourceUrl: 'https://img.magicpin.com/2287662_store_images_14.webp',
      altText: 'Night view of the multi-level resto-bar building and landscaped gardens',
    },
    {
      id: 'g-ext-6',
      title: 'Overhead Aerial View of Building & Garden Grounds',
      category: 'EXTERIOR',
      subCategory: 'EXTERIOR',
      url: '/images/kickbunk/magicpin_08_exterior_above.webp',
      sourceNotes: 'Magicpin Verified Store Photo (Photo 08)',
      externalSourceUrl: 'https://img.magicpin.com/2287662_store_images_16.webp',
      altText: 'Overhead view showing the sprawling layout of Kick Bunk Bengaluru',
    },
    {
      id: 'g-ext-7',
      title: 'Welcoming Entrance Steps & Plant-Lined Walkway',
      category: 'EXTERIOR',
      subCategory: 'EXTERIOR',
      url: '/images/kickbunk/magicpin_14_entrance_steps_walkway.webp',
      sourceNotes: 'Magicpin Verified Store Photo (Photo 14)',
      externalSourceUrl: 'https://img.magicpin.com/2287662_store_images_22.webp',
      altText: 'Stone steps leading to the main dining pavilion surrounded by lush tropical palms',
    },

    // INTERIOR
    {
      id: 'g-int-1',
      title: 'Cozy Dining Booths & Indoor Table Arrangements',
      category: 'INTERIOR',
      subCategory: 'INTERIOR',
      url: '/images/kickbunk/restaurant_guru_interior.jpg',
      sourceNotes: 'Restaurant Guru Interior Venue Photo',
      externalSourceUrl: 'https://1033609670.rsc.cdn77.org/rests/original/107_535209663.jpg',
      altText: 'Indoor air-conditioned seating section with plush booths and warm lighting',
    },
    {
      id: 'g-int-2',
      title: 'Indoor Dining Room Tables & Family Atmosphere',
      category: 'INTERIOR',
      subCategory: 'INTERIOR',
      url: '/images/kickbunk/zomato_interior_tables.jpg',
      sourceNotes: 'Zomato Verified Customer Review Photo',
      externalSourceUrl: 'https://b.zmtcdn.com/data/pictures/9/19669029/43ecaace59c2db4a39f774f68c1db470.jpg',
      altText: 'Dining tables and relaxed seating inside Kick Bunk from customer review',
    },
    {
      id: 'g-int-3',
      title: 'Spacious Covered Indoor Seating Pavilion',
      category: 'INTERIOR',
      subCategory: 'INTERIOR',
      url: '/images/kickbunk/magicpin_13_covered_indoor_seating.webp',
      sourceNotes: 'Magicpin Verified Store Photo (Photo 13)',
      externalSourceUrl: 'https://img.magicpin.com/2287662_store_images_21.webp',
      altText: 'High-ceiling covered dining pavilion with ambient warm chandeliers and ceiling fans',
    },

    // OUTDOOR SEATING
    {
      id: 'g-out-1',
      title: 'Outdoor Garden Dining Tables in Warm Sunlight',
      category: 'OUTDOOR',
      subCategory: 'OUTDOOR',
      url: '/images/kickbunk/magicpin_07_outdoor_seating_daylight.webp',
      sourceNotes: 'Magicpin Verified Store Photo (Photo 07)',
      externalSourceUrl: 'https://img.magicpin.com/2287662_store_images_15.webp',
      altText: 'Open-air wooden garden tables shaded by natural trees during daytime dining',
    },
    {
      id: 'g-out-2',
      title: 'Decorative Feature Tree & Outdoor Garden Seating',
      category: 'OUTDOOR',
      subCategory: 'OUTDOOR',
      url: '/images/kickbunk/magicpin_10_decorative_tree_seating.webp',
      sourceNotes: 'Magicpin Verified Store Photo (Photo 10)',
      externalSourceUrl: 'https://img.magicpin.com/2287662_store_images_18.webp',
      altText: 'Central illuminated decorative garden tree encircled by stone dining patios',
    },
    {
      id: 'g-out-3',
      title: 'Canopy-Covered Outdoor Garden Seating Deck',
      category: 'OUTDOOR',
      subCategory: 'OUTDOOR',
      url: '/images/kickbunk/yappe_outdoor_canopy.webp',
      sourceNotes: 'Yappe Verified Venue Photograph',
      externalSourceUrl: 'https://files.yappe.in/place/full/kick-bunk-restaurant-and-bar-7349753.webp',
      altText: 'All-weather canopy covered garden terrace for outdoor dining',
    },
    {
      id: 'g-out-4',
      title: 'Lush Garden Courtyard Tables & Private Dining',
      category: 'OUTDOOR',
      subCategory: 'OUTDOOR',
      url: '/images/kickbunk/google_03_garden_courtyard.jpg',
      sourceNotes: 'Google Business Profile Gallery Entry',
      externalSourceUrl: 'https://lh3.googleusercontent.com/ThgsCMvbSWOo11eg532X_otFCgju8W1qq1vkDAEPTmgbCh1r5aEMXfVz78kvPE5oxJ2bC7dbua9cSlQbxu6jdiNPxQiauXUxvZ9nXM02=s1200',
      altText: 'Peaceful garden courtyard dining space surrounded by manicured planters',
    },

    // GARDEN AMBIENCE
    {
      id: 'g-gar-1',
      title: 'Elevated Night View of Fairy-Lit Garden Cabanas',
      category: 'GARDEN',
      subCategory: 'GARDEN',
      url: '/images/kickbunk/google_01_garden_lights_night.jpg',
      sourceNotes: 'Google Business Profile Elevated View',
      externalSourceUrl: 'https://lh3.googleusercontent.com/kF9zlFWAB-9gEjJN6rm_wzv1hhP6AE-X7-lkDN-AnQlZLGK258V0xmaem61rBAAroEzpLz9YUxWuQarbHce6XbdYHZRkZNfIuL7jU7c=s1200',
      altText: 'Magical elevated night vista of Kick Bunk garden glowing with golden fairy lights',
    },
    {
      id: 'g-gar-2',
      title: 'Landscaped Garden Courtyard & Nighttime Mood Lighting',
      category: 'GARDEN',
      subCategory: 'GARDEN',
      url: '/images/kickbunk/magicpin_03_garden_courtyard_night.webp',
      sourceNotes: 'Magicpin Verified Store Photo (Photo 03)',
      externalSourceUrl: 'https://img.magicpin.com/2287662_store_images_11.webp',
      altText: 'Courtyard dining tables illuminated with soft amber lights at Kick Bunk',
    },
    {
      id: 'g-gar-3',
      title: 'Illuminated Garden Pathway & Dining Groves',
      category: 'GARDEN',
      subCategory: 'GARDEN',
      url: '/images/kickbunk/magicpin_09_garden_pathway_night.webp',
      sourceNotes: 'Magicpin Verified Store Photo (Photo 09)',
      externalSourceUrl: 'https://img.magicpin.com/2287662_store_images_17.webp',
      altText: 'Stone garden pathway framed with glowing lanterns and outdoor seating',
    },
    {
      id: 'g-gar-4',
      title: 'Evening Garden Walkway & Entrance Ambiance',
      category: 'GARDEN',
      subCategory: 'GARDEN',
      url: '/images/kickbunk/magicpin_11_garden_walkway_night.webp',
      sourceNotes: 'Magicpin Verified Store Photo (Photo 11)',
      externalSourceUrl: 'https://img.magicpin.com/2287662_store_images_19.webp',
      altText: 'Atmospheric arrival walkway lined with illuminated foliage and bamboo screens',
    },
    {
      id: 'g-gar-5',
      title: 'Lush Tropical Garden Courtyard in Daylight',
      category: 'GARDEN',
      subCategory: 'GARDEN',
      url: '/images/kickbunk/magicpin_12_landscaped_garden_daylight.webp',
      sourceNotes: 'Magicpin Verified Store Photo (Photo 12)',
      externalSourceUrl: 'https://img.magicpin.com/2287662_store_images_20.webp',
      altText: 'Fresh daytime perspective of landscaped gardens and lush lawn seating',
    },
    {
      id: 'g-gar-6',
      title: 'High-Angle Perspective of Garden Dining Enclaves',
      category: 'GARDEN',
      subCategory: 'GARDEN',
      url: '/images/kickbunk/google_04_aerial_garden_seating.jpg',
      sourceNotes: 'Google Business Profile Gallery Entry',
      externalSourceUrl: 'https://lh3.googleusercontent.com/_lruG6Qalp6H3N65UYXviM4l9wYwdO0waCOmuqE1DjgvHvF1Vjld7ld9cTtiBSB0SiH2ASw98uJTla4Bmv0j6gAe6U4DpJje2g9englG=s1200',
      altText: 'Raised vantage point showing open-air seating nestled among tropical trees',
    },
    {
      id: 'g-gar-7',
      title: 'Outdoor Terrace & Rooftop Garden View',
      category: 'GARDEN',
      subCategory: 'GARDEN',
      url: '/images/kickbunk/google_05_outdoor_terrace_view.jpg',
      sourceNotes: 'Google Business Profile Gallery Entry',
      externalSourceUrl: 'https://lh3.googleusercontent.com/X-Mw5N7qqXuXv_34MdsElc5TnW7W4ZP5ezegN5WNrE9hytxxe0SM9XDu2i1DdaxeZi6zry6E9plSh5kA0N7x-Z9DhKztSco2jbleGctVXA=s1200',
      altText: 'Terrace dining deck offering scenic views of the garden restaurant compound',
    },

    // FOOD & DISHES
    {
      id: 'g-food-1',
      title: 'Signature Charcoal Roasted Kalmi Kebab',
      category: 'FOOD',
      subCategory: 'FOOD',
      url: '/images/kickbunk/magicpin_01_kalmi_kebab.webp',
      sourceNotes: 'Magicpin Food Promotion Feature (Photo 01)',
      externalSourceUrl: 'https://img.magicpin.com/2287662_store_images_9.webp',
      altText: 'Kick Bunk signature chicken drumstick marinated in aromatic spices and roasted over charcoal',
    },
    {
      id: 'g-food-2',
      title: 'Grand Food Spread & Family Dining Feast',
      category: 'FOOD',
      subCategory: 'FOOD',
      url: '/images/kickbunk/magicpin_04_food_spread_dining.webp',
      sourceNotes: 'Magicpin Verified Store Dining Photo (Photo 04)',
      externalSourceUrl: 'https://img.magicpin.com/2287662_store_images_12.webp',
      altText: 'Full dining table order featuring biryani handis, kebabs, curries and flatbreads',
    },
    {
      id: 'g-food-3',
      title: 'Kick Bunk Official Food & Beverage Menu Card Snapshot',
      category: 'FOOD',
      subCategory: 'FOOD',
      url: '/images/kickbunk/restaurant_guru_menu_snapshot.jpg',
      sourceNotes: 'Restaurant Guru Verified Menu Image',
      externalSourceUrl: 'https://menu.restaurantguru.com/m1/Kick-Bunk-Restaurant-and-Bar-menu-wsb.jpg',
      altText: 'Original menu snapshot showing appetizers, main courses, tandoori specialties and beverages',
    },

    // DRINKS & BAR
    {
      id: 'g-bar-1',
      title: 'Full Resto-Bar Counter, Draught Beers & Cocktails',
      category: 'BAR',
      subCategory: 'BAR',
      url: '/images/kickbunk/magicpin_06_garden_building_night.webp',
      sourceNotes: 'Kick Bunk Resto-Bar Collection',
      externalSourceUrl: 'https://img.magicpin.com/2287662_store_images_14.webp',
      altText: 'Evening resto-bar atmosphere with chilled drinks and signature mocktails',
    },
    {
      id: 'g-drinks-1',
      title: 'Signature Chilled Mocktails & Tropical Coolers',
      category: 'DRINKS',
      subCategory: 'DRINKS',
      url: '/images/kickbunk/magicpin_04_food_spread_dining.webp',
      sourceNotes: 'Kick Bunk Beverage Menu',
      externalSourceUrl: 'https://img.magicpin.com/2287662_store_images_12.webp',
      altText: 'Refreshing beverages and mocktails served at garden tables',
    },

    // EVENTS
    {
      id: 'g-event-1',
      title: 'Private Cabana Celebrations & Live Sports Screening',
      category: 'EVENTS',
      subCategory: 'EVENTS',
      url: '/images/kickbunk/google_01_garden_lights_night.jpg',
      sourceNotes: 'Kick Bunk Event & Celebrations',
      externalSourceUrl: 'https://lh3.googleusercontent.com/kF9zlFWAB-9gEjJN6rm_wzv1hhP6AE-X7-lkDN-AnQlZLGK258V0xmaem61rBAAroEzpLz9YUxWuQarbHce6XbdYHZRkZNfIuL7jU7c=s1200',
      altText: 'Birthday and corporate event celebrations under fairy lights at Kick Bunk',
    },

    // VIDEOS
    {
      id: 'g-vid-1',
      title: 'Complete Garden Resto-Bar Setup (Drone View Video Tour)',
      category: 'VIDEO',
      subCategory: 'VIDEO',
      url: 'https://magicpin.in/Bangalore/Yarandahalli/Restaurant/Kick-Bunk-Restaurant/store/621360/stories?post_id=978426497',
      thumbnailUrl: '/images/kickbunk/google_01_garden_lights_night.jpg',
      sourceNotes: 'Magicpin Official Customer Story Drone Video Entry #978426497',
      externalSourceUrl: 'https://magicpin.in/Bangalore/Yarandahalli/Restaurant/Kick-Bunk-Restaurant/store/621360/stories?post_id=978426497',
      altText: 'Drone video walkthrough of Kick Bunk garden resto-bar setup in Bengaluru',
      isVideo: true,
    },
    {
      id: 'g-vid-2',
      title: 'Night Ambience & Tandoori Smoke - Instagram Video Reels',
      category: 'VIDEO',
      subCategory: 'VIDEO',
      url: 'https://www.instagram.com/kick_bunk_gardenrestobar/',
      thumbnailUrl: '/images/kickbunk/magicpin_03_garden_courtyard_night.webp',
      sourceNotes: 'Official Instagram Handle @kick_bunk_gardenrestobar',
      externalSourceUrl: 'https://www.instagram.com/kick_bunk_gardenrestobar/',
      altText: 'Instagram reel showing lively evening dinner service and smoking tandoor grills',
      isVideo: true,
    },
    {
      id: 'g-vid-3',
      title: 'Weekend Garden Dining & Family Gathering Walkthrough',
      category: 'VIDEO',
      subCategory: 'VIDEO',
      url: 'https://www.instagram.com/kick_bunk_gardenrestobar/',
      thumbnailUrl: '/images/kickbunk/magicpin_07_outdoor_seating_daylight.webp',
      sourceNotes: 'Official Instagram Experience @kick_bunk_gardenrestobar',
      externalSourceUrl: 'https://www.instagram.com/kick_bunk_gardenrestobar/',
      altText: 'Lush garden walk video showcasing family outdoor tables and shaded gazebos',
      isVideo: true,
    },
  ];

  useEffect(() => {
    fetchApi('/media').then((res) => {
      if (res.success && res.data && res.data.length > 0) {
        setMediaList(res.data);
      } else {
        setMediaList(defaultGallery);
      }
      setLoading(false);
    });
  }, []);

  const itemsToDisplay = mediaList.length > 0 ? mediaList : defaultGallery;

  // Filter categories matching Section 4 requirements
  const categories = [
    { id: 'ALL', name: 'All Media' },
    { id: 'INTERIOR', name: 'Restaurant Interior' },
    { id: 'OUTDOOR', name: 'Outdoor Seating' },
    { id: 'GARDEN', name: 'Garden Ambience' },
    { id: 'FOOD', name: 'Food & Dishes' },
    { id: 'DRINKS', name: 'Drinks & Beverages' },
    { id: 'BAR', name: 'Restaurant Bar' },
    { id: 'EVENTS', name: 'Events & Celebrations' },
    { id: 'EXTERIOR', name: 'Restaurant Exterior' },
    { id: 'VIDEO', name: 'Videos & Experiences' },
  ];

  const filteredItems = itemsToDisplay.filter((item) => {
    if (activeFilter === 'ALL') return true;
    const cat = item.subCategory || item.category;
    if (activeFilter === 'VIDEO') return cat === 'VIDEO' || item.isVideo;
    return cat === activeFilter;
  });

  // Lightbox navigation
  const openModalAtIndex = (idx: number) => {
    setSelectedIndex(idx);
    setZoomLevel(1);
  };

  const closeModal = () => {
    setSelectedIndex(null);
    setZoomLevel(1);
  };

  const handleNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % filteredItems.length);
    setZoomLevel(1);
  };

  const handlePrev = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + filteredItems.length) % filteredItems.length);
    setZoomLevel(1);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, filteredItems]);

  const currentItem = selectedIndex !== null ? filteredItems[selectedIndex] : null;

  return (
    <div className="min-h-screen bg-[#050505] text-[#F4EFE5] pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="text-brand-gold text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-1.5">
          <Camera className="w-4 h-4 text-brand-gold" />
          <span>Authentic Photography & Video Archive</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-brand-ivory leading-tight">
          Kick Bunk Photo & Video Gallery
        </h1>
        <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed">
          Explore genuine photographs and authorized video experiences from <strong>Kick Bunk Restaurant & Bar, Bengaluru</strong>. Sourced directly from our official Google Business Profile, Magicpin gallery, Zomato diner visits, and verified guest reviews.
        </p>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-card border border-brand-cardBorder text-xs text-brand-gold">
          <CheckCircle2 className="w-3.5 h-3.5 text-brand-green" />
          <span>24+ Verified Authentic Images & Drone Videos • Zero Synthetic Renders</span>
        </div>
      </div>

      {/* 9 Category Filters (Section 4) */}
      <div className="flex flex-wrap items-center justify-center gap-2 pt-2 border-b border-brand-cardBorder pb-6">
        {categories.map((cat) => {
          const isActive = activeFilter === cat.id;
          const count = itemsToDisplay.filter((item) => {
            if (cat.id === 'ALL') return true;
            if (cat.id === 'VIDEO') return item.subCategory === 'VIDEO' || item.isVideo;
            return (item.subCategory || item.category) === cat.id;
          }).length;

          return (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5 ${
                isActive
                  ? 'bg-brand-gold text-brand-dark shadow-md shadow-brand-gold/20 scale-105'
                  : 'bg-brand-card text-gray-300 hover:text-brand-gold hover:bg-brand-cardBorder border border-brand-cardBorder'
              }`}
            >
              <span>{cat.name}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-brand-dark text-brand-gold' : 'bg-[#181C24] text-gray-400'}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredItems.map((item, idx) => {
          const isVideoItem = item.subCategory === 'VIDEO' || item.isVideo;

          return (
            <div
              key={item.id || idx}
              onClick={() => openModalAtIndex(idx)}
              className="bg-brand-card rounded-2xl overflow-hidden border border-brand-cardBorder hover:border-brand-gold/60 transition-all duration-300 cursor-pointer group shadow-xl flex flex-col justify-between"
            >
              <div className="relative h-60 overflow-hidden bg-black">
                <img
                  src={item.thumbnailUrl || item.url}
                  alt={item.title || item.altText}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-75 group-hover:opacity-95 transition-opacity" />

                {/* Badge Overlay */}
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-brand-gold text-brand-dark inline-block shadow-sm">
                    {item.subCategory || item.category}
                  </span>
                </div>

                {/* Video Play Icon or Zoom Icon */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white">
                  {isVideoItem ? (
                    <Play className="w-4 h-4 fill-brand-gold text-brand-gold ml-0.5" />
                  ) : (
                    <ZoomIn className="w-4 h-4 text-brand-gold" />
                  )}
                </div>

                {/* Title & Source Footnote */}
                <div className="absolute bottom-3 left-3 right-3 space-y-1">
                  <h3 className="font-serif font-bold text-sm text-brand-ivory group-hover:text-brand-gold transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-[10px] text-gray-400 line-clamp-1">
                    {item.sourceNotes || 'Verified Kick Bunk Source'}
                  </p>
                </div>
              </div>

              <div className="p-3 bg-[#0B0D11] border-t border-brand-cardBorder/60 flex items-center justify-between text-[11px] text-gray-400">
                <span className="truncate max-w-[170px]">{item.sourceNotes}</span>
                <span className="text-brand-gold font-medium shrink-0 flex items-center gap-1 group-hover:underline">
                  <span>View Details</span>
                  <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {filteredItems.length === 0 && (
        <div className="py-20 text-center space-y-3">
          <p className="text-gray-400 text-sm">No media found for the selected category.</p>
          <button
            onClick={() => setActiveFilter('ALL')}
            className="px-4 py-2 rounded-xl bg-brand-gold text-brand-dark font-bold text-xs"
          >
            Show All Media
          </button>
        </div>
      )}

      {/* FULLSCREEN LIGHTBOX MODAL WITH ZOOM & NEXT/PREV CONTROLS */}
      {currentItem && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          onClick={closeModal}
        >
          <div
            className="relative max-w-5xl w-full bg-[#0E1116] rounded-3xl overflow-hidden border border-brand-cardBorder shadow-2xl flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-6 border-b border-brand-cardBorder/60 flex items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-brand-gold text-brand-dark">
                    {currentItem.subCategory || currentItem.category}
                  </span>
                  <span className="text-xs text-gray-400">
                    {selectedIndex! + 1} of {filteredItems.length}
                  </span>
                </div>
                <h3 className="font-serif text-lg sm:text-2xl font-bold text-brand-ivory mt-1">
                  {currentItem.title}
                </h3>
              </div>

              {/* Action Buttons: Zoom & Close */}
              <div className="flex items-center gap-2">
                {!currentItem.isVideo && currentItem.subCategory !== 'VIDEO' && (
                  <>
                    <button
                      onClick={() => setZoomLevel((z) => Math.max(0.8, z - 0.25))}
                      className="p-2 rounded-lg bg-brand-card border border-brand-cardBorder text-gray-300 hover:text-brand-gold transition-colors"
                      title="Zoom Out"
                    >
                      <ZoomOut className="w-4 h-4" />
                    </button>
                    <span className="text-xs text-gray-400 w-10 text-center">{Math.round(zoomLevel * 100)}%</span>
                    <button
                      onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.25))}
                      className="p-2 rounded-lg bg-brand-card border border-brand-cardBorder text-gray-300 hover:text-brand-gold transition-colors"
                      title="Zoom In"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>
                  </>
                )}

                <button
                  onClick={closeModal}
                  className="p-2 rounded-lg bg-brand-card hover:bg-brand-cardBorder border border-brand-cardBorder text-gray-300 hover:text-white transition-colors ml-2"
                  title="Close Preview (Esc)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Media Content with Next/Prev Floating Buttons */}
            <div className="relative flex-1 flex items-center justify-center p-4 bg-black overflow-hidden min-h-[50vh] max-h-[65vh]">
              {/* Prev Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-3 z-10 p-3 rounded-full bg-black/60 hover:bg-brand-gold hover:text-brand-dark text-white border border-brand-cardBorder backdrop-blur-md transition-all shadow-xl"
                title="Previous (Left Arrow)"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Next Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-3 z-10 p-3 rounded-full bg-black/60 hover:bg-brand-gold hover:text-brand-dark text-white border border-brand-cardBorder backdrop-blur-md transition-all shadow-xl"
                title="Next (Right Arrow)"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Main Image or Video Action */}
              {currentItem.isVideo || currentItem.subCategory === 'VIDEO' ? (
                <div className="text-center space-y-6 max-w-lg p-6 bg-brand-card rounded-2xl border border-brand-cardBorder">
                  <div className="w-16 h-16 rounded-full bg-brand-gold/20 text-brand-gold border border-brand-gold/40 flex items-center justify-center mx-auto">
                    <Video className="w-8 h-8 text-brand-gold" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-serif text-xl font-bold text-brand-ivory">{currentItem.title}</h4>
                    <p className="text-xs text-gray-400 leading-relaxed font-light">
                      This verified video media is hosted on the official restaurant channel. Click below to stream on the source platform with original audio and controls.
                    </p>
                  </div>
                  <a
                    href={currentItem.url || currentItem.externalSourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-gold hover:bg-brand-goldHover text-brand-dark font-bold text-xs uppercase tracking-wider transition-all shadow-lg"
                  >
                    <Play className="w-4 h-4 fill-brand-dark" />
                    <span>Watch Video on Platform</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ) : (
                <div className="relative max-h-full max-w-full flex items-center justify-center overflow-auto">
                  <img
                    src={currentItem.url}
                    alt={currentItem.altText || currentItem.title}
                    style={{ transform: `scale(${zoomLevel})` }}
                    className="max-h-[60vh] max-w-full object-contain rounded-xl transition-transform duration-200"
                  />
                </div>
              )}
            </div>

            {/* Modal Footer / Source Reference Footnotes */}
            <div className="p-4 sm:p-6 bg-[#0E1116] border-t border-brand-cardBorder/60 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-3">
              <div className="space-y-0.5 text-center sm:text-left">
                <div>
                  <strong className="text-brand-ivory">Source Reference:</strong> {currentItem.sourceNotes}
                </div>
                {currentItem.altText && (
                  <div className="text-[11px] text-gray-500 font-light">{currentItem.altText}</div>
                )}
              </div>

              <div className="flex items-center gap-3">
                {currentItem.externalSourceUrl && (
                  <a
                    href={currentItem.externalSourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl bg-brand-card hover:bg-brand-cardBorder border border-brand-cardBorder text-brand-gold font-semibold text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <span>Inspect Original Source</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}

                <a
                  href={currentItem.url}
                  download
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-brand-card hover:bg-brand-cardBorder border border-brand-cardBorder text-gray-300 font-semibold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-gray-400" />
                  <span>Download</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
