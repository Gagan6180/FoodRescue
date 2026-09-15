import React from 'react';
import StatusBadge from '../common/StatusBadge';
import { MapPin, Clock, ArrowRight } from 'lucide-react';

export default function FoodCard({ donation, onSelect, onClaim }) {
  const isAvailable = donation.status === 'Available';

  return (
    <article className="group bg-white rounded-2xl border border-gray-200/90 overflow-hidden shadow-xs hover:shadow-md hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-200 flex flex-col">
      {/* Food image container */}
      <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
        <img
          src={donation.imageUrl}
          alt={donation.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <StatusBadge status={donation.status} size="sm" />
        </div>
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs text-gray-800 text-[11px] font-semibold px-3 py-1 rounded-full shadow-xs border border-gray-200">
          {donation.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3
              onClick={() => onSelect(donation)}
              className="text-base sm:text-lg font-bold text-gray-900 line-clamp-1 hover:text-[#056b4e] transition-colors cursor-pointer"
            >
              {donation.title}
            </h3>
            <span className="shrink-0 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#e8f7f0] text-[#056b4e] border border-[#b8e6d2]">
              {donation.quantity}
            </span>
          </div>

          {/* Donor & distance */}
          <div className="text-xs text-gray-600 space-y-1 mb-4">
            <p className="font-medium text-gray-900">{donation.donor}</p>
            <p className="flex items-center gap-1.5 text-gray-500">
              <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <span>{donation.distanceKm} km away • {donation.location}</span>
            </p>
          </div>
        </div>

        <div>
          {/* Pickup deadline */}
          <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs mb-4">
            <span className="flex items-center gap-1.5 text-amber-800 font-medium bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200/60">
              <Clock className="w-3.5 h-3.5 text-amber-700 shrink-0" />
              Pickup before {donation.deadline.replace('Today ', '')}
            </span>
            <span className="text-[11px] text-gray-400">
              {donation.city}
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onSelect(donation)}
              className="flex-1 px-4 py-2 text-xs font-medium rounded-full text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-colors"
            >
              View Details
            </button>
            {isAvailable ? (
              <button
                type="button"
                onClick={() => onClaim(donation.id)}
                className="px-4 py-2 text-xs font-medium rounded-full text-white bg-[#056b4e] hover:bg-[#04563e] active:scale-[0.98] transition-all flex items-center justify-center gap-1 shadow-xs"
              >
                <span>Claim</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <span className="px-3 py-1.5 text-xs font-medium rounded-full text-gray-500 bg-gray-100 border border-gray-200">
                {donation.status}
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
