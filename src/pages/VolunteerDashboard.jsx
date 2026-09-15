import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFoodRescue } from '../context/FoodRescueContext';
import FoodCard from '../components/food/FoodCard';
import FoodDetailModal from '../components/food/FoodDetailModal';
import StatusBadge from '../components/common/StatusBadge';
import {
  PackageCheck,
  CheckCircle,
  Clock,
  HeartHandshake,
  ArrowRight,
  MapPin,
  Flame,
  AlertCircle,
} from 'lucide-react';

export default function VolunteerDashboard() {
  const { volunteerProfile, donations, claimPickup } = useFoodRescue();
  const [selectedDonation, setSelectedDonation] = useState(null);

  // Pickups calculations
  const availableItems = donations.filter((d) => d.status === 'Available');
  const activePickups = donations.filter(
    (d) => d.status === 'Accepted' || d.status === 'Collected'
  );
  const completedPickups = donations.filter((d) => d.status === 'Delivered');

  // Dynamic greeting based on current time
  const hour = new Date().getHours();
  let greeting = 'Good day';
  if (hour < 12) greeting = 'Good morning';
  else if (hour < 17) greeting = 'Good afternoon';
  else greeting = 'Good evening';

  const statsCards = [
    {
      label: 'Available Pickups',
      value: availableItems.length,
      desc: 'Ready within 5 km',
      icon: Clock,
      color: 'text-emerald-700',
    },
    {
      label: 'Active Pickups',
      value: activePickups.length,
      desc: 'Currently in your queue',
      icon: PackageCheck,
      color: 'text-amber-800',
    },
    {
      label: 'Completed Pickups',
      value: volunteerProfile.personalStats.pickupsCompleted,
      desc: 'Successfully delivered',
      icon: CheckCircle,
      color: 'text-teal-800',
    },
    {
      label: 'Meals Rescued',
      value: volunteerProfile.personalStats.mealsRescued,
      desc: 'Direct portions saved',
      icon: HeartHandshake,
      color: 'text-forest-900',
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top greeting area */}
      <div className="bg-white rounded-2xl border border-neutral-200/90 p-6 sm:p-7 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse-subtle" />
              <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
                Rescuer Active
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight mt-1">
              {greeting}, {volunteerProfile.name.split(' ')[0]}
            </h1>
            <p className="text-sm text-neutral-600 mt-1">
              Here are the food rescues around you. Accept an open pickup to start routing.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/available-food"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-forest-800 text-white hover:bg-forest-900 transition-colors shadow-2xs"
            >
              Browse All Nearby Food
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="bg-white rounded-xl p-5 border border-neutral-200/90 shadow-2xs flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-neutral-500">{card.label}</span>
                <Icon className={`w-4 h-4 ${card.color}`} />
              </div>
              <div className="mt-3">
                <div className={`text-2xl sm:text-3xl font-bold font-mono ${card.color} tabular-nums`}>
                  {card.value}
                </div>
                <div className="text-[11px] text-neutral-400 mt-0.5">{card.desc}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active pickups priority alert banner */}
      {activePickups.length > 0 && (
        <div className="bg-amber-50 border border-amber-200/90 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-amber-100 text-amber-900 shrink-0">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-amber-950">
                You have {activePickups.length} active {activePickups.length === 1 ? 'pickup' : 'pickups'} in progress
              </h3>
              <p className="text-xs text-amber-900/90 mt-0.5">
                {activePickups[0].title} from {activePickups[0].donor} • Deadline: {activePickups[0].deadline}
              </p>
            </div>
          </div>
          <Link
            to="/dashboard/pickups"
            className="px-4 py-2 rounded-lg bg-amber-900 text-white text-xs font-semibold hover:bg-amber-950 transition-colors shrink-0 shadow-2xs"
          >
            Update Pickup Status
          </Link>
        </div>
      )}

      {/* Nearby Food Grid */}
      <div className="bg-white rounded-2xl border border-neutral-200/90 p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-neutral-100">
          <div>
            <h2 className="text-lg font-bold text-neutral-900">
              Nearby Food Ready for Pickup
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              Available batches sorted by distance to your current zone (Guwahati)
            </p>
          </div>
          <Link
            to="/available-food"
            className="text-xs font-semibold text-forest-800 hover:text-forest-900 flex items-center gap-1"
          >
            <span>Open live filters</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {availableItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {availableItems.slice(0, 4).map((item) => (
              <FoodCard
                key={item.id}
                donation={item}
                onSelect={(d) => setSelectedDonation(d)}
                onClaim={(id) => claimPickup(id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-neutral-500 text-sm">
            All nearby batches have been assigned to rescuers. Check back shortly for new donor posts.
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <FoodDetailModal
        donation={selectedDonation}
        isOpen={!!selectedDonation}
        onClose={() => setSelectedDonation(null)}
        onClaim={(id) => claimPickup(id)}
      />
    </div>
  );
}
