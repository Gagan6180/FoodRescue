import React, { useState } from 'react';
import { useFoodRescue } from '../context/FoodRescueContext';
import StatusBadge from '../components/common/StatusBadge';
import EmptyState from '../components/common/EmptyState';
import FoodDetailModal from '../components/food/FoodDetailModal';
import {
  CheckCircle2,
  Calendar,
  Building,
  HeartHandshake,
  Download,
  Share2,
  Award,
} from 'lucide-react';

export default function CompletedPickupsPage() {
  const { donations, volunteerProfile } = useFoodRescue();
  const [selectedDonation, setSelectedDonation] = useState(null);

  const completed = donations.filter((d) => d.status === 'Delivered');

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white rounded-2xl border border-neutral-200/90 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-100">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-forest-800">
              Verified Delivery Log
            </span>
            <h1 className="text-2xl font-bold text-neutral-900 tracking-tight mt-0.5">
              Completed Food Rescues
            </h1>
            <p className="text-xs text-neutral-500 mt-1">
              Historical record of surplus food successfully delivered to community partners.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-semibold px-3 py-1.5 rounded-lg bg-teal-50 text-teal-900 border border-teal-200">
              {completed.length} Delivered Rescues
            </span>
          </div>
        </div>

        {/* Rescues List */}
        <div className="pt-6 space-y-4">
          {completed.length > 0 ? (
            completed.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-xl border border-neutral-200/80 bg-sand-50/40 hover:bg-sand-50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center shrink-0 mt-1">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-neutral-900">
                        {item.id}
                      </span>
                      <StatusBadge status="Delivered" size="sm" />
                      <span className="text-[11px] text-neutral-400">
                        {item.deliveredAt || 'Recently'}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-neutral-900 mt-1">
                      {item.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-neutral-600 mt-1">
                      <span>Donor: <strong className="text-neutral-800">{item.donor}</strong></span>
                      <span>•</span>
                      <span>Delivered To: <strong className="text-forest-900">{item.destinationOrg || 'Community Kitchen'}</strong></span>
                      <span>•</span>
                      <span>Portions: <strong className="text-neutral-800">{item.mealsCount} meals ({item.kgWeight || 12} kg)</strong></span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end md:self-center">
                  <button
                    type="button"
                    onClick={() => setSelectedDonation(item)}
                    className="px-3.5 py-1.5 text-xs font-medium rounded-lg text-neutral-700 bg-white border border-neutral-300 hover:bg-neutral-50 shadow-2xs transition-colors"
                  >
                    View Receipt
                  </button>
                </div>
              </div>
            ))
          ) : (
            <EmptyState
              title="No deliveries logged yet"
              description="When you complete pickups and hand food over to community partners, they will appear here as verified entries."
            />
          )}
        </div>
      </div>

      <FoodDetailModal
        donation={selectedDonation}
        isOpen={!!selectedDonation}
        onClose={() => setSelectedDonation(null)}
        onClaim={() => {}}
      />
    </div>
  );
}
