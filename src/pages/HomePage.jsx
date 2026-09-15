import React, { useState, useEffect } from 'react';
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

const heroBackgrounds = [
  {
    url: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1400&q=80',
    title: 'Fresh community market produce and healthy fruits',
  },
  {
    url: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1400&q=80',
    title: 'Volunteers packing boxes of wholesome food donations',
  },
  {
    url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1400&q=80',
    title: 'Fresh artisan bread and baked goods rescued daily',
  },
  {
    url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1400&q=80',
    title: 'Community feeding centers and smiles from nourished families',
  },
  {
    url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1400&q=80',
    title: 'Nutritious hot meals prepared by restaurants and caterers',
  },
];

export default function HomePage() {
  const { donations, stats, claimPickup } = useFoodRescue();
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % heroBackgrounds.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  // Available food subset for home preview
  const previewDonations = donations
    .filter((d) => d.status === 'Available')
    .slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. HERO SECTION - Full-Bleed Auto-Cycling Background Spreading Across Whole First Section Only */}
      <section className="relative overflow-hidden min-h-[660px] lg:min-h-[740px] flex flex-col justify-center pt-28 pb-16 lg:pt-36 lg:pb-24 border-b border-gray-100">
        
        {/* Full-Bleed Background Images Spreading Across Whole First Section Only */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {heroBackgrounds.map((bg, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out transform transition-transform duration-[6000ms] ${
                idx === bgIndex ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
              }`}
              style={{ backgroundImage: `url(${bg.url})` }}
            />
          ))}
          {/* Cinematic gradient overlay ensuring text and buttons stand out with AAA contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/80 to-slate-900/55" />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
          <div className="space-y-6">
            {/* Pill badge: 12,847 meals rescued this week */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-emerald-300 text-xs font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>12,847 meals rescued this week</span>
            </div>

            {/* Standard Editorial Serif Headline */}
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-[66px] font-bold tracking-tight text-white leading-[1.12]">
              Rescue food.<br />
              <span className="text-emerald-400">Nourish communities.</span>
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-xl text-slate-200 leading-relaxed max-w-2xl mx-auto font-normal">
              Connect surplus food from restaurants, canteens, and events with local NGOs and volunteers. Every meal matters.
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/donate"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#056b4e] hover:bg-[#04563e] text-white text-base font-semibold transition-all shadow-lg active:scale-95"
              >
                <span>I have food to donate</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/register-volunteer"
                className="px-8 py-4 rounded-full bg-white/15 hover:bg-white/25 text-white text-base font-semibold border border-white/30 backdrop-blur-md transition-all shadow-sm active:scale-95"
              >
                I want to volunteer
              </Link>
            </div>

            {/* Bottom Quick Stats Row under Hero */}
            <div className="pt-8 border-t border-white/15 flex items-center justify-center gap-8 sm:gap-14 text-white">
              <div>
                <div className="font-serif text-3xl sm:text-4xl font-bold text-white">
                  2.4M+
                </div>
                <div className="text-xs sm:text-sm text-slate-300 font-medium mt-0.5">
                  Meals Rescued
                </div>
              </div>

              <div className="h-10 w-px bg-white/20" />

              <div>
                <div className="font-serif text-3xl sm:text-4xl font-bold text-white">
                  890+
                </div>
                <div className="text-xs sm:text-sm text-slate-300 font-medium mt-0.5">
                  Partners
                </div>
              </div>

              <div className="h-10 w-px bg-white/20" />

              <div>
                <div className="font-serif text-3xl sm:text-4xl font-bold text-white">
                  156
                </div>
                <div className="text-xs sm:text-sm text-slate-300 font-medium mt-0.5">
                  Cities
                </div>
              </div>
            </div>
          </div>

          {/* Slide Indicator Dots at bottom of hero */}
          <div className="mt-12 flex items-center justify-center gap-2 z-20">
            {heroBackgrounds.map((bg, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                onClick={() => setBgIndex(dotIdx)}
                aria-label={`Slide ${dotIdx + 1}: ${bg.title}`}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  dotIdx === bgIndex ? 'w-8 bg-emerald-400' : 'w-2 bg-white/40 hover:bg-white/80'
                }`}
              />
            ))}
          </div>

        </div>
      </section>

      {/* Interactive 4-step coordination visual */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <HeroFlowVisual />
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
      <section className="py-16 sm:py-20 bg-white text-gray-900 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#056b4e]">
                Join the Network
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
                Have surplus food today or want to rescue?
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed max-w-lg">
                Whether you have 20 extra portions from today's lunch rush or a two-wheeler to rescue meals on your evening commute, you can make an immediate difference.
              </p>
              <div className="pt-3 flex flex-wrap gap-4">
                <Link
                  to="/donate"
                  className="px-6 py-3 rounded-full bg-[#056b4e] text-white text-sm font-semibold hover:bg-[#04563e] transition-all shadow-sm"
                >
                  Post Food as a Donor
                </Link>
                <Link
                  to="/register-volunteer"
                  className="px-6 py-3 rounded-full bg-white text-gray-800 text-sm font-medium border border-gray-300 hover:bg-gray-50 transition-all shadow-xs"
                >
                  Register as Volunteer
                </Link>
              </div>
            </div>

            <div className="bg-[#f8faf9] rounded-2xl p-7 border border-gray-200/80 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-[#056b4e] font-semibold text-sm">
                <ShieldCheck className="w-5 h-5 text-[#056b4e]" />
                Our Food Safety Pledge
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                FoodRescue only accepts food that was prepared within strict safety thresholds. Donors verify hygienic packaging and maintain safe holding temperatures.
              </p>
              <div className="grid grid-cols-2 gap-4 text-xs pt-2 border-t border-gray-200">
                <div>
                  <span className="font-bold block text-gray-900">No expired food</span>
                  <span className="text-gray-500 text-[11px]">Strict consumption window</span>
                </div>
                <div>
                  <span className="font-bold block text-gray-900">Food-grade packaging</span>
                  <span className="text-gray-500 text-[11px]">Sealed containers only</span>
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
