# 🍲 FoodRescue — Community Food Recovery Platform

> **Rescue food. Nourish communities.**  
> A community-driven web platform that connects restaurants, hotels, bakeries, hostels, canteens, and event organizers with surplus food to local volunteers and NGOs for swift, safe collection and delivery.

![FoodRescue Banner](https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1400&q=80)

---

## 🌟 Overview

Every day, commercial kitchens, caterers, and households prepare surplus wholesome food that goes uneaten. At the same time, community kitchens, shelters, and orphanages face meal shortages. **FoodRescue** solves the last-mile coordination gap:

1. **Donors Post Surplus:** Fast listing with portions, food temperature, packaging seals, and strict consumption deadlines.
2. **Volunteers Receive Alerts:** Verified rescuers claim missions based on transport mode and travel radius.
3. **Safe Rapid Transit:** Food is collected in insulated bags and delivered directly to vetted community partners in under 90 minutes.
4. **Transparent Impact:** Every kilogram saved, meal provided, and carbon emission diverted is recorded in real time.

---

## ✨ Key Features

### 1. 🖼️ Dynamic Full-Bleed Hero Section
- **Auto-Cycling Background Imagery:** Seamless 1-second crossfade transitions through 5 high-definition scenes of community care, fresh market produce, and active volunteers.
- **Editorial Typography:** High-contrast serif headlines (`Merriweather`) and standard sans-serif body copy (`Inter`) with vibrant brand accents (`#056b4e`, `#34d399`).
- **Centered Focus:** High-impact call-to-actions ("I have food to donate", "I want to volunteer") and live milestone statistics (`2.4M+ Meals Rescued`, `890+ Partners`, `156 Cities`).

### 2. 🪄 Floating Transparent Navigation
- **Adaptive Glassmorphism:** Floats completely transparent over the hero imagery at the top of the landing page, then transitions into a compact frosted glass bar (`backdrop-blur-md`) upon scrolling.
- **Interactive Micro-animations:** Rotating brand logo on hover, glowing icon halo, floating pill hover highlights on menu links, and an animated arrow sweep on the primary CTA button.
- **Live Database Status Badge:** Displays current Supabase connection health with a 1-click modal showing database configuration steps.

### 3. 🍱 Real-Time Surplus Food Listings (`/available-food`)
- Real-time catalog of active food donations across city hubs (Guwahati, Nagaon, Delhi NCR, Mumbai, Bengaluru, etc.).
- Filter by category: **Cooked Meals**, **Bakery**, **Fresh Produce**, **Dairy & Packaged**.
- Dietary flags: **Veg**, **Non-Veg**, **Vegan**.
- Urgency badges with countdown timers and portion calculators.
- Food detail modal with donor address, safety guidelines, and 1-click **Claim Pickup**.

### 4. 📦 Donor Food Posting (`/donate`)
- 60-second donation form for restaurants, banquets, and hostels.
- Portion estimation, perishable expiry countdowns, storage guidelines (Warm, Chilled, Ambient), and packaging compliance checkboxes.

### 5. 🪪 Volunteer Registration & Digital Rescuer Pass (`/register-volunteer`)
- 5-step onboarding covering contact details, city hubs, travel radius (`2km`–`15km+`), vehicle type (Two-wheeler, Car/Van, Bicycle, Pedestrian), and food safety pledges.
- Automatically generates a unique Rescuer ID (e.g., `FR-VOL-4821`).
- Generates an official **Digital Rescuer Pass** card with verified status and immediate entry into the rescuer dashboard.

### 6. 🛵 Rescuer Dashboard (`/dashboard`)
- Multi-step mission workflow: **Available** ➔ **Accepted** ➔ **Collected** ➔ **Delivered**.
- Active pickup tracker with donor address, phone numbers, and destination delivery details.
- Rescuer impact tracking: meals saved, kilograms diverted, and milestone badges earned.

### 7. 🛡️ Operations Admin Console (`/admin`)
- Operations monitoring for community managers:
  - System-wide food volume and active volunteer rosters.
  - Donation verification & status overrides.
  - Organization verification portal.
  - Demo data reset button for sandbox testing.

