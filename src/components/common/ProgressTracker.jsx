import React from 'react';
import { Check, Clock, PackageCheck, HeartHandshake } from 'lucide-react';

export default function ProgressTracker({ status = 'Accepted' }) {
  const steps = [
    { id: 'Accepted', label: 'Accepted', icon: Clock, desc: 'Assigned to rescuer' },
    { id: 'Collected', label: 'Collected', icon: PackageCheck, desc: 'Picked up from donor' },
    { id: 'Delivered', label: 'Delivered', icon: HeartHandshake, desc: 'Distributed to community' },
  ];

  const getStepState = (stepId) => {
    if (status === 'Delivered') return 'completed';
    if (status === 'Collected') {
      if (stepId === 'Accepted' || stepId === 'Collected') return 'completed';
      return 'pending';
    }
    if (status === 'Accepted') {
      if (stepId === 'Accepted') return 'current';
      return 'pending';
    }
    return 'pending';
  };

  return (
    <div className="w-full py-3">
      <div className="flex items-center justify-between relative">
        {/* Connecting line */}
        <div className="absolute top-1/2 left-6 right-6 -translate-y-1/2 h-0.5 bg-neutral-200 z-0" />
        
        {steps.map((step, idx) => {
          const state = getStepState(step.id);
          const isDone = state === 'completed';
          const isCurrent = state === 'current';
          const StepIcon = step.icon;

          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center group">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border text-xs font-semibold transition-all duration-200 ${
                  isDone
                    ? 'bg-forest-800 border-forest-800 text-white'
                    : isCurrent
                    ? 'bg-white border-forest-700 text-forest-800 ring-4 ring-forest-100'
                    : 'bg-white border-neutral-300 text-neutral-400'
                }`}
              >
                {isDone ? <Check className="w-4 h-4 stroke-[2.5]" /> : <StepIcon className="w-3.5 h-3.5" />}
              </div>
              <span
                className={`mt-1.5 text-xs font-medium ${
                  isDone || isCurrent ? 'text-neutral-900' : 'text-neutral-400'
                }`}
              >
                {step.label}
              </span>
              <span className="text-[10px] text-neutral-400 hidden sm:inline-block">
                {step.desc}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
