'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Web3FlowVisualizer from '../components/ui/Web3FlowVisualizer';
import BountyCard from '../components/ui/BountyCard';
import { useBounty } from '../context/BountyContext';
import { 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  Coins, 
  Lock, 
  CheckCircle2, 
  Code2, 
  Zap, 
  Cpu, 
  Palette, 
  Search,
  PlusCircle,
  TrendingUp,
  Activity,
  Check,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export default function LandingPage() {
  const { bounties } = useBounty();
  const featuredBounties = bounties;

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How do bagwork bounties work?',
      a: 'Creators create a bounty and lock 100% of the reward tokens into a smart contract escrow. Contributors complete tasks, submit proof (GitHub PR, link, or transaction hash), and receive instant token payouts upon creator approval.',
    },
    {
      q: 'How are stock rewards paid on Robinhood Chain?',
      a: 'Stock rewards (HOOD, AAPL, NVDA) are tokenized shares distributed on Robinhood Chain or delivered directly via manual stock reward transfers upon proof approval.',
    },
    {
      q: 'Are there any platform fees for contributors?',
      a: 'No! Contributors receive 100% of the listed bounty reward. There are zero platform fees for completing tasks.',
    },
    {
      q: 'What happens if a creator refuses to approve valid work?',
      a: 'Contributors can raise a dispute via our Dispute Resolution Panel. Independent Web3 auditors inspect on-chain logs and proof evidence to release escrowed funds fairly.',
    },
  ];

  return (
    <div className="flex flex-col gap-16 pb-20 bg-[#fffdf9] relative">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-10 lg:pt-16">
        
        {/* Subtle background grid pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            
            {/* Top Web3 Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-4 py-1.5 text-xs font-extrabold text-zinc-900 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
              <span>bagwork PROTOCOL</span>
              <span className="h-1 w-1 rounded-full bg-zinc-300" />
              <span className="text-zinc-600 font-bold">Small Tasks • Real Rewards</span>
            </div>

            {/* Main Headline - EXACT USEPAID TITLE */}
            <h1 className="mt-6 max-w-4xl text-5xl font-black tracking-tight text-zinc-900 sm:text-7xl lg:text-8xl leading-[1.05]">
              Small tasks. <br />
              <span className="text-emerald-600">Real rewards.</span>
            </h1>

            {/* Subheadline - EXACT USEPAID DESCRIPTION */}
            <p className="mt-6 max-w-2xl text-base text-zinc-600 sm:text-lg font-semibold leading-relaxed">
              bagwork connects people with funded bounties. Help someone, share something useful, and earn rewards after your proof is approved.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/bounties"
                className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-zinc-900 px-8 py-4 text-sm font-black text-white shadow-lg transition-all hover:bg-zinc-800 hover:scale-105"
              >
                <span>Find a Bounty</span>
                <ArrowRight className="h-4 w-4 text-emerald-400" />
              </Link>
              <Link
                href="/creator/new"
                className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-zinc-300 bg-white px-8 py-4 text-sm font-extrabold text-zinc-900 shadow-sm transition-all hover:bg-zinc-50 hover:border-zinc-400"
              >
                <PlusCircle className="h-4 w-4 text-emerald-600" />
                <span>Create a Bounty</span>
              </Link>
            </div>

            {/* Interactive Web3 Flow Diagram */}
            <div className="mt-16 w-full max-w-5xl">
              <Web3FlowVisualizer />
            </div>

          </div>
        </div>
      </section>

      {/* 2. Supported Networks & Chains */}
      <section className="border-y border-zinc-200/80 bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-xs font-extrabold uppercase tracking-widest text-zinc-500">
            Supported Chains & Stock Reward Protocols
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-zinc-800 sm:gap-10 font-black text-sm">
            <div className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-2 shadow-sm">
              <span className="text-xl">🏹</span> Robinhood Chain
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-2 shadow-sm">
              <span className="text-xl">🔵</span> Base L2
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-2 shadow-sm">
              <span className="text-xl">⧫</span> Ethereum
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-2 shadow-sm">
              <span className="text-xl">🔷</span> Arbitrum One
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-2 shadow-sm">
              <span className="text-xl">🟣</span> Polygon
            </div>
          </div>
        </div>
      </section>

      {/* 3. Three-Step How It Works Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-800 border border-emerald-200">
            SIMPLE WORKFLOW
          </span>
          <h2 className="mt-3 text-3xl font-black text-zinc-900 sm:text-4xl">How bagwork Works</h2>
          <p className="mt-2 text-sm font-semibold text-zinc-600">Three easy steps to start earning crypto and stock rewards.</p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="rounded-3xl border border-zinc-200 bg-white p-8 space-y-4 shadow-sm relative hover:border-zinc-400 transition-all">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-900 font-black text-white text-lg">
              1
            </span>
            <h3 className="text-xl font-extrabold text-zinc-900">Find a Bounty</h3>
            <p className="text-xs text-zinc-600 font-medium leading-relaxed">
              Explore open task bounties filtered by category, difficulty, or reward token (USDC, ETH, HOOD stock rewards).
            </p>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-white p-8 space-y-4 shadow-sm relative hover:border-zinc-400 transition-all">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-900 font-black text-white text-lg">
              2
            </span>
            <h3 className="text-xl font-extrabold text-zinc-900">Do Something Useful</h3>
            <p className="text-xs text-zinc-600 font-medium leading-relaxed">
              Complete the requested task—whether writing code, testing a dapp, sharing social posts, or evaluating AI models.
            </p>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-white p-8 space-y-4 shadow-sm relative hover:border-zinc-400 transition-all">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 font-black text-white text-lg">
              3
            </span>
            <h3 className="text-xl font-extrabold text-zinc-900">Get Paid</h3>
            <p className="text-xs text-zinc-600 font-medium leading-relaxed">
              Submit proof (URL, GitHub PR, transaction hash). Once approved by the creator, escrow rewards release directly into your wallet.
            </p>
          </div>

        </div>
      </section>

      {/* 4. Active Bounties Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-zinc-200 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Coins className="h-6 w-6 text-emerald-600" />
              <h2 className="text-2xl font-black text-zinc-900 sm:text-3xl">Explore Active Bounties</h2>
            </div>
            <p className="mt-1 text-sm text-zinc-600 font-medium">Funded task opportunities ready for contribution.</p>
          </div>
          <Link
            href="/bounties"
            className="inline-flex items-center gap-1.5 text-sm font-extrabold text-zinc-900 hover:text-emerald-600 transition-colors"
          >
            <span>View All Bounties</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredBounties.map((bounty) => (
            <BountyCard key={bounty.id} bounty={bounty} />
          ))}
        </div>
      </section>

      {/* 5. Rich FAQ Accordion Section */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-2xl font-black text-zinc-900 sm:text-3xl">Frequently Asked Questions</h2>
          <p className="mt-2 text-sm text-zinc-600 font-medium">Everything you need to know about bagwork tasks & escrows.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div 
                key={idx} 
                className="rounded-2xl border border-zinc-200 bg-white overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between p-5 text-left font-extrabold text-zinc-900 text-sm hover:bg-zinc-50"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="h-4 w-4 text-zinc-500 shrink-0" /> : <ChevronDown className="h-4 w-4 text-zinc-500 shrink-0" />}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-zinc-600 font-medium leading-relaxed border-t border-zinc-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
