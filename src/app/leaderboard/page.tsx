'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MOCK_CONTRIBUTORS, MOCK_COMMUNITIES } from '../../data/mockData';
import { ShieldCheck, Trophy } from 'lucide-react';

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState<'contributors' | 'communities'>('contributors');
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly' | 'alltime'>('alltime');

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8 bg-[#fffdf9]">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-200 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <Trophy className="h-6 w-6 text-amber-500" />
            <h1 className="text-2xl font-black text-zinc-900 sm:text-4xl">Platform Leaderboard</h1>
          </div>
          <p className="mt-1 text-sm font-semibold text-zinc-600">
            Top Web3 contributors, stock reward earners, and ecosystems ranked by reputation.
          </p>
        </div>

        {/* Timeframe Filter */}
        <div className="flex items-center gap-1 rounded-xl border border-zinc-200 bg-zinc-50 p-1 text-xs font-bold">
          {[
            { id: 'weekly', label: 'Weekly' },
            { id: 'monthly', label: 'Monthly' },
            { id: 'alltime', label: 'All Time' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setTimeframe(item.id as any)}
              className={`rounded-lg px-3 py-1.5 transition-all ${
                timeframe === item.id
                  ? 'bg-zinc-900 text-white shadow-sm'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-zinc-200 space-x-6 text-xs font-extrabold">
        <button
          onClick={() => setActiveTab('contributors')}
          className={`pb-3 border-b-2 transition-all ${
            activeTab === 'contributors'
              ? 'border-zinc-900 text-zinc-900'
              : 'border-transparent text-zinc-500 hover:text-zinc-900'
          }`}
        >
          Top Contributors
        </button>
        <button
          onClick={() => setActiveTab('communities')}
          className={`pb-3 border-b-2 transition-all ${
            activeTab === 'communities'
              ? 'border-zinc-900 text-zinc-900'
              : 'border-transparent text-zinc-500 hover:text-zinc-900'
          }`}
        >
          Top Communities & DAOs
        </button>
      </div>

      {/* TAB 1: CONTRIBUTORS LEADERBOARD */}
      {activeTab === 'contributors' && (
        <div className="rounded-3xl border border-zinc-200 bg-white overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-medium">
              <thead className="bg-zinc-50 text-zinc-500 border-b border-zinc-200 font-extrabold">
                <tr>
                  <th className="p-4">Rank</th>
                  <th className="p-4">Contributor</th>
                  <th className="p-4">Reputation Score</th>
                  <th className="p-4">Bounties Completed</th>
                  <th className="p-4">Approval Rate</th>
                  <th className="p-4">Total Rewards</th>
                  <th className="p-4">Profile</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 text-zinc-800">
                {MOCK_CONTRIBUTORS.map((user) => (
                  <tr key={user.walletAddress} className="hover:bg-zinc-50">
                    <td className="p-4 font-black text-sm">
                      {user.rank === 1 && <span className="text-amber-600 font-black">🥇 #1</span>}
                      {user.rank === 2 && <span className="text-zinc-700 font-black">🥈 #2</span>}
                      {user.rank === 3 && <span className="text-amber-700 font-black">🥉 #3</span>}
                      {user.rank > 3 && `#${user.rank}`}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2.5">
                        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-100 text-base border border-zinc-200">
                          {user.avatar}
                        </span>
                        <div>
                          <div className="flex items-center gap-1">
                            <span className="font-extrabold text-zinc-900">{user.username}</span>
                            {user.isVerified && <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />}
                          </div>
                          <span className="text-[10px] font-mono text-zinc-500 font-semibold">
                            {user.walletAddress.slice(0, 6)}...{user.walletAddress.slice(-4)}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 font-mono font-bold text-zinc-900">
                      <span className="rounded-full bg-zinc-100 border border-zinc-200 px-2.5 py-0.5">
                        {user.reputationScore} PTS
                      </span>
                    </td>
                    <td className="p-4 font-black text-zinc-900">{user.bountiesCompleted}</td>
                    <td className="p-4 font-black text-emerald-700">{user.approvalRate}%</td>
                    <td className="p-4 font-black text-zinc-900">${user.totalEarnedUsd.toLocaleString()}</td>
                    <td className="p-4">
                      <Link href={`/profile/${user.walletAddress}`} className="text-zinc-900 font-extrabold hover:text-emerald-600">
                        View Profile →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: COMMUNITIES LEADERBOARD */}
      {activeTab === 'communities' && (
        <div className="rounded-3xl border border-zinc-200 bg-white overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-medium">
              <thead className="bg-zinc-50 text-zinc-500 border-b border-zinc-200 font-extrabold">
                <tr>
                  <th className="p-4">Community</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Members</th>
                  <th className="p-4">Active Tasks</th>
                  <th className="p-4">Total Rewards Distributed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 text-zinc-800">
                {MOCK_COMMUNITIES.map((comm) => (
                  <tr key={comm.id} className="hover:bg-zinc-50">
                    <td className="p-4 font-black text-zinc-900 flex items-center gap-2">
                      <span className="text-lg">{comm.logo}</span>
                      <span>{comm.name}</span>
                    </td>
                    <td className="p-4 font-semibold text-zinc-600">{comm.category}</td>
                    <td className="p-4 font-black text-zinc-900">{comm.membersCount.toLocaleString()}</td>
                    <td className="p-4 font-black text-zinc-900">{comm.activeBountiesCount}</td>
                    <td className="p-4 font-black text-emerald-700">${comm.totalRewardsDistributed.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
