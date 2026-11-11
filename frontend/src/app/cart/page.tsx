'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '../../lib/cartContext';
import { fetchApi } from '../../lib/api';
import { ShoppingBag, Trash2, Plus, Minus, Tag, CheckCircle2, ArrowRight, Utensils, MapPin, CreditCard, Banknote, Smartphone } from 'lucide-react';

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
      alert('Please fill in required customer details and branch.');
      return;
    }

    setIsSubmitting(true);

    const payload = {
      branchId: selectedBranchId,
      channel,
      tableId: channel === 'DINE_IN' ? undefined : undefined, // Handled automatically or by table number
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
      <div className="min-h-screen bg-brand-dark py-16 px-4 max-w-2xl mx-auto text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-brand-green/20 text-brand-green flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <h1 className="text-3xl font-serif font-bold text-brand-ivory">Order Placed Successfully!</h1>
        <p className="text-sm text-gray-300">
          Your order has been routed directly to the kitchen display system (KDS).
        </p>

        <div className="bg-brand-card p-6 rounded-2xl border border-brand-cardBorder text-left space-y-3 text-xs">
          <div className="flex justify-between py-1.5 border-b border-brand-cardBorder">
            <span className="text-gray-400">Order Number</span>
            <span className="font-mono font-bold text-brand-gold text-sm">{placedOrder.orderNumber}</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-brand-cardBorder">
            <span className="text-gray-400">Invoice Number</span>
            <span className="font-mono text-gray-200">{placedOrder.invoice?.invoiceNumber}</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-brand-cardBorder">
            <span className="text-gray-400">Order Channel</span>
            <span className="font-semibold text-brand-ivory uppercase">{placedOrder.channel}</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-brand-cardBorder">
            <span className="text-gray-400">GST (5% Restaurant Tax)</span>
            <span className="text-gray-200">₹{placedOrder.taxAmount} (CGST + SGST)</span>
          </div>
          <div className="flex justify-between py-1.5 text-sm font-bold text-brand-gold">
            <span>Total Paid ({placedOrder.payments?.[0]?.method})</span>
            <span>₹{placedOrder.totalAmount}</span>
          </div>
        </div>

        <div className="pt-4 flex justify-center gap-4">
          <Link
            href="/menu"
            className="px-6 py-3 rounded-xl bg-brand-gold hover:bg-brand-goldHover text-brand-dark text-xs font-bold transition-colors"
          >
            Order More Food
          </Link>
          <Link
            href="/kitchen"
            className="px-6 py-3 rounded-xl bg-brand-cardBorder hover:bg-gray-700 text-gray-200 text-xs font-semibold transition-colors"
          >
            Track in KDS
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-dark py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-brand-ivory">Your Dining Cart</h1>
        <p className="text-xs text-gray-400 mt-1">Review items, select dining channel, and proceed to checkout.</p>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20 bg-brand-card rounded-3xl border border-brand-cardBorder space-y-4">
          <ShoppingBag className="w-12 h-12 text-gray-600 mx-auto" />
          <h2 className="text-xl font-serif text-gray-300">Your cart is empty</h2>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Discover our delicious charcoal tandoori grills, dum biryanis, and crafted mocktails.
          </p>
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-gold hover:bg-brand-goldHover text-brand-dark text-xs font-bold transition-all"
          >
            <Utensils className="w-4 h-4" />
            <span>Explore Menu</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Cart Items */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-brand-card rounded-2xl border border-brand-cardBorder p-4 sm:p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-brand-cardBorder">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Items In Cart ({items.length})
                </span>
                <button onClick={clearCart} className="text-xs text-red-400 hover:underline">
                  Clear All
                </button>
              </div>

              <div className="divide-y divide-brand-cardBorder">
                {items.map((item) => (
                  <div key={item.id} className="py-4 flex gap-4 items-center justify-between">
                    <div className="flex items-center gap-3.5">
                      <img
                        src={item.imageUrl || 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=150&q=80'}
                        alt={item.name}
                        className="w-14 h-14 rounded-xl object-cover bg-brand-dark shrink-0"
                      />
                      <div className="space-y-1">
                        <div className="text-sm font-semibold text-brand-ivory flex items-center gap-1.5">
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
                          <div className="text-[11px] text-brand-gold font-medium">Size: {item.variantName}</div>
                        )}
                        {item.addonNames && item.addonNames.length > 0 && (
                          <div className="text-[10px] text-gray-400">
                            Add-ons: {item.addonNames.join(', ')}
                          </div>
                        )}
                        {item.specialNotes && (
                          <div className="text-[10px] text-gray-400 italic">Note: {item.specialNotes}</div>
                        )}
                        <div className="text-xs font-bold text-brand-gold">₹{item.price} each</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      {/* Quantity Controller */}
                      <div className="flex items-center border border-brand-cardBorder rounded-lg bg-brand-dark">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 text-gray-400 hover:text-white"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 text-xs font-bold text-brand-ivory">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 text-gray-400 hover:text-white"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-right min-w-[60px]">
                        <div className="font-serif font-bold text-sm text-brand-ivory">
                          ₹{item.price * item.quantity}
                        </div>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-500 hover:text-red-400 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dining Channel Selector */}
            <div className="bg-brand-card rounded-2xl border border-brand-cardBorder p-6 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-gold">
                Select Dining Channel
              </span>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { key: 'DINE_IN', label: 'Dine-In', sub: 'Table service' },
                  { key: 'TAKEAWAY', label: 'Takeaway', sub: 'Pick up at counter' },
                  { key: 'DELIVERY', label: 'Delivery', sub: 'To your doorstep' },
                ].map((c) => (
                  <button
                    key={c.key}
                    onClick={() => setChannel(c.key as any)}
                    className={`p-3 rounded-xl border text-left text-xs transition-all ${
                      channel === c.key
                        ? 'border-brand-gold bg-brand-gold/10 text-brand-gold font-semibold'
                        : 'border-brand-cardBorder bg-brand-dark text-gray-300'
                    }`}
                  >
                    <div>{c.label}</div>
                    <div className="text-[10px] text-gray-400 mt-0.5">{c.sub}</div>
                  </button>
                ))}
              </div>

              {channel === 'DINE_IN' && (
                <div className="pt-2">
                  <label className="text-[11px] text-gray-400 block mb-1">Table Number</label>
                  <input
                    type="text"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    placeholder="e.g. T-01, T-05"
                    className="w-full sm:w-48 px-3.5 py-2 rounded-xl bg-brand-dark border border-brand-cardBorder text-xs text-brand-ivory focus:outline-none focus:border-brand-gold"
                  />
                </div>
              )}

              {channel === 'DELIVERY' && (
                <div className="pt-2 space-y-1">
                  <label className="text-[11px] text-gray-400 block">Delivery Address</label>
                  <textarea
                    rows={2}
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-brand-dark border border-brand-cardBorder text-xs text-brand-ivory focus:outline-none focus:border-brand-gold"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Order Summary & Checkout */}
          <div className="lg:col-span-5 space-y-6">
            {/* Branch Selection */}
            <div className="bg-brand-card rounded-2xl border border-brand-cardBorder p-5 space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-brand-gold flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>Preparing Outlet</span>
              </label>
              <select
                value={selectedBranchId}
                onChange={(e) => setSelectedBranchId(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-brand-dark border border-brand-cardBorder text-xs text-brand-ivory focus:outline-none focus:border-brand-gold"
              >
                {branches.map((b) => (
                  <option key={b.id} value={b.id} className="bg-brand-dark">
                    {b.name} ({b.city})
                  </option>
                ))}
              </select>
            </div>

            {/* Coupon Code Drawer */}
            <div className="bg-brand-card rounded-2xl border border-brand-cardBorder p-5 space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-brand-gold flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5" />
                <span>Offers & Coupons</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter Promo Code..."
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  className="flex-1 px-3.5 py-2 rounded-xl bg-brand-dark border border-brand-cardBorder text-xs text-brand-ivory font-mono uppercase focus:outline-none focus:border-brand-gold"
                />
                <button
                  onClick={handleApplyCoupon}
                  className="px-4 py-2 rounded-xl bg-brand-gold text-brand-dark font-bold text-xs hover:bg-brand-goldHover transition-colors"
                >
                  Apply
                </button>
              </div>
              {appliedCoupon && (
                <div className="text-xs text-brand-green flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Coupon {appliedCoupon.code} applied! ₹{appliedCoupon.calculatedDiscount} discount</span>
                </div>
              )}
              {couponError && <div className="text-xs text-red-400">{couponError}</div>}
            </div>

            {/* Payment Method Selector */}
            <div className="bg-brand-card rounded-2xl border border-brand-cardBorder p-5 space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-brand-gold">
                Payment Method
              </label>
              <div className="grid grid-cols-3 gap-2">
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
                      className={`p-3 rounded-xl border flex flex-col items-center gap-1 text-xs transition-all ${
                        paymentMethod === p.key
                          ? 'border-brand-gold bg-brand-gold/10 text-brand-gold font-semibold'
                          : 'border-brand-cardBorder bg-brand-dark text-gray-400'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{p.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="bg-brand-card rounded-2xl border border-brand-cardBorder p-6 space-y-3.5 text-xs">
              <div className="flex justify-between text-gray-300">
                <span>Subtotal</span>
                <span className="font-semibold text-brand-ivory">₹{subTotal}</span>
              </div>
              {discountVal > 0 && (
                <div className="flex justify-between text-brand-green">
                  <span>Promo Discount ({appliedCoupon?.code})</span>
                  <span>-₹{discountVal}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-400">
                <span>GST (5% Restaurant Tax)</span>
                <span>₹{calculatedTax}</span>
              </div>
              <div className="pt-3 border-t border-brand-cardBorder/60 flex justify-between text-base font-bold text-brand-gold">
                <span>Total Payable</span>
                <span className="font-serif text-xl">₹{finalPayable}</span>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isSubmitting}
                className="w-full mt-4 py-4 rounded-xl bg-brand-gold hover:bg-brand-goldHover text-brand-dark font-bold text-sm transition-all shadow-xl shadow-brand-gold/20 flex items-center justify-center gap-2"
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
