import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFoodRescue } from '../context/FoodRescueContext';
import {
  UtensilsCrossed,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Lock,
  Mail,
  Eye,
  EyeOff,
  UserCheck,
  Building2,
  Truck,
  Shield,
} from 'lucide-react';

export default function SignInPage() {
  const navigate = useNavigate();
  const { addToast } = useFoodRescue();

  const [role, setRole] = useState('volunteer'); // 'volunteer' | 'donor' | 'ngo' | 'admin'
  const [email, setEmail] = useState('arjun.barman@foodrescue.org');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const rolePresets = {
    volunteer: {
      title: 'Volunteer Rescuer',
      badge: 'Rescuer Portal',
      email: 'arjun.barman@foodrescue.org',
      redirect: '/dashboard',
      icon: Truck,
      desc: 'Claim nearby surplus food, coordinate collection, and record community deliveries.',
    },
    donor: {
      title: 'Food Donor',
      badge: 'Donor Portal',
      email: 'contact@greenleaf.com',
      redirect: '/donate',
      icon: Building2,
      desc: 'Post surplus food from restaurants, bakeries, hostels, or canteens in under 60 seconds.',
    },
    ngo: {
      title: 'Partner Organization',
      badge: 'NGO Hub',
      email: 'coordinator@communitykitchen.org',
      redirect: '/available-food',
      icon: UserCheck,
      desc: 'Receive free surplus food deliveries for child shelters, kitchens, and care centers.',
    },
    admin: {
      title: 'Operations Admin',
      badge: 'Admin Console',
      email: 'admin@foodrescue.org',
      redirect: '/admin',
      icon: Shield,
      desc: 'Manage live surplus dispatches, verify partner organizations, and oversee network routing.',
    },
  };

  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole);
    setEmail(rolePresets[selectedRole].email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const current = rolePresets[role];
    addToast(`Signed in successfully as ${current.title}`, 'success');
    navigate(current.redirect);
  };

  const handleQuickDemoLogin = (targetRole) => {
    handleRoleChange(targetRole);
    const current = rolePresets[targetRole];
    addToast(`Signing in to ${current.title} demo session...`, 'success');
    setTimeout(() => {
      navigate(current.redirect);
    }, 300);
  };

  const ActiveIcon = rolePresets[role].icon;

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col justify-center items-center bg-[#fbfbf9] py-8 sm:py-14">
      <div className="max-w-xl mx-auto px-4 sm:px-6 w-full">
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 sm:p-10">
          <div>
              {/* Header */}
              <div className="mb-6">
                <Link to="/" className="inline-flex items-center gap-2 mb-4 group">
                  <div className="w-8 h-8 rounded-full border-2 border-[#056b4e] text-[#056b4e] flex items-center justify-center">
                    <UtensilsCrossed className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <span className="text-base font-bold tracking-tight text-gray-900">
                    FoodRescue
                  </span>
                </Link>

                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                  Welcome back
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  Select your role below to sign in to your dashboard.
                </p>
              </div>

              {/* Role Selection Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 bg-gray-100/80 rounded-xl mb-6 text-xs">
                {Object.entries(rolePresets).map(([key, config]) => {
                  const isSelected = role === key;
                  const RoleIcon = config.icon;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => handleRoleChange(key)}
                      className={`flex flex-col items-center gap-1 py-2 px-2 rounded-lg font-medium transition-all ${
                        isSelected
                          ? 'bg-white text-[#056b4e] font-semibold shadow-xs'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                      }`}
                    >
                      <RoleIcon className="w-3.5 h-3.5" />
                      <span className="truncate">{config.title.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>

              {/* Active Role Notice */}
              <div className="mb-6 p-3 rounded-xl bg-[#e8f7f0] border border-[#b8e6d2] flex items-start gap-2.5 text-xs text-[#056b4e]">
                <ActiveIcon className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">{rolePresets[role].title}:</span>{' '}
                  <span className="text-gray-700">{rolePresets[role].desc}</span>
                </div>
              </div>

              {/* Sign In Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Email address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#056b4e]/20 focus:border-[#056b4e] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold text-gray-700">
                      Password
                    </label>
                    <a
                      href="#forgot"
                      onClick={(e) => {
                        e.preventDefault();
                        addToast('Password reset link sent to registered email address.', 'info');
                      }}
                      className="text-xs text-[#056b4e] hover:underline"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-2.5 text-sm bg-white border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#056b4e]/20 focus:border-[#056b4e] transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-gray-600">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-3.5 h-3.5 rounded text-[#056b4e] focus:ring-[#056b4e]"
                    />
                    <span>Remember this device</span>
                  </label>
                  <span className="text-gray-400">Demo password: any</span>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 px-5 rounded-full bg-[#056b4e] hover:bg-[#04563e] active:scale-[0.99] text-white text-sm font-semibold transition-all shadow-xs flex items-center justify-center gap-2"
                  >
                    <span>Sign In to {rolePresets[role].badge}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>

              {/* 1-Click Fast Demo Logins */}
              <div className="mt-6 pt-5 border-t border-gray-100">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 block mb-2 text-center">
                  Quick 1-Click Demo Logins
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin('volunteer')}
                    className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 font-medium text-left truncate transition-colors"
                  >
                    🚀 Arjun (Volunteer)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin('donor')}
                    className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 font-medium text-left truncate transition-colors"
                  >
                    🍲 Green Leaf (Donor)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin('ngo')}
                    className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 font-medium text-left truncate transition-colors"
                  >
                    🤝 Community Kitchen (NGO)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin('admin')}
                    className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-[#056b4e] font-semibold text-left truncate transition-colors"
                  >
                    ⚡ Operations Admin
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Register Link */}
            <div className="mt-8 pt-4 border-t border-gray-100 text-center text-xs text-gray-500">
              Don't have an account yet?{' '}
              <Link to="/donate" className="text-[#056b4e] font-semibold hover:underline">
                Post food
              </Link>{' '}
              or{' '}
              <Link to="/register-volunteer" className="text-[#056b4e] font-semibold hover:underline">
                Register as volunteer
              </Link>
            </div>
          </div>

        </div>
      </div>
  );
}
