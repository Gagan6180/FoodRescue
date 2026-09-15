import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

// Check if valid credentials are provided
export const isSupabaseConfigured = () => {
  return Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl.startsWith('https://') &&
    supabaseUrl.includes('.supabase.co') &&
    supabaseAnonKey.length > 20 &&
    !supabaseUrl.includes('your-project-ref')
  );
};

// Initialize client if configured, otherwise null
export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Data transformation adapters between Postgres snake_case and Frontend camelCase
 */

export const mapDonationFromDb = (row) => ({
  id: row.id,
  title: row.title,
  category: row.category,
  quantity: row.quantity,
  mealsCount: Number(row.meals_count ?? 0),
  kgWeight: Number(row.kg_weight ?? 0),
  donor: row.donor,
  donorType: row.donor_type,
  location: row.location,
  city: row.city,
  distanceKm: Number(row.distance_km ?? 0),
  prepTime: row.prep_time,
  deadline: row.deadline,
  deadlineTimestamp: row.deadline_timestamp ? Number(row.deadline_timestamp) : null,
  contactNumber: row.contact_number,
  status: row.status,
  tags: Array.isArray(row.tags) ? row.tags : [],
  description: row.description,
  imageUrl: row.image_url,
  claimedBy: row.claimed_by,
  claimedAt: row.claimed_at,
  collectedAt: row.collected_at,
  deliveredAt: row.delivered_at,
  destinationOrg: row.destination_org,
  createdAt: row.created_at,
});

export const mapDonationToDb = (item) => ({
  id: item.id,
  title: item.title,
  category: item.category,
  quantity: item.quantity,
  meals_count: Number(item.mealsCount || 0),
  kg_weight: Number(item.kgWeight || 0),
  donor: item.donor,
  donor_type: item.donorType || 'Restaurant',
  location: item.location,
  city: item.city || 'Guwahati',
  distance_km: Number(item.distanceKm || 1.5),
  prep_time: item.prepTime || 'Today recent',
  deadline: item.deadline || 'Today 11:00 PM',
  deadline_timestamp: item.deadlineTimestamp ? Number(item.deadlineTimestamp) : null,
  contact_number: item.contactNumber || '+91 98640 00000',
  status: item.status || 'Available',
  tags: Array.isArray(item.tags) ? item.tags : ['Verified Safe'],
  description: item.description || '',
  image_url: item.imageUrl || '',
  claimed_by: item.claimedBy || null,
  claimed_at: item.claimedAt || null,
  collected_at: item.collectedAt || null,
  delivered_at: item.deliveredAt || null,
  destination_org: item.destinationOrg || null,
});

export const mapStatsFromDb = (row) => ({
  mealsRescued: Number(row.meals_rescued ?? 0),
  activeDonors: Number(row.active_donors ?? 0),
  ngoPartners: Number(row.ngo_partners ?? 0),
  successfulPickups: Number(row.successful_pickups ?? 0),
  divertedKg: Number(row.diverted_kg ?? 0),
});

export const mapStatsToDb = (stats) => ({
  id: 1,
  meals_rescued: Number(stats.mealsRescued ?? 0),
  active_donors: Number(stats.activeDonors ?? 0),
  ngo_partners: Number(stats.ngoPartners ?? 0),
  successful_pickups: Number(stats.successfulPickups ?? 0),
  diverted_kg: Number(stats.divertedKg ?? 0),
  updated_at: new Date().toISOString(),
});

export const mapOrganizationFromDb = (row) => ({
  id: row.id,
  name: row.name,
  type: row.type,
  location: row.location,
  city: row.city,
  contactPerson: row.contact_person,
  phone: row.phone,
  mealsReceived: Number(row.meals_received ?? 0),
  activeNeeds: row.active_needs,
  status: row.status,
});

export const mapVolunteerFromDb = (row) => ({
  id: row.id,
  name: row.name,
  location: row.location,
  pickups: Number(row.pickups ?? 0),
  mealsRescued: Number(row.meals_rescued ?? 0),
  vehicle: row.vehicle,
  status: row.status,
});
