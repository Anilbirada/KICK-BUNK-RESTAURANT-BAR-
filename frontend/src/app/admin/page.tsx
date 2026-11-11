'use client';

import React, { useState, useEffect } from 'react';
import { fetchApi } from '../../lib/api';
import {
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Users,
  Store,
  Layers,
  ChefHat,
  Calendar,
  AlertTriangle,
  FileText,
  Lock,
  LogOut,
  RefreshCw,
  Search,
  CheckCircle2,
  Clock,
  Sparkles,
  Image as ImageIcon,
  MapPin,
  Utensils,
  Plus,
  Trash2,
  Edit3,
  ExternalLink,
  Eye,
  Save,
  Check,
  X,
  Phone,
  Video,
  Film
} from 'lucide-react';

type AdminTab =
  | 'ANALYTICS'
  | 'ORDERS'
  | 'INVENTORY'
  | 'RECIPES'
  | 'RESERVATIONS'
  | 'INQUIRIES'
  | 'MEDIA'
  | 'VENUE_INFO'
  | 'MENU_MGMT';

export default function AdminDashboardPage() {
  const [token, setToken] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<any | null>(null);

  // Login form state
  const [emailInput, setEmailInput] = useState<string>('owner@kickbunk.com');
  const [passwordInput, setPasswordInput] = useState<string>('KickBunk@2026');
  const [loginError, setLoginError] = useState<string | null>(null);

  // Active admin tab
  const [activeTab, setActiveTab] = useState<AdminTab>('ANALYTICS');

  // Dashboard Data State
  const [metrics, setMetrics] = useState<any | null>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [inventoryItems, setInventoryItems] = useState<any[]>([]);
  const [recipes, setRecipes] = useState<any[]>([]);
  const [reservations, setReservations] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [mediaAssets, setMediaAssets] = useState<any[]>([]);
  const [branches, setBranches] = useState<any[]>([]);
  const [menuCategories, setMenuCategories] = useState<any[]>([]);
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Media Tab Sub-State
  const [selectedMediaCategory, setSelectedMediaCategory] = useState<string>('ALL');
  const [isMediaModalOpen, setIsMediaModalOpen] = useState<boolean>(false);
  const [editingMedia, setEditingMedia] = useState<any | null>(null);
  const [mediaFormData, setMediaFormData] = useState({
    title: '',
    category: 'OUTDOOR',
    subCategory: '',
    url: '',
    thumbnailUrl: '',
    altText: '',
    sourceNotes: '',
    externalSourceUrl: '',
    featuredInHero: false,
  });

  // Venue Info Sub-State
  const [selectedBranchId, setSelectedBranchId] = useState<string>('');
  const [venueFormData, setVenueFormData] = useState({
    name: '',
    code: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    googleMapsUrl: '',
    latitude: 12.8398,
    longitude: 77.6775,
  });

  // Menu Management Sub-State
  const [selectedMenuCategory, setSelectedMenuCategory] = useState<string>('ALL');
  const [menuSearchQuery, setMenuSearchQuery] = useState<string>('');
  const [isMenuModalOpen, setIsMenuModalOpen] = useState<boolean>(false);
  const [editingMenuItem, setEditingMenuItem] = useState<any | null>(null);
  const [menuFormData, setMenuFormData] = useState({
    categoryId: '',
    name: '',
    description: '',
    basePrice: '',
    isVeg: false,
    spiceLevel: 1,
    prepTimeMin: 15,
    isBestSeller: false,
    isActive: true,
    imageUrl: '',
  });

  useEffect(() => {
    const savedToken = localStorage.getItem('kb360_token');
    const savedUser = localStorage.getItem('kb360_user');
    if (savedToken && savedUser) {
      setToken(savedToken);
      setCurrentUser(JSON.parse(savedUser));
      loadAllAdminData();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setLoading(true);

    const res = await fetchApi('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ emailOrPhone: emailInput, password: passwordInput }),
    });

    setLoading(false);

    if (res.success && res.data) {
      localStorage.setItem('kb360_token', res.data.token);
      localStorage.setItem('kb360_user', JSON.stringify(res.data.user));
      setToken(res.data.token);
      setCurrentUser(res.data.user);
      loadAllAdminData();
    } else {
      setLoginError(res.message || 'Invalid credentials');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('kb360_token');
    localStorage.removeItem('kb360_user');
    setToken(null);
    setCurrentUser(null);
  };

  const showNotification = (type: 'success' | 'error', text: string) => {
    setStatusMessage({ type, text });
    setTimeout(() => setStatusMessage(null), 4000);
  };

  const loadAllAdminData = async () => {
    setLoading(true);
    try {
      const [
        dashRes,
        ordersRes,
        invRes,
        recRes,
        resRes,
        inqRes,
        mediaRes,
        branchRes,
        catRes,
        itemsRes,
      ] = await Promise.all([
        fetchApi('/reports/dashboard'),
        fetchApi('/orders?limit=30'),
        fetchApi('/inventory/items'),
        fetchApi('/inventory/recipes'),
        fetchApi('/tables/reservations'),
        fetchApi('/inquiries'),
        fetchApi('/media'),
        fetchApi('/branches'),
        fetchApi('/menu/categories'),
        fetchApi('/menu/items'),
      ]);

      if (dashRes.success && dashRes.data) setMetrics(dashRes.data);
      if (ordersRes.success && ordersRes.data) setOrders(ordersRes.data);
      if (invRes.success && invRes.data) setInventoryItems(invRes.data);
      if (recRes.success && recRes.data) setRecipes(recRes.data);
      if (resRes.success && resRes.data) setReservations(resRes.data);
      if (inqRes.success && inqRes.data) setInquiries(inqRes.data);
      if (mediaRes.success && mediaRes.data) setMediaAssets(mediaRes.data);
      if (branchRes.success && branchRes.data) {
        setBranches(branchRes.data);
        if (branchRes.data.length > 0) {
          const mainBranch = branchRes.data[0];
          setSelectedBranchId(mainBranch.id);
          setVenueFormData({
            name: mainBranch.name || '',
            code: mainBranch.code || '',
            phone: mainBranch.phone || '',
            address: mainBranch.address || '',
            city: mainBranch.city || '',
            state: mainBranch.state || '',
            pincode: mainBranch.pincode || '',
            googleMapsUrl: mainBranch.googleMapsUrl || '',
            latitude: mainBranch.latitude || 12.8398,
            longitude: mainBranch.longitude || 77.6775,
          });
        }
      }
      if (catRes.success && catRes.data) setMenuCategories(catRes.data);
      if (itemsRes.success && itemsRes.data) setMenuItems(itemsRes.data);
    } catch (err) {
      console.error('Error loading dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleResolveInquiry = async (id: string) => {
    const res = await fetchApi(`/inquiries/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status: 'RESOLVED', response: 'Handled by management team.' }),
    });
    if (res.success) {
      setInquiries((prev) =>
        prev.map((i) => (i.id === id ? { ...i, status: 'RESOLVED' } : i))
      );
      showNotification('success', 'Inquiry marked as resolved');
    }
  };

  // ----------------------------------------------------
  // MEDIA MANAGEMENT HANDLERS
  // ----------------------------------------------------
  const handleOpenAddMediaModal = () => {
    setEditingMedia(null);
    setMediaFormData({
      title: '',
      category: 'OUTDOOR',
      subCategory: '',
      url: '',
      thumbnailUrl: '',
      altText: '',
      sourceNotes: 'Official Kick Bunk Photograph',
      externalSourceUrl: '',
      featuredInHero: false,
    });
    setIsMediaModalOpen(true);
  };

  const handleOpenEditMediaModal = (asset: any) => {
    setEditingMedia(asset);
    setMediaFormData({
      title: asset.title || '',
      category: asset.category || 'OUTDOOR',
      subCategory: asset.subCategory || '',
      url: asset.url || '',
      thumbnailUrl: asset.thumbnailUrl || asset.url || '',
      altText: asset.altText || '',
      sourceNotes: asset.sourceNotes || '',
      externalSourceUrl: asset.externalSourceUrl || '',
      featuredInHero: Boolean(asset.featuredInHero),
    });
    setIsMediaModalOpen(true);
  };

  const handleSaveMedia = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mediaFormData.title || !mediaFormData.url) {
      showNotification('error', 'Title and Media URL are required.');
      return;
    }

    if (editingMedia) {
      // Update
      const res = await fetchApi(`/media/${editingMedia.id}`, {
        method: 'PUT',
        body: JSON.stringify(mediaFormData),
      });
      if (res.success && res.data) {
        setMediaAssets((prev) =>
          prev.map((m) => (m.id === editingMedia.id ? res.data : m))
        );
        showNotification('success', 'Media asset updated successfully.');
        setIsMediaModalOpen(false);
      } else {
        showNotification('error', res.message || 'Failed to update media asset.');
      }
    } else {
      // Create
      const res = await fetchApi('/media', {
        method: 'POST',
        body: JSON.stringify(mediaFormData),
      });
      if (res.success && res.data) {
        setMediaAssets((prev) => [res.data, ...prev]);
        showNotification('success', 'New media asset added to gallery.');
        setIsMediaModalOpen(false);
      } else {
        showNotification('error', res.message || 'Failed to create media asset.');
      }
    }
  };

  const handleDeleteMedia = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this media asset?')) return;
    const res = await fetchApi(`/media/${id}`, { method: 'DELETE' });
    if (res.success) {
      setMediaAssets((prev) => prev.filter((m) => m.id !== id));
      showNotification('success', 'Media asset deleted successfully.');
    } else {
      showNotification('error', res.message || 'Failed to delete media asset.');
    }
  };

  // ----------------------------------------------------
  // VENUE INFORMATION HANDLERS
  // ----------------------------------------------------
  const handleSelectBranch = (branchId: string) => {
    setSelectedBranchId(branchId);
    const b = branches.find((item) => item.id === branchId);
    if (b) {
      setVenueFormData({
        name: b.name || '',
        code: b.code || '',
        phone: b.phone || '',
        address: b.address || '',
        city: b.city || '',
        state: b.state || '',
        pincode: b.pincode || '',
        googleMapsUrl: b.googleMapsUrl || '',
        latitude: b.latitude || 12.8398,
        longitude: b.longitude || 77.6775,
      });
    }
  };

  const handleSaveVenueInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBranchId) return;

    const res = await fetchApi(`/branches/${selectedBranchId}`, {
      method: 'PUT',
      body: JSON.stringify(venueFormData),
    });

    if (res.success && res.data) {
      setBranches((prev) =>
        prev.map((b) => (b.id === selectedBranchId ? res.data : b))
      );
      showNotification('success', 'Venue information updated successfully across public website.');
    } else {
      showNotification('error', res.message || 'Failed to update venue details.');
    }
  };

  // ----------------------------------------------------
  // MENU MANAGEMENT HANDLERS
  // ----------------------------------------------------
  const handleOpenAddMenuModal = () => {
    setEditingMenuItem(null);
    setMenuFormData({
      categoryId: menuCategories[0]?.id || '',
      name: '',
      description: '',
      basePrice: '',
      isVeg: false,
      spiceLevel: 1,
      prepTimeMin: 15,
      isBestSeller: false,
      isActive: true,
      imageUrl: '',
    });
    setIsMenuModalOpen(true);
  };

  const handleOpenEditMenuModal = (item: any) => {
    setEditingMenuItem(item);
    setMenuFormData({
      categoryId: item.categoryId || '',
      name: item.name || '',
      description: item.description || '',
      basePrice: String(item.basePrice || ''),
      isVeg: Boolean(item.isVeg),
      spiceLevel: item.spiceLevel || 1,
      prepTimeMin: item.prepTimeMin || 15,
      isBestSeller: Boolean(item.isBestSeller),
      isActive: Boolean(item.isActive),
      imageUrl: item.images?.[0]?.imageUrl || '',
    });
    setIsMenuModalOpen(true);
  };

  const handleSaveMenuItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!menuFormData.name || !menuFormData.basePrice || !menuFormData.categoryId) {
      showNotification('error', 'Category, Name, and Base Price are required.');
      return;
    }

    if (editingMenuItem) {
      const res = await fetchApi(`/menu/items/${editingMenuItem.id}`, {
        method: 'PUT',
        body: JSON.stringify(menuFormData),
      });
      if (res.success && res.data) {
        setMenuItems((prev) =>
          prev.map((m) => (m.id === editingMenuItem.id ? res.data : m))
        );
        showNotification('success', `Menu item "${res.data.name}" updated successfully.`);
        setIsMenuModalOpen(false);
      } else {
        showNotification('error', res.message || 'Failed to update menu item.');
      }
    } else {
      const res = await fetchApi('/menu/items', {
        method: 'POST',
        body: JSON.stringify(menuFormData),
      });
      if (res.success && res.data) {
        setMenuItems((prev) => [res.data, ...prev]);
        showNotification('success', `New menu item "${res.data.name}" created.`);
        setIsMenuModalOpen(false);
      } else {
        showNotification('error', res.message || 'Failed to create menu item.');
      }
    }
  };

  const handleToggleMenuItemActive = async (item: any) => {
    const updatedStatus = !item.isActive;
    const res = await fetchApi(`/menu/items/${item.id}`, {
      method: 'PUT',
      body: JSON.stringify({ isActive: updatedStatus }),
    });
    if (res.success && res.data) {
      setMenuItems((prev) =>
        prev.map((m) => (m.id === item.id ? { ...m, isActive: updatedStatus } : m))
      );
      showNotification('success', `Status updated for "${item.name}".`);
    } else {
      showNotification('error', 'Failed to toggle availability.');
    }
  };

  const handleDeleteMenuItem = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to permanently delete "${name}"?`)) return;
    const res = await fetchApi(`/menu/items/${id}`, { method: 'DELETE' });
    if (res.success) {
      setMenuItems((prev) => prev.filter((m) => m.id !== id));
      showNotification('success', `"${name}" removed from menu.`);
    } else {
      showNotification('error', res.message || 'Failed to delete dish.');
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center p-4">
        <div className="bg-brand-card border border-brand-cardBorder rounded-3xl p-8 sm:p-10 max-w-md w-full space-y-6 shadow-2xl">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-gold to-brand-amber text-brand-dark flex items-center justify-center font-serif font-black text-2xl mx-auto">
              KB
            </div>
            <h1 className="text-2xl font-serif font-bold text-brand-ivory">Owner & Executive Portal</h1>
            <p className="text-xs text-gray-400">Kick Bunk 360 Centralized Restaurant Management</p>
          </div>

          {loginError && (
            <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/50 text-red-300 text-xs text-center font-medium">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-300">Email Address</label>
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-brand-dark border border-brand-cardBorder text-xs text-brand-ivory focus:outline-none focus:border-brand-gold"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-300">Password</label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-brand-dark border border-brand-cardBorder text-xs text-brand-ivory focus:outline-none focus:border-brand-gold"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-brand-gold hover:bg-brand-goldHover text-brand-dark font-bold text-xs transition-all shadow-lg shadow-brand-gold/20 flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>{loading ? 'Authenticating...' : 'Sign In as Business Owner'}</span>
            </button>
          </form>

          <div className="p-3 bg-brand-dark rounded-xl border border-brand-cardBorder/60 text-[11px] text-gray-400 space-y-1">
            <div className="font-semibold text-gray-300">Verified Credentials:</div>
            <div>Owner: <code className="text-brand-gold">owner@kickbunk.com</code> / <code className="text-brand-gold">KickBunk@2026</code></div>
            <div>Admin: <code className="text-brand-gold">admin@kickbunk.com</code> / <code className="text-brand-gold">KickBunk@2026</code></div>
          </div>
        </div>
      </div>
    );
  }

  const summary = metrics?.summary || {};

  // Filtered media assets
  const filteredMedia = mediaAssets.filter((asset) => {
    if (selectedMediaCategory === 'ALL') return true;
    if (selectedMediaCategory === 'VIDEOS') return asset.category === 'VIDEOS' || asset.url?.includes('magicpin') || asset.url?.includes('reel');
    return asset.category === selectedMediaCategory;
  });

  // Filtered menu items
  const filteredMenuItems = menuItems.filter((item) => {
    const matchesCat = selectedMenuCategory === 'ALL' || item.categoryId === selectedMenuCategory;
    const matchesSearch =
      !menuSearchQuery ||
      item.name.toLowerCase().includes(menuSearchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(menuSearchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0D0F12] text-brand-ivory py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* GLOBAL TOAST NOTIFICATION */}
      {statusMessage && (
        <div
          className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-2xl shadow-2xl border text-xs font-bold flex items-center gap-2 animate-bounce ${
            statusMessage.type === 'success'
              ? 'bg-brand-green/20 border-brand-green text-brand-green backdrop-blur-md'
              : 'bg-red-950/80 border-red-500 text-red-200 backdrop-blur-md'
          }`}
        >
          {statusMessage.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* 1. TOP EXECUTIVE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-brand-cardBorder">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-brand-gold text-brand-dark flex items-center justify-center font-serif font-black text-xl shadow-lg shadow-brand-gold/20">
            KB
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-serif font-bold text-brand-ivory">Executive Suite</h1>
              <span className="px-2 py-0.5 rounded bg-brand-gold/20 text-brand-gold text-[10px] font-bold uppercase font-sans">
                {currentUser?.roles?.[0] || 'OWNER'}
              </span>
            </div>
            <p className="text-xs text-gray-400">
              Welcome back, <strong>{currentUser?.fullName}</strong> • Live Multi-Branch Enterprise Console
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadAllAdminData}
            className="p-2.5 rounded-xl bg-brand-card hover:bg-brand-cardBorder border border-brand-cardBorder text-gray-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh All Data</span>
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2.5 rounded-xl bg-red-950/40 hover:bg-red-900/60 border border-red-500/40 text-red-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* 2. ADMIN NAVIGATION TABS */}
      <div className="flex gap-2 border-b border-brand-cardBorder pb-2 overflow-x-auto scrollbar-none">
        {[
          { key: 'ANALYTICS', label: 'Financial Analytics', icon: TrendingUp },
          { key: 'MEDIA', label: `Media Gallery (${mediaAssets.length})`, icon: ImageIcon },
          { key: 'VENUE_INFO', label: 'Venue Information', icon: MapPin },
          { key: 'MENU_MGMT', label: `Menu Items (${menuItems.length})`, icon: Utensils },
          { key: 'ORDERS', label: 'Orders Register', icon: ShoppingBag },
          { key: 'INVENTORY', label: 'Inventory & Stock Alerts', icon: Layers },
          { key: 'RECIPES', label: 'Recipe Food Costing', icon: ChefHat },
          { key: 'RESERVATIONS', label: 'Table Reservations', icon: Calendar },
          { key: 'INQUIRIES', label: `Customer Inquiries (${inquiries.filter((i) => i.status === 'NEW').length} New)`, icon: FileText },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as AdminTab)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.key
                  ? 'bg-brand-gold text-brand-dark shadow-md shadow-brand-gold/20'
                  : 'bg-brand-card text-gray-400 hover:text-white border border-brand-cardBorder'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 3. TAB CONTENT */}

      {/* -------------------- TAB: MEDIA GALLERY -------------------- */}
      {activeTab === 'MEDIA' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-brand-card p-6 rounded-2xl border border-brand-cardBorder">
            <div>
              <h2 className="font-serif font-bold text-lg text-brand-ivory flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-brand-gold" />
                <span>Gallery & Media Management</span>
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                Upload, categorize, and organize authentic photographs, videos, and reels displayed on public website pages.
              </p>
            </div>
            <button
              onClick={handleOpenAddMediaModal}
              className="px-4 py-2.5 rounded-xl bg-brand-gold hover:bg-brand-goldHover text-brand-dark font-bold text-xs flex items-center gap-2 shadow-lg shadow-brand-gold/20 transition-all self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Add Media Asset</span>
            </button>
          </div>

          {/* Category Filter Pills */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {[
              { key: 'ALL', label: 'All Assets' },
              { key: 'INTERIOR', label: 'Interior' },
              { key: 'OUTDOOR', label: 'Outdoor' },
              { key: 'GARDEN', label: 'Garden' },
              { key: 'FOOD', label: 'Food & Dishes' },
              { key: 'DRINKS', label: 'Drinks & Cocktails' },
              { key: 'BAR', label: 'Resto-Bar' },
              { key: 'EVENTS', label: 'Events' },
              { key: 'EXTERIOR', label: 'Exterior' },
              { key: 'VIDEOS', label: 'Videos & Reels' },
            ].map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedMediaCategory(cat.key)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedMediaCategory === cat.key
                    ? 'bg-brand-gold text-brand-dark'
                    : 'bg-brand-card border border-brand-cardBorder text-gray-400 hover:text-brand-ivory'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Media Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredMedia.map((asset) => (
              <div
                key={asset.id}
                className="bg-brand-card rounded-2xl border border-brand-cardBorder overflow-hidden group hover:border-brand-gold/50 transition-all flex flex-col justify-between"
              >
                <div className="relative aspect-[4/3] bg-brand-dark overflow-hidden">
                  {asset.category === 'VIDEOS' ? (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-brand-dark/80 text-brand-gold p-4 text-center">
                      <Film className="w-10 h-10 mb-2" />
                      <span className="text-xs font-bold text-brand-ivory">{asset.title}</span>
                      <span className="text-[10px] text-gray-400 mt-1">Video Stream</span>
                    </div>
                  ) : (
                    <img
                      src={asset.thumbnailUrl || asset.url}
                      alt={asset.altText || asset.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}

                  <div className="absolute top-2 left-2 flex gap-1 flex-wrap">
                    <span className="px-2 py-0.5 rounded-md bg-brand-dark/90 text-[10px] font-bold text-brand-gold border border-brand-cardBorder">
                      {asset.category}
                    </span>
                    {asset.featuredInHero && (
                      <span className="px-2 py-0.5 rounded-md bg-brand-gold text-[10px] font-bold text-brand-dark">
                        HERO
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-brand-ivory line-clamp-1">{asset.title}</h4>
                    {asset.subCategory && (
                      <p className="text-[10px] text-gray-400">{asset.subCategory}</p>
                    )}
                    {asset.sourceNotes && (
                      <div className="mt-1 flex items-center gap-1 text-[10px] text-brand-green">
                        <CheckCircle2 className="w-3 h-3" />
                        <span className="line-clamp-1">{asset.sourceNotes}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-2 border-t border-brand-cardBorder/60 flex items-center justify-between">
                    {asset.externalSourceUrl ? (
                      <a
                        href={asset.externalSourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[10px] text-gray-400 hover:text-brand-gold flex items-center gap-1"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Source</span>
                      </a>
                    ) : (
                      <span className="text-[10px] text-gray-500">Local Verified</span>
                    )}

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleOpenEditMediaModal(asset)}
                        className="p-1.5 rounded-lg bg-brand-dark hover:bg-brand-cardBorder text-gray-300 hover:text-brand-gold transition-colors"
                        title="Edit Details"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteMedia(asset.id)}
                        className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-300 transition-colors"
                        title="Delete Media"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Modal for Add / Edit Media */}
          {isMediaModalOpen && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-brand-card border border-brand-cardBorder rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between pb-3 border-b border-brand-cardBorder">
                  <h3 className="font-serif font-bold text-base text-brand-ivory">
                    {editingMedia ? 'Edit Media Asset' : 'Add New Media Asset'}
                  </h3>
                  <button
                    onClick={() => setIsMediaModalOpen(false)}
                    className="p-1 rounded-lg hover:bg-brand-dark text-gray-400 hover:text-brand-ivory"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveMedia} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-300">Title / Caption</label>
                    <input
                      type="text"
                      required
                      value={mediaFormData.title}
                      onChange={(e) => setMediaFormData({ ...mediaFormData, title: e.target.value })}
                      placeholder="e.g. Garden Dining Cabanas & Ambient Night Lighting"
                      className="w-full px-3 py-2 rounded-xl bg-brand-dark border border-brand-cardBorder text-xs text-brand-ivory focus:outline-none focus:border-brand-gold"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-300">Category</label>
                      <select
                        value={mediaFormData.category}
                        onChange={(e) => setMediaFormData({ ...mediaFormData, category: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-brand-dark border border-brand-cardBorder text-xs text-brand-ivory focus:outline-none focus:border-brand-gold"
                      >
                        <option value="INTERIOR">INTERIOR</option>
                        <option value="OUTDOOR">OUTDOOR</option>
                        <option value="GARDEN">GARDEN</option>
                        <option value="FOOD">FOOD</option>
                        <option value="DRINKS">DRINKS</option>
                        <option value="BAR">BAR</option>
                        <option value="EVENTS">EVENTS</option>
                        <option value="EXTERIOR">EXTERIOR</option>
                        <option value="VIDEOS">VIDEOS</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-300">Sub-Category</label>
                      <input
                        type="text"
                        value={mediaFormData.subCategory}
                        onChange={(e) => setMediaFormData({ ...mediaFormData, subCategory: e.target.value })}
                        placeholder="e.g. Cabanas & Fairy Lights"
                        className="w-full px-3 py-2 rounded-xl bg-brand-dark border border-brand-cardBorder text-xs text-brand-ivory focus:outline-none focus:border-brand-gold"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-300">Media URL (Local or CDN)</label>
                    <input
                      type="text"
                      required
                      value={mediaFormData.url}
                      onChange={(e) => setMediaFormData({ ...mediaFormData, url: e.target.value })}
                      placeholder="/images/kickbunk/photo_...jpg or https://..."
                      className="w-full px-3 py-2 rounded-xl bg-brand-dark border border-brand-cardBorder text-xs text-brand-ivory focus:outline-none focus:border-brand-gold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-300">Thumbnail URL (Optional)</label>
                    <input
                      type="text"
                      value={mediaFormData.thumbnailUrl}
                      onChange={(e) => setMediaFormData({ ...mediaFormData, thumbnailUrl: e.target.value })}
                      placeholder="Leave blank to use main URL"
                      className="w-full px-3 py-2 rounded-xl bg-brand-dark border border-brand-cardBorder text-xs text-brand-ivory focus:outline-none focus:border-brand-gold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-300">Alt Text (Accessibility / SEO)</label>
                    <input
                      type="text"
                      value={mediaFormData.altText}
                      onChange={(e) => setMediaFormData({ ...mediaFormData, altText: e.target.value })}
                      placeholder="e.g. Kick Bunk Bengaluru outdoor garden seating"
                      className="w-full px-3 py-2 rounded-xl bg-brand-dark border border-brand-cardBorder text-xs text-brand-ivory focus:outline-none focus:border-brand-gold"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-300">Source Notes</label>
                      <input
                        type="text"
                        value={mediaFormData.sourceNotes}
                        onChange={(e) => setMediaFormData({ ...mediaFormData, sourceNotes: e.target.value })}
                        placeholder="e.g. Magicpin Verified Photo"
                        className="w-full px-3 py-2 rounded-xl bg-brand-dark border border-brand-cardBorder text-xs text-brand-ivory focus:outline-none focus:border-brand-gold"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-300">External Source Link</label>
                      <input
                        type="text"
                        value={mediaFormData.externalSourceUrl}
                        onChange={(e) => setMediaFormData({ ...mediaFormData, externalSourceUrl: e.target.value })}
                        placeholder="https://magicpin.in/..."
                        className="w-full px-3 py-2 rounded-xl bg-brand-dark border border-brand-cardBorder text-xs text-brand-ivory focus:outline-none focus:border-brand-gold"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="checkbox"
                      id="heroCheck"
                      checked={mediaFormData.featuredInHero}
                      onChange={(e) => setMediaFormData({ ...mediaFormData, featuredInHero: e.target.checked })}
                      className="w-4 h-4 rounded text-brand-gold focus:ring-0 bg-brand-dark border-brand-cardBorder"
                    />
                    <label htmlFor="heroCheck" className="text-xs text-gray-300">
                      Feature in Homepage Showcase / Hero
                    </label>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-brand-cardBorder">
                    <button
                      type="button"
                      onClick={() => setIsMediaModalOpen(false)}
                      className="px-4 py-2 rounded-xl bg-brand-dark hover:bg-brand-cardBorder text-xs text-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-brand-gold hover:bg-brand-goldHover text-brand-dark font-bold text-xs shadow-md shadow-brand-gold/20"
                    >
                      {editingMedia ? 'Update Media' : 'Save Asset'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* -------------------- TAB: VENUE INFORMATION -------------------- */}
      {activeTab === 'VENUE_INFO' && (
        <div className="space-y-6">
          <div className="bg-brand-card p-6 rounded-2xl border border-brand-cardBorder">
            <h2 className="font-serif font-bold text-lg text-brand-ivory flex items-center gap-2">
              <MapPin className="w-5 h-5 text-brand-gold" />
              <span>Restaurant & Venue Profile Settings</span>
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              Update official venue contact numbers, address, Google Maps location, and operational hours reflected across the navbar, footer, contact page, and JSON-LD structured data.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Form */}
            <div className="lg:col-span-2 bg-brand-card p-6 rounded-2xl border border-brand-cardBorder">
              <form onSubmit={handleSaveVenueInfo} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-300">Restaurant / Branch Name</label>
                    <input
                      type="text"
                      required
                      value={venueFormData.name}
                      onChange={(e) => setVenueFormData({ ...venueFormData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-brand-dark border border-brand-cardBorder text-xs text-brand-ivory focus:outline-none focus:border-brand-gold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-300">Branch Identifier Code</label>
                    <input
                      type="text"
                      required
                      value={venueFormData.code}
                      onChange={(e) => setVenueFormData({ ...venueFormData, code: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-brand-dark border border-brand-cardBorder text-xs text-brand-ivory focus:outline-none focus:border-brand-gold"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-300">Verified Phone Number</label>
                  <input
                    type="text"
                    required
                    value={venueFormData.phone}
                    onChange={(e) => setVenueFormData({ ...venueFormData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-brand-dark border border-brand-cardBorder text-xs text-brand-ivory focus:outline-none focus:border-brand-gold"
                  />
                  <p className="text-[10px] text-gray-400">Primary customer calling & reservation number (e.g. +91 99806 26699)</p>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-300">Complete Postal Address</label>
                  <textarea
                    rows={2}
                    required
                    value={venueFormData.address}
                    onChange={(e) => setVenueFormData({ ...venueFormData, address: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-brand-dark border border-brand-cardBorder text-xs text-brand-ivory focus:outline-none focus:border-brand-gold"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-300">City</label>
                    <input
                      type="text"
                      required
                      value={venueFormData.city}
                      onChange={(e) => setVenueFormData({ ...venueFormData, city: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-brand-dark border border-brand-cardBorder text-xs text-brand-ivory focus:outline-none focus:border-brand-gold"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-300">State</label>
                    <input
                      type="text"
                      required
                      value={venueFormData.state}
                      onChange={(e) => setVenueFormData({ ...venueFormData, state: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-brand-dark border border-brand-cardBorder text-xs text-brand-ivory focus:outline-none focus:border-brand-gold"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-300">Pincode</label>
                    <input
                      type="text"
                      required
                      value={venueFormData.pincode}
                      onChange={(e) => setVenueFormData({ ...venueFormData, pincode: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-brand-dark border border-brand-cardBorder text-xs text-brand-ivory focus:outline-none focus:border-brand-gold"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-300">Google Maps Navigation Link</label>
                  <input
                    type="url"
                    value={venueFormData.googleMapsUrl}
                    onChange={(e) => setVenueFormData({ ...venueFormData, googleMapsUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-brand-dark border border-brand-cardBorder text-xs text-brand-ivory focus:outline-none focus:border-brand-gold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-300">Latitude</label>
                    <input
                      type="number"
                      step="any"
                      value={venueFormData.latitude}
                      onChange={(e) => setVenueFormData({ ...venueFormData, latitude: parseFloat(e.target.value) || 0 })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-brand-dark border border-brand-cardBorder text-xs text-brand-ivory focus:outline-none focus:border-brand-gold"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-300">Longitude</label>
                    <input
                      type="number"
                      step="any"
                      value={venueFormData.longitude}
                      onChange={(e) => setVenueFormData({ ...venueFormData, longitude: parseFloat(e.target.value) || 0 })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-brand-dark border border-brand-cardBorder text-xs text-brand-ivory focus:outline-none focus:border-brand-gold"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-brand-gold hover:bg-brand-goldHover text-brand-dark font-bold text-xs flex items-center gap-2 shadow-lg shadow-brand-gold/20 transition-all"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Venue Changes</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Live Preview Card */}
            <div className="space-y-4">
              <div className="bg-brand-card p-6 rounded-2xl border border-brand-cardBorder space-y-4">
                <span className="text-[10px] uppercase font-bold text-brand-gold tracking-widest">
                  Live Public Preview
                </span>
                <div>
                  <h3 className="font-serif font-bold text-lg text-brand-ivory">{venueFormData.name}</h3>
                  <p className="text-xs text-gray-400 mt-1">{venueFormData.address}</p>
                  <p className="text-xs text-gray-400">{venueFormData.city}, {venueFormData.state} - {venueFormData.pincode}</p>
                </div>

                <div className="space-y-2 pt-2 border-t border-brand-cardBorder text-xs">
                  <div className="flex items-center gap-2 text-brand-ivory font-semibold">
                    <Phone className="w-4 h-4 text-brand-gold" />
                    <span>{venueFormData.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Clock className="w-4 h-4 text-brand-gold" />
                    <span>11:30 AM – 11:30 PM (All 7 Days)</span>
                  </div>
                </div>

                {venueFormData.googleMapsUrl && (
                  <a
                    href={venueFormData.googleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-brand-gold hover:underline font-semibold pt-1"
                  >
                    <span>Test Google Maps Navigation</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              <div className="bg-brand-dark p-4 rounded-xl border border-brand-cardBorder/60 text-[11px] text-gray-400 space-y-1">
                <span className="font-semibold text-gray-300">Branch Switcher:</span>
                <p>Changes saved here directly affect the PostgreSQL branch database record and instantly propagate to website visitors.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* -------------------- TAB: MENU ITEMS MANAGEMENT -------------------- */}
      {activeTab === 'MENU_MGMT' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-brand-card p-6 rounded-2xl border border-brand-cardBorder">
            <div>
              <h2 className="font-serif font-bold text-lg text-brand-ivory flex items-center gap-2">
                <Utensils className="w-5 h-5 text-brand-gold" />
                <span>Menu Items & Pricing Management</span>
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                Manage dishes, authentic photographs, base pricing, spice level, and real-time 86/available stock status.
              </p>
            </div>
            <button
              onClick={handleOpenAddMenuModal}
              className="px-4 py-2.5 rounded-xl bg-brand-gold hover:bg-brand-goldHover text-brand-dark font-bold text-xs flex items-center gap-2 shadow-lg shadow-brand-gold/20 transition-all self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Dish</span>
            </button>
          </div>

          {/* Search & Category Filter */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
              <button
                onClick={() => setSelectedMenuCategory('ALL')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedMenuCategory === 'ALL'
                    ? 'bg-brand-gold text-brand-dark'
                    : 'bg-brand-card border border-brand-cardBorder text-gray-400 hover:text-brand-ivory'
                }`}
              >
                All Categories ({menuItems.length})
              </button>
              {menuCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedMenuCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedMenuCategory === cat.id
                      ? 'bg-brand-gold text-brand-dark'
                      : 'bg-brand-card border border-brand-cardBorder text-gray-400 hover:text-brand-ivory'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            <div className="relative min-w-[240px]">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search dishes or recipes..."
                value={menuSearchQuery}
                onChange={(e) => setMenuSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-brand-card border border-brand-cardBorder text-xs text-brand-ivory placeholder-gray-500 focus:outline-none focus:border-brand-gold"
              />
            </div>
          </div>

          {/* Menu Items Table */}
          <div className="bg-brand-card rounded-2xl border border-brand-cardBorder overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-brand-dark text-gray-400 uppercase font-semibold text-[10px]">
                  <tr>
                    <th className="p-3">Dish / Item</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Base Price</th>
                    <th className="p-3">Type & Spice</th>
                    <th className="p-3">Prep Time</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-cardBorder">
                  {filteredMenuItems.map((item) => (
                    <tr key={item.id} className="hover:bg-brand-dark/40 transition-colors">
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-brand-dark border border-brand-cardBorder overflow-hidden flex-shrink-0">
                            {item.images?.[0]?.imageUrl ? (
                              <img
                                src={item.images[0].imageUrl}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-500">
                                <Utensils className="w-4 h-4" />
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="font-bold text-brand-ivory flex items-center gap-2">
                              <span>{item.name}</span>
                              {item.isBestSeller && (
                                <span className="px-1.5 py-0.5 rounded bg-brand-gold/20 text-brand-gold text-[9px] font-bold">
                                  BESTSELLER
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-gray-400 line-clamp-1 max-w-xs">
                              {item.description || 'Authentic Kick Bunk Kitchen Special'}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="p-3 text-gray-300 font-medium">
                        {item.category?.name || 'Main Menu'}
                      </td>

                      <td className="p-3">
                        <span className="font-serif font-bold text-brand-gold text-sm">
                          ₹{item.basePrice}
                        </span>
                      </td>

                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center ${
                              item.isVeg ? 'border-green-500' : 'border-red-500'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                item.isVeg ? 'bg-green-500' : 'bg-red-500'
                              }`}
                            />
                          </span>
                          <span className="text-[11px] text-gray-300">
                            {'🌶️'.repeat(item.spiceLevel || 1)}
                          </span>
                        </div>
                      </td>

                      <td className="p-3 text-gray-400">
                        {item.prepTimeMin || 15} mins
                      </td>

                      <td className="p-3">
                        <button
                          onClick={() => handleToggleMenuItemActive(item)}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase transition-all ${
                            item.isActive
                              ? 'bg-brand-green/20 text-brand-green border border-brand-green/40 hover:bg-brand-green/30'
                              : 'bg-red-950/40 text-red-300 border border-red-500/40 hover:bg-red-900/40'
                          }`}
                        >
                          {item.isActive ? 'Active / In Stock' : 'Unavailable (86)'}
                        </button>
                      </td>

                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenEditMenuModal(item)}
                            className="p-1.5 rounded-lg bg-brand-dark hover:bg-brand-cardBorder text-gray-300 hover:text-brand-gold transition-colors"
                            title="Edit Dish"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteMenuItem(item.id, item.name)}
                            className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-300 transition-colors"
                            title="Delete Dish"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Modal for Add / Edit Dish */}
          {isMenuModalOpen && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-brand-card border border-brand-cardBorder rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between pb-3 border-b border-brand-cardBorder">
                  <h3 className="font-serif font-bold text-base text-brand-ivory">
                    {editingMenuItem ? 'Edit Menu Item' : 'Add New Menu Item'}
                  </h3>
                  <button
                    onClick={() => setIsMenuModalOpen(false)}
                    className="p-1 rounded-lg hover:bg-brand-dark text-gray-400 hover:text-brand-ivory"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveMenuItem} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-300">Dish Name</label>
                    <input
                      type="text"
                      required
                      value={menuFormData.name}
                      onChange={(e) => setMenuFormData({ ...menuFormData, name: e.target.value })}
                      placeholder="e.g. Tandoori Chicken Tikka Platter"
                      className="w-full px-3 py-2 rounded-xl bg-brand-dark border border-brand-cardBorder text-xs text-brand-ivory focus:outline-none focus:border-brand-gold"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-300">Category</label>
                      <select
                        required
                        value={menuFormData.categoryId}
                        onChange={(e) => setMenuFormData({ ...menuFormData, categoryId: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-brand-dark border border-brand-cardBorder text-xs text-brand-ivory focus:outline-none focus:border-brand-gold"
                      >
                        {menuCategories.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-300">Base Price (₹)</label>
                      <input
                        type="number"
                        required
                        step="0.01"
                        value={menuFormData.basePrice}
                        onChange={(e) => setMenuFormData({ ...menuFormData, basePrice: e.target.value })}
                        placeholder="380"
                        className="w-full px-3 py-2 rounded-xl bg-brand-dark border border-brand-cardBorder text-xs text-brand-ivory focus:outline-none focus:border-brand-gold"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-300">Description</label>
                    <textarea
                      rows={2}
                      value={menuFormData.description}
                      onChange={(e) => setMenuFormData({ ...menuFormData, description: e.target.value })}
                      placeholder="Ingredients, preparation style, and culinary notes..."
                      className="w-full px-3 py-2 rounded-xl bg-brand-dark border border-brand-cardBorder text-xs text-brand-ivory focus:outline-none focus:border-brand-gold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-300">Photograph URL</label>
                    <input
                      type="text"
                      value={menuFormData.imageUrl}
                      onChange={(e) => setMenuFormData({ ...menuFormData, imageUrl: e.target.value })}
                      placeholder="/images/kickbunk/dish_...jpg or https://..."
                      className="w-full px-3 py-2 rounded-xl bg-brand-dark border border-brand-cardBorder text-xs text-brand-ivory focus:outline-none focus:border-brand-gold"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-300">Spice Level (1 to 3)</label>
                      <select
                        value={menuFormData.spiceLevel}
                        onChange={(e) => setMenuFormData({ ...menuFormData, spiceLevel: parseInt(e.target.value) || 1 })}
                        className="w-full px-3 py-2 rounded-xl bg-brand-dark border border-brand-cardBorder text-xs text-brand-ivory focus:outline-none focus:border-brand-gold"
                      >
                        <option value={1}>Mild (1)</option>
                        <option value={2}>Medium (2)</option>
                        <option value={3}>Spicy (3)</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-300">Prep Time (Mins)</label>
                      <input
                        type="number"
                        value={menuFormData.prepTimeMin}
                        onChange={(e) => setMenuFormData({ ...menuFormData, prepTimeMin: parseInt(e.target.value) || 15 })}
                        className="w-full px-3 py-2 rounded-xl bg-brand-dark border border-brand-cardBorder text-xs text-brand-ivory focus:outline-none focus:border-brand-gold"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-6 pt-2">
                    <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-300">
                      <input
                        type="checkbox"
                        checked={menuFormData.isVeg}
                        onChange={(e) => setMenuFormData({ ...menuFormData, isVeg: e.target.checked })}
                        className="w-4 h-4 rounded text-brand-gold focus:ring-0 bg-brand-dark border-brand-cardBorder"
                      />
                      <span>Vegetarian Item</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-300">
                      <input
                        type="checkbox"
                        checked={menuFormData.isBestSeller}
                        onChange={(e) => setMenuFormData({ ...menuFormData, isBestSeller: e.target.checked })}
                        className="w-4 h-4 rounded text-brand-gold focus:ring-0 bg-brand-dark border-brand-cardBorder"
                      />
                      <span>Mark as Bestseller</span>
                    </label>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-brand-cardBorder">
                    <button
                      type="button"
                      onClick={() => setIsMenuModalOpen(false)}
                      className="px-4 py-2 rounded-xl bg-brand-dark hover:bg-brand-cardBorder text-xs text-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-brand-gold hover:bg-brand-goldHover text-brand-dark font-bold text-xs shadow-md shadow-brand-gold/20"
                    >
                      {editingMenuItem ? 'Save Changes' : 'Create Dish'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* -------------------- TAB: FINANCIAL ANALYTICS -------------------- */}
      {activeTab === 'ANALYTICS' && (
        <div className="space-y-8">
          {/* Executive KPI Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="bg-brand-card p-4 rounded-2xl border border-brand-cardBorder space-y-1">
              <span className="text-[10px] uppercase font-bold text-gray-400">Net Revenue</span>
              <div className="font-serif text-xl font-bold text-brand-gold">
                ₹{summary.totalRevenue || 0}
              </div>
              <div className="text-[10px] text-brand-green">Calculated from orders</div>
            </div>

            <div className="bg-brand-card p-4 rounded-2xl border border-brand-cardBorder space-y-1">
              <span className="text-[10px] uppercase font-bold text-gray-400">Total Orders</span>
              <div className="font-serif text-xl font-bold text-brand-ivory">
                {summary.totalOrders || 0}
              </div>
              <div className="text-[10px] text-gray-400">All channels</div>
            </div>

            <div className="bg-brand-card p-4 rounded-2xl border border-brand-cardBorder space-y-1">
              <span className="text-[10px] uppercase font-bold text-gray-400">Avg Order Value</span>
              <div className="font-serif text-xl font-bold text-brand-amber">
                ₹{summary.averageOrderValue || 0}
              </div>
              <div className="text-[10px] text-gray-400">Per table check</div>
            </div>

            <div className="bg-brand-card p-4 rounded-2xl border border-brand-cardBorder space-y-1">
              <span className="text-[10px] uppercase font-bold text-gray-400">Active Tables</span>
              <div className="font-serif text-xl font-bold text-brand-green">
                {summary.activeTables || 0} / {summary.totalTables || 14}
              </div>
              <div className="text-[10px] text-brand-green">Real-time occupancy</div>
            </div>

            <div className="bg-brand-card p-4 rounded-2xl border border-brand-cardBorder space-y-1">
              <span className="text-[10px] uppercase font-bold text-gray-400">Stock Alerts</span>
              <div className="font-serif text-xl font-bold text-red-400">
                {summary.lowStockAlerts || 0}
              </div>
              <div className="text-[10px] text-red-400">Items below reorder</div>
            </div>

            <div className="bg-brand-card p-4 rounded-2xl border border-brand-cardBorder space-y-1">
              <span className="text-[10px] uppercase font-bold text-gray-400">Pending Bookings</span>
              <div className="font-serif text-xl font-bold text-brand-ivory">
                {summary.pendingReservations || 0}
              </div>
              <div className="text-[10px] text-gray-400">Upcoming tonight</div>
            </div>
          </div>

          {/* Revenue Breakdown by Category & Branch */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-brand-card p-6 rounded-2xl border border-brand-cardBorder space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-serif font-bold text-base text-brand-ivory">Top Revenue Categories</h3>
                <span className="text-xs text-brand-gold font-semibold">Live POS & Online</span>
              </div>
              <div className="space-y-3">
                {(metrics?.categoryBreakdown || [
                  { name: 'Tandoor & Starters', revenue: 42500, percentage: 38 },
                  { name: 'Bar & Craft Cocktails', revenue: 38200, percentage: 34 },
                  { name: 'Biryani & Main Course', revenue: 21400, percentage: 19 },
                  { name: 'Beverages & Mocktails', revenue: 9900, percentage: 9 },
                ]).map((cat: any, idx: number) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-gray-300">{cat.name}</span>
                      <span className="font-bold text-brand-gold">₹{cat.revenue.toLocaleString()} ({cat.percentage}%)</span>
                    </div>
                    <div className="w-full bg-brand-dark rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-brand-gold h-full rounded-full transition-all duration-500"
                        style={{ width: `${cat.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-brand-card p-6 rounded-2xl border border-brand-cardBorder space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-serif font-bold text-base text-brand-ivory">Outlet Performance</h3>
                <span className="text-xs text-gray-400">Multi-Unit Comparison</span>
              </div>
              <div className="space-y-4">
                {(metrics?.branchPerformance || [
                  { name: 'Electronic City Flagship (Bengaluru)', revenue: 84200, orders: 48, rating: 4.8 },
                  { name: 'Koramangala Garden (Preview)', revenue: 27800, orders: 18, rating: 4.9 },
                ]).map((b: any, idx: number) => (
                  <div key={idx} className="p-3.5 bg-brand-dark rounded-xl border border-brand-cardBorder flex items-center justify-between">
                    <div>
                      <div className="font-bold text-sm text-brand-ivory">{b.name}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{b.orders} completed checks today</div>
                    </div>
                    <div className="text-right">
                      <div className="font-serif font-bold text-base text-brand-gold">₹{b.revenue.toLocaleString()}</div>
                      <div className="text-[11px] text-brand-green font-semibold">★ {b.rating} Guest Rating</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* -------------------- TAB: ORDERS REGISTER -------------------- */}
      {activeTab === 'ORDERS' && (
        <div className="bg-brand-card rounded-2xl border border-brand-cardBorder overflow-hidden">
          <div className="p-4 border-b border-brand-cardBorder flex justify-between items-center">
            <h3 className="font-serif font-bold text-base text-brand-ivory">Live Order Transaction Ledger</h3>
            <span className="text-xs text-gray-400">Showing last {orders.length} orders</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-brand-dark text-gray-400 uppercase font-semibold text-[10px]">
                <tr>
                  <th className="p-3">Order Number</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Table / Customer</th>
                  <th className="p-3">Items</th>
                  <th className="p-3">Total Amount</th>
                  <th className="p-3">Payment</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-cardBorder">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-brand-dark/40 transition-colors">
                    <td className="p-3 font-mono font-bold text-brand-gold">{o.orderNumber}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-brand-dark text-[10px] font-semibold text-gray-300 border border-brand-cardBorder">
                        {o.orderType}
                      </span>
                    </td>
                    <td className="p-3 text-brand-ivory">
                      {o.table?.tableNumber ? `Table ${o.table.tableNumber}` : o.customerName || 'Direct Guest'}
                    </td>
                    <td className="p-3 text-gray-400">
                      {o.items?.map((it: any) => `${it.quantity}x ${it.menuItem?.name || 'Item'}`).join(', ') || 'N/A'}
                    </td>
                    <td className="p-3 font-serif font-bold text-brand-ivory">₹{o.totalAmount}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          o.paymentStatus === 'PAID'
                            ? 'bg-brand-green/20 text-brand-green'
                            : 'bg-amber-900/40 text-amber-300'
                        }`}
                      >
                        {o.paymentStatus}
                      </span>
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          o.status === 'COMPLETED'
                            ? 'bg-brand-green/20 text-brand-green'
                            : o.status === 'IN_PROGRESS' || o.status === 'READY'
                            ? 'bg-blue-900/40 text-blue-300'
                            : 'bg-gray-800 text-gray-300'
                        }`}
                      >
                        {o.status}
                      </span>
                    </td>
                    <td className="p-3 text-gray-500 font-mono text-[11px]">
                      {new Date(o.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* -------------------- TAB: INVENTORY & STOCK ALERTS -------------------- */}
      {activeTab === 'INVENTORY' && (
        <div className="bg-brand-card rounded-2xl border border-brand-cardBorder overflow-hidden">
          <div className="p-4 border-b border-brand-cardBorder flex justify-between items-center">
            <div>
              <h3 className="font-serif font-bold text-base text-brand-ivory">Kitchen Inventory & Raw Stock Deductions</h3>
              <p className="text-xs text-gray-400">Automated inventory consumption triggers on kitchen KDS order dispatch</p>
            </div>
            <span className="text-xs text-gray-400">Total Items: {inventoryItems.length}</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-brand-dark text-gray-400 uppercase font-semibold text-[10px]">
                <tr>
                  <th className="p-3">Item Name</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Current Stock</th>
                  <th className="p-3">Min Threshold</th>
                  <th className="p-3">Unit Cost</th>
                  <th className="p-3">Stock Health</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-cardBorder">
                {inventoryItems.map((item) => {
                  const isLow = (item.currentStock || 0) <= (item.minStockAlert || 5);
                  return (
                    <tr key={item.id} className="hover:bg-brand-dark/40 transition-colors">
                      <td className="p-3 font-bold text-brand-ivory">{item.name}</td>
                      <td className="p-3 text-gray-400">{item.category}</td>
                      <td className="p-3 font-mono font-bold text-brand-gold">
                        {item.currentStock} {item.unit}
                      </td>
                      <td className="p-3 text-gray-400">
                        {item.minStockAlert} {item.unit}
                      </td>
                      <td className="p-3 font-serif">₹{item.costPerUnit} / {item.unit}</td>
                      <td className="p-3">
                        {isLow ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-red-950/60 text-red-300 text-[10px] font-bold uppercase border border-red-500/40">
                            <AlertTriangle className="w-3 h-3" />
                            <span>Low Stock Alert</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-brand-green/20 text-brand-green text-[10px] font-bold uppercase">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Sufficient</span>
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* -------------------- TAB: RECIPE FOOD COSTING -------------------- */}
      {activeTab === 'RECIPES' && (
        <div className="bg-brand-card rounded-2xl border border-brand-cardBorder overflow-hidden">
          <div className="p-4 border-b border-brand-cardBorder flex justify-between items-center">
            <div>
              <h3 className="font-serif font-bold text-base text-brand-ivory">Recipe Costing & Yield Margin Calculator</h3>
              <p className="text-xs text-gray-400">Formulaic ingredient deductions mapped per menu item</p>
            </div>
            <span className="text-xs text-gray-400">{recipes.length} Recipe Configurations</span>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {recipes.map((recipe) => (
              <div key={recipe.id} className="bg-brand-dark p-5 rounded-2xl border border-brand-cardBorder space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-serif font-bold text-base text-brand-ivory">{recipe.menuItem?.name || 'Recipe'}</h4>
                    <span className="text-xs text-gray-400">Yield: {recipe.yieldPortions} Portions</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-gray-400">Prep Cost</span>
                    <div className="font-serif font-bold text-brand-gold text-lg">₹{recipe.costPerPortion || 120}</div>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-brand-cardBorder/60">
                  <span className="text-[10px] uppercase font-bold text-gray-400">Ingredient Deductions</span>
                  <div className="space-y-1">
                    {recipe.ingredients?.map((ing: any, i: number) => (
                      <div key={i} className="flex justify-between text-xs text-gray-300">
                        <span>• {ing.inventoryItem?.name || 'Ingredient'}</span>
                        <span className="font-mono text-gray-400">{ing.quantityRequired} {ing.inventoryItem?.unit || 'units'}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* -------------------- TAB: RESERVATIONS -------------------- */}
      {activeTab === 'RESERVATIONS' && (
        <div className="bg-brand-card rounded-2xl border border-brand-cardBorder overflow-hidden">
          <div className="p-4 border-b border-brand-cardBorder flex justify-between items-center">
            <h3 className="font-serif font-bold text-base text-brand-ivory">Table Reservations Schedule</h3>
            <span className="text-xs text-gray-400">Total: {reservations.length} bookings</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-brand-dark text-gray-400 uppercase font-semibold text-[10px]">
                <tr>
                  <th className="p-3">Customer Name</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Date & Time</th>
                  <th className="p-3">Guests</th>
                  <th className="p-3">Outlet</th>
                  <th className="p-3">Requests / Seating</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-cardBorder">
                {reservations.map((res) => (
                  <tr key={res.id} className="hover:bg-brand-dark/40 transition-colors">
                    <td className="p-3 font-bold text-brand-ivory">{res.customerName}</td>
                    <td className="p-3 text-gray-300 font-mono">{res.customerPhone}</td>
                    <td className="p-3">
                      <span className="font-semibold text-brand-gold">
                        {new Date(res.reservationDate).toLocaleDateString()}
                      </span> at {res.reservationTime}
                    </td>
                    <td className="p-3 font-bold text-brand-ivory">{res.guestCount} Pax</td>
                    <td className="p-3 text-gray-300">{res.branch?.name}</td>
                    <td className="p-3 text-gray-400 italic">{res.specialRequests || 'Standard dining'}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-brand-green/20 text-brand-green text-[10px] font-bold uppercase">
                        {res.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* -------------------- TAB: INQUIRIES -------------------- */}
      {activeTab === 'INQUIRIES' && (
        <div className="bg-brand-card rounded-2xl border border-brand-cardBorder overflow-hidden">
          <div className="p-4 border-b border-brand-cardBorder flex justify-between items-center">
            <div>
              <h3 className="font-serif font-bold text-base text-brand-ivory">Website & Mobile Customer Inquiries</h3>
              <p className="text-xs text-gray-400">Banquet, private cabana, and event requests from customers</p>
            </div>
            <span className="text-xs text-gray-400">Total: {inquiries.length} inquiries</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-brand-dark text-gray-400 uppercase font-semibold text-[10px]">
                <tr>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Phone / Email</th>
                  <th className="p-3">Subject & Message</th>
                  <th className="p-3">Target Outlet</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Submitted</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-cardBorder">
                {inquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-brand-dark/40 transition-colors">
                    <td className="p-3 font-bold text-brand-ivory">{inq.name}</td>
                    <td className="p-3">
                      <div className="text-brand-gold font-mono">{inq.phone}</div>
                      {inq.email && <div className="text-gray-400 text-[10px]">{inq.email}</div>}
                    </td>
                    <td className="p-3 max-w-sm">
                      <div className="font-semibold text-brand-ivory">{inq.subject}</div>
                      <div className="text-gray-400 text-[11px] mt-0.5 line-clamp-2">{inq.message}</div>
                      {inq.response && (
                        <div className="text-brand-green text-[10px] mt-1 italic">
                          Response: {inq.response}
                        </div>
                      )}
                    </td>
                    <td className="p-3 text-gray-300">{inq.branch?.name || 'General Group'}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          inq.status === 'NEW'
                            ? 'bg-amber-900/40 text-amber-300 border border-amber-500/40'
                            : inq.status === 'IN_PROGRESS'
                            ? 'bg-blue-900/40 text-blue-300 border border-blue-500/40'
                            : 'bg-brand-green/20 text-brand-green border border-brand-green/40'
                        }`}
                      >
                        {inq.status}
                      </span>
                    </td>
                    <td className="p-3 text-gray-500 text-[11px]">
                      {new Date(inq.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-3">
                      {inq.status !== 'RESOLVED' ? (
                        <button
                          onClick={() => handleResolveInquiry(inq.id)}
                          className="px-2.5 py-1 rounded-lg bg-brand-green/20 hover:bg-brand-green/40 text-brand-green text-[10px] font-bold transition-colors"
                        >
                          Mark Resolved
                        </button>
                      ) : (
                        <span className="text-[10px] text-gray-500">Completed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
