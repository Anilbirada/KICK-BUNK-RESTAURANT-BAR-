'use client';

import React, { useEffect, useState } from 'react';
import { fetchApi } from '../../lib/api';
import { useCart } from '../../lib/cartContext';
import { Search, Flame, Plus, Check, ShoppingBag, X, Sparkles, Clock, Leaf } from 'lucide-react';

export default function MenuPage() {
  const { addItem, items: cartItems } = useCart();
  const [categories, setCategories] = useState<any[]>([]);
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [vegOnly, setVegOnly] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // Customization modal state
  const [activeItem, setActiveItem] = useState<any | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<any | null>(null);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [specialNotes, setSpecialNotes] = useState<string>('');
  const [showToast, setShowToast] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const [catsRes, itemsRes] = await Promise.all([
        fetchApi('/menu/categories'),
        fetchApi('/menu/items'),
      ]);

      if (catsRes.success && catsRes.data) setCategories(catsRes.data);
      if (itemsRes.success && itemsRes.data) setMenuItems(itemsRes.data);
      setLoading(false);
    }
    loadData();
  }, []);

  const openCustomizer = (item: any) => {
    setActiveItem(item);
    setSelectedVariant(item.variants?.[0] || null);
    setSelectedAddons([]);
    setSpecialNotes('');
  };

  const handleAddToCart = () => {
    if (!activeItem) return;

    const basePrice = selectedVariant ? selectedVariant.price : activeItem.basePrice;
    const addonsPrice = (activeItem.addons || [])
      .filter((a: any) => selectedAddons.includes(a.id))
      .reduce((sum: number, a: any) => sum + a.price, 0);

    const unitPrice = basePrice + addonsPrice;
    const addonNames = (activeItem.addons || [])
      .filter((a: any) => selectedAddons.includes(a.id))
      .map((a: any) => a.name);

    addItem({
      menuItemId: activeItem.id,
      name: activeItem.name,
      price: unitPrice,
      quantity: 1,
      variantId: selectedVariant?.id,
      variantName: selectedVariant?.name,
      addonIds: selectedAddons,
      addonNames,
      imageUrl: activeItem.images?.[0]?.imageUrl,
      isVeg: activeItem.isVeg,
      specialNotes: specialNotes || undefined,
    });

    setShowToast(`Added "${activeItem.name}" to your order`);
    setTimeout(() => setShowToast(null), 3000);
    setActiveItem(null);
  };

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.categoryId === selectedCategory;
    const matchesVeg = !vegOnly || item.isVeg;
    const matchesSearch =
      !searchQuery ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesVeg && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#050505] pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 text-[#F4EFE5]">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-brand-gold to-amber-600 text-brand-dark px-6 py-3.5 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider animate-bounce">
          <Check className="w-4 h-4 text-brand-dark" />
          <span>{showToast}</span>
        </div>
      )}

      {/* Luxury Editorial Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full luxury-glass border border-brand-gold/30 text-brand-gold text-[10px] font-cinzel font-semibold tracking-[0.25em] uppercase shadow-gold-glow">
          <Flame className="w-3.5 h-3.5 text-brand-amber" />
          <span>Charcoal Tandoor • Biryani Handis • Resto-Bar Cocktails</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-serif font-bold text-brand-ivory leading-tight">
          The Culinary Catalogue
        </h1>
        <p className="text-sm sm:text-base text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
          Experience authentic clay tandoori grills, fragrant royal dum biryanis, and crafted resto-bar infusions, prepared to perfection at our Bengaluru Flagship & Tirupati branches.
        </p>

        {/* Snapshot Link & Table Concierge */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
          <a
            href="/images/kickbunk/restaurant_guru_menu_snapshot.jpg"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl luxury-glass border border-brand-gold/40 text-brand-gold hover:text-white text-xs font-cinzel font-semibold uppercase tracking-wider transition-all shadow-md hover:shadow-gold-glow"
          >
            <span>Verified Menu Snapshot (Original)</span>
          </a>

          <a
            href="tel:+919980626699"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#12151B] hover:bg-[#1A1E26] border border-brand-cardBorder text-gray-300 hover:text-brand-gold text-xs font-medium transition-colors"
          >
            <span>Direct Concierge: +91 99806 26699</span>
          </a>
        </div>
      </div>

      {/* Controls: Search, Veg Toggle & Category Filters */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          {/* Search Box */}
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 absolute left-4 top-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search delicacies (e.g. Kalmi Kebab, Biryani)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl luxury-glass border border-brand-cardBorder text-brand-ivory placeholder-gray-500 text-xs sm:text-sm focus:outline-none focus:border-brand-gold transition-all"
            />
          </div>

          {/* Pure Vegetarian Switch */}
          <button
            onClick={() => setVegOnly(!vegOnly)}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl border text-xs font-cinzel uppercase tracking-wider font-semibold transition-all ${
              vegOnly
                ? 'bg-brand-green/20 border-brand-green text-brand-green shadow-md shadow-brand-green/20'
                : 'luxury-glass border-brand-cardBorder text-gray-300 hover:border-brand-gold/40'
            }`}
          >
            <Leaf className={`w-3.5 h-3.5 ${vegOnly ? 'text-brand-green' : 'text-gray-400'}`} />
            <span>Pure Vegetarian Only</span>
          </button>
        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-3 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-5 py-2.5 rounded-xl text-xs font-cinzel uppercase tracking-wider font-semibold whitespace-nowrap transition-all ${
              selectedCategory === 'all'
                ? 'bg-gradient-to-r from-brand-gold to-amber-600 text-brand-dark shadow-lg shadow-brand-gold/25 font-bold'
                : 'luxury-glass text-gray-300 border border-brand-cardBorder hover:border-brand-gold/40'
            }`}
          >
            All Categories ({menuItems.length})
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-5 py-2.5 rounded-xl text-xs font-cinzel uppercase tracking-wider font-semibold whitespace-nowrap transition-all ${
                selectedCategory === c.id
                  ? 'bg-gradient-to-r from-brand-gold to-amber-600 text-brand-dark shadow-lg shadow-brand-gold/25 font-bold'
                  : 'luxury-glass text-gray-300 border border-brand-cardBorder hover:border-brand-gold/40'
              }`}
            >
              {c.name} ({c._count?.items || 0})
            </button>
          ))}
        </div>
      </div>

      {/* Dishes Catalogue Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-72 luxury-glass rounded-3xl border border-brand-cardBorder" />
          ))}
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="text-center py-24 space-y-4 luxury-glass rounded-3xl p-12 border border-brand-gold/15">
          <div className="text-gray-400 text-lg font-serif">No delicacies found matching your selection.</div>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
              setVegOnly(false);
            }}
            className="text-xs uppercase tracking-wider font-bold text-brand-gold hover:underline"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="luxury-glass rounded-3xl overflow-hidden border border-brand-gold/20 hover:border-brand-gold/60 transition-all duration-500 flex flex-col justify-between group shadow-luxury-card hover:shadow-gold-glow"
            >
              <div className="relative h-56 overflow-hidden bg-black">
                <img
                  src={item.images?.[0]?.imageUrl || 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80'}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C0E] via-transparent to-transparent opacity-80" />

                <div className="absolute top-3 left-3 flex gap-2">
                  <span
                    className={`w-5 h-5 rounded-md border flex items-center justify-center text-[10px] bg-black/80 backdrop-blur-md ${
                      item.isVeg ? 'border-brand-green text-brand-green' : 'border-red-500 text-red-500'
                    }`}
                  >
                    ●
                  </span>
                  {item.isBestSeller && (
                    <span className="px-2.5 py-0.5 rounded-full bg-brand-gold text-brand-dark text-[9px] font-extrabold uppercase tracking-widest font-cinzel shadow">
                      Signature
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-medium text-gray-300 border border-white/10 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-brand-gold" />
                  <span>{item.prepTimeMin} mins</span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <h3 className="font-serif font-bold text-lg text-brand-ivory group-hover:text-brand-gold transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-400 font-light line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-brand-gold/15">
                  <div>
                    <span className="text-[9px] font-cinzel tracking-wider text-gray-400 uppercase">Starting At</span>
                    <div className="text-brand-gold font-serif font-bold text-xl">
                      ₹{item.basePrice}
                    </div>
                  </div>

                  <button
                    onClick={() => openCustomizer(item)}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-gold to-amber-600 hover:from-brand-goldLight hover:to-brand-gold text-brand-dark font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-1.5 group-hover:shadow-gold-glow"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Select & Add</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* LUXURY PORTION & CUSTOMIZATION MODAL */}
      {activeItem && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6">
          <div className="luxury-glass border border-brand-gold/40 rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-start justify-between pb-4 border-b border-brand-gold/20">
              <div>
                <span className="text-[10px] font-cinzel uppercase tracking-[0.2em] text-brand-gold">
                  Delicacy Customizer
                </span>
                <h3 className="font-serif text-2xl font-bold text-brand-ivory">{activeItem.name}</h3>
                <p className="text-xs text-gray-300 font-light mt-1">{activeItem.description}</p>
              </div>
              <button
                onClick={() => setActiveItem(null)}
                className="p-2 rounded-full bg-brand-gold/10 text-brand-gold hover:text-white hover:bg-brand-gold/30 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Variants / Portion Size */}
            {activeItem.variants?.length > 1 && (
              <div className="space-y-3">
                <label className="text-xs font-cinzel font-bold uppercase tracking-[0.18em] text-brand-gold">
                  Choose Portion / Size
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {activeItem.variants.map((v: any) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      className={`p-3.5 rounded-2xl border text-left text-xs transition-all ${
                        selectedVariant?.id === v.id
                          ? 'border-brand-gold bg-brand-gold/15 text-brand-gold font-bold shadow-gold-glow'
                          : 'border-brand-cardBorder bg-[#10131A] text-gray-300 hover:border-brand-gold/30'
                      }`}
                    >
                      <div className="font-serif text-sm">{v.name}</div>
                      <div className="font-bold mt-1 text-brand-gold">₹{v.price}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Add-ons */}
            {activeItem.addons?.length > 0 && (
              <div className="space-y-3">
                <label className="text-xs font-cinzel font-bold uppercase tracking-[0.18em] text-brand-gold">
                  Chef's Accompaniments (Optional)
                </label>
                <div className="space-y-2">
                  {activeItem.addons.map((a: any) => {
                    const isChecked = selectedAddons.includes(a.id);
                    return (
                      <div
                        key={a.id}
                        onClick={() => {
                          setSelectedAddons((prev) =>
                            isChecked ? prev.filter((id) => id !== a.id) : [...prev, a.id]
                          );
                        }}
                        className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer text-xs transition-all ${
                          isChecked
                            ? 'border-brand-gold bg-brand-gold/15 text-brand-gold'
                            : 'border-brand-cardBorder bg-[#10131A] text-gray-300 hover:border-brand-gold/30'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-4 h-4 rounded-md border flex items-center justify-center text-[10px] ${
                              isChecked ? 'bg-brand-gold text-brand-dark border-brand-gold font-bold' : 'border-gray-500'
                            }`}
                          >
                            {isChecked && '✓'}
                          </div>
                          <span>{a.name}</span>
                        </div>
                        <span className="font-bold text-brand-gold">+₹{a.price}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Special Instructions */}
            <div className="space-y-2">
              <label className="text-xs font-cinzel font-bold uppercase tracking-[0.18em] text-brand-gold">
                Chef's Notes (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Mild spice, extra mint chutney, serve hot..."
                value={specialNotes}
                onChange={(e) => setSpecialNotes(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-[#10131A] border border-brand-cardBorder text-xs text-brand-ivory focus:outline-none focus:border-brand-gold transition-colors"
              />
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-brand-gold/20 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-cinzel uppercase tracking-wider text-gray-400">Total Price</span>
                <div className="font-serif text-2xl font-bold text-brand-gold">
                  ₹
                  {(selectedVariant ? selectedVariant.price : activeItem.basePrice) +
                    (activeItem.addons || [])
                      .filter((a: any) => selectedAddons.includes(a.id))
                      .reduce((sum: number, a: any) => sum + a.price, 0)}
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-brand-gold to-amber-600 hover:from-brand-goldLight hover:to-brand-gold text-brand-dark font-bold text-xs uppercase tracking-[0.18em] transition-all shadow-lg shadow-brand-gold/20 flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to My Order</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
