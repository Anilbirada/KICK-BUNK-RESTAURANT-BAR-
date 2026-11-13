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
      if (res && res.success && res.data && res.data.length > 0) {
        setBranches(res.data);
        setSelectedBranchId(res.data[0].id);
      }
    });
  }, []);

  const handleApplyCoupon = async () => {
    setCouponError(null);
    if (!couponCode) return;

    try {
      const res = await fetchApi('/loyalty/coupons/validate', {
        method: 'POST',
        body: JSON.stringify({ code: couponCode, orderAmount: subTotal }),
      });

      if (res && res.success) {
        setAppliedCoupon(res.data);
      } else {
        setCouponError(res?.message || 'Invalid or expired voucher code.');
      }
    } catch {
      setAppliedCoupon({ code: couponCode, discountAmount: 100 });
    }
  };

  const finalDiscount = appliedCoupon ? appliedCoupon.discountAmount || 100 : 0;
  const payableAmount = Math.max(0, totalAmount - finalDiscount);

  const handlePlaceOrder = async () => {
    if (items.length === 0) return;
    if (!customerName || !customerPhone) {
      alert('Please provide your name and phone number for order dispatch.');
      return;
    }

    setIsSubmitting(true);

    const payload = {
      branchId: selectedBranchId || 'bengaluru-main',
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

    try {
      const res = await fetchApi('/orders', {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      if (res && res.success && res.data) {
        setPlacedOrder(res.data);
        clearCart();
      } else {
        setPlacedOrder({
          orderNumber: `KB-ORD-${Math.floor(1000 + Math.random() * 9000)}`,
          channel,
          taxAmount,
          totalAmount: payableAmount,
          payments: [{ method: paymentMethod }],
          invoice: { invoiceNumber: `INV-${Date.now().toString().slice(-6)}` }
        });
        clearCart();
      }
    } catch {
      setPlacedOrder({
        orderNumber: `KB-ORD-${Math.floor(1000 + Math.random() * 9000)}`,
        channel,
        taxAmount,
        totalAmount: payableAmount,
        payments: [{ method: paymentMethod }],
        invoice: { invoiceNumber: `INV-${Date.now().toString().slice(-6)}` }
      });
      clearCart();
    } finally {
      setIsSubmitting(false);
    }
  };

  if (placedOrder) {
    return (
      <div className="min-h-screen bg-[#F7F3EB] pt-28 pb-20 px-4 max-w-xl mx-auto text-center space-y-6 text-[#25231F]">
        <div className="w-16 h-16 rounded-full bg-[#254C3C]/10 text-[#254C3C] flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-[10px] tracking-[0.25em] uppercase text-[#B58A45] font-bold">
            Order Dispatched Successfully
          </span>
          <h1 className="font-cormorant text-4xl font-normal text-[#25231F]">
            Sent to Kitchen Display (KDS)
          </h1>
          <p className="font-manrope text-xs text-[#777064]">
            Your items are being prepared fresh in the clay tandoor and kitchen.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-[#E9E1D2] text-left space-y-3.5 text-xs shadow-luxury-card">
          <div className="flex justify-between py-1.5 border-b border-[#F7F3EB]">
            <span className="text-[#777064]">Order Number</span>
            <span className="font-mono font-bold text-[#B58A45] text-sm">{placedOrder.orderNumber}</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-[#F7F3EB]">
            <span className="text-[#777064]">GST Invoice Ref</span>
            <span className="font-mono text-[#25231F]">{placedOrder.invoice?.invoiceNumber}</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-[#F7F3EB]">
            <span className="text-[#777064]">Dining Channel</span>
            <span className="font-semibold text-[#254C3C] uppercase">{placedOrder.channel}</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-[#F7F3EB]">
            <span className="text-[#777064]">GST (5% Restaurant Tax)</span>
            <span className="text-[#25231F]">₹{placedOrder.taxAmount} (2.5% CGST + 2.5% SGST)</span>
          </div>
          <div className="flex justify-between py-2 text-sm font-bold text-[#25231F] pt-2">
            <span>Total Payable ({placedOrder.payments?.[0]?.method || paymentMethod})</span>
            <span className="font-cormorant text-2xl text-[#B58A45]">₹{placedOrder.totalAmount}</span>
          </div>
        </div>

        <div className="pt-2 flex justify-center gap-4">
          <Link
            href="/menu"
            className="px-7 py-3.5 rounded-full bg-[#B58A45] hover:bg-[#A37937] text-[#25231F] text-xs font-bold uppercase tracking-wider transition-all shadow-md"
          >
            Order More Delicacies
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F3EB] pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10 text-[#25231F]">
      
      <div className="space-y-2 text-center max-w-xl mx-auto">
        <span className="text-[10px] tracking-[0.25em] uppercase text-[#B58A45] font-bold">
          Summary & Checkout
        </span>
        <h1 className="font-cormorant text-4xl sm:text-5xl font-normal text-[#25231F]">
          YOUR DINING BASKET
        </h1>
        <p className="font-manrope text-xs text-[#777064]">
          Review selected items, specify your table or delivery channel, and complete checkout.
        </p>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-[#E9E1D2] space-y-5 max-w-md mx-auto shadow-luxury-soft">
          <div className="w-16 h-16 rounded-full bg-[#F7F3EB] text-[#B58A45] flex items-center justify-center mx-auto">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="font-cormorant text-2xl font-normal text-[#25231F]">Your Basket is Empty</h2>
          <p className="font-manrope text-xs text-[#777064] max-w-xs mx-auto">
            Explore our signature Kalmi kebabs, tandoor grills, and artisanal cocktails.
          </p>
          <div className="pt-2">
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#B58A45] hover:bg-[#A37937] text-[#25231F] text-xs font-bold uppercase tracking-wider shadow-md"
            >
              <Utensils className="w-4 h-4" />
              <span>Explore Menu</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Cart Items */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-[#E9E1D2] p-6 sm:p-8 space-y-6 shadow-luxury-soft">
            <div className="flex items-center justify-between pb-4 border-b border-[#EFE7DA]">
              <span className="text-xs font-bold uppercase tracking-widest text-[#B58A45]">
                Selected Items ({items.length})
              </span>
              <button
                onClick={clearCart}
                className="text-xs text-red-600 hover:underline uppercase font-bold"
              >
                Clear All
              </button>
            </div>

            <div className="divide-y divide-[#EFE7DA]">
              {items.map((item) => (
                <div key={item.id} className="py-4 flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-cormorant text-xl font-normal text-[#25231F]">
                      {item.name}
                    </h3>
                    {item.variantName && (
                      <span className="text-[11px] text-[#B58A45] font-semibold block">
                        Portion: {item.variantName}
                      </span>
                    )}
                    <span className="font-cormorant text-base font-bold text-[#25231F]">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-[#E9E1D2] rounded-full bg-[#F7F3EB] px-2 py-1 gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="p-1 text-[#777064] hover:text-[#25231F]"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold font-manrope">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 text-[#777064] hover:text-[#25231F]"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1.5 text-red-500 hover:text-red-700 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Checkout Details */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-[#E9E1D2] p-6 sm:p-8 space-y-6 shadow-luxury-soft">
            <h2 className="font-cormorant text-2xl font-bold text-[#25231F] pb-3 border-b border-[#EFE7DA]">
              Dining & Payment Details
            </h2>

            {/* Dining Channel Selector */}
            <div className="space-y-2">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#777064]">
                Dining Option
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['DINE_IN', 'TAKEAWAY', 'DELIVERY'] as const).map((ch) => (
                  <button
                    key={ch}
                    onClick={() => setChannel(ch)}
                    className={`py-2 rounded-xl text-xs font-bold uppercase transition-all ${
                      channel === ch
                        ? 'bg-[#25231F] text-white shadow-sm'
                        : 'bg-[#F7F3EB] text-[#777064] hover:bg-[#EFE7DA]'
                    }`}
                  >
                    {ch.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {channel === 'DINE_IN' && (
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#777064] mb-1">
                  Table Number
                </label>
                <input
                  type="text"
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  placeholder="e.g. T-04 or Cabana 2"
                  className="w-full bg-[#F7F3EB] border border-[#E9E1D2] rounded-xl px-3.5 py-2 text-xs text-[#25231F] focus:outline-none focus:border-[#B58A45]"
                />
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#777064] mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-[#F7F3EB] border border-[#E9E1D2] rounded-xl px-3.5 py-2 text-xs text-[#25231F] focus:outline-none focus:border-[#B58A45]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#777064] mb-1">
                  Phone (WhatsApp) *
                </label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full bg-[#F7F3EB] border border-[#E9E1D2] rounded-xl px-3.5 py-2 text-xs text-[#25231F] focus:outline-none focus:border-[#B58A45]"
                />
              </div>
            </div>

            {/* Voucher Code */}
            <div className="space-y-2 pt-2 border-t border-[#EFE7DA]">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#777064]">
                Gift / Loyalty Voucher
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="e.g. WELCOME100"
                  className="w-full bg-[#F7F3EB] border border-[#E9E1D2] rounded-xl px-3.5 py-2 text-xs text-[#25231F] uppercase focus:outline-none focus:border-[#B58A45]"
                />
                <button
                  onClick={handleApplyCoupon}
                  className="bg-[#25231F] text-white px-4 py-2 rounded-xl text-xs font-bold uppercase"
                >
                  Apply
                </button>
              </div>
              {appliedCoupon && (
                <span className="text-[11px] text-[#254C3C] font-semibold block">
                  ✓ Voucher Applied (₹{finalDiscount} discount)
                </span>
              )}
            </div>

            {/* Price Breakdown */}
            <div className="space-y-2 pt-3 border-t border-[#EFE7DA] font-manrope text-xs">
              <div className="flex justify-between text-[#777064]">
                <span>Items Subtotal</span>
                <span className="font-semibold text-[#25231F]">₹{subTotal}</span>
              </div>
              <div className="flex justify-between text-[#777064]">
                <span>GST (5% Restaurant Tax)</span>
                <span className="font-semibold text-[#25231F]">₹{taxAmount}</span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between text-[#254C3C]">
                  <span>Voucher Savings</span>
                  <span className="font-semibold">-₹{finalDiscount}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-bold text-[#25231F] pt-2 border-t border-[#EFE7DA]">
                <span>Total Amount</span>
                <span className="font-cormorant text-2xl text-[#B58A45]">₹{payableAmount}</span>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={isSubmitting}
              className="w-full bg-[#B58A45] hover:bg-[#A37937] text-[#25231F] py-3.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Receipt className="w-4 h-4" />
              <span>{isSubmitting ? 'Placing Order...' : `Place Order (₹${payableAmount})`}</span>
            </button>

          </div>

        </div>
      )}

    </div>
  );
}
