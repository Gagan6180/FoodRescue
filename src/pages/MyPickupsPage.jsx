import React, { useState } from 'react';
import { useFoodRescue } from '../context/FoodRescueContext';
import StatusBadge from '../components/common/StatusBadge';
import ProgressTracker from '../components/common/ProgressTracker';
import FoodDetailModal from '../components/food/FoodDetailModal';
import EmptyState from '../components/common/EmptyState';
import {
  MapPin,
  Clock,
  Phone,
  CheckCircle2,
  PackageCheck,
  Building,
  HeartHandshake,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MyPickupsPage() {
  const { donations, markAsCollected, markAsDelivered, organizations } = useFoodRescue();
  const [activeTab, setActiveTab] = useState('active');
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [selectedOrg, setSelectedOrg] = useState({});

  // Active: Accepted or Collected
  const activePickups = donations.filter(
    (d) => d.status === 'Accepted' || d.status === 'Collected'
  );

  // Completed: Delivered
  const completedPickups = donations.filter((d) => d.status === 'Delivered');

  const handleSelectOrg = (id, orgName) => {
    setSelectedOrg((prev) => ({ ...prev, [id]: orgName }));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header & Tabs */}
      <div className="bg-white rounded-2xl border border-neutral-200/90 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-100">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-forest-800">
              Rescuer Task Board
            </span>
            <h1 className="text-2xl font-bold text-neutral-900 tracking-tight mt-0.5">
              My Pickups
            </h1>
            <p className="text-xs text-neutral-500 mt-1">
              Track real-time progress from donor collection to shelter delivery.
            </p>
          </div>

          <Link
            to="/available-food"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-sand-100 hover:bg-sand-200 text-neutral-800 transition-colors"
          >
            Find more surplus food
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 pt-4">
          <button
            type="button"
            onClick={() => setActiveTab('active')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'active'
                ? 'bg-forest-800 text-white shadow-2xs'
                : 'bg-sand-50 text-neutral-600 hover:bg-sand-100'
            }`}
          >
            <span>Active Pickups</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[11px] font-bold ${
                activeTab === 'active'
                  ? 'bg-white/20 text-white'
                  : 'bg-neutral-200 text-neutral-700'
              }`}
            >
              {activePickups.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('completed')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'completed'
                ? 'bg-forest-800 text-white shadow-2xs'
                : 'bg-sand-50 text-neutral-600 hover:bg-sand-100'
            }`}
          >
            <span>Completed Pickups</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[11px] font-bold ${
                activeTab === 'completed'
                  ? 'bg-white/20 text-white'
                  : 'bg-neutral-200 text-neutral-700'
              }`}
            >
              {completedPickups.length}
            </span>
          </button>
        </div>
      </div>

      {/* Tab 1: Active Pickups */}
      {activeTab === 'active' && (
        <div className="space-y-4">
          {activePickups.length > 0 ? (
            activePickups.map((item) => {
              const isAccepted = item.status === 'Accepted';
              const isCollected = item.status === 'Collected';
              const currentOrgChoice = selectedOrg[item.id] || item.destinationOrg || organizations[0].name;

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-neutral-200/90 p-5 sm:p-7 shadow-xs space-y-5"
                >
                  {/* Top card metadata */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 border-b border-neutral-100">
                    <div className="flex items-start gap-3.5">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover shrink-0 border border-neutral-200"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <StatusBadge status={item.status} size="sm" />
                          <span className="text-[11px] font-mono text-neutral-400">
                            {item.id}
                          </span>
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-neutral-900 mt-1">
                          {item.title}
                        </h3>
                        <p className="text-xs text-neutral-600 mt-0.5">
                          {item.quantity} (~{item.mealsCount} meals) • {item.donor}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedDonation(item)}
                        className="px-3 py-1.5 text-xs font-medium text-neutral-700 bg-sand-50 hover:bg-sand-100 rounded-lg border border-neutral-200 transition-colors"
                      >
                        View Full Specs
                      </button>
                    </div>
                  </div>

                  {/* Visual Progress Line */}
                  <ProgressTracker status={item.status} />

                  {/* Route & Contact info */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-sand-50/70 p-3.5 rounded-xl border border-neutral-200/70 text-xs">
                    <div>
                      <span className="text-neutral-500 font-medium flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                        Donor Pickup Point
                      </span>
                      <p className="font-semibold text-neutral-800 mt-0.5">{item.location}</p>
                    </div>

                    <div>
                      <span className="text-neutral-500 font-medium flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-neutral-400" />
                        Deadline Window
                      </span>
                      <p className="font-semibold text-amber-900 mt-0.5">{item.deadline}</p>
                    </div>

                    <div>
                      <span className="text-neutral-500 font-medium flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-neutral-400" />
                        Contact Donor
                      </span>
                      <p className="font-semibold text-forest-800 mt-0.5">
                        <a href={`tel:${item.contactNumber}`} className="hover:underline">
                          {item.contactNumber}
                        </a>
                      </p>
                    </div>
                  </div>

                  {/* Action step container */}
                  <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                    {/* Destination NGO Selector (for delivery step) */}
                    <div className="flex items-center gap-2 text-xs flex-1">
                      <span className="text-neutral-600 font-medium shrink-0">
                        Deliver to NGO:
                      </span>
                      <select
                        value={currentOrgChoice}
                        onChange={(e) => handleSelectOrg(item.id, e.target.value)}
                        className="px-2.5 py-1.5 rounded-lg border border-neutral-200 bg-white text-neutral-800 text-xs focus:outline-none focus:border-forest-700 w-full sm:w-auto"
                      >
                        {organizations.map((org) => (
                          <option key={org.id} value={org.name}>
                            {org.name} ({org.city})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Progress Action Buttons */}
                    <div className="flex items-center gap-2">
                      {isAccepted && (
                        <button
                          type="button"
                          onClick={() => markAsCollected(item.id)}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-sky-700 hover:bg-sky-800 text-white text-xs font-semibold transition-all shadow-2xs"
                        >
                          <PackageCheck className="w-4 h-4" />
                          Mark as Collected from Donor
                        </button>
                      )}

                      {isCollected && (
                        <button
                          type="button"
                          onClick={() => markAsDelivered(item.id, currentOrgChoice)}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-forest-800 hover:bg-forest-900 text-white text-xs font-semibold transition-all shadow-2xs"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          Mark as Delivered to Community
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <EmptyState
              title="No active pickups right now"
              description="You don't have any surplus food pickups in progress. Head to the Available Food page to claim one."
              actionLabel="Find Food to Rescue"
              onAction={() => window.location.assign('/available-food')}
            />
          )}
        </div>
      )}

      {/* Tab 2: Completed Pickups */}
      {activeTab === 'completed' && (
        <div className="space-y-4">
          {completedPickups.length > 0 ? (
            completedPickups.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-neutral-200/90 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 border border-teal-200 mt-1">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <StatusBadge status="Delivered" size="sm" />
                      <span className="text-xs font-mono text-neutral-400">{item.id}</span>
                    </div>
                    <h4 className="text-base font-bold text-neutral-900 mt-1">
                      {item.title}
                    </h4>
                    <p className="text-xs text-neutral-600 mt-0.5">
                      <strong className="text-neutral-900">{item.mealsCount} meals</strong> ({item.kgWeight || 12} kg) • Collected from {item.donor}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500 mt-2">
                      <span className="flex items-center gap-1 text-forest-800 font-medium">
                        <HeartHandshake className="w-3.5 h-3.5" />
                        Handed over to {item.destinationOrg || 'Community Kitchen'}
                      </span>
                      <span>• {item.deliveredAt || 'Recently delivered'}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    type="button"
                    onClick={() => setSelectedDonation(item)}
                    className="px-3 py-1.5 text-xs font-medium text-neutral-700 bg-sand-50 hover:bg-sand-100 rounded-lg border border-neutral-200 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <EmptyState
              title="No completed pickups yet"
              description="Pickups you accept and deliver will be recorded here with impact verification."
            />
          )}
        </div>
      )}

      {/* Modal */}
      <FoodDetailModal
        donation={selectedDonation}
        isOpen={!!selectedDonation}
        onClose={() => setSelectedDonation(null)}
        onClaim={() => {}}
      />
    </div>
  );
}
