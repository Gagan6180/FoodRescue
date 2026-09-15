import React, { useState } from 'react';
import { useFoodRescue } from '../context/FoodRescueContext';
import {
  Heart,
  TrendingUp,
  Leaf,
  Users,
  ShieldCheck,
  Building2,
  Award,
  Calendar,
  Sparkles,
  Droplets,
  CloudRain,
} from 'lucide-react';

export default function ImpactPage() {
  const { stats, organizations, volunteerProfile } = useFoodRescue();
  const [activeRange, setActiveRange] = useState('months');

  // Realistic mock trend points for meals rescued
  const monthlyTrends = [
    { label: 'Oct 2025', meals: 140, pickups: 19 },
    { label: 'Nov 2025', meals: 260, pickups: 38 },
    { label: 'Dec 2025', meals: 310, pickups: 44 },
    { label: 'Jan 2026', meals: 245, pickups: 35 },
    { label: 'Feb 2026', meals: 293, pickups: 50 },
  ];

  const maxMeals = Math.max(...monthlyTrends.map((t) => t.meals));

  // Category distribution
  const categoryBreakdown = [
    { name: 'Cooked Meals', percentage: 48, portions: '620 meals', color: 'bg-forest-700' },
    { name: 'Bakery & Breads', percentage: 22, portions: '280 meals', color: 'bg-amber-600' },
    { name: 'Groceries & Produce', percentage: 16, portions: '200 portions', color: 'bg-emerald-600' },
    { name: 'Beverages & Dairy', percentage: 10, portions: '125 packs', color: 'bg-sky-600' },
    { name: 'Packaged Food', percentage: 4, portions: '50 items', color: 'bg-neutral-600' },
  ];

  // Environmental equivalencies
  const co2PreventedKg = Math.round(stats.divertedKg * 1.9); // standard FAO factor ~1.9 kg CO2e per kg food saved
  const waterSavedLiters = Math.round(stats.divertedKg * 280); // approx water footprint

  return (
    <div className="min-h-screen bg-sand-50/60 py-10 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-left max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-forest-800">
            Transparency & Community Accountability
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight mt-1">
            Platform Impact & Waste Diversion
          </h1>
          <p className="text-sm text-neutral-600 mt-2">
            Every rescued meal prevents wholesome food from decaying in landfills and emitting methane, while directly supporting shelter residents and community kitchens.
          </p>
        </div>

        {/* Primary Impact Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white rounded-xl p-5 sm:p-6 border border-neutral-200/90 shadow-2xs">
            <span className="text-xs text-neutral-500 font-medium">Meals Rescued</span>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-forest-900 mt-1 tabular-nums">
              {stats.mealsRescued.toLocaleString()}+
            </div>
            <span className="text-xs text-emerald-700 mt-2 flex items-center gap-1 font-medium">
              <TrendingUp className="w-3.5 h-3.5" /> +18% this month
            </span>
          </div>

          <div className="bg-white rounded-xl p-5 sm:p-6 border border-neutral-200/90 shadow-2xs">
            <span className="text-xs text-neutral-500 font-medium">Food Diverted</span>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-forest-900 mt-1 tabular-nums">
              {stats.divertedKg} kg
            </div>
            <span className="text-xs text-neutral-500 mt-2 block">
              Diverted from municipal landfills
            </span>
          </div>

          <div className="bg-white rounded-xl p-5 sm:p-6 border border-neutral-200/90 shadow-2xs">
            <span className="text-xs text-neutral-500 font-medium">Active Donors</span>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-forest-900 mt-1 tabular-nums">
              {stats.activeDonors}
            </div>
            <span className="text-xs text-neutral-500 mt-2 block">
              Restaurants, canteens & bakeries
            </span>
          </div>

          <div className="bg-white rounded-xl p-5 sm:p-6 border border-neutral-200/90 shadow-2xs">
            <span className="text-xs text-neutral-500 font-medium">NGO Partners</span>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-forest-900 mt-1 tabular-nums">
              {stats.ngoPartners}
            </div>
            <span className="text-xs text-neutral-500 mt-2 block">
              Shelters, food banks & kitchens
            </span>
          </div>
        </div>

        {/* Environmental Footprint Equivalents */}
        <div className="bg-white rounded-2xl border border-neutral-200/90 p-6 sm:p-8 shadow-xs">
          <div className="mb-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-forest-800">
              Ecological Dividends
            </span>
            <h2 className="text-xl font-bold text-neutral-900 mt-0.5">
              Environmental Savings Calculated
            </h2>
            <p className="text-xs text-neutral-500 mt-1">
              Based on global lifecycle food waste research (UN FAO & WRI).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-sand-50/70 border border-neutral-200/60">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <Leaf className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-neutral-500 font-medium">CO₂e Emissions Avoided</span>
                <div className="text-xl font-bold font-mono text-neutral-900 mt-0.5">
                  ~{co2PreventedKg.toLocaleString()} kg
                </div>
                <p className="text-[11px] text-neutral-500 mt-1">
                  Equivalent to taking a passenger car off the road for 4,800 km.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-sand-50/70 border border-neutral-200/60">
              <div className="w-10 h-10 rounded-lg bg-sky-100 text-sky-800 flex items-center justify-center shrink-0">
                <Droplets className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-neutral-500 font-medium">Embedded Water Conserved</span>
                <div className="text-xl font-bold font-mono text-neutral-900 mt-0.5">
                  ~{waterSavedLiters.toLocaleString()} L
                </div>
                <p className="text-[11px] text-neutral-500 mt-1">
                  Agricultural water preserved by ensuring cooked food is eaten.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-sand-50/70 border border-neutral-200/60">
              <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-neutral-500 font-medium">Community Shelters Reached</span>
                <div className="text-xl font-bold font-mono text-neutral-900 mt-0.5">
                  14 Facilities
                </div>
                <p className="text-[11px] text-neutral-500 mt-1">
                  Across Guwahati, Nagaon, Delhi, Mumbai, and Bengaluru.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Rescue Growth Timeline & Category Distribution (2-column layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Monthly Trend Chart */}
          <div className="bg-white rounded-2xl border border-neutral-200/90 p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-neutral-900">
                    Meals Rescued Over Time
                  </h3>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Monthly rescued meals progression
                  </p>
                </div>
                <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-sand-100 text-neutral-700">
                  Last 5 Months
                </span>
              </div>

              {/* Bar visualization */}
              <div className="pt-6 space-y-4">
                {monthlyTrends.map((item) => {
                  const percent = Math.round((item.meals / maxMeals) * 100);
                  return (
                    <div key={item.label} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-neutral-700">{item.label}</span>
                        <span className="font-mono text-forest-900">
                          {item.meals} meals ({item.pickups} pickups)
                        </span>
                      </div>
                      <div className="w-full bg-sand-100 rounded-full h-3 overflow-hidden">
                        <div
                          className="bg-forest-700 h-full rounded-full transition-all duration-700 ease-out"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-6 border-t border-neutral-100 text-xs text-neutral-500 flex items-center justify-between mt-6">
              <span>Steadily rising as restaurant participation expands</span>
              <span className="font-medium text-forest-800">186 total pickups</span>
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="bg-white rounded-2xl border border-neutral-200/90 p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-neutral-900">
                    Surplus by Category
                  </h3>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Proportion of food categories rescued
                  </p>
                </div>
                <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-sand-100 text-neutral-700">
                  All Hubs
                </span>
              </div>

              {/* Progress stack */}
              <div className="w-full h-4 rounded-full overflow-hidden flex my-4 bg-neutral-100">
                {categoryBreakdown.map((cat, idx) => (
                  <div
                    key={idx}
                    className={`${cat.color}`}
                    style={{ width: `${cat.percentage}%` }}
                    title={`${cat.name}: ${cat.percentage}%`}
                  />
                ))}
              </div>

              {/* Category legend rows */}
              <div className="space-y-2.5 pt-2">
                {categoryBreakdown.map((cat, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-sm ${cat.color}`} />
                      <span className="font-medium text-neutral-800">{cat.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-neutral-500">{cat.portions}</span>
                      <span className="font-mono font-semibold text-neutral-900 w-8 text-right">
                        {cat.percentage}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-neutral-100 text-xs text-neutral-500 mt-6">
              Cooked meals account for nearly half of all saved food batches.
            </div>
          </div>
        </div>

        {/* Community Helper Achievements Showcase */}
        <div className="bg-white rounded-2xl border border-neutral-200/90 p-6 sm:p-8 shadow-xs">
          <div className="mb-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-forest-800">
              Community Milestones
            </span>
            <h2 className="text-xl font-bold text-neutral-900 mt-0.5">
              Verified Platform Milestones
            </h2>
            <p className="text-xs text-neutral-500 mt-1">
              Professional recognition badges awarded to vetted rescuers upon reaching verified distribution thresholds.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {volunteerProfile.achievements.map((ach) => (
              <div
                key={ach.id}
                className="p-4 rounded-xl border border-neutral-200/90 bg-sand-50/50 flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-lg bg-forest-100 text-forest-800 flex items-center justify-center mb-3">
                    <Award className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-neutral-900">{ach.title}</h4>
                  <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                    {ach.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-neutral-200/60 flex items-center justify-between text-[11px] text-neutral-500">
                  <span>Earned by volunteers</span>
                  <span className="font-mono font-medium text-forest-800">Verified</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
