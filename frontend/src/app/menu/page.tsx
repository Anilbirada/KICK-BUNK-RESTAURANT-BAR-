'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { fetchApi } from '../../lib/api';
import { useCart } from '../../lib/cartContext';
import { Search, Flame, Plus, Check, ShoppingBag, X, Sparkles, Clock, Leaf, Utensils } from 'lucide-react';

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
      try {
        const [catsRes, itemsRes] = await Promise.all([
          fetchApi('/menu/categories'),
          fetchApi('/menu/items'),
        ]);

        if (catsRes && catsRes.success && catsRes.data) setCategories(catsRes.data);
        if (itemsRes && itemsRes.success && itemsRes.data) setMenuItems(itemsRes.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
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
      variantId: selectedVariant?.id,
      variantName: selectedVariant ? selectedVariant.name : undefined,
      addonIds: selectedAddons,
      addonNames: addonNames.length > 0 ? addonNames : undefined,
      imageUrl: activeItem.imageUrl,
      isVeg: Boolean(activeItem.isVeg),
      price: unitPrice,
      quantity: 1,
      specialNotes: specialNotes || undefined,
    });

    setShowToast(`Added "${activeItem.name}" to your order.`);
    setTimeout(() => setShowToast(null), 3000);
    setActiveItem(null);
  };

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory =
      selectedCategory === 'all' || item.categoryId === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesVeg = vegOnly ? item.isVeg : true;
    return matchesCategory && matchesSearch && matchesVeg;
  });

  return (
    <div className="bg-[#F7F3EB] text-[#25231F] min-h-screen pt-28 pb-24">
      
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#254C3C] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-[#DCC18B]/30 animate-fade-in-up">
          <Check className="w-4 h-4 text-[#DCC18B]" />
          <span className="font-manrope text-xs font-semibold">{showToast}</span>
        </div>
      )}

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#E9E1D2] text-[#B58A45] text-xs font-semibold tracking-[0.2em] uppercase shadow-sm">
          <Utensils className="w-3.5 h-3.5" />
          <span>Curated Culinary Collection</span>
        </div>

        <h1 className="font-cormorant text-5xl sm:text-6xl md:text-7xl font-normal text-[#25231F] tracking-tight">
          THE ART OF TASTE.
        </h1>

        <p className="max-w-2xl mx-auto font-manrope text-sm sm:text-base text-[#777064] font-light leading-relaxed">
          From fiery clay-tandoor kebabs and spiced pan-fried delicacies to rich gravies and continental pairings, every plate is crafted with seasonal ingredients and traditional flair.
        </p>

        {/* Search & Veg Filter */}
        <div className="max-w-xl mx-auto pt-6 flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-[#777064] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search dishes (e.g. Kalmi Kebab, Paneer, Biryani)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#E9E1D2] rounded-full pl-11 pr-4 py-3 text-sm text-[#25231F] focus:outline-none focus:border-[#B58A45] shadow-sm"
            />
          </div>

          <button
            onClick={() => setVegOnly(!vegOnly)}
            className={`whitespace-nowrap px-5 py-3 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 flex items-center gap-2 border ${
              vegOnly
                ? 'bg-[#254C3C] text-white border-[#254C3C] shadow-md'
                : 'bg-white text-[#777064] border-[#E9E1D2] hover:bg-[#EFE7DA]'
            }`}
          >
            <Leaf className={`w-3.5 h-3.5 ${vegOnly ? 'text-[#DCC18B]' : 'text-green-600'}`} />
            <span>Veg Only</span>
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-5 py-2.5 rounded-full font-manrope text-xs font-bold tracking-[0.14em] uppercase transition-all ${
              selectedCategory === 'all'
                ? 'bg-[#25231F] text-white shadow-md'
                : 'bg-white text-[#777064] hover:bg-[#EFE7DA] border border-[#E9E1D2]'
            }`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full font-manrope text-xs font-bold tracking-[0.14em] uppercase transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#25231F] text-white shadow-md'
                  : 'bg-white text-[#777064] hover:bg-[#EFE7DA] border border-[#E9E1D2]'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="text-center py-24 space-y-3">
            <div className="w-8 h-8 border-2 border-[#B58A45] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="font-manrope text-xs text-[#777064] tracking-wider uppercase">Loading Chef Creations...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl p-8 border border-[#E9E1D2] max-w-md mx-auto">
            <p className="font-cormorant text-2xl text-[#25231F]">No Dishes Found</p>
            <p className="font-manrope text-xs text-[#777064] mt-2">Try clearing your search query or selecting a different category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-2xl overflow-hidden border border-[#E9E1D2] hover:border-[#B58A45] transition-all duration-300 hover:shadow-luxury-card flex flex-col justify-between"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#EFE7DA]">
                  <Image
                    src={item.imageUrl || '/images/kickbunk/magicpin_04_food_spread_dining.webp'}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span
                      className={`w-4 h-4 rounded-full flex items-center justify-center border text-[9px] font-bold ${
                        item.isVeg
                          ? 'border-green-600 text-green-700 bg-white'
                          : 'border-red-600 text-red-700 bg-white'
                      }`}
                    >
                      {item.isVeg ? '●' : '▲'}
                    </span>
                    {item.isSignature && (
                      <span className="bg-[#B58A45] text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full shadow-sm">
                        Signature
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <h3 className="font-cormorant text-2xl font-normal text-[#25231F] leading-snug">
                        {item.name}
                      </h3>
                      <span className="font-cormorant text-xl font-bold text-[#B58A45] shrink-0">
                        ₹{item.basePrice}
                      </span>
                    </div>

                    <p className="font-manrope text-xs text-[#777064] font-light leading-relaxed line-clamp-2">
                      {item.description || 'Authentic garden culinary preparation slow-cooked with proprietary spice blends.'}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#EFE7DA] flex items-center justify-between">
                    <span className="text-[11px] text-[#777064]">
                      {item.variants && item.variants.length > 0 ? `${item.variants.length} Portions Available` : 'Fresh Daily'}
                    </span>
                    <button
                      onClick={() => openCustomizer(item)}
                      className="inline-flex items-center gap-1.5 bg-[#F7F3EB] hover:bg-[#B58A45] text-[#25231F] hover:text-white px-4 py-2 rounded-full font-manrope text-xs font-bold uppercase tracking-wider transition-colors duration-300"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add to Order</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Item Customizer Modal */}
      {activeItem && (
        <div
          className="fixed inset-0 z-50 bg-[#25231F]/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveItem(null)}
        >
          <div
            className="relative max-w-lg w-full bg-[#F7F3EB] rounded-3xl p-8 border border-[#E9E1D2] shadow-2xl space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-[#777064] hover:text-[#25231F]"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-[#E9E1D2] pb-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#B58A45]">Order Customization</span>
              <h3 className="font-cormorant text-2xl font-bold text-[#25231F]">{activeItem.name}</h3>
              <p className="font-manrope text-xs text-[#777064] mt-1">{activeItem.description}</p>
            </div>

            {/* Variants */}
            {activeItem.variants && activeItem.variants.length > 0 && (
              <div className="space-y-2">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#777064]">
                  Select Portion
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {activeItem.variants.map((v: any) => (
                    <button
                      key={v.name}
                      onClick={() => setSelectedVariant(v)}
                      className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all ${
                        selectedVariant?.name === v.name
                          ? 'border-[#B58A45] bg-white ring-2 ring-[#B58A45]/20 text-[#25231F]'
                          : 'border-[#E9E1D2] bg-white/60 text-[#777064]'
                      }`}
                    >
                      <div className="text-[#25231F]">{v.name}</div>
                      <div className="text-[#B58A45] font-bold mt-1">₹{v.price}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Special Instructions */}
            <div className="space-y-2">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#777064]">
                Chef Instructions / Spice Preference (Optional)
              </label>
              <textarea
                rows={2}
                value={specialNotes}
                onChange={(e) => setSpecialNotes(e.target.value)}
                placeholder="e.g. Medium spice, less oil, extra mint chutney..."
                className="w-full bg-white border border-[#E9E1D2] rounded-xl px-4 py-2.5 text-xs text-[#25231F] focus:outline-none focus:border-[#B58A45]"
              />
            </div>

            <div className="pt-2">
              <button
                onClick={handleAddToCart}
                className="w-full bg-[#B58A45] hover:bg-[#A37937] text-[#25231F] py-3.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>
                  Confirm & Add (₹{selectedVariant ? selectedVariant.price : activeItem.basePrice})
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
