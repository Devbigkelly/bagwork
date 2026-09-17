'use client';

import React, { useState, useMemo } from 'react';
import { useBounty } from '../../context/BountyContext';
import BountyCard from '../../components/ui/BountyCard';
import { BountyCategory } from '../../types';
import { Search, Compass, Sparkles, SlidersHorizontal } from 'lucide-react';

const CATEGORIES: BountyCategory[] = [
  'All',
  'Trending',
  'New',
  'Highest Reward',
  'Protocol',
  'Development',
  'Design',
  'Research',
  'AI',
  'Social',
  'Testing',
  'Content',
  'Data',
  'Other'
];

export default function BountiesMarketplacePage() {
  const { bounties, selectedCategory, setSelectedCategory, searchQuery, setSearchQuery } = useBounty();
  
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedNetworkFilter, setSelectedNetworkFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'newest' | 'reward_desc' | 'slots_left'>('newest');

  const filteredBounties = useMemo(() => {
    return bounties.filter(bounty => {
      // Category filter
      if (selectedCategory !== 'All' && selectedCategory !== 'Trending' && selectedCategory !== 'New' && selectedCategory !== 'Highest Reward') {
        if (bounty.category !== selectedCategory) return false;
      }

      if (selectedCategory === 'Trending' && !bounty.isVerifiedProject) return false;
      if (selectedCategory === 'Highest Reward' && bounty.rewardPerContributor < 200) return false;

      // Difficulty filter
      if (selectedDifficulty !== 'All' && bounty.difficulty !== selectedDifficulty) return false;

      // Network filter
      if (selectedNetworkFilter !== 'All' && bounty.network !== selectedNetworkFilter) return false;

      // Search Query filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchTitle = bounty.title.toLowerCase().includes(query);
        const matchProject = bounty.projectName.toLowerCase().includes(query);
        const matchDesc = bounty.description.toLowerCase().includes(query);
        const matchTag = bounty.tags.some(t => t.toLowerCase().includes(query));
        if (!matchTitle && !matchProject && !matchDesc && !matchTag) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'reward_desc') return b.rewardPerContributor - a.rewardPerContributor;
      if (sortBy === 'slots_left') return (b.totalSlots - b.filledSlots) - (a.totalSlots - a.filledSlots);
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [bounties, selectedCategory, selectedDifficulty, selectedNetworkFilter, searchQuery, sortBy]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8 bg-[#fffdf9]">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-200 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <Compass className="h-6 w-6 text-zinc-900" />
            <h1 className="text-2xl font-black text-zinc-900 sm:text-4xl">Explore Bounties</h1>
          </div>
          <p className="mt-1 text-sm font-semibold text-zinc-600">
            Find opportunities to contribute, build, create and earn rewards on bagwork.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search bounties, tasks, skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-zinc-300 bg-white pl-10 pr-4 py-2.5 text-xs text-zinc-900 font-medium placeholder-zinc-400 focus:border-zinc-900 focus:outline-none shadow-sm"
          />
        </div>
      </div>

      {/* Category Pills Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-xl px-4 py-2 text-xs font-extrabold whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-zinc-900 text-white shadow-sm'
                  : 'border border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:text-zinc-900'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Sub-Filters Toolbar (Difficulty, Network, Sorting) */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
        
        <div className="flex flex-wrap items-center gap-3">
          <span className="flex items-center gap-1.5 text-xs font-black text-zinc-900">
            <SlidersHorizontal className="h-4 w-4 text-emerald-600" />
            Filter by:
          </span>

          {/* Difficulty Dropdown */}
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="rounded-xl border border-zinc-300 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-800 focus:border-zinc-900 focus:outline-none"
          >
            <option value="All">All Difficulties</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
            <option value="Expert">Expert</option>
          </select>

          {/* Network Filter Dropdown */}
          <select
            value={selectedNetworkFilter}
            onChange={(e) => setSelectedNetworkFilter(e.target.value)}
            className="rounded-xl border border-zinc-300 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-800 focus:border-zinc-900 focus:outline-none"
          >
            <option value="All">All Networks</option>
            <option value="Base">Base</option>
            <option value="Ethereum">Ethereum</option>
            <option value="Arbitrum">Arbitrum</option>
            <option value="Polygon">Polygon</option>
            <option value="BNB Chain">BNB Chain</option>
          </select>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-zinc-500">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="rounded-xl border border-zinc-300 bg-white px-3 py-1.5 text-xs font-extrabold text-zinc-900 focus:border-zinc-900 focus:outline-none"
          >
            <option value="newest">Newest First</option>
            <option value="reward_desc">Highest Reward</option>
            <option value="slots_left">Most Open Slots</option>
          </select>
        </div>

      </div>

      {/* Bounties Grid */}
      {filteredBounties.length === 0 ? (
        <div className="rounded-2xl border border-zinc-200 bg-white p-12 text-center shadow-sm">
          <Sparkles className="mx-auto h-8 w-8 text-zinc-400 mb-3" />
          <h3 className="text-base font-black text-zinc-900">No Bounties Found</h3>
          <p className="mt-1 text-xs font-semibold text-zinc-500">Try adjusting your filters or search query.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredBounties.map((bounty) => (
            <BountyCard key={bounty.id} bounty={bounty} />
          ))}
        </div>
      )}

    </div>
  );
}
