import React from 'react';
import { CheckCircle2, Clock, Truck, Check, AlertCircle } from 'lucide-react';

export default function StatusBadge({ status, size = 'md' }) {
  const normalized = (status || 'Available').toLowerCase();

  const configs = {
    available: {
      label: 'Available',
      bg: 'bg-[#e6f9f0] text-[#00875a] border-[#b3f0d4]',
      dot: 'bg-[#00a86b]',
      icon: CheckCircle2,
    },
    accepted: {
      label: 'Accepted',
      bg: 'bg-[#fff9db] text-[#996b00] border-[#ffec99]',
      dot: 'bg-[#ffce00]',
      icon: Clock,
    },
    collected: {
      label: 'Collected',
      bg: 'bg-[#efedf5] text-[#2a1150] border-[#dedbec]',
      dot: 'bg-[#371669]',
      icon: Truck,
    },
    delivered: {
      label: 'Delivered',
      bg: 'bg-[#eef8f2] text-[#1c4433] border-[#b5e5d0]',
      dot: 'bg-[#2d6a4f]',
      icon: Check,
    },
    expired: {
      label: 'Expired',
      bg: 'bg-[#ffe9ef] text-[#ff4c70] border-[#ffd4e2]',
      dot: 'bg-[#ff4c70]',
      icon: AlertCircle,
    },
  };

  const config = configs[normalized] || configs.available;

  const sizeClasses = {
    sm: 'text-xs px-2.5 py-0.5 gap-1.5 font-semibold',
    md: 'text-xs font-bold px-3 py-1 gap-1.5',
    lg: 'text-sm font-bold px-3.5 py-1.5 gap-2',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border transition-colors duration-200 ${config.bg} ${
        sizeClasses[size] || sizeClasses.md
      }`}
    >
      <span className={`w-2 h-2 rounded-full ${config.dot}`} />
      <span>{config.label}</span>
    </span>
  );
}
