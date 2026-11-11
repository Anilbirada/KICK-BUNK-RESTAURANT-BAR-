'use client';

import React, { useState, useEffect } from 'react';
import { fetchApi } from '../../lib/api';
import { Flame, Clock, CheckCircle2, AlertTriangle, RefreshCw, ChefHat, Volume2 } from 'lucide-react';

export default function KitchenKdsPage() {
  const [branches, setBranches] = useState<any[]>([]);
  const [activeBranchId, setActiveBranchId] = useState<string>('');
  const [stations, setStations] = useState<any[]>([]);
  const [activeStationId, setActiveStationId] = useState<string>('all');
  const [tickets, setTickets] = useState<any[]>([]);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // 1-second clock ticker for live prep timers
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const loadKdsData = async (branchId: string) => {
    setLoading(true);
    const [branchRes, ticketsRes] = await Promise.all([
      fetchApi(`/branches/${branchId}`),
      fetchApi(`/kitchen/tickets?branchId=${branchId}`),
    ]);

    if (branchRes.success && branchRes.data) {
      setStations(branchRes.data.kitchenStations || []);
    }
    if (ticketsRes.success && ticketsRes.data) {
      setTickets(ticketsRes.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchApi('/branches').then((res) => {
      if (res.success && res.data && res.data.length > 0) {
        setBranches(res.data);
        const bId = res.data[0].id;
        setActiveBranchId(bId);
        loadKdsData(bId);
      }
    });

    // Auto-refresh KDS tickets every 5 seconds as fail-safe
    const pollInterval = setInterval(() => {
      if (activeBranchId) {
        fetchApi(`/kitchen/tickets?branchId=${activeBranchId}`).then((res) => {
          if (res.success && res.data) setTickets(res.data);
        });
      }
    }, 5000);

    return () => clearInterval(pollInterval);
  }, [activeBranchId]);

  const handleBumpStatus = async (ticketId: string, currentStatus: string) => {
    let nextStatus = 'ACCEPTED';
    if (currentStatus === 'RECEIVED') nextStatus = 'ACCEPTED';
    else if (currentStatus === 'ACCEPTED') nextStatus = 'PREPARING';
    else if (currentStatus === 'PREPARING') nextStatus = 'READY';
    else if (currentStatus === 'READY') nextStatus = 'COMPLETED';

    const res = await fetchApi(`/kitchen/tickets/${ticketId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status: nextStatus }),
    });

    if (res.success) {
      if (nextStatus === 'COMPLETED') {
        setTickets((prev) => prev.filter((t) => t.id !== ticketId));
      } else {
        setTickets((prev) =>
          prev.map((t) => (t.id === ticketId ? { ...t, status: nextStatus } : t))
        );
      }
    }
  };

  const getElapsedTimeMin = (createdAt: string) => {
    const elapsedMs = currentTime.getTime() - new Date(createdAt).getTime();
    return Math.floor(elapsedMs / 60000);
  };

  const filteredTickets = tickets.filter((t) => {
    if (activeStationId === 'all') return true;
    return t.stationId === activeStationId;
  });

  return (
    <div className="h-screen bg-[#0A0C0E] text-white flex flex-col overflow-hidden select-none">
      {/* 1. TOP KDS BAR */}
      <header className="h-16 bg-[#121417] border-b border-brand-cardBorder px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-brand-dark flex items-center justify-center font-bold">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-serif font-bold text-lg text-brand-ivory flex items-center gap-2">
              <span>KICK BUNK KDS</span>
              <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded font-sans uppercase font-bold">
                Live Kitchen Display
              </span>
            </h1>
            <div className="text-xs text-gray-400">
              Active Branch: <strong>{branches.find((b) => b.id === activeBranchId)?.name}</strong>
            </div>
          </div>
        </div>

        {/* Station Selector & Auto-refresh */}
        <div className="flex items-center gap-4">
          <div className="flex bg-brand-dark rounded-xl p-1 border border-brand-cardBorder">
            <button
              onClick={() => setActiveStationId('all')}
              className={`px-3 py-1.5 text-xs rounded-lg font-bold transition-colors ${
                activeStationId === 'all' ? 'bg-amber-500 text-brand-dark' : 'text-gray-400 hover:text-white'
              }`}
            >
              All Stations ({tickets.length})
            </button>
            {stations.map((st) => (
              <button
                key={st.id}
                onClick={() => setActiveStationId(st.id)}
                className={`px-3 py-1.5 text-xs rounded-lg font-bold transition-colors ${
                  activeStationId === st.id ? 'bg-amber-500 text-brand-dark' : 'text-gray-400 hover:text-white'
                }`}
              >
                {st.name}
              </button>
            ))}
          </div>

          <button
            onClick={() => loadKdsData(activeBranchId)}
            className="p-2 rounded-xl bg-brand-dark hover:bg-gray-800 text-gray-300 border border-brand-cardBorder transition-colors"
            title="Refresh Tickets"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <a
            href="/"
            className="text-xs text-gray-400 hover:text-white px-3 py-1.5 rounded-lg border border-brand-cardBorder bg-brand-dark"
          >
            Exit KDS
          </a>
        </div>
      </header>

      {/* 2. TICKETS WORKSPACE */}
      <div className="flex-1 p-6 overflow-x-auto overflow-y-hidden bg-[#0A0C0E]">
        {filteredTickets.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-500 text-center space-y-3">
            <ChefHat className="w-16 h-16 text-gray-600" />
            <h2 className="text-xl font-serif font-bold text-gray-400">All Kitchen Orders Cleared!</h2>
            <p className="text-xs text-gray-600">New orders from POS or Online Ordering will appear here immediately.</p>
          </div>
        ) : (
          <div className="flex gap-5 h-full items-start">
            {filteredTickets.map((t) => {
              const elapsedMin = getElapsedTimeMin(t.createdAt);
              // Delay color coding
              const isDelayed = elapsedMin >= 20;
              const isWarning = elapsedMin >= 10 && elapsedMin < 20;

              return (
                <div
                  key={t.id}
                  className={`w-80 shrink-0 bg-[#16181D] rounded-2xl border flex flex-col max-h-full overflow-hidden shadow-2xl transition-all ${
                    isDelayed
                      ? 'border-red-500/80 shadow-red-950/40'
                      : isWarning
                      ? 'border-amber-500/80 shadow-amber-950/30'
                      : 'border-brand-cardBorder'
                  }`}
                >
                  {/* Ticket Header */}
                  <div
                    className={`p-3.5 flex items-center justify-between border-b ${
                      isDelayed
                        ? 'bg-red-950/50 border-red-500/50 text-red-200'
                        : isWarning
                        ? 'bg-amber-950/50 border-amber-500/50 text-amber-200'
                        : 'bg-[#1C1F26] border-brand-cardBorder text-gray-200'
                    }`}
                  >
                    <div>
                      <div className="font-mono font-bold text-base tracking-wide flex items-center gap-1.5">
                        <span>{t.ticketNumber || t.order?.orderNumber}</span>
                      </div>
                      <div className="text-[11px] font-semibold text-brand-gold uppercase">
                        {t.order?.channel} {t.order?.table ? `• Table ${t.order?.table?.tableNumber}` : ''}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-black/40">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{elapsedMin}m</span>
                    </div>
                  </div>

                  {/* Ticket Line Items */}
                  <div className="flex-1 p-4 overflow-y-auto space-y-3 divide-y divide-brand-cardBorder/40">
                    {t.order?.items?.map((it: any) => (
                      <div key={it.id} className="pt-2.5 first:pt-0 space-y-1">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-md bg-amber-500 text-brand-dark font-bold text-xs flex items-center justify-center shrink-0">
                              {it.quantity}x
                            </span>
                            <span className="font-bold text-sm text-brand-ivory">{it.menuItem?.name}</span>
                          </div>
                        </div>

                        {it.variant && (
                          <div className="text-[11px] text-brand-gold pl-8">Portion: {it.variant.name}</div>
                        )}

                        {it.modifiers && it.modifiers.length > 0 && (
                          <div className="text-[10px] text-gray-400 pl-8">
                            Add-ons: {it.modifiers.map((m: any) => m.addon?.name).join(', ')}
                          </div>
                        )}

                        {it.specialNotes && (
                          <div className="text-[10px] text-amber-300 italic pl-8 font-medium">
                            ★ Note: {it.specialNotes}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Bump Action Button */}
                  <div className="p-3 bg-[#111317] border-t border-brand-cardBorder">
                    <button
                      onClick={() => handleBumpStatus(t.id, t.status)}
                      className={`w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                        t.status === 'RECEIVED'
                          ? 'bg-blue-600 hover:bg-blue-500 text-white'
                          : t.status === 'ACCEPTED'
                          ? 'bg-amber-500 hover:bg-amber-400 text-brand-dark'
                          : t.status === 'PREPARING'
                          ? 'bg-purple-600 hover:bg-purple-500 text-white'
                          : 'bg-brand-green hover:bg-brand-greenHover text-white'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>
                        {t.status === 'RECEIVED' && 'Accept Order'}
                        {t.status === 'ACCEPTED' && 'Start Preparing'}
                        {t.status === 'PREPARING' && 'Mark Ready'}
                        {t.status === 'READY' && 'Complete & Bump Out'}
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
