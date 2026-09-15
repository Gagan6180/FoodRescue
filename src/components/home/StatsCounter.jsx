import React, { useState, useEffect, useRef } from 'react';

function useCountUp(target, duration = 1200, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime = null;
    let animationFrame;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(ease * target));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [target, duration, start]);

  return count;
}

export default function StatsCounter({ stats }) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const meals = useCountUp(stats.mealsRescued, 1400, isVisible);
  const donors = useCountUp(stats.activeDonors, 1000, isVisible);
  const ngos = useCountUp(stats.ngoPartners, 1000, isVisible);
  const pickups = useCountUp(stats.successfulPickups, 1200, isVisible);
  const diverted = useCountUp(stats.divertedKg, 1300, isVisible);

  const metrics = [
    {
      value: `${meals.toLocaleString()}+`,
      label: 'Meals Rescued',
      desc: 'Safe food served to community shelters',
    },
    {
      value: donors,
      label: 'Active Donors',
      desc: 'Canteens, bakeries & restaurants',
    },
    {
      value: ngos,
      label: 'NGO Partners',
      desc: 'Grassroots kitchens & food banks',
    },
    {
      value: pickups,
      label: 'Successful Pickups',
      desc: 'Volunteers responding within minutes',
    },
    {
      value: `${diverted} kg`,
      label: 'Food Diverted',
      desc: 'Diverted from municipal landfills',
    },
  ];

  return (
    <div ref={containerRef} className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-gray-200 border border-gray-200 rounded-2xl overflow-hidden shadow-2xs">
        {metrics.map((item, idx) => (
          <div
            key={idx}
            className={`bg-white p-5 sm:p-6 flex flex-col justify-between ${
              idx === metrics.length - 1 ? 'col-span-2 md:col-span-1' : ''
            }`}
          >
            <div>
              <div className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#056b4e] tabular-nums">
                {item.value}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-gray-900 mt-1">
                {item.label}
              </div>
            </div>
            <p className="text-[11px] text-gray-500 mt-2 leading-relaxed hidden sm:block">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
