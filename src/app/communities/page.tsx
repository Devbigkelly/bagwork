'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MOCK_COMMUNITIES } from '../../data/mockData';
import { Users, ShieldCheck } from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';

export default function CommunitiesPage() {
  const { addToast } = useNotification();
  const [joinedIds, setJoinedIds] = useState<string[]>(['comm-rh', 'comm-1']);

  const toggleJoin = (id: string, name: string) => {
    if (joinedIds.includes(id)) {
      setJoinedIds(prev => prev.filter(i => i !== id));
      addToast('Left Community', `You left ${name}.`, 'info');
    } else {
      setJoinedIds(prev => [...prev, id]);
      addToast('Joined Community! 🎉', `Welcome to ${name}.`, 'success');
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8 bg-[#fffdf9]">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-200 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <Users className="h-6 w-6 text-zinc-900" />
            <h1 className="text-2xl font-black text-zinc-900 sm:text-4xl">Ecosystem Communities & DAOs</h1>
          </div>
          <p className="mt-1 text-sm font-semibold text-zinc-600">
            Join developer collectives, Robinhood stock reward guilds, and creative DAOs.
          </p>
        </div>
      </div>

      {/* Community Directory Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {MOCK_COMMUNITIES.map((comm) => {
          const isJoined = joinedIds.includes(comm.id);
          return (
            <div key={comm.id} className="group overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm transition-all hover:border-zinc-400 hover:shadow-md">
              
              {/* Cover Image Header */}
              <div className="h-28 w-full relative bg-zinc-100 overflow-hidden">
                <img src={comm.coverImage} alt={comm.name} className="h-full w-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                <span className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-white/90 border border-zinc-200 px-2.5 py-1 text-[10px] font-extrabold text-zinc-800 shadow-sm">
                  {comm.category}
                </span>
              </div>

              {/* Body */}
              <div className="p-5 pt-0 relative space-y-4">
                
                {/* Logo & Name */}
                <div className="flex items-end justify-between -mt-6">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-2xl border border-zinc-200 shadow-md">
                    {comm.logo}
                  </span>
                  <button
                    onClick={() => toggleJoin(comm.id, comm.name)}
                    className={`rounded-xl px-4 py-1.5 text-xs font-extrabold transition-all ${
                      isJoined
                        ? 'border border-emerald-200 bg-emerald-100 text-emerald-800'
                        : 'bg-zinc-900 text-white hover:bg-zinc-800 shadow-sm'
                    }`}
                  >
                    {isJoined ? 'Joined ✓' : 'Join Community'}
                  </button>
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-base font-black text-zinc-900 group-hover:text-emerald-700">{comm.name}</h3>
                    {comm.isVerified && <ShieldCheck className="h-4 w-4 text-emerald-600" />}
                  </div>
                  <p className="mt-1 text-xs text-zinc-600 font-medium line-clamp-2 leading-relaxed">{comm.description}</p>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2 rounded-2xl bg-zinc-50 p-3 text-center text-xs border border-zinc-200">
                  <div>
                    <span className="text-[10px] text-zinc-500 font-extrabold uppercase">Members</span>
                    <p className="font-black text-zinc-900">{comm.membersCount.toLocaleString()}</p>
                  </div>
                  <div className="border-x border-zinc-200">
                    <span className="text-[10px] text-zinc-500 font-extrabold uppercase">Active</span>
                    <p className="font-black text-zinc-900">{comm.activeBountiesCount} Tasks</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 font-extrabold uppercase">Paid</span>
                    <p className="font-black text-emerald-700">${(comm.totalRewardsDistributed / 1000).toFixed(0)}k</p>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-zinc-100 text-xs">
                  <Link href={`/bounties?category=${comm.category.split(' ')[0]}`} className="font-extrabold text-zinc-900 hover:text-emerald-600">
                    View Tasks →
                  </Link>
                </div>

              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