### 8. ⚡ Dual Storage Engine (Supabase + Local Fallback)
- **Supabase PostgreSQL:** Built-in integration using `@supabase/supabase-js` with real-time updates and Row Level Security (`supabase/schema.sql`).
- **Offline / Local Fallback:** Automatically falls back to persistent `localStorage` mock data if Supabase keys are not configured, ensuring zero setup friction.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | React 19 + Vite 8 |
| **Routing** | React Router v7 DOM |
| **Styling** | Tailwind CSS v4 (`@tailwindcss/vite`) |
| **Icons** | Lucide React |
| **Typography** | Merriweather (Headings) + Inter (Body) |
| **Database & Realtime** | Supabase (PostgreSQL) + LocalStorage Fallback |
| **State Management** | React Context API (`FoodRescueContext`) |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: Version `18.0.0` or higher
- **npm**: Version `9.0.0` or higher

### 1. Clone the Repository
```bash
git clone https://github.com/Gagan6180/FoodRescue.git
cd FoodRescue
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables (Optional for Supabase)
By default, the application runs out-of-the-box using local persistent storage. To connect your live Supabase database:

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Open `.env` and fill in your project credentials:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```
3. Run the schema SQL in your Supabase SQL Editor from [`supabase/schema.sql`](supabase/schema.sql).

### 4. Start Development Server
```bash
npm run dev
```
Open your browser at **`http://localhost:5173`**.

### 5. Build for Production
```bash
npm run build
```
The optimized production bundle will be generated in the `dist/` directory.

---

## 📁 Project Structure

```
FoodRescue/
├── public/                     # Static public assets
├── src/
│   ├── components/
│   │   ├── common/             # ToastContainer, SupabaseStatusBadge, Modal
│   │   ├── food/               # FoodCard, FoodDetailModal, FoodFilters
│   │   ├── home/               # HeroFlowVisual, StatsCounter
│   │   └── layout/             # Navbar, Footer, DashboardLayout
│   ├── context/
│   │   └── FoodRescueContext.jsx # Global state, actions, and persistence
│   ├── lib/
│   │   └── supabase.js         # Supabase client and sync helpers
│   ├── pages/
│   │   ├── HomePage.jsx        # Landing page with full-bleed hero
│   │   ├── AvailableFoodPage.jsx # Real-time food listings
│   │   ├── DonateFoodPage.jsx  # Food donation portal
│   │   ├── RegisterVolunteerPage.jsx # Rescuer registration & pass
│   │   ├── SignInPage.jsx      # Role-based login with 1-click demos
│   │   ├── VolunteerDashboard.jsx # Volunteer rescue console
│   │   ├── MyPickupsPage.jsx   # Active claimed pickup manager
│   │   ├── CompletedPickupsPage.jsx # Pickup history & logs
│   │   ├── VolunteerImpactPage.jsx  # Volunteer personal stats & badges
│   │   ├── AdminDashboardPage.jsx   # Central admin console
│   │   ├── HowItWorksPage.jsx  # Rescue loop explanation
│   │   └── ImpactPage.jsx      # Public environmental impact report
│   ├── App.jsx                 # Routes and layout coordinator
│   ├── index.css               # Tailwind CSS rules & font imports
│   └── main.jsx                # React root bootstrap
├── supabase/
│   └── schema.sql              # Supabase PostgreSQL tables, RLS & triggers
├── .env.example                # Sample environment configuration
├── package.json                # Project manifest & dependencies
└── vite.config.js              # Vite configuration
```

---

## 🧪 Demo Credentials (1-Click Logins)

The Sign In page (`/signin`) includes instant 1-click demo logins:
- 🚀 **Arjun Roy** (Community Volunteer)
- 🍲 **Green Leaf Caterers** (Food Donor)
- 🤝 **Snehalaya Shelter** (Partner NGO)
- ⚡ **Operations Admin** (Platform Admin)

---

## 📜 Food Safety Compliance

FoodRescue promotes strict adherence to community food hygiene standards:
- **Time Thresholds:** Cooked food must have an active consumption window of at least 3 hours.
- **Packaging:** Only sealed, food-grade containers or sanitized thermal crates are accepted.
- **Traceability:** Every donation is marked with a traceable mission code and verified volunteer pass.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
