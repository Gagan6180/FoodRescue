import React from 'react';
import Modal from '../common/Modal';
import StatusBadge from '../common/StatusBadge';
import {
  MapPin,
  Clock,
  Phone,
  Building2,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FoodDetailModal({ donation, isOpen, onClose, onClaim }) {
  if (!donation) return null;

  const isAvailable = donation.status === 'Available';

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Surplus Food Details" maxWidth="max-w-2xl">
      <div className="space-y-6">
        {/* Top visual & badges */}
        <div className="relative rounded-2xl overflow-hidden h-56 sm:h-64 bg-gray-100 border border-gray-200">
          <img
            src={donation.imageUrl}
            alt={donation.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3">
            <StatusBadge status={donation.status} size="lg" />
          </div>
          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs text-gray-800 text-xs font-semibold px-3 py-1 rounded-full border border-gray-200 shadow-xs">
            {donation.category}
          </div>
        </div>

        {/* Title & specs */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <h2 className="font-serif text-2xl font-bold text-gray-900">{donation.title}</h2>
            <span className="text-sm font-semibold px-3 py-1 bg-[#e8f7f0] text-[#056b4e] rounded-full border border-[#b8e6d2]">
              {donation.quantity} (~{donation.mealsCount} meals)
            </span>
          </div>

          <p className="text-sm text-gray-600 leading-relaxed">
            {donation.description}
          </p>

          {/* Tags */}
          {donation.tags && (
            <div className="flex flex-wrap gap-2 mt-3.5">
              {donation.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-xs font-medium px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Logistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50/80 p-5 rounded-2xl border border-gray-200/80 text-xs text-gray-600">
          <div className="space-y-1">
            <span className="text-gray-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-[#056b4e]" />
              Donor Establishment
            </span>
            <p className="font-bold text-gray-900 text-sm">{donation.donor}</p>
            <p className="text-gray-500">{donation.donorType} • {donation.city}</p>
          </div>

          <div className="space-y-1">
            <span className="text-gray-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#056b4e]" />
              Pickup Location ({donation.distanceKm} km away)
            </span>
            <p className="font-bold text-gray-900 text-sm">{donation.location}</p>
            <p className="text-gray-500">Free community pickup</p>
          </div>

          <div className="space-y-1">
            <span className="text-gray-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-700" />
              Safety Window
            </span>
            <p className="font-bold text-amber-900 text-sm">Pickup before {donation.deadline}</p>
            <p className="text-gray-500">Prepared: {donation.prepTime}</p>
          </div>

          <div className="space-y-1">
            <span className="text-gray-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#056b4e]" />
              Donor Contact
            </span>
            <p className="font-bold text-[#056b4e] text-sm">
              <a
                href={`tel:${donation.contactNumber}`}
                className="hover:underline"
              >
                {donation.contactNumber}
              </a>
            </p>
            <p className="text-gray-500">Call ahead before collection</p>
          </div>
        </div>

        {/* Claim Footer */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-gray-100">
          <div className="text-xs text-gray-500 flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-[#056b4e] shrink-0" />
            <span>Verified safe for consumption under food rescue guidelines.</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-initial px-4 py-2 text-xs font-medium rounded-full text-gray-600 hover:bg-gray-100 transition-colors"
            >
              Close
            </button>

            {isAvailable ? (
              <button
                type="button"
                onClick={() => {
                  onClaim(donation.id);
                  onClose();
                }}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-medium rounded-full text-white bg-[#056b4e] hover:bg-[#04563e] active:scale-[0.98] transition-all shadow-xs"
              >
                <span>Accept & Claim Pickup</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <Link
                to="/dashboard/pickups"
                onClick={onClose}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-5 py-2.5 text-xs font-medium rounded-full text-[#056b4e] bg-[#e8f7f0] hover:bg-[#d2ece4] transition-colors"
              >
                <span>Track in My Pickups</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
