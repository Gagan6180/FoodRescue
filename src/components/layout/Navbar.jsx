import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useFoodRescue } from '../../context/FoodRescueContext';
import {
  Menu,
  X,
  PlusCircle,
  UtensilsCrossed,
} from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { donations } = useFoodRescue();

  const activePickupsCount = donations.filter(
    (d) => d.status === 'Accepted' || d.status === 'Collected'
  ).length;

  const navLinks = [
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'Food Listings', path: '/available-food' },
    { name: 'Our Impact', path: '/impact' },
    {
      name: 'Volunteer',
      path: '/dashboard',
      badge: activePickupsCount > 0 ? activePickupsCount : null,
    },
    { name: 'Admin', path: '/admin' },
  ];

  const isActive = (path) => {
    if (path === '/dashboard') {
      return location.pathname.startsWith('/dashboard');
    }
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          {/* Logo: circular green outline + brand name */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group focus:outline-none"
            aria-label="FoodRescue Home"
          >
            <div className="w-9 h-9 rounded-full border-2 border-[#056b4e] text-[#056b4e] flex items-center justify-center transition-transform group-hover:scale-105">
              <UtensilsCrossed className="w-4 h-4 stroke-[2.2]" />
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900">
              FoodRescue
            </span>
          </Link>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-medium transition-colors ${
                    active
                      ? 'text-[#056b4e] font-semibold'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {link.name}
                    {link.badge && (
                      <span className="px-2 py-0.2 text-[11px] font-semibold bg-[#e8f7f0] text-[#056b4e] rounded-full">
                        {link.badge}
                      </span>
                    )}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Right Actions: Sign In + Donate Food Pill Button */}
          <div className="hidden md:flex items-center gap-5">
            <Link
              to="/signin"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/donate"
              className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium rounded-full bg-[#056b4e] hover:bg-[#04563e] text-white transition-all shadow-xs active:scale-[0.98]"
            >
              Donate Food
            </Link>
          </div>

          {/* Mobile hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <Link
              to="/donate"
              className="inline-flex items-center gap-1 px-3.5 py-1.5 text-xs font-medium rounded-full bg-[#056b4e] text-white"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              Donate
            </Link>
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-b border-gray-200 bg-white px-4 pt-3 pb-5 space-y-1.5 animate-fade-in shadow-lg">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  active
                    ? 'text-[#056b4e] bg-[#e8f7f0] font-semibold'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span>{link.name}</span>
                {link.badge && (
                  <span className="px-2 py-0.5 text-xs font-semibold bg-[#056b4e] text-white rounded-full">
                    {link.badge} active
                  </span>
                )}
              </Link>
            );
          })}

          <div className="pt-2 mt-2 border-t border-gray-100 flex flex-col gap-2">
            <Link
              to="/register-volunteer"
              onClick={() => setIsOpen(false)}
              className="w-full py-2.5 px-4 rounded-xl text-sm font-semibold text-[#056b4e] bg-[#e8f7f0] text-center"
            >
              Register as Volunteer
            </Link>
            <Link
              to="/signin"
              onClick={() => setIsOpen(false)}
              className="w-full py-2.5 px-4 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 text-center"
            >
              Sign In
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
