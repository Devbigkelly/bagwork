'use client';

import React, { useState } from 'react';
import { Wallet, Search, CheckCircle2, ShieldCheck, Coins, ArrowRight, Sparkles, FileCode } from 'lucide-react';

export default function Web3FlowVisualizer() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: '1. Connect Wallet',
      description: 'Link your Web3 wallet (MetaMask, Coinbase, Phantom) on Base, ETH, or Arbitrum.',
      icon: Wallet,
      badge: 'Web3 Auth',
    },
    {
      title: '2. Discover & Accept',
      description: 'Browse verified protocol bounties, design tasks, AI benchmarks, and security audits.',
      icon: Search,
      badge: 'Smart Discovery',
    },
    {
      title: '3. Complete Task',
      description: 'Deliver GitHub code, live URLs, design files, or complete on-chain transactions.',
      icon: FileCode,
      badge: 'Proof Submission',
    },
    {
      title: '4. Creator Approval',
      description: 'Protocol creators inspect proof deliverables & verify on-chain transaction hashes.',
      icon: ShieldCheck,
      badge: 'Review Phase',
    },
    {
      title: '5. Instant Payout',
      description: 'Smart contract escrow automatically releases USDC, ETH, or native tokens to your wallet.',
      icon: Coins,
      badge: 'Escrow Payout',
    },
  ];

  return (
    <div className="relative w-full rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
      
      {/* Top Banner */}
      <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-emerald-600" />
          <h3 className="text-xs font-extrabold tracking-wider text-zinc-900 uppercase">The bagwork Contribution Loop</h3>
        </div>
        <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-extrabold text-emerald-800 border border-emerald-200">
          On-Chain Verified
        </span>
      </div>

      {/* Step Tabs Navigation */}
      <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-5">
        {steps.map((step, idx) => {
          const isActive = activeStep === idx;
          const Icon = step.icon;
          return (
            <button
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`flex flex-col items-center gap-2 rounded-2xl border p-3 transition-all ${
                isActive
                  ? 'border-zinc-900 bg-zinc-900 text-white shadow-md'
                  : 'border-zinc-200 bg-zinc-50/60 text-zinc-600 hover:border-zinc-300 hover:bg-zinc-100'
              }`}
            >
              <div className={`flex h-8 w-8 items-center justify-center rounded-xl ${isActive ? 'bg-emerald-500 text-white' : 'bg-zinc-200 text-zinc-700'}`}>
                <Icon className="h-4 w-4" />
              </div>
              <span className="text-[11px] font-extrabold text-center line-clamp-1">{step.title}</span>
            </button>
          );
        })}
      </div>

      {/* Active Step Visual Showcase */}
      <div className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-50/80 p-5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="space-y-2 max-w-md text-left">
            <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-extrabold text-emerald-800 border border-emerald-200">
              {steps[activeStep].badge}
            </span>
            <h4 className="text-lg font-black text-zinc-900">{steps[activeStep].title}</h4>
            <p className="text-xs text-zinc-600 font-medium leading-relaxed">{steps[activeStep].description}</p>
          </div>

          {/* Interactive Graphic Representation */}
          <div className="w-full md:w-auto flex items-center justify-center rounded-xl border border-zinc-200 bg-white p-4 text-center shadow-sm">
            {activeStep === 0 && (
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-zinc-100 p-2.5 border border-zinc-200 font-mono text-xs font-bold text-zinc-900">
                  0x8A82...F219
                </div>
                <ArrowRight className="h-4 w-4 text-emerald-600" />
                <span className="rounded-lg bg-emerald-100 px-2.5 py-1 text-xs font-extrabold text-emerald-800 border border-emerald-200">
                  Connected
                </span>
              </div>
            )}

            {activeStep === 1 && (
              <div className="flex items-center gap-3 text-xs">
                <span className="font-extrabold text-zinc-900">Uniswap Labs</span>
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 font-bold text-emerald-800">250 USDC</span>
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              </div>
            )}

            {activeStep === 2 && (
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-zinc-800">
                <span className="text-emerald-700">Task Deliverable:</span>
                <span>github.com/alex-sol/fincorex-demo</span>
              </div>
            )}

            {activeStep === 3 && (
              <div className="flex items-center gap-2 text-xs font-bold text-zinc-900">
                <ShieldCheck className="h-5 w-5 text-emerald-600" />
                <span>Verified by Creator & Smart Contract</span>
              </div>
            )}

            {activeStep === 4 && (
              <div className="flex items-center gap-2 text-xs font-black text-emerald-700">
                <Coins className="h-5 w-5" />
                <span>+250 USDC Escrow Released to Wallet</span>
              </div>
            )}
          </div>

        </div>
      </div>

    </div>
  );
}
