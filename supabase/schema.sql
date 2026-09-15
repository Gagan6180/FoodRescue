-- ==============================================================================
-- FOODRESCUE SUPABASE DATABASE SCHEMA & INITIAL SEED
-- ==============================================================================
-- Run this entire script in your Supabase SQL Editor:
-- Supabase Dashboard -> SQL Editor -> New query -> Paste and click "Run"
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. CREATE TABLE: STATS (Global Platform Impact)
CREATE TABLE IF NOT EXISTS public.stats (
    id INT PRIMARY KEY DEFAULT 1,
    meals_rescued INT NOT NULL DEFAULT 1248,
    active_donors INT NOT NULL DEFAULT 47,
    ngo_partners INT NOT NULL DEFAULT 23,
    successful_pickups INT NOT NULL DEFAULT 186,
    diverted_kg NUMERIC(10, 2) NOT NULL DEFAULT 520,
    updated_at TIMESTAMPTZ DEFAULT now(),
    CONSTRAINT single_row_stats CHECK (id = 1)
);

-- 3. CREATE TABLE: ORGANIZATIONS (NGO & Community Shelter Partners)
CREATE TABLE IF NOT EXISTS public.organizations (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    location TEXT NOT NULL,
    city TEXT NOT NULL DEFAULT 'Guwahati',
    contact_person TEXT,
    phone TEXT,
    meals_received INT NOT NULL DEFAULT 0,
    active_needs TEXT,
    status TEXT NOT NULL DEFAULT 'Active Partner',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. CREATE TABLE: VOLUNTEERS (Volunteer Directory)
CREATE TABLE IF NOT EXISTS public.volunteers (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    pickups INT NOT NULL DEFAULT 0,
    meals_rescued INT NOT NULL DEFAULT 0,
    vehicle TEXT,
    status TEXT NOT NULL DEFAULT 'Active',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. CREATE TABLE: DONATIONS (Food Surplus Listings)
CREATE TABLE IF NOT EXISTS public.donations (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    quantity TEXT NOT NULL,
    meals_count INT NOT NULL DEFAULT 1,
    kg_weight NUMERIC(10, 2) NOT NULL DEFAULT 0.5,
    donor TEXT NOT NULL,
    donor_type TEXT NOT NULL DEFAULT 'Restaurant',
    location TEXT NOT NULL,
    city TEXT NOT NULL DEFAULT 'Guwahati',
    distance_km NUMERIC(5, 2) DEFAULT 2.0,
    prep_time TEXT DEFAULT 'Today recent',
    deadline TEXT DEFAULT 'Today 11:00 PM',
    deadline_timestamp BIGINT,
    contact_number TEXT DEFAULT '+91 98640 00000',
    status TEXT NOT NULL DEFAULT 'Available',
    tags TEXT[] DEFAULT ARRAY['Verified Safe', 'Surplus Fresh']::TEXT[],
    description TEXT,
    image_url TEXT,
    claimed_by TEXT,
    claimed_at TEXT,
    collected_at TEXT,
    delivered_at TEXT,
    destination_org TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. ROW LEVEL SECURITY (RLS) POLICIES
-- Enable RLS
ALTER TABLE public.stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.volunteers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if re-running
DROP POLICY IF EXISTS "Public read stats" ON public.stats;
DROP POLICY IF EXISTS "Public update stats" ON public.stats;
DROP POLICY IF EXISTS "Public insert stats" ON public.stats;

DROP POLICY IF EXISTS "Public read organizations" ON public.organizations;
DROP POLICY IF EXISTS "Public insert organizations" ON public.organizations;
DROP POLICY IF EXISTS "Public update organizations" ON public.organizations;

DROP POLICY IF EXISTS "Public read volunteers" ON public.volunteers;
DROP POLICY IF EXISTS "Public insert volunteers" ON public.volunteers;
DROP POLICY IF EXISTS "Public update volunteers" ON public.volunteers;

DROP POLICY IF EXISTS "Public read donations" ON public.donations;
DROP POLICY IF EXISTS "Public insert donations" ON public.donations;
DROP POLICY IF EXISTS "Public update donations" ON public.donations;
DROP POLICY IF EXISTS "Public delete donations" ON public.donations;

-- Define Policies for Anonymous Access (FoodRescue demo & volunteer network)
CREATE POLICY "Public read stats" ON public.stats FOR SELECT USING (true);
CREATE POLICY "Public update stats" ON public.stats FOR UPDATE USING (true);
CREATE POLICY "Public insert stats" ON public.stats FOR INSERT WITH CHECK (true);

CREATE POLICY "Public read organizations" ON public.organizations FOR SELECT USING (true);
CREATE POLICY "Public insert organizations" ON public.organizations FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update organizations" ON public.organizations FOR UPDATE USING (true);

CREATE POLICY "Public read volunteers" ON public.volunteers FOR SELECT USING (true);
CREATE POLICY "Public insert volunteers" ON public.volunteers FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update volunteers" ON public.volunteers FOR UPDATE USING (true);

CREATE POLICY "Public read donations" ON public.donations FOR SELECT USING (true);
CREATE POLICY "Public insert donations" ON public.donations FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update donations" ON public.donations FOR UPDATE USING (true);
CREATE POLICY "Public delete donations" ON public.donations FOR DELETE USING (true);

-- 7. ENABLE SUPABASE REALTIME
DO $$
BEGIN
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.donations;
  EXCEPTION WHEN duplicate_object THEN
    NULL;
  END;
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.stats;
  EXCEPTION WHEN duplicate_object THEN
    NULL;
  END;
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.organizations;
  EXCEPTION WHEN duplicate_object THEN
    NULL;
  END;
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.volunteers;
  EXCEPTION WHEN duplicate_object THEN
    NULL;
  END;
END $$;

-- 8. SEED INITIAL DATA
-- Initial stats
INSERT INTO public.stats (id, meals_rescued, active_donors, ngo_partners, successful_pickups, diverted_kg)
VALUES (1, 1248, 47, 23, 186, 520)
ON CONFLICT (id) DO UPDATE SET
  meals_rescued = EXCLUDED.meals_rescued,
  active_donors = EXCLUDED.active_donors,
  ngo_partners = EXCLUDED.ngo_partners,
  successful_pickups = EXCLUDED.successful_pickups,
  diverted_kg = EXCLUDED.diverted_kg;

-- Initial organizations
INSERT INTO public.organizations (id, name, type, location, city, contact_person, phone, meals_received, active_needs, status)
VALUES
  ('org-1', 'Helping Hands Foundation', 'Child Shelter & Community Care', 'Uzan Bazar, Guwahati', 'Guwahati', 'Dr. Ananya Sarma', '+91 98640 11223', 420, 'Dinner meals for 45 children (daily by 7:30 PM)', 'Active Partner'),
  ('org-2', 'Community Kitchen', 'Free Night Meal Distribution', 'Paltan Bazar Railway Colony, Guwahati', 'Guwahati', 'Biren Deka', '+91 94350 33445', 610, 'Rice, dal, cooked vegetables, packaged bread', 'Active Partner'),
  ('org-3', 'Nagaon Seva Sangha', 'Senior Citizens Home', 'Haibargaon, Nagaon', 'Nagaon', 'Manashi Bora', '+91 97060 55667', 180, 'Soft cooked food, fruits, milk & dairy', 'Active Partner'),
  ('org-4', 'Delhi Urban Food Relief', 'Shelter Network', 'Pahar Ganj, New Delhi', 'Delhi', 'Vikram Malhotra', '+91 98110 77889', 890, 'Bulk cooked catering surplus', 'Active Partner')
ON CONFLICT (id) DO NOTHING;

-- Initial volunteers
INSERT INTO public.volunteers (id, name, location, pickups, meals_rescued, vehicle, status)
VALUES
  ('vol-1', 'Arjun Barman', 'Guwahati', 18, 124, 'Two-wheeler with insulated crate', 'Active'),
  ('vol-2', 'Rahul Sharma', 'Delhi', 12, 86, 'Car with cargo space', 'Active'),
  ('vol-3', 'Pooja Das', 'Guwahati', 31, 210, 'Community Van', 'Active'),
  ('vol-4', 'Meera Nair', 'Bengaluru', 9, 72, 'Two-wheeler', 'Available')
ON CONFLICT (id) DO NOTHING;

-- Initial donations
INSERT INTO public.donations (
  id, title, category, quantity, meals_count, kg_weight, donor, donor_type, location, city, distance_km,
  prep_time, deadline, deadline_timestamp, contact_number, status, tags, description, image_url,
  claimed_by, claimed_at, collected_at, delivered_at, destination_org
)
VALUES
  (
    'FR-1001', 'Vegetable Pulao & Dal Tadka', 'Cooked Meals', '30 meals', 30, 14.0,
    'Green Leaf Restaurant', 'Restaurant', 'GS Road, Christian Basti, Guwahati', 'Guwahati', 1.8,
    'Today 6:30 PM', 'Today 10:30 PM', extract(epoch from now() + interval '3 hours') * 1000,
    '+91 98640 21458', 'Available', ARRAY['Vegetarian', 'Hot Packaged', 'Ready to Eat'],
    'Freshly prepared wholesome vegetable pulao made with basmati rice, peas, carrots, and yellow dal tadka from dinner buffet surplus. Packed hygienically in food-grade foil containers.',
    'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
    null, null, null, null, null
  ),
  (
    'FR-1002', 'Fresh Club Sandwiches & Veg Wraps', 'Bakery & Breads', '24 meals', 24, 8.0,
    'City Cafe & Bakery', 'Cafe', 'Uzan Bazar, Riverside Road, Guwahati', 'Guwahati', 2.4,
    'Today 4:00 PM', 'Today 11:45 PM', extract(epoch from now() + interval '4 hours') * 1000,
    '+91 94350 88219', 'Available', ARRAY['Vegetarian', 'Individually Boxed', 'Refrigerated'],
    'Assorted cucumber-tomato grilled sandwiches and spiced paneer rolls packed individually. Prepared for an afternoon symposium, perfectly chilled and crisp.',
    'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80',
    null, null, null, null, null
  ),
  (
    'FR-1003', 'College Event Dinner Buffet Trays', 'Cooked Meals', '50 meals', 50, 22.0,
    'ABC College Canteen', 'College Canteen', 'Jalukbari Campus, Guwahati', 'Guwahati', 3.1,
    'Today 5:30 PM', 'Today 9:30 PM', extract(epoch from now() + interval '2 hours') * 1000,
    '+91 98540 19022', 'Available', ARRAY['Mixed Veg', 'Roti & Rice', 'High Volume'],
    'Surplus untouched food from annual inter-college conference dinner: mixed seasonal vegetable curry, yellow lentil soup, and 100 freshly made whole wheat rotis.',
    'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80',
    null, null, null, null, null
  ),
  (
    'FR-1004', 'Artisan Multigrain Breads & Buns', 'Bakery & Breads', '18 items (~15 meals)', 15, 7.0,
    'Sunrise Bakery', 'Bakery', 'Haibargaon Main Road, Nagaon', 'Nagaon', 4.2,
    'Today 11:00 AM', 'Tomorrow 9:00 AM', extract(epoch from now() + interval '10 hours') * 1000,
    '+91 97060 44102', 'Available', ARRAY['Breads', 'Room Temp', 'Dry Goods'],
    'Whole wheat loaves, milk dinner rolls, and savory potato puff pastries baked this morning. Sealed in clean food-safe brown paper packs.',
    'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    null, null, null, null, null
  ),
  (
    'FR-1005', 'Farm Harvest Tomatoes, Spinach & Greens', 'Groceries & Produce', '15 kg (~30 portions)', 30, 15.0,
    'Fresh Bites Organics', 'Store / Farm', 'Beltola Tiniali, Guwahati', 'Guwahati', 3.8,
    'Harvested Morning', 'Tomorrow 2:00 PM', extract(epoch from now() + interval '13 hours') * 1000,
    '+91 99540 77312', 'Available', ARRAY['Raw Produce', 'Organic', 'Crates'],
    'Unsold crates of ripe local tomatoes, fresh organic palak (spinach), and bottle gourds. Unblemished, excellent for community cooking.',
    'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=800&q=80',
    null, null, null, null, null
  ),
  (
    'FR-1006', 'Paneer Butter Masala & Tandoori Rotis', 'Cooked Meals', '20 meals', 20, 9.0,
    'Green Leaf Restaurant', 'Restaurant', 'GS Road, Christian Basti, Guwahati', 'Guwahati', 1.8,
    'Today 7:00 PM', 'Today 11:30 PM', extract(epoch from now() + interval '3 hours') * 1000,
    '+91 98640 21458', 'Accepted', ARRAY['North Indian', 'Hot Meal', 'In Transit'],
    'Freshly cooked paneer butter gravy and 40 tandoori rotis. Sealed in thermal insulated catering pots ready for pickup.',
    'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80',
    'Arjun Barman', '15 mins ago', null, null, 'Community Kitchen (Paltan Bazar)'
  ),
  (
    'FR-1007', 'Fresh Toned Milk Pouches & Sweet Curd', 'Beverages & Dairy', '22 packs', 22, 11.0,
    'Sunrise Bakery & Dairy Depot', 'Bakery', 'Haibargaon, Nagaon', 'Nagaon', 4.5,
    'Today 8:00 AM', 'Tomorrow 11:00 AM', extract(epoch from now() + interval '12 hours') * 1000,
    '+91 97060 44102', 'Collected', ARRAY['Dairy', 'Chilled', 'Collected'],
    'Pasteurized 500ml milk pouches and sweetened dahi pots. Chilled and safely stowed in insulated cooler bags.',
    'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80',
    'Arjun Barman', '1 hour ago', '20 mins ago', null, 'Helping Hands Child Shelter'
  ),
  (
    'FR-1008', 'Wedding Feast Jeera Rice & Rajma', 'Cooked Meals', '50 meals', 50, 24.0,
    'Grand Harmony Banquet Hall', 'Event Organizer', 'Zoo Road, Guwahati', 'Guwahati', 3.5,
    'Yesterday 6:00 PM', 'Yesterday 10:00 PM', extract(epoch from now() - interval '24 hours') * 1000,
    '+91 98640 99881', 'Delivered', ARRAY['North Indian', 'Warm', 'Delivered'],
    'Successfully delivered 50 nutritious dinner plates to 42 shelter residents and night staff.',
    'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
    'Arjun Barman', 'Yesterday 7:30 PM', 'Yesterday 8:15 PM', 'Yesterday 9:10 PM', 'Helping Hands Shelter'
  )
ON CONFLICT (id) DO NOTHING;
