import React from 'react';
import { PackageOpen, RefreshCw } from 'lucide-react';

export default function EmptyState({
  title = "No nearby food right now",
  description = "New donations will appear here when restaurants or canteens post surplus food.",
  actionLabel = "Refresh",
  onAction,
  icon: Icon = PackageOpen,
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 sm:p-12 border border-dashed border-neutral-200 rounded-xl bg-sand-50/60 my-6">
      <div className="w-12 h-12 rounded-full bg-sand-100 flex items-center justify-center text-neutral-500 mb-4 border border-neutral-200/60">
        <Icon className="w-6 h-6 stroke-[1.75]" />
      </div>
      <h4 className="text-base font-semibold text-neutral-800 mb-1.5">{title}</h4>
      <p className="text-sm text-neutral-500 max-w-sm mb-5 leading-relaxed">{description}</p>
      {onAction && (
        <button
          type="button"
          onClick={onAction}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg text-neutral-700 bg-white border border-neutral-300 hover:bg-sand-50 hover:border-neutral-400 active:scale-[0.98] transition-all shadow-xs"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          {actionLabel}
        </button>
      )}
    </div>
  );
}
