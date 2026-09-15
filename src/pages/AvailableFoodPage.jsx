import React, { useState, useMemo } from 'react';
import { useFoodRescue } from '../context/FoodRescueContext';
import FoodCard from '../components/food/FoodCard';
import FoodDetailModal from '../components/food/FoodDetailModal';
import FilterBar from '../components/food/FilterBar';
import EmptyState from '../components/common/EmptyState';
import { Utensils, SlidersHorizontal, RefreshCw } from 'lucide-react';

export default function AvailableFoodPage() {
  const { donations, claimPickup } = useFoodRescue();
  const [selectedDonation, setSelectedDonation] = useState(null);

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDistance, setSelectedDistance] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('Available');
  const [sortBy, setSortBy] = useState('deadline');

  // Filter & sort logic
  const filteredDonations = useMemo(() => {
    return donations
      .filter((item) => {
        // Search
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          const matchTitle = item.title.toLowerCase().includes(query);
          const matchDonor = item.donor.toLowerCase().includes(query);
          const matchLoc = item.location.toLowerCase().includes(query);
          const matchCity = item.city.toLowerCase().includes(query);
          const matchCat = item.category.toLowerCase().includes(query);
          if (!matchTitle && !matchDonor && !matchLoc && !matchCity && !matchCat) {
            return false;
          }
        }

        // Category
        if (selectedCategory !== 'All' && item.category !== selectedCategory) {
          return false;
        }

        // Distance
        if (selectedDistance !== 'all') {
          const maxDist = parseFloat(selectedDistance);
          if (item.distanceKm > maxDist) return false;
        }

        // Status
        if (selectedStatus !== 'all') {
          if (selectedStatus === 'Available' && item.status !== 'Available') return false;
          if (selectedStatus === 'Accepted' && item.status !== 'Accepted' && item.status !== 'Collected') return false;
          if (selectedStatus === 'Delivered' && item.status !== 'Delivered') return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'deadline') {
          return (a.deadlineTimestamp || 0) - (b.deadlineTimestamp || 0);
        }
        if (sortBy === 'distance') {
          return a.distanceKm - b.distanceKm;
        }
        if (sortBy === 'quantity') {
          return (b.mealsCount || 0) - (a.mealsCount || 0);
        }
        return 0;
      });
  }, [donations, searchQuery, selectedCategory, selectedDistance, selectedStatus, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedDistance('all');
    setSelectedStatus('Available');
    setSortBy('deadline');
  };

  return (
    <div className="min-h-screen bg-sand-50/60 py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-forest-800">
            Surplus Food Directory
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight mt-1">
            Food available near you
          </h1>
          <p className="text-sm text-neutral-600 mt-1 max-w-2xl">
            Surplus food currently available for pickup. Verified by donors and ready for collection by volunteers and NGOs.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="mb-8">
          <FilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedDistance={selectedDistance}
            onDistanceChange={setSelectedDistance}
            selectedStatus={selectedStatus}
            onStatusChange={setSelectedStatus}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onReset={handleResetFilters}
            totalResults={filteredDonations.length}
          />
        </div>

        {/* Listings Grid */}
        {filteredDonations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDonations.map((item) => (
              <FoodCard
                key={item.id}
                donation={item}
                onSelect={(d) => setSelectedDonation(d)}
                onClaim={(id) => claimPickup(id)}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No surplus food matches your criteria"
            description="Try widening your search radius, selecting 'All statuses', or resetting your active filters."
            actionLabel="Reset all filters"
            onAction={handleResetFilters}
          />
        )}
      </div>

      {/* Details modal */}
      <FoodDetailModal
        donation={selectedDonation}
        isOpen={!!selectedDonation}
        onClose={() => setSelectedDonation(null)}
        onClaim={(id) => claimPickup(id)}
      />
    </div>
  );
}
