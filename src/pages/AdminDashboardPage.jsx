import React, { useState, useMemo } from 'react';
import { useFoodRescue } from '../context/FoodRescueContext';
import StatusBadge from '../components/common/StatusBadge';
import FoodDetailModal from '../components/food/FoodDetailModal';
import {
  ShieldAlert,
  Users,
  Building2,
  PackageCheck,
  CheckCircle2,
  UtensilsCrossed,
  Filter,
  Search,
  ExternalLink,
  Plus,
  ArrowRight,
  RefreshCw,
  Clock,
  ArrowUpRight,
  Layers,
  FileText,
  AlertTriangle,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminDashboardPage() {
  const {
    donations,
    stats,
    volunteers,
    organizations,
    claimPickup,
    markAsCollected,
    markAsDelivered,
    addToast,
    resetToDefaults,
    isLiveDb,
    isSupabaseConfigured,
    dbLoading,
    refreshData,
  } = useFoodRescue();

  const [selectedDonation, setSelectedDonation] = useState(null);
  const [activeTab, setActiveTab] = useState('donations'); // 'donations' | 'volunteers' | 'organizations' | 'activity'
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchFilter, setSearchFilter] = useState('');

  // Metrics
  const activeDonations = donations.filter(
    (d) => d.status === 'Available' || d.status === 'Accepted' || d.status === 'Collected'
  );
  const completedDonations = donations.filter((d) => d.status === 'Delivered');

  const filteredDonations = useMemo(() => {
    return donations.filter((d) => {
      if (statusFilter !== 'all' && d.status !== statusFilter) return false;
      if (searchFilter.trim()) {
        const q = searchFilter.toLowerCase();
        return (
          d.title.toLowerCase().includes(q) ||
          d.donor.toLowerCase().includes(q) ||
          d.city.toLowerCase().includes(q) ||
          d.id.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [donations, statusFilter, searchFilter]);

  // Handle manual quick status update directly from Admin table
  const handleQuickStatusChange = (donationId, newStatus) => {
    if (newStatus === 'Accepted') {
      claimPickup(donationId);
    } else if (newStatus === 'Collected') {
      markAsCollected(donationId);
    } else if (newStatus === 'Delivered') {
      markAsDelivered(donationId);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8faf9] py-8 lg:py-12 text-[#111827]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Dedicated Admin Header Bar */}
        <div className="bg-white rounded-2xl border border-gray-200/90 p-6 sm:p-7 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-gray-100">
            <div>
              <div className="flex items-center gap-2 text-[#056b4e] text-xs font-bold uppercase tracking-wider mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#056b4e] animate-pulse-subtle" />
                <span>FoodRescue Operations Central • Administrator Mode</span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                Admin Console
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Full network oversight across live food dispatches, volunteer routes, and partner NGO kitchens.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
              >
                <span>Public Website</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-full bg-[#e8f7f0] hover:bg-[#d2ece4] text-[#056b4e] transition-colors"
              >
                <span>Volunteer Portal</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to="/donate"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-full bg-[#056b4e] hover:bg-[#04563e] text-white transition-colors shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Surplus Batch</span>
              </Link>
            </div>
          </div>

          {/* System status bar */}
          <div className="pt-4 flex flex-wrap items-center justify-between text-xs text-gray-500 gap-3">
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <span className={`inline-flex items-center gap-1.5 font-semibold ${isLiveDb ? 'text-emerald-700' : isSupabaseConfigured ? 'text-amber-700' : 'text-slate-600'}`}>
                {isLiveDb ? (
                  <>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Supabase PostgreSQL: Connected & Live</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>Database: Local Storage Mode</span>
                  </>
                )}
              </span>
              <span>•</span>
              <span>5 Active Hubs: Guwahati, Nagaon, Delhi, Mumbai, Bengaluru</span>
            </div>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={refreshData}
                disabled={dbLoading}
                className="inline-flex items-center gap-1 text-gray-600 hover:text-emerald-700 font-medium transition-colors cursor-pointer"
                title="Refetch data from Supabase"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${dbLoading ? 'animate-spin text-emerald-600' : ''}`} />
                <span>{dbLoading ? 'Syncing...' : 'Sync Database'}</span>
              </button>
              <button
                type="button"
                onClick={resetToDefaults}
                className="text-gray-400 hover:text-red-600 underline transition-colors"
              >
                Reset Demo Data
              </button>
            </div>
          </div>
        </div>

        {/* 6 Platform KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs">
            <span className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider">Total Batches</span>
            <div className="font-serif text-2xl font-bold text-gray-900 mt-1">
              {donations.length}
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs">
            <span className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider">Active In-Transit</span>
            <div className="font-serif text-2xl font-bold text-amber-700 mt-1">
              {activeDonations.length}
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs">
            <span className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider">Delivered</span>
            <div className="font-serif text-2xl font-bold text-[#056b4e] mt-1">
              {completedDonations.length}
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs">
            <span className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider">Volunteers</span>
            <div className="font-serif text-2xl font-bold text-gray-900 mt-1">
              {volunteers.length}
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs">
            <span className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider">Partner NGOs</span>
            <div className="font-serif text-2xl font-bold text-gray-900 mt-1">
              {organizations.length}
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs">
            <span className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider">Meals Rescued</span>
            <div className="font-serif text-2xl font-bold text-[#056b4e] mt-1">
              {stats.mealsRescued.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Tabbed Management Panel */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 px-6 pt-4 gap-6 overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab('donations')}
              className={`pb-3 text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap relative ${
                activeTab === 'donations'
                  ? 'text-[#056b4e] border-b-2 border-[#056b4e]'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Surplus Food Dispatches ({filteredDonations.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('volunteers')}
              className={`pb-3 text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap relative ${
                activeTab === 'volunteers'
                  ? 'text-[#056b4e] border-b-2 border-[#056b4e]'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Volunteer Rescuers ({volunteers.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('organizations')}
              className={`pb-3 text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap relative ${
                activeTab === 'organizations'
                  ? 'text-[#056b4e] border-b-2 border-[#056b4e]'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Partner Organizations ({organizations.length})
            </button>
          </div>

          {/* Tab 1: Surplus Food Dispatches */}
          {activeTab === 'donations' && (
            <div className="p-5 sm:p-6 space-y-4">
              {/* Filter controls */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    placeholder="Search by food, donor, tracking ID, or city..."
                    className="w-full pl-10 pr-3 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:border-[#056b4e]"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 font-medium">Filter Status:</span>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 text-xs font-medium bg-white border border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:border-[#056b4e] cursor-pointer"
                  >
                    <option value="all">All statuses</option>
                    <option value="Available">Available</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Collected">Collected</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto border border-gray-200 rounded-xl">
                <table className="w-full text-left text-xs text-gray-700">
                  <thead className="bg-gray-50 border-b border-gray-200 text-[11px] font-semibold text-gray-600 uppercase tracking-wider">
                    <tr>
                      <th className="px-4 py-3">Tracking ID / Food</th>
                      <th className="px-4 py-3">Donor</th>
                      <th className="px-4 py-3">Quantity</th>
                      <th className="px-4 py-3">Hub & Location</th>
                      <th className="px-4 py-3">Deadline</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3 text-right">Admin Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredDonations.map((item) => (
                      <tr
                        key={item.id}
                        className="hover:bg-gray-50/70 transition-colors"
                      >
                        <td className="px-4 py-3">
                          <span className="font-mono text-[11px] text-gray-400 font-semibold">{item.id}</span>
                          <div className="font-bold text-gray-900 mt-0.5">{item.title}</div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-medium text-gray-900">{item.donor}</div>
                          <div className="text-[11px] text-gray-500">{item.donorType}</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="font-semibold text-gray-900">{item.quantity}</span>
                          <span className="text-[11px] text-gray-400 block">
                            ~{item.mealsCount} meals
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-medium text-gray-800">{item.city}</div>
                          <div className="text-[11px] text-gray-500 truncate max-w-[150px]">
                            {item.location}
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-amber-900 font-medium">
                          {item.deadline}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <StatusBadge status={item.status} size="sm" />
                        </td>
                        <td className="px-4 py-3 text-right whitespace-nowrap">
                          <div className="inline-flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => setSelectedDonation(item)}
                              className="px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-colors"
                            >
                              Inspect
                            </button>
                            {item.status === 'Available' && (
                              <button
                                type="button"
                                onClick={() => handleQuickStatusChange(item.id, 'Accepted')}
                                className="px-2.5 py-1 rounded-lg bg-[#e8f7f0] hover:bg-[#d2ece4] text-[#056b4e] font-semibold transition-colors"
                              >
                                Assign
                              </button>
                            )}
                            {item.status === 'Accepted' && (
                              <button
                                type="button"
                                onClick={() => handleQuickStatusChange(item.id, 'Collected')}
                                className="px-2.5 py-1 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-800 font-semibold transition-colors"
                              >
                                Mark Collected
                              </button>
                            )}
                            {item.status === 'Collected' && (
                              <button
                                type="button"
                                onClick={() => handleQuickStatusChange(item.id, 'Delivered')}
                                className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold transition-colors"
                              >
                                Mark Delivered
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 2: Volunteers */}
          {activeTab === 'volunteers' && (
            <div className="p-5 sm:p-6 overflow-x-auto">
              <table className="w-full text-left text-xs text-gray-700">
                <thead className="bg-gray-50 border-b border-gray-200 text-[11px] font-semibold text-gray-600 uppercase tracking-wider">
                  <tr>
                    <th className="px-4 py-3">Rescuer Name</th>
                    <th className="px-4 py-3">Hub Location</th>
                    <th className="px-4 py-3">Vehicle / Mode</th>
                    <th className="px-4 py-3">Pickups Done</th>
                    <th className="px-4 py-3">Meals Rescued</th>
                    <th className="px-4 py-3 text-right">Verification Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {volunteers.map((vol) => (
                    <tr key={vol.id} className="hover:bg-gray-50/70 transition-colors">
                      <td className="px-4 py-3 font-semibold text-gray-900">{vol.name}</td>
                      <td className="px-4 py-3">{vol.location}</td>
                      <td className="px-4 py-3 text-gray-600">{vol.vehicle}</td>
                      <td className="px-4 py-3 font-mono font-medium">{vol.pickups}</td>
                      <td className="px-4 py-3 font-mono font-bold text-[#056b4e]">
                        {vol.mealsRescued} meals
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#e8f7f0] text-[#056b4e] border border-[#b8e6d2]">
                          Verified Rescuer
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Tab 3: Partner Organizations */}
          {activeTab === 'organizations' && (
            <div className="p-5 sm:p-6 overflow-x-auto">
              <table className="w-full text-left text-xs text-gray-700">
                <thead className="bg-gray-50 border-b border-gray-200 text-[11px] font-semibold text-gray-600 uppercase tracking-wider">
                  <tr>
                    <th className="px-4 py-3">Organization Name</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Location</th>
                    <th className="px-4 py-3">Contact Person</th>
                    <th className="px-4 py-3">Meals Received</th>
                    <th className="px-4 py-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {organizations.map((org) => (
                    <tr key={org.id} className="hover:bg-gray-50/70 transition-colors">
                      <td className="px-4 py-3 font-semibold text-gray-900">{org.name}</td>
                      <td className="px-4 py-3 text-gray-600">{org.type}</td>
                      <td className="px-4 py-3">{org.location}</td>
                      <td className="px-4 py-3 text-gray-800">{org.contactPerson}</td>
                      <td className="px-4 py-3 font-mono font-bold text-[#056b4e]">
                        {org.mealsReceived} meals
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#e8f7f0] text-[#056b4e] border border-[#b8e6d2]">
                          {org.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <FoodDetailModal
        donation={selectedDonation}
        isOpen={!!selectedDonation}
        onClose={() => setSelectedDonation(null)}
        onClaim={(id) => claimPickup(id)}
      />
    </div>
  );
}
