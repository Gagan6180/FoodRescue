import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  INITIAL_DONATIONS,
  INITIAL_STATS,
  INITIAL_VOLUNTEER_PROFILE,
  MOCK_ORGANIZATIONS,
  MOCK_VOLUNTEERS,
} from '../data/mockData';
import {
  supabase,
  isSupabaseConfigured,
  mapDonationFromDb,
  mapDonationToDb,
  mapStatsFromDb,
  mapStatsToDb,
  mapOrganizationFromDb,
  mapVolunteerFromDb,
} from '../lib/supabase';

const FoodRescueContext = createContext(null);

const STORAGE_KEYS = {
  DONATIONS: 'foodrescue_donations_v1',
  STATS: 'foodrescue_stats_v1',
  VOLUNTEER: 'foodrescue_volunteer_v1',
  ORGANIZATIONS: 'foodrescue_orgs_v1',
  VOLUNTEER_LIST: 'foodrescue_volunteers_list_v1',
};

export function FoodRescueProvider({ children }) {
  // Database connection states
  const [isLiveDb, setIsLiveDb] = useState(() => isSupabaseConfigured());
  const [dbLoading, setDbLoading] = useState(false);

  // 1. Donations state
  const [donations, setDonations] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.DONATIONS);
      return saved ? JSON.parse(saved) : INITIAL_DONATIONS;
    } catch {
      return INITIAL_DONATIONS;
    }
  });

  // 2. Global stats
  const [stats, setStats] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.STATS);
      return saved ? JSON.parse(saved) : INITIAL_STATS;
    } catch {
      return INITIAL_STATS;
    }
  });

  // 3. Volunteer profile (Arjun Barman)
  const [volunteerProfile, setVolunteerProfile] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.VOLUNTEER);
      return saved ? JSON.parse(saved) : INITIAL_VOLUNTEER_PROFILE;
    } catch {
      return INITIAL_VOLUNTEER_PROFILE;
    }
  });

  // 4. Partner Organizations
  const [organizations, setOrganizations] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORGANIZATIONS);
      return saved ? JSON.parse(saved) : MOCK_ORGANIZATIONS;
    } catch {
      return MOCK_ORGANIZATIONS;
    }
  });

  // 5. Volunteers Directory (Admin view)
  const [volunteers, setVolunteers] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.VOLUNTEER_LIST);
      return saved ? JSON.parse(saved) : MOCK_VOLUNTEERS;
    } catch {
      return MOCK_VOLUNTEERS;
    }
  });

  // 6. Active Toast Notifications
  const [toasts, setToasts] = useState([]);

  // Toast Helpers
  const addToast = (message, type = 'success') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Local storage persistence sync (fallback and caching)
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DONATIONS, JSON.stringify(donations));
  }, [donations]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.VOLUNTEER, JSON.stringify(volunteerProfile));
  }, [volunteerProfile]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORGANIZATIONS, JSON.stringify(organizations));
  }, [organizations]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.VOLUNTEER_LIST, JSON.stringify(volunteers));
  }, [volunteers]);

  // Fetch initial data from Supabase if configured
  const refreshData = useCallback(async () => {
    if (!isSupabaseConfigured() || !supabase) {
      setIsLiveDb(false);
      return;
    }

    try {
      setDbLoading(true);

      // 1. Fetch Donations
      const { data: donationsData, error: donErr } = await supabase
        .from('donations')
        .select('*')
        .order('created_at', { ascending: false });

      if (donErr) {
        throw donErr;
      }

      if (donationsData && donationsData.length > 0) {
        setDonations(donationsData.map(mapDonationFromDb));
      }

      // 2. Fetch Stats
      const { data: statsData, error: statsErr } = await supabase
        .from('stats')
        .select('*')
        .eq('id', 1)
        .maybeSingle();

      if (!statsErr && statsData) {
        setStats(mapStatsFromDb(statsData));
      }

      // 3. Fetch Organizations
      const { data: orgsData, error: orgErr } = await supabase
        .from('organizations')
        .select('*');

      if (!orgErr && orgsData && orgsData.length > 0) {
        setOrganizations(orgsData.map(mapOrganizationFromDb));
      }

      // 4. Fetch Volunteers
      const { data: volsData, error: volErr } = await supabase
        .from('volunteers')
        .select('*');

      if (!volErr && volsData && volsData.length > 0) {
        setVolunteers(volsData.map(mapVolunteerFromDb));
      }

      setIsLiveDb(true);
    } catch (err) {
      console.warn('Supabase fetch failed, continuing with local dataset:', err);
      setIsLiveDb(false);
    } finally {
      setDbLoading(false);
    }
  }, []);

  // Set up initial data fetch and Supabase Realtime listeners
  useEffect(() => {
    if (!isSupabaseConfigured() || !supabase) return;

    refreshData();

    // Subscribe to real-time changes on donations and stats
    const donationsChannel = supabase
      .channel('public-donations-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'donations' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const item = mapDonationFromDb(payload.new);
            setDonations((prev) => [item, ...prev.filter((d) => d.id !== item.id)]);
          } else if (payload.eventType === 'UPDATE') {
            const item = mapDonationFromDb(payload.new);
            setDonations((prev) => prev.map((d) => (d.id === item.id ? item : d)));
          } else if (payload.eventType === 'DELETE') {
            setDonations((prev) => prev.filter((d) => d.id !== payload.old.id));
          }
        }
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'stats' },
        (payload) => {
          setStats(mapStatsFromDb(payload.new));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(donationsChannel);
    };
  }, [refreshData]);

  // Action: Add new surplus donation
  const addDonation = async (newDonation) => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const donationId = `FR-${randomSuffix}`;
    const weight = Number(newDonation.mealsCount || 10) * 0.45;

    const createdItem = {
      id: donationId,
      title: newDonation.title || 'Surplus Meal Pack',
      category: newDonation.category || 'Cooked Meals',
      quantity: newDonation.quantity || `${newDonation.mealsCount || 20} meals`,
      mealsCount: Number(newDonation.mealsCount) || 20,
      kgWeight: Math.round(weight * 10) / 10,
      donor: newDonation.donor || 'Community Food Donor',
      donorType: newDonation.donorType || 'Restaurant',
      location: newDonation.location || 'GS Road, Guwahati',
      city: newDonation.city || 'Guwahati',
      distanceKm: Number((Math.random() * 3 + 1).toFixed(1)),
      prepTime: newDonation.prepTime || 'Today recent',
      deadline: newDonation.deadline || 'Today 11:00 PM',
      deadlineTimestamp: Date.now() + 1000 * 60 * 180,
      contactNumber: newDonation.contactNumber || '+91 98640 00000',
      status: 'Available',
      tags: newDonation.tags || ['Verified Safe', 'Surplus Fresh'],
      description: newDonation.description || 'Nutritious, carefully packaged surplus food ready for prompt pickup.',
      imageUrl: newDonation.imageUrl || 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
      claimedBy: null,
      claimedAt: null,
      collectedAt: null,
      deliveredAt: null,
      destinationOrg: null,
    };

    // Optimistic UI state update
    setDonations((prev) => [createdItem, ...prev]);
    setStats((prev) => ({
      ...prev,
      activeDonors: prev.activeDonors + 1,
    }));

    // Async persist to Supabase if connected
    if (supabase && isLiveDb) {
      try {
        const { error } = await supabase
          .from('donations')
          .insert(mapDonationToDb(createdItem));

        if (error) {
          console.error('Supabase donation insert error:', error);
        } else {
          // Increment active donors in Supabase stats
          await supabase
            .from('stats')
            .update({ active_donors: stats.activeDonors + 1 })
            .eq('id', 1);
        }
      } catch (err) {
        console.error('Error inserting donation into Supabase:', err);
      }
    }

    addToast(`Donation ${donationId} created! It is now live on the Available Food board.`);
    return createdItem;
  };

  // Action: Volunteer claims pickup
  const claimPickup = async (donationId) => {
    const item = donations.find((d) => d.id === donationId);
    if (!item) return;

    const claimedAt = 'Just now';
    const destinationOrg = 'Community Kitchen (Paltan Bazar)';

    setDonations((prev) =>
      prev.map((d) =>
        d.id === donationId
          ? {
              ...d,
              status: 'Accepted',
              claimedBy: volunteerProfile.name,
              claimedAt,
              destinationOrg,
            }
          : d
      )
    );

    if (supabase && isLiveDb) {
      try {
        const { error } = await supabase
          .from('donations')
          .update({
            status: 'Accepted',
            claimed_by: volunteerProfile.name,
            claimed_at: claimedAt,
            destination_org: destinationOrg,
          })
          .eq('id', donationId);

        if (error) console.error('Supabase claim update error:', error);
      } catch (err) {
        console.error('Error updating claim on Supabase:', err);
      }
    }

    addToast(`Pickup ${donationId} accepted. You can view & progress it in My Pickups.`);
  };

  // Action: Mark as Collected
  const markAsCollected = async (donationId) => {
    const collectedAt = 'Just now';

    setDonations((prev) =>
      prev.map((d) =>
        d.id === donationId
          ? {
              ...d,
              status: 'Collected',
              collectedAt,
            }
          : d
      )
    );

    if (supabase && isLiveDb) {
      try {
        const { error } = await supabase
          .from('donations')
          .update({
            status: 'Collected',
            collected_at: collectedAt,
          })
          .eq('id', donationId);

        if (error) console.error('Supabase collect update error:', error);
      } catch (err) {
        console.error('Error updating collected status on Supabase:', err);
      }
    }

    addToast(`Food collected from donor. Head towards distribution point.`);
  };

  // Action: Mark as Delivered
  const markAsDelivered = async (donationId, destinationOrgName) => {
    const item = donations.find((d) => d.id === donationId);
    if (!item) return;

    const meals = item.mealsCount || 20;
    const kg = item.kgWeight || Math.round(meals * 0.45);
    const deliveredAt = 'Just now';
    const destinationOrg = destinationOrgName || item.destinationOrg || 'Community Kitchen';

    setDonations((prev) =>
      prev.map((d) =>
        d.id === donationId
          ? {
              ...d,
              status: 'Delivered',
              deliveredAt,
              destinationOrg,
            }
          : d
      )
    );

    // Update global platform metrics
    const newStats = {
      ...stats,
      successfulPickups: stats.successfulPickups + 1,
      mealsRescued: stats.mealsRescued + meals,
      divertedKg: stats.divertedKg + kg,
    };
    setStats(newStats);

    // Update volunteer's personal metrics
    setVolunteerProfile((prev) => ({
      ...prev,
      personalStats: {
        ...prev.personalStats,
        mealsRescued: prev.personalStats.mealsRescued + meals,
        pickupsCompleted: prev.personalStats.pickupsCompleted + 1,
        kgSaved: prev.personalStats.kgSaved + kg,
      },
    }));

    // Also update volunteer list entry
    setVolunteers((prev) =>
      prev.map((v) =>
        v.name === volunteerProfile.name
          ? {
              ...v,
              pickups: v.pickups + 1,
              mealsRescued: v.mealsRescued + meals,
            }
          : v
      )
    );

    // Sync to Supabase
    if (supabase && isLiveDb) {
      try {
        await supabase
          .from('donations')
          .update({
            status: 'Delivered',
            delivered_at: deliveredAt,
            destination_org: destinationOrg,
          })
          .eq('id', donationId);

        await supabase
          .from('stats')
          .update(mapStatsToDb(newStats))
          .eq('id', 1);
      } catch (err) {
        console.error('Error updating delivered status on Supabase:', err);
      }
    }

    addToast(`Delivered successfully! ${meals} meals safely provided. Impact recorded.`);
  };

  // Reset to original mock data
  const resetToDefaults = () => {
    localStorage.removeItem(STORAGE_KEYS.DONATIONS);
    localStorage.removeItem(STORAGE_KEYS.STATS);
    localStorage.removeItem(STORAGE_KEYS.VOLUNTEER);
    localStorage.removeItem(STORAGE_KEYS.ORGANIZATIONS);
    localStorage.removeItem(STORAGE_KEYS.VOLUNTEER_LIST);
    setDonations(INITIAL_DONATIONS);
    setStats(INITIAL_STATS);
    setVolunteerProfile(INITIAL_VOLUNTEER_PROFILE);
    setOrganizations(MOCK_ORGANIZATIONS);
    setVolunteers(MOCK_VOLUNTEERS);
    addToast('Demo dataset reset to initial values.', 'info');
  };

  return (
    <FoodRescueContext.Provider
      value={{
        donations,
        stats,
        volunteerProfile,
        organizations,
        volunteers,
        toasts,
        isLiveDb,
        isSupabaseConfigured: isSupabaseConfigured(),
        dbLoading,
        refreshData,
        addToast,
        removeToast,
        addDonation,
        claimPickup,
        markAsCollected,
        markAsDelivered,
        resetToDefaults,
      }}
    >
      {children}
    </FoodRescueContext.Provider>
  );
}

export function useFoodRescue() {
  const context = useContext(FoodRescueContext);
  if (!context) {
    throw new Error('useFoodRescue must be used within a FoodRescueProvider');
  }
  return context;
}
