import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFoodRescue } from '../context/FoodRescueContext';
import StatsCounter from '../components/home/StatsCounter';
import HeroFlowVisual from '../components/home/HeroFlowVisual';
import FoodCard from '../components/food/FoodCard';
import FoodDetailModal from '../components/food/FoodDetailModal';
import {
  ArrowRight,
  PlusCircle,
  Search,
  Check,
  ShieldCheck,
  Building,
  Heart,
  Clock,
  Sparkles,
} from 'lucide-react';

export default function HomePage() {
  const { donations, stats, claimPickup } = useFoodRescue();
  const [selectedDonation, setSelectedDonation] = useState(null);

  // Available food subset for home preview
  const previewDonations = donations
    .filter((d) => d.status === 'Available')
    .slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. HERO SECTION - Matched precisely to RePlate / FoodRescue Reference */}
      <section className="relative overflow-hidden bg-white pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Headline, subtext, actions & stat counters */}
            <div className="lg:col-span-6 space-y-6 text-left">
              {/* Pill badge: 12,847 meals rescued this week */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e8f7f0] border border-[#b8e6d2] text-[#056b4e] text-xs font-medium tracking-wide">
                <span className="w-2 h-2 rounded-full bg-[#056b4e] animate-pulse-subtle" />
                <span>12,847 meals rescued this week</span>
              </div>

              {/* Standard Editorial Serif Headline */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-[56px] xl:text-[62px] font-bold tracking-tight text-gray-900 leading-[1.12]">
                Rescue food.<br />
                <span className="text-[#056b4e]">Nourish communities.</span>
              </h1>

              {/* Subtext */}
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl font-normal">
                Connect surplus food from restaurants, canteens, and events with local NGOs and volunteers. Every meal matters.
              </p>

              {/* CTA Buttons matching reference */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to="/donate"
                  className="btn-primary text-sm sm:text-base px-7 py-3.5"
                >
                  <span>I have food to donate</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/available-food"
                  className="btn-secondary text-sm sm:text-base px-6 py-3.5"
                >
                  I want to volunteer
                </Link>
              </div>

              {/* Bottom Quick Stats Row under Hero (matching reference) */}
              <div className="pt-6 border-t border-gray-100 flex items-center gap-6 sm:gap-10">
                <div>
                  <div className="font-serif text-2xl sm:text-3xl font-bold text-gray-900">
                    2.4M+
                  </div>
                  <div className="text-xs text-gray-500 font-medium mt-0.5">
                    Meals Rescued
                  </div>
                </div>

                <div className="h-8 w-px bg-gray-200" />

                <div>
                  <div className="font-serif text-2xl sm:text-3xl font-bold text-gray-900">
                    890+
                  </div>
                  <div className="text-xs text-gray-500 font-medium mt-0.5">
                    Partners
                  </div>
                </div>

                <div className="h-8 w-px bg-gray-200" />

                <div>
                  <div className="font-serif text-2xl sm:text-3xl font-bold text-gray-900">
                    156
                  </div>
                  <div className="text-xs text-gray-500 font-medium mt-0.5">
                    Cities
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Mint Frame + Fresh Produce Photography + Floating Confirmed Card */}
            <div className="lg:col-span-6 relative">
              <div className="relative bg-[#e6f5ef] p-3 sm:p-4 rounded-[28px] sm:rounded-[36px] border border-[#d2ede2]">
                <div className="relative rounded-2xl sm:rounded-[24px] overflow-hidden aspect-[4/3] bg-gray-100">
                  <img
                    src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80"
                    alt="Fresh produce, vegetables and fruits at community market"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Floating "Pickup confirmed" badge card (matching reference image) */}
                <div className="absolute -bottom-4 left-6 sm:left-8 bg-white rounded-xl shadow-lg border border-gray-100 px-4 py-3 flex items-center gap-3 animate-fade-up">
                  <div className="w-8 h-8 rounded-full bg-[#e8f7f0] text-[#056b4e] flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs sm:text-sm font-semibold text-gray-900 leading-tight">
                      Pickup confirmed
                    </div>
                    <div className="text-[11px] text-gray-500 font-normal mt-0.5">
                      45 meals • 2.3 km away
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Interactive 4-step coordination visual */}
          <div className="mt-20">
            <HeroFlowVisual />
          </div>
        </div>
      </section>

      {/* 2. PLATFORM IMPACT SECTION */}
      <section className="py-16 sm:py-20 bg-[#fbfbf9] border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#056b4e]">
                Verified Platform Metrics
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mt-1">
                Real food saved from waste
              </h2>
            </div>
            <Link
              to="/impact"
              className="text-xs sm:text-sm font-medium text-[#056b4e] hover:text-[#04563e] inline-flex items-center gap-1 group"
            >
              <span>Explore public impact ledger</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <StatsCounter stats={stats} />
        </div>
      </section>

      {/* 3. HOW IT WORKS */}
      <section className="py-16 sm:py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#056b4e]">
              Simple 3-Step Flow
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mt-1.5">
              How FoodRescue Works
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-2">
              Designed specifically for fast logistics so hot, fresh surplus gets safely delivered before it spoils.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <div className="bg-[#fbfbf9] rounded-2xl p-6 sm:p-8 border border-gray-200/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-serif text-2xl font-bold text-[#056b4e]">01</span>
                  <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-white text-gray-700 border border-gray-200">
                    Donor Action
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Post surplus food
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Donors enter what food they have, quantity, pickup location, and safety deadline. Takes less than 60 seconds on any phone.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200 text-xs text-gray-500 font-medium">
                Instant broadcast to nearby active volunteers
              </div>
            </div>

            <div className="bg-[#fbfbf9] rounded-2xl p-6 sm:p-8 border border-gray-200/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-serif text-2xl font-bold text-[#056b4e]">02</span>
                  <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-white text-gray-700 border border-gray-200">
                    Rescuer Action
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Find a nearby pickup
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Volunteers and NGOs see available food nearby with distance indicators and pickup windows, then claim the pickup with one click.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200 text-xs text-gray-500 font-medium">
                No phone tag or coordination friction
              </div>
            </div>

            <div className="bg-[#fbfbf9] rounded-2xl p-6 sm:p-8 border border-gray-200/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-serif text-2xl font-bold text-[#056b4e]">03</span>
                  <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-white text-gray-700 border border-gray-200">
                    Community Impact
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Rescue and deliver
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  A volunteer collects the packaged food and delivers it to the appropriate community shelter or child care facility.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200 text-xs text-gray-500 font-medium">
                Impact recorded transparently in real time
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. LIVE LISTINGS PREVIEW */}
      <section className="py-16 sm:py-24 bg-[#fbfbf9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#056b4e]">
                Surplus Marketplace
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mt-1">
                Food available near you
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Verified safe batches ready for pickup by volunteers and NGOs.
              </p>
            </div>

            <Link
              to="/available-food"
              className="btn-secondary text-xs sm:text-sm px-5 py-2.5"
            >
              <span>View all available ({donations.filter(d => d.status === 'Available').length})</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {previewDonations.map((donation) => (
              <FoodCard
                key={donation.id}
                donation={donation}
                onSelect={(d) => setSelectedDonation(d)}
                onClaim={(id) => claimPickup(id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION */}
      <section className="py-16 sm:py-20 bg-[#056b4e] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-200">
                Join the Network
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Have surplus food today or want to rescue?
              </h2>
              <p className="text-sm text-emerald-100 leading-relaxed max-w-lg">
                Whether you have 20 extra portions from today's lunch rush or a two-wheeler to rescue meals on your evening commute, you can make an immediate difference.
              </p>
              <div className="pt-3 flex flex-wrap gap-4">
                <Link
                  to="/donate"
                  className="px-6 py-3 rounded-full bg-white text-[#056b4e] text-sm font-semibold hover:bg-gray-50 transition-all shadow-sm"
                >
                  Post Food as a Donor
                </Link>
                <Link
                  to="/dashboard"
                  className="px-6 py-3 rounded-full bg-[#04563e] text-white text-sm font-medium border border-emerald-700/60 hover:bg-[#034431] transition-all"
                >
                  Volunteer Portal
                </Link>
              </div>
            </div>

            <div className="bg-[#04563e] rounded-2xl p-7 border border-emerald-700/50 space-y-4">
              <div className="flex items-center gap-2 text-emerald-200 font-semibold text-sm">
                <ShieldCheck className="w-5 h-5" />
                Our Food Safety Pledge
              </div>
              <p className="text-xs text-emerald-100 leading-relaxed">
                FoodRescue only accepts food that was prepared within strict safety thresholds. Donors verify hygienic packaging and maintain safe holding temperatures.
              </p>
              <div className="grid grid-cols-2 gap-4 text-xs text-white pt-2 border-t border-emerald-700/60">
                <div>
                  <span className="font-bold block text-white">No expired food</span>
                  <span className="text-emerald-200 text-[11px]">Strict consumption window</span>
                </div>
                <div>
                  <span className="font-bold block text-white">Food-grade packaging</span>
                  <span className="text-emerald-200 text-[11px]">Sealed containers only</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detail modal */}
      <FoodDetailModal
        donation={selectedDonation}
        isOpen={!!selectedDonation}
        onClose={() => setSelectedDonation(null)}
        onClaim={(id) => claimPickup(id)}
      />
    </div>
  );
}
