'use client';

import React from 'react';
import { useWeb3 } from '../../context/Web3Context';
import { History, Copy, Users, Coins, Sparkles, CheckCircle2 } from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';

export default function ReferralPage() {
  const { walletAddress } = useWeb3();
  const { addToast } = useNotification();

  const referralCode = walletAddress ? walletAddress.slice(2, 10).toUpperCase() : 'BWX8A82C';
  const referralLink = `https://bagwork.io/ref/${referralCode}`;

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    addToast('Copied Referral Link!', 'Link copied to clipboard.', 'success');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <History className="h-6 w-6 text-indigo-400" />
            <h1 className="text-2xl font-extrabold text-white sm:text-4xl">Web3 Referral Program</h1>
          </div>
          <p className="mt-1 text-sm text-slate-400">
            Invite fellow builders and creators to Bagwork and earn 5% bonus rewards on completed bounties.
          </p>
        </div>
      </div>

      {/* Referral Link Card */}
      <div className="rounded-2xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/40 via-slate-900 to-indigo-950/40 p-6 sm:p-8 backdrop-blur-xl space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-indigo-400" />
          <h2 className="text-base font-bold text-white">Your Personal Referral Link</h2>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            readOnly
            value={referralLink}
            className="flex-1 rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-xs text-indigo-300 font-mono"
          />
          <button
            onClick={copyReferralLink}
            className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500"
          >
            <Copy className="h-4 w-4" />
            Copy Referral Link
          </button>
        </div>
      </div>

      {/* Referral Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5">
          <span className="text-[10px] font-semibold text-slate-400 uppercase">Total Referrals</span>
          <div className="mt-1 text-2xl font-extrabold text-white">14 Contributors</div>
        </div>

        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5">
          <span className="text-[10px] font-semibold text-slate-400 uppercase">Referral Earnings</span>
          <div className="mt-1 text-2xl font-extrabold text-emerald-400">$350.00 USDC</div>
        </div>

        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5">
          <span className="text-[10px] font-semibold text-slate-400 uppercase">Tier Status</span>
          <div className="mt-1 text-2xl font-extrabold text-indigo-300">Level 2 Ambassador</div>
        </div>
      </div>

    </div>
  );
}
