import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFoodRescue } from '../context/FoodRescueContext';
import {
  PlusCircle,
  CheckCircle2,
  AlertCircle,
  Building,
  MapPin,
  Clock,
  Phone,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';
import { FOOD_CATEGORIES } from '../data/mockData';

const PRESET_PHOTOS = [
  {
    name: 'Cooked Curry / Rice',
    url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Sandwiches & Wraps',
    url: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Catering Buffet Trays',
    url: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Bakery & Fresh Breads',
    url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Fresh Farm Produce',
    url: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=800&q=80',
  },
];

export default function DonateFoodPage() {
  const { addDonation } = useFoodRescue();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    category: 'Cooked Meals',
    quantity: '',
    mealsCount: '',
    donor: '',
    donorType: 'Restaurant',
    location: '',
    city: 'Guwahati',
    prepTime: 'Today 6:00 PM',
    deadline: 'Today 10:30 PM',
    contactNumber: '',
    description: '',
    imageUrl: PRESET_PHOTOS[0].url,
    isSafeConfirmed: false,
  });

  const [errors, setErrors] = useState({});
  const [submittedDonation, setSubmittedDonation] = useState(null);

  const validate = () => {
    const errs = {};
    if (!formData.title.trim()) errs.title = 'Food title is required.';
    if (!formData.donor.trim()) errs.donor = 'Donor establishment name is required.';
    if (!formData.quantity.trim()) errs.quantity = 'Specify quantity (e.g. 30 meals or 4 trays).';
    if (!formData.mealsCount || Number(formData.mealsCount) <= 0) {
      errs.mealsCount = 'Please enter an estimated meal count.';
    }
    if (!formData.location.trim()) errs.location = 'Pickup address is required.';
    if (!formData.contactNumber.trim() || formData.contactNumber.length < 8) {
      errs.contactNumber = 'Valid contact number is required for volunteer pickup coordination.';
    }
    if (!formData.isSafeConfirmed) {
      errs.isSafeConfirmed = 'You must confirm that this food is safe for consumption.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const created = addDonation({
      ...formData,
      mealsCount: Number(formData.mealsCount),
    });

    setSubmittedDonation(created);
  };

  const handleResetForm = () => {
    setFormData({
      title: '',
      category: 'Cooked Meals',
      quantity: '',
      mealsCount: '',
      donor: '',
      donorType: 'Restaurant',
      location: '',
      city: 'Guwahati',
      prepTime: 'Today 6:00 PM',
      deadline: 'Today 10:30 PM',
      contactNumber: '',
      description: '',
      imageUrl: PRESET_PHOTOS[0].url,
      isSafeConfirmed: false,
    });
    setErrors({});
    setSubmittedDonation(null);
  };

  return (
    <div className="min-h-screen bg-[#fbfbf9] py-10 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8 text-left">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#056b4e] bg-[#e8f7f0] px-3 py-1 rounded-full">
            Donor Contribution
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mt-2">
            Donate surplus food
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1.5">
            Tell nearby volunteers what you have available. Verified rescuers will be notified instantly.
          </p>
        </div>

        {/* Success Confirmation Card */}
        {submittedDonation ? (
          <div className="bg-white rounded-2xl border border-gray-200/90 shadow-sm p-6 sm:p-8 animate-fade-up">
            <div className="flex items-center gap-3 text-[#056b4e] mb-4 pb-4 border-b border-gray-100">
              <div className="w-11 h-11 rounded-full bg-[#e8f7f0] flex items-center justify-center border border-[#b8e6d2]">
                <CheckCircle2 className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Donation Posted Successfully</h3>
                <p className="text-xs text-gray-500">
                  Your surplus food is now visible to nearby volunteers and NGOs.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 space-y-3 text-sm">
              <div className="flex justify-between items-center text-xs text-gray-500 pb-2 border-b border-gray-200">
                <span>Rescue Tracking ID</span>
                <span className="font-mono font-bold text-gray-900">{submittedDonation.id}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Food item</span>
                <span className="font-semibold text-gray-900">{submittedDonation.title}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Quantity</span>
                <span className="font-semibold text-gray-900">{submittedDonation.quantity} ({submittedDonation.mealsCount} meals)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Donor</span>
                <span className="font-semibold text-gray-900">{submittedDonation.donor}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Pickup Deadline</span>
                <span className="font-semibold text-amber-800">{submittedDonation.deadline}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Status</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#e8f7f0] text-[#056b4e]">
                  Available for Pickup
                </span>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
              <Link
                to="/available-food"
                className="w-full sm:w-auto flex-1 btn-primary text-sm py-3"
              >
                <span>View on Available Food</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                type="button"
                onClick={handleResetForm}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 text-sm font-medium transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Post Another Donation
              </button>
            </div>
          </div>
        ) : (
          /* Main Donation Form */
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl border border-gray-200/90 shadow-2xs p-6 sm:p-8 space-y-6"
          >
            {/* Food Title & Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-800 mb-1.5">
                  Food Name / Description <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Vegetable Biryani & Dal, Assorted Sandwiches, Fresh Roti Trays"
                  className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#056b4e]/20 focus:border-[#056b4e] transition-all ${
                    errors.title ? 'border-rose-400 bg-rose-50/20' : 'border-gray-200'
                  }`}
                />
                {errors.title && (
                  <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.title}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-800 mb-1.5">
                  Food Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-[#056b4e]"
                >
                  {FOOD_CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-800 mb-1.5">
                  Quantity Description <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  placeholder="e.g. 35 portions, 3 large catering trays"
                  className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#056b4e] transition-all ${
                    errors.quantity ? 'border-rose-400' : 'border-gray-200'
                  }`}
                />
                {errors.quantity && (
                  <p className="text-xs text-rose-600 mt-1">{errors.quantity}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-800 mb-1.5">
                  Estimated Meal Portions <span className="text-rose-600">*</span>
                </label>
                <input
                  type="number"
                  min="1"
                  max="1000"
                  value={formData.mealsCount}
                  onChange={(e) => setFormData({ ...formData, mealsCount: e.target.value })}
                  placeholder="e.g. 35"
                  className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#056b4e] ${
                    errors.mealsCount ? 'border-rose-400' : 'border-gray-200'
                  }`}
                />
                {errors.mealsCount && (
                  <p className="text-xs text-rose-600 mt-1">{errors.mealsCount}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-800 mb-1.5">
                  Preparation / Cooked Time
                </label>
                <input
                  type="text"
                  value={formData.prepTime}
                  onChange={(e) => setFormData({ ...formData, prepTime: e.target.value })}
                  placeholder="e.g. Today 5:00 PM"
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-[#056b4e]"
                />
              </div>
            </div>

            {/* Timings & Deadlines */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
              <div>
                <label className="block text-xs font-semibold text-gray-800 mb-1.5">
                  Pickup Deadline <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  placeholder="e.g. Today 10:30 PM"
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-[#056b4e]"
                />
                <span className="text-[11px] text-gray-400 mt-1 block">
                  Food will expire from public listing after this time.
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-800 mb-1.5">
                  City Hub
                </label>
                <select
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-[#056b4e]"
                >
                  <option value="Guwahati">Guwahati (Assam)</option>
                  <option value="Nagaon">Nagaon (Assam)</option>
                  <option value="Delhi">Delhi NCR</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Bengaluru">Bengaluru</option>
                </select>
              </div>
            </div>

            {/* Donor info & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
              <div>
                <label className="block text-xs font-semibold text-gray-800 mb-1.5">
                  Donor Establishment Name <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  value={formData.donor}
                  onChange={(e) => setFormData({ ...formData, donor: e.target.value })}
                  placeholder="e.g. Green Leaf Restaurant, ABC Canteen"
                  className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#056b4e] ${
                    errors.donor ? 'border-rose-400' : 'border-gray-200'
                  }`}
                />
                {errors.donor && (
                  <p className="text-xs text-rose-600 mt-1">{errors.donor}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-800 mb-1.5">
                  Donor Category
                </label>
                <select
                  value={formData.donorType}
                  onChange={(e) => setFormData({ ...formData, donorType: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-[#056b4e]"
                >
                  <option value="Restaurant">Restaurant</option>
                  <option value="College Canteen">College / University Canteen</option>
                  <option value="Bakery">Bakery / Confectionery</option>
                  <option value="Event Organizer">Event / Banquet Organizer</option>
                  <option value="Hotel">Hotel / Hospitality</option>
                  <option value="Hostel">Hostel Mess</option>
                  <option value="Individual">Individual Household</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-800 mb-1.5">
                  Exact Pickup Address & Instructions <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g. GS Road, Christian Basti (Near City Centre Mall), Guwahati"
                  className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#056b4e] ${
                    errors.location ? 'border-rose-400' : 'border-gray-200'
                  }`}
                />
                {errors.location && (
                  <p className="text-xs text-rose-600 mt-1">{errors.location}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-800 mb-1.5">
                  Coordinator Contact Number <span className="text-rose-600">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.contactNumber}
                  onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                  placeholder="e.g. +91 98640 21458"
                  className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#056b4e] ${
                    errors.contactNumber ? 'border-rose-400' : 'border-gray-200'
                  }`}
                />
                {errors.contactNumber && (
                  <p className="text-xs text-rose-600 mt-1">{errors.contactNumber}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-800 mb-1.5">
                  Packaging & Storage Notes
                </label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="e.g. Packed in clean foil trays, please bring thermal bag."
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-[#056b4e]"
                />
              </div>
            </div>

            {/* Representative Image Preset Selector */}
            <div className="pt-4 border-t border-gray-100">
              <label className="block text-xs font-semibold text-gray-800 mb-2">
                Food Image Preview
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {PRESET_PHOTOS.map((photo) => {
                  const isSelected = formData.imageUrl === photo.url;
                  return (
                    <button
                      key={photo.name}
                      type="button"
                      onClick={() => setFormData({ ...formData, imageUrl: photo.url })}
                      className={`relative rounded-xl overflow-hidden border text-left group transition-all ${
                        isSelected
                          ? 'ring-2 ring-[#056b4e] border-[#056b4e]'
                          : 'border-gray-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={photo.url}
                        alt={photo.name}
                        className="w-full h-16 object-cover"
                      />
                      <span className="text-[10px] font-medium p-1 block truncate text-gray-700 bg-gray-50">
                        {photo.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Safety Confirmation Checkbox */}
            <div className="pt-4 border-t border-gray-100">
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={formData.isSafeConfirmed}
                  onChange={(e) =>
                    setFormData({ ...formData, isSafeConfirmed: e.target.checked })
                  }
                  className="mt-1 w-4 h-4 rounded text-[#056b4e] focus:ring-[#056b4e] border-gray-300"
                />
                <span className="text-xs text-gray-700 leading-relaxed">
                  <strong className="text-gray-900 block font-semibold">
                    Food Safety & Freshness Verification
                  </strong>
                  I confirm that this food is untouched, safe for immediate human consumption, prepared under hygienic standards, and properly stored.
                </span>
              </label>
              {errors.isSafeConfirmed && (
                <p className="text-xs text-rose-600 mt-1.5 pl-7 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.isSafeConfirmed}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 px-5 rounded-full bg-[#056b4e] hover:bg-[#04563e] active:scale-[0.99] text-white text-sm font-semibold transition-all shadow-xs flex items-center justify-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                Post Donation
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
