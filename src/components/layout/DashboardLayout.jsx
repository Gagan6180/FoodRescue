import React from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import { useFoodRescue } from '../../context/FoodRescueContext';
import {
  LayoutDashboard,
  UtensilsCrossed,
  PackageCheck,
  CheckCircle,
  BarChart3,
  User,
  ShieldCheck,
  MapPin,
} from 'lucide-react';

export default function DashboardLayout() {
  const { volunteerProfile, donations } = useFoodRescue();

  const activeCount = donations.filter(
    (d) => d.status === 'Accepted' || d.status === 'Collected'
  ).length;

  const navItems = [
    { to: '/dashboard', label: 'Overview', icon: LayoutDashboard, end: true },
    { to: '/available-food', label: 'Available Food', icon: UtensilsCrossed },
    {
      to: '/dashboard/pickups',
      label: 'My Pickups',
      icon: PackageCheck,
      badge: activeCount > 0 ? activeCount : null,
    },
    { to: '/dashboard/completed', label: 'Completed', icon: CheckCircle },
    { to: '/dashboard/impact', label: 'My Impact', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-sand-50/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8 items-start">
          {/* Sidebar */}
          <aside className="lg:col-span-1 bg-white rounded-xl border border-neutral-200/90 shadow-xs p-4 sm:p-5 sticky top-20">
            {/* Volunteer identity card */}
            <div className="pb-5 border-b border-neutral-100 flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-forest-100 text-forest-900 flex items-center justify-center font-bold text-base border border-forest-200">
                AB
              </div>
              <div className="overflow-hidden">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-semibold text-neutral-900 truncate">
                    {volunteerProfile.name}
                  </h3>
                  <ShieldCheck className="w-3.5 h-3.5 text-forest-700 shrink-0" title="Verified Rescuer" />
                </div>
                <p className="text-xs text-neutral-500 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-neutral-400" />
                  {volunteerProfile.location}
                </p>
              </div>
            </div>

            {/* Sidebar Navigation */}
            <nav className="mt-4 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-forest-800 text-white shadow-2xs'
                          : 'text-neutral-600 hover:text-neutral-900 hover:bg-sand-100'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span className="flex items-center gap-2.5">
                          <Icon
                            className={`w-4 h-4 ${
                              isActive ? 'text-white' : 'text-neutral-500'
                            }`}
                          />
                          {item.label}
                        </span>
                        {item.badge && (
                          <span
                            className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                              isActive
                                ? 'bg-white text-forest-900'
                                : 'bg-forest-100 text-forest-800'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </NavLink>
                );
              })}
            </nav>

            {/* Rescuer Status summary badge */}
            <div className="mt-6 pt-4 border-t border-neutral-100 bg-sand-50/80 rounded-lg p-3 text-xs text-neutral-600">
              <div className="flex justify-between items-center mb-1 text-neutral-800 font-medium">
                <span>Rescuer Status</span>
                <span className="text-emerald-700 font-semibold">Ready for Pickup</span>
              </div>
              <p className="text-neutral-600 leading-snug">
                Receiving real-time food surplus alerts within 10 km.
              </p>
            </div>
          </aside>

          {/* Main Dashboard Workspace */}
          <main className="lg:col-span-3">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
