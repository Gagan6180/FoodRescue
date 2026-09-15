import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Utensils,
  Truck,
  HeartHandshake,
  ShieldCheck,
  ChevronDown,
  ArrowRight,
  Clock,
  CheckCircle2,
  Building,
} from 'lucide-react';

export default function HowItWorksPage() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: 'What types of food can be donated on FoodRescue?',
      a: 'We accept cooked buffet and banquet surplus, untouched catering trays, bakery items, unblemished fresh produce, sealed dairy products, and packaged groceries. All cooked meals must have been prepared on the same day and stored at safe temperatures.',
    },
    {
      q: 'Who collects and delivers the surplus food?',
      a: 'Verified volunteer rescuers and partner NGO personnel who operate in your immediate neighborhood. Rescuers undergo a phone screening and are trained on food handling hygiene and insulated transit protocols.',
    },
    {
      q: 'Is there any fee or commission charged?',
      a: 'No. FoodRescue is completely free for donors, volunteers, and charitable recipient organizations. Our sole mission is redirecting edible food from waste streams to people in need.',
    },
    {
      q: 'What happens if no volunteer claims a pickup before the deadline?',
      a: 'Each listing has a hard safety deadline. If an item nears expiration without an accepted rescuer, priority notifications are broadcast to high-volume NGO partner coordinators.',
    },
    {
      q: 'How is food safety ensured legally and practically?',
      a: 'Donors must confirm our strict food safety declaration before posting. We follow the FSSAI Surplus Food Guidelines, ensuring temperature integrity, non-perished ingredients, and food-grade packaging.',
    },
  ];

  return (
    <div className="min-h-screen bg-sand-50/60 py-10 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-wider text-forest-800">
            Coordination Infrastructure
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight mt-1">
            How FoodRescue Works
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 mt-2">
            A rapid, friction-free loop that connects commercial surplus food with vetted local organizations before food quality degrades.
          </p>
        </div>

        {/* 3 Core Steps Detailed */}
        <div className="space-y-6 mb-16">
          {/* Step 1 */}
          <div className="bg-white rounded-xl border border-neutral-200/90 p-6 sm:p-8 flex flex-col md:flex-row gap-6 items-start shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-forest-100 text-forest-900 flex items-center justify-center font-bold text-lg shrink-0 font-mono">
              01
            </div>
            <div className="space-y-2 flex-1">
              <span className="text-xs font-semibold text-forest-800 uppercase tracking-wider">
                Step 1 • Food Donors
              </span>
              <h2 className="text-xl font-bold text-neutral-900">Post surplus food in 60 seconds</h2>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Restaurants, canteens, bakeries, or event organizers identify untouched surplus food after lunch or dinner service. Using a quick mobile form, the donor specifies portions, location, food category, and pickup deadline.
              </p>
              <div className="pt-2 flex flex-wrap gap-2 text-xs text-neutral-500">
                <span className="inline-flex items-center gap-1 bg-sand-50 px-2.5 py-1 rounded border border-neutral-200">
                  <Clock className="w-3 h-3 text-amber-700" /> Deadline countdown
                </span>
                <span className="inline-flex items-center gap-1 bg-sand-50 px-2.5 py-1 rounded border border-neutral-200">
                  <ShieldCheck className="w-3 h-3 text-emerald-700" /> Hygiene verification
                </span>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-xl border border-neutral-200/90 p-6 sm:p-8 flex flex-col md:flex-row gap-6 items-start shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-forest-100 text-forest-900 flex items-center justify-center font-bold text-lg shrink-0 font-mono">
              02
            </div>
            <div className="space-y-2 flex-1">
              <span className="text-xs font-semibold text-forest-800 uppercase tracking-wider">
                Step 2 • Local Rescuers & NGOs
              </span>
              <h2 className="text-xl font-bold text-neutral-900">Find and claim nearby surplus</h2>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Active volunteers, NGO distribution staff, and community organizers browse available food sorted by proximity. When a volunteer claims a batch, the status instantly turns to Accepted, locking the pickup so multiple rescuers don't collide.
              </p>
              <div className="pt-2 flex flex-wrap gap-2 text-xs text-neutral-500">
                <span className="inline-flex items-center gap-1 bg-sand-50 px-2.5 py-1 rounded border border-neutral-200">
                  <Truck className="w-3 h-3 text-forest-700" /> Radius-based discovery
                </span>
                <span className="inline-flex items-center gap-1 bg-sand-50 px-2.5 py-1 rounded border border-neutral-200">
                  <CheckCircle2 className="w-3 h-3 text-forest-700" /> Instant reservation lock
                </span>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-xl border border-neutral-200/90 p-6 sm:p-8 flex flex-col md:flex-row gap-6 items-start shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-forest-100 text-forest-900 flex items-center justify-center font-bold text-lg shrink-0 font-mono">
              03
            </div>
            <div className="space-y-2 flex-1">
              <span className="text-xs font-semibold text-forest-800 uppercase tracking-wider">
                Step 3 • Community Impact
              </span>
              <h2 className="text-xl font-bold text-neutral-900">Collect, deliver, and record impact</h2>
              <p className="text-sm text-neutral-600 leading-relaxed">
                The rescuer drives or rides to the donor, collects the food in clean insulated crates, and delivers it to child shelters, day laborer settlements, or elder care homes. Once delivered, both platform and rescuer metrics reflect the meals saved.
              </p>
              <div className="pt-2 flex flex-wrap gap-2 text-xs text-neutral-500">
                <span className="inline-flex items-center gap-1 bg-sand-50 px-2.5 py-1 rounded border border-neutral-200">
                  <HeartHandshake className="w-3 h-3 text-forest-700" /> Verified delivery confirmation
                </span>
                <span className="inline-flex items-center gap-1 bg-sand-50 px-2.5 py-1 rounded border border-neutral-200">
                  <Building className="w-3 h-3 text-forest-700" /> Transparent NGO logging
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Roles Breakdown */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-neutral-900">Who Participates?</h2>
            <p className="text-sm text-neutral-600 mt-1">
              Food rescue succeeds because of close collaboration between three community stakeholders.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 border border-neutral-200 text-left">
              <h3 className="font-bold text-neutral-900 mb-2">Food Donors</h3>
              <p className="text-xs text-neutral-600 leading-relaxed mb-3">
                Restaurants, caterers, college canteens, bakeries, and hostels with clean, edible food that would otherwise be discarded.
              </p>
              <ul className="text-xs text-neutral-500 space-y-1">
                <li>• Zero disposal waste</li>
                <li>• Verified community CSR</li>
                <li>• Direct environmental benefit</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 border border-neutral-200 text-left">
              <h3 className="font-bold text-neutral-900 mb-2">Volunteer Rescuers</h3>
              <p className="text-xs text-neutral-600 leading-relaxed mb-3">
                Everyday citizens, students, and riders who dedicate 45 minutes to transport food within their local radius.
              </p>
              <ul className="text-xs text-neutral-500 space-y-1">
                <li>• Flexible participation</li>
                <li>• Personal impact badges</li>
                <li>• Real-time coordination tools</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 border border-neutral-200 text-left">
              <h3 className="font-bold text-neutral-900 mb-2">Charitable NGOs</h3>
              <p className="text-xs text-neutral-600 leading-relaxed mb-3">
                Local shelter networks, orphanages, day-labor community kitchens that serve vulnerable populations daily.
              </p>
              <ul className="text-xs text-neutral-500 space-y-1">
                <li>• Predictable fresh food supply</li>
                <li>• Reduced procurement costs</li>
                <li>• Better meal nutrition</li>
              </ul>
            </div>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-neutral-900 mb-6">Frequently Asked Questions</h2>
          <div className="divide-y divide-neutral-100">
            {faqs.map((faq, idx) => (
              <div key={idx} className="py-4">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between text-left gap-4 font-semibold text-neutral-800 hover:text-forest-800 text-sm focus:outline-none"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-400 transition-transform duration-200 ${
                      openFaq === idx ? 'rotate-180 text-forest-800' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <p className="text-xs sm:text-sm text-neutral-600 mt-2.5 leading-relaxed animate-fade-in">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Action Footnote */}
        <div className="mt-12 text-center">
          <Link
            to="/donate"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-forest-800 text-white font-medium text-sm hover:bg-forest-900 transition-all shadow-xs"
          >
            <span>Have surplus food today? Post now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
