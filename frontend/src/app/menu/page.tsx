'use client';

import React, { useEffect, useState } from 'react';
import { fetchApi } from '../../lib/api';
import { useCart } from '../../lib/cartContext';
import { Search, Flame, Plus, Check, ShoppingBag, X } from 'lucide-react';

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

    setShowToast(`Added "${activeItem.name}" to cart`);
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
    <div className="min-h-screen bg-brand-dark py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-brand-green text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 text-sm font-semibold animate-bounce">
          <Check className="w-5 h-5" />
          <span>{showToast}</span>
        </div>
      )}

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-brand-gold text-xs font-semibold tracking-wider uppercase">
          <Flame className="w-3.5 h-3.5" />
          <span>Charcoal Tandoor • Biryani Handis • Resto-Bar Cocktails</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-brand-ivory">
          Kick Bunk Digital Menu
        </h1>
        <p className="text-sm text-gray-300 font-light">
          Fresh ingredients, authentic charcoal clay-oven grills, royal dum handi biryanis, and crafted mocktails. Prepared to order in Bengaluru & Tirupati.
        </p>

        {/* Verified Menu Snapshot Link */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <a
            href="/images/kickbunk/restaurant_guru_menu_snapshot.jpg"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-card hover:bg-brand-cardBorder border border-brand-gold/40 text-brand-gold text-xs font-semibold transition-all shadow-md"
          >
            <span>Download Verified Menu Snapshot (PDF/Image)</span>
          </a>

          <a
            href="tel:+919980626699"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#141820] hover:bg-[#1C222E] border border-brand-cardBorder text-gray-300 text-xs font-medium transition-colors"
          >
            <span>Table Orders & Queries: +91 99806 26699</span>
          </a>
        </div>
      </div>

      {/* Controls: Search, Veg Toggle & Category Filters */}
      <div className="space-y-6 mb-12">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          {/* Search Box */}
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search dishes (e.g. Kalmi Kebab, Biryani)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-brand-card border border-brand-cardBorder text-brand-ivory placeholder-gray-500 text-sm focus:outline-none focus:border-brand-gold transition-colors"
            />
          </div>

          {/* Veg Only Switch */}
          <button
            onClick={() => setVegOnly(!vegOnly)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
              vegOnly
                ? 'bg-brand-green/20 border-brand-green text-brand-green'
                : 'bg-brand-card border-brand-cardBorder text-gray-300 hover:border-gray-500'
            }`}
          >
            <span className={`w-3 h-3 rounded-full ${vegOnly ? 'bg-brand-green' : 'bg-gray-500'}`} />
            <span>Pure Vegetarian Only</span>
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === 'all'
                ? 'bg-brand-gold text-brand-dark shadow-md shadow-brand-gold/20'
                : 'bg-brand-card text-gray-300 border border-brand-cardBorder hover:border-brand-gold/40'
            }`}
          >
            All Categories ({menuItems.length})
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === c.id
                  ? 'bg-brand-gold text-brand-dark shadow-md shadow-brand-gold/20'
                  : 'bg-brand-card text-gray-300 border border-brand-cardBorder hover:border-brand-gold/40'
              }`}
            >
              {c.name} ({c._count?.items || 0})
            </button>
          ))}
        </div>
      </div>

      {/* Menu Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-64 bg-brand-card rounded-2xl border border-brand-cardBorder" />
          ))}
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="text-center py-20 space-y-3">
          <div className="text-gray-500 text-lg font-serif">No dishes found matching your criteria.</div>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
              setVegOnly(false);
            }}
            className="text-xs text-brand-gold hover:underline"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-brand-card rounded-2xl overflow-hidden border border-brand-cardBorder hover:border-brand-gold/40 transition-all flex flex-col justify-between group"
            >
              <div className="relative h-48 overflow-hidden bg-brand-dark">
                <img
                  src={item.images?.[0]?.imageUrl || 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80'}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span
                    className={`w-5 h-5 rounded-sm border flex items-center justify-center text-[10px] bg-brand-dark/80 backdrop-blur-sm ${
                      item.isVeg ? 'border-brand-green text-brand-green' : 'border-red-500 text-red-500'
                    }`}
                  >
                    ●
                  </span>
                  {item.isBestSeller && (
                    <span className="px-2 py-0.5 rounded-full bg-brand-gold text-brand-dark text-[10px] font-bold uppercase tracking-wider">
                      Chef's Special
                    </span>
                  )}
                </div>
                <div className="absolute bottom-3 right-3 bg-brand-dark/80 backdrop-blur-sm px-2.5 py-1 rounded-md text-[11px] font-medium text-gray-300">
                  {item.prepTimeMin} mins prep
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif font-bold text-base text-brand-ivory group-hover:text-brand-gold transition-colors">
                      {item.name}
                    </h3>
                  </div>
                  <p className="text-xs text-gray-400 mt-1 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-brand-cardBorder/60">
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase font-medium">Starting from</span>
                    <div className="text-brand-gold font-serif font-bold text-lg">
                      ₹{item.basePrice}
                    </div>
                  </div>

                  <button
                    onClick={() => openCustomizer(item)}
                    className="px-4 py-2 rounded-xl bg-brand-gold hover:bg-brand-goldHover text-brand-dark font-bold text-xs transition-all shadow-md flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Customize & Add</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CUSTOMIZATION MODAL */}
      {activeItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-brand-card border border-brand-cardBorder rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 space-y-6">
            <div className="flex items-start justify-between pb-4 border-b border-brand-cardBorder">
              <div>
                <h3 className="font-serif text-xl font-bold text-brand-ivory">{activeItem.name}</h3>
                <p className="text-xs text-gray-400 mt-1">{activeItem.description}</p>
              </div>
              <button onClick={() => setActiveItem(null)} className="p-1 text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Variants */}
            {activeItem.variants?.length > 1 && (
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-brand-gold">Choose Portion / Size</label>
                <div className="grid grid-cols-2 gap-2">
                  {activeItem.variants.map((v: any) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      className={`p-3 rounded-xl border text-left text-xs transition-all ${
                        selectedVariant?.id === v.id
                          ? 'border-brand-gold bg-brand-gold/10 text-brand-gold font-semibold'
                          : 'border-brand-cardBorder bg-brand-dark text-gray-300'
                      }`}
                    >
                      <div>{v.name}</div>
                      <div className="font-bold mt-1">₹{v.price}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Addons */}
            {activeItem.addons?.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-brand-gold">Add Extra Accompaniments</label>
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
                        className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer text-xs transition-all ${
                          isChecked
                            ? 'border-brand-gold bg-brand-gold/10 text-brand-gold'
                            : 'border-brand-cardBorder bg-brand-dark text-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-4 h-4 rounded border flex items-center justify-center text-[10px] ${
                              isChecked ? 'bg-brand-gold text-brand-dark border-brand-gold' : 'border-gray-500'
                            }`}
                          >
                            {isChecked && '✓'}
                          </div>
                          <span>{a.name}</span>
                        </div>
                        <span className="font-semibold">+₹{a.price}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Special Notes */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-brand-gold">Cooking Instructions (Optional)</label>
              <input
                type="text"
                placeholder="e.g. Less spicy, extra lemon on side..."
                value={specialNotes}
                onChange={(e) => setSpecialNotes(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-brand-dark border border-brand-cardBorder text-xs text-brand-ivory focus:outline-none focus:border-brand-gold"
              />
            </div>

            {/* Modal Footer with Total & CTA */}
            <div className="pt-4 border-t border-brand-cardBorder flex items-center justify-between">
              <div>
                <span className="text-[10px] text-gray-400">Total Price</span>
                <div className="font-serif text-xl font-bold text-brand-gold">
                  ₹
                  {(selectedVariant ? selectedVariant.price : activeItem.basePrice) +
                    (activeItem.addons || [])
                      .filter((a: any) => selectedAddons.includes(a.id))
                      .reduce((sum: number, a: any) => sum + a.price, 0)}
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="px-6 py-3 rounded-xl bg-brand-gold hover:bg-brand-goldHover text-brand-dark font-bold text-xs transition-all flex items-center gap-2"
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
