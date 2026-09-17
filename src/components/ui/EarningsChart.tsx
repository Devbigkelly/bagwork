'use client';

import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';

export default function EarningsChart() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y' | 'all'>('30d');

  const chartData = {
    '7d': [
      { label: 'Mon', amount: 150 },
      { label: 'Tue', amount: 0 },
      { label: 'Wed', amount: 400 },
      { label: 'Thu', amount: 250 },
      { label: 'Fri', amount: 100 },
      { label: 'Sat', amount: 500 },
      { label: 'Sun', amount: 200 },
    ],
    '30d': [
      { label: 'Week 1', amount: 850 },
      { label: 'Week 2', amount: 1200 },
      { label: 'Week 3', amount: 1450 },
      { label: 'Week 4', amount: 1320 },
    ],
    '90d': [
      { label: 'Jul', amount: 1200 },
      { label: 'Aug', amount: 1800 },
      { label: 'Sep', amount: 1820 },
    ],
    '1y': [
      { label: 'Q1', amount: 1100 },
      { label: 'Q2', amount: 1500 },
      { label: 'Q3', amount: 2200 },
      { label: 'Q4', amount: 0 },
    ],
    'all': [
      { label: '2025', amount: 2400 },
      { label: '2026', amount: 4820 },
    ],
  };

  const currentData = chartData[timeRange];
  const maxAmount = Math.max(...currentData.map(d => d.amount), 1000);

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-600" />
            <h3 className="text-base font-black text-zinc-900">Earnings History & Analytics</h3>
          </div>
          <p className="text-xs font-semibold text-zinc-500 mt-0.5">Track your verified smart contract payouts over time</p>
        </div>

        {/* Time Filter Buttons */}
        <div className="flex items-center gap-1 rounded-xl border border-zinc-200 bg-zinc-50 p-1 text-xs">
          {(['7d', '30d', '90d', '1y', 'all'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-all ${
                timeRange === range
                  ? 'bg-zinc-900 text-white shadow-sm'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              {range.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Bar Chart Visualization */}
      <div className="mt-6 flex h-48 items-end gap-3 sm:gap-6 border-b border-zinc-200 pb-4 px-2">
        {currentData.map((item, idx) => {
          const heightPercent = Math.round((item.amount / maxAmount) * 100);
          return (
            <div key={idx} className="group relative flex flex-1 flex-col items-center h-full justify-end">
              
              {/* Tooltip on Hover */}
              <div className="absolute -top-8 hidden group-hover:flex items-center gap-1 rounded-lg bg-zinc-900 px-2 py-1 text-[10px] font-bold text-white shadow-lg z-10">
                <span>${item.amount.toLocaleString()}</span>
              </div>

              {/* Bar Column */}
              <div 
                className="w-full max-w-[48px] rounded-t-xl bg-zinc-900 transition-all duration-500 group-hover:bg-emerald-600"
                style={{ height: `${Math.max(heightPercent, 8)}%` }}
              />

              {/* X Axis Label */}
              <span className="mt-2 text-[11px] font-bold text-zinc-500 group-hover:text-zinc-900">
                {item.label}
              </span>

            </div>
          );
        })}
      </div>

      {/* Token Distribution Breakdown */}
      <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-xl border border-zinc-200 bg-zinc-50/80 p-3">
          <span className="text-[10px] font-extrabold text-zinc-500 uppercase">USDC Earned</span>
          <p className="mt-0.5 text-base font-black text-zinc-900">$3,250.00</p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-zinc-50/80 p-3">
          <span className="text-[10px] font-extrabold text-zinc-500 uppercase">ETH Earned</span>
          <p className="mt-0.5 text-base font-black text-zinc-900">1.5 ETH ($1,250)</p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-zinc-50/80 p-3">
          <span className="text-[10px] font-extrabold text-zinc-500 uppercase">POL Earned</span>
          <p className="mt-0.5 text-base font-black text-zinc-900">640 POL ($320)</p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-zinc-50/80 p-3">
          <span className="text-[10px] font-extrabold text-zinc-500 uppercase">Avg Payout / Bounty</span>
          <p className="mt-0.5 text-base font-black text-emerald-600">$114.76</p>
        </div>
      </div>

    </div>
  );
}
