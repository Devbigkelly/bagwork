'use client';

import React from 'react';
import Link from 'next/link';
import { Bounty } from '../../types';
import { ShieldCheck, Clock, Users, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';

interface BountyCardProps {
  bounty: Bounty;
}

export default function BountyCard({ bounty }: BountyCardProps) {
  const isFilled = bounty.filledSlots >= bounty.totalSlots;

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200 bg-white p-5 transition-all duration-300 hover:border-zinc-400 hover:shadow-lg hover:-translate-y-1">
      
      {/* Top Banner */}
      <div>
        {/* Project Header & Network */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 text-xl border border-zinc-200 shadow-inner">
              {bounty.projectLogo}
            </span>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-zinc-900 group-hover:text-emerald-700 transition-colors">
                  {bounty.projectName}
                </span>
                {bounty.isVerifiedProject && (
                  <span title="Verified Project">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-bold text-zinc-600 border border-zinc-200">
                  {bounty.category}
                </span>
                <span className="text-[10px] font-semibold text-zinc-500">
                  {bounty.difficulty}
                </span>
              </div>
            </div>
          </div>

          {/* Network Tag */}
          <span className="flex items-center gap-1 rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-[11px] font-extrabold text-zinc-800">
            {bounty.network}
          </span>
        </div>

        {/* Bounty Title & Description */}
        <h3 className="mt-4 text-base font-extrabold text-zinc-900 group-hover:text-zinc-700 transition-colors line-clamp-1">
          {bounty.title}
        </h3>
        <p className="mt-1.5 text-xs text-zinc-600 font-medium line-clamp-2 leading-relaxed">
          {bounty.description}
        </p>

        {/* Escrow Status Tag */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {bounty.isEscrowFunded && (
            <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-extrabold text-emerald-800 border border-emerald-200">
              <CheckCircle2 className="h-3 w-3 text-emerald-600" />
              FUNDED ({bounty.totalPool} {bounty.rewardToken})
            </span>
          )}
          {bounty.isOnChainVerified && (
            <span className="flex items-center gap-1 rounded-full bg-indigo-50 px-2.5 py-0.5 text-[10px] font-extrabold text-indigo-800 border border-indigo-200">
              <Sparkles className="h-3 w-3 text-indigo-600" />
              ON-CHAIN VERIFIED
            </span>
          )}
        </div>
      </div>

      {/* Card Footer: Reward & CTA */}
      <div className="mt-6 border-t border-zinc-100 pt-4">
        <div className="flex items-end justify-between">
          
          {/* Reward Amount */}
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-zinc-400">Reward</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-zinc-900">
                {bounty.rewardPerContributor.toLocaleString()}
              </span>
              <span className="text-xs font-black text-emerald-600">{bounty.rewardToken}</span>
            </div>
          </div>

          {/* Slots & Deadline Info */}
          <div className="text-right">
            <div className="flex items-center justify-end gap-1 text-[11px] font-bold text-zinc-700">
              <Users className="h-3.5 w-3.5 text-zinc-500" />
              <span>{bounty.filledSlots} / {bounty.totalSlots} slots</span>
            </div>
            <div className="flex items-center justify-end gap-1 text-[10px] text-zinc-500 font-medium mt-0.5">
              <Clock className="h-3 w-3 text-zinc-400" />
              <span>Ends in 4 days</span>
            </div>
          </div>

        </div>

        {/* View Details CTA Button */}
        <Link
          href={`/bounties/${bounty.id}`}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 py-2.5 text-xs font-extrabold text-white transition-all group-hover:bg-emerald-600 shadow-sm"
        >
          <span>{isFilled ? 'View Completed Bounty' : 'Explore & Do Task'}</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </Link>
      </div>

    </div>
  );
}
