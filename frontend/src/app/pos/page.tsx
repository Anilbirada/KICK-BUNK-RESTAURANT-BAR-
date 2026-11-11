'use client';

import React, { useState, useEffect } from 'react';
import { fetchApi } from '../../lib/api';
import {
  Monitor,
  Search,
  Plus,
  Minus,
  Trash2,
  Printer,
  PauseCircle,
  PlayCircle,
  RefreshCw,
  X,
  CreditCard,
  Banknote,
  Smartphone,
  CheckCircle2,
  AlertCircle,
  ReceiptText
} from 'lucide-react';

export default function PosPage() {
  const [branches, setBranches] = useState<any[]>([]);
  const [activeBranchId, setActiveBranchId] = useState<string>('');
  const [tables, setTables] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // POS Cart State
  const [posCart, setPosCart] = useState<any[]>([]);
  const [selectedTable, setSelectedTable] = useState<any | null>(null);
  const [orderChannel, setOrderChannel] = useState<'DINE_IN' | 'TAKEAWAY'>('DINE_IN');
  const [heldOrders, setHeldOrders] = useState<any[]>([]);

  // Split Payment Modal State
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);
  const [cashAmount, setCashAmount] = useState<number>(0);
  const [upiAmount, setUpiAmount] = useState<number>(0);
  const [cardAmount, setCardAmount] = useState<number>(0);

  // Completed Order / Receipt State
  const [receiptOrder, setReceiptOrder] = useState<any | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  useEffect(() => {
    async function initPos() {
      const [branchesRes, catsRes, itemsRes] = await Promise.all([
        fetchApi('/branches'),
        fetchApi('/menu/categories'),
        fetchApi('/menu/items'),
      ]);

      if (branchesRes.success && branchesRes.data && branchesRes.data.length > 0) {
        setBranches(branchesRes.data);
        const bId = branchesRes.data[0].id;
        setActiveBranchId(bId);
        loadTables(bId);
      }
      if (catsRes.success && catsRes.data) setCategories(catsRes.data);
      if (itemsRes.success && itemsRes.data) setMenuItems(itemsRes.data);
    }
    initPos();
  }, []);

  const loadTables = async (bId: string) => {
    const res = await fetchApi(`/tables/branch/${bId}`);
    if (res.success && res.data) setTables(res.data);
  };

  const handleBranchChange = (bId: string) => {
    setActiveBranchId(bId);
    setSelectedTable(null);
    loadTables(bId);
  };

  const addToCart = (item: any) => {
    setPosCart((prev) => {
      const existing = prev.find((i) => i.menuItemId === item.id);
      if (existing) {
        return prev.map((i) =>
          i.menuItemId === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        {
          menuItemId: item.id,
          name: item.name,
          price: item.basePrice,
          quantity: 1,
          isVeg: item.isVeg,
        },
      ];
    });
  };

  const updateCartQty = (menuItemId: string, delta: number) => {
    setPosCart((prev) =>
      prev
        .map((i) => {
          if (i.menuItemId === menuItemId) {
            const newQty = i.quantity + delta;
            return newQty > 0 ? { ...i, quantity: newQty } : null;
          }
          return i;
        })
        .filter(Boolean)
    );
  };

  const subTotal = posCart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const taxAmount = Math.round(subTotal * 0.05 * 100) / 100;
  const totalAmount = Math.round((subTotal + taxAmount) * 100) / 100;

  // Hold & Resume
  const holdCurrentOrder = () => {
    if (posCart.length === 0) return;
    setHeldOrders((prev) => [
      ...prev,
      {
        id: `HOLD-${Date.now()}`,
        cart: [...posCart],
        table: selectedTable,
        channel: orderChannel,
        time: new Date().toLocaleTimeString(),
      },
    ]);
    setPosCart([]);
    setSelectedTable(null);
  };

  const resumeOrder = (held: any) => {
    setPosCart(held.cart);
    setSelectedTable(held.table);
    setOrderChannel(held.channel);
    setHeldOrders((prev) => prev.filter((h) => h.id !== held.id));
  };

  // Open Payment modal with default full cash
  const openPaymentModal = () => {
    setCashAmount(totalAmount);
    setUpiAmount(0);
    setCardAmount(0);
    setIsPaymentModalOpen(true);
  };

  const handleCompleteOrder = async () => {
    const totalTendered = cashAmount + upiAmount + cardAmount;
    if (Math.abs(totalTendered - totalAmount) > 0.05) {
      alert(`Total tendered ₹${totalTendered} does not match bill total ₹${totalAmount}.`);
      return;
    }

    setIsProcessing(true);

    const paymentsList = [];
    if (cashAmount > 0) paymentsList.push({ method: 'CASH', amount: cashAmount });
    if (upiAmount > 0) paymentsList.push({ method: 'UPI', amount: upiAmount });
    if (cardAmount > 0) paymentsList.push({ method: 'CARD', amount: cardAmount });

    const primaryPaymentMethod = paymentsList[0]?.method || 'CASH';

    const payload = {
      branchId: activeBranchId,
      channel: orderChannel,
      tableId: selectedTable?.id || undefined,
      paymentMethod: primaryPaymentMethod,
      items: posCart.map((i) => ({
        menuItemId: i.menuItemId,
        quantity: i.quantity,
      })),
    };

    const res = await fetchApi('/orders', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    setIsProcessing(false);

    if (res.success && res.data) {
      setReceiptOrder(res.data);
      setPosCart([]);
      setSelectedTable(null);
      setIsPaymentModalOpen(false);
      loadTables(activeBranchId);
    } else {
      alert(res.message || 'Failed to submit order.');
    }
  };

  const filteredMenuItems = menuItems.filter((item) => {
    const matchesCat = selectedCategory === 'all' || item.categoryId === selectedCategory;
    const matchesSearch =
      !searchQuery || item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="h-screen bg-[#0F1115] text-brand-ivory flex flex-col overflow-hidden select-none">
      {/* 1. TOP POS HEADER */}
      <header className="h-14 bg-brand-dark border-b border-brand-cardBorder px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-brand-gold text-brand-dark flex items-center justify-center font-serif font-black text-base">
            KB
          </div>
          <div>
            <div className="font-serif font-bold text-sm tracking-wide flex items-center gap-2">
              <span>KICK BUNK 360</span>
              <span className="text-[10px] bg-brand-gold/20 text-brand-gold px-1.5 py-0.2 rounded font-sans uppercase">
                Toast POS Engine
              </span>
            </div>
          </div>
        </div>

        {/* Branch Selector */}
        <div className="flex items-center gap-3">
          <select
            value={activeBranchId}
            onChange={(e) => handleBranchChange(e.target.value)}
            className="bg-brand-card border border-brand-cardBorder rounded-lg px-3 py-1.5 text-xs text-brand-ivory focus:outline-none focus:border-brand-gold"
          >
            {branches.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name} ({b.code})
              </option>
            ))}
          </select>

          {heldOrders.length > 0 && (
            <div className="flex items-center gap-1.5 bg-amber-950/60 border border-amber-600/40 text-amber-300 px-2.5 py-1 rounded-lg text-xs">
              <PauseCircle className="w-3.5 h-3.5" />
              <span>{heldOrders.length} Held</span>
            </div>
          )}

          <a
            href="/"
            className="text-xs text-gray-400 hover:text-white px-2.5 py-1.5 rounded-lg border border-brand-cardBorder hover:bg-brand-card transition-colors"
          >
            Exit POS
          </a>
        </div>
      </header>

      {/* 2. MAIN POS WORKSPACE */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Column: Tables & Menu Categories & Products */}
        <div className="flex-1 flex flex-col border-r border-brand-cardBorder overflow-hidden">
          {/* Table Selector & Search Bar */}
          <div className="p-3 bg-brand-card border-b border-brand-cardBorder flex items-center gap-3 shrink-0">
            {/* Dine-in vs Takeaway Switcher */}
            <div className="flex bg-brand-dark rounded-lg p-0.5 border border-brand-cardBorder">
              <button
                onClick={() => setOrderChannel('DINE_IN')}
                className={`px-3 py-1 text-xs rounded-md font-medium transition-colors ${
                  orderChannel === 'DINE_IN' ? 'bg-brand-gold text-brand-dark font-bold' : 'text-gray-400'
                }`}
              >
                Dine-In
              </button>
              <button
                onClick={() => {
                  setOrderChannel('TAKEAWAY');
                  setSelectedTable(null);
                }}
                className={`px-3 py-1 text-xs rounded-md font-medium transition-colors ${
                  orderChannel === 'TAKEAWAY' ? 'bg-brand-gold text-brand-dark font-bold' : 'text-gray-400'
                }`}
              >
                Takeaway
              </button>
            </div>

            {/* Table Quick Dropdown */}
            {orderChannel === 'DINE_IN' && (
              <select
                value={selectedTable?.id || ''}
                onChange={(e) => {
                  const t = tables.find((tbl) => tbl.id === e.target.value);
                  setSelectedTable(t || null);
                }}
                className="bg-brand-dark border border-brand-cardBorder rounded-lg px-2.5 py-1.5 text-xs text-brand-ivory focus:border-brand-gold"
              >
                <option value="">Select Table...</option>
                {tables.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.tableNumber} - {t.zone} ({t.status})
                  </option>
                ))}
              </select>
            )}

            {/* Product Search */}
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search dish or item code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-brand-dark border border-brand-cardBorder text-xs text-brand-ivory focus:outline-none focus:border-brand-gold"
              />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="p-2 bg-[#14171C] border-b border-brand-cardBorder flex gap-1.5 overflow-x-auto scrollbar-none shrink-0">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-brand-gold text-brand-dark'
                  : 'bg-brand-card text-gray-400 hover:text-white'
              }`}
            >
              All Items
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === c.id
                    ? 'bg-brand-gold text-brand-dark'
                    : 'bg-brand-card text-gray-400 hover:text-white'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>

          {/* Product Items Grid */}
          <div className="flex-1 p-3 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
            {filteredMenuItems.map((item) => (
              <div
                key={item.id}
                onClick={() => addToCart(item)}
                className="bg-brand-card border border-brand-cardBorder hover:border-brand-gold/60 rounded-xl p-3 flex flex-col justify-between cursor-pointer active:scale-95 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center text-[8px] ${
                        item.isVeg ? 'border-brand-green text-brand-green' : 'border-red-500 text-red-500'
                      }`}
                    >
                      ●
                    </span>
                    <span className="font-serif font-bold text-xs text-brand-gold">
                      ₹{item.basePrice}
                    </span>
                  </div>
                  <h4 className="font-bold text-xs text-brand-ivory group-hover:text-brand-gold transition-colors line-clamp-2">
                    {item.name}
                  </h4>
                </div>
                <div className="text-[10px] text-gray-500 mt-2">
                  {item.category?.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: POS Ticket & Billing Register */}
        <div className="w-80 sm:w-96 bg-brand-card flex flex-col shrink-0">
          {/* Ticket Header */}
          <div className="p-3 bg-[#181B20] border-b border-brand-cardBorder flex items-center justify-between shrink-0">
            <div>
              <span className="text-xs font-bold uppercase text-gray-400">Current Ticket</span>
              <div className="text-xs font-semibold text-brand-gold">
                {orderChannel} {selectedTable ? `• Table ${selectedTable.tableNumber}` : ''}
              </div>
            </div>
            <button
              onClick={() => setPosCart([])}
              className="text-xs text-red-400 hover:underline"
            >
              Clear
            </button>
          </div>

          {/* Ticket Line Items */}
          <div className="flex-1 p-3 overflow-y-auto divide-y divide-brand-cardBorder/60 space-y-2">
            {posCart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-500 text-xs text-center space-y-2">
                <Monitor className="w-8 h-8 text-gray-600" />
                <span>Ticket is empty. Tap menu items to add.</span>
              </div>
            ) : (
              posCart.map((i) => (
                <div key={i.menuItemId} className="pt-2 flex items-center justify-between text-xs">
                  <div className="flex-1 pr-2">
                    <div className="font-semibold text-brand-ivory line-clamp-1">{i.name}</div>
                    <div className="text-[10px] text-gray-400">₹{i.price} each</div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center border border-brand-cardBorder rounded bg-brand-dark">
                      <button
                        onClick={() => updateCartQty(i.menuItemId, -1)}
                        className="p-1 text-gray-400 hover:text-white"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-bold text-brand-ivory">{i.quantity}</span>
                      <button
                        onClick={() => updateCartQty(i.menuItemId, 1)}
                        className="p-1 text-gray-400 hover:text-white"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="font-serif font-bold text-brand-ivory min-w-[50px] text-right">
                      ₹{i.price * i.quantity}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Held Orders Quick Drawer */}
          {heldOrders.length > 0 && (
            <div className="p-2 bg-amber-950/40 border-t border-brand-cardBorder text-xs space-y-1">
              <span className="text-[10px] uppercase font-bold text-amber-400">Held Orders:</span>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {heldOrders.map((h) => (
                  <button
                    key={h.id}
                    onClick={() => resumeOrder(h)}
                    className="px-2 py-1 rounded bg-amber-900/60 border border-amber-600/40 text-amber-200 text-[10px] flex items-center gap-1 shrink-0"
                  >
                    <PlayCircle className="w-3 h-3" />
                    <span>{h.table ? h.table.tableNumber : 'Takeaway'} ({h.time})</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Ticket Financial Totals */}
          <div className="p-4 bg-[#14161B] border-t border-brand-cardBorder space-y-2 text-xs shrink-0">
            <div className="flex justify-between text-gray-400">
              <span>Subtotal</span>
              <span className="font-semibold text-brand-ivory">₹{subTotal}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>GST (5% Restaurant Tax)</span>
              <span>₹{taxAmount}</span>
            </div>
            <div className="pt-2 border-t border-brand-cardBorder flex justify-between text-base font-bold text-brand-gold">
              <span>Grand Total</span>
              <span className="font-serif text-lg">₹{totalAmount}</span>
            </div>

            {/* POS Action Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={holdCurrentOrder}
                disabled={posCart.length === 0}
                className="py-2.5 rounded-lg bg-brand-dark border border-brand-cardBorder hover:bg-gray-800 text-gray-300 font-semibold text-xs flex items-center justify-center gap-1.5"
              >
                <PauseCircle className="w-4 h-4 text-amber-400" />
                <span>Hold Order</span>
              </button>

              <button
                onClick={openPaymentModal}
                disabled={posCart.length === 0}
                className="py-2.5 rounded-lg bg-brand-gold hover:bg-brand-goldHover text-brand-dark font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-brand-gold/20"
              >
                <Banknote className="w-4 h-4" />
                <span>Pay / Settle</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. SPLIT PAYMENT MODAL */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-brand-card border border-brand-cardBorder rounded-2xl max-w-md w-full p-6 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-brand-cardBorder">
              <div>
                <h3 className="font-serif text-lg font-bold text-brand-ivory">Payment & Settlement</h3>
                <p className="text-xs text-gray-400">Total Due: <strong className="text-brand-gold">₹{totalAmount}</strong></p>
              </div>
              <button onClick={() => setIsPaymentModalOpen(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Split Tenders Inputs */}
            <div className="space-y-3 text-xs">
              <div>
                <label className="text-gray-400 block mb-1 flex items-center gap-1.5">
                  <Banknote className="w-3.5 h-3.5 text-brand-green" />
                  <span>Cash Payment</span>
                </label>
                <input
                  type="number"
                  min="0"
                  value={cashAmount}
                  onChange={(e) => setCashAmount(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg bg-brand-dark border border-brand-cardBorder text-brand-ivory font-mono focus:outline-none focus:border-brand-gold"
                />
              </div>

              <div>
                <label className="text-gray-400 block mb-1 flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5 text-brand-gold" />
                  <span>UPI / QR Payment</span>
                </label>
                <input
                  type="number"
                  min="0"
                  value={upiAmount}
                  onChange={(e) => setUpiAmount(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg bg-brand-dark border border-brand-cardBorder text-brand-ivory font-mono focus:outline-none focus:border-brand-gold"
                />
              </div>

              <div>
                <label className="text-gray-400 block mb-1 flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-amber-400" />
                  <span>Card / EDC Payment</span>
                </label>
                <input
                  type="number"
                  min="0"
                  value={cardAmount}
                  onChange={(e) => setCardAmount(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg bg-brand-dark border border-brand-cardBorder text-brand-ivory font-mono focus:outline-none focus:border-brand-gold"
                />
              </div>

              <div className="pt-2 border-t border-brand-cardBorder/60 flex justify-between font-bold">
                <span>Total Tendered:</span>
                <span className={cashAmount + upiAmount + cardAmount === totalAmount ? 'text-brand-green' : 'text-red-400'}>
                  ₹{cashAmount + upiAmount + cardAmount} / ₹{totalAmount}
                </span>
              </div>
            </div>

            <button
              onClick={handleCompleteOrder}
              disabled={isProcessing}
              className="w-full py-3.5 rounded-xl bg-brand-gold hover:bg-brand-goldHover text-brand-dark font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isProcessing ? 'Processing Transaction...' : 'Complete Sale & Route to Kitchen'}</span>
            </button>
          </div>
        </div>
      )}

      {/* 4. GST RECEIPT MODAL */}
      {receiptOrder && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-brand-card border border-brand-cardBorder rounded-2xl max-w-sm w-full p-6 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-brand-cardBorder">
              <span className="text-xs font-bold uppercase text-brand-gold">GST Invoice Receipt</span>
              <button onClick={() => setReceiptOrder(null)} className="text-gray-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-white text-black p-4 rounded-lg font-mono text-[11px] space-y-2 shadow-inner">
              <div className="text-center pb-2 border-b border-dashed border-gray-400">
                <div className="font-bold text-sm">KICK BUNK 360</div>
                <div>Garden Restaurant & Bar</div>
                <div className="text-[9px] text-gray-600">GSTIN: 29ABCDE1234F1Z5</div>
              </div>

              <div className="flex justify-between text-[10px]">
                <span>Bill: {receiptOrder.orderNumber}</span>
                <span>Date: {new Date().toLocaleDateString()}</span>
              </div>

              <div className="py-2 border-y border-dashed border-gray-400 space-y-1">
                {receiptOrder.items?.map((it: any) => (
                  <div key={it.id} className="flex justify-between">
                    <span>{it.quantity}x {it.menuItem?.name || 'Dish'}</span>
                    <span>₹{it.totalPrice}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-0.5 pt-1 text-[10px]">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>₹{receiptOrder.subTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>CGST (2.5%):</span>
                  <span>₹{receiptOrder.invoice?.cgstAmount || (receiptOrder.taxAmount / 2).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>SGST (2.5%):</span>
                  <span>₹{receiptOrder.invoice?.sgstAmount || (receiptOrder.taxAmount / 2).toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-xs pt-1 border-t border-gray-300">
                  <span>NET PAID:</span>
                  <span>₹{receiptOrder.totalAmount}</span>
                </div>
              </div>

              <div className="text-center pt-2 text-[9px] text-gray-500 border-t border-dashed border-gray-400">
                Thank you for dining at Kick Bunk!
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => window.print()}
                className="flex-1 py-2.5 rounded-xl bg-brand-gold text-brand-dark font-bold text-xs flex items-center justify-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Print Bill</span>
              </button>
              <button
                onClick={() => setReceiptOrder(null)}
                className="px-4 py-2.5 rounded-xl bg-brand-cardBorder hover:bg-gray-700 text-xs text-gray-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
