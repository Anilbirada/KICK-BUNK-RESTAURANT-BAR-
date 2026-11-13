'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '../../lib/cartContext';
import { fetchApi } from '../../lib/api';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Tag,
  CheckCircle2,
  ArrowRight,
  Utensils,
  MapPin,
  CreditCard,
  Banknote,
  Smartphone,
  Sparkles,
  Receipt
} from 'lucide-react';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, subTotal, taxAmount, totalAmount } = useCart();
  const [branches, setBranches] = useState<any[]>([]);
  const [selectedBranchId, setSelectedBranchId] = useState<string>('');
  const [channel, setChannel] = useState<'DINE_IN' | 'TAKEAWAY' | 'DELIVERY'>('DINE_IN');
  const [tableNumber, setTableNumber] = useState<string>('T-01');
  const [customerName, setCustomerName] = useState<string>('Rahul Sharma');
  const [customerPhone, setCustomerPhone] = useState<string>('9876543210');
  const [deliveryAddress, setDeliveryAddress] = useState<string>('Villa 14, Neo Town, Electronic City Phase 1');
  const [orderNotes, setOrderNotes] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'CARD' | 'CASH'>('UPI');

  // Coupon state
  const [couponCode, setCouponCode] = useState<string>('WELCOME100');
  const [appliedCoupon, setAppliedCoupon] = useState<any | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [placedOrder, setPlacedOrder] = useState<any | null>(null);

  useEffect(() => {
    fetchApi('/branches').then((res) => {
      if (res.success && res.data && res.data.length > 0) {
        setBranches(res.data);
        setSelectedBranchId(res.data[0].id);
      }
    });
  }, []);

  const handleApplyCoupon = async () => {
    setCouponError(null);
    if (!couponCode) return;

    const res = await fetchApi('/loyalty/coupons/validate', {
      method: 'POST',
      body: JSON.stringify({ code: couponCode, orderAmount: subTotal }),
    });

    if (res.success && res.data) {
      setAppliedCoupon(res.data);
    } else {
      setCouponError(res.message || 'Invalid coupon code');
      setAppliedCoupon(null);
    }
  };

  const discountVal = appliedCoupon ? appliedCoupon.calculatedDiscount : 0;
  const taxableSubtotal = Math.max(0, subTotal - discountVal);
  const calculatedTax = Math.round(taxableSubtotal * 0.05 * 100) / 100;
  const finalPayable = Math.round((taxableSubtotal + calculatedTax) * 100) / 100;

  const handleCheckout = async () => {
    if (items.length === 0) return;
    if (!selectedBranchId || !customerPhone || !customerName) {
      alert('Please fill in required customer details and select branch.');
      return;
    }

    setIsSubmitting(true);

    const payload = {
      branchId: selectedBranchId,
      channel,
      notes: `${orderNotes}${channel === 'DINE_IN' ? ` | Table: ${tableNumber}` : ''}${channel === 'DELIVERY' ? ` | Delivery: ${deliveryAddress}` : ''}`,
      paymentMethod,
      couponCode: appliedCoupon ? appliedCoupon.code : undefined,
      items: items.map((i) => ({
        menuItemId: i.menuItemId,
        variantId: i.variantId,
        quantity: i.quantity,
        addonIds: i.addonIds,
        specialNotes: i.specialNotes,
      })),
    };

    const res = await fetchApi('/orders', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    setIsSubmitting(false);

    if (res.success && res.data) {
      setPlacedOrder(res.data);
      clearCart();
    } else {
      alert(res.message || 'Failed to place order. Please try again.');
    }
  };

  if (placedOrder) {
    return (
      <div className="min-h-screen bg-[#050505] pt-28 pb-20 px-4 max-w-2xl mx-auto text-center space-y-8 text-[#F4EFE5]">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-brand-gold/20 to-amber-600/30 text-brand-gold flex items-center justify-center mx-auto border border-brand-gold/40 shadow-gold-glow">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-3">
          <span className="text-[10px] font-cinzel tracking-[0.25em] uppercase text-brand-gold font-bold">
            Order Placed Successfully
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-brand-ivory">
            Order Dispatched to Kitchen
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 font-light max-w-md mx-auto">
            Your delicacies are routed in real-time to the Kitchen Display System (KDS).
          </p>
        </div>

        <div className="luxury-glass p-8 rounded-3xl border border-brand-gold/25 text-left space-y-4 text-xs shadow-2xl">
          <div className="flex justify-between py-2 border-b border-brand-gold/15">
            <span className="text-gray-400 font-cinzel">Order Number</span>
            <span className="font-mono font-bold text-brand-gold text-sm">{placedOrder.orderNumber}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-brand-gold/15">
            <span className="text-gray-400 font-cinzel">GST Invoice Ref</span>
            <span className="font-mono text-gray-200">{placedOrder.invoice?.invoiceNumber}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-brand-gold/15">
            <span className="text-gray-400 font-cinzel">Dining Channel</span>
            <span className="font-semibold text-brand-ivory uppercase tracking-wider">{placedOrder.channel}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-brand-gold/15">
            <span className="text-gray-400 font-cinzel">GST (5% Restaurant Tax)</span>
            <span className="text-gray-200">₹{placedOrder.taxAmount} (2.5% CGST + 2.5% SGST)</span>
          </div>
          <div className="flex justify-between py-2 text-sm font-bold text-brand-gold pt-2">
            <span className="font-cinzel">Total Paid ({placedOrder.payments?.[0]?.method})</span>
            <span className="font-serif text-xl">₹{placedOrder.totalAmount}</span>
          </div>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/menu"
            className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-brand-gold to-amber-600 hover:from-brand-goldLight hover:to-brand-gold text-brand-dark text-xs uppercase tracking-[0.18em] font-bold transition-all shadow-md"
          >
            Order More Delicacies
          </Link>
          <Link
            href="/kitchen"
            className="px-7 py-3.5 rounded-xl luxury-glass hover:border-brand-gold text-brand-ivory hover:text-brand-gold text-xs uppercase tracking-[0.18em] font-semibold transition-all"
          >
            Track in KDS
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10 text-[#F4EFE5]">
      <div className="space-y-2">
        <span className="text-[10px] font-cinzel tracking-[0.25em] uppercase text-brand-gold font-bold">
          Checkout & Gastronomy Summary
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-brand-ivory">Your Dining Cart</h1>
        <p className="text-xs sm:text-sm text-gray-400 font-light">
          Review selected dishes, specify dining channel, apply vouchers, and complete your order.
        </p>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-24 luxury-glass rounded-3xl border border-brand-gold/20 space-y-6 max-w-2xl mx-auto shadow-2xl">
          <div className="w-20 h-20 rounded-full bg-brand-gold/10 text-brand-gold flex items-center justify-center mx-auto border border-brand-gold/30">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-serif text-brand-ivory">Your dining cart is currently empty</h2>
          <p className="text-xs sm:text-sm text-gray-400 font-light max-w-sm mx-auto leading-relaxed">
            Discover our charcoal tandoori grills, dum biryanis, and crafted resto-bar creations.
          </p>
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-brand-gold to-amber-600 hover:from-brand-goldLight hover:to-brand-gold text-brand-dark text-xs uppercase tracking-[0.2em] font-bold transition-all shadow-lg shadow-brand-gold/20"
          >
            <Utensils className="w-4 h-4" />
            <span>Explore Menu</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Cart Items */}
          <div className="lg:col-span-7 space-y-6">
            <div className="luxury-glass rounded-3xl border border-brand-gold/20 p-6 sm:p-8 space-y-6 shadow-luxury-card">
              <div className="flex items-center justify-between pb-4 border-b border-brand-gold/15">
                <span className="text-xs font-cinzel font-bold uppercase tracking-[0.18em] text-brand-gold">
                  Selected Delicacies ({items.length})
                </span>
                <button
                  onClick={clearCart}
                  className="text-xs text-red-400 hover:text-red-300 uppercase tracking-wider font-semibold transition-colors"
                >
                  Clear Cart
                </button>
              </div>

              <div className="divide-y divide-brand-gold/10">
                {items.map((item) => (
                  <div key={item.id} className="py-5 flex gap-4 items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.imageUrl || '/images/kickbunk/magicpin_01_kalmi_kebab.webp'}
                        alt={item.name}
                        className="w-16 h-16 rounded-2xl object-cover bg-black shrink-0 border border-brand-gold/20"
                      />
                      <div className="space-y-1">
                        <div className="text-sm font-serif font-bold text-brand-ivory flex items-center gap-2">
                          <span
                            className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center text-[8px] ${
                              item.isVeg ? 'border-brand-green text-brand-green' : 'border-red-500 text-red-500'
                            }`}
                          >
                            ●
                          </span>
                          <span>{item.name}</span>
                        </div>
                        {item.variantName && (
                          <div className="text-[11px] text-brand-gold font-medium">Portion: {item.variantName}</div>
                        )}
                        {item.addonNames && item.addonNames.length > 0 && (
                          <div className="text-[10px] text-gray-400 font-light">
                            Accompaniments: {item.addonNames.join(', ')}
                          </div>
                        )}
                        {item.specialNotes && (
                          <div className="text-[10px] text-gray-400 italic">Chef note: {item.specialNotes}</div>
                        )}
                        <div className="text-xs font-bold text-brand-gold">₹{item.price} each</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-5">
                      {/* Quantity Controller */}
                      <div className="flex items-center border border-brand-gold/25 rounded-xl bg-[#08090C]">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 text-gray-400 hover:text-white transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-bold text-brand-ivory">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 text-gray-400 hover:text-white transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-right min-w-[70px]">
                        <div className="font-serif font-bold text-base text-brand-ivory">
                          ₹{item.price * item.quantity}
                        </div>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-500 hover:text-red-400 p-1.5 transition-colors"
                        title="Remove dish"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dining Channel Selector */}
            <div className="luxury-glass rounded-3xl border border-brand-gold/20 p-6 sm:p-8 space-y-5 shadow-luxury-card">
              <span className="text-xs font-cinzel font-bold uppercase tracking-[0.18em] text-brand-gold">
                Dining Channel Preference
              </span>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { key: 'DINE_IN', label: 'Dine-In', sub: 'Garden / Cabana table' },
                  { key: 'TAKEAWAY', label: 'Takeaway', sub: 'Counter pick up' },
                  { key: 'DELIVERY', label: 'Delivery', sub: 'To your residence' },
                ].map((c) => (
                  <button
                    key={c.key}
                    onClick={() => setChannel(c.key as any)}
                    className={`p-4 rounded-2xl border text-left text-xs transition-all ${
                      channel === c.key
                        ? 'border-brand-gold bg-brand-gold/15 text-brand-gold font-bold shadow-gold-glow'
                        : 'border-brand-cardBorder bg-[#10131A] text-gray-300 hover:border-brand-gold/30'
                    }`}
                  >
                    <div className="font-serif font-bold text-sm">{c.label}</div>
                    <div className="text-[10px] text-gray-400 mt-1 font-light">{c.sub}</div>
                  </button>
                ))}
              </div>

              {channel === 'DINE_IN' && (
                <div className="pt-2">
                  <label className="text-[11px] font-cinzel text-gray-300 block mb-1">Table / Cabana Designation</label>
                  <input
                    type="text"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    placeholder="e.g. T-01, Cabana-03"
                    className="w-full sm:w-56 px-4 py-2.5 rounded-xl bg-[#08090C] border border-brand-cardBorder text-xs text-brand-ivory focus:outline-none focus:border-brand-gold"
                  />
                </div>
              )}

              {channel === 'DELIVERY' && (
                <div className="pt-2 space-y-1">
                  <label className="text-[11px] font-cinzel text-gray-300 block">Delivery Address Details</label>
                  <textarea
                    rows={2}
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#08090C] border border-brand-cardBorder text-xs text-brand-ivory focus:outline-none focus:border-brand-gold"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Order Summary & Checkout */}
          <div className="lg:col-span-5 space-y-6">
            {/* Preparing Branch Selection */}
            <div className="luxury-glass rounded-3xl border border-brand-gold/20 p-6 space-y-3 shadow-luxury-card">
              <label className="text-xs font-cinzel font-bold uppercase tracking-[0.18em] text-brand-gold flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5" />
                <span>Preparing Kitchen Outlet</span>
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

            {/* Voucher & Loyalty Coupon */}
            <div className="luxury-glass rounded-3xl border border-brand-gold/20 p-6 space-y-3.5 shadow-luxury-card">
              <label className="text-xs font-cinzel font-bold uppercase tracking-[0.18em] text-brand-gold flex items-center gap-2">
                <Tag className="w-3.5 h-3.5" />
                <span>Exclusive Voucher & Privileges</span>
              </label>
              <div className="flex gap-2.5">
                <input
                  type="text"
                  placeholder="Enter Promo Code..."
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  className="flex-1 px-4 py-3 rounded-2xl bg-[#08090C] border border-brand-cardBorder text-xs text-brand-ivory font-mono uppercase focus:outline-none focus:border-brand-gold"
                />
                <button
                  onClick={handleApplyCoupon}
                  className="px-5 py-3 rounded-2xl bg-gradient-to-r from-brand-gold to-amber-600 text-brand-dark font-bold text-xs uppercase tracking-wider hover:from-brand-goldLight hover:to-brand-gold transition-all"
                >
                  Apply
                </button>
              </div>
              {appliedCoupon && (
                <div className="text-xs text-brand-green flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Voucher {appliedCoupon.code} applied! ₹{appliedCoupon.calculatedDiscount} deduction</span>
                </div>
              )}
              {couponError && <div className="text-xs text-red-400 font-light">{couponError}</div>}
            </div>

            {/* Payment Method Selector */}
            <div className="luxury-glass rounded-3xl border border-brand-gold/20 p-6 space-y-3.5 shadow-luxury-card">
              <label className="text-xs font-cinzel font-bold uppercase tracking-[0.18em] text-brand-gold">
                Payment Tender
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { key: 'UPI', label: 'UPI / QR', icon: Smartphone },
                  { key: 'CARD', label: 'Card', icon: CreditCard },
                  { key: 'CASH', label: 'Cash', icon: Banknote },
                ].map((p) => {
                  const Icon = p.icon;
                  return (
                    <button
                      key={p.key}
                      onClick={() => setPaymentMethod(p.key as any)}
                      className={`p-3.5 rounded-2xl border flex flex-col items-center gap-1.5 text-xs transition-all ${
                        paymentMethod === p.key
                          ? 'border-brand-gold bg-brand-gold/15 text-brand-gold font-bold shadow-gold-glow'
                          : 'border-brand-cardBorder bg-[#08090C] text-gray-400 hover:border-brand-gold/30'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="font-cinzel tracking-wider text-[11px]">{p.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Telemetry & Bill Breakdown */}
            <div className="luxury-glass rounded-3xl border border-brand-gold/25 p-7 space-y-4 text-xs shadow-2xl">
              <div className="flex justify-between text-gray-300">
                <span className="font-cinzel">Subtotal</span>
                <span className="font-semibold text-brand-ivory">₹{subTotal}</span>
              </div>
              {discountVal > 0 && (
                <div className="flex justify-between text-brand-green">
                  <span className="font-cinzel">Privilege Discount ({appliedCoupon?.code})</span>
                  <span>-₹{discountVal}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-400">
                <span className="font-cinzel">GST (5% Indian Restaurant Tax)</span>
                <span>₹{calculatedTax}</span>
              </div>
              <div className="pt-4 border-t border-brand-gold/20 flex justify-between items-center text-brand-gold font-bold">
                <span className="font-cinzel uppercase tracking-[0.18em] text-sm">Total Payable</span>
                <span className="font-serif text-2xl">₹{finalPayable}</span>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isSubmitting}
                className="w-full mt-4 py-4 rounded-2xl bg-gradient-to-r from-brand-gold via-amber-500 to-yellow-600 hover:from-brand-goldLight hover:to-brand-gold text-brand-dark font-bold text-xs uppercase tracking-[0.2em] transition-all shadow-xl shadow-brand-gold/20 flex items-center justify-center gap-2.5"
              >
                <span>{isSubmitting ? 'Routing to Kitchen...' : `Pay ₹${finalPayable} & Place Order`}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
