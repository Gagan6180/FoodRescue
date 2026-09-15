import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useFoodRescue } from '../../context/FoodRescueContext';
import {
  Menu,
  X,
  PlusCircle,
  UtensilsCrossed,
  ArrowRight,
} from 'lucide-react';
import SupabaseStatusBadge from '../common/SupabaseStatusBadge';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { donations } = useFoodRescue();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // When on the homepage and at the top of the page, the navbar is transparent over the hero background
  const isTransparent = isHome && !isScrolled;

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
      return location.pathname.startsWith('/dashboard') || location.pathname === '/register-volunteer';
    }
    return location.pathname === path;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isTransparent
          ? 'bg-transparent border-transparent shadow-none py-2'
          : 'bg-white/95 backdrop-blur-md shadow-[0_2px_15px_-3px_rgba(0,0,0,0.06)] border-b border-gray-100 py-0.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between transition-all duration-300 ${
            isTransparent ? 'h-20 sm:h-22' : 'h-16 sm:h-18'
          }`}
        >
          {/* Brand Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group focus:outline-none"
            aria-label="FoodRescue Home"
          >
            <div
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 group-hover:rotate-12 group-hover:scale-110 shadow-xs ${
                isTransparent
                  ? 'border-white/80 bg-white/10 text-white backdrop-blur-xs group-hover:bg-white group-hover:text-[#056b4e] group-hover:shadow-[0_0_15px_rgba(255,255,255,0.4)]'
                  : 'border-[#056b4e] text-[#056b4e] group-hover:bg-[#056b4e] group-hover:text-white group-hover:shadow-[0_0_15px_rgba(5,107,78,0.35)]'
              }`}
            >
              <UtensilsCrossed className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.3]" />
            </div>
            <span
              className={`text-xl font-bold tracking-tight transition-colors duration-200 ${
                isTransparent
                  ? 'text-white group-hover:text-emerald-300 drop-shadow-xs'
                  : 'text-gray-900 group-hover:text-[#056b4e]'
              }`}
            >
              FoodRescue
            </span>
          </Link>

          {/* Center Navigation Links - Floating Translucent Capsule */}
          <nav
            className={`hidden md:flex items-center gap-1 p-1 rounded-full backdrop-blur-md transition-all duration-300 ${
              isTransparent
                ? 'bg-white/10 border border-white/20 shadow-sm'
                : 'bg-gray-100/80 border border-gray-200/60'
            }`}
          >
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                    isTransparent
                      ? active
                        ? 'bg-white text-gray-950 font-bold shadow-xs'
                        : 'text-white/90 hover:text-white hover:bg-white/20 active:scale-95'
                      : active
                      ? 'bg-[#056b4e] text-white font-semibold shadow-xs'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-white active:scale-95'
                  }`}
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <span
                      className={`px-1.5 py-0.2 text-[10px] font-bold rounded-full transition-transform duration-200 ${
                        isTransparent
                          ? active
                            ? 'bg-[#056b4e] text-white'
                            : 'bg-emerald-400 text-gray-950'
                          : active
                          ? 'bg-white text-[#056b4e]'
                          : 'bg-[#e8f7f0] text-[#056b4e] border border-[#b8e6d2]'
                      }`}
                    >
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions: Database Status + Sign In + Donate Food */}
          <div className="hidden md:flex items-center gap-3">
            <SupabaseStatusBadge isTransparent={isTransparent} />

            {/* Sign In Button */}
            <Link
              to="/signin"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 active:scale-95 ${
                isTransparent
                  ? 'text-white hover:text-white hover:bg-white/15 border border-transparent hover:border-white/25 backdrop-blur-xs'
                  : 'text-gray-700 hover:text-[#056b4e] hover:bg-[#e8f7f0]/60 border border-transparent hover:border-[#b8e6d2]/70'
              }`}
            >
              Sign In
            </Link>

            {/* Donate Food CTA */}
            <Link
              to="/donate"
              className={`inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-full text-white shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 group ${
                isTransparent
                  ? 'bg-[#056b4e] hover:bg-[#04563e] shadow-emerald-950/40 border border-emerald-400/30'
                  : 'bg-gradient-to-r from-[#056b4e] to-[#034431] hover:from-[#04563e] hover:to-[#023828]'
              }`}
            >
              <span>Donate Food</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Mobile hamburger & status */}
          <div className="flex items-center gap-2 md:hidden">
            <SupabaseStatusBadge isTransparent={isTransparent} />
            <Link
              to="/donate"
              className="inline-flex items-center gap-1 px-3.5 py-1.5 text-xs font-semibold rounded-full bg-[#056b4e] text-white shadow-xs active:scale-95"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              Donate
            </Link>
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-xl transition-colors focus:outline-none cursor-pointer ${
                isTransparent
                  ? 'text-white hover:bg-white/20'
                  : 'text-gray-700 hover:text-[#056b4e] hover:bg-emerald-50'
              }`}
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-b border-gray-200/80 bg-white/98 backdrop-blur-md px-4 pt-3 pb-6 space-y-2 animate-fade-in shadow-2xl text-gray-900">
          <div className="p-1 bg-gray-50 rounded-2xl space-y-1">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    active
                      ? 'text-white bg-[#056b4e] font-semibold shadow-xs'
                      : 'text-gray-700 hover:bg-white hover:text-[#056b4e]'
                  }`}
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <span
                      className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                        active
                          ? 'bg-white text-[#056b4e]'
                          : 'bg-[#056b4e] text-white'
                      }`}
                    >
                      {link.badge} active
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          <div className="pt-2 border-t border-gray-100 flex flex-col gap-2">
            <Link
              to="/register-volunteer"
              onClick={() => setIsOpen(false)}
              className="w-full py-3 px-4 rounded-xl text-sm font-semibold text-[#056b4e] bg-[#e8f7f0] border border-[#b8e6d2] text-center hover:bg-[#d8f2e5] transition-colors"
            >
              Register as Volunteer
            </Link>
            <Link
              to="/signin"
              onClick={() => setIsOpen(false)}
              className="w-full py-2.5 px-4 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 text-center transition-colors"
            >
              Sign In to Dashboard
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
