import React from 'react';
import { Search, X } from 'lucide-react';
import { FOOD_CATEGORIES } from '../../data/mockData';

export default function FilterBar({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedDistance,
  onDistanceChange,
  selectedStatus,
  onStatusChange,
  sortBy,
  onSortChange,
  onReset,
  totalResults,
}) {
  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedCategory !== 'All' ||
    selectedDistance !== 'all' ||
    selectedStatus !== 'all' ||
    sortBy !== 'deadline';

  return (
    <div className="bg-white rounded-2xl border border-gray-200/90 shadow-2xs p-5 space-y-4">
      {/* Top search & Sort row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by food name, donor, cuisine, or city (e.g. Biryani, Bakery, Guwahati)..."
            className="w-full pl-11 pr-4 py-2.5 text-sm bg-gray-50/70 border border-gray-200 rounded-full text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#056b4e]/20 focus:border-[#056b4e] transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort & Distance Selects */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-gray-500 whitespace-nowrap">
            <span className="hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="px-3 py-2 text-xs font-medium bg-white border border-gray-200 rounded-full text-gray-800 focus:outline-none focus:border-[#056b4e] cursor-pointer"
            >
              <option value="deadline">Deadline (Urgent first)</option>
              <option value="distance">Distance (Closest first)</option>
              <option value="quantity">Meals Count (Largest)</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-gray-500 whitespace-nowrap">
            <span className="hidden sm:inline">Radius:</span>
            <select
              value={selectedDistance}
              onChange={(e) => onDistanceChange(e.target.value)}
              className="px-3 py-2 text-xs font-medium bg-white border border-gray-200 rounded-full text-gray-800 focus:outline-none focus:border-[#056b4e] cursor-pointer"
            >
              <option value="all">Any distance</option>
              <option value="2">Within 2 km</option>
              <option value="5">Within 5 km</option>
              <option value="10">Within 10 km</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Pills & Availability Filter */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-gray-100">
        <div className="flex flex-wrap items-center gap-1.5">
          {FOOD_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => onCategoryChange(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-[#056b4e] text-white shadow-2xs'
                    : 'bg-gray-100/80 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Status filter & Reset */}
        <div className="flex items-center gap-2 text-xs">
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="px-3 py-1.5 text-xs font-medium bg-gray-50 border border-gray-200 rounded-full text-gray-700 focus:outline-none focus:border-[#056b4e] cursor-pointer"
          >
            <option value="all">All statuses</option>
            <option value="Available">Available only</option>
            <option value="Accepted">Accepted / In Transit</option>
            <option value="Delivered">Delivered</option>
          </select>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              Reset
            </button>
          )}

          <span className="text-xs text-gray-500 font-medium pl-1">
            {totalResults} {totalResults === 1 ? 'item' : 'items'}
          </span>
        </div>
      </div>
    </div>
  );
}
