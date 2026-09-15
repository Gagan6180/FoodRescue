import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFoodRescue } from '../context/FoodRescueContext';
import {
  ShieldCheck,
  Bike,
  Car,
  Footprints,
  Clock,
  MapPin,
  CheckCircle2,
  Heart,
  ArrowRight,
  PackageCheck,
  Sparkles,
  Phone,
  Mail,
  User,
  AlertCircle,
  Award,
  Navigation,
} from 'lucide-react';

export default function RegisterVolunteerPage() {
  const navigate = useNavigate();
  const { registerVolunteer, stats } = useFoodRescue();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: 'Guwahati',
    area: '',
    pincode: '',
    vehicle: 'Two-wheeler with crate',
    hasInsulatedBag: 'yes',
    availability: ['evenings', 'weekends'],
    maxRadius: '5km',
    experience: '',
    pledgeAgreed: false,
    hygieneAgreed: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registeredRescuer, setRegisteredRescuer] = useState(null);

  const cityHubs = [
    'Guwahati',
    'Nagaon',
    'Delhi NCR',
    'Mumbai',
    'Bengaluru',
    'Kolkata',
    'Pune',
    'Hyderabad',
  ];

  const vehicleOptions = [
    {
      id: 'Two-wheeler with crate',
      title: 'Scooter / Motorcycle',
      desc: 'Ideal for 10-60 meals in urban traffic',
      icon: Bike,
    },
    {
      id: 'Car / Van',
      title: 'Car or Utility Van',
      desc: 'Best for large banquet & event surplus (60+ meals)',
      icon: Car,
    },
    {
      id: 'Bicycle with thermal pack',
      title: 'Bicycle / E-Bike',
      desc: 'Best for hyper-local pickups within 2-3 km',
      icon: Navigation,
    },
    {
      id: 'On foot / Public transit',
      title: 'Pedestrian / Transit',
      desc: 'Walking distance neighborhood pickups',
      icon: Footprints,
    },
  ];

  const availabilityOptions = [
    { id: 'mornings', label: 'Mornings (7 AM – 11 AM)' },
    { id: 'afternoons', label: 'Lunch / Midday (12 PM – 3 PM)' },
    { id: 'evenings', label: 'Evenings (6 PM – 10 PM)' },
    { id: 'night', label: 'Late Night Event Wrap-ups (10 PM – 12 AM)' },
    { id: 'weekends', label: 'Weekends Only' },
    { id: 'on_call', label: 'On-Call Emergency Surplus Alerts' },
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleAvailabilityToggle = (id) => {
    setFormData((prev) => {
      const current = prev.availability;
      const updated = current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id];
      return { ...prev, availability: updated };
    });
  };

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Please enter your full name';
    if (!formData.email.trim() || !formData.email.includes('@'))
      errs.email = 'Please provide a valid email address';
    if (!formData.phone.trim() || formData.phone.length < 8)
      errs.phone = 'Please provide a reachable phone/WhatsApp number';
    if (!formData.area.trim()) errs.area = 'Please provide your primary neighborhood or locality';
    if (!formData.pledgeAgreed) errs.pledgeAgreed = 'You must agree to the volunteer rescue pledge';
    if (!formData.hygieneAgreed) errs.hygieneAgreed = 'You must acknowledge food safety & hygiene protocols';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      window.scrollTo({ top: 300, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const rescuer = registerVolunteer(formData);
      setRegisteredRescuer(rescuer);
      setIsSubmitting(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#fcfbf9] py-10 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="mb-6 flex items-center gap-2 text-xs text-gray-500 font-medium">
          <Link to="/" className="hover:text-gray-900 transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#056b4e] font-semibold">Register as Volunteer</span>
        </div>

        {registeredRescuer ? (
          /* =========================================================================
             SUCCESS CONFIRMATION & DIGITAL RESCUER CREDENTIALS
             ========================================================================= */
          <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-[#b8e6d2] shadow-xl p-8 sm:p-12 text-center animate-fade-up">
            <div className="w-18 h-18 mx-auto rounded-full bg-[#e8f7f0] text-[#056b4e] flex items-center justify-center mb-6 shadow-inner">
              <CheckCircle2 className="w-10 h-10 stroke-[2.2]" />
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e8f7f0] text-[#056b4e] text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Rescuer Onboarding Completed</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              Welcome to the Rescue Team, {registeredRescuer.name}!
            </h1>
            <p className="text-gray-600 max-w-lg mx-auto text-sm sm:text-base mb-8">
              Your community volunteer account is now active. You have been authorized to collect and safely deliver surplus food in {registeredRescuer.location}.
            </p>

            {/* Official Rescuer ID Card Preview */}
            <div className="max-w-md mx-auto bg-gradient-to-br from-[#056b4e] via-[#04563e] to-[#023d2b] text-white rounded-2xl p-6 shadow-lg border border-white/20 text-left relative overflow-hidden mb-8">
              {/* Background ambient pattern */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10" />
              
              <div className="flex items-center justify-between border-b border-white/15 pb-4 mb-4">
                <div>
                  <div className="text-[10px] uppercase font-bold tracking-widest text-emerald-200">
                    FoodRescue Volunteer Pass
                  </div>
                  <div className="text-lg font-serif font-bold text-white tracking-tight">
                    {registeredRescuer.name}
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center border border-white/20">
                  <ShieldCheck className="w-6 h-6 text-emerald-300" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-[10px] text-emerald-200/80 block uppercase">Volunteer ID</span>
                  <span className="font-mono font-bold text-sm tracking-wider text-white">
                    {registeredRescuer.trackingId}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-emerald-200/80 block uppercase">Hub & City</span>
                  <span className="font-medium text-white">{registeredRescuer.location}</span>
                </div>
                <div>
                  <span className="text-[10px] text-emerald-200/80 block uppercase">Primary Transport</span>
                  <span className="font-medium text-white">{registeredRescuer.vehicle}</span>
                </div>
                <div>
                  <span className="text-[10px] text-emerald-200/80 block uppercase">Verification Status</span>
                  <span className="inline-flex items-center gap-1 text-emerald-300 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Authorized Rescuer
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-emerald-200/80">
                <span>Issued Today · Verified Community Member</span>
                <span className="font-mono text-[10px]">VERIFIED-2026</span>
              </div>
            </div>

            {/* Next Steps Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/dashboard"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#056b4e] hover:bg-[#04563e] text-white text-sm font-semibold transition-all shadow-md active:scale-95"
              >
                <span>Go to Rescuer Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/available-food"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white border border-gray-300 hover:border-gray-400 text-gray-700 text-sm font-semibold transition-all active:scale-95"
              >
                <span>View Urgent Surplus Food</span>
              </Link>
            </div>
          </div>
        ) : (
          /* =========================================================================
             VOLUNTEER REGISTRATION FORM
             ========================================================================= */
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 sm:p-10">
                
                {/* Form Header */}
                <div className="mb-8 border-b border-gray-100 pb-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e8f7f0] text-[#056b4e] text-xs font-semibold mb-3">
                    <Heart className="w-3.5 h-3.5 fill-[#056b4e]" />
                    <span>Join 1,200+ Active Food Rescuers</span>
                  </div>
                  <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight leading-tight">
                    Register as a Volunteer
                  </h1>
                  <p className="text-gray-600 text-sm sm:text-base mt-2 leading-relaxed">
                    Help bridge the last mile between generous restaurants, hostels, banquet halls, and local community shelters. Fast, flexible, and deeply impactful.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  
                  {/* SECTION 1: Personal Details */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-6 h-6 rounded-full bg-[#e8f7f0] text-[#056b4e] font-bold text-xs flex items-center justify-center">
                        1
                      </div>
                      <h2 className="font-serif text-lg font-bold text-gray-900">
                        Personal Information
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Full Name */}
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                          Full Legal or Preferred Name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder="e.g. Priyan Dutta or Ananya Roy"
                            className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#056b4e] ${
                              errors.fullName ? 'border-red-500 bg-red-50/20' : 'border-gray-200'
                            }`}
                          />
                        </div>
                        {errors.fullName && (
                          <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                          Email Address *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="you@domain.com"
                            className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#056b4e] ${
                              errors.email ? 'border-red-500 bg-red-50/20' : 'border-gray-200'
                            }`}
                          />
                        </div>
                        {errors.email && (
                          <p className="text-xs text-red-600 mt-1">{errors.email}</p>
                        )}
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                          Mobile / WhatsApp Number *
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+91 98640 12345"
                            className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#056b4e] ${
                              errors.phone ? 'border-red-500 bg-red-50/20' : 'border-gray-200'
                            }`}
                          />
                        </div>
                        {errors.phone && (
                          <p className="text-xs text-red-600 mt-1">{errors.phone}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* SECTION 2: Location & Coverage Hub */}
                  <div className="pt-6 border-t border-gray-100">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-6 h-6 rounded-full bg-[#e8f7f0] text-[#056b4e] font-bold text-xs flex items-center justify-center">
                        2
                      </div>
                      <h2 className="font-serif text-lg font-bold text-gray-900">
                        Operational Area & City
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* City Hub */}
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                          Primary City Hub *
                        </label>
                        <select
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#056b4e]"
                        >
                          {cityHubs.map((city) => (
                            <option key={city} value={city}>
                              {city}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Locality / Neighborhood */}
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                          Neighborhood / Area *
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="text"
                            name="area"
                            value={formData.area}
                            onChange={handleInputChange}
                            placeholder="e.g. GS Road, Paltan Bazaar, Indiranagar"
                            className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#056b4e] ${
                              errors.area ? 'border-red-500 bg-red-50/20' : 'border-gray-200'
                            }`}
                          />
                        </div>
                        {errors.area && (
                          <p className="text-xs text-red-600 mt-1">{errors.area}</p>
                        )}
                      </div>

                      {/* Max Rescue Radius */}
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                          Preferred Travel Radius
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {['2km', '5km', '10km', '15km+'].map((rad) => (
                            <button
                              key={rad}
                              type="button"
                              onClick={() => setFormData((p) => ({ ...p, maxRadius: rad }))}
                              className={`py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all text-center ${
                                formData.maxRadius === rad
                                  ? 'bg-[#056b4e] text-white border-[#056b4e] shadow-xs'
                                  : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                              }`}
                            >
                              Within {rad}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SECTION 3: Logistics & Vehicle */}
                  <div className="pt-6 border-t border-gray-100">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-6 h-6 rounded-full bg-[#e8f7f0] text-[#056b4e] font-bold text-xs flex items-center justify-center">
                        3
                      </div>
                      <h2 className="font-serif text-lg font-bold text-gray-900">
                        Transport & Rescue Equipment
                      </h2>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
                          Select Your Primary Mode of Transport *
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {vehicleOptions.map((v) => {
                            const Icon = v.icon;
                            const isSelected = formData.vehicle === v.id;
                            return (
                              <button
                                key={v.id}
                                type="button"
                                onClick={() => setFormData((p) => ({ ...p, vehicle: v.id }))}
                                className={`p-3.5 rounded-2xl border text-left transition-all flex items-start gap-3.5 ${
                                  isSelected
                                    ? 'bg-[#e8f7f0] border-[#056b4e] ring-2 ring-[#056b4e]/20'
                                    : 'bg-white border-gray-200 hover:border-gray-300'
                                }`}
                              >
                                <div
                                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                                    isSelected
                                      ? 'bg-[#056b4e] text-white'
                                      : 'bg-gray-100 text-gray-600'
                                  }`}
                                >
                                  <Icon className="w-5 h-5" />
                                </div>
                                <div>
                                  <div className="text-sm font-semibold text-gray-900">
                                    {v.title}
                                  </div>
                                  <div className="text-xs text-gray-500 mt-0.5">
                                    {v.desc}
                                  </div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Insulated Carry Bag */}
                      <div className="pt-2">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
                          Do you possess an insulated food delivery bag / thermal container?
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                          {[
                            { val: 'yes', label: 'Yes, I have an insulated bag' },
                            { val: 'crates', label: 'Have food-grade crates / containers' },
                            { val: 'need_kit', label: 'Need FoodRescue thermal bag' },
                          ].map((item) => (
                            <button
                              key={item.val}
                              type="button"
                              onClick={() => setFormData((p) => ({ ...p, hasInsulatedBag: item.val }))}
                              className={`py-2.5 px-3 rounded-xl border font-medium text-center transition-all ${
                                formData.hasInsulatedBag === item.val
                                  ? 'bg-[#056b4e] text-white border-[#056b4e]'
                                  : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                              }`}
                            >
                              {item.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SECTION 4: Availability */}
                  <div className="pt-6 border-t border-gray-100">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-6 h-6 rounded-full bg-[#e8f7f0] text-[#056b4e] font-bold text-xs flex items-center justify-center">
                        4
                      </div>
                      <h2 className="font-serif text-lg font-bold text-gray-900">
                        When Are You Typically Available?
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {availabilityOptions.map((slot) => {
                        const isChecked = formData.availability.includes(slot.id);
                        return (
                          <label
                            key={slot.id}
                            className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer text-xs transition-all ${
                              isChecked
                                ? 'bg-[#e8f7f0] border-[#056b4e] text-[#056b4e] font-semibold'
                                : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => handleAvailabilityToggle(slot.id)}
                              className="rounded text-[#056b4e] focus:ring-[#056b4e] w-4 h-4 accent-[#056b4e]"
                            />
                            <span>{slot.label}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* SECTION 5: Pledge & Safety Protocols */}
                  <div className="pt-6 border-t border-gray-100 space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-[#e8f7f0] text-[#056b4e] font-bold text-xs flex items-center justify-center">
                        5
                      </div>
                      <h2 className="font-serif text-lg font-bold text-gray-900">
                        Food Safety & Volunteer Pledge
                      </h2>
                    </div>

                    <label className={`flex items-start gap-3 p-3.5 rounded-xl border text-xs cursor-pointer transition-colors ${
                      errors.pledgeAgreed ? 'border-red-400 bg-red-50/30' : 'border-gray-200 bg-gray-50'
                    }`}>
                      <input
                        type="checkbox"
                        name="pledgeAgreed"
                        checked={formData.pledgeAgreed}
                        onChange={handleInputChange}
                        className="mt-0.5 rounded text-[#056b4e] focus:ring-[#056b4e] w-4 h-4 accent-[#056b4e]"
                      />
                      <span className="text-gray-700 leading-relaxed">
                        <strong>Volunteer Pledge:</strong> I commit to treating donors, volunteers, and community recipients with dignity, respect, and punctuality when accepting food rescue missions.
                      </span>
                    </label>

                    <label className={`flex items-start gap-3 p-3.5 rounded-xl border text-xs cursor-pointer transition-colors ${
                      errors.hygieneAgreed ? 'border-red-400 bg-red-50/30' : 'border-gray-200 bg-gray-50'
                    }`}>
                      <input
                        type="checkbox"
                        name="hygieneAgreed"
                        checked={formData.hygieneAgreed}
                        onChange={handleInputChange}
                        className="mt-0.5 rounded text-[#056b4e] focus:ring-[#056b4e] w-4 h-4 accent-[#056b4e]"
                      />
                      <span className="text-gray-700 leading-relaxed">
                        <strong>Food Safety Standard:</strong> I agree to inspect food smell, visual seal, and packaging freshness before collection and ensure direct transit to community shelters without delay.
                      </span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 px-6 rounded-full bg-[#056b4e] hover:bg-[#04563e] active:scale-[0.99] text-white text-base font-semibold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Issuing Rescuer ID & Credentials...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Registration & Get Rescuer ID</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                    <p className="text-center text-[11px] text-gray-500 mt-2.5">
                      No membership fee required. By joining, you become a recognized FoodRescue volunteer.
                    </p>
                  </div>

                </form>
              </div>
            </div>
        )}

      </div>
    </div>
  );
}
