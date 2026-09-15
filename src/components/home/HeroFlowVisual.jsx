import React, { useState, useEffect } from 'react';
import { Utensils, HeartHandshake, Truck, Users } from 'lucide-react';

export default function HeroFlowVisual() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 'surplus',
      label: 'Surplus Food',
      sub: 'Restaurants & Canteens',
      icon: Utensils,
      desc: 'Safe surplus food prepared and posted with a pickup deadline in under 60 seconds.',
    },
    {
      id: 'platform',
      label: 'FoodRescue Platform',
      sub: 'Real-time Matching',
      icon: HeartHandshake,
      desc: 'Instant alert broadcasted to nearby verified volunteers and community kitchens.',
    },
    {
      id: 'volunteer',
      label: 'Volunteer Rescuer',
      sub: 'Swift Collection',
      icon: Truck,
      desc: 'Local volunteer claims food, verifies condition, and collects with insulated crate.',
    },
    {
      id: 'community',
      label: 'Community Shelters',
      sub: 'Direct Distribution',
      icon: Users,
      desc: 'Delivered fresh and warm to night shelters, day laborers, and care homes.',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [steps.length]);

  return (
    <div className="w-full bg-white rounded-2xl border border-gray-200/90 shadow-sm p-6 sm:p-8">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
        <div>
          <span className="text-[11px] font-semibold tracking-wider uppercase text-[#056b4e] bg-[#e8f7f0] px-3 py-1 rounded-full">
            How The Rescue Loop Works
          </span>
          <h3 className="font-serif text-lg sm:text-xl font-bold text-gray-900 mt-1.5">
            From Surplus to Community in Under 90 Minutes
          </h3>
        </div>
        <div className="flex items-center gap-1.5">
          {steps.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStep(idx)}
              aria-label={`Show step ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeStep === idx ? 'w-8 bg-[#056b4e]' : 'w-2 bg-gray-200 hover:bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* 4 Pipeline Steps */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isActive = activeStep === idx;

          return (
            <div
              key={step.id}
              onClick={() => setActiveStep(idx)}
              className={`relative cursor-pointer rounded-xl p-4 sm:p-5 transition-all duration-200 border text-left flex flex-col justify-between ${
                isActive
                  ? 'bg-[#f0faf5] border-[#056b4e] shadow-xs'
                  : 'bg-white border-gray-200 hover:bg-gray-50/70'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                      isActive
                        ? 'bg-[#056b4e] text-white'
                        : 'bg-[#e8f7f0] text-[#056b4e]'
                    }`}
                  >
                    <Icon className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <span className="text-xs font-mono font-bold text-gray-400">
                    0{idx + 1}
                  </span>
                </div>

                <div className="text-sm font-bold text-gray-900 leading-tight">
                  {step.label}
                </div>
                <div className="text-xs text-[#056b4e] font-medium mt-0.5">
                  {step.sub}
                </div>
              </div>

              <p className="text-xs text-gray-600 mt-3 leading-relaxed">
                {step.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
