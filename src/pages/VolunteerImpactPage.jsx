import React from 'react';
import { useFoodRescue } from '../context/FoodRescueContext';
import {
  Award,
  HeartHandshake,
  CheckCircle2,
  PackageCheck,
  ShieldCheck,
  Building,
  TrendingUp,
  Leaf,
  Calendar,
} from 'lucide-react';

export default function VolunteerImpactPage() {
  const { volunteerProfile } = useFoodRescue();
  const { personalStats, achievements } = volunteerProfile;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-neutral-200/90 p-6 sm:p-7 shadow-xs">
        <span className="text-xs font-semibold uppercase tracking-wider text-forest-800">
          Personal Contribution Ledger
        </span>
        <h1 className="text-2xl font-bold text-neutral-900 tracking-tight mt-1">
          Your Rescuer Impact
        </h1>
        <p className="text-xs text-neutral-500 mt-1">
          Verified surplus food rescued and distributed by {volunteerProfile.name} in {volunteerProfile.location}.
        </p>
      </div>

      {/* 4 Core Volunteer Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-neutral-200/90 shadow-2xs">
          <span className="text-xs font-medium text-neutral-500">Meals Rescued</span>
          <div className="text-3xl font-bold font-mono text-forest-900 mt-1 tabular-nums">
            {personalStats.mealsRescued}
          </div>
          <span className="text-[11px] text-neutral-400 mt-1 block">
            Direct meals served
          </span>
        </div>

        <div className="bg-white rounded-xl p-5 border border-neutral-200/90 shadow-2xs">
          <span className="text-xs font-medium text-neutral-500">Pickups Completed</span>
          <div className="text-3xl font-bold font-mono text-forest-900 mt-1 tabular-nums">
            {personalStats.pickupsCompleted}
          </div>
          <span className="text-[11px] text-neutral-400 mt-1 block">
            100% on-time rate
          </span>
        </div>

        <div className="bg-white rounded-xl p-5 border border-neutral-200/90 shadow-2xs">
          <span className="text-xs font-medium text-neutral-500">Food Saved</span>
          <div className="text-3xl font-bold font-mono text-forest-900 mt-1 tabular-nums">
            {personalStats.kgSaved} kg
          </div>
          <span className="text-[11px] text-neutral-400 mt-1 block">
            Diverted from waste
          </span>
        </div>

        <div className="bg-white rounded-xl p-5 border border-neutral-200/90 shadow-2xs">
          <span className="text-xs font-medium text-neutral-500">NGOs Supported</span>
          <div className="text-3xl font-bold font-mono text-forest-900 mt-1 tabular-nums">
            {personalStats.orgsHelped}
          </div>
          <span className="text-[11px] text-neutral-400 mt-1 block">
            Community shelters
          </span>
        </div>
      </div>

      {/* Unlocked Achievements */}
      <div className="bg-white rounded-2xl border border-neutral-200/90 p-6 shadow-xs space-y-6">
        <div>
          <h2 className="text-lg font-bold text-neutral-900">
            Earned Achievements
          </h2>
          <p className="text-xs text-neutral-500 mt-0.5">
            Milestones unlocked through verified deliveries across Guwahati
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className="p-4 rounded-xl border border-neutral-200/80 bg-sand-50/50 flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-lg bg-forest-100 text-forest-800 flex items-center justify-center shrink-0 border border-forest-200">
                <Award className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-neutral-900">{ach.title}</h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-forest-800 border border-neutral-200">
                    Unlocked
                  </span>
                </div>
                <p className="text-xs text-neutral-600 mt-1 leading-relaxed">{ach.desc}</p>
                <span className="text-[10px] text-neutral-400 mt-2 block">
                  Earned {ach.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Verified Volunteer Certificate Card */}
      <div className="bg-sand-100/70 rounded-2xl border border-neutral-300/80 p-6 sm:p-7 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-forest-800 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-forest-700" />
              Official Recognition
            </span>
            <h3 className="text-lg font-bold text-neutral-900">
              Community Food Rescue Partner Certificate
            </h3>
            <p className="text-xs text-neutral-600 max-w-xl leading-relaxed">
              Certified for contributing over 100+ meals to community distribution kitchens in compliance with local food safety hygiene standards.
            </p>
          </div>
          <div className="shrink-0 text-right">
            <span className="text-xs font-mono font-medium text-neutral-500 block">
              Active Since Oct 2025
            </span>
            <span className="inline-block mt-1 text-xs font-semibold text-forest-900 bg-white px-3 py-1.5 rounded-lg border border-neutral-200">
              ID: FR-VOL-7749
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
