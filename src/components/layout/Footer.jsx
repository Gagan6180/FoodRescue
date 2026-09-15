import React from 'react';
import { Link } from 'react-router-dom';
import { UtensilsCrossed, ShieldCheck } from 'lucide-react';
import { useFoodRescue } from '../../context/FoodRescueContext';

export default function Footer() {
  const { resetToDefaults } = useFoodRescue();

  return (
    <footer className="bg-[#023d2b] text-white mt-auto border-t border-[#032e21]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full border border-emerald-400 text-white flex items-center justify-center">
                <UtensilsCrossed className="w-4 h-4 stroke-[2.2]" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                FoodRescue
              </span>
            </Link>
            <p className="text-sm text-emerald-100/80 leading-relaxed max-w-sm">
              Connecting restaurants, canteens, bakeries, and hostels with volunteers and local NGOs to prevent food waste and nourish local communities.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-100 bg-white/10 p-3 rounded-xl border border-white/10 max-w-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-300 shrink-0" />
              <span>Complies with community food safety handling and hygiene guidelines.</span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-semibold text-emerald-300 tracking-wider uppercase mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm text-emerald-100/80">
              <li>
                <Link to="/available-food" className="hover:text-white transition-colors">
                  Available Food Near You
                </Link>
              </li>
              <li>
                <Link to="/donate" className="hover:text-white transition-colors">
                  Donate Surplus Food
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/impact" className="hover:text-white transition-colors">
                  Public Impact Report
                </Link>
              </li>
            </ul>
          </div>

          {/* Volunteer & Admin */}
          <div>
            <h4 className="text-xs font-semibold text-emerald-300 tracking-wider uppercase mb-4">
              Community
            </h4>
            <ul className="space-y-2.5 text-sm text-emerald-100/80">
              <li>
                <Link to="/dashboard" className="hover:text-white transition-colors">
                  Volunteer Portal
                </Link>
              </li>
              <li>
                <Link to="/dashboard/pickups" className="hover:text-white transition-colors">
                  Active Pickups
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-white transition-colors">
                  Admin Console
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={resetToDefaults}
                  className="text-xs text-emerald-300 hover:text-white underline underline-offset-2 transition-colors mt-2 block"
                >
                  Reset Demo Data
                </button>
              </li>
            </ul>
          </div>

          {/* Operational Cities */}
          <div>
            <h4 className="text-xs font-semibold text-emerald-300 tracking-wider uppercase mb-4">
              Active Hubs
            </h4>
            <ul className="space-y-1.5 text-sm text-emerald-100/80">
              <li>Guwahati (Kamrup Metro)</li>
              <li>Nagaon (Central Assam)</li>
              <li>New Delhi & NCR</li>
              <li>Mumbai (Western Suburbs)</li>
              <li>Bengaluru (East Zone)</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-200/70 gap-4">
          <p>© {new Date().getFullYear()} FoodRescue Initiative. Built for zero edible food waste.</p>
          <div className="flex items-center gap-6">
            <span>Free community food network</span>
            <span>Food Safety Standards</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
